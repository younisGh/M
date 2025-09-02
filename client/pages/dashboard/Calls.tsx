import { useState } from "react";
import { useMock } from "@/mock/MockContext";

export default function CallsPage() {
  const { role } = useMock();
  const [inCall, setInCall] = useState(false);
  const [type, setType] = useState<'audio'|'video'>('audio');

  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-extrabold">المكالمات</h1>
      <div className="rounded-2xl border p-4">
        {!inCall ? (
          <div className="flex items-center gap-2">
            <select value={type} onChange={(e)=>setType(e.target.value as any)} className="rounded-xl border px-3 py-2 text-sm">
              <option value="audio">صوتية</option>
              <option value="video">فيديو</option>
            </select>
            <button onClick={()=>setInCall(true)} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">��دء مكالمة</button>
          </div>
        ) : (
          <div className="grid gap-3">
            <div className="rounded-xl border bg-black/80 p-8 text-center text-white">واجهة {type === 'audio' ? 'صوت' : 'فيديو'} (محاكاة)</div>
            <div className="flex items-center gap-2">
              {role === 'admin' && <button className="rounded-xl border px-3 py-2 text-sm">تسجيل</button>}
              <button onClick={()=>setInCall(false)} className="ms-auto rounded-xl bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground">إنهاء</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
