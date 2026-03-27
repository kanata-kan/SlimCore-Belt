interface OrderSuccessProps {
  message: string;
}

export default function OrderSuccess({ message }: OrderSuccessProps) {
  return (
    <div className="text-center py-8">
      <div className="text-5xl mb-4">🎉</div>
      <h3 className="font-head text-xl font-black text-teal mb-3">
        تم تسجيل طلبك بنجاح!
      </h3>
      <p className="text-sm text-ink-2 leading-relaxed mb-4">{message}</p>
      <p className="text-xs text-ink-3">سيتم فتح واتساب لتأكيد الطلب...</p>
    </div>
  );
}
