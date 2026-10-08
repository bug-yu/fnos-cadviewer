# -*- coding: utf-8 -*-
"""构建前端（`page/`）并把产物同步进 `fpk/cadviewer/app/ui/www/`。

## 一次构建、两个页面

| 页面 | 入口 | 用途 |
|---|---|---|
| 简易版 | `page/index.html` → `www/index.html` | 文件管理器**右键预览**（桌面窗口 iframe 里） |
| 完整版 | `page/full/index.html` → `www/full/index.html` | **桌面图标**打开（Vue 3：菜单/功能区/命令行/状态栏） |

**为什么放在同一个 vite 工程里**：两个页面共用同一份 `pnpm-lock.yaml` ✓ ——
0.2.4 踩过「复制 package.json 但没带 lockfile → 依赖漂到新版 → 图纸全黑」✗，
单 lockfile 从根上避免两个页面各自漂版本。顺带 rollup 还能把 three / data-model
这些大 chunk 在**两个入口之间共享** ✓（体积也更小）。

## 为什么要单独一步同步

`www/` 里除了页面产物，还有**预置的**约 79 MB 资源（`cad-data/` 的字体、
`assets/` 里的 worker/wasm、第三方 SDK 的 `vendor/`）——
所以**不能**让 vite 直接输出到 `www/`（它的 `emptyOutDir` 会把那些清掉 ✗）。

做法：vite 构建到 `page/dist` → 再**覆盖 + 清掉多余**地同步过去 ✓
（"覆盖 + 只删多出来的"是这套流程的固定姿势 ——
 整目录删除会触发批量删除护栏，见技能里的记录）

## 完整版的资源怎么摆（**9.5 MB 的 WASM 只打一份**）

```
www/
├── index.html            ← 简易版
├── callback.html         ← 简易版的 openAppAuth 回调页
├── assets/               ← **两个页面共用**（vite 一次构建，chunk 带哈希不会撞）
│   ├── libredwg-parser-worker.js + libredwg-web.wasm   ← 只此一份 ✓
│   ├── mtext-renderer-worker.js
│   └── viewer-runtime.iife.js                          ← HTML 导出运行时
├── cad-data/             ← 字体/模板（54 MB，只此一份）
└── full/
    ├── index.html        ← 完整版
    ├── callback.html     ← 完整版的 openAppAuth 回调页（redirectUri 按页面路径推算）
    └── assets/
        └── mtext-renderer-worker.js  ← ⚠️ 只有这一个必须复制一份，见下
```

**为什么只复制 mtext worker**：
`@mlightcad/cad-viewer` **没有** `webworkerFileUrls` 这个 prop ✗ →
MTEXT worker 的地址走 `cad-simple-viewer` 的默认值 `./assets/mtext-renderer-worker.js`
（**相对页面**）→ 完整版页面在 `full/` 下，默认就指到 `full/assets/` ✓
其余两个（LibreDWG worker、HTML 导出运行时）我们都**能**显式传 URL，
所以在 `full/src/App.vue` 里指到共享的 `../assets/` ✓（省 9.5 MB）
—— LibreDWG 的 worker 会用 `import.meta.url` 找同目录的 `libredwg-web.wasm` ✓

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

# 完整版页面在 `full/` 下，而 MTEXT worker 的地址由库的默认值决定（相对页面）
# → 必须在这一层也放一份（1.2 MB；其余 9.5 MB 的 wasm 是共享的，不重复）
MTEXT_WORKER = "mtext-renderer-worker.js"


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

    # 完整版：MTEXT worker 必须在 full/assets/ 下也有一份（库的默认路径是相对页面的）
    full_assets = os.path.join(WWW, "full", "assets")
    os.makedirs(full_assets, exist_ok=True)
    src = os.path.join(dst_assets, MTEXT_WORKER)
    if os.path.isfile(src):
        shutil.copy2(src, os.path.join(full_assets, MTEXT_WORKER))
        print("  复制 %s → full/assets/（库的默认路径）" % MTEXT_WORKER)
    else:
        print("  ✗ 缺 %s —— 完整版的文字渲染会失败" % MTEXT_WORKER)
        sys.exit(1)

    # 自检：关键文件在不在
    print("③ 自检")
    checks = [
        "index.html",                                          # 简易版
        "callback.html",                                       # 简易版回调页
        os.path.join("full", "index.html"),                    # 完整版
        os.path.join("full", "callback.html"),                 # 完整版回调页
        os.path.join("full", "assets", MTEXT_WORKER),          # 完整版的 mtext worker
        os.path.join("assets", "libredwg-web.wasm"),           # 共享的 9.5 MB wasm
        os.path.join("assets", "libredwg-parser-worker.js"),
        os.path.join("assets", "viewer-runtime.iife.js"),
        os.path.join("cad-data", "fonts"),
    ]
    for k in checks:
        p = os.path.join(WWW, k)
        ok = os.path.isdir(p) or os.path.isfile(p)
        print("  含 %-42s: %s" % (k, "✓" if ok else "✗"))
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
