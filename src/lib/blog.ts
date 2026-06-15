import { marked } from "marked";

export type BlogStatus = "draft" | "scheduled" | "published";

export interface BlogFaqItem {
  id?: number;
  question: string;
  answer: string;
}

export interface BlogSeoFields {
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  robotsSetting: string;
}

export interface BlogInternalLinkFields {
  primaryMoneyPageUrl: string;
  secondaryMoneyPageUrl: string;
  relatedFeaturePageUrls: string[];
  suggestedAnchorTexts: string[];
}

export interface BlogPostRecord {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  content: string;
  contentHtml: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  status: BlogStatus;
  readTime: string;
  createdAt: string;
  updatedAt: string;
  seo: BlogSeoFields;
  faqEnabled: boolean;
  faqs: BlogFaqItem[];
  internalLinks: BlogInternalLinkFields;
  relatedPostIds: number[];
  relatedProductPageUrls: string[];
  relatedFeaturePageUrls: string[];
}

export interface BlogPostSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  status: BlogStatus;
  readTime: string;
  seoTitle: string;
  metaDescription: string;
}

export interface BlogValidationCheck {
  key: string;
  label: string;
  status: "pass" | "warning" | "error";
  detail: string;
}

export interface BlogValidationResult {
  checks: BlogValidationCheck[];
  canPublish: boolean;
  errorCount: number;
  warningCount: number;
}

export interface BlogAdminOptions {
  categories: string[];
  authors: string[];
  existingPosts: Array<Pick<BlogPostSummary, "id" | "title" | "slug" | "status">>;
  moneyPageSuggestions: Array<{ label: string; url: string }>;
  featurePageSuggestions: Array<{ label: string; url: string }>;
}

export interface AdminSessionUser {
  id: number;
  name: string;
  email: string;
  role: string;
  mustChangePassword: boolean;
  lastLoginAt: string | null;
}

export interface AdminDashboardData {
  stats: {
    totalPosts: number;
    draftPosts: number;
    scheduledPosts: number;
    publishedPosts: number;
  };
  recentPosts: BlogPostSummary[];
  socialProof: HomepageSocialProofData;
  pricingPlanLinks: PricingPlanLinkRecord[];
  smtpSettings: SmtpSettingsRecord;
}

export interface CustomerLogoRecord {
  id?: number;
  name: string;
  detail: string;
  imageUrl: string;
  imageAlt: string;
  isActive: boolean;
  displayOrder: number;
}

export interface TestimonialRecord {
  id?: number;
  name: string;
  role: string;
  text: string;
  result: string;
  imageUrl: string;
  imageAlt: string;
  rating: number;
  isActive: boolean;
  displayOrder: number;
}

export interface HomepageSocialProofData {
  customerLogos: CustomerLogoRecord[];
  testimonials: TestimonialRecord[];
}

export type PricingPlanKey = "lite" | "starter" | "growth" | "business" | "unlimited";
export type PricingBillingCycle = "monthly" | "yearly" | "lifetime";
export type PricingCurrencyCode = "LKR" | "USD";

export interface PricingPlanLinkRecord {
  id?: number;
  planKey: PricingPlanKey;
  billingCycle: PricingBillingCycle;
  planName: string;
  lkrPrice: string;
  usdPrice: string;
  ctaLabel: string;
  ctaUrl: string;
  lkrCtaUrl: string;
  usdCtaUrl: string;
  displayOrder: number;
}

export interface SeoSettingsRecord {
  sitemapEnabled: boolean;
  sitemapIncludeStaticPages: boolean;
  sitemapIncludeBlogPosts: boolean;
  sitemapDefaultChangefreq: string;
  sitemapDefaultPriority: string;
  googleAnalyticsEnabled: boolean;
  googleAnalyticsMeasurementId: string;
  googleSearchConsoleVerification: string;
  googleSearchConsolePropertyUrl: string;
  googleSearchConsoleServiceAccountJson: string;
  googleSearchConsoleLastSubmittedAt: string;
}

export interface SmtpSettingsRecord {
  enabled: boolean;
  host: string;
  port: number;
  encryption: "tls" | "ssl" | "none";
  username: string;
  password: string;
  hasPassword: boolean;
  fromName: string;
  fromEmail: string;
  toEmail: string;
}

