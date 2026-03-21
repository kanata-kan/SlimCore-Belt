import type { Metadata } from "next";
import Script from "next/script";
import { landingMetadata, productJsonLd } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

import TrustBar from "@/components/layout/TrustBar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problems";
import Benefits from "@/components/sections/Features";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Offer from "@/components/sections/Offer";
import OrderForm from "@/components/sections/OrderSection";
import Trust from "@/components/sections/Guarantees";
import CTA from "@/components/sections/CTA";
import StickyCTA from "@/components/ui/StickyCTA";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = landingMetadata;

export default function LandingPage() {
  return (
    <>
      {/* JSON-LD */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* 1. Trust Bar */}
      <TrustBar />

      {/* 2. Hero (with slider) */}
      <Hero />

      {/* ── Moroccan divider ── */}
      <div className="divider-moroccan" aria-hidden="true" />

      {/* 3. Problem */}
      <ScrollReveal>
        <Problem />
      </ScrollReveal>

      {/* 4. Benefits */}
      <ScrollReveal delay={80}>
        <Benefits />
      </ScrollReveal>

      {/* ── Moroccan divider ── */}
      <div className="divider-moroccan" aria-hidden="true" />

      {/* 5. Before / After */}
      <ScrollReveal>
        <BeforeAfter />
      </ScrollReveal>

      {/* 6. Offer (pricing) */}
      <ScrollReveal delay={80}>
        <Offer />
      </ScrollReveal>

      {/* 7. Order Form */}
      <ScrollReveal>
        <OrderForm />
      </ScrollReveal>

      {/* ── Moroccan divider ── */}
      <div className="divider-moroccan" aria-hidden="true" />

      {/* 8. Trust */}
      <ScrollReveal>
        <Trust />
      </ScrollReveal>

      {/* 9. Final CTA */}
      <CTA />

      {/* Footer */}
      <footer className="bg-ink pattern-hex py-10 px-5 pb-24 lg:pb-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-head text-lg font-bold text-white/90 mb-2">
            {siteConfig.productName}
          </div>
          <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">
            توصيل {siteConfig.shipping.text} لجميع مدن المغرب —{" "}
            {siteConfig.payment}
          </p>
          <div className="border-t border-white/8 pt-5 text-xs text-white/25">
            © {new Date().getFullYear()} {siteConfig.productName}. جميع الحقوق
            محفوظة.
          </div>
        </div>
      </footer>

      {/* Sticky CTA (mobile only) */}
      <StickyCTA />
    </>
  );
}
