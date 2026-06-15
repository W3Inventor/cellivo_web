import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  Code2,
  Eye,
  FilePlus2,
  Loader2,
  Plus,
  Save,
  Send,
  SquarePen,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RichTextEditor, { type RichTextEditorHandle } from "@/components/admin/RichTextEditor";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  createAdminPost,
  fetchAdminOptions,
  fetchAdminPost,
  fetchAdminPosts,
  updateAdminPost,
  validateAdminPost,
} from "@/lib/blog-api";
import {
  EMPTY_BLOG_POST,
  FEATURE_PAGE_SUGGESTIONS,
  MONEY_PAGE_SUGGESTIONS,
  joinCommaSeparated,
  renderBlogMarkdown,
  splitCommaSeparated,
  toInputDateTimeValue,
  type BlogAdminOptions,
  type BlogFaqItem,
  type BlogPostFormData,
  type BlogPostRecord,
  type BlogPostSummary,
  type BlogStatus,
  type BlogValidationResult,
} from "@/lib/blog";
import { useInitialData } from "@/contexts/InitialDataContext";

const cloneEmptyPost = (): BlogPostFormData => ({
  ...EMPTY_BLOG_POST,
  seo: { ...EMPTY_BLOG_POST.seo },
  faqs: [],
  internalLinks: { ...EMPTY_BLOG_POST.internalLinks },
  relatedPostIds: [],
  relatedProductPageUrls: [],
  relatedFeaturePageUrls: [],
  tags: [],
  publishDate: toInputDateTimeValue(new Date().toISOString()),
});

const mapPostToForm = (post: BlogPostRecord): BlogPostFormData => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  featuredImage: post.featuredImage,
  featuredImageAlt: post.featuredImageAlt,
  content: renderBlogMarkdown(post.content),
  category: post.category,
  tags: post.tags,
  author: post.author,
  publishDate: toInputDateTimeValue(post.publishDate),
  status: post.status,
  seo: { ...post.seo },
  faqEnabled: post.faqEnabled,
  faqs: post.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
  internalLinks: {
    primaryMoneyPageUrl: post.internalLinks.primaryMoneyPageUrl,
    secondaryMoneyPageUrl: post.internalLinks.secondaryMoneyPageUrl,
    relatedFeaturePageUrls: [...post.internalLinks.relatedFeaturePageUrls],
    suggestedAnchorTexts: [...post.internalLinks.suggestedAnchorTexts],
  },
  relatedPostIds: [...post.relatedPostIds],
  relatedProductPageUrls: [...post.relatedProductPageUrls],
  relatedFeaturePageUrls: [...post.relatedFeaturePageUrls],
});

const statusBadgeVariant = (status: BlogStatus) => {
  switch (status) {
    case "published":
      return "default";
    case "scheduled":
      return "secondary";
    default:
      return "outline";
  }
};

const validationBadge = (status: "pass" | "warning" | "error") => {
  switch (status) {
    case "pass":
      return { label: "Pass", className: "bg-green-50 text-green-700 border-green-200" };
    case "warning":
      return { label: "Warning", className: "bg-amber-50 text-amber-700 border-amber-200" };
    default:
      return { label: "Fix", className: "bg-red-50 text-red-700 border-red-200" };
  }
};

