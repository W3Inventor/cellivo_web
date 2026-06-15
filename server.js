import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { createSign } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import express from "express";
import compression from "compression";
import geoip from "geoip-lite";
import multer from "multer";
import nodemailer from "nodemailer";
import { legacyRedirects, SITE_URL, sitemapEntries } from "./seo.config.js";
import {
  ADMIN_SESSION_COOKIE_NAME,
  authenticateAdminUser,
  changeAdminPassword,
  deleteBlogPost,
  getAdminDashboardData,
  getAdminBlogPostById,
  getAdminOptions,
  getAdminSessionByToken,
  getBlogSitemapEntries,
  getHomepageSocialProof,
  getPricingPlanLinks,
  getPublishedBlogCategories,
  getPublishedBlogPostBySlug,
  getSeoSettings,
  getSmtpSettings,
  invalidateAdminSession,
  initBlogDatabase,
  listAdminBlogPosts,
  listPublishedBlogSummaries,
  markSearchConsoleSitemapSubmitted,
  saveHomepageSocialProof,
  savePricingPlanLinks,
  saveSeoSettings,
  saveSmtpSettings,
  saveBlogPost,
  validateBlogPost,
} from "./blog-db.js";

const isProduction = process.env.NODE_ENV === "production";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (filePath) => path.resolve(__dirname, filePath);
const uploadsDir = resolve("data/uploads");
const canonicalSiteUrl = new URL(process.env.SITE_URL || SITE_URL);
const enforceCanonicalUrl = isProduction && process.env.ENFORCE_CANONICAL_URL === "true";

const app = express();
const ADMIN_LOGIN_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const ADMIN_LOGIN_RATE_LIMIT_MAX_ATTEMPTS = 5;
const adminLoginAttempts = new Map();

const getForwardedHeaderValue = (value = "") =>
  `${value}`.split(",")[0].trim();

const getRequestProtocol = (req) =>
  getForwardedHeaderValue(req.headers["x-forwarded-proto"]).toLowerCase() || (req.secure ? "https" : "http");

const getCanonicalRedirectUrl = (req) => {
  if (!enforceCanonicalUrl || !["GET", "HEAD"].includes(req.method)) {
    return null;
  }

  const requestHost = getForwardedHeaderValue(req.headers["x-forwarded-host"] || req.headers.host).toLowerCase();
  const canonicalHost = canonicalSiteUrl.host.toLowerCase();
  const requestProtocol = getRequestProtocol(req);
  const canonicalProtocol = canonicalSiteUrl.protocol.replace(":", "");

  if (requestHost === canonicalHost && requestProtocol === canonicalProtocol) {
    return null;
  }

  return new URL(req.originalUrl, canonicalSiteUrl).toString();
};

initBlogDatabase();
fsSync.mkdirSync(uploadsDir, { recursive: true });
app.use(compression({ threshold: 1024 }));
app.use(express.json({ limit: "4mb" }));
app.use((req, res, next) => {
  const canonicalRedirectUrl = getCanonicalRedirectUrl(req);

  if (canonicalRedirectUrl) {
    res.redirect(301, canonicalRedirectUrl);
    return;
  }

  next();
});
app.use(
  "/uploads",
  express.static(uploadsDir, {
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    },
  }),
);
app.use((req, res, next) => {
  res.cookie = (name, value, options = {}) => {
    const segments = [`${name}=${encodeURIComponent(value)}`];
    if (options.httpOnly) segments.push("HttpOnly");
    if (options.sameSite) segments.push(`SameSite=${options.sameSite}`);
    if (options.secure) segments.push("Secure");
    if (options.path) segments.push(`Path=${options.path}`);
    if (options.domain) segments.push(`Domain=${options.domain}`);
    if (options.expires) segments.push(`Expires=${options.expires.toUTCString()}`);
    if (typeof options.maxAge === "number") segments.push(`Max-Age=${Math.max(0, Math.floor(options.maxAge / 1000))}`);
    if (options.priority) segments.push(`Priority=${options.priority}`);
    res.append("Set-Cookie", segments.join("; "));
  };
  next();
});

app.use((req, res, next) => {
  if (req.path.startsWith("/admin") || req.path.startsWith("/api/admin")) {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "same-origin");
  }

  next();
});

