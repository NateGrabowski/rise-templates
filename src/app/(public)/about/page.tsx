import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { Eye, Shield, Zap, Layers } from "lucide-react";

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

const TEAM = [
  {
    name: "Sarah Chen",
    role: "Chief Executive Officer",
    bio: "Former DoD program manager with 15 years of federal contracting experience.",
  },
  {
    name: "Marcus Williams",
    role: "Chief Technology Officer",
    bio: "Led engineering teams at two govtech unicorns before co-founding RISE.",
  },
  {
    name: "Lisa Torres",
    role: "VP of Operations",
    bio: "Specializes in large-scale workforce management for CONUS and OCONUS contracts.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        title="About RISE"
        subtitle="We're on a mission to bring real-time operational visibility to the government contracting workforce."
        gradient
      />

      {/* Mission */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Government contractors manage thousands of positions across
              multiple regions, each with unique compliance requirements,
              clearance timelines, and onboarding processes. Yet most still rely
              on spreadsheets and siloed systems to track their workforce
              pipeline.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              RISE was built to change that. Our platform consolidates regional
              staffing data into a single source of truth, giving program
              managers the visibility they need to make faster, smarter
              decisions and keep their contracts fully staffed.
            </p>
          </div>
          <div className="aspect-video rounded-2xl bg-surface-700" />
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Our Values
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Leadership
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-surface-700" />
                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-brand-400">{member.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
