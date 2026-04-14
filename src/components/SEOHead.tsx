import { Helmet } from "react-helmet-async";
import { useSiteUrl } from "@/contexts/useSiteUrl";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
}

const getCanonicalPath = (canonical?: string) => {
  if (!canonical) return undefined;

  try {
    const parsedUrl = new URL(canonical);
    return `${parsedUrl.pathname}${parsedUrl.search}`;
  } catch {
    return canonical.startsWith("/") ? canonical : `/${canonical}`;
  }
};

const resolveCanonicalUrl = (canonical: string | undefined, siteUrl?: string) => {
  if (!canonical) return undefined;

  const canonicalPath = getCanonicalPath(canonical);
  const baseUrl = siteUrl || import.meta.env.VITE_SITE_URL;

  if (!canonicalPath || !baseUrl) return canonicalPath;

  return new URL(canonicalPath, `${baseUrl.replace(/\/$/, "")}/`).toString();
};

const SEOHead = ({ title, description, canonical, noindex = false }: SEOHeadProps) => {
  const siteUrl = useSiteUrl();
  const resolvedCanonical = resolveCanonicalUrl(canonical, siteUrl);
  const robotsContent = noindex ? "noindex, nofollow" : "index, follow";

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      {noindex ? <meta name="googlebot" content={robotsContent} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {resolvedCanonical ? <meta property="og:url" content={resolvedCanonical} /> : null}
      {resolvedCanonical ? <link rel="canonical" href={resolvedCanonical} /> : null}
    </Helmet>
  );
};

export default SEOHead;
