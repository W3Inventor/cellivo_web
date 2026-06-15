const normalizeValue = (value: string | undefined) => value?.trim() ?? "";

const DEFAULT_CALCOM_LINK = "https://cal.com/cellivo/cellivo-live-demo";

const parseCalLink = (calLink: string) => {
  const normalizedLink = calLink.trim();
  if (!normalizedLink) {
    return { username: "", eventSlug: "" };
  }

  const normalizedUrl = normalizedLink.startsWith("http://") || normalizedLink.startsWith("https://")
    ? normalizedLink
    : normalizedLink.startsWith("cal.com/")
      ? `https://${normalizedLink}`
      : normalizedLink;

  const rawPath = normalizedUrl.startsWith("http://") || normalizedUrl.startsWith("https://")
    ? new URL(normalizedUrl).pathname
    : normalizedUrl;

  const segments = rawPath
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (segments.length < 2) {
    return { username: "", eventSlug: "" };
  }

  const [username, ...eventSlugParts] = segments;

  return {
    username,
    eventSlug: eventSlugParts.join("/"),
  };
};

const configuredLink = normalizeValue(import.meta.env.VITE_CALCOM_LINK) || DEFAULT_CALCOM_LINK;
const configuredUsername = normalizeValue(import.meta.env.VITE_CALCOM_USERNAME);
const configuredEventSlug = normalizeValue(import.meta.env.VITE_CALCOM_EVENT_SLUG);

const parsedConfig = configuredLink ? parseCalLink(configuredLink) : { username: "", eventSlug: "" };

export const CALCOM_CONFIG = {
  link: configuredLink,
  username: configuredUsername || parsedConfig.username,
  eventSlug: configuredEventSlug || parsedConfig.eventSlug,
};

export const isCalBookingConfigured = Boolean(CALCOM_CONFIG.username && CALCOM_CONFIG.eventSlug);

export const getCalEmbedUrl = () => {
  if (!CALCOM_CONFIG.link) {
    return "";
  }

  const url = new URL(
    CALCOM_CONFIG.link.startsWith("http://") || CALCOM_CONFIG.link.startsWith("https://")
      ? CALCOM_CONFIG.link
      : `https://${CALCOM_CONFIG.link.replace(/^\/+/, "")}`,
  );

  url.searchParams.set("embed", "true");
  url.searchParams.set("theme", "light");

  return url.toString();
};
