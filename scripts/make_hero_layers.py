from pathlib import Path
import sys

from PIL import Image, ImageDraw


SCALE = 4


def cubic(p0, p1, p2, p3, steps=40):
    points = []
    for index in range(steps + 1):
        t = index / steps
        mt = 1 - t
        points.append((
            mt**3 * p0[0] + 3 * mt**2 * t * p1[0] + 3 * mt * t**2 * p2[0] + t**3 * p3[0],
            mt**3 * p0[1] + 3 * mt**2 * t * p1[1] + 3 * mt * t**2 * p2[1] + t**3 * p3[1],
        ))
    return points


def scaled(points):
    return [(round(x * SCALE), round(y * SCALE)) for x, y in points]


def product_mask(size):
    points = [(261, 389), (758, 389)]
    points += cubic((758, 389), (760, 445), (757, 475), (756, 505))[1:]
    points += cubic((756, 505), (748, 720), (730, 1050), (716, 1224))[1:]
    points += cubic((716, 1224), (610, 1248), (405, 1248), (296, 1225))[1:]
    points += cubic((296, 1225), (282, 1050), (266, 720), (262, 505))[1:]
    points += cubic((262, 505), (260, 475), (259, 445), (261, 389))[1:]
    mask = Image.new("L", (size[0] * SCALE, size[1] * SCALE), 0)
    ImageDraw.Draw(mask).polygon(scaled(points), fill=255)
    return mask.resize(size, Image.Resampling.LANCZOS)


def scene_mask(size):
    mask = Image.new("L", (size[0] * SCALE, size[1] * SCALE), 0)
    draw = ImageDraw.Draw(mask)

    arch = [(50, 1303)]
    arch += cubic((50, 1303), (15, 900), (125, 535), (370, 335))[1:]
    arch += cubic((370, 335), (640, 130), (875, 275), (1003, 510))[1:]
    arch += [(1003, 1315), (50, 1315)]
    draw.polygon(scaled(arch), fill=255)

    podium = [(94, 1219)]
    podium += cubic((94, 1219), (105, 1158), (907, 1158), (919, 1219))[1:]
    podium += [(919, 1458)]
    podium += cubic((919, 1458), (900, 1540), (115, 1540), (94, 1458))[1:]
    draw.polygon(scaled(podium), fill=255)
    return mask.resize(size, Image.Resampling.LANCZOS)


def main():
    if len(sys.argv) != 4 or sys.argv[1] not in {"product", "scene"}:
        raise SystemExit("Usage: make_hero_layers.py <product|scene> <input.png> <output.png>")

    kind, input_name, output_name = sys.argv[1:]
    image = Image.open(input_name).convert("RGBA")
    mask = product_mask(image.size) if kind == "product" else scene_mask(image.size)
    image.putalpha(mask)
    Path(output_name).parent.mkdir(parents=True, exist_ok=True)
    image.save(output_name, optimize=True)


if __name__ == "__main__":
    main()
