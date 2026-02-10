"use client";

import { RECENT_ACTIVITY } from "@/lib/constants";
import { InView } from "@/components/motion/InView";
import { BlurFade } from "@/components/magicui/blur-fade";

export function ActivityFeed() {
  return (
    <InView direction="up">
      <div className="glass-panel p-6">
        <h3 className="font-display text-lg font-semibold">Recent Activity</h3>
        <div className="relative mt-4 space-y-4">
          <div className="absolute left-[4px] top-8 bottom-4 w-px bg-gradient-to-b from-brand-400/20 to-transparent" />
          {RECENT_ACTIVITY.map((item, i) => (
            <BlurFade key={i} delay={i * 0.06} inView>
              <div className="flex items-start gap-3 rounded-lg p-1 transition-colors hover:bg-white/5">
                <div className="relative mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-400 shadow-[0_0_6px_rgba(96,165,250,0.4)]" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {item.time}
                </span>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </InView>
  );
}
