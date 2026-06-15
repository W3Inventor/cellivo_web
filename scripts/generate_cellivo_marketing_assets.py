from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT / "output" / "pdf"
IMAGE_DIR = ROOT / "output" / "images"
PDF_PATH = PDF_DIR / "cellivo-pricing-marketing-brochure.pdf"
POST_PATH = IMAGE_DIR / "cellivo-lite-marketing-post.png"

PAGE_W, PAGE_H = landscape(A4)

BRAND = "#4f63f1"
BRAND_DARK = "#172554"
INK = "#0f172a"
MUTED = "#64748b"
LINE = "#dbe3ef"
SOFT = "#f5f7fb"
GREEN = "#16a34a"
RED = "#dc2626"
AMBER = "#f59e0b"

PLANS = [
    {
        "name": "Lite",
        "tagline": "For simple retail shops starting lean",
        "branches": "1 Branch",
        "monthly_lkr": "LKR 2,900",
        "monthly_usd": "USD 10",
        "yearly_lkr": "LKR 29,000",
        "yearly_usd": "USD 97",
        "lifetime_lkr": "LKR 149,000",
        "lifetime_usd": "USD 497",
        "cta": "Start Free",
        "features": [
            "Billing & invoicing",
            "Product inventory",
            "Accessories management",
            "Customer records",
            "Supplier records",
            "Purchasing",
            "Basic reports",
        ],
    },
    {
        "name": "Starter",
        "tagline": "For single-location phone shops",
        "branches": "1 Branch",
        "monthly_lkr": "LKR 7,000",
        "monthly_usd": "USD 25",
        "yearly_lkr": "LKR 70,000",
        "yearly_usd": "USD 250",
        "lifetime_lkr": "LKR 380,000",
        "lifetime_usd": "USD 1,300",
        "cta": "Start Free",
        "features": [
            "IMEI stock control",
            "Repair jobs",
            "Staff / user roles",
            "Advanced reports",
            "Profit analytics",
        ],
    },
    {
        "name": "Growth",
        "tagline": "For shops expanding to multiple locations",
        "branches": "Up to 3 Branches",
        "monthly_lkr": "LKR 12,000",
        "monthly_usd": "USD 40",
        "yearly_lkr": "LKR 120,000",
        "yearly_usd": "USD 400",
        "lifetime_lkr": "LKR 500,000",
        "lifetime_usd": "USD 1,700",
        "cta": "Start Free",
        "features": [
            "Multi-branch operations",
            "Full repair workflow",
            "Advanced analytics",
            "Priority support",
            "Best value for growth",
        ],
    },
    {
        "name": "Business",
        "tagline": "For established multi-location retailers",
        "branches": "Up to 6 Branches",
        "monthly_lkr": "LKR 16,000",
        "monthly_usd": "USD 55",
        "yearly_lkr": "LKR 160,000",
        "yearly_usd": "USD 550",
        "lifetime_lkr": "LKR 700,000",
        "lifetime_usd": "USD 2,500",
        "cta": "Start Free",
        "features": [
            "Higher branch capacity",
            "Advanced reports",
            "Profit analytics",
            "Priority support",
            "Built for teams",
        ],
    },
    {
        "name": "Unlimited",
        "tagline": "For large-scale or franchise operations",
        "branches": "Unlimited Branches",
        "monthly_lkr": "Contact Us",
        "monthly_usd": "",
        "yearly_lkr": "Contact Us",
        "yearly_usd": "",
        "lifetime_lkr": "Contact Us",
        "lifetime_usd": "",
        "cta": "Contact Us",
        "features": [
            "Unlimited branches",
            "Custom rollout support",
            "Enterprise operations",
            "Franchise friendly",
            "Priority onboarding",
        ],
    },
]

