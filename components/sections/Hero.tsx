"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const isUserScrolling = useRef(false);

  // Scroll to a specific slide
  const goTo = useCallback(
    (idx: number) => {
      const wrapped = ((idx % total) + total) % total;
      setCurrent(wrapped);
      const el = scrollRef.current;
      if (!el) return;
      const slideW = el.offsetWidth;
      el.scrollTo({ left: slideW * wrapped, behavior: "smooth" });
    },
    [total],
  );

  // Auto-advance every 5s
  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      if (!isUserScrolling.current) goTo(current + 1);
    }, 5000);
  }, [current, goTo]);

  useEffect(() => {
    resetAuto();
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [resetAuto]);

  // Detect which slide is visible via native scroll
  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const slideW = el.offsetWidth;
    if (slideW === 0) return;
    const idx = Math.round(el.scrollLeft / slideW);
    if (idx !== current && idx >= 0 && idx < total) {
      setCurrent(idx);
    }
  }, [current, total]);

  // Pause auto-advance while user is touching
  const onTouchStart = () => {
    isUserScrolling.current = true;
    if (autoRef.current) clearInterval(autoRef.current);
  };
  const onTouchEnd = () => {
    isUserScrolling.current = false;
    resetAuto();
  };

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
              {/* Scroll-snap container — native touch, zero JS conflicts */}
              <div
                ref={scrollRef}
                className="hero-scroll"
                onScroll={onScroll}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {slides.map((slide, i) => (
                  <div key={i} className="hero-slide">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 92vw, 420px"
                      quality={85}
                      loading={i === 0 ? "eager" : "lazy"}
                      draggable={false}
                    />
                    {/* Caption overlay */}
                    <div className="hero-caption">
                      <span className="font-head text-sm md:text-base font-bold">
                        {slide.caption}
                      </span>
                      <span className="text-white/70 text-xs md:text-sm">
                        {slide.sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nav arrows (desktop) */}
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

              {/* Progress dots */}
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

              {/* Counter badge */}
              <div className="hero-counter">
                {current + 1} / {total}
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
