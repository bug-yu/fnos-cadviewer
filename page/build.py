# -*- coding: utf-8 -*-
"""构建前端（`page/`）并把产物同步进 `fpk/cadviewer/app/ui/www/`。

## 为什么要单独一步

`www/` 里除了页面产物，还有**预置的**约 79 MB 资源（`cad-data/` 的字体、
部分 `assets/`、第三方 SDK 的 `vendor/`）——
所以**不能**让 vite 直接输出到 `www/`（它的 `emptyOutDir` 会把那些清掉 ✗）。

做法：vite 构建到 `page/dist` → 再**覆盖 + 清掉多余**地同步过去 ✓
（"覆盖 + 只删多出来的"是这套流程的固定姿势 ——
 整目录删除会触发批量删除护栏，见技能里的记录）

## 用法

    python page/build.py            # 构建 + 同步
    python page/build.py --skip-build   # 只同步（dist 已经构建好）
"""
import os
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, ".."))
DIST = os.path.join(HERE, "dist")
WWW = os.path.join(ROOT, "fpk", "cadviewer", "app", "ui", "www")

# 这些子目录**不**从 dist 同步（www 里是预置的）
SKIP_PREFIX = ("cad-data",)


def build():
    corepack = shutil.which("corepack") or os.path.expanduser(
        "~/.workbuddy-ai/binaries/node/versions/22.22.2-3/corepack.cmd"
    )
    if not corepack or not os.path.exists(corepack):
        print("  ✗ 找不到 corepack/pnpm")
        sys.exit(1)
    print("① 构建（tsc && vite build）")
    r = subprocess.run([corepack, "pnpm", "run", "build"], cwd=HERE)
    if r.returncode != 0:
        print("  ✗ 构建失败")
        sys.exit(1)


def sync():
    print("② 同步进 www/")
    if not os.path.isdir(DIST):
        print("  ✗ 没有 dist/")
        sys.exit(1)
    copied = 0
    for dp, _dn, fn in os.walk(DIST):
        rel = os.path.relpath(dp, DIST)
        if rel.startswith(SKIP_PREFIX):
            continue
        dst = WWW if rel == "." else os.path.join(WWW, rel)
        os.makedirs(dst, exist_ok=True)
        for f in fn:
            shutil.copy2(os.path.join(dp, f), os.path.join(dst, f))
            copied += 1
    print("  覆盖/新增 %d 个文件" % copied)

    # 清掉 assets 里多余的旧文件（带哈希，每次构建都会换名）
    src_assets = os.path.join(DIST, "assets")
    dst_assets = os.path.join(WWW, "assets")
    stale = [
        f
        for f in os.listdir(dst_assets)
        if not os.path.exists(os.path.join(src_assets, f))
    ]
    for f in stale:
        os.remove(os.path.join(dst_assets, f))
    print("  清掉多余 %d 个" % len(stale))

    # 自检：关键文件在不在
    print("③ 自检")
    for k in ("index.html", "callback.html",
              os.path.join("assets", "libredwg-web.wasm"),
              os.path.join("cad-data", "fonts")):
        p = os.path.join(WWW, k)
        ok = os.path.isdir(p) or os.path.isfile(p)
        print("  含 %-34s: %s" % (k, "✓" if ok else "✗"))
        if not ok:
            sys.exit(1)
    n = len(os.listdir(os.path.join(WWW, "cad-data", "fonts")))
    print("  字体 %d 个 %s" % (n, "✓" if n >= 80 else "✗"))
    print("  www 总大小：%.1f MB"
          % (sum(os.path.getsize(os.path.join(dp, f))
                 for dp, _dn, fn in os.walk(WWW) for f in fn) / 1048576))


if __name__ == "__main__":
    if "--skip-build" not in sys.argv:
        build()
    sync()
    print()
    print("✅ 前端就绪。接着跑： python fpk/build.py  （打包 .fpk）")
