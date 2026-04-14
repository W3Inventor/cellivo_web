import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User } from "lucide-react";
import { blogPosts, blogCategories, formatBlogDate } from "@/data/blogData";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <SEOHead
        title="Blog — Phone Shop POS Tips & Guides | Cellivo"
        description="Expert tips, guides, and best practices for running a mobile phone shop. POS billing, IMEI-based stock control, repair management, and more."
        canonical="https://cellivo.lovable.app/blog"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <span className="section-header-label">Blog</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-3 mb-6 text-foreground leading-[1.1]">
              Tips & Guides for <span className="text-primary">Phone Shop Owners</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Expert advice on POS systems, IMEI-based stock control, repair management, and growing your mobile retail business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="container mx-auto px-4 lg:px-8 mb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <SectionWrapper className="pt-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block bg-card border border-border rounded-xl overflow-hidden hover-lift h-full"
              >
                {/* Colored header bar */}
                <div className="h-2 bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/8 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatBlogDate(post.date)}</span>
                  </div>
                  <h2 className="font-heading font-semibold text-foreground text-base mb-2 leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground/60">
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No posts in this category yet.</p>
          </div>
        )}
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="bg-foreground rounded-2xl p-10 md:p-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-background mb-4">
            Ready to Try Cellivo?
          </h2>
          <p className="text-background/50 mb-8 max-w-lg mx-auto">
            Start managing your phone shop with the POS system built for mobile retail.
          </p>
          <Link to="/signup">
            <Button size="lg" className="rounded-xl font-medium px-8 bg-background text-foreground hover:bg-background/90">
              Start Free Trial <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </Layout>
  );
};

export default Blog;