const normalizePathname = (pathname) => {
  if (!pathname || pathname === "/") return "/";

  const lowerCased = pathname.toLowerCase();
  const withoutTrailingSlash =
    lowerCased.length > 1 && lowerCased.endsWith("/") ? lowerCased.slice(0, -1) : lowerCased;

  return withoutTrailingSlash || "/";
};

const buildAbsoluteUrl = (pathname, baseUrl) =>
  new URL(pathname, `${baseUrl.replace(/\/$/, "")}/`).toString();

const escapeHtmlAttribute = (value = "") =>
  `${value}`
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeHtml = escapeHtmlAttribute;

const sanitizeText = (value = "", maxLength = 1000) =>
  `${value}`
    .replace(/\r/g, "")
    .trim()
    .slice(0, maxLength);

const isValidEmail = (value = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const CONTACT_RECIPIENT_EMAIL = "hello@cellivo.com";
const SRI_LANKA_COUNTRY_CODE = "LK";

const getConfiguredSmtpTransport = () => {
  const settings = getSmtpSettings({ includePassword: true });

  if (!settings.enabled || !settings.host) {
    const error = new Error("SMTP is not configured yet. Add SMTP settings in the admin dashboard.");
    error.statusCode = 503;
    throw error;
  }

  const transport = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.encryption === "ssl",
    requireTLS: settings.encryption === "tls",
    auth: settings.username
      ? {
          user: settings.username,
          pass: settings.password,
        }
      : undefined,
  });

  return { settings, transport };
};

const sendEmailWithConfiguredSmtp = async ({ to, replyTo, subject, text }) => {
  const { settings, transport } = getConfiguredSmtpTransport();
  await transport.sendMail({
    to: to || settings.toEmail,
    from: {
      name: settings.fromName,
      address: settings.fromEmail,
    },
    replyTo,
    subject,
    text,
  });
};

const base64url = (value) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const parseCookies = (cookieHeader = "") =>
  cookieHeader
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .reduce((acc, part) => {
      const [key, ...rest] = part.split("=");
      if (!key) return acc;
      acc[key] = decodeURIComponent(rest.join("="));
      return acc;
    }, {});

const getAdminSessionFromRequest = (req) => {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[ADMIN_SESSION_COOKIE_NAME];
  if (!token) return null;
  return getAdminSessionByToken(token);
};

const normalizeCountryCode = (value = "") => {
  const normalized = `${value}`.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(normalized) ? normalized : "";
};

const getRequestIp = (req) => {
  const forwardedIp =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.ip ||
    req.socket?.remoteAddress ||
    "";

  return getForwardedHeaderValue(forwardedIp).replace(/^::ffff:/, "").trim();
};

const getRequestCountryCode = (req) => {
  const headerCountryCode = normalizeCountryCode(
    req.headers["cf-ipcountry"] ||
      req.headers["x-vercel-ip-country"] ||
      req.headers["cloudfront-viewer-country"] ||
      req.headers["x-country-code"] ||
      "",
  );

  if (headerCountryCode && headerCountryCode !== "XX" && headerCountryCode !== "ZZ") {
    return headerCountryCode;
  }

  const requestIp = getRequestIp(req);
  if (!requestIp || requestIp === "127.0.0.1" || requestIp === "::1") {
    return "";
  }

  const geo = geoip.lookup(requestIp);
  return normalizeCountryCode(geo?.country || "");
};

const getPreferredPricingCurrency = (countryCode = "") =>
  normalizeCountryCode(countryCode) === SRI_LANKA_COUNTRY_CODE ? "LKR" : "USD";

const shouldUseSecureCookie = (req) =>
  Boolean(req.secure || req.headers["x-forwarded-proto"] === "https");

const setAdminSessionCookie = (req, res, token, expiresAt) => {
  const maxAge = Math.max(0, new Date(expiresAt).getTime() - Date.now());

  res.cookie(ADMIN_SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: shouldUseSecureCookie(req),
    path: "/",
    expires: new Date(expiresAt),
    maxAge,
    priority: "High",
  });
};

