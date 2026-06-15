import type {
  BlogAdminOptions,
  BlogPostFormData,
  BlogPostRecord,
  BlogPostSummary,
  BlogValidationResult,
  HomepageSocialProofData,
  PricingPlanLinkRecord,
} from "@/lib/blog";

const jsonHeaders = {
  "Content-Type": "application/json",
};

const readJson = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.json() as Promise<T>;
};

export const fetchPublicBlogData = async () =>
  readJson<{ posts: BlogPostSummary[]; categories: string[] }>(await fetch("/api/blog/posts"));

export const fetchPublicBlogPost = async (slug: string) =>
  readJson<{ post: BlogPostRecord }>(await fetch(`/api/blog/posts/${slug}`));

export const fetchHomepageSocialProof = async () =>
  readJson<HomepageSocialProofData>(await fetch("/api/homepage-social-proof"));

export const fetchPricingPlanLinks = async () =>
  readJson<{ pricingPlanLinks: PricingPlanLinkRecord[] }>(await fetch("/api/pricing/links"));

export const fetchAdminOptions = async () =>
  readJson<BlogAdminOptions>(await fetch("/api/admin/blog/options"));

export const fetchAdminPosts = async () =>
  readJson<{ posts: BlogPostSummary[] }>(await fetch("/api/admin/blog/posts"));

export const fetchAdminPost = async (id: number) =>
  readJson<{ post: BlogPostRecord }>(await fetch(`/api/admin/blog/posts/${id}`));

export const validateAdminPost = async (payload: BlogPostFormData & { id?: number }) =>
  readJson<BlogValidationResult>(
    await fetch("/api/admin/blog/posts/validate", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    }),
  );

export const createAdminPost = async (payload: BlogPostFormData) =>
  readJson<{ post: BlogPostRecord; validation: BlogValidationResult }>(
    await fetch("/api/admin/blog/posts", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    }),
  );

export const updateAdminPost = async (id: number, payload: BlogPostFormData) =>
  readJson<{ post: BlogPostRecord; validation: BlogValidationResult }>(
    await fetch(`/api/admin/blog/posts/${id}`, {
      method: "PUT",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    }),
  );

export const deleteAdminPost = async (id: number) =>
  readJson<{ post: Pick<BlogPostSummary, "id" | "title"> }>(
    await fetch(`/api/admin/blog/posts/${id}`, {
      method: "DELETE",
    }),
  );
