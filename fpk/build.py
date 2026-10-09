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
import json
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
    for k in ("ui/config", "ui/index.cgi",
              # 简易版（右键预览）
              "ui/www/index.html",
              "ui/www/callback.html",
              # 完整版（桌面图标）—— 0.4.0 起入口指向这里
              "ui/www/full/index.html",
              "ui/www/full/callback.html",
              "ui/www/full/assets/mtext-renderer-worker.js",
              # 两个页面共享的大资源（只此一份）
              "ui/www/assets/libredwg-web.wasm",
              "ui/www/cad-data/fonts"):
        hit = any(nm.endswith(k) or k in nm for nm in inner)
        print("  含 %-34s: %s" % (k, "✓" if hit else "✗"))
        ok &= hit
    fonts = [nm for nm in inner if "cad-data/fonts/" in nm]
    print("  字体文件数（应 >= 80）             : %d %s"
          % (len(fonts), "✓" if len(fonts) >= 80 else "✗"))
    ok &= len(fonts) >= 80

    # 入口分流（0.4.0 起）：桌面图标 → 完整版 /full/，右键预览 → 简易版 /
    # （0.2.x 那几次的 404 全出在入口配置上，所以这里也断言一下）
    with tarfile.open(fileobj=io.BytesIO(app), mode="r:gz") as t2:
        uicfg = json.loads(t2.extractfile("ui/config").read().decode("utf-8"))
    entries = uicfg.get(".url", {})
    app_url = entries.get("cadviewer.Application", {}).get("url", "")
    view_url = entries.get("cadviewer.view", {}).get("url", "")
    routing = app_url.endswith("/full/index.html") and not view_url.endswith("/full/index.html")
    print("  入口分流（桌面→/full/、右键→简易版）: %s" % ("✓" if routing else "✗"))
    if not routing:
        print("     桌面图标 url = %s" % app_url)
        print("     右键预览 url = %s" % view_url)
    ok &= routing

    # 应用设置里的显示：入口**保留**，只藏「访问端口 / 访问路径 / 自定义 URL」三行。
    # ⚠️ 别用 accessPerm=hidden ✗ —— 实测（FileView 那边早就踩过）它会把**整个入口**
    #    一起隐藏，而不是只隐藏设置项；官方文档只记了它 editable/readonly/hidden 三态。
    #    portPerm / pathPerm / fullUrlPerm 官方文档**未记载**，是照第三方应用抄来的，
    #    真正把那三行藏起来的就是它们 ✓
    ctrl_bad = []
    for name in ("cadviewer.Application", "cadviewer.view"):
        c = entries.get(name, {}).get("control", {})
        if c.get("accessPerm") != "editable":
            ctrl_bad.append("%s.accessPerm=%r（应为 editable）" % (name, c.get("accessPerm")))
        for k in ("portPerm", "pathPerm", "fullUrlPerm"):
            if c.get(k) != "hidden":
                ctrl_bad.append("%s.%s=%r（应为 hidden）" % (name, k, c.get(k)))
    print("  设置页只藏「端口/路径/自定义URL」三行 : %s" % ("✓" if not ctrl_bad else "✗"))
    for b in ctrl_bad:
        print("     %s" % b)
    ok &= not ctrl_bad

    # 图标规范（官方 developer.fnnas.com/docs/core-concepts/icon）：
    #   根目录 ICON.PNG 64x64 + ICON_256.PNG 256x256；入口 app/ui/images/icon_{64,256}.png
    #   ≤ 1024 KB；**圆角矩形主体**（不要直角满铺）
    #   ⚠️ 这条以前没有断言，所以默认图标一直是**飞牛的通用蓝色牛头**，没人发现 ✗
    #      （0.4.3 才换成自己设计的 CAD 图标）
    #   ⚠️ 这里**不用 Pillow** —— 构建机上不一定装了它（本机系统 python 就没有），
    #      而「有 Pillow 才检查、没有就跳过」等于没有断言 ✗
    #      改成直接解析 PNG 头（IHDR）取尺寸与色彩类型，纯标准库 ✓
    #      「四角必须透明」这条要解码像素，交给 gen_icons.py 自检（它必须有 Pillow）✓
    def _png_head(data):
        """返回 (宽, 高, 色彩类型)；不是 PNG 返回 None。6 = RGBA，2 = RGB。"""
        if data[:8] != b"\x89PNG\r\n\x1a\n":
            return None
        return (int.from_bytes(data[16:20], "big"),
                int.from_bytes(data[20:24], "big"),
                data[25])

    icon_bad = []
    icon_spec = (("ICON.PNG", 64), ("ICON_256.PNG", 256))
    inner_spec = (("ui/images/icon_64.png", 64), ("ui/images/icon_256.png", 256))
    with tarfile.open(fileobj=io.BytesIO(raw)) as t:
        outer_icons = [(n, want, t.extractfile(n).read())
                       for n, want in icon_spec if n in names]
        for n, _ in icon_spec:
            if n not in names:
                icon_bad.append("缺 %s" % n)
    with tarfile.open(fileobj=io.BytesIO(app), mode="r:gz") as t2:
        inner_files = [m.name for m in t2.getmembers() if m.isfile()]
        inner_icons = [(n, want, t2.extractfile(n).read())
                       for n, want in inner_spec if n in inner_files]
        for n, _ in inner_spec:
            if n not in inner_files:
                icon_bad.append("缺 %s" % n)
    for label, want, data in outer_icons + inner_icons:
        if len(data) > 1024 * 1024:
            icon_bad.append("%s 超过 1024 KB（%d 字节）" % (label, len(data)))
        head = _png_head(data)
        if head is None:
            icon_bad.append("%s 不是 PNG" % label)
            continue
        w, h, ct = head
        if (w, h) != (want, want):
            icon_bad.append("%s 尺寸 %dx%d（应为 %dx%d）" % (label, w, h, want, want))
        if ct != 6:
            icon_bad.append("%s 色彩类型 %d（应为 6=RGBA —— 圆角需要透明四角）"
                            % (label, ct))
    print("  图标规范（64/256 + RGBA + ≤1MB）: %s" % ("✓" if not icon_bad else "✗"))
    for b in icon_bad:
        print("     %s" % b)
    ok &= not icon_bad

    # 应用设置里的「访问权限」标签页必须隐藏 —— `disable_authorization_path=true`。
    # 本应用走的是 JS SDK **按次选择器**（pickUserFile / openAppAuth），不预先授权固定目录，
    # 所以那一栏永远是「暂无授权记录」，留着只会让人以为哪里没配好。
    # ⚠️ 别退回 false（FileView 那边早就用同一写法了）；这条防回潮。
    dap = re.search(r"(?m)^\s*disable_authorization_path\s*=\s*(\S+)", mf)
    dap_ok = bool(dap) and dap.group(1).strip().lower() == "true"
    print("  隐藏「访问权限」标签页        : %s" % ("✓" if dap_ok else "✗ ← 会显示「暂无授权记录」那一栏"))
    ok &= dap_ok

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