export interface BlogPostFormData {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  status: BlogStatus;
  seo: BlogSeoFields;
  faqEnabled: boolean;
  faqs: BlogFaqItem[];
  internalLinks: BlogInternalLinkFields;
  relatedPostIds: number[];
  relatedProductPageUrls: string[];
  relatedFeaturePageUrls: string[];
}

export interface BlogInitialDataPayload {
  blogIndex?: {
    posts: BlogPostSummary[];
    categories: string[];
  };
  blogPost?: BlogPostRecord | null;
  pricingPlanLinks?: PricingPlanLinkRecord[];
  preferredPricingCurrency?: PricingCurrencyCode;
  pricingVisitorCountryCode?: string;
  adminPricingPlanLinks?: PricingPlanLinkRecord[];
  adminSeoSettings?: SeoSettingsRecord;
  adminSmtpSettings?: SmtpSettingsRecord;
  homepageSocialProof?: HomepageSocialProofData;
  adminSocialProof?: HomepageSocialProofData;
  adminSession?: AdminSessionUser | null;
  adminDashboard?: AdminDashboardData;
  adminBlog?: {
    options: BlogAdminOptions;
    posts: BlogPostSummary[];
  };
  adminPreviewPost?: BlogPostRecord | null;
}

export const MONEY_PAGE_SUGGESTIONS = [
  { label: "Mobile Shop POS System", url: "/mobile-shop-pos-system" },
  { label: "POS System for Phone Shop", url: "/pos-system-for-phone-shop" },
  { label: "Pricing", url: "/pricing" },
  { label: "Billing Software for Mobile Shop", url: "/billing-software-for-mobile-shop" },
  { label: "IMEI Tracking System", url: "/imei-tracking-pos-system" },
  { label: "Mobile Repair Management Software", url: "/mobile-repair-management-software" },
  { label: "Inventory Management System", url: "/inventory-management-system" },
];

export const FEATURE_PAGE_SUGGESTIONS = [
  { label: "Billing Software", url: "/billing-software-for-mobile-shop" },
  { label: "IMEI Tracking", url: "/imei-tracking-pos-system" },
  { label: "Inventory Management", url: "/inventory-management-system" },
  { label: "Repair Management", url: "/mobile-repair-management-software" },
  { label: "Multi-Branch POS", url: "/multi-branch-pos-system" },
  { label: "Cash Drawer Management", url: "/cash-drawer-management" },
  { label: "Customer Loyalty System", url: "/customer-loyalty-system" },
];

export const EMPTY_BLOG_POST: BlogPostFormData = {
  title: "",
  slug: "",
  excerpt: "",
  featuredImage: "",
  featuredImageAlt: "",
  content: "",
  category: "",
  tags: [],
  author: "",
  publishDate: new Date().toISOString().slice(0, 16),
  status: "draft",
  seo: {
    seoTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    focusKeyword: "",
    secondaryKeywords: [],
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    robotsSetting: "index,follow",
  },
  faqEnabled: false,
  faqs: [],
  internalLinks: {
    primaryMoneyPageUrl: "",
    secondaryMoneyPageUrl: "",
    relatedFeaturePageUrls: [],
    suggestedAnchorTexts: [],
  },
  relatedPostIds: [],
  relatedProductPageUrls: [],
  relatedFeaturePageUrls: [],
};

marked.setOptions({
  gfm: true,
  breaks: true,
});

const HTML_CONTENT_PATTERN = /<\/?[a-z][\s\S]*>/i;
const ABSOLUTE_UPLOAD_URL_PATTERN =
  /https?:\/\/(?:localhost|127\.0\.0\.1|(?:www\.)?cellivo\.com)(?::\d+)?(\/uploads\/[^\s"'<>)]*)/gi;

export const isHtmlBlogContent = (content: string) => HTML_CONTENT_PATTERN.test(content ?? "");

const normalizeEmbeddedUploadUrls = (content: string) =>
  `${content ?? ""}`.replace(ABSOLUTE_UPLOAD_URL_PATTERN, "$1");

export const renderBlogMarkdown = (content: string) =>
  isHtmlBlogContent(content)
    ? normalizeEmbeddedUploadUrls(content)
    : ((marked.parse(normalizeEmbeddedUploadUrls(content)) as string) ?? "");

export const formatBlogDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const toInputDateTimeValue = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const splitCommaSeparated = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const joinCommaSeparated = (items: string[]) => items.join(", ");
