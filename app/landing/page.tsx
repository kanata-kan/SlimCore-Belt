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

      {/* 3. Problem */}
      <Problem />

      {/* 4. Benefits */}
      <Benefits />

      {/* 5. Before / After */}
      <BeforeAfter />

      {/* 6. Offer (pricing) */}
      <Offer />

      {/* 7. Order Form */}
      <OrderForm />

      {/* 8. Trust */}
      <Trust />

      {/* 9. Final CTA */}
      <CTA />

      {/* Footer */}
      <footer className="bg-ink py-10 px-5 pb-24 lg:pb-10">
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
