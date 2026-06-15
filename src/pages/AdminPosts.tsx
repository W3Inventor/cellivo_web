import { useEffect, useState } from "react";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import SEOHead from "@/components/SEOHead";
import AdminShell from "@/components/admin/AdminShell";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteAdminPost, fetchAdminPosts } from "@/lib/blog-api";
import { useInitialData } from "@/contexts/InitialDataContext";
import type { BlogPostSummary, BlogStatus } from "@/lib/blog";

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

const AdminPosts = () => {
  const initialData = useInitialData();
  const [posts, setPosts] = useState<BlogPostSummary[]>(initialData.adminBlog?.posts ?? []);
  const [loading, setLoading] = useState(!initialData.adminBlog);
  const [error, setError] = useState<string | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<number | null>(null);

  useEffect(() => {
    if (initialData.adminBlog) return;

    fetchAdminPosts()
      .then((response) => setPosts(response.posts))
      .catch(() => setError("We couldn't load the blog posts right now."))
      .finally(() => setLoading(false));
  }, [initialData.adminBlog]);

  const handleDeletePost = async (post: BlogPostSummary) => {
    setDeletingPostId(post.id);
    setError(null);

    try {
      await deleteAdminPost(post.id);
      setPosts((currentPosts) => currentPosts.filter((currentPost) => currentPost.id !== post.id));
    } catch {
      setError(`We couldn't delete "${post.title}" right now. Please try again.`);
    } finally {
      setDeletingPostId(null);
    }
  };

  return (
    <>
      <SEOHead
        title="All Posts | Cellivo Admin"
        description="Manage existing blog posts in the Cellivo admin dashboard."
        canonical="https://cellivo.com/admin/posts"
        noindex
      />
      <AdminShell
        title="All Blog Posts"
        description="Browse, edit, and preview every blog article from one place."
        actions={
          <Link to="/admin/blog">
            <Button className="rounded-xl">Create New Post</Button>
          </Link>
        }
      >
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Published, scheduled, and draft content</CardTitle>
            <CardDescription>Choose a post to continue editing or preview it in a new tab.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                Loading posts…
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
                {error}
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="truncate text-base font-semibold text-slate-950">{post.title}</p>
                        <Badge variant={statusBadgeVariant(post.status)}>{post.status}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">/{post.slug}</p>
                      <p className="mt-2 text-sm text-slate-600">
                        {post.publishDate.slice(0, 10)} · {post.category || "Uncategorized"} · {post.author}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Link to={`/admin/blog?post=${post.id}`}>
                        <Button variant="outline" className="rounded-xl">
                          <SquarePen className="mr-2" size={16} />
                          Edit Post
                        </Button>
                      </Link>
                      <Link to={`/admin/blog/preview/${post.id}`} target="_blank" rel="noreferrer">
                        <Button className="rounded-xl">
                          <Eye className="mr-2" size={16} />
                          Preview
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            variant="destructive"
                            className="rounded-xl"
                            disabled={deletingPostId === post.id}
                          >
                            <Trash2 className="mr-2" size={16} />
                            {deletingPostId === post.id ? "Deleting..." : "Delete"}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this blog post?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{post.title}" from the admin, blog listing, sitemap, and
                              public post page. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => handleDeletePost(post)}
                            >
                              Delete Post
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}

                {posts.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                    No posts yet. Create your first blog post to get started.
                  </div>
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>
      </AdminShell>
    </>
  );
};

export default AdminPosts;
