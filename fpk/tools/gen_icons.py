"""生成「CAD 查看器」的飞牛应用图标（64 / 256 两档）。

设计元素（两个方案共用）：
  · **平面图**（外墙 + 一道带门洞的隔墙）—— 这个应用实际打开的就是 2D 图纸 ✓
  · **尺寸标注**（琥珀色双箭头线）—— CAD 最独有的视觉符号，普通图片查看器没有 ✓

两个方案（`VARIANT` 决定哪个进包）：
  · `blueprint`（默认）**蓝图**：蓝底 + 白线 + 琥珀标注。
      「蓝图」本身就是 CAD 的经典意象，元素最少 → 64px 下最清晰 ✓
  · `sheet`  **图纸卡片**：白纸卡片 + 蓝线 + 琥珀标注，多一层「文档/查看器」的意味。

官方规范（developer.fnnas.com/docs/core-concepts/icon）：
  · 包图标 `ICON.PNG` 64x64 + `ICON_256.PNG` 256x256（放在包根目录）
  · 入口图标 `app/ui/images/icon_64.png` + `icon_256.png`（由 ui/config 的 icon 字段引用）
  · PNG、sRGB、≤ 1024 KB、**圆角矩形主体**（不要直角满铺）、不贴边
  · **64 px 下仍要能看清主体** ← 本脚本会额外输出 64px 放大预览供肉眼检查

⚠️ 全部用几何图形**程序化绘制**（不用位图素材）：可复现、可微调，
   也不牵扯任何第三方商标。
⚠️ 三个已经踩过的绘制坑（都在下面代码里标了）：
   ① PIL 的 `rectangle(outline, width)` 是**向内**描边，`line(width)` 是**居中**描边 ——
      混用会让内墙超出外墙内沿，看着像糊成一团 ✗
   ② 缩到 64px 后「小房间」会糊 —— 所以隔墙只留**一道**、并且留**门洞** ✓
   ③ 细线在 64px 下会整条消失（1024 下 <20 的线宽基本看不见）✗

依赖 Pillow：pip install pillow
用法：python gen_icons.py
"""

import os
import sys

from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
PKG = os.path.join(os.path.dirname(HERE), "cadviewer")   # fpk/cadviewer ← 包根目录
UI_IMAGES = os.path.join(PKG, "app", "ui", "images")

VARIANT = "blueprint"      # blueprint（默认）| sheet

SS = 4                     # 超采样倍数：先画 4 倍再缩，边缘更干净
RADIUS_RATIO = 0.225       # 圆角半径 / 边长（与飞牛系统图标、FileView 图标一致）

# 磁贴底色：斜向渐变（左上偏亮、右下偏深），比纯色更有体积感
TILE_TL = (79, 140, 247)      # #4F8CF7
TILE_BR = (26, 74, 205)       # #1A4ACD
SHEET = (255, 255, 255)
LINE_ON_TILE = (255, 255, 255)   # 蓝图方案：线画在蓝底上 → 用白色
LINE_ON_SHEET = (37, 99, 235)    # 图纸方案：线画在白纸上 → 用蓝色
ACCENT = (245, 158, 11)          # #F59E0B 尺寸标注


def rounded_mask(size, radius):
    m = Image.new("L", (size * SS, size * SS), 0)
    ImageDraw.Draw(m).rounded_rectangle(
        [0, 0, size * SS - 1, size * SS - 1], radius=radius * SS, fill=255
    )
    return m.resize((size, size), Image.LANCZOS)


def gradient(size, c1, c2):
    """斜向线性渐变（左上 → 右下）。"""
    S = size * SS
    img = Image.new("RGBA", (S, S))
    d = ImageDraw.Draw(img)
    for i in range(2 * S):
        t = i / max(1, 2 * S - 1)
        d.line([(i, 0), (0, i)],
               fill=tuple(round(c1[c] + (c2[c] - c1[c]) * t) for c in range(3)) + (255,),
               width=2)
    return img