COMPARISON = [
    ("Billing & invoicing", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("Product inventory", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("Accessories management", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("Customer records", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("Supplier records", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("Purchasing", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("Basic reports", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("IMEI stock control", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Repair job management", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Credit sale workflows", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Returns management", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Wholesale workflows", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Staff / user roles", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Advanced reports", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Profit analytics", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Priority support", ["No", "Yes", "Yes", "Yes", "Yes"]),
]


def hex_color(value):
    return colors.HexColor(value)


def set_font(c, name="Helvetica", size=10, fill=INK):
    c.setFont(name, size)
    c.setFillColor(hex_color(fill))


def draw_wrapped(c, text, x, y, max_width, font="Helvetica", size=10, leading=13, fill=INK):
    set_font(c, font, size, fill)
    words = text.split()
    line = ""
    lines = []
    for word in words:
        test = f"{line} {word}".strip()
        if c.stringWidth(test, font, size) <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    for item in lines:
        c.drawString(x, y, item)
        y -= leading
    return y


def pill(c, x, y, w, h, text, fill=BRAND, text_fill="#ffffff", font_size=9):
    c.setFillColor(hex_color(fill))
    c.roundRect(x, y, w, h, h / 2, fill=1, stroke=0)
    set_font(c, "Helvetica-Bold", font_size, text_fill)
    c.drawCentredString(x + w / 2, y + h / 2 - font_size / 3, text)


def footer(c, page_num):
    pill(c, 13 * mm, 7 * mm, 26 * mm, 7 * mm, "Cellivo", BRAND, "#ffffff", 7)
    set_font(c, "Helvetica", 7, MUTED)
    c.drawRightString(PAGE_W - 13 * mm, 9 * mm, f"Page {page_num}")


def draw_dashboard_art(c, x, y, w, h):
    c.setFillColor(hex_color("#ffffff"))
    c.roundRect(x, y, w, h, 12, fill=1, stroke=0)
    c.setStrokeColor(hex_color(LINE))
    c.roundRect(x, y, w, h, 12, fill=0, stroke=1)
    pill(c, x + 14, y + h - 30, 48, 13, "POS", BRAND, "#ffffff", 7)
    set_font(c, "Helvetica-Bold", 13, INK)
    c.drawString(x + 14, y + h - 54, "Today")
    set_font(c, "Helvetica", 8, MUTED)
    c.drawString(x + 14, y + h - 68, "Sales, stock, and repairs in one place")
    metrics = [("Sales", "128K"), ("Items", "423"), ("Jobs", "18")]
    for idx, (label, value) in enumerate(metrics):
        mx = x + 14 + idx * 54
        c.setFillColor(hex_color("#eef2ff" if idx == 0 else SOFT))
        c.roundRect(mx, y + h - 112, 44, 34, 7, fill=1, stroke=0)
        set_font(c, "Helvetica-Bold", 12, INK)
        c.drawString(mx + 7, y + h - 94, value)
        set_font(c, "Helvetica", 6.5, MUTED)
        c.drawString(mx + 7, y + h - 105, label)
    c.setStrokeColor(hex_color(BRAND))
    c.setLineWidth(2)
    points = [(x + 18, y + 38), (x + 54, y + 54), (x + 92, y + 43), (x + 130, y + 70), (x + 170, y + 61)]
    for first, second in zip(points, points[1:]):
        c.line(first[0], first[1], second[0], second[1])
    c.setLineWidth(1)


def cover_page(c):
    c.setFillColor(hex_color("#f7f9ff"))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(hex_color(BRAND_DARK))
    c.roundRect(16 * mm, 24 * mm, PAGE_W - 32 * mm, PAGE_H - 48 * mm, 16, fill=1, stroke=0)
    pill(c, 28 * mm, PAGE_H - 48 * mm, 38 * mm, 10 * mm, "Cellivo", BRAND, "#ffffff", 10)
    pill(c, 70 * mm, PAGE_H - 48 * mm, 56 * mm, 10 * mm, "14-day free trial", "#ffffff", BRAND_DARK, 9)

    set_font(c, "Helvetica-Bold", 33, "#ffffff")
    c.drawString(28 * mm, PAGE_H - 77 * mm, "Pricing built for")
    c.drawString(28 * mm, PAGE_H - 93 * mm, "phone shops that grow")
    draw_wrapped(
        c,
        "Start lean with Lite, then upgrade when your shop needs repair workflows, credit sales, returns, wholesale, IMEI stock control, or deeper analytics.",
        28 * mm,
        PAGE_H - 111 * mm,
        118 * mm,
        "Helvetica",
        12,
        17,
        "#cbd5e1",
    )

    c.setFillColor(hex_color("#ffffff"))
    c.roundRect(28 * mm, 46 * mm, 87 * mm, 39 * mm, 12, fill=1, stroke=0)
    set_font(c, "Helvetica-Bold", 10, BRAND)
    c.drawString(37 * mm, 72 * mm, "New entry plan")
    set_font(c, "Helvetica-Bold", 18, INK)
    c.drawString(37 * mm, 60 * mm, "Lite from LKR 2,900")
    set_font(c, "Helvetica", 10, MUTED)
    c.drawString(37 * mm, 52 * mm, "per month")

    draw_dashboard_art(c, 168 * mm, 59 * mm, 86 * mm, 83 * mm)
    footer(c, 1)


def plan_card(c, plan, x, y, w, h, highlighted=False):
    c.setFillColor(hex_color("#ffffff"))
    c.roundRect(x, y, w, h, 10, fill=1, stroke=0)
    c.setStrokeColor(hex_color(BRAND if highlighted else LINE))
    c.setLineWidth(1.6 if highlighted else 0.8)
    c.roundRect(x, y, w, h, 10, fill=0, stroke=1)
    if highlighted:
        pill(c, x + w - 34 * mm, y + h - 10 * mm, 28 * mm, 7 * mm, "NEW", BRAND, "#ffffff", 7)

    set_font(c, "Helvetica-Bold", 17, INK)
    c.drawString(x + 8 * mm, y + h - 17 * mm, plan["name"])
    draw_wrapped(c, plan["tagline"], x + 8 * mm, y + h - 27 * mm, w - 16 * mm, "Helvetica", 8.5, 11, MUTED)
    pill(c, x + 8 * mm, y + h - 43 * mm, 39 * mm, 8 * mm, plan["branches"], "#eef2ff", BRAND, 7)

    set_font(c, "Helvetica-Bold", 14, INK)
    c.drawString(x + 8 * mm, y + h - 58 * mm, plan["monthly_lkr"])
    set_font(c, "Helvetica", 8, MUTED)
    usd_text = f"{plan['monthly_usd']} / month" if plan["monthly_usd"] else "Monthly"
    c.drawString(x + 8 * mm, y + h - 66 * mm, usd_text)

    set_font(c, "Helvetica-Bold", 8, INK)
    c.drawString(x + 8 * mm, y + h - 75 * mm, "Key points")
    feature_y = y + h - 84 * mm
    for item in plan["features"][:2]:
        set_font(c, "Helvetica", 7.5, MUTED)
        c.drawString(x + 10 * mm, feature_y, f"- {item}")
        feature_y -= 7
    pill(c, x + 8 * mm, y + 6 * mm, 34 * mm, 8 * mm, plan["cta"], BRAND if plan["cta"] == "Start Free" else INK, "#ffffff", 7)


def plans_page(c):
    c.setFillColor(hex_color("#ffffff"))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    set_font(c, "Helvetica-Bold", 27, INK)
    c.drawCentredString(PAGE_W / 2, PAGE_H - 28 * mm, "Choose the package that fits your shop")
    draw_wrapped(
        c,
        "Monthly, yearly, and lifetime options are available for Lite, Starter, Growth, and Business. Unlimited is handled through sales for franchise-scale requirements.",
        24 * mm,
        PAGE_H - 43 * mm,
        PAGE_W - 48 * mm,
        "Helvetica",
        11,
        15,
        MUTED,
    )
    card_w = 49 * mm
    card_h = 109 * mm
    start_x = 16 * mm
    gap = 6 * mm
    for idx, plan in enumerate(PLANS):
        plan_card(c, plan, start_x + idx * (card_w + gap), 45 * mm, card_w, card_h, plan["name"] == "Lite")

    set_font(c, "Helvetica-Bold", 11, INK)
    c.drawString(16 * mm, 27 * mm, "Billing cycles")
    set_font(c, "Helvetica", 8.5, MUTED)
    c.drawString(16 * mm, 20 * mm, "Lite: LKR 29,000/year or LKR 149,000 lifetime. Starter, Growth, and Business also include yearly and lifetime options.")
    footer(c, 2)


def comparison_page(c):
    c.setFillColor(hex_color("#ffffff"))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    set_font(c, "Helvetica-Bold", 28, INK)
    c.drawCentredString(PAGE_W / 2, PAGE_H - 26 * mm, "Feature comparison")
    set_font(c, "Helvetica", 10.5, MUTED)
    c.drawCentredString(PAGE_W / 2, PAGE_H - 36 * mm, "Lite covers the essentials. Starter and above unlock the full operational workflow.")

    x = 25 * mm
    y = PAGE_H - 55 * mm
    row_h = 7.1 * mm
    col_w = [67 * mm, 32 * mm, 32 * mm, 32 * mm, 32 * mm, 34 * mm]
    headers = ["Feature", "Lite", "Starter", "Growth", "Business", "Unlimited"]
    c.setFillColor(hex_color(INK))
    c.rect(x, y, sum(col_w), row_h, fill=1, stroke=0)
    current_x = x
    for idx, head in enumerate(headers):
        set_font(c, "Helvetica-Bold", 8, "#ffffff")
        c.drawString(current_x + 3 * mm, y + 2.3 * mm, head)
        current_x += col_w[idx]

    y -= row_h
    for row_idx, (feature, values) in enumerate(COMPARISON):
        c.setFillColor(hex_color(SOFT if row_idx % 2 else "#ffffff"))
        c.rect(x, y, sum(col_w), row_h, fill=1, stroke=0)
        c.setStrokeColor(hex_color(LINE))
        c.rect(x, y, sum(col_w), row_h, fill=0, stroke=1)
        current_x = x
        set_font(c, "Helvetica", 8.1, INK)
        c.drawString(current_x + 3 * mm, y + 2.4 * mm, feature)
        current_x += col_w[0]
        for col_idx, value in enumerate(values):
            set_font(c, "Helvetica-Bold", 8.1, GREEN if value == "Yes" else RED)
            c.drawString(current_x + 3 * mm, y + 2.4 * mm, value)
            current_x += col_w[col_idx + 1]
        y -= row_h
    footer(c, 3)


def lite_page(c):
    c.setFillColor(hex_color("#f7f9ff"))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    set_font(c, "Helvetica-Bold", 30, INK)
    c.drawCentredString(PAGE_W / 2, PAGE_H - 30 * mm, "Introducing Cellivo Lite")
    set_font(c, "Helvetica", 12, MUTED)
    c.drawCentredString(PAGE_W / 2, PAGE_H - 41 * mm, "A simple, affordable entry package for shops that need the essentials first.")

    c.setFillColor(hex_color("#ffffff"))
    c.roundRect(18 * mm, 50 * mm, 125 * mm, 93 * mm, 12, fill=1, stroke=0)
    set_font(c, "Helvetica-Bold", 12, BRAND)
    c.drawString(30 * mm, 128 * mm, "Lite monthly")
    set_font(c, "Helvetica-Bold", 31, INK)
    c.drawString(30 * mm, 112 * mm, "LKR 2,900")
    set_font(c, "Helvetica", 11, MUTED)
    c.drawString(30 * mm, 103 * mm, "USD 10 / month")
    pill(c, 30 * mm, 88 * mm, 47 * mm, 9 * mm, "1 Branch", "#eef2ff", BRAND, 8)
    pill(c, 81 * mm, 88 * mm, 48 * mm, 9 * mm, "Start Free", BRAND, "#ffffff", 8)
    draw_wrapped(c, "Also available: LKR 29,000/year and LKR 149,000 lifetime.", 30 * mm, 74 * mm, 88 * mm, "Helvetica-Bold", 10, 14, INK)

    c.setFillColor(hex_color("#ffffff"))
    c.roundRect(154 * mm, 50 * mm, 125 * mm, 93 * mm, 12, fill=1, stroke=0)
    set_font(c, "Helvetica-Bold", 13, GREEN)
    c.drawString(166 * mm, 128 * mm, "Included in Lite")
    y = 116 * mm
    for item in PLANS[0]["features"]:
        set_font(c, "Helvetica", 9.3, INK)
        c.drawString(169 * mm, y, f"- {item}")
        y -= 9 * mm

    c.setFillColor(hex_color("#fff7ed"))
    c.roundRect(18 * mm, 24 * mm, PAGE_W - 36 * mm, 17 * mm, 8, fill=1, stroke=0)
    set_font(c, "Helvetica-Bold", 10, AMBER)
    c.drawString(26 * mm, 32 * mm, "Positioning note")
    set_font(c, "Helvetica", 9, INK)
    c.drawString(66 * mm, 32 * mm, "Lite does not include wholesale, credit sale, returns, repair, IMEI stock control, or advanced reports.")
    footer(c, 4)


def build_pdf():
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(PDF_PATH), pagesize=landscape(A4))
    cover_page(c)
    c.showPage()
    plans_page(c)
    c.showPage()
    comparison_page(c)
    c.showPage()
    lite_page(c)
    c.save()


def font_path(bold=False):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Helvetica Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Helvetica.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return candidate
    return None


def pil_font(size, bold=False):
    path = font_path(bold)
    if path:
        return ImageFont.truetype(path, size)
    return ImageFont.load_default(size=size)


def centered(draw, text, y, font, fill):
    box = draw.textbbox((0, 0), text, font=font)
    draw.text(((1080 - (box[2] - box[0])) / 2, y), text, font=font, fill=fill)


def build_post():
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    img = Image.new("RGB", (1080, 1080), "#f7f9ff")
    draw = ImageDraw.Draw(img)

    brand_font = pil_font(30, True)
    eyebrow_font = pil_font(34, True)
    title_font = pil_font(86, True)
    body_font = pil_font(34, False)
    price_font = pil_font(84, True)
    small_font = pil_font(27, True)
    cta_font = pil_font(42, True)

    draw.rounded_rectangle((52, 48, 1028, 1032), radius=46, fill="#ffffff", outline="#dbe3ef", width=3)
    draw.rounded_rectangle((86, 82, 270, 128), radius=23, fill=BRAND)
    draw.text((122, 90), "Cellivo", font=brand_font, fill="#ffffff")
    draw.rounded_rectangle((780, 82, 994, 128), radius=23, fill="#eef2ff")
    draw.text((820, 91), "NEW PLAN", font=small_font, fill=BRAND)

    draw.text((92, 178), "Introducing", font=eyebrow_font, fill=BRAND)
    draw.text((92, 224), "Lite Package", font=title_font, fill=INK)
    draw.text((92, 332), "For simple retail shops starting lean", font=body_font, fill="#334155")

    draw.rounded_rectangle((92, 402, 988, 590), radius=34, fill="#101827")
    draw.text((130, 438), "Start from", font=small_font, fill="#c7d2fe")
    draw.text((130, 476), "LKR", font=small_font, fill="#94a3b8")
    draw.text((202, 448), "2,900", font=price_font, fill="#ffffff")
    draw.text((470, 506), "/mo", font=body_font, fill="#cbd5e1")
    draw.rounded_rectangle((626, 446, 946, 548), radius=26, fill="#ffffff")
    draw.text((662, 463), "14-day", font=body_font, fill=INK)
    draw.text((662, 505), "free trial", font=body_font, fill=BRAND)

    features = [
        "Billing & invoicing",
        "Product inventory",
        "Accessories",
        "Customer records",
        "Supplier records",
        "Basic reports",
    ]
    positions = [(118, 650), (584, 650), (118, 722), (584, 722), (118, 794), (584, 794)]
    for (x, y), item in zip(positions, features):
        draw.ellipse((x, y, x + 34, y + 34), fill="#dcfce7")
        draw.line((x + 9, y + 18, x + 15, y + 25, x + 26, y + 9), fill=GREEN, width=5)
        draw.text((x + 50, y - 4), item, font=body_font, fill="#334155")

    draw.rounded_rectangle((92, 888, 988, 954), radius=26, fill=BRAND)
    centered(draw, "Start Free Today", 899, cta_font, "#ffffff")
    centered(draw, "No wholesale, credit sale, returns, or repair in Lite", 984, small_font, MUTED)

    img.save(POST_PATH, quality=95)


if __name__ == "__main__":
    build_pdf()
    build_post()
    print(PDF_PATH)
    print(POST_PATH)
