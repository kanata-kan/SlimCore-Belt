import { siteConfig, PRICING_LIST } from "@/config/site";
import { Tag, Truck, Star, Crown } from "lucide-react";

export default function Offer() {
  return (
    <section className="section-offer py-20 px-5">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="pill-teal mb-4">
            <Tag className="w-3.5 h-3.5" />
            عروض حصرية
          </div>
          <h2 className="sec-title">اختار العرض اللي يناسبك</h2>
          <p className="sec-subtitle">
            كلما زدتي الكمية، كلما وفّرتي أكثر — توصيل مجاني لكل العروض
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 max-w-xl md:max-w-none mx-auto">
          {PRICING_LIST.map((tier) => {
            const isPopular = tier.qty === 2;
            const isBest = tier.qty === 3;
            const TierIcon = isBest ? Crown : isPopular ? Star : Tag;
            return (
              <a
                key={tier.qty}
                href="#order"
                className={`card relative p-6 block flex-1 group
                  ${
                    isPopular
                      ? "border-2 border-blue ring-4 ring-blue/8 scale-[1.02] md:scale-105"
                      : ""
                  }
                  ${isBest ? "border-2 border-teal ring-4 ring-teal/8" : ""}
                  ${!isPopular && !isBest ? "border border-blue/8" : ""}`}
              >
                {tier.badge && (
                  <span
                    className={`absolute -top-3.5 right-4 text-xs font-bold px-4 py-1.5
                                rounded-full text-white shadow-md flex items-center gap-1.5
                    ${isPopular ? "bg-gradient-to-r from-blue to-blue-2" : ""}
                    ${isBest ? "bg-gradient-to-r from-teal to-teal-4" : ""}`}
                  >
                    <TierIcon className="w-3 h-3" />
                    {tier.badge}
                  </span>
                )}

                <div className="flex items-center justify-between md:flex-col md:items-center md:text-center md:gap-3">
                  <div>
                    <h3 className="font-head text-lg font-bold mb-0.5">
                      {tier.label}
                    </h3>
                    <p className="text-sm text-ink-3">
                      {tier.price} {siteConfig.currencyAr} للوحدة
                    </p>
                  </div>
                  <div className="text-left md:text-center">
                    <div className="font-head text-3xl md:text-4xl font-black text-blue">
                      {tier.total}
                    </div>
                    <div className="text-xs text-ink-4 font-semibold">
                      {siteConfig.currencyAr}
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-ink-3">
          <Truck className="w-4 h-4 text-teal" />
          التوصيل {siteConfig.shipping.text} لجميع المدن
        </div>
      </div>
    </section>
  );
}
