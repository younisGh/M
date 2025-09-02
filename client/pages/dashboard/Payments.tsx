import { useState } from "react";
import { useMock } from "@/mock/MockContext";

export default function PaymentsPage() {
  const { subscription, setSubscription } = useMock();
  const [provider, setProvider] = useState<'zaincash'|'asiahawala'|'qicard'>('zaincash');
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);

  async function pay() {
    setProcessing(true);
    await new Promise((r)=>setTimeout(r, 800));
    setSubscription('active');
    setReceipt(`#${Date.now()}_${provider.toUpperCase()}`);
    setProcessing(false);
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-extrabold">المدفوعات والاشتراك</h1>
      <div className="rounded-2xl border p-4">
        <div className="mb-2 text-sm">الحالة الحالية: <span className={subscription==='active'?'text-green-600':'text-red-600'}>{subscription==='active'?'نشط':'غير نشط'}</span></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border p-3">
            <div className="text-sm font-semibold">اختر مزود الدفع</div>
            <select value={provider} onChange={(e)=>setProvider(e.target.value as any)} className="mt-2 w-full rounded-xl border px-3 py-2 text-sm">
              <option value="zaincash">ZainCash</option>
              <option value="asiahawala">AsiaHawala</option>
              <option value="qicard">QiCard</option>
            </select>
            <button onClick={pay} disabled={processing} className="mt-3 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60">{processing? 'جاري المعالجة…' : 'ادفع الآن'}</button>
          </div>
          <div className="rounded-xl border p-3">
            <div className="text-sm font-semibold">إيصال الدفع</div>
            {receipt ? (
              <div className="mt-2 rounded-lg border bg-accent p-3 text-xs">
                <div>تمت العملية بنجاح</div>
                <div className="opacity-70">رقم الإيصال: {receipt}</div>
              </div>
            ) : (
              <div className="mt-2 text-xs text-foreground/60">لا يوجد إيصال بعد.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
