import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AdminShell from "@/components/admin/AdminShell";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import BlogPostTemplate from "@/components/blog/BlogPostTemplate";
import { useInitialData } from "@/contexts/InitialDataContext";
import { fetchAdminPost, fetchAdminPosts } from "@/lib/blog-api";
import type { BlogPostRecord, BlogPostSummary } from "@/lib/blog";
import NotFound from "./NotFound";

const BlogAdminPreview = () => {
  const { id = "" } = useParams<{ id: string }>();
  const numericId = Number(id);
  const initialData = useInitialData();
  const initialPost =
    initialData.adminPreviewPost && initialData.adminPreviewPost.id === numericId
      ? initialData.adminPreviewPost
      : null;
  const [post, setPost] = useState<BlogPostRecord | null>(initialPost);
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(!initialPost);

  useEffect(() => {
    let cancelled = false;

    fetchAdminPosts()
      .then((response) => {
        if (!cancelled) {
          setPosts(response.posts);
        }
      })
      .catch(() => undefined);

    if (initialPost) {
      setIsLoading(false);
      return () => {
        cancelled = true;
      };
    }

    if (!Number.isFinite(numericId)) {
      setIsLoading(false);
      setPost(null);
      return () => {
        cancelled = true;
      };
    }

    fetchAdminPost(numericId)
      .then((response) => {
        if (!cancelled) {
          setPost(response.post);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPost(null);
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
  }, [initialPost, numericId]);

  const currentIndex = useMemo(
    () => posts.findIndex((item) => item.slug === post?.slug),
    [post?.slug, posts],
  );
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    if (post.relatedPostIds.length > 0) {
      const matches = posts.filter((item) => post.relatedPostIds.includes(item.id) && item.slug !== post.slug);
      if (matches.length > 0) return matches.slice(0, 3);
    }
    return posts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);
  }, [post, posts]);

  if (isLoading) {
    return (
      <>
        <SEOHead
          title="Blog Preview | Cellivo"
          description="Previewing a blog draft in the Cellivo admin."
          canonical={`https://cellivo.com/admin/blog/preview/${id}`}
          noindex
        />
        <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-600">
          Loading preview…
        </div>
      </>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  return (
    <>
      <SEOHead
        title={`Preview: ${post.title} | Cellivo`}
        description={post.excerpt}
        canonical={`https://cellivo.com/admin/blog/preview/${post.id}`}
        noindex
      />
      <AdminShell
        title="Draft Preview"
        description="Preview the article using the same reusable template your public blog uses."
        actions={
          <Link to="/admin/blog">
            <Button variant="outline" className="rounded-xl">Back to editor</Button>
          </Link>
        }
      >
        <BlogPostTemplate
          post={post}
          relatedPosts={relatedPosts}
          prevPost={prevPost}
          nextPost={nextPost}
          previewMode
        />
      </AdminShell>
    </>
  );
};

export default BlogAdminPreview;
