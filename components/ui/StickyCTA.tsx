"use client";

import { useEffect, useState } from "react";
import { siteConfig, PRICING_LIST } from "@/config/site";
import { ShoppingCart } from "lucide-react";

export default function StickyCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const order = document.getElementById("order");
    if (!order) return;

    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(order);
    return () => io.disconnect();
  }, []);

  const handleClick = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[999]
                 flex items-center gap-3 px-4 py-3
                 bg-white/95 backdrop-blur-xl
                 border-t border-blue/8
                 shadow-[0_-4px_24px_rgba(0,0,0,.08)]
                 transition-transform duration-300 ease-out
                 lg:hidden"
      style={{
        transform: hidden ? "translateY(100%)" : "translateY(0)",
        maxWidth: "100vw",
        overflow: "hidden",
        padding: "max(12px, 3vw)",
      }}
      aria-hidden={hidden}
    >
      <div className="flex flex-col leading-tight">
        <span className="font-head text-xl font-black text-blue whitespace-nowrap">
          {PRICING_LIST[0].total} {siteConfig.currencyAr}
        </span>
        <span className="text-[10px] text-ink-4 font-medium">توصيل مجاني</span>
      </div>
      <button
        onClick={handleClick}
        className="flex-1 flex items-center justify-center gap-2
                   text-white font-head text-[15px] font-extrabold
                   py-3.5 px-4 rounded-2xl
                   shadow-cta transition-all duration-300 ease-out
                   active:scale-[0.98] min-w-0"
        style={{
          background: "linear-gradient(135deg, #1554e8, #0C3DC4, #00B5A3)",
        }}
        aria-label="اطلب الآن — الدفع عند الاستلام"
      >
        <ShoppingCart className="w-4.5 h-4.5 flex-shrink-0" />
        <span className="truncate">اطلب الآن</span>
      </button>
    </div>
  );
}
