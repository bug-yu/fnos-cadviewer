"""生成「CAD 查看器」的飞牛应用图标（64 / 256 两档）。

设计语言来自用户给的一张参考图（豆包 AI 生成）：**深蓝底 + 青色线框立方体 +
橙色顶点**。但那张图元素太多（四角还贴了 4 张蓝图小样、细尺寸线、放大镜，
外加右下角水印），缩到 64px 会糊成一团。这里**重新画一个简约版**：

  · 只保留「等轴测线框立方体 + 橙色顶点圆点」两个元素
  · 立方体只画**可见的 9 条棱**（被自己挡住的那 3 条不画）—— 这是最省的一条，
    也正是「线框」而不是「实体」的观感
  · 橙色顶点圆点是「控制点」的意象，也是它区别于普通 3D/盒子图标的关键 ✓
  · ⚠️ **不用参考图本身**：那是 AI 生成图、带水印，分辨率与边缘也不适合做图标 ✗

方案（`VARIANT` 决定哪个进包）：
  · `cube`（默认）**极简**：立方体 + 顶点圆点
  · `cube_dim`        再加一条**琥珀色尺寸标注**（补一点「工程图纸」的意味）
  · `blueprint`       上一版（蓝图 + 平面图），留作备选

官方规范（developer.fnnas.com/docs/core-concepts/icon）：
  · 包图标 `ICON.PNG` 64x64 + `ICON_256.PNG` 256x256（放在包根目录）
  · 入口图标 `app/ui/images/icon_64.png` + `icon_256.png`
  · PNG、sRGB、≤ 1024 KB、**圆角矩形主体**（不要直角满铺）、不贴边
  · **64 px 下仍要能看清主体** ← 本脚本会额外输出 64px 放大预览供肉眼检查

⚠️ 踩过的绘制坑（都在下面代码里标了）：
  ① PIL 的 `rectangle(outline, width)` 是**向内**描边，`line(width)` 是**居中**描边 ——
     混用会让内墙超出外墙内沿，看着像糊成一团 ✗
  ② 缩到 64px 后细节会糊 → **元素越少越好** ✗
  ③ 1024 下 <20 的线宽在 64px 下会整条消失 ✗

依赖 Pillow：pip install pillow
用法：python gen_icons.py
"""

import os
import sys

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
PKG = os.path.join(os.path.dirname(HERE), "cadviewer")   # fpk/cadviewer ← 包根目录
UI_IMAGES = os.path.join(PKG, "app", "ui", "images")

VARIANT = "cube"           # cube（默认）| cube_dim | blueprint

SS = 4                     # 超采样倍数：先画 4 倍再缩，边缘更干净
RADIUS_RATIO = 0.225       # 圆角半径 / 边长（与飞牛系统图标、FileView 图标一致）

# 深蓝底：斜向渐变（左上偏亮、右下偏深）—— 与 FileView 的浅蓝底**刻意区分**
TILE_TL = (34, 82, 138)       # #22528A
TILE_BR = (10, 32, 62)        # #0A203E
CUBE_LINE = (56, 224, 245)    # #38E0F5 青色线框
CUBE_DOT = (251, 146, 60)     # #FB923C 橙色顶点
ACCENT = (245, 158, 11)       # #F59E0B 尺寸标注

# --- 等轴测立方体（都按 1024 的画布设计）-----------------------------------
COS30 = 0.8660254037844387
SIN30 = 0.5
CUBE_SCALE = 300.0             # 单位棱长对应的像素 → 立方体 600 高 / 520 宽
CUBE_OX = 512.0                # 立方体外接框中心
CUBE_OY = 512.0

# 立方体的 12 条棱。等轴测下**最近的顶点是 (0,0,1)**，它连着 3 条棱；
# **最远的顶点是 (1,1,0)**（投影后正好落在六边形中心），它的 3 条棱被自己挡住，不画。
ALL_EDGES = [
    ((0, 0, 0), (1, 0, 0)), ((0, 1, 0), (1, 1, 0)),
    ((0, 0, 1), (1, 0, 1)), ((0, 1, 1), (1, 1, 1)),
    ((0, 0, 0), (0, 1, 0)), ((1, 0, 0), (1, 1, 0)),
    ((0, 0, 1), (0, 1, 1)), ((1, 0, 1), (1, 1, 1)),
    ((0, 0, 0), (0, 0, 1)), ((1, 0, 0), (1, 0, 1)),
    ((0, 1, 0), (0, 1, 1)), ((1, 1, 0), (1, 1, 1)),
]
HIDDEN_VERTEX = (1, 1, 0)


def cube_xy(v):
    """等轴测投影：x 轴向右上、y 轴向左上、z 轴向上（屏幕 y 向下为正）。"""
    x, y, z = v
    px = (x - y) * COS30 * CUBE_SCALE + CUBE_OX
    py = -((x + y) * SIN30 + z) * CUBE_SCALE + CUBE_OY + CUBE_SCALE
    return px, py


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
    d.polygon([(x, y), (x + direction * length, y - half),
               (x + direction * length, y + half)], fill=ACCENT)


