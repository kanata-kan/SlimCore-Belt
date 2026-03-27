"use client";

import { siteConfig } from "@/config/site";
import { useSlider } from "./useSlider";
import HeroSlider from "./HeroSlider";
import HeroContent from "./HeroContent";

export default function Hero() {
  const slides = siteConfig.heroSlides;
  const { currentIndex, trackRef, onPrev, onNext, onDot } = useSlider(
    slides.length,
  );

  return (
    <section
      className="section-hero pt-6 pb-10 md:pt-12 md:pb-20 px-4 md:px-5"
      aria-label="القسم الرئيسي"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse lg:items-center lg:gap-12">
          {/* ── Gallery ── */}
          <div className="w-full lg:w-[55%] mb-8 lg:mb-0">
            <HeroSlider
              currentIndex={currentIndex}
              trackRef={trackRef}
              onPrev={onPrev}
              onNext={onNext}
              onDot={onDot}
            />
          </div>

          {/* ── Content ── */}
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
