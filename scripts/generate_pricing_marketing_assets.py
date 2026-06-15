from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT / "output" / "pdf"
IMAGE_DIR = ROOT / "output" / "images"
PDF_PATH = PDF_DIR / "cellivo-pricing-packages-2026.pdf"
POST_PATH = IMAGE_DIR / "cellivo-lite-package-launch-post.png"

BRAND = colors.HexColor("#4f63f1")
INK = colors.HexColor("#0f172a")
MUTED = colors.HexColor("#64748b")
LINE = colors.HexColor("#dbe3ef")
SOFT = colors.HexColor("#f5f7fb")
GREEN = colors.HexColor("#16a34a")
RED = colors.HexColor("#dc2626")

PLAN_ORDER = ["Lite", "Starter", "Growth", "Business", "Unlimited"]

PLANS = {
    "Lite": {
        "tagline": "For simple retail shops starting lean",
        "branches": "1 branch",
        "monthly": ("2,900", "10"),
        "yearly": ("29,000", "97"),
        "lifetime": ("149,000", "497"),
        "cta": "Start Free",
    },
    "Starter": {
        "tagline": "For single-location phone shops",
        "branches": "1 branch",
        "monthly": ("7,000", "25"),
        "yearly": ("70,000", "250"),
        "lifetime": ("380,000", "1,300"),
        "cta": "Start Free",
    },
    "Growth": {
        "tagline": "For shops expanding to multiple locations",
        "branches": "Up to 3 branches",
        "monthly": ("12,000", "40"),
        "yearly": ("120,000", "400"),
        "lifetime": ("500,000", "1,700"),
        "cta": "Start Free",
    },
    "Business": {
        "tagline": "For established multi-location retailers",
        "branches": "Up to 6 branches",
        "monthly": ("16,000", "55"),
        "yearly": ("160,000", "550"),
        "lifetime": ("700,000", "2,500"),
        "cta": "Start Free",
    },
    "Unlimited": {
        "tagline": "For large-scale or franchise operations",
        "branches": "Unlimited branches",
        "monthly": ("Contact", "Contact"),
        "yearly": ("Contact", "Contact"),
        "lifetime": ("Contact", "Contact"),
        "cta": "Contact Us",
    },
}