const clearAdminSessionCookie = (req, res) => {
  res.cookie(ADMIN_SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: shouldUseSecureCookie(req),
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
};

const getClientIp = (req) => {
  const forwardedFor = `${req.headers["x-forwarded-for"] || ""}`.split(",")[0].trim();
  return forwardedFor || req.socket.remoteAddress || "unknown";
};

const getAdminLoginRateLimitKey = (req, email) =>
  `${getClientIp(req)}:${`${email ?? ""}`.trim().toLowerCase() || "unknown"}`;

const getAdminLoginRateLimit = (req, email) => {
  const key = getAdminLoginRateLimitKey(req, email);
  const now = Date.now();
  const existing = adminLoginAttempts.get(key);

  if (!existing || existing.resetAt <= now) {
    adminLoginAttempts.delete(key);
    return { key, blocked: false, retryAfterSeconds: 0 };
  }

  return {
    key,
    blocked: existing.count >= ADMIN_LOGIN_RATE_LIMIT_MAX_ATTEMPTS,
    retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
  };
};

const recordAdminLoginFailure = (key) => {
  const now = Date.now();
  const existing = adminLoginAttempts.get(key);

  if (!existing || existing.resetAt <= now) {
    adminLoginAttempts.set(key, {
      count: 1,
      resetAt: now + ADMIN_LOGIN_RATE_LIMIT_WINDOW_MS,
    });
    return;
  }

  adminLoginAttempts.set(key, {
    count: existing.count + 1,
    resetAt: existing.resetAt,
  });
};


const sanitizeUploadFolder = (value = "general") =>
  `${value}`.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40) || "general";

const uploadStorage = multer.diskStorage({
  destination: (req, _file, callback) => {
    const folder = sanitizeUploadFolder(req.query.folder);
    const destination = path.join(uploadsDir, folder);
    fsSync.mkdirSync(destination, { recursive: true });
    callback(null, destination);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname || "").toLowerCase() || ".bin";
    const safeBase = path
      .basename(file.originalname || "upload", extension)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 50) || "upload";
    callback(null, `${Date.now()}-${safeBase}${extension}`);
  },
});

const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype?.startsWith("image/")) {
      callback(null, true);
      return;
    }
    callback(new Error("Only image uploads are allowed."));
  },
});

const getRequestBaseUrl = (req) => {
  const protocol = req.headers["x-forwarded-proto"] || (req.secure ? "https" : "http");
  const host = req.headers.host || "localhost:8080";
  return `${protocol}://${host}`;
};

const requireAdminAuth = (req, res, next) => {
  const cookies = parseCookies(req.headers.cookie);
  const adminSession = getAdminSessionFromRequest(req);

  if (!adminSession) {
    const hadAdminCookie = Boolean(cookies[ADMIN_SESSION_COOKIE_NAME]);

    if (hadAdminCookie) {
      clearAdminSessionCookie(req, res);
    }

    res.status(401).json({
      message: hadAdminCookie
        ? "Your admin session expired. Please sign in again."
        : "Admin authentication required.",
    });
    return;
  }

  req.adminSession = adminSession;
  next();
};

const createSitemapXml = (baseUrl, settings = getSeoSettings()) => {
  if (!settings.sitemapEnabled) return null;

  const staticEntries = settings.sitemapIncludeStaticPages ? sitemapEntries : [];
  const blogEntries = settings.sitemapIncludeBlogPosts
    ? getBlogSitemapEntries().map((entry) => ({
        ...entry,
        changefreq: settings.sitemapDefaultChangefreq || entry.changefreq,
        priority: settings.sitemapDefaultPriority || entry.priority,
      }))
    : [];
  const combinedEntries = [...staticEntries, ...blogEntries]
    .reduce((acc, entry) => {
      acc.set(entry.path, entry);
      return acc;
    }, new Map())
    .values();

  const urls = [...combinedEntries]
    .map(
      ({ path: routePath, changefreq, priority, lastmod: entryLastmod }) => `
  <url>
    <loc>${buildAbsoluteUrl(routePath, baseUrl)}</loc>
${entryLastmod ? `    <lastmod>${entryLastmod}</lastmod>
` : ""}    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
};

const createSeoIntegrationHeadTags = () => {
  const settings = getSeoSettings();
  const tags = [];
  const verification = settings.googleSearchConsoleVerification?.trim();
  const measurementId = settings.googleAnalyticsMeasurementId?.trim();

  if (verification) {
    tags.push(`<meta name="google-site-verification" content="${escapeHtmlAttribute(verification)}">`);
  }

  if (settings.googleAnalyticsEnabled && measurementId) {
    const encodedMeasurementId = encodeURIComponent(measurementId);
    const analyticsSrc = `https://www.googletagmanager.com/gtag/js?id=${encodedMeasurementId}`;
    tags.push(
      `<script>(function(){window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};function loadGtag(){if(window.__cellivoGtagLoaded)return;window.__cellivoGtagLoaded=true;var script=document.createElement("script");script.async=true;script.src=${JSON.stringify(analyticsSrc)};document.head.appendChild(script);window.gtag("js",new Date());window.gtag("config",${JSON.stringify(measurementId)});}window.addEventListener("load",function(){window.setTimeout(loadGtag,5000);},{once:true});["pointerdown","keydown","touchstart"].forEach(function(eventName){window.addEventListener(eventName,loadGtag,{once:true,passive:true});});})();</script>`,
    );
  }

  return tags.length ? `\n${tags.join("\n")}` : "";
};

