"use client";

import { Hero } from "@/components/marketing/Hero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@rise-platform.gov",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "1600 Pennsylvania Ave NW, Washington, DC",
  },
];

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Get in Touch"
        subtitle="Have a question or want to schedule a demo? We'd love to hear from you."
        gradient
      />

      {/* Contact Form + Info */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Form */}
          <div>
            <BlurFade delay={0}>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Send Us a Message
              </h2>
            </BlurFade>
            <form action="#" className="mt-8 space-y-6">
              <BlurFade delay={0.1}>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
              </BlurFade>
              <BlurFade delay={0.2}>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
              </BlurFade>
              <BlurFade delay={0.3}>
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium"
                  >
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
              </BlurFade>
              <BlurFade delay={0.4}>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us more about your needs..."
                  />
                </div>
              </BlurFade>
              <BlurFade delay={0.5}>
                <ShimmerButton
                  type="submit"
                  background="rgba(37, 99, 235, 1)"
                  className="w-full sm:w-auto"
                >
                  <span className="text-sm font-medium">Send Message</span>
                </ShimmerButton>
                <p className="mt-3 text-sm text-muted-foreground">
                  Typically responds within 2 hours
                </p>
              </BlurFade>
            </form>
          </div>

          {/* Info Cards */}
          <div className="space-y-6 lg:mt-12">
            {CONTACT_INFO.map((item, i) => (
              <BlurFade key={item.label} delay={0.1 + i * 0.1}>
                <div className="glass-panel p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}

            {/* Map placeholder */}
            <BlurFade delay={0.4}>
              <div className="glass-panel-md relative flex h-48 items-center justify-center overflow-hidden">
                <div className="bg-grid-dots absolute inset-0" />
                <div className="relative flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Washington, DC Metro Area
                  </span>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.2}>
            <div className="glass-panel-md p-8 text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">
                Office Hours
              </h3>
              <p className="mt-2 text-muted-foreground">
                Monday&ndash;Friday: 8:00 AM &ndash; 6:00 PM EST
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Emergency support: 24/7 for Enterprise
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </>
  );
}
