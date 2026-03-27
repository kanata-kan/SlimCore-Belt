"use client";

import { useState, useRef, useEffect, useCallback } from "react";

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
  direction: "h" | "v" | null;
  active: boolean;
  width: number;
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

/* ═══════════════════════════════════════════════════════════════
   useSlider — encapsulates all slider logic
   ═══════════════════════════════════════════════════════════════ */
export interface UseSliderReturn {
  currentIndex: number;
  trackRef: React.RefObject<HTMLDivElement | null>;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
}

export function useSlider(total: number): UseSliderReturn {
  const last = total - 1;

  /* ━━━ Single source of truth ━━━ */
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ━━━ Refs (never cause re-renders) ━━━ */
  const trackRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef<TouchState>({ ...initialTouch });
  const indexRef = useRef<number>(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const widthRef = useRef<number>(1);

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
    track.style.transition = "none";
    track.style.transform = `translateX(${-(basePx - pxOffset)}px)`;
  }, []);

  /* ━━━ Edge resistance (rubber-band) ━━━ */
  const applyResistance = useCallback(
    (dx: number): number => {
      const idx = indexRef.current;
      if ((idx === 0 && dx > 0) || (idx === last && dx < 0)) {
        return dx * EDGE_RESISTANCE;
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

      if (
        ts.direction === null &&
        (Math.abs(dx) > LOCK_DELTA || Math.abs(dy) > LOCK_DELTA)
      ) {
        ts.direction = Math.abs(dx) >= Math.abs(dy) ? "h" : "v";
      }

      if (ts.direction === "v") return;
      if (ts.direction !== "h") return;

      e.preventDefault();
      ts.active = true;
      ts.deltaX = applyResistance(dx);
      setTrackPosition(ts.deltaX);
    };

    const onEnd = () => {
      const ts = touchRef.current;

      if (ts.active) {
        const elapsed = Math.max(Date.now() - ts.startTime, 1);
        const velocity = Math.abs(ts.deltaX) / elapsed;
        const idx = indexRef.current;

        let target = idx;

        if (velocity > VELOCITY_TRIGGER && Math.abs(ts.deltaX) > 10) {
          target = ts.deltaX < 0 ? idx + 1 : idx - 1;
        } else if (Math.abs(ts.deltaX) >= SWIPE_THRESHOLD) {
          target = ts.deltaX < 0 ? idx + 1 : idx - 1;
        }

        goTo(target);
      }

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
  }, []);

  /* ━━━ Sync track on currentIndex change (arrows/dots/auto) ━━━ */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = `transform ${SNAP_DURATION} cubic-bezier(.25,.46,.45,.94)`;
    track.style.transform = `translateX(${currentIndex * -100}%)`;
  }, [currentIndex]);

  /* ━━━ Public handlers ━━━ */
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

  return { currentIndex, trackRef, onPrev, onNext, onDot };
}
