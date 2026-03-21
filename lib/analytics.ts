"use client";

import type { TrackEventOptions } from "@/types";
import { siteConfig } from "@/config/site";

// ─────────────────────────────────────────
// Type declarations for window globals
// ─────────────────────────────────────────
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void };
  }
}

// ─────────────────────────────────────────
// Meta Pixel
// ─────────────────────────────────────────
const fbEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", eventName, params);
};

// ─────────────────────────────────────────
// TikTok Pixel
// ─────────────────────────────────────────
const ttEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined" || !window.ttq) return;
  window.ttq.track(eventName, params);
};

// ─────────────────────────────────────────
// Unified Track Function
// ─────────────────────────────────────────
export function trackEvent({
  event,
  value,
  currency = "MAD",
}: TrackEventOptions) {
  const params = { value, currency, content_name: siteConfig.productName };

  switch (event) {
    case "PageView":
      fbEvent("PageView");
      ttEvent("ViewContent", params);
      break;

    case "ViewContent":
      fbEvent("ViewContent", params);
      ttEvent("ViewContent", params);
      break;

    case "Lead":
      fbEvent("Lead", params);
      ttEvent("SubmitForm", params);
      break;
  }
}
