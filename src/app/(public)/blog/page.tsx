"use client";

import { Hero } from "@/components/marketing/Hero";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BLOG_POSTS } from "@/lib/constants";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { RetroGrid } from "@/components/magicui/retro-grid";

const CARD_GRADIENTS = [
  ["from-brand-500", "to-brand-700"],
  ["from-brand-600", "to-cyan-600"],
  ["from-cyan-500", "to-brand-600"],
  ["from-brand-700", "to-brand-900"],
  ["from-brand-400", "to-cyan-500"],
] as const;

const [featured, ...rest] = BLOG_POSTS;

export default function BlogPage() {
  return (
    <>
      <Hero
        title="Insights & Updates"
        subtitle="Product news, operational best practices, and data-driven strategy from the RISE team."
        gradient
      />

      {/* Featured Post */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0}>
            <div className="glass-panel-md overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-brand-600 to-brand-900">
                <div className="bg-grid-dots absolute inset-0 opacity-40" />
              </div>
              <div className="p-8">
                <Badge
                  variant="secondary"
                  className="bg-brand-500/10 text-brand-400"
                >
                  {featured.category}
                </Badge>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
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
          </BlurFade>
        </div>
      </section>

      {/* Post Grid */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => {
              const [gradFrom, gradTo] =
                CARD_GRADIENTS[i % CARD_GRADIENTS.length];
              return (
                <BlurFade key={post.title} delay={i * 0.1}>
                  <article className="group glass-panel overflow-hidden transition-all duration-300 hover:border-brand-500/30 hover:scale-[1.01]">
                    <div
                      className={`relative h-48 rounded-t-2xl bg-gradient-to-br ${gradFrom} ${gradTo}`}
                    >
                      <div className="bg-grid-dots absolute inset-0 opacity-40" />
                    </div>
                    <div className="p-6">
                      <Badge
                        variant="secondary"
                        className="bg-brand-500/10 text-brand-400"
                      >
                        {post.category}
                      </Badge>
                      <h3 className="mt-3 font-display text-lg font-semibold group-hover:text-brand-400">
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
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <RetroGrid className="opacity-30" />
        <div className="relative mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Stay in the loop
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join 2,500+ government contractors who get our weekly insights.
          </p>
          <div className="mt-8 flex gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="you@agency.gov"
              className="flex-1"
            />
            <ShimmerButton
              background="rgba(37, 99, 235, 1)"
              className="shrink-0"
            >
              <span className="text-sm font-medium">Subscribe</span>
            </ShimmerButton>
          </div>
        </div>
      </section>
    </>
  );
}
