import { siteConfig } from "@/config/site";
import { AlertTriangle, X } from "lucide-react";

export default function Problem() {
  return (
    <section className="section-alt pattern-zellige py-16 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="pill-rose mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            هل عندك هاد المشاكل؟
          </div>
          <h2 className="sec-title">الكرش كيأثر على ثقتك كل يوم</h2>
          <p className="sec-subtitle">كل واحد فينا كيعرف هاد الإحساس...</p>
        </div>

        <ul className="flex flex-col gap-3 max-w-xl mx-auto" role="list">
          {siteConfig.problems.map((p, i) => (
            <li
              key={i}
              className="flex items-center gap-4 bg-white border border-rose/12
                         rounded-2xl px-5 py-4 text-sm font-semibold
                         shadow-[0_2px_12px_rgba(240,79,95,0.06)]
                         transition-all duration-200 hover:border-rose/25"
            >
              <div className="icon-box-rose">
                <X className="w-5 h-5" />
              </div>
              {p.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
