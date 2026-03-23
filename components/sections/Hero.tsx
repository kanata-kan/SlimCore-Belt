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

/* ═══════════════════════════════════════════════════════════════
   Constants — tweak these to fine-tune feel
   ═══════════════════════════════════════════════════════════════ */
const SWIPE_THRESHOLD = 40; // px – minimum distance to trigger slide change
const VELOCITY_TRIGGER = 0.3; // px/ms – fast flick triggers even below threshold
const EDGE_RESISTANCE = 0.3; // 0-1 – rubber-band damping at first/last slide
const LOCK_DELTA = 8; // px – movement before direction is locked
const AUTO_INTERVAL = 4000; // ms – desktop auto-advance interval
const SNAP_DURATION = "0.32s"; // CSS transition for snap animation

/* ═══════════════════════════════════════════════════════════════
   Touch state — lives entirely in refs for zero re-renders
   during drag. Only `currentIndex` is React state.
   ═══════════════════════════════════════════════════════════════ */
interface TouchState {
  startX: number;
  startY: number;
  deltaX: number;
  startTime: number;
  direction: "h" | "v" | null; // locked after first significant move
  active: boolean; // true once horizontal lock confirmed
  width: number; // cached container width
}

const initialTouch: TouchState = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  startTime: 0,
  direction: null,
  active: false,
  width: 1,
};

export default function Hero() {
  const slides = siteConfig.heroSlides;
  const total = slides.length;
  const last = total - 1;

  /* ━━━ Single source of truth ━━━ */
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ━━━ Refs (never cause re-renders) ━━━ */
  const trackRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef<TouchState>({ ...initialTouch });
  const indexRef = useRef<number>(0); // mirrors currentIndex without stale closures
  const autoRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const widthRef = useRef<number>(1); // container width, updated on mount + resize

  /* Keep indexRef in sync */
  useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);

  /* ━━━ Container width — measured once on mount + resize ━━━ */
  useEffect(() => {
    const measure = () => {
      const el = trackRef.current?.parentElement;
      if (el) widthRef.current = el.offsetWidth || 1;
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* ━━━ Navigation (clamped 0…last) ━━━ */
  const goTo = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(idx, last));
      indexRef.current = clamped;
      setCurrentIndex(clamped);
      /* Snap animation: let CSS transition handle it */
      const track = trackRef.current;
      if (track) {
        track.style.transition = `transform ${SNAP_DURATION} cubic-bezier(.25,.46,.45,.94)`;
        track.style.transform = `translateX(${clamped * -100}%)`;
      }
    },
    [last],
  );

  /* ━━━ Auto-advance (desktop ≥ 768px only) ━━━ */
  const stopAuto = useCallback(() => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = undefined;
    }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    autoRef.current = setInterval(() => {
      const next = indexRef.current < last ? indexRef.current + 1 : 0;
      goTo(next);
    }, AUTO_INTERVAL);
  }, [last, goTo, stopAuto]);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  /* ━━━ Direct DOM transform (60fps, no React render) ━━━ */
  const setTrackPosition = useCallback((pxOffset: number) => {
    const track = trackRef.current;
    if (!track) return;
    const basePx = indexRef.current * widthRef.current;
    track.style.transition = "none"; // no animation while dragging
    track.style.transform = `translateX(${-(basePx - pxOffset)}px)`;
  }, []);

  /* ━━━ Edge resistance (rubber-band) ━━━ */
  const applyResistance = useCallback(
    (dx: number): number => {
      const idx = indexRef.current;
      // At first slide dragging right, or last slide dragging left
      if ((idx === 0 && dx > 0) || (idx === last && dx < 0)) {
        return dx * EDGE_RESISTANCE; // dampen
      }
      return dx;
    },
    [last],
  );

  /* ━━━ Touch handlers (registered once, never re-registered) ━━━ */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      const ts = touchRef.current;
      ts.startX = t.clientX;
      ts.startY = t.clientY;
      ts.deltaX = 0;
      ts.startTime = Date.now();
      ts.direction = null;
      ts.active = false;
      ts.width = widthRef.current;
      stopAuto();
    };

    const onMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const ts = touchRef.current;
      const dx = t.clientX - ts.startX;
      const dy = t.clientY - ts.startY;

      /* Direction lock — decided once, persists for entire gesture */
      if (
        ts.direction === null &&
        (Math.abs(dx) > LOCK_DELTA || Math.abs(dy) > LOCK_DELTA)
      ) {
        ts.direction = Math.abs(dx) >= Math.abs(dy) ? "h" : "v";
      }

      /* Vertical scroll → ignore entirely */
      if (ts.direction === "v") return;

      /* Not locked yet → wait */
      if (ts.direction !== "h") return;

      /* Horizontal swipe confirmed */
      e.preventDefault();
      ts.active = true;
      ts.deltaX = applyResistance(dx);
      setTrackPosition(ts.deltaX);
    };

    const onEnd = () => {
      const ts = touchRef.current;

      if (ts.active) {
        const elapsed = Math.max(Date.now() - ts.startTime, 1);
        const velocity = Math.abs(ts.deltaX) / elapsed; // px/ms
        const idx = indexRef.current;

        let target = idx;

        /* Velocity-based: fast flick triggers even for small distance */
        if (velocity > VELOCITY_TRIGGER && Math.abs(ts.deltaX) > 10) {
          target = ts.deltaX < 0 ? idx + 1 : idx - 1;
        } else if (Math.abs(ts.deltaX) >= SWIPE_THRESHOLD) {
          /* Distance-based: slow drag past threshold */
          target = ts.deltaX < 0 ? idx + 1 : idx - 1;
        }
        /* Otherwise: snap back to current */

        goTo(target); // goTo clamps 0…last
      }

      /* Reset touch state */
      touchRef.current = { ...initialTouch };
      startAuto();
    };

    const onCancel = () => {
      if (touchRef.current.active) goTo(indexRef.current);
      touchRef.current = { ...initialTouch };
      startAuto();
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("touchcancel", onCancel, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onCancel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← registered ONCE — all state accessed via refs

  /* ━━━ Sync track position when currentIndex changes (arrows/dots/auto) ━━━ */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = `transform ${SNAP_DURATION} cubic-bezier(.25,.46,.45,.94)`;
    track.style.transform = `translateX(${currentIndex * -100}%)`;
  }, [currentIndex]);

  /* ━━━ Arrow / dot handlers ━━━ */
  const onPrev = useCallback(() => {
    stopAuto();
    goTo(indexRef.current - 1);
    startAuto();
  }, [goTo, stopAuto, startAuto]);
  const onNext = useCallback(() => {
    stopAuto();
    goTo(indexRef.current + 1);
    startAuto();
  }, [goTo, stopAuto, startAuto]);
  const onDot = useCallback(
    (i: number) => {
      stopAuto();
      goTo(i);
      startAuto();
    },
    [goTo, stopAuto, startAuto],
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
