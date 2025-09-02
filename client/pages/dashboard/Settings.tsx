import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useMock } from "@/mock/MockContext";

export default function SettingsPage() {
  const [emailNoti, setEmailNoti] = useState(true);
  const [smsNoti, setSmsNoti] = useState(false);
  const [dark, setDark] = useState(false);

  function toggleTheme(v: boolean) {
    setDark(v);
    document.documentElement.classList.toggle("dark", v);
  }

  const { subscription, setSubscription } = useMock();

  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-extrabold">الإعدادات</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border p-4">
          <div className="mb-3 text-sm font-semibold">الإشعارات</div>
          <div className="flex items-center justify-between py-2">
            <div className="text-sm">إشعارات البريد الإلكتروني</div>
            <Switch checked={emailNoti} onCheckedChange={setEmailNoti} />
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="text-sm">إشعارات الرسائل النصية</div>
            <Switch checked={smsNoti} onCheckedChange={setSmsNoti} />
          </div>
        </div>
        <div className="rounded-2xl border p-4">
          <div className="mb-3 text-sm font-semibold">المظهر</div>
          <div className="flex items-center justify-between py-2">
            <div className="text-sm">الوضع الداكن</div>
            <Switch checked={dark} onCheckedChange={toggleTheme} />
          </div>
        </div>
        <div className="rounded-2xl border p-4 md:col-span-2">
          <div className="mb-3 text-sm font-semibold">الاشتراك</div>
          <div className="mb-2 text-sm">الحالة الحالية: <span className={subscription === 'active' ? 'text-green-600' : 'text-red-600'}>{subscription === 'active' ? 'نشط' : 'غير نشط'}</span></div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border p-3">
              <div className="text-sm font-semibold">الخطة الأساسية</div>
              <div className="text-xs text-foreground/60">نشر حتى 10 منشورات يومياً، مراسلة 50 مستخدم</div>
              <div className="mt-2 text-sm font-bold">25,000 IQD / شهر</div>
              <button onClick={()=>setSubscription('active')} className="mt-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">تفعيل</button>
            </div>
            <div className="rounded-xl border p-3">
              <div className="text-sm font-semibold">الخطة الاحترافية</div>
              <div className="text-xs text-foreground/60">منشورات ومراسلة غير محدودة، أولوية دعم</div>
              <div className="mt-2 text-sm font-bold">75,000 IQD / شهر</div>
              <button onClick={()=>setSubscription('active')} className="mt-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">تفعيل</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