def arrow_head(d, x, y, direction, length, half):
    """尺寸线端点的实心三角箭头。direction = -1 左 / +1 右。"""
    d.polygon([(x, y), (x + direction * length, y - half),
               (x + direction * length, y + half)], fill=ACCENT)


def draw_plan(d, bx0, by0, bx1, by1, width, color, inner="L"):
    """平面图：外墙（闭合折线，圆角接头）+ 一道内墙。

    `inner` 两种形式（都要能在 64px 下辨认，且别看成字母）：
      · `L`    内墙呈 L 形（竖到 60% 再横到右墙）→ 最像「两个房间」的平面图 ✓
      · `door` 竖隔墙 + 中间留门洞 → 更像平面图，但缩到 64px 有点像字母「H」✗
    """
    d.line([(bx0, by0), (bx1, by0), (bx1, by1), (bx0, by1), (bx0, by0)],
           fill=color, width=width, joint="curve")
    xm = bx0 + (bx1 - bx0) * 0.46
    h = by1 - by0
    if inner == "L":
        ym = by0 + h * 0.60
        d.line([(xm, by0), (xm, ym)], fill=color, width=width)
        d.line([(xm, ym), (bx1, ym)], fill=color, width=width)
    else:
        d.line([(xm, by0), (xm, by0 + h * 0.60)], fill=color, width=width)
        d.line([(xm, by0 + h * 0.78), (xm, by1)], fill=color, width=width)


def draw_dim(d, bx0, bx1, plan_bottom, dy, w_ext, w_main, head_len, head_half):
    """尺寸标注：一条带双箭头的线 + 两端延伸线。"""
    for ex in (bx0, bx1):
        d.line([(ex, plan_bottom), (ex, dy + w_ext)], fill=ACCENT, width=w_ext)
    d.line([(bx0, dy), (bx1, dy)], fill=ACCENT, width=w_main)
    arrow_head(d, bx0 + w_main, dy, +1, head_len, head_half)
    arrow_head(d, bx1 - w_main, dy, -1, head_len, head_half)


def build(size, variant=VARIANT, inner="L"):
    S = size * SS
    k = S / 1024.0                       # 几何都按 1024 的画布设计，这里统一缩放

    def u(v):
        return v * k

    # ① 磁贴（圆角 + 斜向渐变）
    mask = rounded_mask(size, round(size * RADIUS_RATIO)).resize((S, S), Image.NEAREST)
    tile = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    tile.paste(gradient(size, TILE_TL, TILE_BR), (0, 0), mask)

    if variant == "sheet":
        # ② 白色图纸卡片（先垫一层柔和投影 —— 官方规范提到「留白和阴影应尽量与
        #    系统图标保持一致」，有这一层才不会显得是贴上去的扁平块）
        sx0, sy0, sx1, sy1 = u(200), u(176), u(824), u(848)
        shadow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        ImageDraw.Draw(shadow).rounded_rectangle(
            [sx0, sy0 + u(18), sx1, sy1 + u(18)], radius=u(58), fill=(6, 26, 84, 105)
        )
        tile = Image.alpha_composite(tile, shadow.filter(ImageFilter.GaussianBlur(u(18))))
        d = ImageDraw.Draw(tile)
        d.rounded_rectangle([sx0, sy0, sx1, sy1], radius=u(58), fill=SHEET)

        # ③④ 平面图 + 尺寸标注（画在白纸上）
        bx0, by0, bx1, by1 = u(300), u(268), u(724), u(692)
        draw_plan(d, bx0, by0, bx1, by1, int(u(58)), LINE_ON_SHEET, inner)
        draw_dim(d, bx0, bx1, by1 + u(24), u(782),
                 int(u(22)), int(u(42)), u(66), u(34))
    else:
        # ② 蓝图：线直接画在蓝底上（不铺白纸）—— 元素最少，64px 下最清晰
        d = ImageDraw.Draw(tile)
        bx0, by0, bx1, by1 = u(252), u(230), u(772), u(750)
        draw_plan(d, bx0, by0, bx1, by1, int(u(56)), LINE_ON_TILE, inner)
        draw_dim(d, bx0, bx1, by1 + u(28), u(848),
                 int(u(26)), int(u(46)), u(70), u(36))

    return tile.resize((size, size), Image.LANCZOS)


