import fs from "node:fs";
import path from "node:path";
import { randomBytes, scryptSync, timingSafeEqual, createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import { marked } from "marked";

import { SITE_URL } from "./seo.config.js";
import { BLOG_SEED_AUTHORS, BLOG_SEED_CATEGORIES, BLOG_SEED_POSTS } from "./blog.seed.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "data");
const dbPath = path.resolve(dataDir, "cellivo.sqlite");

const MONEY_PAGE_URLS = new Set([
  "/mobile-shop-pos-system",
  "/pos-system-for-phone-shop",
  "/pricing",
  "/billing-software-for-mobile-shop",
  "/imei-tracking-pos-system",
  "/mobile-repair-management-software",
  "/inventory-management-system",
]);

export const ADMIN_SESSION_COOKIE_NAME = "cellivo_admin_session";
const parsePositiveMinutes = (value, fallbackMinutes) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallbackMinutes;
};
const ADMIN_SESSION_DURATION_MS =
  parsePositiveMinutes(process.env.ADMIN_SESSION_MAX_AGE_MINUTES, 8 * 60) * 60 * 1000;
const ADMIN_SESSION_IDLE_TIMEOUT_MS =
  parsePositiveMinutes(process.env.ADMIN_SESSION_IDLE_TIMEOUT_MINUTES, 30) * 60 * 1000;
const ADMIN_DEFAULT_EMAIL = process.env.ADMIN_EMAIL || "admin@cellivo.com";
const ADMIN_DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "ChangeMeNow!123";
const ADMIN_DEFAULT_NAME = process.env.ADMIN_NAME || "Cellivo Admin";

const DEFAULT_CUSTOMER_LOGOS = [
  {
    name: "PhoneZone Store",
    detail: "2 branches",
    imageUrl: "",
    imageAlt: "PhoneZone Store customer logo",
    isActive: true,
  },
  {
    name: "MobileFix Repair Hub",
    detail: "Repair-first retail",
    imageUrl: "",
    imageAlt: "MobileFix Repair Hub customer logo",
    isActive: true,
  },
  {
    name: "MultiCell Retail",
    detail: "5 locations",
    imageUrl: "",
    imageAlt: "MultiCell Retail customer logo",
    isActive: true,
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    name: "Ahmed Al-Rashidi",
    role: "Owner — PhoneZone Store (2 branches)",
    text: "I signed up during my lunch break and was billing customers by the afternoon. No IT guy, no setup calls. The IMEI stock control alone saved me hours every week.",
    result: "80% fewer stock discrepancies",
    imageUrl: "",
    imageAlt: "Ahmed Al-Rashidi testimonial profile image",
    rating: 5,
    isActive: true,
  },
  {
    name: "Sarah Chen",
    role: "Manager — MobileFix Repair Hub",
    text: "We tried three other POS systems before Cellivo. They all needed 'onboarding calls.' Cellivo? I created an account, added our repair categories, and my team was using it the same day.",
    result: "Zero lost repair tickets",
    imageUrl: "",
    imageAlt: "Sarah Chen testimonial profile image",
    rating: 5,
    isActive: true,
  },
  {
    name: "James Okonkwo",
    role: "CEO — MultiCell Retail (5 locations)",
    text: "I set up all 5 branches in one evening. Each branch manager created their account, I assigned roles, and we were live everywhere by the next morning.",
    result: "15% margin recovery on accessories",
    imageUrl: "",
    imageAlt: "James Okonkwo testimonial profile image",
    rating: 5,
    isActive: true,
  },
];

const DEFAULT_PRICING_PLANS = [
  {
    planKey: "lite",
    planName: "Lite",
    ctaLabel: "Start Free",
    ctaUrl: "https://account.cellivo.com/?add-to-cart=296&billing_term=monthly&package_code=lite",
    lkrCtaUrl: "https://account.cellivo.com/?add-to-cart=296&billing_term=monthly&package_code=lite",
    usdCtaUrl: "https://account.cellivo.com/?add-to-cart=296&billing_term=monthly&package_code=lite",
    displayOrder: 0,
  },
  {
    planKey: "starter",
    planName: "Starter",
    ctaLabel: "Start Free",
    ctaUrl: "/signup",
    lkrCtaUrl: "/signup",
    usdCtaUrl: "/signup",
    displayOrder: 1,
  },
  {
    planKey: "growth",
    planName: "Growth",
    ctaLabel: "Start Free",
    ctaUrl: "/signup",
    lkrCtaUrl: "/signup",
    usdCtaUrl: "/signup",
    displayOrder: 2,
  },
  {
    planKey: "business",
    planName: "Business",
    ctaLabel: "Start Free",
    ctaUrl: "/signup",
    lkrCtaUrl: "/signup",
    usdCtaUrl: "/signup",
    displayOrder: 3,
  },
  {
    planKey: "unlimited",
    planName: "Unlimited",
    ctaLabel: "Contact Us",
    ctaUrl: "/contact",
    lkrCtaUrl: "/contact",
    usdCtaUrl: "/contact",
    displayOrder: 4,
  },
];

const PRICING_BILLING_CYCLES = ["monthly", "yearly", "lifetime"];

const DEFAULT_PRICING_CTA_URLS = {
  lite: {
    monthly: "https://account.cellivo.com/?add-to-cart=296&billing_term=monthly&package_code=lite",
    yearly: "https://account.cellivo.com/?add-to-cart=298&billing_term=yearly&package_code=lite",
    lifetime: "https://account.cellivo.com/?add-to-cart=299&billing_term=lifetime&package_code=lite",
  },
};

const DEFAULT_PRICING_AMOUNTS = {
  lite: {
    monthly: { lkrPrice: "2900", usdPrice: "10" },
    yearly: { lkrPrice: "29000", usdPrice: "97" },
    lifetime: { lkrPrice: "149000", usdPrice: "497" },
  },
  starter: {
    monthly: { lkrPrice: "7000", usdPrice: "23" },
    yearly: { lkrPrice: "70000", usdPrice: "233" },
    lifetime: { lkrPrice: "380000", usdPrice: "1267" },
  },
  growth: {
    monthly: { lkrPrice: "12000", usdPrice: "40" },
    yearly: { lkrPrice: "120000", usdPrice: "400" },
    lifetime: { lkrPrice: "500000", usdPrice: "1667" },
  },
  business: {
    monthly: { lkrPrice: "16000", usdPrice: "53" },
    yearly: { lkrPrice: "160000", usdPrice: "533" },
    lifetime: { lkrPrice: "700000", usdPrice: "2333" },
  },
  unlimited: {
    monthly: { lkrPrice: "", usdPrice: "" },
    yearly: { lkrPrice: "", usdPrice: "" },
    lifetime: { lkrPrice: "", usdPrice: "" },
  },
};

const getDefaultPricingAmounts = (planKey, billingCycle) =>
  DEFAULT_PRICING_AMOUNTS[planKey]?.[billingCycle] || { lkrPrice: "", usdPrice: "" };

const getDefaultPricingCtaUrls = (planKey, billingCycle, fallbackUrl) => {
  const url = DEFAULT_PRICING_CTA_URLS[planKey]?.[billingCycle] || fallbackUrl || "";
  return { ctaUrl: url, lkrCtaUrl: url, usdCtaUrl: url };
};

const DEFAULT_PRICING_PLAN_LINKS = DEFAULT_PRICING_PLANS.flatMap((plan) =>
  PRICING_BILLING_CYCLES.map((billingCycle, cycleIndex) => ({
    ...plan,
    billingCycle,
    ...getDefaultPricingAmounts(plan.planKey, billingCycle),
    ...getDefaultPricingCtaUrls(plan.planKey, billingCycle, plan.ctaUrl),
    displayOrder: plan.displayOrder * PRICING_BILLING_CYCLES.length + cycleIndex,
  })),
);

const DEFAULT_SEO_SETTINGS = {
  sitemapEnabled: true,
  sitemapIncludeStaticPages: true,
  sitemapIncludeBlogPosts: true,
  sitemapDefaultChangefreq: "weekly",
  sitemapDefaultPriority: "0.7",
  googleAnalyticsEnabled: false,
  googleAnalyticsMeasurementId: "",
  googleSearchConsoleVerification: "",
  googleSearchConsolePropertyUrl: SITE_URL,
  googleSearchConsoleServiceAccountJson: "",
  googleSearchConsoleLastSubmittedAt: "",
};

const DEFAULT_SMTP_SETTINGS = {
  enabled: false,
  host: "",
  port: 587,
  encryption: "tls",
  username: "",
  password: "",
  fromName: "Cellivo Team",
  fromEmail: "hello@cellivo.com",
  toEmail: "hello@cellivo.com",
};

let db;

marked.setOptions({
  gfm: true,
  breaks: true,
});

const nowIso = () => new Date().toISOString();

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const safeJsonParse = (value, fallback) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const HTML_CONTENT_PATTERN = /<\/?[a-z][\s\S]*>/i;
const SITE_HOSTNAME = (() => {
  try {
    return new URL(SITE_URL).hostname.replace(/^www\./i, "");
  } catch {
    return "cellivo.com";
  }
})();
const INTERNAL_UPLOAD_HOSTNAMES = new Set(["localhost", "127.0.0.1", SITE_HOSTNAME]);
const escapeRegExp = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const ABSOLUTE_UPLOAD_URL_PATTERN = new RegExp(
  `https?:\\/\\/(?:localhost|127\\.0\\.0\\.1|(?:www\\.)?${escapeRegExp(SITE_HOSTNAME)})(?::\\d+)?(\\/uploads\\/[^\\s"'<>)]*)`,
  "gi",
);

const isHtmlContent = (content = "") => HTML_CONTENT_PATTERN.test(content);

const stripHtmlTags = (value = "") =>
  value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalizeManagedUploadUrl = (value = "") => {
  const normalizedValue = `${value ?? ""}`.trim();
  if (!normalizedValue) return "";
  if (normalizedValue.startsWith("/uploads/")) return normalizedValue;

  try {
    const parsed = new URL(normalizedValue);
    const normalizedHostname = parsed.hostname.replace(/^www\./i, "");

    if (parsed.pathname.startsWith("/uploads/") && INTERNAL_UPLOAD_HOSTNAMES.has(normalizedHostname)) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }

    return parsed.toString();
  } catch {
    return normalizedValue;
  }
};

const normalizeEmbeddedUploadUrls = (value = "") =>
  `${value ?? ""}`.replace(ABSOLUTE_UPLOAD_URL_PATTERN, "$1");

const renderStoredBlogContent = (content = "") => {
  const normalizedContent = normalizeEmbeddedUploadUrls(content);
  return isHtmlContent(normalizedContent) ? normalizedContent : (marked.parse(normalizedContent) || "");
};

const ensureAbsoluteUrl = (value) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return new URL(value.startsWith("/") ? value : `/${value}`, `${SITE_URL}/`).toString();
};

const arrayToJson = (value) => JSON.stringify(Array.isArray(value) ? value : []);

const normalizeStringArray = (value) =>
  (Array.isArray(value) ? value : [])
    .map((item) => `${item ?? ""}`.trim())
    .filter(Boolean);

