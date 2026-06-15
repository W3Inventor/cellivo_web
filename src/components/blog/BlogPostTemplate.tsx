import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, ExternalLink, User } from "lucide-react";

import type { BlogPostRecord, BlogPostSummary } from "@/lib/blog";
import { formatBlogDate, renderBlogMarkdown } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface BlogPostTemplateProps {
  post: BlogPostRecord;
  relatedPosts: BlogPostSummary[];
  prevPost?: BlogPostSummary | null;
  nextPost?: BlogPostSummary | null;
  previewMode?: boolean;
}

const relatedPageLabels: Record<string, string> = {
  "/mobile-shop-pos-system": "Mobile Shop POS System",
  "/pos-system-for-phone-shop": "POS System for Phone Shops",
  "/pricing": "Pricing Plans",
  "/billing-software-for-mobile-shop": "Billing Software for Mobile Shops",
  "/imei-tracking-pos-system": "IMEI Tracking System",
  "/mobile-repair-management-software": "Repair Management Software",
  "/inventory-management-system": "Inventory Management System",
  "/multi-branch-pos-system": "Multi-Branch POS System",
  "/cash-drawer-management": "Cash Drawer Management",
  "/customer-loyalty-system": "Customer Loyalty System",
};

const formatRelatedPageLabel = (url: string) =>
  relatedPageLabels[url] ||
  url
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/^\/|\/$/g, "")
    .split("/")
    .pop()
    ?.split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") ||
  "Related page";

