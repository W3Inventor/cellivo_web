import type {
  AdminDashboardData,
  AdminSessionUser,
  HomepageSocialProofData,
  PricingPlanLinkRecord,
  SeoSettingsRecord,
  SmtpSettingsRecord,
} from "@/lib/blog";

export interface AdminUploadResponse {
  url: string;
  path: string;
  filename: string;
  mimeType: string;
  size: number;
}

export const ADMIN_SESSION_EXPIRED_EVENT = "cellivo-admin-session-expired";

const notifyAdminSessionExpired = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ADMIN_SESSION_EXPIRED_EVENT));
  }
};

const readJson = async <T>(
  response: Response,
  options: { notifyOnUnauthorized?: boolean } = {},
): Promise<T> => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && options.notifyOnUnauthorized !== false) {
      notifyAdminSessionExpired();
    }

    const message =
      typeof data?.message === "string" && data.message
        ? data.message
        : "Something went wrong while talking to the admin service.";
    throw new Error(message);
  }
  return data as T;
};

export const loginAdmin = async (email: string, password: string) =>
  readJson<{ user: AdminSessionUser }>(
    await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ email, password }),
    }),
    { notifyOnUnauthorized: false },
  );

export const fetchAdminSession = async () =>
  readJson<{ user: AdminSessionUser }>(
    await fetch("/api/admin/auth/me", {
      credentials: "same-origin",
    }),
  );

export const logoutAdmin = async () =>
  readJson<{ success: boolean }>(
    await fetch("/api/admin/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    }),
  );

export const changeAdminPasswordRequest = async (currentPassword: string, newPassword: string) =>
  readJson<{ user: AdminSessionUser }>(
    await fetch("/api/admin/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
  );

export const fetchAdminDashboard = async () =>
  readJson<AdminDashboardData>(
    await fetch("/api/admin/dashboard", {
      credentials: "same-origin",
    }),
  );

export const fetchAdminSocialProof = async () =>
  readJson<{ socialProof: HomepageSocialProofData }>(
    await fetch("/api/admin/dashboard/social-proof", {
      credentials: "same-origin",
    }),
  );

export const saveHomepageSocialProofRequest = async (payload: HomepageSocialProofData) =>
  readJson<{ socialProof: HomepageSocialProofData }>(
    await fetch("/api/admin/dashboard/social-proof", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(payload),
    }),
  );

export const fetchAdminPricingPlanLinks = async () =>
  readJson<{ pricingPlanLinks: PricingPlanLinkRecord[] }>(
    await fetch("/api/admin/pricing-links", {
      credentials: "same-origin",
    }),
  );

export const saveAdminPricingPlanLinks = async (pricingPlanLinks: PricingPlanLinkRecord[]) =>
  readJson<{ pricingPlanLinks: PricingPlanLinkRecord[] }>(
    await fetch("/api/admin/pricing-links", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ pricingPlanLinks }),
    }),
  );

export const fetchAdminSeoSettings = async () =>
  readJson<{ seoSettings: SeoSettingsRecord }>(
    await fetch("/api/admin/seo-settings", {
      credentials: "same-origin",
    }),
  );

export const saveAdminSeoSettings = async (seoSettings: SeoSettingsRecord) =>
  readJson<{ seoSettings: SeoSettingsRecord }>(
    await fetch("/api/admin/seo-settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ seoSettings }),
    }),
  );

export const submitGoogleSearchConsoleSitemap = async () =>
  readJson<{ seoSettings: SeoSettingsRecord; message: string }>(
    await fetch("/api/admin/seo-settings/search-console/submit-sitemap", {
      method: "POST",
      credentials: "same-origin",
    }),
  );

export const fetchAdminSmtpSettings = async () =>
  readJson<{ smtpSettings: SmtpSettingsRecord }>(
    await fetch("/api/admin/smtp-settings", {
      credentials: "same-origin",
    }),
  );

export const saveAdminSmtpSettings = async (smtpSettings: SmtpSettingsRecord) =>
  readJson<{ smtpSettings: SmtpSettingsRecord }>(
    await fetch("/api/admin/smtp-settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ smtpSettings }),
    }),
  );

export const sendAdminSmtpTestEmail = async () =>
  readJson<{ message: string }>(
    await fetch("/api/admin/smtp-settings/test", {
      method: "POST",
      credentials: "same-origin",
    }),
  );

export const uploadAdminImage = async (file: File, folder = "general") => {
  const formData = new FormData();
  formData.append("file", file);

  return readJson<AdminUploadResponse>(
    await fetch(`/api/admin/uploads?folder=${encodeURIComponent(folder)}`, {
      method: "POST",
      credentials: "same-origin",
      body: formData,
    }),
  );
};
