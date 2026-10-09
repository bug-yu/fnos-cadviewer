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

import math
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

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

# 光泽磁贴的**竖直**渐变（上深下亮）—— 参考图那种「3D 玻璃按钮」的观感
GLOSS_TOP = (23, 58, 107)     # #173A6B
GLOSS_BOTTOM = (41, 197, 240)  # #29C5F0
GLOSS_INK = (255, 255, 255)    # 字母用白色：在「深蓝→亮青」的渐变上对比度最高 ✓
                               # （参考图的字母是深色的，但放在这个渐变上上半截会糊掉 ✗）

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


# --- 字母「CAD」：几何自绘，**不依赖任何字体** -----------------------------
# ⚠️ 为什么不用系统字体（Arial Black 之类）：换个没有该字体的机器就重跑不出来 ✗
#    几何自绘 → 完全可复现、无授权问题、粗细/圆角都能精确控制 ✓
#    笔画用 `line(joint="curve")` 画（圆角接头），两端再补圆点当**圆头** ——
#    PIL 的 line 只支持圆角接头，端点是平的 ✗

def polyline(d, pts, color, width):
    """折线 + 两端圆头。pts 是像素坐标列表。"""
    if len(pts) < 2:
        return
    d.line(pts, fill=color, width=width, joint="curve")
    r = width / 2.0
    for x, y in (pts[0], pts[-1]):
        d.ellipse([x - r, y - r, x + r, y + r], fill=color)


def arc_pts(cx, cy, rx, ry, a0, a1, n=72):
    """椭圆弧采样成折线（角度制）。"""
    return [(cx + rx * math.cos(math.radians(a0 + (a1 - a0) * i / n)),
             cy + ry * math.sin(math.radians(a0 + (a1 - a0) * i / n)))
            for i in range(n + 1)]


def draw_cad(d, u, ox, oy, H, W, color):
    """（已废弃）几何自绘的「CAD」。

    ⚠️ 保留在这里只作记录：手绘字母**形状很难做好** ——
       A 的腿太陡、D 的碗太小，试了两版都不像 ✗
       改成用字体渲染（见 `draw_cad_font`），形状直接就对 ✓
    """
    raise NotImplementedError("改用 draw_cad_font")


# 「CAD」用字体渲染。⚠️ 依赖一个**粗体**字体 ——
# 渲染文字到图标里不涉及字体分发，授权上没问题；但**构建机得装**，
# 所以这里给一串候选（Windows 与常见 Linux 发行版各覆盖一下），
# 全都没有就**明确报错**，而不是悄悄退化成别的样子 ✗
FONT_CANDIDATES = (
    r"C:\Windows\Fonts\ariblk.ttf",        # Arial Black（最粗）
    r"C:\Windows\Fonts\arialbd.ttf",       # Arial Bold
    r"C:\Windows\Fonts\segoeuib.ttf",      # Segoe UI Bold
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
)


def load_heavy_font():
    for p in FONT_CANDIDATES:
        if os.path.isfile(p):
            return p
    raise SystemExit("找不到可用的粗体字体，试过：\n  " + "\n  ".join(FONT_CANDIDATES))


def fit_font(path, text, target_w, cap):
    """二分出「文字墨迹宽度 <= target_w」的最大字号。"""
    lo, hi = 8, cap
    while lo < hi:
        mid = (lo + hi + 1) // 2
        bb = ImageFont.truetype(path, mid).getbbox(text)
        if bb[2] - bb[0] <= target_w:
            lo = mid
        else:
            hi = mid - 1
    return ImageFont.truetype(path, lo)


def draw_cad_font(d, S, text, target_w, color, dy=0):
    """把 text 按墨迹外接框**居中**画在 SxS 画布上，宽度缩到 target_w。"""
    f = fit_font(load_heavy_font(), text, target_w, S)
    bb = f.getbbox(text)
    x = (S - (bb[2] - bb[0])) / 2.0 - bb[0]
    y = (S - (bb[3] - bb[1])) / 2.0 - bb[1] + dy
    d.text((x, y), text, font=f, fill=color)
    return f


def draw_magnifier(d, u, cx, cy, R, color, lw):
    """放大镜：圆环 + 45° 手柄。"""
    lw = int(u(lw))
    d.ellipse([u(cx - R), u(cy - R), u(cx + R), u(cy + R)], outline=color, width=lw)
    a = math.radians(45)
    x0, y0 = cx + R * math.cos(a), cy + R * math.sin(a)
    x1, y1 = x0 + R * 0.9 * math.cos(a), y0 + R * 0.9 * math.sin(a)
    polyline(d, [(u(x0), u(y0)), (u(x1), u(y1))], color, int(lw * 1.7))


