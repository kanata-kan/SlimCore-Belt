import { siteConfig, PRICING_LIST } from "@/config/site";
import { MOROCCAN_CITIES } from "@/lib/moroccan-cities";
import type { OrderFormData } from "@/types";
import type { FormState } from "./useOrderForm";

interface OrderFormFieldsProps {
  form: Partial<OrderFormData>;
  state: FormState;
  message: string;
  errors: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  inputClass: (field: string) => string;
}

export default function OrderFormFields({
  form,
  state,
  message,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  inputClass,
}: OrderFormFieldsProps) {
  const p = siteConfig.placeholders;

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="نموذج الطلب">
      <div className="flex flex-col gap-3.5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-1.5">
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
          <label htmlFor="phone" className="block text-sm font-semibold mb-1.5">
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
          <label htmlFor="city" className="block text-sm font-semibold mb-1.5">
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
            {MOROCCAN_CITIES.map((c) => (
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
  );
}
