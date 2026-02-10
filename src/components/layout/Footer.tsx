import Link from "next/link";
import {
  NAV_LINKS,
  SITE_NAME,
  SITE_DESCRIPTION,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white dark:bg-surface-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="text-xl font-bold tracking-tight text-brand-500">
              {SITE_NAME}
            </span>
            <p className="mt-2 text-sm text-muted-foreground">
              {SITE_DESCRIPTION}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </h3>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </h3>
            <ul className="mt-3 space-y-2">
              {Object.entries(SOCIAL_LINKS).map(([name, href]) => (
                <li key={name}>
                  <a
                    href={href}
                    className="text-sm capitalize text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 opacity-10" />

        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