const normalizeFaqItems = (items) =>
  (Array.isArray(items) ? items : [])
    .map((item) => ({
      question: `${item?.question ?? ""}`.trim(),
      answer: `${item?.answer ?? ""}`.trim(),
    }))
    .filter((item) => item.question && item.answer);

const getWordCount = (content = "") =>
  content
    .replace(/<[^>]*>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

const calculateReadTime = (content = "") => `${Math.max(1, Math.ceil(getWordCount(content) / 220))} min read`;

const hashPassword = (password) => {
  const salt = randomBytes(16).toString("base64");
  const hash = scryptSync(password, salt, 64).toString("base64");
  return `scrypt$${salt}$${hash}`;
};

const verifyPassword = (password, storedHash) => {
  if (!storedHash?.startsWith("scrypt$")) return false;
  const [, salt, expectedHash] = storedHash.split("$");
  if (!salt || !expectedHash) return false;

  const derived = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHash, "base64");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
};

const createSessionToken = () => randomBytes(32).toString("base64url");
const hashSessionToken = (token) => createHash("sha256").update(token).digest("hex");

const extractFirstParagraph = (content = "") => {
  if (isHtmlContent(content)) {
    const paragraphMatches = [...content.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((match) => stripHtmlTags(match[1]))
      .filter(Boolean);

    if (paragraphMatches[0]) return paragraphMatches[0];

    return stripHtmlTags(content);
  }

  const paragraphs = content
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !part.startsWith("#") && !part.startsWith(">") && !part.startsWith("- "));

  return paragraphs[0] ?? "";
};

const extractHeadings = (content = "") =>
  isHtmlContent(content)
    ? [...content.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi)]
        .map((match) => stripHtmlTags(match[1]))
        .filter(Boolean)
    : content
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => /^#{2,6}\s+/.test(line))
        .map((line) => line.replace(/^#{2,6}\s+/, ""));

const getInternalLinkMatches = (content = "") => {
  const htmlHrefMatches = [...content.matchAll(/href=["'](\/[^"']+)["']/g)].map((match) => match[1]);
  const markdownMatches = [...content.matchAll(/\[[^\]]+\]\((\/[^)]+)\)/g)].map((match) => match[1]);
  return [...htmlHrefMatches, ...markdownMatches];
};

const formatValidationResult = (checks) => {
  const errorCount = checks.filter((check) => check.status === "error").length;
  const warningCount = checks.filter((check) => check.status === "warning").length;

  return {
    checks,
    canPublish: errorCount === 0,
    errorCount,
    warningCount,
  };
};

const getDatabase = () => {
  if (db) return db;

  fs.mkdirSync(dataDir, { recursive: true });
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS blog_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS authors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      bio TEXT DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT NOT NULL,
      featured_image TEXT NOT NULL,
      featured_image_alt TEXT NOT NULL,
      content TEXT NOT NULL,
      category_id INTEGER NOT NULL,
      author_id INTEGER NOT NULL,
      publish_date TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('draft', 'scheduled', 'published')),
      faq_enabled INTEGER NOT NULL DEFAULT 0,
      related_post_ids TEXT DEFAULT '[]',
      related_product_page_urls TEXT DEFAULT '[]',
      related_feature_page_urls TEXT DEFAULT '[]',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      published_at TEXT,
      FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE RESTRICT,
      FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE RESTRICT
    );

    CREATE TABLE IF NOT EXISTS blog_seo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL UNIQUE,
      seo_title TEXT NOT NULL,
      meta_description TEXT NOT NULL,
      canonical_url TEXT NOT NULL,
      focus_keyword TEXT NOT NULL,
      secondary_keywords TEXT DEFAULT '[]',
      og_title TEXT NOT NULL,
      og_description TEXT NOT NULL,
      og_image TEXT NOT NULL,
      twitter_title TEXT NOT NULL,
      twitter_description TEXT NOT NULL,
      twitter_image TEXT NOT NULL,
      robots_setting TEXT NOT NULL DEFAULT 'index,follow',
      FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS blog_faqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      position INTEGER NOT NULL DEFAULT 0,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS blog_internal_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL UNIQUE,
      primary_money_page_url TEXT NOT NULL,
      secondary_money_page_url TEXT NOT NULL,
      related_feature_page_urls TEXT DEFAULT '[]',
      suggested_anchor_texts TEXT DEFAULT '[]',
      FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS blog_tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      is_active INTEGER NOT NULL DEFAULT 1,
      must_change_password INTEGER NOT NULL DEFAULT 0,
      last_login_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      last_seen_at TEXT NOT NULL,
      user_agent TEXT DEFAULT '',
      ip_address TEXT DEFAULT '',
      FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS customer_logos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      detail TEXT DEFAULT '',
      image_url TEXT DEFAULT '',
      image_alt TEXT DEFAULT '',
      display_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT DEFAULT '',
      quote_text TEXT NOT NULL,
      result_text TEXT DEFAULT '',
      image_url TEXT DEFAULT '',
      image_alt TEXT DEFAULT '',
      rating INTEGER NOT NULL DEFAULT 5,
      display_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pricing_plan_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plan_key TEXT NOT NULL UNIQUE,
      plan_name TEXT NOT NULL,
      cta_label TEXT NOT NULL,
      cta_url TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pricing_plan_cta_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plan_key TEXT NOT NULL,
      billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly', 'lifetime')),
      plan_name TEXT NOT NULL,
      lkr_price TEXT DEFAULT '',
      usd_price TEXT DEFAULT '',
      cta_label TEXT NOT NULL,
      cta_url TEXT NOT NULL,
      lkr_cta_url TEXT DEFAULT '',
      usd_cta_url TEXT DEFAULT '',
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(plan_key, billing_cycle)
    );

    CREATE TABLE IF NOT EXISTS seo_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      sitemap_enabled INTEGER NOT NULL DEFAULT 1,
      sitemap_include_static_pages INTEGER NOT NULL DEFAULT 1,
      sitemap_include_blog_posts INTEGER NOT NULL DEFAULT 1,
      sitemap_default_changefreq TEXT NOT NULL DEFAULT 'weekly',
      sitemap_default_priority TEXT NOT NULL DEFAULT '0.7',
      google_analytics_enabled INTEGER NOT NULL DEFAULT 0,
      google_analytics_measurement_id TEXT DEFAULT '',
      google_search_console_verification TEXT DEFAULT '',
      google_search_console_property_url TEXT DEFAULT '',
      google_search_console_service_account_json TEXT DEFAULT '',
      google_search_console_last_submitted_at TEXT DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS smtp_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      enabled INTEGER NOT NULL DEFAULT 0,
      host TEXT DEFAULT '',
      port INTEGER NOT NULL DEFAULT 587,
      encryption TEXT NOT NULL DEFAULT 'tls',
      username TEXT DEFAULT '',
      password TEXT DEFAULT '',
      from_name TEXT DEFAULT '',
      from_email TEXT DEFAULT '',
      to_email TEXT DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  const postColumns = db.prepare("PRAGMA table_info(blog_posts)").all();
  if (!postColumns.some((column) => column.name === "faq_enabled")) {
    db.exec("ALTER TABLE blog_posts ADD COLUMN faq_enabled INTEGER NOT NULL DEFAULT 0");
  }

  const testimonialColumns = db.prepare("PRAGMA table_info(testimonials)").all();
  if (!testimonialColumns.some((column) => column.name === "image_url")) {
    db.exec("ALTER TABLE testimonials ADD COLUMN image_url TEXT DEFAULT ''");
  }
  if (!testimonialColumns.some((column) => column.name === "image_alt")) {
    db.exec("ALTER TABLE testimonials ADD COLUMN image_alt TEXT DEFAULT ''");
  }

  const pricingPlanCtaColumns = db.prepare("PRAGMA table_info(pricing_plan_cta_links)").all();
  if (!pricingPlanCtaColumns.some((column) => column.name === "lkr_price")) {
    db.exec("ALTER TABLE pricing_plan_cta_links ADD COLUMN lkr_price TEXT DEFAULT ''");
  }
  if (!pricingPlanCtaColumns.some((column) => column.name === "usd_price")) {
    db.exec("ALTER TABLE pricing_plan_cta_links ADD COLUMN usd_price TEXT DEFAULT ''");
  }
  if (!pricingPlanCtaColumns.some((column) => column.name === "lkr_cta_url")) {
    db.exec("ALTER TABLE pricing_plan_cta_links ADD COLUMN lkr_cta_url TEXT DEFAULT ''");
  }
  if (!pricingPlanCtaColumns.some((column) => column.name === "usd_cta_url")) {
    db.exec("ALTER TABLE pricing_plan_cta_links ADD COLUMN usd_cta_url TEXT DEFAULT ''");
  }

  seedDatabase();
  seedHomepageSocialProof();
  seedPricingPlanLinks();
  seedPricingPlanAmounts();
  seedPricingPlanCurrencyLinks();
  seedSeoSettings();
  seedSmtpSettings();
  ensureAdminBootstrapUser();
  migrateLegacyUploadUrls();

  return db;
};

const migrateLegacyUploadUrls = () => {
  const database = db;
  if (!database) return;

  const updateFeaturedImage = database.prepare("UPDATE blog_posts SET featured_image = ? WHERE id = ?");
  const updateBlogContent = database.prepare("UPDATE blog_posts SET content = ? WHERE id = ?");
  const updateSeoImages = database.prepare(
    "UPDATE blog_seo SET og_image = ?, twitter_image = ? WHERE post_id = ?",
  );
  const updateLogoImage = database.prepare("UPDATE customer_logos SET image_url = ? WHERE id = ?");
  const updateTestimonialImage = database.prepare("UPDATE testimonials SET image_url = ? WHERE id = ?");

  database.transaction(() => {
    database
      .prepare("SELECT id, featured_image, content FROM blog_posts")
      .all()
      .forEach((row) => {
        const normalizedFeaturedImage = normalizeManagedUploadUrl(row.featured_image);
        const normalizedContent = normalizeEmbeddedUploadUrls(row.content);

        if (normalizedFeaturedImage !== row.featured_image) {
          updateFeaturedImage.run(normalizedFeaturedImage, row.id);
        }

        if (normalizedContent !== row.content) {
          updateBlogContent.run(normalizedContent, row.id);
        }
      });

    database
      .prepare("SELECT post_id, og_image, twitter_image FROM blog_seo")
      .all()
      .forEach((row) => {
        const normalizedOgImage = normalizeManagedUploadUrl(row.og_image);
        const normalizedTwitterImage = normalizeManagedUploadUrl(row.twitter_image);

        if (normalizedOgImage !== row.og_image || normalizedTwitterImage !== row.twitter_image) {
          updateSeoImages.run(normalizedOgImage, normalizedTwitterImage, row.post_id);
        }
      });

    database
      .prepare("SELECT id, image_url FROM customer_logos")
      .all()
      .forEach((row) => {
        const normalizedImageUrl = normalizeManagedUploadUrl(row.image_url);
        if (normalizedImageUrl !== row.image_url) {
          updateLogoImage.run(normalizedImageUrl, row.id);
        }
      });

    database
      .prepare("SELECT id, image_url FROM testimonials")
      .all()
      .forEach((row) => {
        const normalizedImageUrl = normalizeManagedUploadUrl(row.image_url);
        if (normalizedImageUrl !== row.image_url) {
          updateTestimonialImage.run(normalizedImageUrl, row.id);
        }
      });
  })();
};

