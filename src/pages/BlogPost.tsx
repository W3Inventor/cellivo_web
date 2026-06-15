import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import BlogPostTemplate from "@/components/blog/BlogPostTemplate";
import { useInitialData } from "@/contexts/InitialDataContext";
import { useSiteUrl } from "@/contexts/useSiteUrl";
import { fetchPublicBlogData, fetchPublicBlogPost } from "@/lib/blog-api";
import type { BlogPostRecord, BlogPostSummary } from "@/lib/blog";
import NotFound from "./NotFound";

const resolveAbsoluteUrl = (value: string | undefined, siteUrl: string) => {
  if (!value) return undefined;

  try {
    return new URL(value).toString();
  } catch {
    const normalizedPath = value.startsWith("/") ? value : `/${value}`;
    return new URL(normalizedPath, `${siteUrl.replace(/\/$/, "")}/`).toString();
  }
};

const BlogPost = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const initialData = useInitialData();
  const siteUrl = useSiteUrl() || "https://cellivo.com";
  const initialPost = initialData.blogPost?.slug === slug ? initialData.blogPost : null;
  const [post, setPost] = useState<BlogPostRecord | null>(initialPost);
  const [posts, setPosts] = useState<BlogPostSummary[]>(initialData.blogIndex?.posts ?? []);
  const [isLoading, setIsLoading] = useState(!initialPost);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (initialPost) {
      setPost(initialPost);
      setIsLoading(false);
    } else if (slug) {
      setIsLoading(true);
      fetchPublicBlogPost(slug)
        .then((response) => {
          if (!cancelled) {
            setPost(response.post);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setPost(null);
            setLoadError(true);
          }
        })
        .finally(() => {
          if (!cancelled) {
            setIsLoading(false);
          }
        });
    }

    if (initialData.blogIndex?.posts?.length) {
      setPosts(initialData.blogIndex.posts);
    } else {
      fetchPublicBlogData()
        .then((response) => {
          if (!cancelled) {
            setPosts(response.posts);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setLoadError(true);
          }
        });
    }

    return () => {
      cancelled = true;
    };
  }, [initialData.blogIndex, initialPost, slug]);

  const currentIndex = useMemo(
    () => posts.findIndex((item) => item.slug === post?.slug),
    [post?.slug, posts],
  );
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const relatedPosts = useMemo(() => {
    if (!post) return [];

    if (post.relatedPostIds.length > 0) {
      const relatedById = posts.filter((item) => post.relatedPostIds.includes(item.id) && item.slug !== post.slug);
      if (relatedById.length > 0) return relatedById.slice(0, 3);
    }

    return posts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);
  }, [post, posts]);

  if (isLoading) {
    return (
      <Layout>
        <section className="pt-32 pb-24 text-center text-muted-foreground">Loading article…</section>
      </Layout>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const blogPostStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.metaDescription || post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Cellivo",
      url: "https://cellivo.com",
    },
    datePublished: post.publishDate,
    dateModified: post.updatedAt,
    mainEntityOfPage: `https://cellivo.com/blog/${post.slug}`,
    url: `https://cellivo.com/blog/${post.slug}`,
    image: resolveAbsoluteUrl(post.seo.ogImage || post.featuredImage, siteUrl),
    articleSection: post.category,
    keywords: [post.seo.focusKeyword, ...post.seo.secondaryKeywords].filter(Boolean).join(", "),
  };

  const faqStructuredData =
    post.faqEnabled && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <Layout>
      <SEOHead
        title={post.seo.seoTitle || post.title}
        description={post.seo.metaDescription || post.excerpt}
        canonical={post.seo.canonicalUrl || `https://cellivo.com/blog/${post.slug}`}
        robots={post.seo.robotsSetting?.replace(",", ", ")}
        ogTitle={post.seo.ogTitle || post.title}
        ogDescription={post.seo.ogDescription || post.excerpt}
        ogUrl={`https://cellivo.com/blog/${post.slug}`}
        ogImage={post.seo.ogImage || post.featuredImage}
        twitterTitle={post.seo.twitterTitle || post.seo.ogTitle || post.title}
        twitterDescription={post.seo.twitterDescription || post.seo.ogDescription || post.excerpt}
        twitterImage={post.seo.twitterImage || post.seo.ogImage || post.featuredImage}
        structuredData={faqStructuredData ? [blogPostStructuredData, faqStructuredData] : [blogPostStructuredData]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      {loadError && !initialPost ? (
        <div className="px-4 pt-28 text-center text-sm text-amber-600">
          We had trouble refreshing supporting blog data, but the article content is still available.
        </div>
      ) : null}

      <BlogPostTemplate post={post} relatedPosts={relatedPosts} prevPost={prevPost} nextPost={nextPost} />
    </Layout>
  );
};

export default BlogPost;
