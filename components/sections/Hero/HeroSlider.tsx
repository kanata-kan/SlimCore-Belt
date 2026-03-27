import { siteConfig } from "@/config/site";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSliderProps {
  currentIndex: number;
  trackRef: React.RefObject<HTMLDivElement | null>;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
}

export default function HeroSlider({
  currentIndex,
  trackRef,
  onPrev,
  onNext,
  onDot,
}: HeroSliderProps) {
  const slides = siteConfig.heroSlides;
  const total = slides.length;

  return (
    <div className="hero-gallery mx-auto">
      {/* ── Slide track (transform driven by refs, not state) ── */}
      <div ref={trackRef} className="hero-track">
        {slides.map((slide, i) => (
          <div key={i} className="hero-slide">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.alt}
              className="hero-slide-img"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* ── Overlays (driven by currentIndex) ── */}
      <div className="hero-overlay-top">
        <div className="hero-brand-badge">
          <span className="hero-brand-dot" />
          {siteConfig.productName}
        </div>
        <div className="hero-counter">
          {currentIndex + 1} / {total}
        </div>
      </div>

      <div className="hero-overlay-bottom">
        <div className="hero-caption-tag">
          {slides[currentIndex]?.caption}
        </div>
        <p className="hero-caption-sub">{slides[currentIndex]?.sub}</p>
        <div className="hero-caption-line" />
      </div>

      {/* ── Nav arrows (desktop) ── */}
      <button
        onClick={onPrev}
        className="hero-arrow hero-arrow-left"
        aria-label="الصورة السابقة"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        className="hero-arrow hero-arrow-right"
        aria-label="الصورة التالية"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── Dots (synced to currentIndex) ── */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            className={`hero-dot ${i === currentIndex ? "active" : ""}`}
            aria-label={`صورة ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
