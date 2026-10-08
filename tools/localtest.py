# -*- coding: utf-8 -*-
"""本地端到端测试服务器：静态资源 + **真的**跑 `app/ui/index.cgi`。

## 为什么要有这个

0.2.1 那次是靠「本地把 CGI 跑一遍」10 秒定位了参数名不一致 ✗；
而 0.2.4 的「图纸全黑」是在真机上绕了两轮才找到（库版本漂移）。
**凡是本地能跑的环节，先在本地跑** ✓ —— 比装到 NAS 上猜快得多。

这个脚本做两件事：

1. 把 `/cgi/ThirdParty/cadviewer/index.cgi/**` 的请求**交给真正的 `index.cgi`** 执行
   （补上 `REQUEST_URI` 等 CGI 变量、模拟框架注入的 `X-Trim-UserId` 头）
2. 其余路径一律 404 —— 刻意**不**直接暴露 `www/`，
   这样"页面能不能加载"验的就是**CGI 的路由与 MIME**，跟真机同一条路径 ✓

## 用法

    python tools/localtest.py --port 8899
    # 然后浏览器打开：
    #   完整版（桌面图标）  http://127.0.0.1:8899/cgi/ThirdParty/cadviewer/index.cgi/full/index.html
    #   简易版（右键预览）  http://127.0.0.1:8899/cgi/ThirdParty/cadviewer/index.cgi/index.html

## 注意

- `/api/raw` 只接受 `/vol*` 开头的路径 → 本地测试要在 **Git Bash 的根**下造一个假的
  `/vol1/...`（见 `--prepare-sample`），例如
  `C:\\Program Files\\WorkBuddyAI\\resources\\vendor\\PortableGit\\vol1\\1000\\ssd\\test\\`
- 前端调飞牛 JS SDK 的部分（`pickUserFile` / `openAppAuth`）在本地**验不了** ✗
  —— 那部分只能真机验 ✓
"""
import argparse
import os
import subprocess
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, ".."))
UI = os.path.join(ROOT, "fpk", "cadviewer", "app", "ui")
CGI = os.path.join(UI, "index.cgi")

PREFIX = "/cgi/ThirdParty/cadviewer/index.cgi"


class Server(ThreadingHTTPServer):
    daemon_threads = True

    def handle_error(self, request, client_address):
        # 浏览器取消请求（换页、range 探测等）会让连接提前断开 —— 这是正常的，
        # 不用把栈打出来（真机排查时这些噪声会淹掉有用信息）
        pass


class Handler(BaseHTTPRequestHandler):
    server_version = "localtest/1.0"

    def log_message(self, fmt, *args):  # 每个请求打一行（排查时最有用）
        sys.stderr.write("  %s %s\n" % (self.address_string(), fmt % args))
        sys.stderr.flush()

    def do_GET(self):  # noqa: N802
        self._serve(head=False)

    def do_HEAD(self):  # noqa: N802
        # ⚠️ HEAD **不能**写 body ✗ —— 写了会让 Chrome 认为响应框错乱，
        #    库里的 worker 就绪探测（HEAD + 分段 GET 兜底）会判失败
        self._serve(head=True)

    def _serve(self, head):
        if not self.path.startswith(PREFIX):
            self.send_error(404, "only the CGI prefix is served")
            return
        rel = self.path[len(PREFIX):] or "/"
        env = os.environ.copy()
        env.update(
            {
                "REQUEST_URI": self.path,
                "REQUEST_METHOD": "HEAD" if head else "GET",
                "SERVER_PROTOCOL": "HTTP/1.1",
                "SERVER_NAME": "127.0.0.1",
                "SCRIPT_NAME": PREFIX,
                "PATH_INFO": rel,
                # 模拟飞牛统一网关注入的身份头（真机 0.2.5 diag 实测就是这两个）
                "HTTP_X_TRIM_USERID": "1000",
                "HTTP_X_TRIM_USERNAME": "yang",
            }
        )
        p = subprocess.run(
            ["bash", CGI], cwd=UI, env=env, capture_output=True
        )
        out = p.stdout
        if not out:
            self.send_error(500, "CGI produced no output: %s" % p.stderr[:300])
            return

        head_bytes, _, body = out.partition(b"\n\n")
        status = 200
        headers = []
        for line in head_bytes.decode("utf-8", "replace").splitlines():
            if not line.strip():
                continue
            name, _, value = line.partition(":")
            name = name.strip()
            value = value.strip()
            if name.lower() == "status":
                try:
                    status = int(value.split()[0])
                except ValueError:
                    pass
            elif name.lower() == "content-length":
                pass  # 我们自己算（避免 CGI 报的长度和实际不符时卡住）
            else:
                headers.append((name, value))

        self.send_response(status)
        sent = set()
        for name, value in headers:
            self.send_header(name, value)
            sent.add(name.lower())
        if "content-type" not in sent:
            self.send_header("Content-Type", "application/octet-stream")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if not head:
            self.wfile.write(body)


def prepare_sample():
    """在 Git Bash 的根下造一个假的 `/vol1/1000/ssd/test/`，放一张示例图纸。"""
    src = os.path.join(UI, "www", "cad-data", "data", "canteen.dwg")
    if not os.path.isfile(src):
        print("✗ 找不到示例图纸：%s" % src)
        return 1
    r = subprocess.run(
        ["bash", "-c",
         "mkdir -p /vol1/1000/ssd/test && "
         "cat > /vol1/1000/ssd/test/测试图纸.dwg && "
         "cygpath -w /vol1/1000/ssd/test/测试图纸.dwg"],
        stdin=open(src, "rb"), capture_output=True,
    )
    if r.returncode != 0:
        print("✗ 造样本失败：%s" % r.stderr.decode("utf-8", "replace"))
        return 1
    win = r.stdout.decode("utf-8", "replace").strip()
    print("✓ 样本就绪：%s" % win)
    print("  测试用 URL：")
    print("    %s/full/index.html?path=/vol1/1000/ssd/test/测试图纸.dwg" % PREFIX)
    return 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--port", type=int, default=8899)
    ap.add_argument("--prepare-sample", action="store_true",
                    help="只在 Git Bash 根下造一张 /vol1 下的示例图纸，然后退出")
    args = ap.parse_args()

    if args.prepare_sample:
        sys.exit(prepare_sample())

    if not os.path.isfile(CGI):
        print("✗ 找不到 %s" % CGI)
        sys.exit(1)

    srv = Server(("127.0.0.1", args.port), Handler)
    base = "http://127.0.0.1:%d%s" % (args.port, PREFIX)
    print("本地测试服务器已启动（Ctrl-C 退出）")
    print("  完整版（桌面图标）  %s/full/index.html" % base)
    print("  简易版（右键预览）  %s/index.html" % base)
    print("  诊断端点            %s/api/diag?path=/vol1/1000/ssd/test/测试图纸.dwg" % base)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
