import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — RISE",
  description: "Get in touch with the RISE team. We'd love to hear from you.",
};

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
      {/* Hero */}
      <Hero
        title="Get in Touch"
        subtitle="Have a question or want to schedule a demo? We'd love to hear from you."
        gradient
      />

      {/* Contact Form + Info */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Send Us a Message
            </h2>
            <form action="#" className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
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
              <Button
                type="submit"
                size="lg"
                className="w-full bg-brand-600 hover:bg-brand-700 sm:w-auto"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="space-y-6 lg:mt-12">
            {CONTACT_INFO.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
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
            ))}
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
            <h3 className="text-lg font-semibold">Office Hours</h3>
            <p className="mt-2 text-muted-foreground">
              Monday&ndash;Friday: 8:00 AM &ndash; 6:00 PM EST
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
