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


def git(*args):
    """跑一条 git 命令，返回 (退出码, stdout, stderr)。"""
    p = subprocess.run(["git"] + list(args), cwd=ROOT,
                       capture_output=True, text=True, timeout=180)
    return p.returncode, p.stdout.strip(), p.stderr.strip()


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

# ---------------------------------------------------------------------------
# ② tag 必须指向**本地 HEAD**
# ---------------------------------------------------------------------------
# ⚠️⚠️ 旧写法是「`git rev-parse TAG` 成功就跳过」—— 于是**本地 tag 停在旧提交上时
#    永远不修** ✗。0.4.3 就踩了：先发了一版（tag → 9459e23），换图标后重发，
#    本地 tag 还在 9459e23，Release 的源码包与 README 就一直是旧的 ✗
#    而且 GitHub 建 Release 时若不给 target_commitish，tag 还会落在
#    「远端默认分支当时的位置」上 —— 所以「未推送就发版」也要拦住。
rc, ahead, _ = git("log", "--oneline", "@{u}..HEAD")
if ahead:
    print("❌ 有**未推送**的提交 —— 远端默认分支还停在旧位置：")
    for line in ahead.splitlines():
        print("     " + line)
    print("   先 `git push origin HEAD` 再发版，否则 tag 会建在旧提交上 ✗")
    raise SystemExit(1)

HEAD_SHA = git("rev-parse", "HEAD")[1]


def remote_tag_sha():
    """远端同名 tag 指向的**提交**（注解 tag 取 peeled 值）；不存在返回 None。"""
    rc, out, _ = git("ls-remote", "--tags", "origin",
                     "refs/tags/%s" % TAG, "refs/tags/%s^{}" % TAG)
    if not out:
        return None
    plain = None
    for line in out.splitlines():
        parts = line.split("\t")
        if len(parts) != 2:
            continue
        sha, ref = parts
        if ref.endswith("^{}"):
            return sha          # peeled = 真正的提交对象
        plain = sha
    return plain


# ---------------------------------------------------------------------------
# ③ 先把已有的 Release 删掉 + 清掉游离项 —— **必须在动 tag 之前** ✗
# ---------------------------------------------------------------------------
# ⚠️⚠️⚠️ 只要一个 tag 上**挂着 Release**，无论你是「删掉这个 tag」还是
#   「`push -f` 移动这个 tag」，GitHub 都会把这个 Release 改成
#   `untagged-<hash>`（**丢掉 tag 关联**）✗
#   而且改名是**异步**的 —— 用 API 把 tag_name 改回去，过一会儿还会被再改一次 ✗
#   （0.4.3 连踩两次：先删 tag → 游离；改成 push -f → **还是**游离）
#   正确顺序：**先删 Release**（此时 tag 上没挂东西）→ 再动 tag → 最后建 Release ✓
st, d = api("GET", "https://api.github.com/repos/%s/releases?per_page=100" % REPO)
# ⚠️ 解析要兜住异常 —— `api()` 在重试耗尽时会返回 `(0, b"")`，
#    直接 `json.loads` 会抛异常把整个发版流程打断 ✗
#    （FileView 0.5.59 就这么崩过一次，而且是**在删掉 Release 之后**崩的 →
#      留下一个没有 Release 的 tag ✗）
rels = []
if st == 200 and d:
    try:
        rels = json.loads(d)
    except Exception as e:
        print("   ⚠️ 取 Release 列表解析失败（%s），跳过清理" % str(e)[:60])
old_rel = next((x for x in rels if x["tag_name"] == TAG), None)
if old_rel is not None:
    api("DELETE", "https://api.github.com/repos/%s/releases/%s" % (REPO, old_rel["id"]))
    print("③ 删掉已有 Release id=%s（先删再动 tag，幂等）" % old_rel["id"])
