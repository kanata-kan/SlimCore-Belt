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
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const dirLocked = useRef<"h" | "v" | null>(null);
  const slides = siteConfig.heroSlides;
  const total = slides.length;
  const autoRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const goTo = useCallback(
    (idx: number) => setCurrent(((idx % total) + total) % total),
    [total],
  );

  // Auto-advance
  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => goTo(current + 1), 5000);
  }, [current, goTo]);

  useEffect(() => {
    resetAuto();
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [resetAuto]);

  // Touch / pointer handlers — only swipe horizontally, allow vertical scroll
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    dirLocked.current = null;
    setDragOffset(0);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    // Lock direction after 8px of movement
    if (!dirLocked.current && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      dirLocked.current = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
    }

    // Vertical scroll → do nothing, let browser handle it
    if (dirLocked.current !== "h") return;

    // Horizontal swipe → engage slider drag
    e.preventDefault();
    if (!dragging) setDragging(true);
    setDragOffset(dx);
  };
  const onPointerUp = () => {
    if (!dragging) {
      dirLocked.current = null;
      return;
    }
    setDragging(false);
    dirLocked.current = null;
    // RTL: positive drag = next, negative = prev
    if (Math.abs(dragOffset) > 60) {
      goTo(dragOffset > 0 ? current + 1 : current - 1);
    }
    setDragOffset(0);
    resetAuto();
  };

  // For RTL: slides go right-to-left, so translateX is positive
  const translateX = current * 100 + (dragging ? -dragOffset / 4 : 0);

  return (
    <section
      className="section-hero pt-8 pb-12 md:pt-12 md:pb-20 px-5"
      aria-label="القسم الرئيسي"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse lg:items-center lg:gap-12">
          {/* ── Slider ── */}
          <div className="w-full lg:w-[55%] mb-8 lg:mb-0">
            <div
              className="slider-container shadow-glow mx-auto select-none touch-pan-y"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            >
              <div
                className={`slider-track ${dragging ? "dragging" : ""}`}
                style={{ transform: `translateX(${translateX}%)` }}
              >
                {slides.map((slide, i) => (
                  <div key={i} className="slider-slide">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      className="object-cover pointer-events-none"
                      sizes="(max-width: 768px) 100vw, 520px"
                      quality={85}
                      loading={i === 0 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>

              {/* Nav arrows (desktop) */}
              <button
                onClick={() => {
                  goTo(current + 1);
                  resetAuto();
                }}
                className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10
                           w-10 h-10 items-center justify-center rounded-full
                           bg-white/80 backdrop-blur-sm shadow-md
                           hover:bg-white transition-colors"
                aria-label="الصورة التالية"
              >
                <ChevronLeft className="w-5 h-5 text-ink" />
              </button>
              <button
                onClick={() => {
                  goTo(current - 1);
                  resetAuto();
                }}
                className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10
                           w-10 h-10 items-center justify-center rounded-full
                           bg-white/80 backdrop-blur-sm shadow-md
                           hover:bg-white transition-colors"
                aria-label="الصورة السابقة"
              >
                <ChevronRight className="w-5 h-5 text-ink" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      goTo(i);
                      resetAuto();
                    }}
                    className={`slider-dot ${i === current ? "active" : ""}`}
                    aria-label={`صورة ${i + 1}`}
                  />
                ))}
              </div>

              {/* Slide counter badge */}
              <div
                className="absolute top-4 right-4 z-10 bg-black/30 backdrop-blur-sm
                              text-white text-xs font-bold px-3 py-1.5 rounded-full"
              >
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
