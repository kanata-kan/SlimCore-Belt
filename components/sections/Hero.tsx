"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { siteConfig, PRICING_LIST } from "@/config/site";
import {
  ShoppingCart,
  Truck,
  BadgeCheck,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Hero() {
  const slides = siteConfig.heroSlides;
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const goTo = useCallback(
    (idx: number) => setCurrent(((idx % total) + total) % total),
    [total],
  );

  // Detect mobile (< 768px)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-advance only on desktop
  useEffect(() => {
    if (isMobile) return;
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => goTo(current + 1), 4000);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [current, goTo, isMobile]);

  // Mobile: sync dots from native scroll position
  useEffect(() => {
    if (!isMobile) return;
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.offsetWidth;
      if (w === 0) return;
      const idx = Math.round(el.scrollLeft / w);
      if (idx >= 0 && idx < total) setCurrent(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [isMobile, total]);

  const resetAuto = useCallback(() => {
    if (isMobile) return;
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => goTo(current + 1), 4000);
  }, [current, goTo, isMobile]);

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
              {/* ── MOBILE: scroll-snap (native swipe) ── */}
              <div ref={scrollRef} className="hero-scroll-mobile">
                {slides.map((slide, i) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={`m-${i}`}
                    src={slide.image}
                    alt={slide.alt}
                    className="hero-scroll-img"
                    draggable={false}
                  />
                ))}
              </div>

              {/* ── DESKTOP: fade (auto-advance) ── */}
              <div className="hero-fade-desktop">
                {slides.map((slide, i) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={`d-${i}`}
                    src={slide.image}
                    alt={slide.alt}
                    className={`hero-fade-img ${i === current ? "active" : ""}`}
                    draggable={false}
                  />
                ))}
              </div>

              {/* ── Overlays ── */}
              <div className="hero-overlay-top">
                <div className="hero-brand-badge">
                  <span className="hero-brand-dot" />
                  {siteConfig.productName}
                </div>
                <div className="hero-counter">
                  {current + 1} / {total}
                </div>
              </div>

              <div className="hero-overlay-bottom">
                <div className="hero-caption-tag">
                  {slides[current]?.caption}
                </div>
                <p className="hero-caption-sub">{slides[current]?.sub}</p>
                <div className="hero-caption-line" />
              </div>

              {/* Nav arrows (desktop only via CSS) */}
              <button
                onClick={() => {
                  goTo(current - 1);
                  resetAuto();
                }}
                className="hero-arrow hero-arrow-left"
                aria-label="الصورة السابقة"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  goTo(current + 1);
                  resetAuto();
                }}
                className="hero-arrow hero-arrow-right"
                aria-label="الصورة التالية"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="hero-dots">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      goTo(i);
                      resetAuto();
                    }}
                    className={`hero-dot ${i === current ? "active" : ""}`}
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