const getGoogleAccessTokenFromServiceAccount = async (serviceAccountJson) => {
  let credentials;
  try {
    credentials = JSON.parse(serviceAccountJson);
  } catch {
    const error = new Error("The Google service account JSON is invalid.");
    error.statusCode = 422;
    throw error;
  }

  if (!credentials.client_email || !credentials.private_key) {
    const error = new Error("Service account JSON must include client_email and private_key.");
    error.statusCode = 422;
    throw error;
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: credentials.client_email,
      scope: "https://www.googleapis.com/auth/webmasters",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsignedJwt = `${header}.${claim}`;
  const signature = createSign("RSA-SHA256")
    .update(unsignedJwt)
    .sign(credentials.private_key, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const assertion = `${unsignedJwt}.${signature}`;

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const tokenData = await tokenResponse.json().catch(() => ({}));
  if (!tokenResponse.ok || !tokenData.access_token) {
    const error = new Error(tokenData.error_description || "Unable to authenticate with Google Search Console.");
    error.statusCode = tokenResponse.status || 502;
    throw error;
  }

  return tokenData.access_token;
};

const submitSitemapToGoogleSearchConsole = async () => {
  const settings = getSeoSettings();

  if (!settings.googleSearchConsoleServiceAccountJson) {
    const error = new Error("Add Google Search Console service account JSON before submitting the sitemap.");
    error.statusCode = 422;
    throw error;
  }

  const siteUrl = settings.googleSearchConsolePropertyUrl || SITE_URL;
  const sitemapUrl = buildAbsoluteUrl("/sitemap.xml", process.env.SITE_URL || SITE_URL);
  const accessToken = await getGoogleAccessTokenFromServiceAccount(settings.googleSearchConsoleServiceAccountJson);
  const apiUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    const error = new Error(body || "Google Search Console rejected the sitemap submission.");
    error.statusCode = response.status;
    throw error;
  }

  return markSearchConsoleSitemapSubmitted(new Date().toISOString());
};

const buildRouteInitialData = (requestUrl, adminSession = null, requestContext = {}) => {
  const pathname = normalizePathname(new URL(requestUrl, SITE_URL).pathname);

  if (pathname === "/blog") {
    return {
      data: {
        blogIndex: {
          posts: listPublishedBlogSummaries(),
          categories: getPublishedBlogCategories(),
        },
      },
      statusCode: 200,
    };
  }

  if (pathname === "/") {
    return {
      data: {
        homepageSocialProof: getHomepageSocialProof(),
      },
      statusCode: 200,
    };
  }

  if (pathname === "/pricing") {
    return {
      data: {
        pricingPlanLinks: getPricingPlanLinks(),
        preferredPricingCurrency: requestContext.preferredPricingCurrency || "USD",
        pricingVisitorCountryCode: requestContext.countryCode || "",
      },
      statusCode: 200,
    };
  }

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace(/^\/blog\//, "");
    const post = getPublishedBlogPostBySlug(slug);

    return {
      data: {
        blogPost: post,
      },
      statusCode: post ? 200 : 404,
    };
  }

  if (pathname.startsWith("/admin/blog/preview/")) {
    const id = Number(pathname.replace(/^\/admin\/blog\/preview\//, ""));
    const post = Number.isFinite(id) ? getAdminBlogPostById(id) : null;

    return {
      data: {
        adminSession: adminSession?.user ?? null,
        adminPreviewPost: post,
      },
      statusCode: post ? 200 : 404,
    };
  }

  if (pathname === "/admin/blog") {
    return {
      data: {
        adminSession: adminSession?.user ?? null,
        adminBlog: {
          options: getAdminOptions(),
          posts: listAdminBlogPosts(),
        },
      },
      statusCode: 200,
    };
  }

  if (pathname === "/admin/customer-logos" || pathname === "/admin/testimonials") {
    return {
      data: {
        adminSession: adminSession?.user ?? null,
        adminSocialProof: getHomepageSocialProof({ activeOnly: false }),
      },
      statusCode: 200,
    };
  }

  if (pathname === "/admin/pricing-links") {
    return {
      data: {
        adminSession: adminSession?.user ?? null,
        adminPricingPlanLinks: getPricingPlanLinks(),
      },
      statusCode: 200,
    };
  }

  if (pathname === "/admin/settings" || pathname === "/admin/seo-settings") {
    return {
      data: {
        adminSession: adminSession?.user ?? null,
        adminSeoSettings: getSeoSettings(),
        adminSmtpSettings: getSmtpSettings(),
      },
      statusCode: 200,
    };
  }

  if (pathname === "/admin/posts") {
    return {
      data: {
        adminSession: adminSession?.user ?? null,
        adminBlog: {
          options: getAdminOptions(),
          posts: listAdminBlogPosts(),
        },
      },
      statusCode: 200,
    };
  }

  if (pathname === "/admin") {
    return {
      data: {
        adminSession: adminSession?.user ?? null,
        adminDashboard: getAdminDashboardData(),
      },
      statusCode: 200,
    };
  }

  return {
    data: {},
  };
};

const buildInitialData = (requestUrl, adminSession = null, requestContext = {}) => {
  const result = buildRouteInitialData(requestUrl, adminSession, requestContext);
  const pricingVisitorCountryCode = normalizeCountryCode(requestContext.countryCode || "");
  const preferredPricingCurrency =
    requestContext.preferredPricingCurrency || getPreferredPricingCurrency(pricingVisitorCountryCode);

  return {
    ...result,
    data: {
      ...(result.data || {}),
      preferredPricingCurrency,
      pricingVisitorCountryCode,
    },
  };
};

const serializeInitialData = (data) =>
  JSON.stringify(data ?? {}).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");

const injectDevelopmentStylesheet = (template) =>
  template.replace("<!--head-tags-->", '<link rel="stylesheet" href="/src/index.css" />\n    <!--head-tags-->');

let vite;
let viteReadyPromise;
let productionTemplatePromise;
let productionRenderPromise;

if (isProduction) {
  productionTemplatePromise = fs.readFile(resolve("dist/client/index.html"), "utf-8");
  productionRenderPromise = import(pathToFileURL(resolve("dist/server/entry-server.js")).href).then(
    ({ render }) => render,
  );

  app.use(
    express.static(resolve("dist/client"), {
      index: false,
      setHeaders: (res, filePath) => {
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          return;
        }

        res.setHeader("Cache-Control", "public, max-age=3600");
      },
    }),
  );
} else {
  const ensureViteServer = async () => {
    if (!viteReadyPromise) {
      viteReadyPromise = import("vite").then(async ({ createServer }) => {
        vite = await createServer({
          appType: "custom",
          root: __dirname,
          server: {
            middlewareMode: true,
          },
        });

        return vite;
      });
    }

    return viteReadyPromise;
  };

  app.use(async (req, res, next) => {
    try {
      const viteServer = await ensureViteServer();
      viteServer.middlewares(req, res, next);
    } catch (error) {
      next(error);
    }
  });
}

app.use((req, res, next) => {
  if (!["GET", "HEAD"].includes(req.method)) {
    next();
    return;
  }

  const requestUrl = new URL(`${SITE_URL}${req.originalUrl}`);
  const normalizedPathname = normalizePathname(requestUrl.pathname);
  const redirectTarget = legacyRedirects[normalizedPathname];

  if (redirectTarget) {
    res.redirect(301, `${redirectTarget}${requestUrl.search}`);
    return;
  }

  if (requestUrl.pathname !== normalizedPathname) {
    res.redirect(301, `${normalizedPathname}${requestUrl.search}`);
    return;
  }

  if (normalizedPathname.startsWith("/admin")) {
    const cookies = parseCookies(req.headers.cookie);
    const hadAdminCookie = Boolean(cookies[ADMIN_SESSION_COOKIE_NAME]);

    if (normalizedPathname === "/admin/seo-settings") {
      res.redirect(302, `/admin/settings${requestUrl.search}`);
      return;
    }

    const adminSession = getAdminSessionFromRequest(req);

    if (!adminSession && hadAdminCookie) {
      clearAdminSessionCookie(req, res);
    }

    if (normalizedPathname === "/admin/login") {
      if (adminSession?.user) {
        res.redirect(302, "/admin");
        return;
      }
    } else if (!adminSession?.user) {
      const nextPath = `${normalizedPathname}${requestUrl.search}`;
      const loginParams = new URLSearchParams({ next: nextPath });
      if (hadAdminCookie) {
        loginParams.set("reason", "session-expired");
      }
      res.redirect(302, `/admin/login?${loginParams.toString()}`);
      return;
    }
  }

  next();
});

app.get("/sitemap.xml", (_req, res) => {
  const siteUrl = process.env.SITE_URL || SITE_URL;
  const sitemapXml = createSitemapXml(siteUrl);
  if (!sitemapXml) {
    res.status(404).setHeader("Content-Type", "text/plain").end("Sitemap is disabled.");
    return;
  }

  res
    .status(200)
    .setHeader("Content-Type", "application/xml")
    .setHeader("Cache-Control", "public, max-age=3600")
    .end(sitemapXml);
});

app.get(["/robots.txt", "/robots"], (_req, res) => {
  const siteUrl = (process.env.SITE_URL || SITE_URL).replace(/\/$/, "");
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin/",
    "Disallow: /api/",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");

  res
    .status(200)
    .setHeader("Content-Type", "text/plain; charset=utf-8")
    .setHeader("Cache-Control", "public, max-age=3600")
    .end(robotsTxt);
});

app.get("/api/blog/posts", (_req, res) => {
  res.json({
    posts: listPublishedBlogSummaries(),
    categories: getPublishedBlogCategories(),
  });
});

app.get("/api/blog/posts/:slug", (req, res) => {
  const post = getPublishedBlogPostBySlug(req.params.slug);

  if (!post) {
    res.status(404).json({ message: "Blog post not found." });
    return;
  }

  res.json({ post });
});

app.get("/api/homepage-social-proof", (_req, res) => {
  res.json(getHomepageSocialProof());
});

app.get("/api/pricing/links", (_req, res) => {
  res.json({ pricingPlanLinks: getPricingPlanLinks() });
});

app.post("/api/contact", async (req, res) => {
  const fullName = sanitizeText(req.body?.fullName, 120);
  const email = sanitizeText(req.body?.email, 180).toLowerCase();
  const countryCode = sanitizeText(req.body?.countryCode, 20);
  const countryName = sanitizeText(req.body?.countryName, 80);
  const phoneNumber = sanitizeText(req.body?.phoneNumber ?? req.body?.phone, 80);
  const phone = [countryCode, phoneNumber].filter(Boolean).join(" ").trim();
  const shopName = sanitizeText(req.body?.shopName, 160);
  const topic = sanitizeText(req.body?.topic, 120);
  const message = sanitizeText(req.body?.message, 4000);

  if (!fullName || !isValidEmail(email) || !phoneNumber.replace(/\D/g, "") || !message) {
    res.status(422).json({ message: "Please enter your name, a valid email address, phone number, and a message." });
    return;
  }

  const subjectTopic = topic || "Contact request";
  const emailText = [
    "New Cellivo contact form submission",
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Country: ${countryName || "-"}`,
    `Shop name: ${shopName || "-"}`,
    `Topic: ${subjectTopic}`,
    `Submitted from: ${req.headers.origin || req.headers.referer || "cellivo.com"}`,
    `IP: ${req.headers["x-forwarded-for"] || req.socket.remoteAddress || "-"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    await sendEmailWithConfiguredSmtp({
      to: CONTACT_RECIPIENT_EMAIL,
      replyTo: {
        name: fullName,
        address: email,
      },
      subject: `Cellivo contact form: ${subjectTopic}`,
      text: emailText,
    });

    const firstName = fullName.split(/\s+/)[0] || "there";
    const thankYouText = [
      `Hi ${firstName},`,
      "",
      "Thank you for contacting Cellivo. We received your message and our team will reply within 24 hours.",
      "",
      "Summary of your request:",
      `Topic: ${subjectTopic}`,
      `Phone: ${phone}`,
      `Shop name: ${shopName || "-"}`,
      "",
      "If you need to add anything else, reply to this email and our team will see it.",
      "",
      "Cellivo Team",
      CONTACT_RECIPIENT_EMAIL,
    ].join("\n");

    try {
      await sendEmailWithConfiguredSmtp({
        to: email,
        replyTo: CONTACT_RECIPIENT_EMAIL,
        subject: "Thank you for contacting Cellivo",
        text: thankYouText,
      });
    } catch (confirmationError) {
      console.error("Unable to send Cellivo contact confirmation email:", confirmationError);
    }

    res.json({ message: "Thank you! We'll get back to you within 24 hours." });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "We could not send your message right now. Please email hello@cellivo.com directly.",
    });
  }
});

app.post("/api/admin/auth/login", (req, res) => {
  const rateLimit = getAdminLoginRateLimit(req, req.body?.email);

  if (rateLimit.blocked) {
    res.status(429).json({
      message: `Too many failed admin login attempts. Please try again in ${Math.max(
        1,
        Math.ceil(rateLimit.retryAfterSeconds / 60),
      )} minute(s).`,
    });
    return;
  }

  const auth = authenticateAdminUser(req.body?.email, req.body?.password, {
    userAgent: req.headers["user-agent"] || "",
    ipAddress: getClientIp(req),
  });

  if (!auth) {
    recordAdminLoginFailure(rateLimit.key);
    res.status(401).json({ message: "Invalid admin email or password." });
    return;
  }

  adminLoginAttempts.delete(rateLimit.key);
  setAdminSessionCookie(req, res, auth.session.token, auth.session.expiresAt);
  res.json({ user: auth.user });
});

app.use("/api/admin", requireAdminAuth);

app.get("/api/admin/auth/me", (req, res) => {
  res.json({ user: req.adminSession.user });
});

app.post("/api/admin/auth/logout", (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  invalidateAdminSession(cookies[ADMIN_SESSION_COOKIE_NAME]);
  clearAdminSessionCookie(req, res);
  res.json({ success: true });
});

app.post("/api/admin/auth/change-password", (req, res) => {
  try {
    const user = changeAdminPassword(
      req.adminSession.user.id,
      req.body?.currentPassword,
      req.body?.newPassword,
    );
    res.json({ user });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Unable to change password." });
  }
});

app.get("/api/admin/dashboard", (_req, res) => {
  res.json(getAdminDashboardData());
});

app.get("/api/admin/dashboard/social-proof", (_req, res) => {
  res.json({ socialProof: getHomepageSocialProof({ activeOnly: false }) });
});

app.put("/api/admin/dashboard/social-proof", (req, res) => {
  try {
    const socialProof = saveHomepageSocialProof(req.body ?? {});
    res.json({ socialProof });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Unable to save homepage social proof." });
  }
});

app.get("/api/admin/pricing-links", (_req, res) => {
  res.json({ pricingPlanLinks: getPricingPlanLinks() });
});

app.put("/api/admin/pricing-links", (req, res) => {
  try {
    const pricingPlanLinks = savePricingPlanLinks(req.body?.pricingPlanLinks ?? []);
    res.json({ pricingPlanLinks });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Unable to save pricing links." });
  }
});

app.get("/api/admin/seo-settings", (_req, res) => {
  res.json({ seoSettings: getSeoSettings() });
});

app.put("/api/admin/seo-settings", (req, res) => {
  try {
    const seoSettings = saveSeoSettings(req.body?.seoSettings ?? {});
    res.json({ seoSettings });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Unable to save SEO settings." });
  }
});

app.get("/api/admin/smtp-settings", (_req, res) => {
  res.json({ smtpSettings: getSmtpSettings() });
});

app.put("/api/admin/smtp-settings", (req, res) => {
  try {
    const smtpSettings = saveSmtpSettings(req.body?.smtpSettings ?? {});
    res.json({ smtpSettings });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Unable to save SMTP settings." });
  }
});

app.post("/api/admin/smtp-settings/test", async (req, res) => {
  try {
    await sendEmailWithConfiguredSmtp({
      replyTo: req.adminSession.user.email,
      subject: "Cellivo SMTP test email",
      text: [
        "This is a test email from the Cellivo admin dashboard.",
        "",
        "If you received this, contact form SMTP delivery is configured correctly.",
      ].join("\n"),
    });

    res.json({ message: "SMTP test email sent successfully." });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Unable to send SMTP test email." });
  }
});

app.post("/api/admin/seo-settings/search-console/submit-sitemap", async (_req, res) => {
  try {
    const seoSettings = await submitSitemapToGoogleSearchConsole();
    res.json({
      seoSettings,
      message: "Sitemap submitted to Google Search Console.",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Unable to submit sitemap to Google Search Console.",
    });
  }
});

app.post("/api/admin/uploads", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "No image file was uploaded." });
    return;
  }

  const folder = sanitizeUploadFolder(req.query.folder);
  const relativePath = `/uploads/${folder}/${req.file.filename}`;
  const absoluteUrl = new URL(relativePath, `${getRequestBaseUrl(req)}/`).toString();

  res.status(201).json({
    url: relativePath,
    absoluteUrl,
    path: relativePath,
    filename: req.file.filename,
    mimeType: req.file.mimetype,
    size: req.file.size,
  });
});

