import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";
import {
  NAV_LINKS,
  SITE_NAME,
  SITE_DESCRIPTION,
  SOCIAL_LINKS,
  FOOTER_RESOURCES,
} from "@/lib/constants";

const SOCIAL_ICONS = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
} as const;

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white to-slate-50 dark:from-surface-900 dark:to-surface-900">
      <div className="divider-gradient absolute top-0 left-0" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <span className="font-display text-xl font-bold tracking-tight text-brand-500">
              {SITE_NAME}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {SITE_DESCRIPTION}
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-2">
              {Object.entries(SOCIAL_LINKS).map(([name, href]) => {
                const Icon = SOCIAL_ICONS[name as keyof typeof SOCIAL_ICONS];
                return (
                  <a
                    key={name}
                    href={href}
                    aria-label={name}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-brand-500/10 hover:text-brand-500"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="micro-label">Navigation</h3>
            <ul className="mt-4 space-y-2.5">
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

          {/* Resources */}
          <div>
            <h3 className="micro-label">Resources</h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_RESOURCES.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="micro-label">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>info@risegov.com</li>
              <li>(202) 555-0142</li>
              <li>Washington, DC 20001</li>
            </ul>
          </div>
        </div>

        <div className="divider-gradient my-10" />

        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