const seedSeoSettings = () => {
  const database = db;
  const existing = database.prepare("SELECT id FROM seo_settings WHERE id = 1").get();
  if (existing) return;

  const timestamp = nowIso();
  database
    .prepare(
      `INSERT INTO seo_settings (
        id, sitemap_enabled, sitemap_include_static_pages, sitemap_include_blog_posts,
        sitemap_default_changefreq, sitemap_default_priority,
        google_analytics_enabled, google_analytics_measurement_id,
        google_search_console_verification, google_search_console_property_url,
        google_search_console_service_account_json, google_search_console_last_submitted_at,
        created_at, updated_at
      ) VALUES (
        1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )`,
    )
    .run(
      DEFAULT_SEO_SETTINGS.sitemapEnabled ? 1 : 0,
      DEFAULT_SEO_SETTINGS.sitemapIncludeStaticPages ? 1 : 0,
      DEFAULT_SEO_SETTINGS.sitemapIncludeBlogPosts ? 1 : 0,
      DEFAULT_SEO_SETTINGS.sitemapDefaultChangefreq,
      DEFAULT_SEO_SETTINGS.sitemapDefaultPriority,
      DEFAULT_SEO_SETTINGS.googleAnalyticsEnabled ? 1 : 0,
      DEFAULT_SEO_SETTINGS.googleAnalyticsMeasurementId,
      DEFAULT_SEO_SETTINGS.googleSearchConsoleVerification,
      DEFAULT_SEO_SETTINGS.googleSearchConsolePropertyUrl,
      DEFAULT_SEO_SETTINGS.googleSearchConsoleServiceAccountJson,
      DEFAULT_SEO_SETTINGS.googleSearchConsoleLastSubmittedAt,
      timestamp,
      timestamp,
    );
};

const seedSmtpSettings = () => {
  const database = db;
  const existing = database.prepare("SELECT id FROM smtp_settings WHERE id = 1").get();
  if (existing) return;

  const timestamp = nowIso();
  database
    .prepare(
      `INSERT INTO smtp_settings (
        id, enabled, host, port, encryption, username, password,
        from_name, from_email, to_email, created_at, updated_at
      ) VALUES (
        1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )`,
    )
    .run(
      DEFAULT_SMTP_SETTINGS.enabled ? 1 : 0,
      DEFAULT_SMTP_SETTINGS.host,
      DEFAULT_SMTP_SETTINGS.port,
      DEFAULT_SMTP_SETTINGS.encryption,
      DEFAULT_SMTP_SETTINGS.username,
      DEFAULT_SMTP_SETTINGS.password,
      DEFAULT_SMTP_SETTINGS.fromName,
      DEFAULT_SMTP_SETTINGS.fromEmail,
      DEFAULT_SMTP_SETTINGS.toEmail,
      timestamp,
      timestamp,
    );
};