app.get("/api/admin/blog/options", (_req, res) => {
  res.json(getAdminOptions());
});

app.get("/api/admin/blog/posts", (_req, res) => {
  res.json({ posts: listAdminBlogPosts() });
});

app.get("/api/admin/blog/posts/:id", (req, res) => {
  const post = getAdminBlogPostById(Number(req.params.id));

  if (!post) {
    res.status(404).json({ message: "Blog post not found." });
    return;
  }

  res.json({ post });
});

app.post("/api/admin/blog/posts/validate", (req, res) => {
  const validation = validateBlogPost(req.body, req.body?.id ?? null);
  res.json(validation);
});

app.post("/api/admin/blog/posts", (req, res) => {
  try {
    const result = saveBlogPost(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Unable to save post." });
  }
});

app.put("/api/admin/blog/posts/:id", (req, res) => {
  try {
    const result = saveBlogPost(req.body, Number(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Unable to update post." });
  }
});

app.delete("/api/admin/blog/posts/:id", (req, res) => {
  try {
    const deletedPost = deleteBlogPost(Number(req.params.id));

    if (!deletedPost) {
      res.status(404).json({ message: "Blog post not found." });
      return;
    }

    res.json({ post: deletedPost });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Unable to delete post." });
  }
});

app.use("*", async (req, res, next) => {
  const url = req.originalUrl;

  try {
    let template;
    let render;

    if (isProduction) {
      template = await productionTemplatePromise;
      render = await productionRenderPromise;
    } else {
      template = await fs.readFile(resolve("index.html"), "utf-8");
      template = injectDevelopmentStylesheet(template);
      template = await vite.transformIndexHtml(url, template);
      ({ render } = await vite.ssrLoadModule("/entry-server.js"));
    }

    const siteUrl = process.env.SITE_URL || SITE_URL;
    const adminSession = getAdminSessionFromRequest(req);
    const requestCountryCode = getRequestCountryCode(req);
    const initialData = buildInitialData(url, adminSession, {
      countryCode: requestCountryCode,
      preferredPricingCurrency: getPreferredPricingCurrency(requestCountryCode),
    });
    const { appHtml, headTags, statusCode } = await render(url, {
      siteUrl,
      initialData: initialData.data,
      statusCode: initialData.statusCode,
    });
    const initialDataScript = `<script>window.__CELLIVO_INITIAL_DATA__=${serializeInitialData(initialData.data)};</script>`;

    const integrationHeadTags = createSeoIntegrationHeadTags();
    const html = template
      .replace("<!--head-tags-->", `${headTags ?? ""}${integrationHeadTags}`)
      .replace("<!--initial-data-->", initialDataScript)
      .replace("<!--app-html-->", appHtml ?? "");

    res.status(statusCode ?? 200).setHeader("Content-Type", "text/html").end(html);
  } catch (error) {
    if (vite) {
      vite.ssrFixStacktrace(error);
    }

    next(error);
  }
});

const port = Number(process.env.PORT || 8080);

app.listen(port, () => {
  console.log(`SSR server running on port ${port}`);
});
