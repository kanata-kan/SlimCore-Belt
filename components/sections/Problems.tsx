import { siteConfig } from "@/config/site";
import { AlertTriangle, X } from "lucide-react";

export default function Problem() {
  return (
    <section className="section-alt py-20 px-5">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="pill-rose mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            هل كتعاني من هاد المشاكل؟
          </div>
          <h2 className="sec-title">الكرش كيأثر على مظهرك وثقتك كل يوم</h2>
          <p className="sec-subtitle">
            كل واحد فينا كيعرف هاد الإحساس — مكتحسش براحتك فالملابس وكتحاول تخبي
            بطنك ديما
          </p>
        </div>

        <ul className="flex flex-col gap-3.5 max-w-xl mx-auto" role="list">
          {siteConfig.problems.map((p, i) => (
            <li
              key={i}
              className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4
                         text-[15px] font-semibold leading-relaxed
                         transition-all duration-300 hover:translate-x-1"
              style={{
                border: "1px solid rgba(240,79,95,0.12)",
                boxShadow: "0 2px 16px rgba(240,79,95,0.06)",
              }}
            >
              <div className="icon-box-rose">
                <X className="w-5 h-5" />
              </div>
              <span className="text-ink-2">{p.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
