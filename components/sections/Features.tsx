import { siteConfig } from "@/config/site";
import { Zap, Shirt, Dumbbell, Wind, CheckCircle2 } from "lucide-react";

const BENEFIT_ICONS = [Zap, Shirt, Dumbbell, Wind];

export default function Benefits() {
  return (
    <section className="section-light py-16 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="pill-blue mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            الحل
          </div>
          <h2 className="sec-title">
            شنو غادي يدير ليك {siteConfig.productNameAr}؟
          </h2>
          <p className="sec-subtitle">نتائج واضحة من اللحظة الأولى</p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
          {siteConfig.benefits.map((b, i) => {
            const Icon = BENEFIT_ICONS[i] ?? Zap;
            return (
              <li key={i} className="card flex gap-4 items-start p-5 group">
                <div className="icon-box-blue group-hover:bg-blue group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-ink mb-1">
                    {b.title}
                  </h3>
                  <p className="text-[13px] text-ink-3 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