FEATURES = [
    ("Core POS features", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("Billing and invoicing", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("Product inventory", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("Accessories management", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("Customer records", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("Supplier records", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("Purchasing", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("Basic reports", ["Yes", "Yes", "Yes", "Yes", "Yes"]),
    ("IMEI-based stock control", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Repair job management", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Credit sale workflows", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Returns management", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Wholesale workflows", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Staff and user roles", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Advanced reports", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Profit analytics", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Full analytics dashboard", ["No", "Yes", "Yes", "Yes", "Yes"]),
    ("Priority support", ["No", "Yes", "Yes", "Yes", "Yes"]),
]

LITE_INCLUDED = [
    "Billing and invoicing",
    "Product inventory",
    "Accessories management",
    "Customer records",
    "Supplier records",
    "Purchasing",
    "Basic reports",
]

LITE_NOT_INCLUDED = [
    "Wholesale workflows",
    "Credit sale workflows",
    "Returns management",
    "Repair job management",
    "IMEI-based stock control",
    "Advanced reports",
]


def style_sheet():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            "CellivoTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=28,
            leading=32,
            textColor=INK,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            "CellivoSubtitle",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=11,
            leading=16,
            textColor=MUTED,
            spaceAfter=16,
        )
    )
    styles.add(
        ParagraphStyle(
            "SectionTitle",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=20,
            textColor=INK,
            spaceBefore=8,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            "Small",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=MUTED,
        )
    )
    styles.add(
        ParagraphStyle(
            "Cell",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=10.5,
            textColor=INK,
        )
    )
    return styles


def p(text, style):
    return Paragraph(text, style)


def price_line(plan, cycle):
    lkr, usd = PLANS[plan][cycle]
    if lkr == "Contact":
        return "Contact Us"
    suffix = "/mo" if cycle == "monthly" else "/yr" if cycle == "yearly" else " one-time"
    return f"LKR {lkr}{suffix}<br/><font color='#64748b'>USD {usd}{suffix}</font>"


def pricing_table(styles):
    header = ["Package", "Best for", "Branches", "Monthly", "Yearly", "Lifetime", "CTA"]
    rows = [header]
    for plan in PLAN_ORDER:
        rows.append(
            [
                p(f"<b>{plan}</b>", styles["Cell"]),
                p(PLANS[plan]["tagline"], styles["Cell"]),
                p(PLANS[plan]["branches"], styles["Cell"]),
                p(price_line(plan, "monthly"), styles["Cell"]),
                p(price_line(plan, "yearly"), styles["Cell"]),
                p(price_line(plan, "lifetime"), styles["Cell"]),
                p(PLANS[plan]["cta"], styles["Cell"]),
            ]
        )

    table = Table(rows, colWidths=[25 * mm, 49 * mm, 30 * mm, 34 * mm, 34 * mm, 38 * mm, 25 * mm], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BRAND),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("BACKGROUND", (0, 1), (-1, 1), colors.HexColor("#f8fbff")),
            ]
        )
    )
    return table


def feature_table(styles):
    header = ["Feature"] + PLAN_ORDER
    rows = [header]
    for feature, values in FEATURES:
        rows.append([p(feature, styles["Cell"])] + values)

    table = Table(rows, colWidths=[64 * mm, 32 * mm, 32 * mm, 32 * mm, 32 * mm, 34 * mm], repeatRows=1)
    commands = [
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("GRID", (0, 0), (-1, -1), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]
    for row_idx in range(1, len(rows)):
        if row_idx % 2 == 0:
            commands.append(("BACKGROUND", (0, row_idx), (-1, row_idx), SOFT))
        for col_idx in range(1, 6):
            value = FEATURES[row_idx - 1][1][col_idx - 1]
            if value == "Yes":
                commands.append(("TEXTCOLOR", (col_idx, row_idx), (col_idx, row_idx), GREEN))
            elif value == "No":
                commands.append(("TEXTCOLOR", (col_idx, row_idx), (col_idx, row_idx), RED))
    table.setStyle(TableStyle(commands))
    return table


def bullet_table(title, items, color, styles):
    data = [[p(f"<font color='#ffffff'><b>{title}</b></font>", styles["Cell"])]]
    data.extend([[p(f"- {item}", styles["Cell"])] for item in items])
    table = Table(data, colWidths=[110 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), color),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def build_pdf():
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    styles = style_sheet()
    doc = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=landscape(A4),
        rightMargin=13 * mm,
        leftMargin=13 * mm,
        topMargin=13 * mm,
        bottomMargin=12 * mm,
    )

    story = [
        p("Cellivo Pricing Packages", styles["CellivoTitle"]),
        p(
            "Monthly, yearly, and lifetime pricing for phone shops, mobile retailers, and multi-branch operations. Prices shown in LKR and USD. Current as of June 15, 2026.",
            styles["CellivoSubtitle"],
        ),
        pricing_table(styles),
        Spacer(1, 10 * mm),
        p("Quick recommendation", styles["SectionTitle"]),
        p(
            "Lite is the best entry package for simple retail shops that need billing, inventory, accessories, customers, suppliers, purchasing, and basic reports without advanced repair or credit-sale workflows. Starter and above keep the full operational feature set.",
            styles["CellivoSubtitle"],
        ),
        PageBreak(),
        p("Feature Comparison", styles["CellivoTitle"]),
        p("Use this table to explain what each customer receives by package.", styles["CellivoSubtitle"]),
        feature_table(styles),
        PageBreak(),
        Spacer(1, 6 * mm),
        p("Lite Package Details", styles["CellivoTitle"]),
        p(
            "Lite is built for marketing and entry-level adoption. It keeps the price accessible while protecting higher-value workflows for Starter and above.",
            styles["CellivoSubtitle"],
        ),
        Table(
            [[bullet_table("Included in Lite", LITE_INCLUDED, GREEN, styles), bullet_table("Not included in Lite", LITE_NOT_INCLUDED, RED, styles)]],
            colWidths=[120 * mm, 120 * mm],
            hAlign="LEFT",
            style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
        ),
        Spacer(1, 8 * mm),
        p("Lite pricing: LKR 2,900 per month, LKR 29,000 per year, or LKR 149,000 lifetime.", styles["SectionTitle"]),
        p(
            "CTA: Start Free. The 14-day free trial stays available, and Lite can be upgraded later when a customer needs repair, credit sale, return, wholesale, IMEI, or advanced reporting features.",
            styles["CellivoSubtitle"],
        ),
        p("Public pricing page: https://cellivo.com/pricing", styles["Small"]),
    ]

    doc.build(story, onFirstPage=draw_footer, onLaterPages=draw_footer)


def draw_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BRAND)
    canvas.roundRect(13 * mm, 7 * mm, 22 * mm, 7 * mm, 3 * mm, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 7)
    canvas.drawCentredString(24 * mm, 9.3 * mm, "Cellivo")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7)
    canvas.drawRightString(284 * mm, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()


def find_font(bold=False, size=48):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Helvetica Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Helvetica.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default(size=size)


def draw_wrapped(draw, text, xy, font, fill, max_width, line_gap=8):
    x, y = xy
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        if draw.textbbox((0, 0), test, font=font)[2] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        y += font.size + line_gap
    return y


def build_lite_post():
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    width = height = 1080
    image = Image.new("RGB", (width, height), "#f7f9ff")
    draw = ImageDraw.Draw(image)

    title_font = find_font(True, 82)
    heading_font = find_font(True, 48)
    body_font = find_font(False, 31)
    small_font = find_font(True, 24)
    price_font = find_font(True, 72)
    tag_font = find_font(True, 26)
    cta_font = find_font(True, 44)

    draw.rounded_rectangle((56, 48, 1024, 1032), radius=44, fill="#ffffff", outline="#dbe3ef", width=3)
    draw.rounded_rectangle((88, 82, 264, 126), radius=22, fill="#4f63f1")
    draw.text((121, 92), "Cellivo", font=tag_font, fill="#ffffff")

    draw.rounded_rectangle((88, 158, 992, 342), radius=34, fill="#101827")
    draw.text((128, 187), "Introducing", font=heading_font, fill="#c7d2fe")
    draw.text((128, 238), "Lite Package", font=title_font, fill="#ffffff")
    draw.rounded_rectangle((740, 201, 952, 291), radius=28, fill="#ffffff")
    draw.text((780, 218), "NEW", font=heading_font, fill="#4f63f1")

    draw.text((104, 394), "For simple retail shops starting lean", font=heading_font, fill="#101827")

    draw.rounded_rectangle((104, 468, 520, 620), radius=30, fill="#eef2ff")
    draw.text((134, 494), "Monthly", font=small_font, fill="#4f63f1")
    draw.text((134, 526), "LKR", font=small_font, fill="#64748b")
    draw.text((198, 507), "2,900", font=price_font, fill="#101827")
    draw.text((382, 550), "/mo", font=body_font, fill="#64748b")

    draw.rounded_rectangle((560, 468, 976, 620), radius=30, fill="#f0fdf4")
    draw.text((590, 494), "Also available", font=small_font, fill="#16a34a")
    draw.text((590, 535), "Yearly LKR 29,000", font=body_font, fill="#101827")
    draw.text((590, 578), "Lifetime LKR 149,000", font=body_font, fill="#101827")

    included = ["Billing and invoicing", "Product inventory", "Accessories", "Customers and suppliers", "Purchasing", "Basic reports"]
    x_positions = [120, 570]
    y = 680
    for index, item in enumerate(included):
        x = x_positions[index % 2]
        if index % 2 == 0 and index > 0:
            y += 66
        draw.rounded_rectangle((x, y, x + 28, y + 28), radius=14, fill="#dcfce7")
        draw.line((x + 8, y + 15, x + 13, y + 21, x + 22, y + 8), fill="#16a34a", width=4)
        draw.text((x + 44, y - 4), item, font=body_font, fill="#334155")

    draw.rounded_rectangle((104, 884, 976, 946), radius=24, fill="#4f63f1")
    cta = "Start with 14-day free trial"
    cta_box = draw.textbbox((0, 0), cta, font=cta_font)
    draw.text(((1080 - (cta_box[2] - cta_box[0])) / 2, 889), cta, font=cta_font, fill="#ffffff")
    draw.text((218, 968), "No wholesale, credit sale, returns, or repair in Lite", font=small_font, fill="#64748b")

    image.save(POST_PATH, quality=95)


if __name__ == "__main__":
    build_pdf()
    build_lite_post()
    print(PDF_PATH)
    print(POST_PATH)
