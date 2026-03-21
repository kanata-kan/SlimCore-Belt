// ─────────────────────────────────────────
// Central Site Configuration
// ALL client data in ONE place — no hardcoded values anywhere
// ─────────────────────────────────────────

export const siteConfig = {
  // ── WhatsApp ──
  whatsappNumber: "212XXXXXXXXX",

  // ── Product ──
  productName: "SlimCore Belt",
  productNameAr: "حزام SlimCore",
  tagline: "أخفِ بطنك فوراً",
  color: "أسود",

  // ── Pricing ──
  currency: "MAD",
  currencyAr: "درهم",
  offers: {
    one: { qty: 1, price: 199, total: 199, label: "1 حزام", badge: "" },
    two: {
      qty: 2,
      price: 150,
      total: 299,
      label: "2 أحزمة",
      badge: "الأكثر طلباً",
    },
    three: {
      qty: 3,
      price: 133,
      total: 399,
      label: "3 أحزمة",
      badge: "أفضل قيمة",
    },
  },

  // ── Sizes ──
  sizes: ["M", "L", "XL"] as const,
  defaultSize: "L" as const,
  defaultQuantity: 2,

  // ── Shipping ──
  shipping: {
    text: "مجاني",
    company: "Amana",
    allCities: true,
  },

  // ── Payment ──
  payment: "الدفع عند الاستلام",

  // ── Social proof ──
  ordersCount: "+1200",
  ordersCountNum: 1200,

  // ── Trust items ──
  trustItems: [
    "🚚 توصيل مجاني",
    "💰 الدفع عند الاستلام",
    "📦 +1200 طلب في المغرب",
  ],

  // ── Cities ──
  cities: [
    "الدار البيضاء",
    "الرباط",
    "فاس",
    "مراكش",
    "طنجة",
    "أكادير",
    "مكناس",
    "وجدة",
    "القنيطرة",
    "تطوان",
    "آسفي",
    "الجديدة",
    "بني ملال",
    "تازة",
    "الناظور",
    "خريبكة",
    "سطات",
    "العيون",
    "المحمدية",
    "الخميسات",
    "قلعة السراغنة",
    "برشيد",
    "خنيفرة",
    "الحسيمة",
    "ورزازات",
    "الراشيدية",
    "تيزنيت",
    "طاطا",
    "كلميم",
    "إفران",
    "ميدلت",
    "الصويرة",
    "سلا",
    "تمارة",
  ],

  // ── Messages ──
  messages: {
    orderSuccess: "تم تسجيل طلبك بنجاح! سنتصل بك قريباً لتأكيد الطلب.",
    orderError: "حدث خطأ، حاول مرة أخرى",
    connectionError: "حدث خطأ في الاتصال، حاول مرة أخرى",
    rateLimited: "طلبات كثيرة، حاول بعد دقيقة",
  },

  // ── Placeholders ──
  placeholders: {
    name: "مثال: أحمد بنعلي",
    phone: "06XXXXXXXX",
    city: "اختار المدينة ديالك",
    address: "الحي، الشارع، رقم المنزل",
  },

  // ── Validation messages ──
  validation: {
    nameRequired: "الاسم الكامل مطلوب",
    nameMin: "الاسم يجب أن يكون 3 أحرف على الأقل",
    phoneRequired: "رقم الهاتف مطلوب",
    phoneInvalid: "رقم الهاتف غير صحيح (مثال: 0612345678)",
    cityRequired: "اختار المدينة ديالك",
    addressRequired: "العنوان مطلوب",
    sizeRequired: "اختار المقاس",
  },

  // ── Hero slides ──
  heroSlides: [
    {
      image: "/images/slide-1.svg",
      alt: "حزام SlimCore — إخفاء فوري للبطن",
    },
    {
      image: "/images/slide-2.svg",
      alt: "حزام SlimCore — مظهر أنحف تحت الملابس",
    },
    {
      image: "/images/slide-3.svg",
      alt: "حزام SlimCore — شكل متناسق وجذاب",
    },
  ],

  // ── Before / After ──
  beforeAfter: {
    before: {
      title: "قبل ❌",
      points: [
        "بطن بارز وواضح",
        "الملابس ما كتجيش مزيان",
        "ثقة قليلة في النفس",
      ],
      image: "/images/before.svg",
    },
    after: {
      title: "بعد ✅",
      points: ["بطن مسطح فوراً", "شكل أنحف تحت الملابس", "ثقة أكبر في النفس"],
      image: "/images/after.svg",
    },
  },

  // ── Problems ──
  problems: [
    { icon: "👔", text: "ملابسك تبان ضيقة بسبب الكرش" },
    { icon: "🪞", text: "شكل البطن محرج في المناسبات" },
    { icon: "😔", text: "ثقتك في نفسك قليلة قدام الناس" },
    { icon: "🏋️", text: "جربت الرياضة والريجيم وما لقيت نتيجة سريعة" },
    { icon: "💸", text: "صرفت فلوس على منتجات ما نفعت" },
  ],

  // ── Benefits ──
  benefits: [
    {
      icon: "⚡",
      title: "إخفاء فوري للبطن",
      description: "البطن يختفي من اللحظة الأولى — نتيجة واضحة بدون انتظار",
    },
    {
      icon: "👕",
      title: "شكل أنحف تحت الملابس",
      description: "حزام رقيق وغير مرئي — يعطيك مظهر رشيق تحت أي لباس",
    },
    {
      icon: "💪",
      title: "تحسين شكل الجسم",
      description: "يشد الخصر ويعطي الجسم شكل متناسق وجذاب",
    },
    {
      icon: "🌬️",
      title: "مريح طول اليوم",
      description: "قماش خفيف قابل للتنفس — تقدر تلبسه الصباح للمسا بدون إزعاج",
    },
  ],

  // ── Guarantees ──
  guarantees: [
    {
      icon: "🚚",
      title: "توصيل مجاني",
      description: "لجميع مدن المغرب بدون أي رسوم إضافية",
    },
    {
      icon: "💰",
      title: "الدفع عند الاستلام",
      description: "خلص غير فاش توصلك السلعة ليديك",
    },
    {
      icon: "📦",
      title: "+1200 طلب",
      description: "ثقة أكثر من 1200 زبون في المغرب",
    },
    {
      icon: "✅",
      title: "جودة مضمونة",
      description: "منتج أصلي بجودة عالية مع ضمان الاستبدال",
    },
  ],
} as const;

// ── Derived helpers ──
export const PRICING_LIST = [
  siteConfig.offers.one,
  siteConfig.offers.two,
  siteConfig.offers.three,
] as const;

export type SiteConfig = typeof siteConfig;
