import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CTASection({
  title,
  subtitle,
  ctaText = "Get Started",
  ctaHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-600 to-brand-800 px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-brand-400)_0%,_transparent_70%)] opacity-10" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-4 text-lg text-brand-100">{subtitle}</p>}
        <Button
          asChild
          size="lg"
          className="mt-8 bg-white text-brand-700 hover:bg-brand-50"
        >
          <Link href={ctaHref}>{ctaText}</Link>
        </Button>
      </div>
    </section>
  );
}
