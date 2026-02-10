import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/marketing/Hero";
import { PRICING_TIERS } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing — RISE",
  description:
    "Simple, transparent pricing for RISE. Choose the plan that fits your operational scope.",
};

const FAQS = [
  {
    question: "Can I switch plans?",
    answer:
      "Yes. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle, and we'll prorate any difference.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "We offer a 14-day free trial on both the Starter and Professional plans. No credit card required to get started.",
  },
  {
    question: "What's included in Enterprise?",
    answer:
      "Enterprise includes all Professional features plus dedicated account management, 24/7 phone support, custom integrations, on-premise deployment options, SLA guarantees, and team training and onboarding.",
  },
  {
    question: "How does billing work?",
    answer:
      "All plans are billed monthly. We accept major credit cards and ACH transfers. Enterprise customers can arrange annual contracts with invoiced billing.",
  },
  {
    question: "Do you offer government pricing?",
    answer:
      "Yes. RISE is available on GSA Schedule and we offer special pricing for federal, state, and local government agencies. Contact our sales team for details.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that matches your operational scope. No hidden fees, no surprises."
        gradient
      />

      {/* Pricing Cards */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "relative flex flex-col",
                tier.highlighted && "scale-105 ring-2 ring-brand-500",
              )}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-brand-600 text-white hover:bg-brand-600">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="font-mono text-4xl font-bold">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-muted-foreground">{tier.period}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-status-success" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className={cn(
                    "w-full",
                    tier.highlighted ? "bg-brand-600 hover:bg-brand-700" : "",
                  )}
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  <Link href={tier.highlighted ? "/contact" : "/contact"}>
                    {tier.cta}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <summary className="cursor-pointer text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
