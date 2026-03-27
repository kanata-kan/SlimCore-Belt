# حزام التنحيف الطبي — Landing Page

> Next.js 14 · App Router · TypeScript · Tailwind CSS

## 🚀 البد السريع

```bash
# 1. تثبيت الحزم
npm install

# 2. إعداد المتغيرات البيئية
cp .env.local.example .env.local
# ثم عدّل القيم في .env.local

# 3. تشغيل بيئة التطوير
npm run dev

# 4. البناء للإنتاج
npm run build && npm start
```

## 📁 هيكل المشروع

```
waist-belt-nextjs/
├── app/
│   ├── layout.tsx              # Root layout + Analytics scripts
│   ├── page.tsx                # Redirect to /landing
│   ├── landing/
│   │   └── page.tsx            # ★ Main SSG landing page
│   └── api/
│       └── order/
│           └── route.ts        # POST /api/order
│
├── components/
│   ├── layout/
│   │   ├── TrustBar.tsx        # Top trust signals bar
│   │   └── CertifiedBar.tsx    # Medical certification strip
│   ├── sections/
│   │   ├── Hero.tsx            # Above-the-fold hero
│   │   ├── SocialProof.tsx     # Stats numbers
│   │   ├── Problems.tsx        # Pain points list
│   │   ├── Steps.tsx           # How it works
│   │   ├── Features.tsx        # Product features
│   │   ├── BeforeAfter.tsx     # Before/after comparison
│   │   ├── ComparisonTable.tsx # vs competitors
│   │   ├── Reviews.tsx         # Customer reviews
│   │   ├── Guarantees.tsx      # Trust guarantees
│   │   └── OrderSection.tsx    # ★ Order form (Client)
│   └── ui/
│       ├── CTAButton.tsx       # Tracked CTA button
│       ├── StickyCTA.tsx       # Fixed bottom bar
│       ├── ScrollInit.tsx      # Reveal + counter init
│       └── WaveDividers.tsx    # SVG wave transitions
│
├── lib/
│   ├── data.ts                 # ★ All content (single source of truth)
│   ├── analytics.ts            # Unified GA4 + FB + TikTok tracking
│   └── metadata.ts             # SEO metadata + JSON-LD schema
│
├── types/
│   └── index.ts                # TypeScript interfaces
│
├── styles/
│   └── globals.css             # Tailwind + global CSS
│
├── public/
│   └── images/                 # Static images
│
├── tailwind.config.ts
├── next.config.ts
└── .env.local.example
```

## 🎯 تحديث المحتوى

**كل المحتوى في ملف واحد:** `lib/data.ts`

- تغيير السعر → `PRODUCT.price`
- إضافة ميزة → `FEATURES` array
- تعديل تقييم → `REVIEWS` array

## 📊 Analytics

في `.env.local`:

```
NEXT_PUBLIC_GA_MEASUREMENT=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXX
NEXT_PUBLIC_TIKTOK_PIXEL_ID=XXXXXXXXXXXXXXX
```

## 🛒 ربط الطلبات

في `app/api/order/route.ts`:

- يمكن ربطه بـ Zapier / Make / n8n عبر `WEBHOOK_URL`
- أو إضافة CRM مباشرة في الكود

## ⚡ أداء متوقع

- Lighthouse Score: 95+
- First Contentful Paint: < 0.8s
- Time to Interactive: < 1.2s
- CLS: < 0.05
