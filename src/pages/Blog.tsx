import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, User } from "lucide-react";

import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import { Button } from "@/components/ui/button";
import { useInitialData } from "@/contexts/InitialDataContext";
import { useSiteUrl } from "@/contexts/useSiteUrl";
import { fetchPublicBlogData } from "@/lib/blog-api";
import type { BlogPostSummary } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";

const resolveAbsoluteUrl = (value: string | undefined, siteUrl: string) => {
  if (!value) return undefined;

  try {
    return new URL(value).toString();
  } catch {
    const normalizedPath = value.startsWith("/") ? value : `/${value}`;
    return new URL(normalizedPath, `${siteUrl.replace(/\/$/, "")}/`).toString();
  }
};

const Blog = () => {
  const initialData = useInitialData();
  const siteUrl = useSiteUrl() || "https://cellivo.com";
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState<BlogPostSummary[]>(initialData.blogIndex?.posts ?? []);
  const [categories, setCategories] = useState<string[]>(initialData.blogIndex?.categories ?? ["All"]);
  const [isLoading, setIsLoading] = useState(!(initialData.blogIndex?.posts?.length > 0));
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (initialData.blogIndex?.posts?.length) {
      setPosts(initialData.blogIndex.posts);
      setCategories(initialData.blogIndex.categories);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    fetchPublicBlogData()
      .then((response) => {
        if (cancelled) return;
        setPosts(response.posts);
        setCategories(response.categories);
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [initialData.blogIndex]);

  const filteredPosts = useMemo(
    () => (activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory)),
    [activeCategory, posts],
  );

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Cellivo Blog",
    url: "https://cellivo.com/blog",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://cellivo.com/blog/${post.slug}`,
      datePublished: post.publishDate,
      author: {
        "@type": "Organization",
        name: post.author,
      },
      description: post.excerpt,
      image: resolveAbsoluteUrl(post.featuredImage, siteUrl),
    })),
  };

  return (
    <Layout>
      <SEOHead
        title="Phone Shop POS Blog & Guides | Cellivo"
        description="Phone shop POS guides for billing, inventory, IMEI tracking, repairs, and growth. Learn how mobile retailers run smarter with Cellivo."
        canonical="https://cellivo.com/blog"
        structuredData={blogStructuredData}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-header-label">Blog</span>
            <h1 className="mt-3 mb-6 text-3xl font-heading font-bold leading-[1.1] text-foreground sm:text-4xl md:text-5xl">
              Tips & Guides for <span className="text-primary">Phone Shop Owners</span>
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Expert advice on POS systems, IMEI-based stock control, repair management, and growing your mobile retail business.
            </p>
          </div>
        </div>
      </section>

      <SectionWrapper className="pt-0 pb-10 md:pb-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-primary/15 bg-primary/5 px-6 py-6 shadow-sm md:px-8 md:py-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                Looking for the full{" "}
                <Link to="/mobile-shop-pos-system" className="text-primary hover:underline">
                  mobile shop POS system
                </Link>{" "}
                or a sales-focused{" "}
                <Link to="/pos-system-for-phone-shop" className="text-primary hover:underline">
                  POS system for phone shop
                </Link>{" "}
                checkout workflow? Use the guides below, then jump into the right product page.
              </p>
              <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                <Link to="/mobile-shop-pos-system" className="w-full md:w-auto">
                  <Button variant="outline" className="h-11 w-full rounded-xl px-6 text-sm font-medium md:w-auto">
                    View Full POS System <ArrowRight className="ml-2" size={15} />
                  </Button>
                </Link>
                <Link to="/pos-system-for-phone-shop" className="w-full md:w-auto">
                  <Button variant="ghost" className="h-11 w-full rounded-xl px-6 text-sm font-medium md:w-auto">
                    View POS for Phone Shops
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <div className="container mx-auto mb-10 px-4 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <SectionWrapper className="pt-0">
        {isLoading ? (
          <div className="py-16 text-center text-muted-foreground">Loading blog posts…</div>
        ) : loadError ? (
          <div className="py-16 text-center text-muted-foreground">
            We couldn&apos;t load the blog right now. Please try again in a moment.
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/25 hover:shadow-md"
                >
                  {post.featuredImage ? (
                    <div className="aspect-[16/10] overflow-hidden bg-secondary">
                      <img
                        src={post.featuredImage}
                        alt={post.featuredImageAlt || post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-primary/10 via-secondary to-background px-6 text-center">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        Cellivo Guide
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full bg-primary/8 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatBlogDate(post.publishDate)}</span>
                    </div>
                    <h2 className="mb-3 line-clamp-3 text-lg font-heading font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-foreground/70">
                      <span className="flex items-center gap-1">
                        <User size={12} /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-muted-foreground">No posts in this category yet.</div>
        )}
      </SectionWrapper>

      <SectionWrapper>
        <div className="mx-auto max-w-3xl rounded-2xl bg-foreground p-10 text-center md:p-16">
          <h2 className="mb-4 text-2xl font-heading font-bold text-background md:text-3xl">
            Ready to Try Cellivo?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-background/50">
            Start managing your phone shop with the POS system built for mobile retail.
          </p>
          <Link to="/pricing">
            <Button size="lg" className="rounded-xl bg-background px-8 font-medium text-foreground hover:bg-background/90">
              Start Free Trial <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default Blog;
