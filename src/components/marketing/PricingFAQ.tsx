"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/motion/SectionHeading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/motion-primitives/accordion";

const FAQS = [
  {
    question: "Can I switch plans?",
    answer:
      "Yes. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle, and we'll prorate any difference.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "We offer a 14-day free trial of the Professional plan. No credit card required to get started.",
  },
  {
    question: "What's included in Enterprise?",
    answer:
      "Enterprise includes all Professional features plus dedicated account management, 24/7 phone support, custom integrations, on-premise deployment options, SLA guarantees, and team training and onboarding.",
  },
  {
    question: "How does billing work?",
    answer:
      "All plans can be billed monthly or annually. We accept major credit cards, ACH transfers, and invoiced billing for Enterprise customers.",
  },
  {
    question: "Do you offer government pricing?",
    answer:
      "Yes. RISE is available on GSA Schedule and we offer special pricing for federal, state, and local government agencies. Contact our sales team for details.",
  },
];

export function PricingFAQ() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionHeading label="FAQ" title="Frequently Asked Questions" />

        <Accordion
          className="space-y-4"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={i}
              className="glass-panel rounded-2xl"
            >
              <AccordionTrigger
                className={cn(
                  "flex w-full items-center justify-between p-6 text-left",
                  "text-base font-semibold",
                  "data-[expanded]:border-l-2 data-[expanded]:border-brand-500",
                )}
              >
                {faq.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[expanded]:rotate-180" />
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden">
                <p className="border-l-2 border-brand-500 px-6 pb-6 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
