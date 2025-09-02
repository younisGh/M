import { useState } from "react";

interface Notification { id: string; title: string; read: boolean }

export default function NotificationsPage() {
  const [list, setList] = useState<Notification[]>([
    { id: "1", title: "تم قبول شركتك في الدليل", read: false },
    { id: "2", title: "لديك 3 طلبات متابعة جديدة", read: true },
    { id: "3", title: "تم تحديث سياسة الخصوصية", read: false },
  ]);

  function toggle(id: string) {
    setList((arr) => arr.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  }

  function markAll() {
    setList((arr) => arr.map((n) => ({ ...n, read: true })));
  }

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">الإشعارات</h1>
        <button onClick={markAll} className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-accent">تحديد الكل كمقروء</button>
      </div>

      <div className="grid gap-2">
        {list.map((n) => (
          <div key={n.id} className={`flex items-center justify-between rounded-xl border p-4 ${n.read ? "opacity-70" : "bg-accent/50"}`}>
            <div className="text-sm">{n.title}</div>
            <button onClick={() => toggle(n.id)} className="text-sm text-primary hover:underline">
              {n.read ? "غير مقروء" : "تمت قراءته"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
