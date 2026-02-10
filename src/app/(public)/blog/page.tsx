import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog — RISE",
  description:
    "Insights, product updates, and operational strategy from the RISE team.",
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      {/* Hero */}
      <Hero
        title="Insights & Updates"
        subtitle="Product news, operational best practices, and data-driven strategy from the RISE team."
        gradient
      />

      {/* Featured Post */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="aspect-video bg-surface-700" />
            <div className="p-8">
              <Badge
                variant="secondary"
                className="bg-brand-500/10 text-brand-400"
              >
                {featured.category}
              </Badge>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {featured.author}
                </span>
                <span>&middot;</span>
                <span>{featured.date}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post Grid */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <article
                key={post.title}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-brand-500/30"
              >
                <div className="aspect-video bg-surface-700" />
                <div className="p-6">
                  <Badge
                    variant="secondary"
                    className="bg-brand-500/10 text-brand-400"
                  >
                    {post.category}
                  </Badge>
                  <h3 className="mt-3 text-lg font-semibold group-hover:text-brand-400">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {post.author}
                    </span>
                    <span>&middot;</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
