export interface BreadcrumbItem {
  name: string;
  path?: string;
}

const SITE_URL = "https://cellivo.com";

export const createBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => {
    const normalizedPath = item.path
      ? item.path.startsWith("http")
        ? item.path
        : new URL(item.path, `${SITE_URL}/`).toString()
      : undefined;

    return {
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(normalizedPath ? { item: normalizedPath } : {}),
    };
  }),
});
