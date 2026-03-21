import { siteConfig } from "@/config/site";
import { Truck, BadgeCheck, Package } from "lucide-react";

const TRUST_ICONS = [Truck, BadgeCheck, Package];

export default function TrustBar() {
  return (
    <div
      className="relative z-10 flex items-center justify-center gap-4 md:gap-8 px-4 py-3
                 text-white text-[11px] md:text-sm font-semibold"
      style={{
        background:
          "linear-gradient(135deg, #0C3DC4 0%, #1554E8 50%, #00B5A3 100%)",
      }}
      role="banner"
      aria-label="ضمانات المنتج"
    >
      {siteConfig.trustItems.map((item, i) => {
        const Icon = TRUST_ICONS[i] ?? Package;
        return (
          <span
            key={item}
            className="flex items-center gap-1.5 whitespace-nowrap"
          >
            <Icon className="w-3.5 h-3.5 opacity-80" />
            <span>{item.replace(/^[^\s]+\s/, "")}</span>
          </span>
        );
      })}
    </div>
  );
}
