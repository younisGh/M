import { useState } from "react";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-extrabold">ا��ملف الشخصي</h1>
      <form onSubmit={onSubmit} className="grid max-w-2xl gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-semibold">الاسم الكامل</label>
          <input className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" placeholder="اسمك" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold">البريد الإلكتروني</label>
          <input type="email" className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" placeholder="you@email.com" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold">الهاتف</label>
          <input inputMode="tel" className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" placeholder="+9647XXXXXXXX" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold">نبذة</label>
          <textarea rows={4} className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" placeholder="تعريف موجز عنك" />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">حفظ</button>
          {saved && <span className="text-sm text-violet-600">تم الحفظ</span>}
        </div>
      </form>
    </section>
  );
}
