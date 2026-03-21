import { siteConfig } from "@/config/site";
import { ShoppingCart, Truck, BadgeCheck, Package, Star } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 px-5 text-center overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 section-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(0,181,163,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(21,84,232,0.25),transparent_50%)]" />
      {/* Moroccan pattern overlay on dark */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 15 L45 15 L37 22 L40 32 L30 26 L20 32 L23 22 L15 15 L25 15Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Stars */}
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-gold fill-gold" />
          ))}
        </div>

        <h2 className="font-head text-2xl md:text-4xl font-black mb-5 text-white leading-tight">
          لا تضيّع الفرصة!
          <br />
          <span className="text-teal">اطلب الآن وشوف الفرق من اليوم الأول</span>
        </h2>
        <p className="text-sm md:text-base text-white/60 leading-[1.8] mb-10 max-w-lg mx-auto">
          +{siteConfig.ordersCount} مغربي سبقوك وطلبو {siteConfig.productNameAr}{" "}
          — مظهر أنحف تحت الملابس، توصيل مجاني، والدفع عند الاستلام
        </p>

        <a href="#order" className="btn-cta max-w-sm mx-auto">
          <ShoppingCart className="w-5 h-5" />
          اطلب الآن — {siteConfig.payment}
        </a>

        <div className="flex items-center justify-center gap-6 mt-8 text-[13px] text-white/45 font-semibold">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            توصيل مجاني
          </span>
          <span className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4" />
            {siteConfig.payment}
          </span>
          <span className="flex items-center gap-2">
            <Package className="w-4 h-4" />+{siteConfig.ordersCount} طلب
          </span>
        </div>
      </div>
    </section>
  );
}
