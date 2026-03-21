// ─────────────────────────────────────────
// Domain Types
// ─────────────────────────────────────────

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface Guarantee {
  icon: string;
  title: string;
  description: string;
}

// ─────────────────────────────────────────
// API / Form Types
// ─────────────────────────────────────────

export type Size = "M" | "L" | "XL";

export interface OrderFormData {
  name: string;
  phone: string;
  city: string;
  address: string;
  size: Size;
  quantity: number;
}

export interface OrderDocument extends OrderFormData {
  createdAt: Date;
}

export interface OrderResponse {
  success: boolean;
  message: string;
}

// ─────────────────────────────────────────
// Analytics Event Types
// ─────────────────────────────────────────

export type AnalyticsEvent = "PageView" | "ViewContent" | "Lead";

export interface TrackEventOptions {
  event: AnalyticsEvent;
  value?: number;
  currency?: string;
}
