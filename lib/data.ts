// ─────────────────────────────────────────
// Re-export everything from central config
// Components import from here for backward compat
// ─────────────────────────────────────────
import { siteConfig, PRICING_LIST } from "@/config/site";
import { MOROCCAN_CITIES } from "@/lib/moroccan-cities";

export const PRODUCT = {
  name: siteConfig.productName,
  nameAr: siteConfig.productNameAr,
  headline: siteConfig.headline,
  currency: siteConfig.currency,
  currencyAr: siteConfig.currencyAr,
  shipping: siteConfig.shipping.text,
  color: siteConfig.color,
  sizes: siteConfig.sizes,
  ordersCount: siteConfig.ordersCount,
} as const;

export const PRICING = PRICING_LIST;
export const CITIES = MOROCCAN_CITIES;
export const TRUST_ITEMS = siteConfig.trustItems;
export const PROBLEMS = siteConfig.problems;
export const BENEFITS = siteConfig.benefits;
export const GUARANTEES = siteConfig.guarantees;
