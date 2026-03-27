import { siteConfig, PRICING_LIST } from "@/config/site";
import { ShoppingCart, Truck, BadgeCheck, Package } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="w-full lg:w-[45%] text-center lg:text-right">
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold mb-6"
        style={{
          background: "linear-gradient(135deg, #e8effe, #dbeafe)",
          border: "1px solid rgba(21,84,232,0.15)",
        }}
      >
        <Package className="w-4 h-4 text-blue" />
        <span className="text-blue">
          +{siteConfig.ordersCount} مغربي طلبو هاد المنتج
        </span>
      </div>

      {/* H1 */}
      <h1 className="font-head text-[clamp(28px,7vw,50px)] font-black leading-[1.15] mb-5">
        <span className="text-gradient">كرشك محشماك؟</span>
        <br />
        <span className="text-ink">شد بطنك من أول استعمال بلا جيم</span>
      </h1>

      {/* Sub-headline */}
      <p className="text-base md:text-lg text-ink-3 leading-[1.8] max-w-md mx-auto lg:mx-0 mb-7">
        رجّع ثقتك فراسك وخليك مرتاح فلباسك من أول نهار. لبس{" "}
        {siteConfig.productNameAr} تحت الملابس وشوف الفرق فوراً، مع توصيل مجاني
        لجميع مدن المغرب.
      </p>

      {/* Price row */}
      <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
        <div className="flex items-baseline gap-1.5">
          <span className="font-head text-4xl md:text-5xl font-black text-blue">
            {PRICING_LIST[0].total}
          </span>
          <span className="text-lg font-bold text-ink-3">
            {siteConfig.currencyAr}
          </span>
        </div>
        <span
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5
                         rounded-full bg-teal-2 text-teal border border-teal/10"
        >
          <Truck className="w-3.5 h-3.5" />
          توصيل مجاني
        </span>
      </div>

      {/* CTA */}
      <a href="#order" className="btn-primary max-w-sm mx-auto lg:mx-0">
        <ShoppingCart className="w-5 h-5" />
        اطلب الآن — {siteConfig.payment}
      </a>

      {/* Trust micro-row */}
      <div className="flex items-center justify-center lg:justify-start gap-5 mt-4 text-xs text-ink-3">
        <span className="flex items-center gap-1.5">
          <BadgeCheck className="w-4 h-4 text-teal" />
          {siteConfig.payment}
        </span>
        <span className="flex items-center gap-1.5">
          <Truck className="w-4 h-4 text-blue" />
          توصيل {siteConfig.shipping.text}
        </span>
      </div>
    </div>
  );
}
