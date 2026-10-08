# -*- coding: utf-8 -*-
"""用 CDP 真实时间驱动 headless Chrome，给页面截图 + 收集控制台输出。

## 为什么不用 `--virtual-time-budget`

`--virtual-time-budget` 会让**虚拟时钟飞快前进** ✗ —— 库里的
「解析超时」这类 `setTimeout` 会在真实工作还没做完时就触发，
于是页面报「无法打开…超时」，而其实根本没超时 ✗✓
（本地实测：**已验证可用**的简易版在同样参数下也停在 "Parsing file …"，
 所以那是测法的问题，不是页面的问题 —— 这类"对照组"实验很有用 ✓）

这个脚本改成：**真实等待 N 秒**，期间把控制台/异常全收下来 ✓

## 用法

    python tools/headless_check.py --url <URL> --wait 45 --shot out.png
    python tools/headless_check.py --url <URL> --wait 45 --eval "document.title"

依赖：`pip install websocket-client`（隔离 venv 里装即可）
"""
import argparse
import json
import os
import shutil
import socket
import subprocess
import sys
import tempfile
import time
import urllib.request

DEFAULT_CHROME = os.path.expandvars(
    r"%LOCALAPPDATA%\ms-playwright\chromium_headless_shell-1234"
    r"\chrome-headless-shell-win64\chrome-headless-shell.exe"
)


def free_port():
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    p = s.getsockname()[1]
    s.close()
    return p


