import { Helmet } from "react-helmet-async";
import { useSiteUrl } from "@/contexts/useSiteUrl";
import { ORGANIZATION_SCHEMA } from "@/lib/business-info";
import { BreadcrumbItem, createBreadcrumbSchema } from "@/lib/seo";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  breadcrumbs?: BreadcrumbItem[];
}

const DEFAULT_OG_IMAGE_PATH = "/og-home.jpg";

const getCanonicalPath = (canonical?: string) => {
  if (!canonical) return undefined;

  try {
    const parsedUrl = new URL(canonical);
    return `${parsedUrl.pathname}${parsedUrl.search}`;
  } catch {
    return canonical.startsWith("/") ? canonical : `/${canonical}`;
  }
};

const resolveAbsoluteUrl = (value: string | undefined, siteUrl?: string) => {
  if (!value) return undefined;

  try {
    return new URL(value).toString();
  } catch {
    const normalizedPath = getCanonicalPath(value);
    const baseUrl = import.meta.env.VITE_SITE_URL || siteUrl || "https://cellivo.com";

    if (!normalizedPath) return undefined;

    return new URL(normalizedPath, `${baseUrl.replace(/\/$/, "")}/`).toString();
  }
};

const SEOHead = ({
  title,
  description,
  canonical,
  noindex = false,
  robots,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  structuredData,
  breadcrumbs,
}: SEOHeadProps) => {
  const siteUrl = useSiteUrl();
  const resolvedCanonical = resolveAbsoluteUrl(canonical, siteUrl);
  const resolvedOgUrl = resolveAbsoluteUrl(ogUrl, siteUrl) || resolvedCanonical;
  const resolvedOgImage = resolveAbsoluteUrl(ogImage, siteUrl) || resolveAbsoluteUrl(DEFAULT_OG_IMAGE_PATH, siteUrl);
  const resolvedTwitterImage = resolveAbsoluteUrl(twitterImage, siteUrl) || resolvedOgImage;
  const robotsContent = noindex ? "noindex, nofollow" : robots || "index, follow";
  const breadcrumbStructuredData =
    breadcrumbs && breadcrumbs.length > 0 ? createBreadcrumbSchema(breadcrumbs) : null;
  const mergedStructuredData = Array.isArray(structuredData)
    ? [ORGANIZATION_SCHEMA, ...structuredData, ...(breadcrumbStructuredData ? [breadcrumbStructuredData] : [])]
    : structuredData
      ? [ORGANIZATION_SCHEMA, structuredData, ...(breadcrumbStructuredData ? [breadcrumbStructuredData] : [])]
      : [ORGANIZATION_SCHEMA, ...(breadcrumbStructuredData ? [breadcrumbStructuredData] : [])];
  const serializedStructuredData = JSON.stringify(mergedStructuredData);

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      {noindex ? <meta name="googlebot" content={robotsContent} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Cellivo" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      {resolvedOgUrl ? <meta property="og:url" content={resolvedOgUrl} /> : null}
      {resolvedOgImage ? <meta property="og:image" content={resolvedOgImage} /> : null}
      {resolvedTwitterImage ? <meta name="twitter:image" content={resolvedTwitterImage} /> : null}
      {resolvedCanonical ? <link rel="canonical" href={resolvedCanonical} /> : null}
      {serializedStructuredData ? (
        <script type="application/ld+json">{serializedStructuredData}</script>
      ) : null}
    </Helmet>
  );
};

export default SEOHead;
