import { siteConfig } from "@/config/site";
import { ShoppingCart, Truck, BadgeCheck, Package } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-20 px-5 text-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 section-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,181,163,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(21,84,232,0.2),transparent_50%)]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="font-head text-2xl md:text-4xl font-black mb-4 text-white">
          لا تضيّع الفرصة!
        </h2>
        <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8 max-w-md mx-auto">
          {siteConfig.ordersCount} شخص في المغرب سبقوك — اطلب{" "}
          {siteConfig.productNameAr} الآن واستمتع بمظهر أنحف من اليوم الأول
        </p>

        <a
          href="#order"
          className="btn-cta max-w-sm mx-auto !shadow-[0_8px_32px_rgba(0,181,163,0.4)]"
        >
          <ShoppingCart className="w-5 h-5" />
          اطلب الآن — {siteConfig.payment}
        </a>

        <div className="flex items-center justify-center gap-5 mt-6 text-xs text-white/50">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" />
            توصيل {siteConfig.shipping.text}
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck className="w-3.5 h-3.5" />
            {siteConfig.payment}
          </span>
          <span className="flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5" />
            {siteConfig.ordersCount} طلب
          </span>
        </div>
      </div>
    </section>
  );
}
