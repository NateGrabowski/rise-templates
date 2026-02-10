import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  gradient?: boolean;
  className?: string;
}

export function Hero({
  title,
  subtitle,
  children,
  gradient = false,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8",
        gradient &&
          "bg-gradient-to-br from-surface-900 via-brand-950 to-surface-900 text-white dark:from-surface-900 dark:via-brand-950 dark:to-surface-900",
        className,
      )}
    >
      {gradient && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-brand-500)_0%,_transparent_50%)] opacity-15" />
      )}
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
