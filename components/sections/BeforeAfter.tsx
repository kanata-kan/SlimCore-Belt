import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowLeftRight, X, Check } from "lucide-react";

export default function BeforeAfter() {
  const { before, after } = siteConfig.beforeAfter;

  return (
    <section className="section-light pattern-arches py-16 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="pill-gold mb-3">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            الفرق واضح
          </div>
          <h2 className="sec-title">قبل و بعد الاستخدام</h2>
          <p className="sec-subtitle">شوف الفرق بنفسك</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BEFORE */}
          <div className="card overflow-hidden border-rose/15 hover:border-rose/30">
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-rose-2 to-rose-3">
              <Image
                src={before.image}
                alt="قبل استخدام الحزام"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute top-3 right-3 bg-rose text-white text-xs font-bold
                              px-3 py-1.5 rounded-full shadow-md"
              >
                قبل
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-head text-lg font-black text-rose mb-3 flex items-center gap-2">
                <X className="w-5 h-5" />
                {before.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {before.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-ink-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-rose-2 flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3 text-rose" />
                    </div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AFTER */}
          <div
            className="card overflow-hidden border-2 border-teal/20 hover:border-teal/40
                          shadow-[0_4px_24px_rgba(0,181,163,0.08)]"
          >
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-teal-2 to-teal-3">
              <Image
                src={after.image}
                alt="بعد استخدام الحزام"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute top-3 right-3 bg-teal text-white text-xs font-bold
                              px-3 py-1.5 rounded-full shadow-md"
              >
                بعد
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-head text-lg font-black text-teal mb-3 flex items-center gap-2">
                <Check className="w-5 h-5" />
                {after.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {after.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-ink-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-teal-2 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-teal" />
                    </div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
