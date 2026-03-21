import { siteConfig } from "@/config/site";
import { Shield, Truck, Package, BadgeCheck } from "lucide-react";

const GUARANTEE_ICONS = [Truck, BadgeCheck, Package, Shield];

export default function Trust() {
  return (
    <section className="section-light pattern-zellige py-16 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="pill-teal mb-3">
            <Shield className="w-3.5 h-3.5" />
            علاش تثق فينا؟
          </div>
          <h2 className="sec-title">اطلب بدون أي مخاطرة</h2>
          <p className="sec-subtitle">ضمانات حقيقية باش تطلب براحتك</p>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4" role="list">
          {siteConfig.guarantees.map((g, i) => {
            const Icon = GUARANTEE_ICONS[i] ?? Shield;
            return (
              <li key={i} className="card p-5 text-center group">
                <div
                  className="w-12 h-12 mx-auto mb-3 rounded-2xl
                                bg-gradient-to-br from-teal-2 to-blue-3
                                flex items-center justify-center
                                group-hover:from-teal group-hover:to-blue
                                transition-all duration-300"
                >
                  <Icon className="w-6 h-6 text-teal group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-sm font-bold mb-1">{g.title}</h3>
                <p className="text-[12px] text-ink-3 leading-snug">
                  {g.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