def contact_sheet():
    """4 列 x 2 行对照图：上排 256px 原样，下排同一张缩到 64px 再放大 4 倍（NEAREST，
    用来直接看 64px 下糊不糊）。列 = 蓝图+L / 蓝图+门洞 / 图纸卡片+L / 图纸卡片+门洞。"""
    combos = [("blueprint", "L"), ("blueprint", "door"),
              ("sheet", "L"), ("sheet", "door")]
    pad, cell = 24, 256
    W = pad + (cell + pad) * len(combos)
    H = pad + cell + pad + cell + pad
    canvas = Image.new("RGB", (W, H), (245, 247, 250))
    for i, (variant, inner) in enumerate(combos):
        x = pad + i * (cell + pad)
        canvas.paste(build(cell, variant, inner).convert("RGB"), (x, pad))
        small = build(64, variant, inner).resize((cell, cell), Image.NEAREST)
        canvas.paste(small.convert("RGB"), (x, pad + cell + pad))
    return canvas


def verify(paths):
    """按官方规范自检产物 —— 尤其是**四角必须透明**（「圆角矩形主体，不要直角满铺」）。

    这条只能在这里查（要解码像素），构建脚本 build.py 只用标准库解析 PNG 头，
    查不了像素。所以「圆角」这个要求由**生成器自己**负责 ✓
    """
    bad = []
    for p, want in paths:
        data = open(p, "rb").read()
        if len(data) > 1024 * 1024:
            bad.append("%s 超过 1024 KB" % p)
        im = Image.open(p)
        if im.size != (want, want):
            bad.append("%s 尺寸 %s（应为 %dx%d）" % (p, im.size, want, want))
            continue
        if im.mode != "RGBA":
            bad.append("%s 不是 RGBA（圆角需要透明四角）" % p)
            continue
        corners = [im.getpixel(xy)[3] for xy in
                   ((0, 0), (want - 1, 0), (0, want - 1), (want - 1, want - 1))]
        if any(a != 0 for a in corners):
            bad.append("%s 四角不透明（%s）—— 主体是直角满铺，不符合「圆角矩形」要求"
                       % (p, corners))
    return bad


def main():
    outs = {
        64: [os.path.join(PKG, "ICON.PNG"),
             os.path.join(UI_IMAGES, "icon_64.png")],
        256: [os.path.join(PKG, "ICON_256.PNG"),
              os.path.join(UI_IMAGES, "icon_256.png")],
    }
    print("方案：%s" % VARIANT)
    written = []
    for size, paths in outs.items():
        img = build(size)
        for p in paths:
            os.makedirs(os.path.dirname(p), exist_ok=True)
            img.save(p, "PNG", optimize=True)
            written.append((p, size))
            print("  %-52s %s  %d 字节"
                  % (os.path.relpath(p, os.path.dirname(PKG)), img.size,
                     os.path.getsize(p)))

    bad = verify(written)
    print("  官方规范自检（64/256 + RGBA + 四角透明 + ≤1MB）: %s"
          % ("✓" if not bad else "✗"))
    for b in bad:
        print("     %s" % b)
    if bad:
        return 1

    # 64px 放大预览：**肉眼检查 64px 下主体是否还看得清**（官方检查清单里的一条）
    pv = os.path.join(HERE, "icon_preview_64x4.png")
    build(64).resize((256, 256), Image.NEAREST).save(pv, "PNG")
    print("  %-52s 64px 放大 4 倍（肉眼验收用）"
          % os.path.relpath(pv, os.path.dirname(PKG)))

    cs = os.path.join(HERE, "icon_variants.png")
    contact_sheet().save(cs, "PNG")
    print("  %-52s 列=蓝图+L / 蓝图+门洞 / 图纸卡片+L / 图纸卡片+门洞（上 256、下 64x4）"
          % os.path.relpath(cs, os.path.dirname(PKG)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
