# -*- coding: utf-8 -*-
"""构建 fnos-cadviewer 的 .fpk。

## ⚠️⚠️ 重要：**绝对不要试图修改打好的 .fpk** ✗

2026-10-08 踩过：为了让包里的 `app/ui/index.cgi` 带上可执行位，
我写了个脚本**重打包 fpk**（改权限 + 重算 checksum + 保留尾部数据）——
结果装的时候被拒：**「不是有效的 fpk 文件」** ✗

原因：**fpk 尾部有一段完整性校验**（约 200~260 字节，疑似签名 ——
同一份源码用 fnpack 连打两次尾部都不同，但**只要改了内容就失效**）。
→ **fnpack 打出来什么样就什么样，别碰** ✓

## 那可执行位怎么办

**在 `cmd/install_callback` / `cmd/upgrade_callback` 里 `chmod +x`** ✓✓
—— 那两个脚本是**框架执行的**，权限由框架负责 ✓；
而 `app/ui/index.cgi` 因为是从 Windows 打包（`fnpack.exe` 读不到 `chmod +x`），
进包时必然是 0666 ✗ → 装到 NAS 上不可执行 → CGI 入口 404 ✗

（官方文档也提示过：「如果在设备上手动测试，请确认该文件可以执行」✓）

## 用法

    python fpk/build.py            # 打包 + 自检
    python fpk/build.py --check    # 只自检
"""
import hashlib
import io
import os
import re
import subprocess
import sys
import tarfile

HERE = os.path.dirname(os.path.abspath(__file__))
APP = "cadviewer"
FPK = os.path.join(HERE, APP + ".fpk")


def check():
    """自检：结构 / checksum / 关键文件 / 回调是否带 chmod。"""
    ok = True
    raw = open(FPK, "rb").read()
    with tarfile.open(fileobj=io.BytesIO(raw)) as t:
        names = [m.name for m in t.getmembers()]
        mf = t.extractfile("manifest").read().decode("utf-8", "replace")
        app = t.extractfile("app.tgz").read()

    ck = re.search(r"checksum\s*=\s*(\w+)", mf).group(1)
    ck_ok = ck == hashlib.md5(app).hexdigest()
    print("  checksum 自洽          : %s" % ("✓" if ck_ok else "✗"))
    ok &= ck_ok

    with tarfile.open(fileobj=io.BytesIO(app), mode="r:gz") as t2:
        inner = [m.name for m in t2.getmembers() if m.isfile()]
    for k in ("ui/config", "ui/index.cgi", "ui/www/index.html", "ui/www/app.js",
              "ui/www/vendor/trimjs/index.js"):
        hit = any(nm.endswith(k) for nm in inner)
        print("  含 %-30s: %s" % (k, "✓" if hit else "✗"))
        ok &= hit

    # 关键：安装回调必须补 +x（否则 CGI 404）
    cbs = []
    for n in ("cmd/install_callback", "cmd/upgrade_callback"):
        if n not in names:
            print("  ✗ 缺 %s" % n)
            ok = False
            continue
        with tarfile.open(fileobj=io.BytesIO(raw)) as t:
            s = t.extractfile(n).read().decode("utf-8", "replace")
        has = "chmod +x" in s
        cbs.append(has)
        print("  %-22s 含 chmod +x: %s" % (n, "✓" if has else "✗ ← CGI 会 404"))
    ok &= all(cbs)

    print("  版本                  : %s"
          % re.search(r"(?m)^version\s*=\s*(\S+)", mf).group(1))
    return ok


def main():
    print("=" * 64)
    print("构建 %s.fpk（只跑 fnpack，**不要**再后处理）" % APP)
    print("=" * 64)
    fnpack = os.path.join(HERE, "tools", "fnpack.exe")
    if not os.path.isfile(fnpack):
        fnpack = os.path.join(HERE, "tools", "fnpack")
    if not os.path.isfile(fnpack):
        print("  ✗ 找不到 fnpack（tools/ 下）")
        sys.exit(1)
    print("① fnpack 打包")
    r = subprocess.run([fnpack, "build", "-d", APP], cwd=HERE)
    if r.returncode != 0:
        sys.exit(1)

    print("② 自检")
    ok = check()
    print()
    if ok:
        print("✅ 完成：%s（%d 字节）" % (FPK, os.path.getsize(FPK)))
        print("   ⚠️ 包里 index.cgi 是 0666 —— 这是**正常的**，安装回调会补 +x ✓")
    else:
        print("❌ 自检没过，别发这个包")
        sys.exit(1)


if __name__ == "__main__":
    if "--check" in sys.argv:
        sys.exit(0 if check() else 1)
    main()
