import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPost, blogPosts, formatBlogDate } from "@/data/blogData";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) return <NotFound />;

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <Layout>
      <SEOHead
        title={`${post.title} | Cellivo Blog`}
        description={post.excerpt}
        canonical={`https://cellivo.lovable.app/blog/${post.slug}`}
      />

      {/* Header */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/8 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground leading-[1.15] mb-5">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatBlogDate(post.date)}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:text-foreground prose-headings:font-semibold
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-li:text-muted-foreground
              prose-strong:text-foreground prose-strong:font-semibold
              prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-blockquote:not-italic
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />
        </div>
      </section>

      {/* Prev/Next Navigation */}
      <section className="pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="border-t border-border pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link to={`/blog/${prevPost.slug}`} className="group p-4 rounded-xl border border-border hover:border-primary/30 transition-colors">
                <span className="text-xs text-muted-foreground/60 flex items-center gap-1 mb-1"><ArrowLeft size={12} /> Previous</span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{prevPost.title}</span>
              </Link>
            ) : <div />}
            {nextPost && (
              <Link to={`/blog/${nextPost.slug}`} className="group p-4 rounded-xl border border-border hover:border-primary/30 transition-colors text-right">
                <span className="text-xs text-muted-foreground/60 flex items-center justify-end gap-1 mb-1">Next <ArrowRight size={12} /></span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{nextPost.title}</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pb-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <h3 className="font-heading font-semibold text-foreground text-lg mb-5">Related Articles</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} to={`/blog/${rp.slug}`} className="group p-5 rounded-xl border border-border hover:border-primary/30 hover-lift transition-colors">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">{rp.category}</span>
                  <h4 className="font-heading font-semibold text-foreground text-sm mt-1.5 mb-1.5 group-hover:text-primary transition-colors line-clamp-2">{rp.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{rp.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-foreground rounded-2xl p-10 md:p-14 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-background mb-4">
              Try Cellivo Free Today
            </h2>
            <p className="text-background/50 mb-6 max-w-md mx-auto text-sm">
              The POS system built specifically for phone shops. No credit card required.
            </p>
            <Link to="/signup">
              <Button size="lg" className="rounded-xl font-medium px-8 bg-background text-foreground hover:bg-background/90">
                Start Free Trial <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

/** Simple markdown-to-HTML converter for blog content */
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^(?!<[hublop])((?!^\s*$).+)$/gm, '<p>$1</p>')
    .replace(/<p><li>/g, '<li>')
    .replace(/<\/li><\/p>/g, '</li>');
}

export default BlogPost;
