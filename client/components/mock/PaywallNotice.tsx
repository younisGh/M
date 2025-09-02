import { useMock } from "@/mock/MockContext";
import { Link } from "react-router-dom";

export default function PaywallNotice({ feature }: { feature: string }) {
  const { subscription, role } = useMock();
  if (role === "visitor" || subscription === "active") return null;
  return (
    <div className="mb-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-amber-900">
      <div className="text-sm font-semibold">الاشتراك مطلوب</div>
      <div className="text-xs">لتفعيل ميزة {feature}، الرجاء ترقية الاشتراك.</div>
      <div className="mt-2">
        <Link to="/dashboard/settings" className="rounded-md bg-amber-600 px-3 py-1 text-xs font-semibold text-white hover:brightness-110">الانتقال إلى الاشتراكات</Link>
      </div>
    </div>
  );
}
