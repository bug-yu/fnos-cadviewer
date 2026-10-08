# -*- coding: utf-8 -*-
"""发布 fnos-cadviewer：建 tag + Release + 传 .fpk。

Release 说明取自 `fpk/cadviewer/manifest` 里的 `changelog`（按版本号切出这一段）。
幂等：Release 已存在就只更新说明与补资产。

    python fpk/tools/release.py 0.1.1
"""
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

REPO = "bug-yu/fnos-cadviewer"
ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
FPK = os.path.join(ROOT, "fpk", "cadviewer.fpk")
MANIFEST = os.path.join(ROOT, "fpk", "cadviewer", "manifest")


def token():
    p = subprocess.run(["git", "credential", "fill"], cwd=ROOT,
                       input="protocol=https\nhost=github.com\n\n",
                       capture_output=True, text=True, timeout=90)
    for line in p.stdout.splitlines():
        if line.startswith("password="):
            return line[len("password="):].strip()
    raise SystemExit("取不到凭据")


def api(method, url, payload=None, raw=None, ctype="application/json", tries=4):
    for i in range(1, tries + 1):
        req = urllib.request.Request(url, method=method)
        req.add_header("Authorization", "Bearer " + TOK)
        req.add_header("User-Agent", "workbuddy-release")
        req.add_header("Accept", "application/vnd.github+json")
        body = None
        if payload is not None:
            body = json.dumps(payload).encode()
            req.add_header("Content-Type", "application/json")
        elif raw is not None:
            body = raw
            req.add_header("Content-Type", ctype)
        try:
            with urllib.request.urlopen(req, data=body, timeout=900) as r:
                return r.status, r.read()
        except urllib.error.HTTPError as e:
            return e.code, e.read()
        except Exception as e:
            print("    重试 %d/%d：%s" % (i, tries, str(e)[:70]))
            time.sleep(4)
    return 0, b""


VER = sys.argv[1] if len(sys.argv) > 1 else None
if not VER:
    print(__doc__)
    raise SystemExit(2)
TAG = "v" + VER
TOK = token()

# 说明：从 manifest 的 changelog 里切出本版本那一段
mf = open(MANIFEST, encoding="utf-8").read()
cl = re.search(r"(?m)^changelog\s*=\s*(.+)$", mf).group(1).strip()
body = cl
if ("%s：" % VER) in cl:
    body = "%s：%s" % (VER, cl.split("%s：" % VER, 1)[1])
    m = re.search(r"(\d+\.\d+\.\d+：)", body[len(VER) + 1:])
    if m:
        body = body[:len(VER) + 1 + m.start()]
print("① 说明（%d 字符）：%s" % (len(body), body[:70]))

r = subprocess.run(["git", "rev-parse", TAG], cwd=ROOT, capture_output=True, text=True)
if r.returncode != 0:
    subprocess.run(["git", "tag", "-a", TAG, "-m", "%s" % TAG], cwd=ROOT, capture_output=True)
    subprocess.run(["git", "push", "origin", TAG], cwd=ROOT, capture_output=True)
    print("② tag %s 已建并推送" % TAG)
else:
    print("② tag %s 已存在" % TAG)

st, d = api("GET", "https://api.github.com/repos/%s/releases?per_page=100" % REPO)
rel = next((x for x in json.loads(d) if x["tag_name"] == TAG), None)
if rel is None:
    st, d = api("POST", "https://api.github.com/repos/%s/releases" % REPO,
                {"tag_name": TAG, "name": TAG, "body": body, "draft": False})
    if st not in (200, 201):
        print("③ ✗ 建 Release 失败 HTTP %s：%s" % (st, d[:200]))
        raise SystemExit(1)
    rel = json.loads(d)
    print("③ Release %s 已建" % TAG)
else:
    api("PATCH", "https://api.github.com/repos/%s/releases/%s" % (REPO, rel["id"]), {"body": body})
    print("③ Release %s 已存在，说明已更新" % TAG)

name = os.path.basename(FPK)
size = os.path.getsize(FPK)
have = {a["name"]: a["size"] for a in rel.get("assets", [])}
if have.get(name) == size:
    print("④ %s 已在 Release 上（%d 字节）" % (name, size))
else:
    print("④ 上传 %s（%d 字节）…" % (name, size))
    url = ("https://uploads.github.com/repos/%s/releases/%s/assets?name=%s"
           % (REPO, rel["id"], urllib.parse.quote(name)))
    st, d = api("POST", url, raw=open(FPK, "rb").read(), ctype="application/octet-stream")
    print("    %s" % ("✓ 成功" if st in (200, 201) else "✗ HTTP %s %s" % (st, d[:150])))

print()
print("Release 页：")
st, d = api("GET", "https://api.github.com/repos/%s/releases?per_page=100" % REPO)
for x in json.loads(d):
    print("  %s  %s" % (x["tag_name"], [a["name"] for a in x["assets"]]))