const seedPricingPlanLinks = () => {
  const database = db;
  const count = database.prepare("SELECT COUNT(*) AS count FROM pricing_plan_cta_links").get()?.count ?? 0;
  if (count > 0) return;

  const timestamp = nowIso();
  const legacyRows = database
    .prepare(
      `SELECT plan_key, plan_name, cta_label, cta_url, display_order
       FROM pricing_plan_links
       ORDER BY display_order ASC, id ASC`,
    )
    .all();
  const legacyByPlan = new Map(legacyRows.map((row) => [row.plan_key, row]));
  const seedLinks = DEFAULT_PRICING_PLANS.flatMap((plan) => {
    const legacyPlan = legacyByPlan.get(plan.planKey);
    const basePlan = legacyPlan
      ? {
          planKey: legacyPlan.plan_key,
          planName: legacyPlan.plan_name,
          ctaLabel: legacyPlan.cta_label,
          ctaUrl: legacyPlan.cta_url,
          lkrCtaUrl: legacyPlan.cta_url,
          usdCtaUrl: legacyPlan.cta_url,
          displayOrder: plan.displayOrder,
        }
      : plan;

	    return PRICING_BILLING_CYCLES.map((billingCycle, cycleIndex) => ({
	      ...basePlan,
	      billingCycle,
	      ...getDefaultPricingAmounts(basePlan.planKey, billingCycle),
	      ...getDefaultPricingCtaUrls(basePlan.planKey, billingCycle, basePlan.ctaUrl),
	      displayOrder: basePlan.displayOrder * PRICING_BILLING_CYCLES.length + cycleIndex,
	    }));
	  });
  const insertPlanLink = database.prepare(
    `INSERT INTO pricing_plan_cta_links (
      plan_key, billing_cycle, plan_name, lkr_price, usd_price, cta_label, cta_url, lkr_cta_url, usd_cta_url, display_order, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );

  seedLinks.forEach((plan) => {
    insertPlanLink.run(
      plan.planKey,
      plan.billingCycle,
      plan.planName,
      plan.lkrPrice,
      plan.usdPrice,
      plan.ctaLabel,
      plan.ctaUrl,
      plan.lkrCtaUrl,
      plan.usdCtaUrl,
      plan.displayOrder,
      timestamp,
      timestamp,
    );
  });
};

const seedPricingPlanAmounts = () => {
  const database = db;
  const insertMissingPlanLink = database.prepare(
    `INSERT OR IGNORE INTO pricing_plan_cta_links (
      plan_key, billing_cycle, plan_name, lkr_price, usd_price, cta_label, cta_url, lkr_cta_url, usd_cta_url, display_order, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const updatePlanAmounts = database.prepare(
    `UPDATE pricing_plan_cta_links
     SET lkr_price = CASE WHEN COALESCE(NULLIF(lkr_price, ''), '') = '' THEN ? ELSE lkr_price END,
         usd_price = CASE WHEN COALESCE(NULLIF(usd_price, ''), '') = '' THEN ? ELSE usd_price END,
         updated_at = ?
     WHERE plan_key = ? AND billing_cycle = ?`,
  );

  const timestamp = nowIso();
  DEFAULT_PRICING_PLAN_LINKS.forEach((plan) => {
    insertMissingPlanLink.run(
      plan.planKey,
      plan.billingCycle,
      plan.planName,
      plan.lkrPrice,
      plan.usdPrice,
      plan.ctaLabel,
      plan.ctaUrl,
      plan.lkrCtaUrl,
      plan.usdCtaUrl,
      plan.displayOrder,
      timestamp,
      timestamp,
    );

    updatePlanAmounts.run(
      plan.lkrPrice,
      plan.usdPrice,
      timestamp,
      plan.planKey,
      plan.billingCycle,
    );
  });
};

const seedPricingPlanCurrencyLinks = () => {
  const database = db;
  const updatePlanLinks = database.prepare(
    `UPDATE pricing_plan_cta_links
     SET lkr_cta_url = CASE
           WHEN COALESCE(NULLIF(lkr_cta_url, ''), '') = ''
             OR (lkr_cta_url = ? AND usd_cta_url = ? AND COALESCE(NULLIF(cta_url, ''), '') <> ?)
           THEN COALESCE(NULLIF(cta_url, ''), ?)
           ELSE lkr_cta_url
         END,
         usd_cta_url = CASE
           WHEN COALESCE(NULLIF(usd_cta_url, ''), '') = ''
             OR (lkr_cta_url = ? AND usd_cta_url = ? AND COALESCE(NULLIF(cta_url, ''), '') <> ?)
           THEN COALESCE(NULLIF(cta_url, ''), ?)
           ELSE usd_cta_url
         END,
         updated_at = ?
     WHERE plan_key = ? AND billing_cycle = ?`,
  );

  const timestamp = nowIso();
  DEFAULT_PRICING_PLAN_LINKS.forEach((plan) => {
    const defaultCtaUrl = plan.ctaUrl || plan.usdCtaUrl || plan.lkrCtaUrl || "";

    updatePlanLinks.run(
      defaultCtaUrl,
      defaultCtaUrl,
      defaultCtaUrl,
      defaultCtaUrl,
      defaultCtaUrl,
      defaultCtaUrl,
      defaultCtaUrl,
      defaultCtaUrl,
      timestamp,
      plan.planKey,
      plan.billingCycle,
    );
  });
};

const sanitizeAdminUser = (row) => {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    mustChangePassword: Boolean(row.must_change_password),
    lastLoginAt: row.last_login_at,
  };
};

const ensureAdminBootstrapUser = () => {
  const database = db;
  const row = database.prepare("SELECT COUNT(*) AS count FROM admin_users").get();
  if ((row?.count ?? 0) > 0) return;

  const timestamp = nowIso();
  database
    .prepare(
      `INSERT INTO admin_users (
        name, email, password_hash, role, is_active, must_change_password, created_at, updated_at
      ) VALUES (?, ?, ?, 'admin', 1, ?, ?, ?)`,
    )
    .run(
      ADMIN_DEFAULT_NAME,
      ADMIN_DEFAULT_EMAIL.toLowerCase(),
      hashPassword(ADMIN_DEFAULT_PASSWORD),
      process.env.ADMIN_PASSWORD ? 0 : 1,
      timestamp,
      timestamp,
    );
};

const seedHomepageSocialProof = () => {
  const database = db;
  const logoCount = database.prepare("SELECT COUNT(*) AS count FROM customer_logos").get()?.count ?? 0;
  const testimonialCount = database.prepare("SELECT COUNT(*) AS count FROM testimonials").get()?.count ?? 0;
  const timestamp = nowIso();

  if (logoCount === 0) {
    const insertLogo = database.prepare(
      `INSERT INTO customer_logos (
        name, detail, image_url, image_alt, display_order, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    );

    DEFAULT_CUSTOMER_LOGOS.forEach((logo, index) => {
      insertLogo.run(
        logo.name,
        logo.detail,
        logo.imageUrl,
        logo.imageAlt,
        index,
        logo.isActive ? 1 : 0,
        timestamp,
        timestamp,
      );
    });
  }

  if (testimonialCount === 0) {
    const insertTestimonial = database.prepare(
      `INSERT INTO testimonials (
        name, role, quote_text, result_text, image_url, image_alt, rating, display_order, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );

    DEFAULT_TESTIMONIALS.forEach((testimonial, index) => {
      insertTestimonial.run(
        testimonial.name,
        testimonial.role,
        testimonial.text,
        testimonial.result,
        testimonial.imageUrl,
        testimonial.imageAlt,
        testimonial.rating,
        index,
        testimonial.isActive ? 1 : 0,
        timestamp,
        timestamp,
      );
    });
  }
};

const purgeExpiredAdminSessions = () => {
  const database = getDatabase();
  const timestamp = nowIso();
  const idleCutoff = new Date(Date.now() - ADMIN_SESSION_IDLE_TIMEOUT_MS).toISOString();
  database
    .prepare(
      `DELETE FROM admin_sessions
       WHERE datetime(expires_at) <= datetime(?)
          OR datetime(last_seen_at) <= datetime(?)`,
    )
    .run(timestamp, idleCutoff);
};

const getAdminUserRowByEmail = (email) => {
  const database = getDatabase();
  return database
    .prepare(
      `SELECT id, name, email, password_hash, role, is_active, must_change_password, last_login_at
       FROM admin_users
       WHERE lower(email) = lower(?)
       LIMIT 1`,
    )
    .get(email);
};

const getAdminUserRowById = (userId) => {
  const database = getDatabase();
  return database
    .prepare(
      `SELECT id, name, email, password_hash, role, is_active, must_change_password, last_login_at
       FROM admin_users
       WHERE id = ?
       LIMIT 1`,
    )
    .get(userId);
};

const createAdminSessionRecord = (userId, { userAgent = "", ipAddress = "" } = {}) => {
  const database = getDatabase();
  purgeExpiredAdminSessions();
  database.prepare("DELETE FROM admin_sessions WHERE user_id = ?").run(userId);
  const token = createSessionToken();
  const tokenHash = hashSessionToken(token);
  const timestamp = nowIso();
  const expiresAt = new Date(Date.now() + ADMIN_SESSION_DURATION_MS).toISOString();

  database
    .prepare(
      `INSERT INTO admin_sessions (
        user_id, token_hash, expires_at, created_at, last_seen_at, user_agent, ip_address
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(userId, tokenHash, expiresAt, timestamp, timestamp, userAgent, ipAddress);

  return { token, expiresAt };
};

export const authenticateAdminUser = (email, password, meta = {}) => {
  const normalizedEmail = `${email ?? ""}`.trim().toLowerCase();
  const normalizedPassword = `${password ?? ""}`;
  const user = getAdminUserRowByEmail(normalizedEmail);

  if (!user || !user.is_active || !verifyPassword(normalizedPassword, user.password_hash)) {
    return null;
  }

  const timestamp = nowIso();
  getDatabase()
    .prepare("UPDATE admin_users SET last_login_at = ?, updated_at = ? WHERE id = ?")
    .run(timestamp, timestamp, user.id);

  const session = createAdminSessionRecord(user.id, meta);

  return {
    user: sanitizeAdminUser({ ...user, last_login_at: timestamp }),
    session,
  };
};

export const getAdminSessionByToken = (token) => {
  if (!token) return null;
  purgeExpiredAdminSessions();

  const database = getDatabase();
  const tokenHash = hashSessionToken(token);
  const row = database
    .prepare(
      `SELECT
         s.id AS session_id,
         s.user_id,
         s.expires_at,
         s.last_seen_at,
         u.id,
         u.name,
         u.email,
         u.role,
         u.is_active,
         u.must_change_password,
         u.last_login_at
       FROM admin_sessions s
       INNER JOIN admin_users u ON u.id = s.user_id
       WHERE s.token_hash = ?
         AND datetime(s.expires_at) > datetime(?)
         AND datetime(s.last_seen_at) > datetime(?)
       LIMIT 1`,
    )
    .get(tokenHash, nowIso(), new Date(Date.now() - ADMIN_SESSION_IDLE_TIMEOUT_MS).toISOString());

  if (!row || !row.is_active) return null;

  const timestamp = nowIso();
  database.prepare("UPDATE admin_sessions SET last_seen_at = ? WHERE id = ?").run(timestamp, row.session_id);

  return {
    sessionId: row.session_id,
    expiresAt: row.expires_at,
    idleExpiresAt: new Date(Date.parse(row.last_seen_at) + ADMIN_SESSION_IDLE_TIMEOUT_MS).toISOString(),
    user: sanitizeAdminUser(row),
  };
};

export const invalidateAdminSession = (token) => {
  if (!token) return;
  const database = getDatabase();
  database.prepare("DELETE FROM admin_sessions WHERE token_hash = ?").run(hashSessionToken(token));
};

export const changeAdminPassword = (userId, currentPassword, nextPassword) => {
  const normalizedNextPassword = `${nextPassword ?? ""}`;
  if (normalizedNextPassword.length < 10) {
    const error = new Error("Use at least 10 characters for the new password.");
    error.statusCode = 422;
    throw error;
  }

  const user = getAdminUserRowById(userId);
  if (!user || !user.is_active) {
    const error = new Error("Admin user not found.");
    error.statusCode = 404;
    throw error;
  }

  if (!verifyPassword(`${currentPassword ?? ""}`, user.password_hash)) {
    const error = new Error("Your current password is incorrect.");
    error.statusCode = 401;
    throw error;
  }

  const timestamp = nowIso();
  getDatabase()
    .prepare(
      `UPDATE admin_users
       SET password_hash = ?, must_change_password = 0, updated_at = ?
       WHERE id = ?`,
    )
    .run(hashPassword(normalizedNextPassword), timestamp, userId);

  return sanitizeAdminUser({
    ...user,
    password_hash: undefined,
    must_change_password: 0,
  });
};

const upsertCategory = (name) => {
  const database = getDatabase();
  const normalizedName = `${name || ""}`.trim();
  if (!normalizedName) {
    throw new Error("Category is required.");
  }

  const existing = database.prepare("SELECT id FROM blog_categories WHERE name = ?").get(normalizedName);
  const timestamp = nowIso();

  if (existing) return existing.id;

  const result = database
    .prepare(
      "INSERT INTO blog_categories (name, slug, created_at, updated_at) VALUES (?, ?, ?, ?)",
    )
    .run(normalizedName, slugify(normalizedName), timestamp, timestamp);

  return Number(result.lastInsertRowid);
};

const upsertAuthor = (name, bio = "") => {
  const database = getDatabase();
  const normalizedName = `${name || ""}`.trim();
  if (!normalizedName) {
    throw new Error("Author is required.");
  }

  const existing = database.prepare("SELECT id FROM authors WHERE name = ?").get(normalizedName);
  const timestamp = nowIso();

  if (existing) return existing.id;

  const result = database
    .prepare("INSERT INTO authors (name, slug, bio, created_at, updated_at) VALUES (?, ?, ?, ?, ?)")
    .run(normalizedName, slugify(normalizedName), bio, timestamp, timestamp);

  return Number(result.lastInsertRowid);
};

const defaultSeoFromPost = (post) => ({
  seoTitle: post.title,
  metaDescription: post.excerpt,
  canonicalUrl: ensureAbsoluteUrl(`/blog/${post.slug}`),
  focusKeyword: post.focusKeyword || post.title,
  secondaryKeywords: normalizeStringArray(post.secondaryKeywords),
  ogTitle: post.title,
  ogDescription: post.excerpt,
  ogImage: ensureAbsoluteUrl(post.featuredImage || "/og-home.jpg"),
  twitterTitle: post.title,
  twitterDescription: post.excerpt,
  twitterImage: ensureAbsoluteUrl(post.featuredImage || "/og-home.jpg"),
  robotsSetting: "index,follow",
});

const defaultInternalLinksFromPost = (post) => ({
  primaryMoneyPageUrl: post.primaryMoneyPageUrl || "/mobile-shop-pos-system",
  secondaryMoneyPageUrl: post.secondaryMoneyPageUrl || "/pos-system-for-phone-shop",
  relatedFeaturePageUrls: normalizeStringArray(post.relatedFeaturePageUrls),
  suggestedAnchorTexts: normalizeStringArray(post.suggestedAnchorTexts),
});

const seedDatabase = () => {
  const database = db;
  const postCount = database.prepare("SELECT COUNT(*) as count FROM blog_posts").get().count;
  if (postCount > 0) return;

  BLOG_SEED_CATEGORIES.forEach((category) => upsertCategory(category));
  BLOG_SEED_AUTHORS.forEach((author) => upsertAuthor(author.name, author.bio));

  const insertPost = database.transaction((post) => {
    const timestamp = nowIso();
    const categoryId = upsertCategory(post.category);
    const authorId = upsertAuthor(post.author);
    const publishDate = post.publishDate || timestamp;

    const postResult = database
      .prepare(
        `INSERT INTO blog_posts (
          title, slug, excerpt, featured_image, featured_image_alt, content,
          category_id, author_id, publish_date, status, faq_enabled, related_post_ids,
          related_product_page_urls, related_feature_page_urls, created_at, updated_at, published_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        post.title,
        post.slug,
        post.excerpt,
        post.featuredImage || ensureAbsoluteUrl("/og-home.jpg"),
        post.featuredImageAlt || `${post.title} featured image`,
        post.content,
        categoryId,
        authorId,
        publishDate,
        "published",
        post.faqs.length > 0 ? 1 : 0,
        arrayToJson([]),
        arrayToJson(post.relatedProductPageUrls || []),
        arrayToJson(post.relatedFeaturePageUrls || []),
        timestamp,
        timestamp,
        publishDate,
      );

    const postId = Number(postResult.lastInsertRowid);
    const seo = defaultSeoFromPost(post);
    const internalLinks = defaultInternalLinksFromPost(post);

    database
      .prepare(
        `INSERT INTO blog_seo (
          post_id, seo_title, meta_description, canonical_url, focus_keyword,
          secondary_keywords, og_title, og_description, og_image,
          twitter_title, twitter_description, twitter_image, robots_setting
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        postId,
        seo.seoTitle,
        seo.metaDescription,
        seo.canonicalUrl,
        seo.focusKeyword,
        arrayToJson(seo.secondaryKeywords),
        seo.ogTitle,
        seo.ogDescription,
        seo.ogImage,
        seo.twitterTitle,
        seo.twitterDescription,
        seo.twitterImage,
        seo.robotsSetting,
      );

    database
      .prepare(
        `INSERT INTO blog_internal_links (
          post_id, primary_money_page_url, secondary_money_page_url,
          related_feature_page_urls, suggested_anchor_texts
        ) VALUES (?, ?, ?, ?, ?)`,
      )
      .run(
        postId,
        internalLinks.primaryMoneyPageUrl,
        internalLinks.secondaryMoneyPageUrl,
        arrayToJson(internalLinks.relatedFeaturePageUrls),
        arrayToJson(internalLinks.suggestedAnchorTexts),
      );

    normalizeFaqItems(post.faqs).forEach((faq, index) => {
      database
        .prepare("INSERT INTO blog_faqs (post_id, position, question, answer) VALUES (?, ?, ?, ?)")
        .run(postId, index, faq.question, faq.answer);
    });

    normalizeStringArray(post.tags).forEach((tag) => {
      database
        .prepare("INSERT INTO blog_tags (post_id, name, slug) VALUES (?, ?, ?)")
        .run(postId, tag, slugify(tag));
    });
  });

  BLOG_SEED_POSTS.forEach((post) => insertPost(post));
};

const mapCustomerLogo = (row) => ({
  id: row.id,
  name: row.name,
  detail: row.detail,
  imageUrl: normalizeManagedUploadUrl(row.image_url),
  imageAlt: row.image_alt,
  isActive: Boolean(row.is_active),
  displayOrder: row.display_order,
});

const mapTestimonial = (row) => ({
  id: row.id,
  name: row.name,
  role: row.role,
  text: row.quote_text,
  result: row.result_text,
  imageUrl: normalizeManagedUploadUrl(row.image_url),
  imageAlt: row.image_alt,
  rating: row.rating,
  isActive: Boolean(row.is_active),
  displayOrder: row.display_order,
});

export const getHomepageSocialProof = ({ activeOnly = true } = {}) => {
  const database = getDatabase();
  const logos = database
    .prepare(
      `SELECT id, name, detail, image_url, image_alt, display_order, is_active
       FROM customer_logos
       ${activeOnly ? "WHERE is_active = 1" : ""}
       ORDER BY display_order ASC, id ASC`,
    )
    .all()
    .map(mapCustomerLogo);

  const testimonials = database
    .prepare(
      `SELECT id, name, role, quote_text, result_text, image_url, image_alt, rating, display_order, is_active
       FROM testimonials
       ${activeOnly ? "WHERE is_active = 1" : ""}
       ORDER BY display_order ASC, id ASC`,
    )
    .all()
    .map(mapTestimonial);

  return {
    customerLogos: logos,
    testimonials,
  };
};

const mapPricingPlanLink = (row) => ({
  id: row.id,
  planKey: row.plan_key,
  billingCycle: row.billing_cycle,
  planName: row.plan_name,
  lkrPrice: row.lkr_price || "",
  usdPrice: row.usd_price || "",
  ctaLabel: row.cta_label,
  ctaUrl: row.cta_url,
  lkrCtaUrl: row.lkr_cta_url || row.cta_url || "",
  usdCtaUrl: row.usd_cta_url || row.cta_url || "",
  displayOrder: row.display_order,
});

export const getPricingPlanLinks = () => {
  const database = getDatabase();
  const rows = database
    .prepare(
      `SELECT id, plan_key, billing_cycle, plan_name, lkr_price, usd_price, cta_label, cta_url, lkr_cta_url, usd_cta_url, display_order
       FROM pricing_plan_cta_links
       ORDER BY display_order ASC, id ASC`,
    )
    .all()
    .map(mapPricingPlanLink);

  if (rows.length > 0) return rows;

  return DEFAULT_PRICING_PLAN_LINKS;
};

const mapSeoSettings = (row) => ({
  sitemapEnabled: Boolean(row?.sitemap_enabled ?? DEFAULT_SEO_SETTINGS.sitemapEnabled),
  sitemapIncludeStaticPages: Boolean(row?.sitemap_include_static_pages ?? DEFAULT_SEO_SETTINGS.sitemapIncludeStaticPages),
  sitemapIncludeBlogPosts: Boolean(row?.sitemap_include_blog_posts ?? DEFAULT_SEO_SETTINGS.sitemapIncludeBlogPosts),
  sitemapDefaultChangefreq: row?.sitemap_default_changefreq || DEFAULT_SEO_SETTINGS.sitemapDefaultChangefreq,
  sitemapDefaultPriority: row?.sitemap_default_priority || DEFAULT_SEO_SETTINGS.sitemapDefaultPriority,
  googleAnalyticsEnabled: Boolean(row?.google_analytics_enabled ?? DEFAULT_SEO_SETTINGS.googleAnalyticsEnabled),
  googleAnalyticsMeasurementId: row?.google_analytics_measurement_id || DEFAULT_SEO_SETTINGS.googleAnalyticsMeasurementId,
  googleSearchConsoleVerification:
    row?.google_search_console_verification || DEFAULT_SEO_SETTINGS.googleSearchConsoleVerification,
  googleSearchConsolePropertyUrl:
    row?.google_search_console_property_url || DEFAULT_SEO_SETTINGS.googleSearchConsolePropertyUrl,
  googleSearchConsoleServiceAccountJson:
    row?.google_search_console_service_account_json || DEFAULT_SEO_SETTINGS.googleSearchConsoleServiceAccountJson,
  googleSearchConsoleLastSubmittedAt:
    row?.google_search_console_last_submitted_at || DEFAULT_SEO_SETTINGS.googleSearchConsoleLastSubmittedAt,
});

export const getSeoSettings = () => {
  const database = getDatabase();
  const row = database.prepare("SELECT * FROM seo_settings WHERE id = 1").get();
  return mapSeoSettings(row);
};

const normalizeSeoSettingsPayload = (payload = {}) => {
  const allowedChangefreq = new Set(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"]);
  const changefreq = `${payload.sitemapDefaultChangefreq ?? DEFAULT_SEO_SETTINGS.sitemapDefaultChangefreq}`
    .trim()
    .toLowerCase();
  const priorityNumber = Number(payload.sitemapDefaultPriority);
  const priority =
    Number.isFinite(priorityNumber) && priorityNumber >= 0 && priorityNumber <= 1
      ? priorityNumber.toFixed(1)
      : DEFAULT_SEO_SETTINGS.sitemapDefaultPriority;

  return {
    sitemapEnabled: payload.sitemapEnabled !== false,
    sitemapIncludeStaticPages: payload.sitemapIncludeStaticPages !== false,
    sitemapIncludeBlogPosts: payload.sitemapIncludeBlogPosts !== false,
    sitemapDefaultChangefreq: allowedChangefreq.has(changefreq)
      ? changefreq
      : DEFAULT_SEO_SETTINGS.sitemapDefaultChangefreq,
    sitemapDefaultPriority: priority,
    googleAnalyticsEnabled: payload.googleAnalyticsEnabled === true,
    googleAnalyticsMeasurementId: `${payload.googleAnalyticsMeasurementId ?? ""}`.trim(),
    googleSearchConsoleVerification: `${payload.googleSearchConsoleVerification ?? ""}`.trim(),
    googleSearchConsolePropertyUrl:
      `${payload.googleSearchConsolePropertyUrl ?? ""}`.trim() || DEFAULT_SEO_SETTINGS.googleSearchConsolePropertyUrl,
    googleSearchConsoleServiceAccountJson: `${payload.googleSearchConsoleServiceAccountJson ?? ""}`.trim(),
    googleSearchConsoleLastSubmittedAt: `${payload.googleSearchConsoleLastSubmittedAt ?? ""}`.trim(),
  };
};

export const saveSeoSettings = (payload = {}) => {
  const database = getDatabase();
  const settings = normalizeSeoSettingsPayload(payload);
  const timestamp = nowIso();

  database
    .prepare(
      `UPDATE seo_settings
       SET sitemap_enabled = ?,
           sitemap_include_static_pages = ?,
           sitemap_include_blog_posts = ?,
           sitemap_default_changefreq = ?,
           sitemap_default_priority = ?,
           google_analytics_enabled = ?,
           google_analytics_measurement_id = ?,
           google_search_console_verification = ?,
           google_search_console_property_url = ?,
           google_search_console_service_account_json = ?,
           google_search_console_last_submitted_at = ?,
           updated_at = ?
       WHERE id = 1`,
    )
    .run(
      settings.sitemapEnabled ? 1 : 0,
      settings.sitemapIncludeStaticPages ? 1 : 0,
      settings.sitemapIncludeBlogPosts ? 1 : 0,
      settings.sitemapDefaultChangefreq,
      settings.sitemapDefaultPriority,
      settings.googleAnalyticsEnabled ? 1 : 0,
      settings.googleAnalyticsMeasurementId,
      settings.googleSearchConsoleVerification,
      settings.googleSearchConsolePropertyUrl,
      settings.googleSearchConsoleServiceAccountJson,
      settings.googleSearchConsoleLastSubmittedAt,
      timestamp,
    );

  return getSeoSettings();
};

export const markSearchConsoleSitemapSubmitted = (submittedAt = nowIso()) => {
  const database = getDatabase();
  database
    .prepare(
      `UPDATE seo_settings
       SET google_search_console_last_submitted_at = ?,
           updated_at = ?
       WHERE id = 1`,
    )
    .run(submittedAt, nowIso());

  return getSeoSettings();
};

const isEmailLike = (value = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const normalizeSmtpEncryptionForPort = (encryption, port) => {
  if (encryption === "ssl" && Number(port) === 587) return "tls";
  if (encryption === "tls" && Number(port) === 465) return "ssl";
  return encryption;
};

const mapSmtpSettings = (row, { includePassword = false } = {}) => {
  const password = row?.password || DEFAULT_SMTP_SETTINGS.password;
  const port = Number(row?.port || DEFAULT_SMTP_SETTINGS.port);
  const encryption = normalizeSmtpEncryptionForPort(
    row?.encryption || DEFAULT_SMTP_SETTINGS.encryption,
    port,
  );

  return {
    enabled: Boolean(row?.enabled ?? DEFAULT_SMTP_SETTINGS.enabled),
    host: row?.host || DEFAULT_SMTP_SETTINGS.host,
    port,
    encryption,
    username: row?.username || DEFAULT_SMTP_SETTINGS.username,
    password: includePassword ? password : "",
    hasPassword: Boolean(password),
    fromName: row?.from_name || DEFAULT_SMTP_SETTINGS.fromName,
    fromEmail: row?.from_email || DEFAULT_SMTP_SETTINGS.fromEmail,
    toEmail: row?.to_email || DEFAULT_SMTP_SETTINGS.toEmail,
  };
};

export const getSmtpSettings = (options = {}) => {
  const database = getDatabase();
  const row = database.prepare("SELECT * FROM smtp_settings WHERE id = 1").get();
  return mapSmtpSettings(row, options);
};

const normalizeSmtpSettingsPayload = (payload = {}) => {
  const existing = getSmtpSettings({ includePassword: true });
  const encryption = `${payload.encryption ?? existing.encryption ?? DEFAULT_SMTP_SETTINGS.encryption}`.trim().toLowerCase();
  const allowedEncryption = new Set(["tls", "ssl", "none"]);
  const port = Number(payload.port);
  const safePort = Number.isInteger(port) && port > 0 && port <= 65535 ? port : DEFAULT_SMTP_SETTINGS.port;
  const safeEncryption = allowedEncryption.has(encryption) ? encryption : DEFAULT_SMTP_SETTINGS.encryption;
  const passwordInput = `${payload.password ?? ""}`;

  const settings = {
    enabled: payload.enabled === true,
    host: `${payload.host ?? ""}`.trim(),
    port: safePort,
    encryption: normalizeSmtpEncryptionForPort(safeEncryption, safePort),
    username: `${payload.username ?? ""}`.trim(),
    password: passwordInput !== "" ? passwordInput : existing.password,
    fromName: `${payload.fromName ?? DEFAULT_SMTP_SETTINGS.fromName}`.trim() || DEFAULT_SMTP_SETTINGS.fromName,
    fromEmail: `${payload.fromEmail ?? ""}`.trim().toLowerCase(),
    toEmail: `${payload.toEmail ?? ""}`.trim().toLowerCase(),
  };

  if (settings.enabled) {
    if (!settings.host) {
      const error = new Error("SMTP host is required when SMTP sending is enabled.");
      error.statusCode = 422;
      throw error;
    }

    if (!isEmailLike(settings.fromEmail) || !isEmailLike(settings.toEmail)) {
      const error = new Error("Enter valid From and Recipient email addresses.");
      error.statusCode = 422;
      throw error;
    }
  }

  if (settings.fromEmail && !isEmailLike(settings.fromEmail)) {
    const error = new Error("Enter a valid From email address.");
    error.statusCode = 422;
    throw error;
  }

  if (settings.toEmail && !isEmailLike(settings.toEmail)) {
    const error = new Error("Enter a valid contact recipient email address.");
    error.statusCode = 422;
    throw error;
  }

  return settings;
};

export const saveSmtpSettings = (payload = {}) => {
  const database = getDatabase();
  const settings = normalizeSmtpSettingsPayload(payload);
  const timestamp = nowIso();

  database
    .prepare(
      `UPDATE smtp_settings
       SET enabled = ?,
           host = ?,
           port = ?,
           encryption = ?,
           username = ?,
           password = ?,
           from_name = ?,
           from_email = ?,
           to_email = ?,
           updated_at = ?
       WHERE id = 1`,
    )
    .run(
      settings.enabled ? 1 : 0,
      settings.host,
      settings.port,
      settings.encryption,
      settings.username,
      settings.password,
      settings.fromName,
      settings.fromEmail,
      settings.toEmail,
      timestamp,
    );

  return getSmtpSettings();
};

const normalizePricingPlanLinksPayload = (links) => {
  const allowedKeys = new Set(DEFAULT_PRICING_PLANS.map((plan) => plan.planKey));
  const allowedCycles = new Set(PRICING_BILLING_CYCLES);

  return (Array.isArray(links) ? links : [])
    .map((link, index) => {
      const lkrCtaUrl = `${link?.lkrCtaUrl ?? ""}`.trim();
      const usdCtaUrl = `${link?.usdCtaUrl ?? ""}`.trim();
      const legacyCtaUrl = `${link?.ctaUrl ?? ""}`.trim();
      const hasCurrencySpecificLinks = Boolean(lkrCtaUrl || usdCtaUrl);
      const fallbackCtaUrl = hasCurrencySpecificLinks ? usdCtaUrl || lkrCtaUrl : legacyCtaUrl;

      return {
        planKey: `${link?.planKey ?? ""}`.trim().toLowerCase(),
        billingCycle: `${link?.billingCycle ?? ""}`.trim().toLowerCase(),
        planName: `${link?.planName ?? ""}`.trim(),
        lkrPrice: `${link?.lkrPrice ?? ""}`.trim(),
        usdPrice: `${link?.usdPrice ?? ""}`.trim(),
        ctaLabel: `${link?.ctaLabel ?? ""}`.trim(),
        ctaUrl: fallbackCtaUrl,
        lkrCtaUrl: lkrCtaUrl || fallbackCtaUrl,
        usdCtaUrl: usdCtaUrl || fallbackCtaUrl,
        displayOrder: Number.isFinite(Number(link?.displayOrder)) ? Number(link.displayOrder) : index,
      };
    })
    .filter(
      (link) =>
        allowedKeys.has(link.planKey) &&
        allowedCycles.has(link.billingCycle) &&
        link.planName &&
        link.ctaLabel &&
        link.ctaUrl,
    );
};

export const savePricingPlanLinks = (links = []) => {
  const database = getDatabase();
  const normalizedLinks = normalizePricingPlanLinksPayload(links);
  const timestamp = nowIso();

  const save = database.transaction(() => {
    const upsertPlanLink = database.prepare(
      `INSERT INTO pricing_plan_cta_links (
        plan_key, billing_cycle, plan_name, lkr_price, usd_price, cta_label, cta_url, lkr_cta_url, usd_cta_url, display_order, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(plan_key, billing_cycle) DO UPDATE SET
        plan_name = excluded.plan_name,
        lkr_price = excluded.lkr_price,
        usd_price = excluded.usd_price,
        cta_label = excluded.cta_label,
        cta_url = excluded.cta_url,
        lkr_cta_url = excluded.lkr_cta_url,
        usd_cta_url = excluded.usd_cta_url,
        display_order = excluded.display_order,
        updated_at = excluded.updated_at`,
    );

    normalizedLinks.forEach((link, index) => {
      upsertPlanLink.run(
        link.planKey,
        link.billingCycle,
        link.planName,
        link.lkrPrice,
        link.usdPrice,
        link.ctaLabel,
        link.ctaUrl,
        link.lkrCtaUrl,
        link.usdCtaUrl,
        link.displayOrder ?? index,
        timestamp,
        timestamp,
      );
    });
  });

  save();
  return getPricingPlanLinks();
};

const normalizeCustomerLogoPayload = (logos) =>
  (Array.isArray(logos) ? logos : [])
    .map((logo, index) => ({
      name: `${logo?.name ?? ""}`.trim(),
      detail: `${logo?.detail ?? ""}`.trim(),
      imageUrl: normalizeManagedUploadUrl(logo?.imageUrl),
      imageAlt: `${logo?.imageAlt ?? ""}`.trim(),
      isActive: logo?.isActive !== false,
      displayOrder: Number.isFinite(Number(logo?.displayOrder)) ? Number(logo.displayOrder) : index,
    }))
    .filter((logo) => logo.name);

const normalizeTestimonialPayload = (testimonials) =>
  (Array.isArray(testimonials) ? testimonials : [])
    .map((testimonial, index) => ({
      name: `${testimonial?.name ?? ""}`.trim(),
      role: `${testimonial?.role ?? ""}`.trim(),
      text: `${testimonial?.text ?? ""}`.trim(),
      result: `${testimonial?.result ?? ""}`.trim(),
      imageUrl: normalizeManagedUploadUrl(testimonial?.imageUrl),
      imageAlt: `${testimonial?.imageAlt ?? ""}`.trim(),
      rating: Math.min(5, Math.max(1, Number(testimonial?.rating) || 5)),
      isActive: testimonial?.isActive !== false,
      displayOrder: Number.isFinite(Number(testimonial?.displayOrder))
        ? Number(testimonial.displayOrder)
        : index,
    }))
    .filter((testimonial) => testimonial.name && testimonial.text);

export const saveHomepageSocialProof = ({ customerLogos = [], testimonials = [] }) => {
  const database = getDatabase();
  const normalizedLogos = normalizeCustomerLogoPayload(customerLogos);
  const normalizedTestimonials = normalizeTestimonialPayload(testimonials);
  const timestamp = nowIso();

  const save = database.transaction(() => {
    database.prepare("DELETE FROM customer_logos").run();
    database.prepare("DELETE FROM testimonials").run();

    const insertLogo = database.prepare(
      `INSERT INTO customer_logos (
        name, detail, image_url, image_alt, display_order, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    );
    normalizedLogos.forEach((logo, index) => {
      insertLogo.run(
        logo.name,
        logo.detail,
        logo.imageUrl,
        logo.imageAlt || `${logo.name} customer logo`,
        logo.displayOrder ?? index,
        logo.isActive ? 1 : 0,
        timestamp,
        timestamp,
      );
    });

    const insertTestimonial = database.prepare(
      `INSERT INTO testimonials (
        name, role, quote_text, result_text, image_url, image_alt, rating, display_order, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );
    normalizedTestimonials.forEach((testimonial, index) => {
      insertTestimonial.run(
        testimonial.name,
        testimonial.role,
        testimonial.text,
        testimonial.result,
        testimonial.imageUrl,
        testimonial.imageAlt || `${testimonial.name} testimonial image`,
        testimonial.rating,
        testimonial.displayOrder ?? index,
        testimonial.isActive ? 1 : 0,
        timestamp,
        timestamp,
      );
    });
  });

  save();
  return getHomepageSocialProof({ activeOnly: false });
};

const publishScheduledPosts = () => {
  const database = getDatabase();
  const timestamp = nowIso();
  database
    .prepare(
      `UPDATE blog_posts
       SET status = 'published',
           published_at = COALESCE(published_at, publish_date),
           updated_at = ?
       WHERE status = 'scheduled' AND datetime(publish_date) <= datetime(?)`,
    )
    .run(timestamp, timestamp);
};

const getBasePostSelect = () => `
  SELECT
    p.id,
    p.title,
    p.slug,
    p.excerpt,
    p.featured_image,
    p.featured_image_alt,
    p.content,
    p.publish_date,
    p.status,
    p.faq_enabled,
    p.related_post_ids,
    p.related_product_page_urls,
    p.related_feature_page_urls,
    p.created_at,
    p.updated_at,
    p.published_at,
    c.name AS category_name,
    a.name AS author_name,
    seo.seo_title,
    seo.meta_description,
    seo.canonical_url,
    seo.focus_keyword,
    seo.secondary_keywords,
    seo.og_title,
    seo.og_description,
    seo.og_image,
    seo.twitter_title,
    seo.twitter_description,
    seo.twitter_image,
    seo.robots_setting,
    il.primary_money_page_url,
    il.secondary_money_page_url,
    il.related_feature_page_urls AS internal_related_feature_page_urls,
    il.suggested_anchor_texts
  FROM blog_posts p
  INNER JOIN blog_categories c ON c.id = p.category_id
  INNER JOIN authors a ON a.id = p.author_id
  INNER JOIN blog_seo seo ON seo.post_id = p.id
  INNER JOIN blog_internal_links il ON il.post_id = p.id
`;

const mapFaqsByPostId = (postIds) => {
  const database = getDatabase();
  const rows = database
    .prepare(
      `SELECT id, post_id, question, answer
       FROM blog_faqs
       WHERE post_id IN (${postIds.map(() => "?").join(",")})
       ORDER BY position ASC, id ASC`,
    )
    .all(...postIds);

  return rows.reduce((acc, row) => {
    acc[row.post_id] ??= [];
    acc[row.post_id].push({
      id: row.id,
      question: row.question,
      answer: row.answer,
    });
    return acc;
  }, {});
};

const mapTagsByPostId = (postIds) => {
  const database = getDatabase();
  const rows = database
    .prepare(
      `SELECT post_id, name
       FROM blog_tags
       WHERE post_id IN (${postIds.map(() => "?").join(",")})
       ORDER BY id ASC`,
    )
    .all(...postIds);

  return rows.reduce((acc, row) => {
    acc[row.post_id] ??= [];
    acc[row.post_id].push(row.name);
    return acc;
  }, {});
};

const mapPostRecord = (row, faqsByPostId, tagsByPostId) => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt,
  featuredImage: normalizeManagedUploadUrl(row.featured_image),
  featuredImageAlt: row.featured_image_alt,
  content: normalizeEmbeddedUploadUrls(row.content),
  contentHtml: renderStoredBlogContent(row.content),
  category: row.category_name,
  tags: tagsByPostId[row.id] ?? [],
  author: row.author_name,
  publishDate: row.publish_date,
  status: row.status,
  readTime: calculateReadTime(row.content),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  seo: {
    seoTitle: row.seo_title,
    metaDescription: row.meta_description,
    canonicalUrl: row.canonical_url,
    focusKeyword: row.focus_keyword,
    secondaryKeywords: safeJsonParse(row.secondary_keywords, []),
    ogTitle: row.og_title,
    ogDescription: row.og_description,
    ogImage: normalizeManagedUploadUrl(row.og_image),
    twitterTitle: row.twitter_title,
    twitterDescription: row.twitter_description,
    twitterImage: normalizeManagedUploadUrl(row.twitter_image),
    robotsSetting: row.robots_setting,
  },
  faqEnabled: Boolean(row.faq_enabled),
  faqs: faqsByPostId[row.id] ?? [],
  internalLinks: {
    primaryMoneyPageUrl: row.primary_money_page_url,
    secondaryMoneyPageUrl: row.secondary_money_page_url,
    relatedFeaturePageUrls: safeJsonParse(row.internal_related_feature_page_urls, []),
    suggestedAnchorTexts: safeJsonParse(row.suggested_anchor_texts, []),
  },
  relatedPostIds: safeJsonParse(row.related_post_ids, []),
  relatedProductPageUrls: safeJsonParse(row.related_product_page_urls, []),
  relatedFeaturePageUrls: safeJsonParse(row.related_feature_page_urls, []),
});

const summarizePost = (post) => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  featuredImage: post.featuredImage,
  featuredImageAlt: post.featuredImageAlt,
  category: post.category,
  tags: post.tags,
  author: post.author,
  publishDate: post.publishDate,
  status: post.status,
  readTime: post.readTime,
  seoTitle: post.seo.seoTitle,
  metaDescription: post.seo.metaDescription,
});

export const listPublishedBlogPosts = () => {
  publishScheduledPosts();
  const database = getDatabase();
  const rows = database
    .prepare(`${getBasePostSelect()} WHERE p.status = 'published' ORDER BY datetime(p.publish_date) DESC`)
    .all();

  if (rows.length === 0) return [];

  const postIds = rows.map((row) => row.id);
  const faqsByPostId = mapFaqsByPostId(postIds);
  const tagsByPostId = mapTagsByPostId(postIds);

  return rows.map((row) => mapPostRecord(row, faqsByPostId, tagsByPostId));
};

export const listPublishedBlogSummaries = () => listPublishedBlogPosts().map(summarizePost);

export const getPublishedBlogPostBySlug = (slug) => {
  publishScheduledPosts();
  const database = getDatabase();
  const row = database
    .prepare(`${getBasePostSelect()} WHERE p.slug = ? AND p.status = 'published' LIMIT 1`)
    .get(slug);

  if (!row) return null;
  const faqsByPostId = mapFaqsByPostId([row.id]);
  const tagsByPostId = mapTagsByPostId([row.id]);
  return mapPostRecord(row, faqsByPostId, tagsByPostId);
};

export const listAdminBlogPosts = () => {
  publishScheduledPosts();
  const database = getDatabase();
  const rows = database
    .prepare(`${getBasePostSelect()} ORDER BY datetime(p.updated_at) DESC`)
    .all();

  if (rows.length === 0) return [];
  const ids = rows.map((row) => row.id);
  const faqsByPostId = mapFaqsByPostId(ids);
  const tagsByPostId = mapTagsByPostId(ids);
  return rows.map((row) => summarizePost(mapPostRecord(row, faqsByPostId, tagsByPostId)));
};

export const getAdminBlogPostById = (postId) => {
  publishScheduledPosts();
  const database = getDatabase();
  const row = database
    .prepare(`${getBasePostSelect()} WHERE p.id = ? LIMIT 1`)
    .get(postId);

  if (!row) return null;
  const faqsByPostId = mapFaqsByPostId([row.id]);
  const tagsByPostId = mapTagsByPostId([row.id]);
  return mapPostRecord(row, faqsByPostId, tagsByPostId);
};

export const deleteBlogPost = (postId) => {
  const database = getDatabase();
  const normalizedPostId = Number(postId);

  if (!Number.isFinite(normalizedPostId) || normalizedPostId <= 0) return null;

  const deletePost = database.transaction(() => {
    const existingPost = database
      .prepare("SELECT id, title FROM blog_posts WHERE id = ? LIMIT 1")
      .get(normalizedPostId);

    if (!existingPost) return null;

    const postsWithRelations = database
      .prepare("SELECT id, related_post_ids FROM blog_posts WHERE related_post_ids IS NOT NULL")
      .all();

    postsWithRelations.forEach((row) => {
      const relatedPostIds = safeJsonParse(row.related_post_ids, []);
      if (!Array.isArray(relatedPostIds) || !relatedPostIds.includes(normalizedPostId)) return;

      database
        .prepare("UPDATE blog_posts SET related_post_ids = ?, updated_at = ? WHERE id = ?")
        .run(
          arrayToJson(relatedPostIds.filter((relatedId) => Number(relatedId) !== normalizedPostId)),
          nowIso(),
          row.id,
        );
    });

    database.prepare("DELETE FROM blog_posts WHERE id = ?").run(normalizedPostId);
    return { id: existingPost.id, title: existingPost.title };
  });

  return deletePost();
};

export const getAdminOptions = () => {
  const database = getDatabase();
  const categories = database.prepare("SELECT name FROM blog_categories ORDER BY name ASC").all().map((row) => row.name);
  const authors = database.prepare("SELECT name FROM authors ORDER BY name ASC").all().map((row) => row.name);

  return {
    categories,
    authors,
    existingPosts: listAdminBlogPosts().map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      status: post.status,
    })),
    moneyPageSuggestions: [
      { label: "Mobile Shop POS System", url: "/mobile-shop-pos-system" },
      { label: "POS System for Phone Shop", url: "/pos-system-for-phone-shop" },
      { label: "Pricing", url: "/pricing" },
      { label: "Billing Software for Mobile Shop", url: "/billing-software-for-mobile-shop" },
      { label: "IMEI Tracking System", url: "/imei-tracking-pos-system" },
      { label: "Mobile Repair Management Software", url: "/mobile-repair-management-software" },
      { label: "Inventory Management System", url: "/inventory-management-system" },
    ],
    featurePageSuggestions: [
      { label: "Billing Software", url: "/billing-software-for-mobile-shop" },
      { label: "IMEI Tracking", url: "/imei-tracking-pos-system" },
      { label: "Inventory Management", url: "/inventory-management-system" },
      { label: "Repair Management", url: "/mobile-repair-management-software" },
      { label: "Multi-Branch POS", url: "/multi-branch-pos-system" },
      { label: "Cash Drawer Management", url: "/cash-drawer-management" },
      { label: "Customer Loyalty", url: "/customer-loyalty-system" },
    ],
  };
};

export const validateBlogPost = (post, currentPostId = null) => {
  const database = getDatabase();
  const normalizedTitle = `${post.title ?? ""}`.trim();
  const normalizedSlug = slugify(post.slug || post.title || "");
  const metaDescription = `${post?.seo?.metaDescription ?? ""}`.trim();
  const featuredImage = `${post.featuredImage ?? ""}`.trim();
  const featuredImageAlt = `${post.featuredImageAlt ?? ""}`.trim();
  const focusKeyword = `${post?.seo?.focusKeyword ?? ""}`.trim().toLowerCase();
  const firstParagraph = extractFirstParagraph(post.content ?? "").toLowerCase();
  const headings = extractHeadings(post.content ?? "").map((heading) => heading.toLowerCase());
  const contentInternalLinks = getInternalLinkMatches(post.content ?? "");
  const linkSet = new Set([
    ...contentInternalLinks,
    `${post?.internalLinks?.primaryMoneyPageUrl ?? ""}`.trim(),
    `${post?.internalLinks?.secondaryMoneyPageUrl ?? ""}`.trim(),
    ...normalizeStringArray(post?.relatedProductPageUrls),
    ...normalizeStringArray(post?.relatedFeaturePageUrls),
    ...normalizeStringArray(post?.internalLinks?.relatedFeaturePageUrls),
  ].filter(Boolean));
  const moneyPageLinks = [...linkSet].filter((url) => MONEY_PAGE_URLS.has(url));

  const existingSlugRow = database
    .prepare("SELECT id FROM blog_posts WHERE slug = ? LIMIT 1")
    .get(normalizedSlug);

  const checks = [
    {
      key: "title",
      label: "Title present",
      status: normalizedTitle ? "pass" : "error",
      detail: normalizedTitle ? "Title is ready." : "Add a blog post title before publishing.",
    },
    {
      key: "slug",
      label: "Slug unique",
      status:
        normalizedSlug && (!existingSlugRow || Number(existingSlugRow.id) === Number(currentPostId))
          ? "pass"
          : "error",
      detail:
        normalizedSlug && (!existingSlugRow || Number(existingSlugRow.id) === Number(currentPostId))
          ? "Slug is unique."
          : "Choose a unique slug before publishing.",
    },
    {
      key: "meta-description",
      label: "Meta description length",
      status:
        metaDescription.length >= 140 && metaDescription.length <= 160
          ? "pass"
          : metaDescription.length > 0
            ? "warning"
            : "error",
      detail:
        metaDescription.length >= 140 && metaDescription.length <= 160
          ? "Meta description is in the recommended range."
          : metaDescription.length > 0
            ? `Meta description is ${metaDescription.length} characters. Aim for 140–160 characters.`
            : "Add a meta description before publishing.",
    },
    {
      key: "featured-image",
      label: "Featured image exists",
      status: featuredImage ? "pass" : "error",
      detail: featuredImage ? "Featured image is set." : "Add a featured image URL.",
    },
    {
      key: "featured-image-alt",
      label: "Featured image alt text exists",
      status: featuredImageAlt ? "pass" : "error",
      detail: featuredImageAlt ? "Featured image alt text is present." : "Add alt text for the featured image.",
    },
    {
      key: "focus-keyword",
      label: "Focus keyword exists",
      status: focusKeyword ? "pass" : "error",
      detail: focusKeyword ? "Focus keyword is set." : "Add a focus keyword for SEO targeting.",
    },
    {
      key: "keyword-title",
      label: "Focus keyword in title",
      status: focusKeyword && normalizedTitle.toLowerCase().includes(focusKeyword) ? "pass" : "error",
      detail:
        focusKeyword && normalizedTitle.toLowerCase().includes(focusKeyword)
          ? "Focus keyword is present in the title."
          : "Include the focus keyword in the title.",
    },
    {
      key: "keyword-paragraph",
      label: "Focus keyword in first paragraph",
      status: focusKeyword && firstParagraph.includes(focusKeyword) ? "pass" : "error",
      detail:
        focusKeyword && firstParagraph.includes(focusKeyword)
          ? "Focus keyword appears in the first paragraph."
          : "Include the focus keyword in the first paragraph.",
    },
    {
      key: "keyword-heading",
      label: "Focus keyword in a heading",
      status: focusKeyword && headings.some((heading) => heading.includes(focusKeyword)) ? "pass" : "error",
      detail:
        focusKeyword && headings.some((heading) => heading.includes(focusKeyword))
          ? "Focus keyword appears in at least one heading."
          : "Add the focus keyword to at least one heading.",
    },
    {
      key: "internal-links",
      label: "Minimum 2 internal links",
      status: linkSet.size >= 2 ? "pass" : "error",
      detail:
        linkSet.size >= 2
          ? `Found ${linkSet.size} internal links.`
          : "Add at least 2 internal links to related pages.",
    },
    {
      key: "money-page-link",
      label: "At least 1 key money page link",
      status: moneyPageLinks.length >= 1 ? "pass" : "error",
      detail:
        moneyPageLinks.length >= 1
          ? "At least one link to a key money page is included."
          : "Add at least one link to a key money page such as the main POS or pricing page.",
    },
  ];

  return formatValidationResult(checks);
};

const normalizePostPayload = (payload) => {
  const title = `${payload.title ?? ""}`.trim();
  const slug = slugify(payload.slug || title);
  const excerpt = `${payload.excerpt ?? ""}`.trim();
  const featuredImage = normalizeManagedUploadUrl(payload.featuredImage) || "/og-home.jpg";
  const featuredImageAlt = `${payload.featuredImageAlt ?? ""}`.trim();
  const content = `${payload.content ?? ""}`.trim();
  const category = `${payload.category ?? ""}`.trim();
  const author = `${payload.author ?? ""}`.trim();
  const status = ["draft", "scheduled", "published"].includes(payload.status) ? payload.status : "draft";
  const publishDate = payload.publishDate ? new Date(payload.publishDate).toISOString() : nowIso();
  const relatedPostIds = (Array.isArray(payload.relatedPostIds) ? payload.relatedPostIds : [])
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);
  const relatedProductPageUrls = normalizeStringArray(payload.relatedProductPageUrls);
  const relatedFeaturePageUrls = normalizeStringArray(payload.relatedFeaturePageUrls);
  const tags = normalizeStringArray(payload.tags);
  const seo = {
    seoTitle: `${payload?.seo?.seoTitle ?? title}`.trim() || title,
    metaDescription: `${payload?.seo?.metaDescription ?? excerpt}`.trim() || excerpt,
    canonicalUrl: ensureAbsoluteUrl(payload?.seo?.canonicalUrl || `/blog/${slug}`),
    focusKeyword: `${payload?.seo?.focusKeyword ?? title}`.trim(),
    secondaryKeywords: normalizeStringArray(payload?.seo?.secondaryKeywords),
    ogTitle: `${payload?.seo?.ogTitle ?? title}`.trim() || title,
    ogDescription: `${payload?.seo?.ogDescription ?? excerpt}`.trim() || excerpt,
    ogImage: ensureAbsoluteUrl(payload?.seo?.ogImage || featuredImage),
    twitterTitle: `${payload?.seo?.twitterTitle ?? title}`.trim() || title,
    twitterDescription: `${payload?.seo?.twitterDescription ?? excerpt}`.trim() || excerpt,
    twitterImage: ensureAbsoluteUrl(payload?.seo?.twitterImage || payload?.seo?.ogImage || featuredImage),
    robotsSetting: `${payload?.seo?.robotsSetting ?? "index,follow"}`.trim() || "index,follow",
  };
  const faqEnabled = Boolean(payload.faqEnabled);
  const faqs = faqEnabled ? normalizeFaqItems(payload.faqs) : [];
  const internalLinks = {
    primaryMoneyPageUrl: `${payload?.internalLinks?.primaryMoneyPageUrl ?? "/mobile-shop-pos-system"}`.trim(),
    secondaryMoneyPageUrl: `${payload?.internalLinks?.secondaryMoneyPageUrl ?? "/pos-system-for-phone-shop"}`.trim(),
    relatedFeaturePageUrls: normalizeStringArray(payload?.internalLinks?.relatedFeaturePageUrls),
    suggestedAnchorTexts: normalizeStringArray(payload?.internalLinks?.suggestedAnchorTexts),
  };

  return {
    title,
    slug,
    excerpt,
    featuredImage,
    featuredImageAlt,
    content,
    category,
    tags,
    author,
    publishDate,
    status,
    seo,
    faqEnabled,
    faqs,
    internalLinks,
    relatedPostIds,
    relatedProductPageUrls,
    relatedFeaturePageUrls,
  };
};

export const saveBlogPost = (payload, currentPostId = null) => {
  const database = getDatabase();
  const post = normalizePostPayload(payload);
  const validation = validateBlogPost(post, currentPostId);
  if ((post.status === "published" || post.status === "scheduled") && !validation.canPublish) {
    const error = new Error("This post does not pass the publish checklist yet.");
    error.statusCode = 422;
    throw error;
  }
  const timestamp = nowIso();
  const categoryId = upsertCategory(post.category || "Tips & Guides");
  const authorId = upsertAuthor(post.author || "Cellivo Team");
  const publishDate = post.publishDate || timestamp;
  const shouldSetPublishedAt = post.status === "published";

  const save = database.transaction(() => {
    let postId = Number(currentPostId);

    if (postId) {
      database
        .prepare(
          `UPDATE blog_posts
           SET title = ?, slug = ?, excerpt = ?, featured_image = ?, featured_image_alt = ?,
               content = ?, category_id = ?, author_id = ?, publish_date = ?, status = ?, faq_enabled = ?,
               related_post_ids = ?, related_product_page_urls = ?, related_feature_page_urls = ?,
               updated_at = ?, published_at = CASE
                 WHEN ? = 'published' THEN COALESCE(published_at, ?)
                 ELSE published_at
               END
           WHERE id = ?`,
        )
        .run(
          post.title,
          post.slug,
          post.excerpt,
          post.featuredImage,
          post.featuredImageAlt,
          post.content,
          categoryId,
          authorId,
          publishDate,
          post.status,
          post.faqEnabled ? 1 : 0,
          arrayToJson(post.relatedPostIds),
          arrayToJson(post.relatedProductPageUrls),
          arrayToJson(post.relatedFeaturePageUrls),
          timestamp,
          post.status,
          publishDate,
          postId,
        );

      database
        .prepare(
          `UPDATE blog_seo
           SET seo_title = ?, meta_description = ?, canonical_url = ?, focus_keyword = ?,
               secondary_keywords = ?, og_title = ?, og_description = ?, og_image = ?,
               twitter_title = ?, twitter_description = ?, twitter_image = ?, robots_setting = ?
           WHERE post_id = ?`,
        )
        .run(
          post.seo.seoTitle,
          post.seo.metaDescription,
          post.seo.canonicalUrl,
          post.seo.focusKeyword,
          arrayToJson(post.seo.secondaryKeywords),
          post.seo.ogTitle,
          post.seo.ogDescription,
          post.seo.ogImage,
          post.seo.twitterTitle,
          post.seo.twitterDescription,
          post.seo.twitterImage,
          post.seo.robotsSetting,
          postId,
        );

      database
        .prepare(
          `UPDATE blog_internal_links
           SET primary_money_page_url = ?, secondary_money_page_url = ?,
               related_feature_page_urls = ?, suggested_anchor_texts = ?
           WHERE post_id = ?`,
        )
        .run(
          post.internalLinks.primaryMoneyPageUrl,
          post.internalLinks.secondaryMoneyPageUrl,
          arrayToJson(post.internalLinks.relatedFeaturePageUrls),
          arrayToJson(post.internalLinks.suggestedAnchorTexts),
          postId,
        );

      database.prepare("DELETE FROM blog_faqs WHERE post_id = ?").run(postId);
      database.prepare("DELETE FROM blog_tags WHERE post_id = ?").run(postId);
    } else {
      const postResult = database
        .prepare(
          `INSERT INTO blog_posts (
            title, slug, excerpt, featured_image, featured_image_alt, content,
            category_id, author_id, publish_date, status, faq_enabled, related_post_ids,
            related_product_page_urls, related_feature_page_urls, created_at, updated_at, published_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .run(
          post.title,
          post.slug,
          post.excerpt,
          post.featuredImage,
          post.featuredImageAlt,
          post.content,
          categoryId,
          authorId,
          publishDate,
          post.status,
          post.faqEnabled ? 1 : 0,
          arrayToJson(post.relatedPostIds),
          arrayToJson(post.relatedProductPageUrls),
          arrayToJson(post.relatedFeaturePageUrls),
          timestamp,
          timestamp,
          shouldSetPublishedAt ? publishDate : null,
        );

      postId = Number(postResult.lastInsertRowid);

      database
        .prepare(
          `INSERT INTO blog_seo (
            post_id, seo_title, meta_description, canonical_url, focus_keyword,
            secondary_keywords, og_title, og_description, og_image,
            twitter_title, twitter_description, twitter_image, robots_setting
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .run(
          postId,
          post.seo.seoTitle,
          post.seo.metaDescription,
          post.seo.canonicalUrl,
          post.seo.focusKeyword,
          arrayToJson(post.seo.secondaryKeywords),
          post.seo.ogTitle,
          post.seo.ogDescription,
          post.seo.ogImage,
          post.seo.twitterTitle,
          post.seo.twitterDescription,
          post.seo.twitterImage,
          post.seo.robotsSetting,
        );

      database
        .prepare(
          `INSERT INTO blog_internal_links (
            post_id, primary_money_page_url, secondary_money_page_url,
            related_feature_page_urls, suggested_anchor_texts
          ) VALUES (?, ?, ?, ?, ?)`,
        )
        .run(
          postId,
          post.internalLinks.primaryMoneyPageUrl,
          post.internalLinks.secondaryMoneyPageUrl,
          arrayToJson(post.internalLinks.relatedFeaturePageUrls),
          arrayToJson(post.internalLinks.suggestedAnchorTexts),
        );
    }

    post.faqs.forEach((faq, index) => {
      database
        .prepare("INSERT INTO blog_faqs (post_id, position, question, answer) VALUES (?, ?, ?, ?)")
        .run(postId, index, faq.question, faq.answer);
    });

    post.tags.forEach((tag) => {
      database
        .prepare("INSERT INTO blog_tags (post_id, name, slug) VALUES (?, ?, ?)")
        .run(postId, tag, slugify(tag));
    });

    return getAdminBlogPostById(postId);
  });

  const savedPost = save();
  return {
    post: savedPost,
    validation,
  };
};

export const getPublishedBlogCategories = () => {
  const posts = listPublishedBlogSummaries();
  return ["All", ...Array.from(new Set(posts.map((post) => post.category)))];
};

export const getBlogSitemapEntries = () =>
  listPublishedBlogPosts().map((post) => ({
    path: `/blog/${post.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: post.updatedAt.slice(0, 10),
  }));

export const getAdminDashboardData = () => {
  publishScheduledPosts();
  const database = getDatabase();
  const counts = database
    .prepare(
      `SELECT
         COUNT(*) AS total_posts,
         SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) AS draft_posts,
         SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) AS scheduled_posts,
         SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) AS published_posts
       FROM blog_posts`,
    )
    .get();

  return {
    stats: {
      totalPosts: counts?.total_posts ?? 0,
      draftPosts: counts?.draft_posts ?? 0,
      scheduledPosts: counts?.scheduled_posts ?? 0,
      publishedPosts: counts?.published_posts ?? 0,
    },
    recentPosts: listAdminBlogPosts().slice(0, 6),
    socialProof: getHomepageSocialProof({ activeOnly: false }),
    pricingPlanLinks: getPricingPlanLinks(),
    smtpSettings: getSmtpSettings(),
  };
};

export const initBlogDatabase = () => {
  getDatabase();
  publishScheduledPosts();
};
