import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com";

const title = `${siteConfig.productNameAr} — ${siteConfig.tagline} | توصيل مجاني والدفع عند الاستلام`;
const description = `أخفِ بطنك فوراً مع ${siteConfig.productNameAr} — مظهر أنحف تحت الملابس، توصيل مجاني لجميع مدن المغرب، ${siteConfig.payment}.`;

export const landingMetadata: Metadata = {
  title,
  description,

  keywords: [
    "حزام تنحيف",
    "حزام إخفاء الكرش",
    "حزام شد البطن",
    "SlimCore Belt",
    "حزام رجالي",
    "تنحيف المغرب",
    "حزام البطن المغرب",
  ],

  authors: [{ name: siteConfig.productName }],

  alternates: {
    canonical: `${SITE_URL}/landing`,
  },

  openGraph: {
    type: "website",
    locale: "ar_MA",
    url: `${SITE_URL}/landing`,
    siteName: siteConfig.productName,
    title: `${siteConfig.productNameAr} — ${siteConfig.tagline}`,
    description,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.productNameAr} — ${siteConfig.tagline}`,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.productNameAr} — ${siteConfig.tagline}`,
    description,
    images: [`${SITE_URL}/opengraph-image`],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: siteConfig.productName,
  description: "حزام لإخفاء البطن فوراً وتحسين شكل الجسم تحت الملابس",
  brand: { "@type": "Brand", name: siteConfig.productName },
  image: `${SITE_URL}/opengraph-image`,
  offers: {
    "@type": "AggregateOffer",
    lowPrice: String(siteConfig.offers.one.total),
    highPrice: String(siteConfig.offers.three.total),
    priceCurrency: siteConfig.currency,
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/landing`,
    offerCount: 3,
  },
};
