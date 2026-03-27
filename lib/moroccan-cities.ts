// ─────────────────────────────────────────────────────────────
// Moroccan Cities — Complete list organized by region
// All 12 regions of Morocco with their major cities in Arabic
// Sorted alphabetically within each region for easy lookup
// ─────────────────────────────────────────────────────────────

export interface MoroccanCity {
  name: string;
  region: string;
}

/** All 12 administrative regions of Morocco */
export const REGIONS = [
  "طنجة-تطوان-الحسيمة",
  "الشرق",
  "فاس-مكناس",
  "الرباط-سلا-القنيطرة",
  "بني ملال-خنيفرة",
  "الدار البيضاء-سطات",
  "مراكش-آسفي",
  "درعة-تافيلالت",
  "سوس-ماسة",
  "كلميم-واد نون",
  "العيون-الساقية الحمراء",
  "الداخلة-وادي الذهب",
] as const;

/** Complete list of Moroccan cities organized by region */
const CITIES_BY_REGION: Record<string, string[]> = {
  "طنجة-تطوان-الحسيمة": [
    "طنجة",
    "تطوان",
    "الحسيمة",
    "العرائش",
    "القصر الكبير",
    "أصيلة",
    "شفشاون",
    "الفنيدق",
    "مرتيل",
    "المضيق",
    "وزان",
    "تارجيست",
  ],
  "الشرق": [
    "وجدة",
    "الناظور",
    "بركان",
    "تاوريرت",
    "جرادة",
    "فجيج",
    "الدريوش",
    "العيون الشرقية",
    "السعيدية",
    "أحفير",
    "بوعرفة",
    "زايو",
    "قرية أركمان",
    "بن طيب",
    "ميضار",
  ],
  "فاس-مكناس": [
    "فاس",
    "مكناس",
    "تازة",
    "إفران",
    "صفرو",
    "مولاي يعقوب",
    "بولمان",
    "الحاجب",
    "أزرو",
    "تاونات",
    "جرسيف",
    "ميسور",
  ],
  "الرباط-سلا-القنيطرة": [
    "الرباط",
    "سلا",
    "القنيطرة",
    "تمارة",
    "الخميسات",
    "سيدي قاسم",
    "سيدي سليمان",
    "الصخيرات",
    "بوزنيقة",
    "سيدي يحيى الغرب",
    "مشرع بلقصيري",
    "تيفلت",
  ],
  "بني ملال-خنيفرة": [
    "بني ملال",
    "خنيفرة",
    "الفقيه بن صالح",
    "أزيلال",
    "خريبكة",
    "وادي زم",
    "أبي الجعد",
    "قصبة تادلة",
    "دمنات",
    "ميدلت",
  ],
  "الدار البيضاء-سطات": [
    "الدار البيضاء",
    "المحمدية",
    "سطات",
    "الجديدة",
    "برشيد",
    "بنسليمان",
    "سيدي بنور",
    "أزمور",
    "مديونة",
    "النواصر",
    "بن أحمد",
    "وادي زم",
  ],
  "مراكش-آسفي": [
    "مراكش",
    "آسفي",
    "الصويرة",
    "قلعة السراغنة",
    "شيشاوة",
    "الرحامنة",
    "اليوسفية",
    "ابن جرير",
  ],
  "درعة-تافيلالت": [
    "الراشيدية",
    "ورزازات",
    "زاكورة",
    "تنغير",
    "ميدلت",
    "الريصاني",
    "أرفود",
    "كلعة مكونة",
    "بومالن دادس",
  ],
  "سوس-ماسة": [
    "أكادير",
    "إنزكان",
    "تيزنيت",
    "طاطا",
    "تارودانت",
    "أيت ملول",
    "الدشيرة الجهادية",
    "أولاد تايمة",
    "بيوكرى",
    "أكادير إداوتنان",
  ],
  "كلميم-واد نون": [
    "كلميم",
    "طانطان",
    "سيدي إفني",
    "آسا-الزاك",
  ],
  "العيون-الساقية الحمراء": [
    "العيون",
    "بوجدور",
    "السمارة",
    "طرفاية",
  ],
  "الداخلة-وادي الذهب": [
    "الداخلة",
    "أوسرد",
    "بئر كندوز",
  ],
};

/**
 * All Moroccan cities as a flat array — sorted alphabetically in Arabic.
 * Use this directly in `<select>` dropdowns.
 */
export const MOROCCAN_CITIES: string[] = Object.values(CITIES_BY_REGION)
  .flat()
  .filter((city, index, self) => self.indexOf(city) === index) // remove duplicates
  .sort((a, b) => a.localeCompare(b, "ar"));

/**
 * All cities with their region — useful for detailed address info.
 */
export const MOROCCAN_CITIES_WITH_REGION: MoroccanCity[] = Object.entries(
  CITIES_BY_REGION,
).flatMap(([region, cities]) =>
  cities.map((name) => ({ name, region })),
);

/**
 * Get cities for a specific region.
 */
export function getCitiesByRegion(region: string): string[] {
  return CITIES_BY_REGION[region] ?? [];
}

/**
 * Total number of unique cities.
 */
export const TOTAL_CITIES = MOROCCAN_CITIES.length;
