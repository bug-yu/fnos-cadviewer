# -*- coding: utf-8 -*-
"""构建 fnos-cadviewer 的 .fpk —— **打包 + 修可执行位 + 自检** 一条龙。

## 为什么不能只跑 fnpack

官方文档说「打包工具会在打包过程中处理可执行权限」，但 **`fnpack.exe` 在 Windows 上
读不到 Git Bash 的 `chmod +x`** ✗ → 打出来的包里 `app/ui/index.cgi` 是 **0666** ✗
→ CGI 入口在 NAS 上**不可执行** → 桌面图标打开就 404 ✗（2026-10-08 真机踩到）

所以必须补一步 `fix_fpk_modes.py`（改权限 + 重算 manifest.checksum + 保留尾部数据）。

## 用法

    python fpk/build.py            # 完整构建
    python fpk/build.py --check    # 只自检已有的 fpk
"""
import io
import os
import re
import subprocess
import sys
import tarfile

HERE = os.path.dirname(os.path.abspath(__file__))
APP = "cadviewer"
APP_DIR = os.path.join(HERE, APP)
FPK = os.path.join(HERE, APP + ".fpk")


def sh(cmd, **kw):
    print("  $ %s" % " ".join(cmd))
    r = subprocess.run(cmd, cwd=HERE, **kw)
    if r.returncode != 0:
        print("  ✗ 失败（退出码 %d）" % r.returncode)
        sys.exit(1)


def check():
    """自检：权限 / checksum / 尾部 / 关键文件。"""
    import hashlib
    raw = open(FPK, "rb").read()
    n = len(raw) // 512
    last = -1
    for i in range(n):
        if raw[i * 512:(i + 1) * 512].strip(b"\x00"):
            last = i
    tail = raw[(last + 1) * 512:]

    ok = True
    with tarfile.open(fileobj=io.BytesIO(raw)) as t:
        names = [m.name for m in t.getmembers()]
        mf = t.extractfile("manifest").read().decode("utf-8", "replace")
        app = t.extractfile("app.tgz").read()
    ck = re.search(r"checksum\s*=\s*(\w+)", mf).group(1)
    ck_ok = ck == hashlib.md5(app).hexdigest()
    print("  checksum 自洽        : %s" % ("✓" if ck_ok else "✗"))
    ok &= ck_ok

    with tarfile.open(fileobj=io.BytesIO(app), mode="r:gz") as t2:
        inner = [(m.name, m.mode) for m in t2.getmembers() if m.isfile()]
    cgi = [m for nm, m in inner if nm.endswith("index.cgi")]
    cgi_ok = bool(cgi) and cgi[0] == 0o755
    print("  index.cgi 可执行(755): %s" % ("✓" if cgi_ok else "✗  ← CGI 会 404"))
    ok &= cgi_ok

    print("  尾部附加数据        : %d 字节" % len(tail))
    need = ["ui/config", "ui/index.cgi", "ui/www/index.html", "ui/www/app.js",
            "ui/www/vendor/trimjs/index.js"]
    for k in need:
        hit = any(nm.endswith(k) for nm, _ in inner)
        print("  含 %-32s: %s" % (k, "✓" if hit else "✗"))
        ok &= hit

    print("  版本                : %s"
          % (re.search(r"(?m)^version\s*=\s*(\S+)", mf).group(1)))
    return ok


def main():
    print("=" * 64)
    print("构建 %s.fpk" % APP)
    print("=" * 64)
    print("① fnpack 打包")
    fnpack = os.path.join(HERE, "tools", "fnpack.exe")
    if not os.path.isfile(fnpack):
        fnpack = os.path.join(HERE, "tools", "fnpack")
    if not os.path.isfile(fnpack):
        print("  ✗ 找不到 fnpack（tools/ 下）")
        sys.exit(1)
    sh([fnpack, "build", "-d", APP])

    print("② 修可执行位 + 重算 checksum")
    sh([sys.executable, os.path.join(HERE, "tools", "fix_fpk_modes.py"), FPK])

    print("③ 自检")
    ok = check()
    print()
    if ok:
        print("✅ 完成：%s（%d 字节）" % (FPK, os.path.getsize(FPK)))
    else:
        print("❌ 自检没过，别发这个包")
        sys.exit(1)


if __name__ == "__main__":
    if "--check" in sys.argv:
        sys.exit(0 if check() else 1)
    main()