def draw_cube(d, u, line_w, dot_r):
    """等轴测线框立方体：只画可见的 9 条棱 + 7 个橙色顶点圆点。"""
    for a, b in ALL_EDGES:
        if HIDDEN_VERTEX in (a, b):
            continue
        ax, ay = cube_xy(a)
        bx, by = cube_xy(b)
        d.line([(u(ax), u(ay)), (u(bx), u(by))], fill=CUBE_LINE,
               width=int(u(line_w)), joint="curve")
    for x in (0, 1):
        for y in (0, 1):
            for z in (0, 1):
                if (x, y, z) == HIDDEN_VERTEX:
                    continue
                px, py = cube_xy((x, y, z))
                r = u(dot_r)
                d.ellipse([u(px) - r, u(py) - r, u(px) + r, u(py) + r], fill=CUBE_DOT)


def draw_plan(d, bx0, by0, bx1, by1, width, color):
    """（blueprint 方案）平面图：外墙 + 一道 L 形内墙。"""
    d.line([(bx0, by0), (bx1, by0), (bx1, by1), (bx0, by1), (bx0, by0)],
           fill=color, width=width, joint="curve")
    xm = bx0 + (bx1 - bx0) * 0.46
    ym = by0 + (by1 - by0) * 0.60
    d.line([(xm, by0), (xm, ym)], fill=color, width=width)
    d.line([(xm, ym), (bx1, ym)], fill=color, width=width)


def build(size, variant=VARIANT):
    S = size * SS
    k = S / 1024.0                       # 几何都按 1024 的画布设计，这里统一缩放

    def u(v):
        return v * k

    # ① 磁贴（圆角 + 斜向渐变）
    mask = rounded_mask(size, round(size * RADIUS_RATIO)).resize((S, S), Image.NEAREST)
    tile = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    tile.paste(gradient(size, TILE_TL, TILE_BR), (0, 0), mask)
    d = ImageDraw.Draw(tile)

    if variant == "blueprint":
        bx0, by0, bx1, by1 = u(252), u(230), u(772), u(750)
        draw_plan(d, bx0, by0, bx1, by1, int(u(56)), (255, 255, 255))
        dy = u(848)
        for ex in (bx0, bx1):
            d.line([(ex, by1 + u(28)), (ex, dy + u(26))], fill=ACCENT, width=int(u(26)))
        d.line([(bx0, dy), (bx1, dy)], fill=ACCENT, width=int(u(46)))
        arrow_head(d, bx0 + u(46), dy, +1, u(70), u(36))
        arrow_head(d, bx1 - u(46), dy, -1, u(70), u(36))
    else:
        draw_cube(d, u, line_w=46, dot_r=26)
        if variant == "cube_dim":
            # 立方体最低点（v000）在 y = CUBE_OY + CUBE_SCALE = 812，下方还有 212 的空白，
            # 尺寸标注放那儿正好；左右与立方体外接框对齐
            dy = u(900)
            ex0 = u(CUBE_OX - COS30 * CUBE_SCALE)
            ex1 = u(CUBE_OX + COS30 * CUBE_SCALE)
            for ex in (ex0, ex1):
                d.line([(ex, u(860)), (ex, dy + u(24))], fill=ACCENT, width=int(u(24)))
            d.line([(ex0, dy), (ex1, dy)], fill=ACCENT, width=int(u(44)))
            arrow_head(d, ex0 + u(44), dy, +1, u(68), u(34))
            arrow_head(d, ex1 - u(44), dy, -1, u(68), u(34))

    return tile.resize((size, size), Image.LANCZOS)


def contact_sheet():
    """3 列 x 2 行对照图：上排 256px 原样，下排同一张缩到 64px 再放大 4 倍
    （NEAREST，用来直接看 64px 下糊不糊）。"""
    combos = ["cube", "cube_dim", "blueprint"]
    pad, cell = 24, 256
    W = pad + (cell + pad) * len(combos)
    H = pad + cell + pad + cell + pad
    canvas = Image.new("RGB", (W, H), (245, 247, 250))
    for i, v in enumerate(combos):
        x = pad + i * (cell + pad)
        canvas.paste(build(cell, v).convert("RGB"), (x, pad))
        small = build(64, v).resize((cell, cell), Image.NEAREST)
        canvas.paste(small.convert("RGB"), (x, pad + cell + pad))
    return canvas


def verify(paths):
    """按官方规范自检产物 —— 尤其是**四角必须透明**（「圆角矩形主体，不要直角满铺」）。

    这条只能在这里查（要解码像素）；构建脚本 build.py 只用标准库解析 PNG 头，
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
    print("  %-52s 列=极简 / 加尺寸标注 / 旧蓝图方案（上 256、下 64x4）"
          % os.path.relpath(cs, os.path.dirname(PKG)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
