"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { siteConfig, PRICING_LIST } from "@/config/site";
import {
  ShoppingCart,
  Truck,
  BadgeCheck,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ─── Swipe threshold (px) ─── */
const SWIPE_THRESHOLD = 50;

export default function Hero() {
  const slides = siteConfig.heroSlides;
  const total = slides.length;

  /* ━━━ Single source of truth ━━━ */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDelta, setSwipeDelta] = useState(0);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const swiping = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  /* ━━━ Navigation (clamped, never wraps) ━━━ */
  const goTo = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(idx, total - 1));
      setCurrentIndex(clamped);
    },
    [total],
  );

  /* ━━━ Auto-advance (desktop: ≥768px) ━━━ */
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (window.innerWidth < 768) return;
    autoRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
    }, 4000);
  }, [total]);

  const stopAuto = useCallback(() => {
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = undefined; }
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  /* ━━━ Touch handlers (native, passive:false for move) ━━━ */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStartX.current = t.clientX;
      touchStartY.current = t.clientY;
      swiping.current = false;
      setSwipeDelta(0);
      stopAuto();
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const dx = t.clientX - touchStartX.current;
      const dy = t.clientY - touchStartY.current;

      // First significant movement — lock direction
      if (!swiping.current && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        if (Math.abs(dy) > Math.abs(dx)) return; // vertical scroll → ignore
        swiping.current = true;
        setIsSwiping(true);
      }

      if (!swiping.current) return;

      e.preventDefault(); // block vertical scroll during horizontal swipe
      setSwipeDelta(dx);
    };

    const onTouchEnd = () => {
      if (swiping.current) {
        const delta = swipeDelta;
        if (Math.abs(delta) >= SWIPE_THRESHOLD) {
          // ±1 slide only
          if (delta < 0) goTo(currentIndex + 1); // swipe left → next
          else goTo(currentIndex - 1);            // swipe right → prev
        }
      }
      swiping.current = false;
      setIsSwiping(false);
      setSwipeDelta(0);
      startAuto();
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [currentIndex, goTo, startAuto, stopAuto, swipeDelta]);

  /* ━━━ Transform calculation ━━━ */
  const containerW = trackRef.current?.parentElement?.offsetWidth || 1;
  const dragPct = isSwiping ? (swipeDelta / containerW) * 100 : 0;
  const translateX = currentIndex * -100 + dragPct;

  return (
    <section
      className="section-hero pt-6 pb-10 md:pt-12 md:pb-20 px-4 md:px-5"
      aria-label="القسم الرئيسي"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse lg:items-center lg:gap-12">
          {/* ── Gallery ── */}
          <div className="w-full lg:w-[55%] mb-8 lg:mb-0">
            <div className="hero-gallery mx-auto">

              {/* ── Slide track ── */}
              <div
                ref={trackRef}
                className="hero-track"
                style={{
                  transform: `translateX(${translateX}%)`,
                  transition: isSwiping ? "none" : "transform 0.3s ease",
                }}
              >
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
                <p className="hero-caption-sub">
                  {slides[currentIndex]?.sub}
                </p>
                <div className="hero-caption-line" />
              </div>

              {/* ── Nav arrows (desktop) ── */}
              <button
                onClick={() => { goTo(currentIndex - 1); stopAuto(); startAuto(); }}
                className="hero-arrow hero-arrow-left"
                aria-label="الصورة السابقة"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => { goTo(currentIndex + 1); stopAuto(); startAuto(); }}
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
                    onClick={() => { goTo(i); stopAuto(); startAuto(); }}
                    className={`hero-dot ${i === currentIndex ? "active" : ""}`}
                    aria-label={`صورة ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="w-full lg:w-[45%] text-center lg:text-right">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold mb-6"
              style={{
                background: "linear-gradient(135deg, #e8effe, #dbeafe)",
                border: "1px solid rgba(21,84,232,0.15)",
              }}
            >
              <Package className="w-4 h-4 text-blue" />
              <span className="text-blue">
                +{siteConfig.ordersCount} مغربي طلبو هاد المنتج
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-head text-[clamp(28px,7vw,50px)] font-black leading-[1.15] mb-5">
              <span className="text-gradient">أخفِ بطنك فوراً</span>
              <br />
              <span className="text-ink">بدون رياضة ولا ريجيم</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base md:text-lg text-ink-3 leading-[1.8] max-w-md mx-auto lg:mx-0 mb-7">
              البس {siteConfig.productNameAr} تحت الملابس وشوف الفرق من أول
              لحظة. مظهر أنحف وأنظف — والتوصيل مجاني لجميع مدن المغرب.
            </p>

            {/* Price row */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="flex items-baseline gap-1.5">
                <span className="font-head text-4xl md:text-5xl font-black text-blue">
                  {PRICING_LIST[0].total}
                </span>
                <span className="text-lg font-bold text-ink-3">
                  {siteConfig.currencyAr}
                </span>
              </div>
              <span
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5
                               rounded-full bg-teal-2 text-teal border border-teal/10"
              >
                <Truck className="w-3.5 h-3.5" />
                توصيل مجاني
              </span>
            </div>

            {/* CTA */}
            <a href="#order" className="btn-primary max-w-sm mx-auto lg:mx-0">
              <ShoppingCart className="w-5 h-5" />
              اطلب الآن — {siteConfig.payment}
            </a>

            {/* Trust micro-row */}
            <div className="flex items-center justify-center lg:justify-start gap-5 mt-4 text-xs text-ink-3">
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-teal" />
                {siteConfig.payment}
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue" />
                توصيل {siteConfig.shipping.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
