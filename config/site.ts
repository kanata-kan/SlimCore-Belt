// ─────────────────────────────────────────
// Central Site Configuration
// ALL client data in ONE place — no hardcoded values anywhere
// ─────────────────────────────────────────

export const siteConfig = {
  // ── WhatsApp ──
  whatsappNumber: "212716553578",

  // ── Product ──
  productName: "SlimCore Belt",
  productNameAr: "مشد البطن الفوري",

  headline: {
    pain: "كرشك محشماك؟",
    solution: "شد بطنك من أول استعمال",
    ease: "بلا جيم بلا رجيم",
  },

  color: "أسود",

  // ── Pricing ──
  currency: "MAD",
  currencyAr: "درهم",
  offers: {
    one: {
      qty: 1,
      price: 199,
      total: 199,
      label: "جربه اليوم",
      badge: "",
    },

    two: {
      qty: 2,
      price: 175,
      total: 349,
      label: "أفضل اختيار",
      badge: "🔥 الأكثر طلباً اليوم",
    },

    three: {
      qty: 3,
      price: 150,
      total: 449,
      label: "وفّر أكثر",
      badge: "💰 عرض محدود",
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
    "🚚 توصيل مجاني حتى لباب دارك فـ أي مدينة فالمغرب",
    "💰 خلص غير ملي توصلك السلعة وتشوفها بعينيك",
    "📦 أكثر من 1200 مغربي جربوه وفرق معاهم من أول لبسة",
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
      image: "/images/slide-1.webp",
      alt: "حزام SlimCore — إخفاء فوري للبطن",
      caption: "إخفاء فوري للبطن",
      sub: "نتيجة واضحة من أول لبسة",
    },
    {
      image: "/images/slide-2.webp",
      alt: "حزام SlimCore — مظهر أنحف تحت الملابس",
      caption: "رقيق وغير مرئي",
      sub: "يختفي تحت أي لباس",
    },
    {
      image: "/images/slide-3.webp",
      alt: "حزام SlimCore — شكل متناسق وجذاب",
      caption: "شكل متناسق وجذاب",
      sub: "ثقة أكبر في كل مناسبة",
    },
    {
      image: "/images/slide-4.webp",
      alt: "حزام SlimCore — مريح طول اليوم",
      caption: "مريح طول اليوم",
      sub: "قماش خفيف قابل للتنفس",
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
      image: "/images/before.webp",
    },
    after: {
      title: "بعد ✅",
      points: ["بطن مسطح فوراً", "شكل أنحف تحت الملابس", "ثقة أكبر في النفس"],
      image: "/images/after.webp",
    },
  },

  // ── Problems ──
  problems: [
    {
      icon: "👔",
      text: "كتلبس التيشورت وكيبقى الكرش باين ومضايقك",
    },
    {
      icon: "🪞",
      text: "كتشوف راسك فالمرا وما راضيش على الشكل ديالك",
    },
    {
      icon: "😔",
      text: "محشماك الكرش قدام الناس وكتفقد الثقة فراسك",
    },
    {
      icon: "🏋️",
      text: "جربتي الجيم والريجيم ولكن النتائج بطيئة أو ما كايناش",
    },
    {
      icon: "💸",
      text: "ضيعتي فلوسك على حلول وما عطاوك حتى نتيجة",
    },
  ],

  // ── Benefits ──
  benefits: [
    {
      icon: "⚡",
      title: "بطن مشدود من أول لبسة",
      description: "غتشوف الفرق فالمرا من أول مرة تلبسو — النتيجة كتبان مباشرة",
    },
    {
      icon: "👕",
      title: "كتبان أضعف فلباسك",
      description: "أي تيشورت ولا قميص غيجيو عليك منظمين وبدون كرش باين",
    },
    {
      icon: "💪",
      title: "ترجع الثقة فراسك",
      description: "توقف قدام الناس مرتاح وبلا إحراج من الشكل ديالك",
    },
    {
      icon: "🌬️",
      title: "ما غتحسش بيه نهار كامل",
      description: "لبسو من الصباح حتى للمسا وعيش يومك عادي بلا ضيق ولا سخونية",
    },
  ],
  // ── Guarantees ──
  guarantees: [
    {
      icon: "👀",
      title: "شوف قبل ما تخلص",
      description: "تقدر تشوف المنتج بعينيك ملي يوصلك وتقرر بكل راحة",
    },
    {
      icon: "💰",
      title: "بلا حتى ريسك",
      description: "ما غتخلص حتى تكون مقتانع 100% بالمنتج",
    },
    {
      icon: "🔄",
      title: "تبديل ساهل",
      description: "إلا ما جاكش المقاس مناسب، نبدلوه ليك بسهولة",
    },
    {
      icon: "🇲🇦",
      title: "مجرب فالمغرب",
      description: "أكثر من 1200 مغربي جربوه وفرق معاهم فعلاً",
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