# 顺手清理历史遗留的游离 Release（tag 被改名后留下的 `untagged-*`），
# 里面若含本应用的资产就一并删掉，别在 Release 页上堆着
for x in rels:
    if x["tag_name"].startswith("untagged-"):
        names = [a["name"] for a in x.get("assets", [])]
        if any(n.startswith("cadviewer.") for n in names):
            api("DELETE", "https://api.github.com/repos/%s/releases/%s" % (REPO, x["id"]))
            print("   🧹 清掉游离 Release id=%s（%s）" % (x["id"], x["tag_name"]))

# ---------------------------------------------------------------------------
# ② tag 必须指向**本地 HEAD**（此时 tag 上已经没有 Release 挂着，动了也不会游离 ✓）
# ---------------------------------------------------------------------------
rc, local, _ = git("rev-parse", "%s^{commit}" % TAG)
local = local if rc == 0 else None
remote = remote_tag_sha()
if local == HEAD_SHA and remote == HEAD_SHA:
    print("② tag %s 已指向 HEAD（%s）" % (TAG, HEAD_SHA[:8]))
else:
    git("tag", "-f", "-a", TAG, "-m", TAG)
    git("push", "-f", "origin", TAG)
    print("② tag %s → %s（原本地 %s / 原远端 %s）"
          % (TAG, HEAD_SHA[:8], (local or "无")[:8], (remote or "无")[:8]))

# ---------------------------------------------------------------------------
# ④ 建 Release（显式给 target_commitish，别让 GitHub 去猜默认分支）
# ---------------------------------------------------------------------------
st, d = api("POST", "https://api.github.com/repos/%s/releases" % REPO,
            {"tag_name": TAG, "name": TAG, "body": body,
             "target_commitish": HEAD_SHA, "draft": False})
if st not in (200, 201):
    print("④ ✗ 建 Release 失败 HTTP %s：%s" % (st, d[:200]))
    raise SystemExit(1)
rel = json.loads(d)
print("④ Release %s 已建" % TAG)

# 去重自愈：同一个 tag 上**只应有一个 Release**。
# 一旦出现过「GET /releases/tags/<tag> 返回 404、于是又建了一个」的情况，
# 就会留下两个同名 Release ✗ —— 这里把除刚建的这个以外的都删掉 ✓
st, d = api("GET", "https://api.github.com/repos/%s/releases?per_page=100" % REPO)
try:
    again = json.loads(d) if d else []
except Exception:
    again = []
for x in again:
    if x.get("tag_name") == TAG and x["id"] != rel["id"]:
        api("DELETE", "https://api.github.com/repos/%s/releases/%s" % (REPO, x["id"]))
        print("   🧹 清掉重复的 %s Release id=%s" % (TAG, x["id"]))

name = os.path.basename(FPK)
size = os.path.getsize(FPK)
have = {a["name"]: a["size"] for a in rel.get("assets", [])}
if have.get(name) == size:
    print("⑤ %s 已在 Release 上（%d 字节）" % (name, size))
else:
    # ⚠️ 同名资产**必须先删再传** ✗ —— 否则 GitHub 返回
    #    422 Validation Failed: "already_exists"（0.2.4 就撞了 ✗）
    for a in rel.get("assets", []):
        if a["name"] == name:
            st, _ = api("DELETE", "https://api.github.com/repos/%s/releases/assets/%s"
                        % (REPO, a["id"]))
            print("⑤ 删掉同名旧资产（%d 字节）→ HTTP %s" % (a["size"], st))
    print("⑤ 上传 %s（%d 字节）…" % (name, size))
    url = ("https://uploads.github.com/repos/%s/releases/%s/assets?name=%s"
           % (REPO, rel["id"], urllib.parse.quote(name)))
    st, d = api("POST", url, raw=open(FPK, "rb").read(), ctype="application/octet-stream")
    print("    %s" % ("✓ 成功" if st in (200, 201) else "✗ HTTP %s %s" % (st, d[:150])))

print()
print("Release 页：")
st, d = api("GET", "https://api.github.com/repos/%s/releases?per_page=100" % REPO)
try:
    for x in (json.loads(d) if d else []):
        print("  %s  %s" % (x["tag_name"], [a["name"] for a in x["assets"]]))
except Exception as e:
    print("  ⚠️ 列表获取失败：%s" % str(e)[:60])