const BlogAdmin = () => {
  const initialData = useInitialData();
  const initialAdminBlog = initialData.adminBlog;
  const [searchParams, setSearchParams] = useSearchParams();
  const editorRef = useRef<RichTextEditorHandle | null>(null);
  const [options, setOptions] = useState<BlogAdminOptions | null>(initialAdminBlog?.options ?? null);
  const [posts, setPosts] = useState<BlogPostSummary[]>(initialAdminBlog?.posts ?? []);
  const [draft, setDraft] = useState<BlogPostFormData>(cloneEmptyPost());
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [validation, setValidation] = useState<BlogValidationResult | null>(null);
  const [loading, setLoading] = useState(!initialAdminBlog);
  const [loadingPost, setLoadingPost] = useState(false);
  const [saveState, setSaveState] = useState<{ tone: "success" | "error"; message: string } | null>(null);
  const [savingAction, setSavingAction] = useState<BlogStatus | null>(null);
  const [inlineImageUrl, setInlineImageUrl] = useState("");
  const [inlineImageAlt, setInlineImageAlt] = useState("");

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchAdminOptions(), fetchAdminPosts()])
      .then(([adminOptions, adminPosts]) => {
        if (cancelled) return;
        setOptions(adminOptions);
        setPosts(adminPosts.posts);
      })
      .catch(() => {
        if (!cancelled) {
          setSaveState({ tone: "error", message: "We couldn't load the blog admin data." });
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const postParam = searchParams.get("post");

    if (!postParam) {
      if (selectedPostId !== null) {
        resetEditor();
      }
      return;
    }

    const postId = Number(postParam);
    if (!Number.isFinite(postId) || postId <= 0) {
      resetEditor();
      setSearchParams({}, { replace: true });
      return;
    }

    if (selectedPostId !== postId) {
      void loadPostIntoEditor(postId);
    }
  }, [searchParams, selectedPostId, setSearchParams]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      validateAdminPost({
        ...draft,
        id: selectedPostId ?? undefined,
      })
        .then((result) => setValidation(result))
        .catch(() => {
          setValidation(null);
        });
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [draft, selectedPostId]);

  const sortedExistingPosts = useMemo(() => posts, [posts]);

  const loadPostIntoEditor = async (id: number) => {
    setLoadingPost(true);
    setSaveState(null);
    try {
      const response = await fetchAdminPost(id);
      setDraft(mapPostToForm(response.post));
      setSelectedPostId(response.post.id);
      setInlineImageUrl("");
      setInlineImageAlt("");
    } catch {
      setSaveState({ tone: "error", message: "We couldn't load that post." });
    } finally {
      setLoadingPost(false);
    }
  };

  const resetEditor = () => {
    setDraft(cloneEmptyPost());
    setSelectedPostId(null);
    setSaveState(null);
    setValidation(null);
    setInlineImageUrl("");
    setInlineImageAlt("");
  };

  const updateDraft = <K extends keyof BlogPostFormData>(key: K, value: BlogPostFormData[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const updateSeo = <K extends keyof BlogPostFormData["seo"]>(key: K, value: BlogPostFormData["seo"][K]) => {
    setDraft((current) => ({
      ...current,
      seo: {
        ...current.seo,
        [key]: value,
      },
    }));
  };

  const updateInternalLinks = <K extends keyof BlogPostFormData["internalLinks"]>(
    key: K,
    value: BlogPostFormData["internalLinks"][K],
  ) => {
    setDraft((current) => ({
      ...current,
      internalLinks: {
        ...current.internalLinks,
        [key]: value,
      },
    }));
  };

  const upsertFaq = (index: number, field: keyof BlogFaqItem, value: string) => {
    setDraft((current) => ({
      ...current,
      faqs: current.faqs.map((faq, faqIndex) =>
        faqIndex === index ? { ...faq, [field]: value } : faq,
      ),
    }));
  };

  const addFaq = () => {
    setDraft((current) => ({
      ...current,
      faqs: [...current.faqs, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index: number) => {
    setDraft((current) => ({
      ...current,
      faqs: current.faqs.filter((_, faqIndex) => faqIndex !== index),
    }));
  };

  const toggleRelatedPost = (id: number) => {
    setDraft((current) => ({
      ...current,
      relatedPostIds: current.relatedPostIds.includes(id)
        ? current.relatedPostIds.filter((value) => value !== id)
        : [...current.relatedPostIds, id],
    }));
  };

  const insertLinkSnippet = (label: string, url: string) => {
    editorRef.current?.insertLink(label, url);
  };

  const insertImageSnippet = () => {
    if (!inlineImageUrl) return;
    editorRef.current?.insertImage(inlineImageUrl, inlineImageAlt);
    setInlineImageUrl("");
    setInlineImageAlt("");
  };

  const persistDraft = async (status: BlogStatus) => {
    setSavingAction(status);
    setSaveState(null);

    try {
      const payload: BlogPostFormData = {
        ...draft,
        status,
      };

      const response = selectedPostId
        ? await updateAdminPost(selectedPostId, payload)
        : await createAdminPost(payload);

      setDraft(mapPostToForm(response.post));
      setSelectedPostId(response.post.id);
      setValidation(response.validation);
      const refreshedPosts = await fetchAdminPosts();
      setPosts(refreshedPosts.posts);
      setSaveState({
        tone: "success",
        message:
          status === "draft"
            ? "Draft saved successfully."
            : status === "scheduled"
              ? "Post scheduled successfully."
              : "Post published successfully.",
      });
    } catch {
      setSaveState({ tone: "error", message: "We couldn't save this post. Please try again." });
    } finally {
      setSavingAction(null);
    }
  };

  if (loading) {
    return (
      <>
        <SEOHead
          title="Blog Admin | Cellivo"
          description="Admin editor for Cellivo blog content."
          canonical="https://cellivo.com/admin/blog"
          noindex
        />
        <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-600">
          Loading blog admin…
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Blog Admin | Cellivo"
        description="Backend editor for Cellivo blog content and SEO publishing."
        canonical="https://cellivo.com/admin/blog"
        noindex
      />
      <AdminShell
        title="Blog CMS & SEO Publisher"
        description="Create, edit, schedule, preview, and publish blog posts with SEO controls, FAQ schema, internal links, and automatic sitemap support."
        actions={
          <>
            <Button variant="outline" className="rounded-xl" onClick={resetEditor}>
              <FilePlus2 className="mr-2" size={16} />
              New Post
            </Button>
            {selectedPostId ? (
              <Link to={`/admin/blog/preview/${selectedPostId}`} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-xl">
                  <Eye className="mr-2" size={16} />
                  Preview
                </Button>
              </Link>
            ) : (
              <Button variant="outline" className="rounded-xl" disabled>
                <Eye className="mr-2" size={16} />
                Preview
              </Button>
            )}
            <Button className="rounded-xl" variant="secondary" onClick={() => persistDraft("draft")} disabled={savingAction !== null}>
              {savingAction === "draft" ? <Loader2 className="mr-2 animate-spin" size={16} /> : <Save className="mr-2" size={16} />}
              Save Draft
            </Button>
            <Button className="rounded-xl" variant="outline" onClick={() => persistDraft("scheduled")} disabled={savingAction !== null}>
              {savingAction === "scheduled" ? <Loader2 className="mr-2 animate-spin" size={16} /> : <CalendarIcon />}
              Schedule Publish
            </Button>
            <Button className="rounded-xl" onClick={() => persistDraft("published")} disabled={savingAction !== null || !validation?.canPublish}>
              {savingAction === "published" ? <Loader2 className="mr-2 animate-spin" size={16} /> : <Send className="mr-2" size={16} />}
              Publish
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          {saveState ? (
            <div
              className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${
                saveState.tone === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {saveState.message}
            </div>
          ) : null}

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Editor</CardTitle>
                  <CardDescription>Write the article, content structure, and publishing details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={draft.title}
                        onChange={(event) => updateDraft("title", event.target.value)}
                        placeholder="How to choose a POS system for a phone shop"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={draft.slug}
                        onChange={(event) => updateDraft("slug", event.target.value)}
                        placeholder="how-to-choose-pos-system-for-phone-shop"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={draft.excerpt}
                      onChange={(event) => updateDraft("excerpt", event.target.value)}
                      className="min-h-[90px]"
                      placeholder="Short summary shown on the blog listing and SERP description fallbacks."
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        list="blog-category-options"
                        value={draft.category}
                        onChange={(event) => updateDraft("category", event.target.value)}
                        placeholder="POS & Billing"
                      />
                      <datalist id="blog-category-options">
                        {options?.categories.map((category) => (
                          <option key={category} value={category} />
                        ))}
                      </datalist>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        list="blog-author-options"
                        value={draft.author}
                        onChange={(event) => updateDraft("author", event.target.value)}
                        placeholder="Cellivo Team"
                      />
                      <datalist id="blog-author-options">
                        {options?.authors.map((author) => (
                          <option key={author} value={author} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="publish-date">Publish Date</Label>
                      <Input
                        id="publish-date"
                        type="datetime-local"
                        value={draft.publishDate}
                        onChange={(event) => updateDraft("publishDate", event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select value={draft.status} onValueChange={(value: BlogStatus) => updateDraft("status", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="featured-image">Featured Image</Label>
                      <ImageUploadField
                        value={draft.featuredImage}
                        onChange={(value) => updateDraft("featuredImage", value)}
                        folder="blog"
                        placeholder="Paste the featured image URL or upload the image"
                        previewAlt={draft.featuredImageAlt || draft.title || "Blog featured image preview"}
                        previewClassName="min-h-32"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="featured-alt">Featured Image Alt Text</Label>
                      <Input
                        id="featured-alt"
                        value={draft.featuredImageAlt}
                        onChange={(event) => updateDraft("featuredImageAlt", event.target.value)}
                        placeholder="Describe the featured image for SEO and accessibility"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={joinCommaSeparated(draft.tags)}
                      onChange={(event) => updateDraft("tags", splitCommaSeparated(event.target.value))}
                      placeholder="POS software, IMEI tracking, billing"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <Label htmlFor="content">Content Editor</Label>
                        <p className="text-xs text-muted-foreground">
                          Use Visual for normal writing or HTML for custom code and designed content blocks.
                        </p>
                      </div>
                    </div>
                    <Tabs defaultValue="visual" className="w-full">
                      <TabsList className="grid h-auto w-full grid-cols-2 rounded-2xl bg-slate-100 p-1">
                        <TabsTrigger value="visual" className="rounded-xl py-2">
                          <SquarePen className="mr-2" size={14} />
                          Visual
                        </TabsTrigger>
                        <TabsTrigger value="html" className="rounded-xl py-2">
                          <Code2 className="mr-2" size={14} />
                          HTML
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="visual" className="mt-4 space-y-4">
                        <div className="rounded-2xl border border-border bg-secondary/20 p-4">
                          <div className="mb-3">
                            <p className="text-sm font-medium text-foreground">Insert content image</p>
                            <p className="text-xs text-muted-foreground">
                              Upload an article image here, add alt text, then insert it into the editor at the current cursor position.
                            </p>
                          </div>
                          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
                            <ImageUploadField
                              value={inlineImageUrl}
                              onChange={setInlineImageUrl}
                              folder="blog"
                              placeholder="Paste an inline image URL or upload the file"
                              previewAlt={inlineImageAlt || "Blog content image preview"}
                              previewClassName="min-h-24"
                            />
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor="inline-image-alt">Inline Image Alt Text</Label>
                                <Input
                                  id="inline-image-alt"
                                  value={inlineImageAlt}
                                  onChange={(event) => setInlineImageAlt(event.target.value)}
                                  placeholder="Describe the image for SEO and accessibility"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                className="w-full rounded-xl"
                                disabled={!inlineImageUrl}
                                onClick={insertImageSnippet}
                              >
                                <Plus className="mr-2" size={16} />
                                Insert into Article
                              </Button>
                            </div>
                          </div>
                        </div>
                        <RichTextEditor
                          ref={editorRef}
                          value={draft.content}
                          onChange={(value) => updateDraft("content", value)}
                          placeholder="Write the blog post content here..."
                        />
                      </TabsContent>

                      <TabsContent value="html" className="mt-4 space-y-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                            <p className="text-sm font-semibold text-slate-950">HTML editor</p>
                            <p className="text-xs text-slate-500">Type clean HTML for custom sections, tables, images, and styled blocks.</p>
                          </div>
                        </div>
                        <Textarea
                          id="content-html"
                          value={draft.content}
                          onChange={(event) => updateDraft("content", event.target.value)}
                          className="min-h-[560px] rounded-2xl border-slate-300 bg-white font-mono text-sm leading-6 text-slate-800 placeholder:text-slate-400"
                          spellCheck={false}
                          placeholder={`<h2>Phone Shop POS Guide</h2>\n<p>Write your blog content or custom design HTML here.</p>\n<div style="padding:24px;border-radius:18px;background:#eef6ff;">\n  <h3>Custom design block</h3>\n  <p>This will render in the Visual editor and live blog post.</p>\n</div>`}
                        />
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          Use trusted HTML only. The same content is used for the public blog page, SEO validation, schema, and sitemap updates.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Internal Linking & Related Content</CardTitle>
                  <CardDescription>
                    Set money page destinations, related pages, and quick insert links for the article.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="primary-money-page">Primary Money Page URL</Label>
                      <Input
                        id="primary-money-page"
                        value={draft.internalLinks.primaryMoneyPageUrl}
                        onChange={(event) => updateInternalLinks("primaryMoneyPageUrl", event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondary-money-page">Secondary Money Page URL</Label>
                      <Input
                        id="secondary-money-page"
                        value={draft.internalLinks.secondaryMoneyPageUrl}
                        onChange={(event) => updateInternalLinks("secondaryMoneyPageUrl", event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="suggested-anchor-texts">Suggested Anchor Text List</Label>
                    <Input
                      id="suggested-anchor-texts"
                      value={joinCommaSeparated(draft.internalLinks.suggestedAnchorTexts)}
                      onChange={(event) =>
                        updateInternalLinks("suggestedAnchorTexts", splitCommaSeparated(event.target.value))
                      }
                      placeholder="mobile shop POS system, POS system for phone shop"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="related-feature-urls">Related Feature Page URLs</Label>
                    <Input
                      id="related-feature-urls"
                      value={joinCommaSeparated(draft.relatedFeaturePageUrls)}
                      onChange={(event) => updateDraft("relatedFeaturePageUrls", splitCommaSeparated(event.target.value))}
                      placeholder="/billing-software-for-mobile-shop, /imei-tracking-pos-system"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="related-product-urls">Related Product Page URLs</Label>
                    <Input
                      id="related-product-urls"
                      value={joinCommaSeparated(draft.relatedProductPageUrls)}
                      onChange={(event) => updateDraft("relatedProductPageUrls", splitCommaSeparated(event.target.value))}
                      placeholder="/mobile-shop-pos-system, /pricing"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Related Posts</Label>
                    <div className="grid gap-2 rounded-xl border border-border p-3 md:grid-cols-2">
                      {sortedExistingPosts
                        .filter((post) => post.id !== selectedPostId)
                        .map((post) => (
                          <label key={post.id} className="flex items-start gap-2 rounded-lg px-2 py-1 text-sm hover:bg-secondary/40">
                            <input
                              type="checkbox"
                              checked={draft.relatedPostIds.includes(post.id)}
                              onChange={() => toggleRelatedPost(post.id)}
                              className="mt-1"
                            />
                            <span>
                              <span className="block font-medium text-foreground">{post.title}</span>
                              <span className="text-xs text-muted-foreground">/{post.slug}</span>
                            </span>
                          </label>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label>Quick Insert Internal Links</Label>
                      <p className="text-xs text-muted-foreground">
                        Insert keyword-rich links directly into the visual content editor.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[...MONEY_PAGE_SUGGESTIONS, ...FEATURE_PAGE_SUGGESTIONS].map((item) => (
                        <Button
                          key={item.url}
                          type="button"
                          variant="outline"
                          className="h-9 rounded-full px-4 text-xs"
                          onClick={() => insertLinkSnippet(item.label, item.url)}
                        >
                          <Plus size={12} className="mr-1.5" />
                          {item.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">FAQ Schema</CardTitle>
                  <CardDescription>Add optional FAQ items for FAQPage schema output on the post.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                    <div>
                      <Label htmlFor="faq-toggle">Enable FAQ schema</Label>
                      <p className="text-xs text-muted-foreground">When enabled, FAQ items are included in blog schema output.</p>
                    </div>
                    <Switch
                      id="faq-toggle"
                      checked={draft.faqEnabled}
                      onCheckedChange={(checked) => updateDraft("faqEnabled", checked)}
                    />
                  </div>

                  {draft.faqEnabled ? (
                    <div className="space-y-4">
                      {draft.faqs.map((faq, index) => (
                        <div key={`faq-${index}`} className="rounded-xl border border-border p-4">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <p className="text-sm font-medium text-foreground">FAQ {index + 1}</p>
                            <Button type="button" variant="ghost" className="h-8 px-3 text-xs" onClick={() => removeFaq(index)}>
                              Remove
                            </Button>
                          </div>
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <Label>Question</Label>
                              <Input
                                value={faq.question}
                                onChange={(event) => upsertFaq(index, "question", event.target.value)}
                                placeholder="What is a mobile shop POS system?"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Answer</Label>
                              <Textarea
                                value={faq.answer}
                                onChange={(event) => upsertFaq(index, "answer", event.target.value)}
                                className="min-h-[90px]"
                                placeholder="Explain the answer in plain language."
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button type="button" variant="outline" className="rounded-xl" onClick={addFaq}>
                        <Plus className="mr-2" size={16} />
                        Add FAQ
                      </Button>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SEO Panel</CardTitle>
                  <CardDescription>Manage metadata, keyword targets, social previews, and robots settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seo-title">SEO Title</Label>
                    <Input
                      id="seo-title"
                      value={draft.seo.seoTitle}
                      onChange={(event) => updateSeo("seoTitle", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea
                      id="meta-description"
                      value={draft.seo.metaDescription}
                      onChange={(event) => updateSeo("metaDescription", event.target.value)}
                      className="min-h-[90px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="canonical-url">Canonical URL</Label>
                    <Input
                      id="canonical-url"
                      value={draft.seo.canonicalUrl}
                      onChange={(event) => updateSeo("canonicalUrl", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="focus-keyword">Focus Keyword</Label>
                    <Input
                      id="focus-keyword"
                      value={draft.seo.focusKeyword}
                      onChange={(event) => updateSeo("focusKeyword", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-keywords">Secondary Keywords</Label>
                    <Input
                      id="secondary-keywords"
                      value={joinCommaSeparated(draft.seo.secondaryKeywords)}
                      onChange={(event) => updateSeo("secondaryKeywords", splitCommaSeparated(event.target.value))}
                    />
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="og-title">OG Title</Label>
                      <Input id="og-title" value={draft.seo.ogTitle} onChange={(event) => updateSeo("ogTitle", event.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="og-description">OG Description</Label>
                      <Textarea
                        id="og-description"
                        value={draft.seo.ogDescription}
                        onChange={(event) => updateSeo("ogDescription", event.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="og-image">OG Image</Label>
                      <Input id="og-image" value={draft.seo.ogImage} onChange={(event) => updateSeo("ogImage", event.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter-title">Twitter Title</Label>
                      <Input
                        id="twitter-title"
                        value={draft.seo.twitterTitle}
                        onChange={(event) => updateSeo("twitterTitle", event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter-description">Twitter Description</Label>
                      <Textarea
                        id="twitter-description"
                        value={draft.seo.twitterDescription}
                        onChange={(event) => updateSeo("twitterDescription", event.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter-image">Twitter Image</Label>
                      <Input
                        id="twitter-image"
                        value={draft.seo.twitterImage}
                        onChange={(event) => updateSeo("twitterImage", event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Robots Setting</Label>
                    <Select value={draft.seo.robotsSetting} onValueChange={(value) => updateSeo("robotsSetting", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select robots setting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="index,follow">index,follow</SelectItem>
                        <SelectItem value="noindex,nofollow">noindex,nofollow</SelectItem>
                        <SelectItem value="index,nofollow">index,nofollow</SelectItem>
                        <SelectItem value="noindex,follow">noindex,follow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Publish Checklist</CardTitle>
                  <CardDescription>Validation runs automatically while you edit.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {validation ? (
                    <>
                      <div className="rounded-xl border border-border bg-secondary/20 px-4 py-3">
                        <p className="text-sm font-medium text-foreground">
                          {validation.canPublish ? "Ready to publish" : "Fix required items before publishing"}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {validation.errorCount} errors, {validation.warningCount} warnings
                        </p>
                      </div>

                      <div className="space-y-2">
                        {validation.checks.map((check) => {
                          const badge = validationBadge(check.status);
                          const Icon = check.status === "pass" ? CheckCircle2 : AlertCircle;
                          return (
                            <div key={check.key} className="rounded-xl border border-border p-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-2">
                                  <Icon
                                    size={16}
                                    className={check.status === "pass" ? "mt-0.5 text-green-600" : check.status === "warning" ? "mt-0.5 text-amber-600" : "mt-0.5 text-red-600"}
                                  />
                                  <div>
                                    <p className="text-sm font-medium text-foreground">{check.label}</p>
                                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{check.detail}</p>
                                  </div>
                                </div>
                                <Badge variant="outline" className={badge.className}>
                                  {badge.label}
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="rounded-xl border border-border px-4 py-6 text-sm text-muted-foreground">
                      Validation will appear here as you edit the post.
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Publishing Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Published posts automatically receive BlogPosting schema.</p>
                  <p>FAQ schema is included when the FAQ toggle is enabled and questions are filled.</p>
                  <p>Published posts are added to the sitemap automatically. Drafts stay out of the sitemap.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {loadingPost ? (
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="animate-spin" size={16} />
              Loading selected post…
            </div>
          ) : null}
        </div>
      </AdminShell>
    </>
  );
};

const CalendarIcon = () => <span className="mr-2 text-sm">📅</span>;

export default BlogAdmin;