class CDP:
    def __init__(self, ws_url):
        import websocket  # websocket-client

        self.ws = websocket.create_connection(ws_url, timeout=10)
        self.id = 0
        self.events = []
        self.sessions = set()

    def send(self, method, session_id=None, **params):
        self.id += 1
        msg = {"id": self.id, "method": method, "params": params}
        if session_id:
            msg["sessionId"] = session_id
        self.ws.send(json.dumps(msg))
        return self.id

    def pump(self, seconds):
        """在真实时间里收消息（控制台/异常都会记进 self.events）

        ⚠️ **worker 里的请求和报错在页面上下文里看不到** ✗ ——
        所以这里用 `Target.setAutoAttach` 挂上所有子目标（worker），
        并在每个 worker 会话里也开 Runtime/Log ✓
        （否则「worker 起没起来 / wasm 拉没拉」全是黑盒）
        """
        deadline = time.time() + seconds
        while True:
            left = deadline - time.time()
            if left <= 0:
                return
            self.ws.settimeout(min(left, 1.0))
            try:
                msg = json.loads(self.ws.recv())
            except Exception:
                continue
            if "method" in msg:
                self.events.append(msg)
                if msg["method"] == "Target.attachedToTarget":
                    sid = msg["params"]["sessionId"]
                    self.sessions.add(sid)
                    self.send("Runtime.enable", session_id=sid)
                    self.send("Log.enable", session_id=sid)

    def evaluate(self, expr):
        i = self.send(
            "Runtime.evaluate",
            expression=expr,
            returnByValue=True,
            awaitPromise=True,
        )
        self.ws.settimeout(20)
        while True:
            msg = json.loads(self.ws.recv())
            if msg.get("id") == i:
                r = msg.get("result", {})
                if "exceptionDetails" in r:
                    return {"__error__": str(r["exceptionDetails"])[:400]}
                return r.get("result", {}).get("value")
            if "method" in msg:
                self.events.append(msg)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True)
    ap.add_argument("--wait", type=float, default=40, help="真实等待秒数")
    ap.add_argument("--shot", default=None, help="截图输出路径")
    ap.add_argument("--eval", dest="js", default=None, help="等待结束后求值的 JS 表达式")
    ap.add_argument("--chrome", default=DEFAULT_CHROME)
    ap.add_argument("--width", type=int, default=1400)
    ap.add_argument("--height", type=int, default=900)
    args = ap.parse_args()

    if not os.path.isfile(args.chrome):
        print("✗ 找不到 headless chrome：%s" % args.chrome)
        return 1

    port = free_port()
    profile = tempfile.mkdtemp(prefix="cdp-prof-")
    proc = subprocess.Popen(
        [
            args.chrome,
            "--no-sandbox",
            "--disable-gpu",
            "--enable-unsafe-swiftshader",
            "--use-angle=swiftshader",
            "--hide-scrollbars",
            "--window-size=%d,%d" % (args.width, args.height),
            "--remote-debugging-port=%d" % port,
            "--remote-allow-origins=*",
            "--user-data-dir=%s" % profile,
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        ws_url = None
        for _ in range(60):
            try:
                with urllib.request.urlopen(
                    "http://127.0.0.1:%d/json/list" % port, timeout=2
                ) as r:
                    for t in json.load(r):
                        if t.get("type") == "page":
                            ws_url = t["webSocketDebuggerUrl"]
                            break
                if ws_url:
                    break
            except Exception:
                pass
            time.sleep(0.5)
        if not ws_url:
            print("✗ 连不上 CDP")
            return 1

        c = CDP(ws_url)
        c.send("Runtime.enable")
        c.send("Log.enable")
        c.send("Page.enable")
        c.send("Network.enable")
        # 挂上子目标（worker）—— 否则 worker 里的报错全看不到
        c.send(
            "Target.setAutoAttach",
            autoAttach=True,
            waitForDebuggerOnStart=False,
            flatten=True,
        )
        c.pump(0.5)
        c.send("Page.navigate", url=args.url)
        print("… 真实等待 %.0f 秒（加载 + 解析 + 渲染）" % args.wait)
        c.pump(args.wait)

        # 收集控制台/异常
        seen = []
        for ev in c.events:
            m = ev["method"]
            p = ev.get("params", {})
            where = "[worker]" if ev.get("sessionId") else "[page]"
            if m == "Runtime.consoleAPICalled":
                txt = " ".join(
                    str(a.get("value", a.get("description", "")))
                    for a in p.get("args", [])
                )
                line = "%s [console.%s] %s" % (where, p.get("type"), txt)
                if "GL Driver" not in line:
                    seen.append(line)
            elif m == "Runtime.exceptionThrown":
                d = p.get("exceptionDetails", {})
                seen.append("%s [exception] %s %s" % (
                    where, d.get("text", ""), d.get("exception", {}).get("description", "")[:200]))
            elif m == "Log.entryAdded":
                e = p.get("entry", {})
                if e.get("level") in ("error", "warning"):
                    seen.append("%s [log.%s] %s" % (where, e.get("level"), e.get("text")))
            elif m == "Target.attachedToTarget":
                seen.append("%s 挂上子目标：%s" % (where, p.get("targetInfo", {}).get("type")))
            elif m == "Network.requestWillBeSent":
                u = p.get("request", {}).get("url", "")
                if "/assets/" in u or "api/" in u or "cad-data/" in u:
                    seen.append("[req] %s" % u.split("/")[-1][:60])
            elif m == "Network.loadingFailed":
                seen.append("[req.failed] %s %s" % (p.get("errorText"), p.get("type")))
        if seen:
            print("\n控制台：")
            for line in seen[:60]:
                print("  " + line[:300])
        else:
            print("\n控制台：无 error/warning ✓")

        if args.js:
            print("\n求值 %s →" % args.js)
            print("  %s" % json.dumps(c.evaluate(args.js), ensure_ascii=False)[:800])

        if args.shot:
            i = c.send(
                "Page.captureScreenshot", format="png", captureBeyondViewport=False
            )
            c.ws.settimeout(30)
            data = None
            while True:
                msg = json.loads(c.ws.recv())
                if msg.get("id") == i:
                    data = msg.get("result", {}).get("data")
                    break
            if data:
                import base64

                with open(args.shot, "wb") as f:
                    f.write(base64.b64decode(data))
                print("\n截图 → %s（%d 字节）" % (args.shot, os.path.getsize(args.shot)))
        return 0
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=10)
        except Exception:
            proc.kill()
        shutil.rmtree(profile, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main())
