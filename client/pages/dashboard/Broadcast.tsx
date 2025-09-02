import { useState } from "react";
import { useMock } from "@/mock/MockContext";
import PaywallNotice from "@/components/mock/PaywallNotice";

interface Ann { id: string; from: string; text: string; }

export default function BroadcastPage() {
  const { role, subscription, chatReadOnly } = useMock();
  const [text, setText] = useState("");
  const [items, setItems] = useState<Ann[]>([
    { id: "a1", from: "الإدارة", text: "مرحباً بكم في Mohtaref" },
  ]);

  const canWrite = role === 'admin' || (!chatReadOnly && subscription === 'active');

  function send() {
    if (!text.trim()) return;
    if (!canWrite) { alert("القناة مقفلة أو ليس لديك صلاحية."); return; }
    setItems((arr)=> [...arr, { id: String(Date.now()), from: role === 'admin' ? 'الإدارة' : 'أنا', text }]);
    setText("");
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-extrabold">قناة الإدارة</h1>
      {!canWrite && <PaywallNotice feature="الرد في قناة الإدارة" />}
      <div className="rounded-2xl border p-3">
        <div className="mb-3 flex items-start gap-2">
          <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="أكتب رسالة للمشتركين" className="min-h-[80px] flex-1 rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
          <button onClick={send} className="h-[44px] rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground">إرسال</button>
        </div>
        <div className="grid gap-2">
          {items.map((i)=> (
            <div key={i.id} className="rounded-xl border bg-card p-3 text-sm">
              <div className="text-[11px] text-foreground/60">{i.from}</div>
              <div className="mt-1 whitespace-pre-wrap">{i.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