const BlogPostTemplate = ({
  post,
  relatedPosts,
  prevPost,
  nextPost,
  previewMode = false,
}: BlogPostTemplateProps) => {
  const relatedPageUrls = Array.from(new Set([...post.relatedProductPageUrls, ...post.relatedFeaturePageUrls]));
  const hasPostNavigation = Boolean(prevPost || nextPost);

  return (
    <>
      <section className="pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="container mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            to={previewMode ? "/admin/blog" : "/blog"}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            {previewMode ? "Back to Blog Admin" : "Back to Blog"}
          </Link>

          {previewMode ? (
            <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Preview mode
            </div>
          ) : null}

          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-primary/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
              {post.category}
            </span>
          </div>

          <h1 className="mb-5 text-2xl font-heading font-bold leading-[1.15] text-foreground sm:text-3xl md:text-4xl">
            {post.title}
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User size={14} /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {formatBlogDate(post.publishDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {post.featuredImage ? (
        <section className="pb-10">
          <div className="container mx-auto max-w-4xl px-4 lg:px-8">
            <div className="overflow-hidden rounded-2xl border border-border bg-secondary/40">
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt}
                className="h-auto w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-16">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <article
            className="cellivo-blog-content prose prose-slate prose-lg max-w-none rounded-[2rem] border border-border bg-white px-5 py-7 shadow-sm md:px-10 md:py-10
              prose-headings:scroll-mt-28 prose-headings:font-heading prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h1:mb-5 prose-h1:mt-10 prose-h1:text-3xl prose-h1:leading-tight md:prose-h1:text-4xl
              prose-h2:mb-4 prose-h2:mt-12 prose-h2:border-b prose-h2:border-border prose-h2:pb-3 prose-h2:text-2xl prose-h2:leading-tight md:prose-h2:text-3xl
              prose-h3:mb-3 prose-h3:mt-9 prose-h3:text-xl prose-h3:leading-snug md:prose-h3:text-2xl
              prose-h4:mb-2 prose-h4:mt-7 prose-h4:text-lg prose-h4:leading-snug
              prose-h5:mb-2 prose-h5:mt-6 prose-h5:text-base prose-h5:font-semibold
              prose-h6:mb-2 prose-h6:mt-6 prose-h6:text-sm prose-h6:font-semibold prose-h6:uppercase prose-h6:tracking-[0.16em] prose-h6:text-primary
              prose-p:my-5 prose-p:text-[1.02rem] prose-p:leading-8 prose-p:text-muted-foreground
              prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:font-semibold prose-strong:text-foreground
              prose-em:text-foreground
              prose-ul:my-6 prose-ul:list-disc prose-ul:space-y-2 prose-ul:pl-7
              prose-ol:my-6 prose-ol:list-decimal prose-ol:space-y-2 prose-ol:pl-7
              prose-li:pl-1 prose-li:leading-7 prose-li:text-muted-foreground
              prose-li:marker:text-primary
              prose-blockquote:my-8 prose-blockquote:rounded-2xl prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:px-6 prose-blockquote:py-5 prose-blockquote:text-foreground prose-blockquote:not-italic
              prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:font-medium prose-code:text-slate-900
              prose-pre:my-8 prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:bg-slate-950 prose-pre:p-5 prose-pre:text-sm prose-pre:leading-7
              prose-img:my-8 prose-img:w-full prose-img:rounded-2xl prose-img:border prose-img:border-border prose-img:shadow-sm
              prose-figure:my-8
              prose-figcaption:mt-3 prose-figcaption:text-center prose-figcaption:text-xs prose-figcaption:text-muted-foreground
              prose-hr:my-10 prose-hr:border-border
              prose-table:my-8 prose-table:w-full prose-table:overflow-hidden prose-table:rounded-2xl prose-table:text-sm
              prose-thead:border-b prose-thead:border-border
              prose-th:bg-slate-50 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-foreground
              prose-td:border-t prose-td:border-border prose-td:px-4 prose-td:py-3 prose-td:text-muted-foreground
              [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
              [&_.callout]:rounded-2xl [&_.callout]:border [&_.callout]:border-primary/15 [&_.callout]:bg-primary/5 [&_.callout]:p-5
              [&_.note]:rounded-2xl [&_.note]:border [&_.note]:border-slate-200 [&_.note]:bg-slate-50 [&_.note]:p-5
              [&_iframe]:my-8 [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded-2xl [&_iframe]:border [&_iframe]:border-border"
            dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(post.content) }}
          />
        </div>
      </section>

      {post.faqEnabled && post.faqs.length > 0 ? (
        <section className="pb-16">
          <div className="container mx-auto max-w-3xl px-4 lg:px-8">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="mb-2 text-2xl font-heading font-semibold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Answers to common questions related to this topic.
              </p>

              <Accordion type="single" collapsible className="w-full">
                {post.faqs.map((faq, index) => (
                  <AccordionItem key={`${faq.question}-${index}`} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      ) : null}

      {relatedPageUrls.length > 0 ? (
        <section className="pb-16">
          <div className="container mx-auto max-w-3xl px-4 lg:px-8">
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6 md:p-8">
              <h2 className="mb-3 text-xl font-heading font-semibold text-foreground">
                Explore Related Cellivo Pages
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Continue from this guide into the product pages most relevant to this topic.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {relatedPageUrls.map((url) => (
                  <Link
                    key={url}
                    to={url}
                    className="group flex items-center justify-between rounded-xl border border-primary/10 bg-white px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <span>{formatRelatedPageLabel(url)}</span>
                    <ExternalLink size={15} className="shrink-0 text-primary/70 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {hasPostNavigation ? (
        <section className="pb-16">
          <div className="container mx-auto max-w-3xl px-4 lg:px-8">
            <div className="grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  className="group rounded-xl border border-border p-4 transition-colors hover:border-primary/30"
                >
                  <span className="mb-1 flex items-center gap-1 text-xs text-muted-foreground/60">
                    <ArrowLeft size={12} /> Previous
                  </span>
                  <span className="line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="group rounded-xl border border-border p-4 text-right transition-colors hover:border-primary/30"
                >
                  <span className="mb-1 flex items-center justify-end gap-1 text-xs text-muted-foreground/60">
                    Next <ArrowRight size={12} />
                  </span>
                  <span className="line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {nextPost.title}
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {relatedPosts.length > 0 ? (
        <section className="pb-20">
          <div className="container mx-auto max-w-3xl px-4 lg:px-8">
            <h3 className="mb-5 text-lg font-heading font-semibold text-foreground">Related Articles</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="group rounded-xl border border-border p-5 transition-colors hover:border-primary/30 hover-lift"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {relatedPost.category}
                  </span>
                  <h4 className="mt-1.5 mb-1.5 line-clamp-2 text-sm font-heading font-semibold text-foreground transition-colors group-hover:text-primary">
                    {relatedPost.title}
                  </h4>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{relatedPost.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl bg-foreground p-10 text-center md:p-14">
            <h2 className="mb-4 text-2xl font-heading font-bold text-background md:text-3xl">
              Turn This Insight Into Action
            </h2>
            <p className="mx-auto mb-6 max-w-md text-sm text-background/60">
              Explore the full Cellivo platform and see how billing, inventory, repairs, and customer
              workflows stay connected in one system.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/mobile-shop-pos-system">
                <Button size="lg" className="rounded-xl bg-background px-8 font-medium text-foreground hover:bg-background/90">
                  View Full POS System
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-background/20 bg-transparent px-8 font-medium text-background hover:bg-background/10 hover:text-background"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPostTemplate;
