import { useState } from "react";
import { useMock } from "@/mock/MockContext";
import PaywallNotice from "@/components/mock/PaywallNotice";

interface Post { id: string; author: string; text: string; }

export default function PostsPage() {
  const { subscription, role } = useMock();
  const [text, setText] = useState("");
  const [feed, setFeed] = useState<Post[]>([
    { id: "p1", author: "شركة الرافدين", text: "افتتاح فرع جديد في بغداد" },
    { id: "p2", author: "نفط الجنوب", text: "طرح فرص عمل جديدة" },
  ]);

  function publish() {
    if (!text.trim()) return;
    if (subscription !== "active") {
      alert("الاشتراك غير نشط. قم بالترقية للنشر.");
      return;
    }
    setFeed((f) => [{ id: String(Date.now()), author: role === 'admin' ? 'الإدارة' : 'أنا', text }, ...f]);
    setText("");
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-extrabold">المنشورات</h1>
      <div className="rounded-2xl border p-3">
        <PaywallNotice feature="النشر" />
        <div className="flex items-start gap-2">
          <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="اكتب تحديثك هنا" className="min-h-[90px] flex-1 rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
          <button onClick={publish} className="h-[44px] rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground">نشر</button>
        </div>
      </div>
      <div className="grid gap-3">
        {feed.map((p)=> (
          <div key={p.id} className="rounded-2xl border bg-card p-4">
            <div className="text-xs text-foreground/60">{p.author}</div>
            <div className="mt-1 whitespace-pre-wrap text-sm">{p.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
