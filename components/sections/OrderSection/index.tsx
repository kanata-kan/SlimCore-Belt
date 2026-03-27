"use client";

import { siteConfig } from "@/config/site";
import { useOrderForm } from "./useOrderForm";
import OrderSuccess from "./OrderSuccess";
import OrderFormFields from "./OrderFormFields";

export default function OrderForm() {
  const {
    form,
    state,
    message,
    errors,
    tier,
    handleChange,
    handleBlur,
    handleSubmit,
    inputClass,
  } = useOrderForm();

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
            <OrderSuccess message={message} />
          ) : (
            <OrderFormFields
              form={form}
              state={state}
              message={message}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleSubmit={handleSubmit}
              inputClass={inputClass}
            />
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
