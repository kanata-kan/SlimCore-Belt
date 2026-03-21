import { siteConfig } from "@/config/site";
import { Shield, Truck, Package, BadgeCheck } from "lucide-react";

const GUARANTEE_ICONS = [Truck, BadgeCheck, Package, Shield];

export default function Trust() {
  return (
    <section className="section-trust py-20 px-5">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="pill-teal mb-4">
            <Shield className="w-3.5 h-3.5" />
            ضمانات حقيقية
          </div>
          <h2 className="sec-title">علاش آلاف المغاربة وثقو فينا؟</h2>
          <p className="sec-subtitle">
            اطلب براحتك — ضمانات واضحة وخدمة ما بعد البيع
          </p>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-5" role="list">
          {siteConfig.guarantees.map((g, i) => {
            const Icon = GUARANTEE_ICONS[i] ?? Shield;
            return (
              <li key={i} className="card p-6 text-center group">
                <div
                  className="w-14 h-14 mx-auto mb-4 rounded-2xl
                              flex items-center justify-center
                              transition-all duration-300
                              group-hover:scale-110"
                  style={{
                    background:
                      "linear-gradient(135deg, #e0faf8 0%, #dbeafe 100%)",
                  }}
                >
                  <Icon className="w-6 h-6 text-teal group-hover:text-blue transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-bold mb-1.5">{g.title}</h3>
                <p className="text-[13px] text-ink-3 leading-relaxed">
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
