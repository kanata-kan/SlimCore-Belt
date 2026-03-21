"use client";

import { useState, useRef, useCallback } from "react";
import type { OrderFormData } from "@/types";
import { trackEvent } from "@/lib/analytics";
import { siteConfig, PRICING_LIST } from "@/config/site";

type FormState = "idle" | "loading" | "success" | "error";

const MOROCCAN_PHONE = /^(\+212|00212|0)[5-7][0-9]{8}$/;

function buildWhatsAppUrl(form: OrderFormData, total: number): string {
  const line = "━━━━━━━━━━━━━━━━━━━━";
  const msg = encodeURIComponent(
    `🛒 *طلب جديد — ${siteConfig.productName}*
${line}

*معلومات الزبون:*
▸ الاسم: *${form.name}*
▸ الهاتف: *${form.phone}*
▸ المدينة: *${form.city}*
▸ العنوان: ${form.address}

${line}
*تفاصيل الطلب:*
▸ المنتج: ${siteConfig.productNameAr}
▸ المقاس: *${form.size}*
▸ الكمية: *${form.quantity}*
▸ المبلغ: *${total} ${siteConfig.currencyAr}*

${line}
🚚 التوصيل: *مجاني* لجميع المدن
💰 الدفع: *عند الاستلام*
${line}

✅ *المرجو تأكيد الطلب*`,
  );
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${msg}`;
}

export default function OrderForm() {
  const [form, setForm] = useState<Partial<OrderFormData>>({
    quantity: siteConfig.defaultQuantity,
    size: siteConfig.defaultSize,
  });
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formStarted = useRef(false);

  const v = siteConfig.validation;
  const p = siteConfig.placeholders;

  const validateField = useCallback(
    (name: string, value: string): string => {
      switch (name) {
        case "name":
          if (!value.trim()) return v.nameRequired;
          if (value.trim().length < 3) return v.nameMin;
          return "";
        case "phone": {
          if (!value.trim()) return v.phoneRequired;
          const clean = value.replace(/[\s-]/g, "");
          if (!MOROCCAN_PHONE.test(clean)) return v.phoneInvalid;
          return "";
        }
        case "city":
          if (!value.trim()) return v.cityRequired;
          return "";
        case "address":
          if (!value.trim()) return v.addressRequired;
          return "";
        case "size":
          if (!value) return v.sizeRequired;
          return "";
        default:
          return "";
      }
    },
    [v],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (!formStarted.current) {
      formStarted.current = true;
      trackEvent({ event: "ViewContent" });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const qty = form.quantity ?? siteConfig.defaultQuantity;
  const tier = PRICING_LIST.find((t) => t.qty === qty) ?? PRICING_LIST[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fieldErrors: Record<string, string> = {};
    for (const field of ["name", "phone", "city", "address", "size"] as const) {
      const err = validateField(field, (form[field] as string) ?? "");
      if (err) fieldErrors[field] = err;
    }
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setState("loading");

    const orderData: OrderFormData = {
      name: form.name!.trim(),
      phone: form.phone!.replace(/[\s-]/g, ""),
      city: form.city!.trim(),
      address: form.address!.trim(),
      size: form.size!,
      quantity: Number(form.quantity),
    };

    try {
      // A) Save to MongoDB
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();

      if (data.success) {
        setState("success");
        setMessage(siteConfig.messages.orderSuccess);
        trackEvent({ event: "Lead", value: tier.total });

        // B) Redirect to WhatsApp
        const waUrl = buildWhatsAppUrl(orderData, tier.total);
        window.open(waUrl, "_blank");
      } else {
        setState("error");
        setMessage(data.message ?? siteConfig.messages.orderError);
      }
    } catch {
      setState("error");
      setMessage(siteConfig.messages.connectionError);
    }
  };

  const inputClass = (field: string) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all bg-white
     ${errors[field] ? "border-rose focus:border-rose focus:ring-rose/10" : "border-blue/15 focus:border-blue/40 focus:ring-blue/10"}`;

  return (
    <section id="order" className="bg-s2 py-14 px-5">
      <div className="max-w-lg mx-auto">
        <div
          className="bg-white border-2 border-blue/20 rounded-[22px] p-6 md:p-8
                     shadow-[0_16px_48px_rgba(21,84,232,.12)] overflow-hidden relative"
        >
          {/* Top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue to-teal"
            aria-hidden="true"
          />

          {/* Header */}
          <div className="text-center mb-5">
            <div className="pill-blue inline-flex justify-center mb-2">
              🛒 اطلب الآن
            </div>
            <h2 className="font-head text-2xl font-black">أكمل طلبك</h2>
          </div>

          {/* Price summary */}
          <div className="flex items-center justify-between bg-blue-3 rounded-xl px-4 py-3 mb-5">
            <span className="text-sm font-semibold text-ink-2">
              {tier.label} — توصيل {siteConfig.shipping.text}
            </span>
            <span className="font-head text-2xl font-black text-blue">
              {tier.total}{" "}
              <span className="text-sm">{siteConfig.currencyAr}</span>
            </span>
          </div>

          {state === "success" ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-head text-xl font-black text-teal mb-3">
                تم تسجيل طلبك بنجاح!
              </h3>
              <p className="text-sm text-ink-2 leading-relaxed mb-4">
                {message}
              </p>
              <p className="text-xs text-ink-3">
                سيتم فتح واتساب لتأكيد الطلب...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label="نموذج الطلب">
              <div className="flex flex-col gap-3.5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-1.5"
                  >
                    الاسم الكامل <span className="text-rose">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name ?? ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={p.name}
                    required
                    className={inputClass("name")}
                  />
                  {errors.name && (
                    <p className="text-rose text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold mb-1.5"
                  >
                    رقم الهاتف <span className="text-rose">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone ?? ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={p.phone}
                    required
                    className={inputClass("phone")}
                    dir="ltr"
                  />
                  {errors.phone && (
                    <p className="text-rose text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold mb-1.5"
                  >
                    المدينة <span className="text-rose">*</span>
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={form.city ?? ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={inputClass("city")}
                  >
                    <option value="" disabled>
                      {p.city}
                    </option>
                    {siteConfig.cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-rose text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold mb-1.5"
                  >
                    العنوان <span className="text-rose">*</span>
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address ?? ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={p.address}
                    required
                    className={inputClass("address")}
                  />
                  {errors.address && (
                    <p className="text-rose text-xs mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Size + Quantity */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="size"
                      className="block text-sm font-semibold mb-1.5"
                    >
                      المقاس <span className="text-rose">*</span>
                    </label>
                    <select
                      id="size"
                      name="size"
                      value={form.size ?? ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={inputClass("size")}
                    >
                      {siteConfig.sizes.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.size && (
                      <p className="text-rose text-xs mt-1">{errors.size}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-semibold mb-1.5"
                    >
                      الكمية
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      className="w-full border border-blue/15 rounded-xl px-4 py-3
                                 text-sm focus:outline-none focus:border-blue/40
                                 focus:ring-2 focus:ring-blue/10 transition-all bg-white"
                    >
                      {PRICING_LIST.map((t) => (
                        <option key={t.qty} value={t.qty}>
                          {t.qty} — {t.total} {siteConfig.currencyAr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Error */}
                {state === "error" && (
                  <div
                    className="bg-rose-2 border border-rose/20 rounded-xl px-4 py-3 text-sm text-rose"
                    role="alert"
                  >
                    {message}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="btn-cta mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === "loading" ? (
                    <>
                      <span className="spinner" aria-hidden="true" />
                      جاري تسجيل طلبك...
                    </>
                  ) : (
                    "🛒 تأكيد الطلب — الدفع عند الاستلام"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Trust */}
          <div className="flex items-center justify-center flex-wrap gap-3.5 mt-4 text-[11.5px] text-ink-3">
            <span>💰 {siteConfig.payment}</span>
            <span>🚚 توصيل {siteConfig.shipping.text}</span>
            <span>✅ جودة مضمونة</span>
          </div>
        </div>
      </div>
    </section>
  );
}