def tile_layers(size, glossy=False, round_shape=False):
    """返回 (颜色层 RGB @S, 蒙版 L @S) —— **先不挖透明**。

    ⚠️⚠️ 为什么要把「颜色」和「蒙版」分开返回：
       对**带透明像素的 RGBA** 直接做 LANCZOS 缩放，会把透明区的黑色 RGB
       混进边缘，形成一圈**黑色锯齿** ✗ —— 深色底看不出来，
       而「上深下亮」的渐变在亮青色那头非常明显 ✗
       正确做法：颜色层全程不透明，缩完再套一个**单独缩放**的蒙版 ✓

    glossy=True → 竖直渐变（上深下亮）+ 顶部一圈内描边高光
                  （参考图那种「3D 玻璃按钮」的观感主要就来自这两件事）
    round_shape=True → 圆形（参考图是圆的，但官方规范要求圆角矩形 ✗）
    """
    S = size * SS
    if glossy:
        color = Image.new("RGB", (S, S))
        cd = ImageDraw.Draw(color)
        for y in range(S):
            t = y / max(1, S - 1)
            cd.line([(0, y), (S, y)],
                    fill=tuple(round(GLOSS_TOP[c] + (GLOSS_BOTTOM[c] - GLOSS_TOP[c]) * t)
                               for c in range(3)), width=1)
        # 顶部内描边高光：画一圈淡白描边，只保留上半部分（做出「上缘一道光」）
        hl = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        hd = ImageDraw.Draw(hl)
        inset, w = S * 0.035, int(S * 0.016)
        if round_shape:
            hd.ellipse([inset, inset, S - inset, S - inset],
                       outline=(255, 255, 255, 95), width=w)
        else:
            hd.rounded_rectangle([inset, inset, S - inset, S - inset],
                                 radius=round(size * RADIUS_RATIO * 0.9) * SS,
                                 outline=(255, 255, 255, 95), width=w)
        hl = hl.filter(ImageFilter.GaussianBlur(S * 0.006))
        keep = Image.new("L", (S, S), 0)
        ImageDraw.Draw(keep).rectangle([0, 0, S, int(S * 0.42)], fill=255)
        hl.putalpha(Image.composite(hl.getchannel("A"),
                                    Image.new("L", (S, S), 0), keep))
        color = Image.alpha_composite(color.convert("RGBA"), hl).convert("RGB")
    else:
        color = gradient(size, TILE_TL, TILE_BR).convert("RGB")

    m = Image.new("L", (S, S), 0)
    md = ImageDraw.Draw(m)
    if round_shape:
        md.ellipse([0, 0, S - 1, S - 1], fill=255)
    else:
        md.rounded_rectangle([0, 0, S - 1, S - 1],
                             radius=round(size * RADIUS_RATIO) * SS, fill=255)
    return color, m


def build(size, variant=VARIANT):
    S = size * SS
    k = S / 1024.0                       # 几何都按 1024 的画布设计，这里统一缩放

    def u(v):
        return v * k

    # ① 磁贴。光泽系（cad_*）用竖直渐变 + 顶部高光；其余用斜向渐变。
    #    ⚠️ 拿到的是 (颜色层, 蒙版) **两个图层**，透明留到最后一步再挖 ✓
    if variant.startswith("cad_"):
        color, mask = tile_layers(size, glossy=True,
                                  round_shape=(variant == "cad_round"))
    else:
        color, mask = tile_layers(size, glossy=False)
    tile = color.convert("RGBA")
    d = ImageDraw.Draw(tile)

    if variant.startswith("cad_"):
        # 「CAD」+ 放大镜（参考图的方向）。字母用字体渲染（形状直接就对）
        # ⚠️ 字母整体**左下移一点**，把右上角让给放大镜 —— 参考图就是这个构图 ✓
        # ⚠️ 放大镜别做小：缩到 64px 后 <0.10 的半径会变成一个点 ✗
        dy = 14 if variant == "cad_round" else 30
        draw_cad_font(d, S, "CAD", S * 0.66, GLOSS_INK, dy=dy)
        if variant != "cad_letters_plain":
            draw_magnifier(d, u, 1024 * 0.775, 1024 * 0.215,
                           1024 * 0.145, GLOSS_INK, 1024 * 0.045)
    elif variant == "blueprint":
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

    # 收尾：**颜色层先缩（全不透明，不会有黑边），蒙版单独缩，最后才挖透明** ✓
    out = tile.convert("RGB").resize((size, size), Image.LANCZOS).convert("RGBA")
    out.putalpha(mask.resize((size, size), Image.LANCZOS))
    return out


def contact_sheet():
    """3 列 x 2 行对照图：上排 256px 原样，下排同一张缩到 64px 再放大 4 倍
    （NEAREST，用来直接看 64px 下糊不糊）。"""
    combos = ["cad_letters", "cad_letters_plain", "cad_round", "cube"]
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
