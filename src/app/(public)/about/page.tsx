import type { Metadata } from "next";
import { Eye, Shield, Zap, Layers } from "lucide-react";
import { Hero } from "@/components/marketing/Hero";
import { CompanyTimeline } from "@/components/marketing/CompanyTimeline";
import { TeamSection } from "@/components/marketing/TeamSection";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/motion";

export const metadata: Metadata = {
  title: "About — RISE",
  description:
    "Learn about the RISE mission: delivering real-time operational visibility for government contractors.",
};

const VALUES = [
  {
    icon: Eye,
    title: "Visibility",
    description:
      "Comprehensive, real-time insight into every region, position, and pipeline stage.",
  },
  {
    icon: Shield,
    title: "Security",
    description:
      "FedRAMP-aligned infrastructure with end-to-end encryption and role-based access controls.",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description:
      "Automate manual workflows to reduce time-to-fill and eliminate data silos across teams.",
  },
  {
    icon: Layers,
    title: "Scalability",
    description:
      "From a single region to nationwide operations, RISE scales with your mission requirements.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        background="lamp"
        title="About RISE"
        subtitle="We're on a mission to bring real-time operational visibility to the government contracting workforce."
      />

      {/* Mission */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <BlurFade delay={0} inView>
              <p className="micro-label mb-4">Our Purpose</p>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Our Mission
              </h2>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Government contractors manage thousands of positions across
                multiple regions, each with unique compliance requirements,
                clearance timelines, and onboarding processes. Yet most still
                rely on spreadsheets and siloed systems to track their workforce
                pipeline.
              </p>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                RISE was built to change that. Our platform consolidates
                regional staffing data into a single source of truth, giving
                program managers the visibility they need to make faster,
                smarter decisions and keep their contracts fully staffed.
              </p>
            </BlurFade>
          </div>
          <BlurFade delay={0.3} inView>
            <div className="glass-panel-strong overflow-hidden p-4">
              {/* Fake mini-UI dashboard preview */}
              <div className="flex items-center gap-1.5 pb-3">
                <div className="h-2.5 w-2.5 rounded-full bg-status-error" />
                <div className="h-2.5 w-2.5 rounded-full bg-status-warning" />
                <div className="h-2.5 w-2.5 rounded-full bg-status-success" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-8 rounded bg-brand-500/10" />
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-12 rounded bg-brand-500/5" />
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <CompanyTimeline />

      {/* Values */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading label="What Drives Us" title="Our Values" />
          <div className="grid gap-6 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <BlurFade key={value.title} delay={0.1 + i * 0.1} inView>
                <div className="glass-panel p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <TeamSection />
    </>
  );
}
