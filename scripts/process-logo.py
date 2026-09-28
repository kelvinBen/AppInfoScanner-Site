#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# 品牌图定稿处理: 圆角外近白背景→透明(RGBA PNG) + 切出 logo/favicon 套件
# 用法: python3 scripts/process-logo.py [源图, 默认 brand-drafts/logo_2.png]
# 依赖: pillow (纯图像处理, 无 numpy)
import sys
import os
from PIL import Image, ImageDraw

SRC = sys.argv[1] if len(sys.argv) > 1 else 'brand-drafts/logo_2.png'
OUT = 'public'
img = Image.open(SRC).convert('RGB')
w, h = img.size
work = img.copy()
SENTINEL = (255, 0, 255)

# 四角泛洪: 品红标记 badge 外部近白区域(容差容忍生成噪点)
for seed in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
    ImageDraw.floodfill(work, seed, SENTINEL, thresh=26)

rgba = work.convert('RGBA')
px = rgba.load()
for y in range(h):
    for x in range(w):
        if px[x, y][:3] == SENTINEL:
            px[x, y] = (255, 255, 255, 0)

# 吃掉边缘浅色抗锯齿光晕: 邻接透明且亮度高的像素逐轮扩散置透明
# (badge 本体深色, 已验证内部无白色元素, 不会误伤)
def luminance(p):
    return 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]

for _ in range(4):
    transparent = [(x, y) for y in range(h) for x in range(w) if px[x, y][3] == 0]
    fringe = []
    for x, y in transparent:
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 255 and luminance(px[nx, ny]) >= 150:
                fringe.append((nx, ny))
    if not fringe:
        break
    for x, y in fringe:
        px[x, y] = (px[x, y][0], px[x, y][1], px[x, y][2], 0)

# 裁到 badge 实际边界后重切全尺寸
bbox = rgba.getbbox()
rgba = rgba.crop(bbox)
print(f'badge bbox {bbox}, 输出尺寸基准 {rgba.size}')
for name, size in [('logo.png', 512), ('favicon-512.png', 512),
                   ('apple-touch-icon.png', 180), ('favicon-32.png', 32)]:
    resized = rgba.resize((size, size), Image.LANCZOS)
    resized.save(os.path.join(OUT, name), optimize=True)
    print(f'{OUT}/{name} <- {size}x{size}')
