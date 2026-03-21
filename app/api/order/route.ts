import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { OrderFormData, OrderDocument, OrderResponse } from "@/types";

// ─────────────────────────────────────────
// Rate limiting (simple in-memory)
// ─────────────────────────────────────────
const rateMap = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

// ─────────────────────────────────────────
// Validation
// ─────────────────────────────────────────
const VALID_SIZES = ["M", "L", "XL"];
const MOROCCAN_PHONE = /^(\+212|00212|0)[5-7][0-9]{8}$/;

function validateOrder(data: Partial<OrderFormData>): string | null {
  if (!data.name?.trim()) return "الاسم الكامل مطلوب";
  if (data.name.trim().length < 3) return "الاسم يجب أن يكون 3 أحرف على الأقل";
  if (!data.phone?.trim()) return "رقم الهاتف مطلوب";

  const cleanPhone = data.phone.replace(/[\s-]/g, "");
  if (!MOROCCAN_PHONE.test(cleanPhone))
    return "رقم الهاتف غير صحيح (مثال: 0612345678)";

  if (!data.city?.trim()) return "المدينة مطلوبة";
  if (!data.address?.trim()) return "العنوان مطلوب";
  if (!data.size || !VALID_SIZES.includes(data.size)) return "المقاس مطلوب";

  const qty = Number(data.quantity);
  if (!qty || qty < 1 || qty > 3) return "الكمية يجب أن تكون بين 1 و 3";

  return null;
}

// ─────────────────────────────────────────
// POST /api/order
// ─────────────────────────────────────────
export async function POST(
  request: NextRequest,
): Promise<NextResponse<OrderResponse>> {
  const ip =
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "طلبات كثيرة، حاول بعد دقيقة" },
      { status: 429 },
    );
  }

  let body: Partial<OrderFormData>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "بيانات غير صالحة" },
      { status: 400 },
    );
  }

  const error = validateOrder(body);
  if (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 422 },
    );
  }

  const order: OrderDocument = {
    name: body.name!.trim(),
    phone: body.phone!.replace(/[\s-]/g, ""),
    city: body.city!.trim(),
    address: body.address!.trim(),
    size: body.size!,
    quantity: Number(body.quantity),
    createdAt: new Date(),
  };

  try {
    const client = await clientPromise;
    const db = client.db("slimcore");
    await db.collection("orders").insertOne(order);

    return NextResponse.json(
      {
        success: true,
        message: "تم تسجيل طلبك، سنتصل بك قريباً",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[Order] MongoDB error:", err);
    return NextResponse.json(
      { success: false, message: "حدث خطأ، حاول مرة أخرى" },
      { status: 500 },
    );
  }
}
