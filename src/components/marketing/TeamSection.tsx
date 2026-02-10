"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/motion";

const TEAM = [
  {
    name: "Sarah Chen",
    initials: "SC",
    role: "Chief Executive Officer",
    bio: "Former DoD program manager with 15 years of federal contracting experience.",
  },
  {
    name: "Marcus Williams",
    initials: "MW",
    role: "Chief Technology Officer",
    bio: "Led engineering teams at two govtech unicorns before co-founding RISE.",
  },
  {
    name: "Lisa Torres",
    initials: "LT",
    role: "VP of Operations",
    bio: "Specializes in large-scale workforce management for CONUS and OCONUS contracts.",
  },
];

export function TeamSection() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label="Leadership" title="Meet the Team" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, i) => (
            <BlurFade key={member.name} delay={0.1 + i * 0.15} inView>
              <div className="glass-panel p-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/10">
                <div className="avatar-gradient mx-auto flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold text-white shadow-lg ring-2 ring-white/10">
                  {member.initials}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {member.name}
                </h3>
                <p className="text-sm text-brand-400">{member.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
