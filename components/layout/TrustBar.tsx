"use client";

import { siteConfig } from "@/config/site";
import { Truck, BadgeCheck, Package } from "lucide-react";

const TRUST_ICONS = [Truck, BadgeCheck, Package];

// ─── Marquee Track (mobile) ───────────────────────────────────────────────────
function MarqueeTrack({ items }: { items: readonly string[] }) {
  const doubled = [...items, ...items];

  return (
    // dir="ltr" مهم هنا — يحمي flex layout من الـ RTL ديال الصفحة
    // بلا هاد الـ dir، flex كيرتب items من اليمين وكيكسر الـ loop
    <div dir="ltr" className="relative flex overflow-hidden w-full">
      {/* Fade masks */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12"
        style={{
          background: "linear-gradient(to right, #0C3DC4, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12"
        style={{ background: "linear-gradient(to left, #00B5A3, transparent)" }}
      />

      <div className="flex animate-trust-marquee whitespace-nowrap will-change-transform">
        {doubled.map((item, i) => {
          const Icon = TRUST_ICONS[i % TRUST_ICONS.length] ?? Package;
          const isLast = i === doubled.length - 1;

          return (
            <span key={i} className="inline-flex items-center gap-2 px-5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/15">
                <Icon className="w-3 h-3 text-white" />
              </span>

              {/* dir="rtl" على النص باش يتعرض صح */}
              <span dir="rtl" className="text-white text-[11px] font-semibold">
                {item}
              </span>

              {!isLast && (
                <span className="w-px h-3 bg-white/30 self-center mx-1" />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Desktop Row ──────────────────────────────────────────────────────────────
function DesktopRow({ items }: { items: readonly string[] }) {
  return (
    // dir="ltr" باش justify-center يتصرف صح، النص بداخلو RTL
    <div dir="ltr" className="flex w-full items-center justify-center">
      {items.map((item, i) => {
        const Icon = TRUST_ICONS[i] ?? Package;
        const isLast = i === items.length - 1;

        return (
          <span key={item} className="flex items-center">
            <span className="flex items-center gap-2 px-6 py-0.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 ring-1 ring-white/30">
                <Icon className="w-3 h-3 text-white" />
              </span>

              <span
                dir="rtl"
                className="text-white text-[11.5px] font-semibold tracking-wide"
              >
                {item}
              </span>
            </span>

            {!isLast && (
              <span className="w-px h-4 bg-white/25 rounded-full self-center" />
            )}
          </span>
        );
      })}
    </div>
  );
}

// ─── TrustBar ─────────────────────────────────────────────────────────────────
export default function TrustBar() {
  const items = siteConfig.trustItems;

  return (
    <div
      className="trust-bar relative z-10 flex items-center py-2 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0C3DC4 0%, #1554E8 50%, #00B5A3 100%)",
      }}
    >
      {/* Shimmer overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(110deg, transparent 0px, transparent 40px, rgba(255,255,255,0.4) 41px, rgba(255,255,255,0.4) 42px, transparent 43px)",
        }}
      />

      {/* Mobile: marquee */}
      <div className="md:hidden w-full">
        <MarqueeTrack items={items} />
      </div>

      {/* Desktop: spread row */}
      <div className="hidden md:flex w-full">
        <DesktopRow items={items} />
      </div>
    </div>
  );
}
