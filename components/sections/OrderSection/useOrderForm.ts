"use client";

import { useState, useRef, useCallback } from "react";
import type { OrderFormData } from "@/types";
import { trackEvent } from "@/lib/analytics";
import { siteConfig, PRICING_LIST } from "@/config/site";

/* ═══════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════ */
export type FormState = "idle" | "loading" | "success" | "error";

/* ═══════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   useOrderForm — encapsulates all order form logic
   ═══════════════════════════════════════════════════════════════ */
export interface UseOrderFormReturn {
  form: Partial<OrderFormData>;
  state: FormState;
  message: string;
  errors: Record<string, string>;
  qty: number;
  tier: (typeof PRICING_LIST)[number];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  inputClass: (field: string) => string;
}

export function useOrderForm(): UseOrderFormReturn {
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

  /* ━━━ Validation ━━━ */
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

  /* ━━━ Handlers ━━━ */
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

  /* ━━━ Utility ━━━ */
  const inputClass = (field: string) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all bg-white
     ${errors[field] ? "border-rose focus:border-rose focus:ring-rose/10" : "border-blue/15 focus:border-blue/40 focus:ring-blue/10"}`;

  return {
    form,
    state,
    message,
    errors,
    qty,
    tier,
    handleChange,
    handleBlur,
    handleSubmit,
    inputClass,
  };
}
