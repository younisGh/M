import { useMock } from "@/mock/MockContext";

export default function TopMockBar() {
  const { role, subscription, lang, chatReadOnly, setRole, setSubscription, setLang, setChatReadOnly } = useMock();
  return (
    <div className="sticky top-16 z-30 border-b bg-amber-50/80 text-amber-900 backdrop-blur supports-[backdrop-filter]:bg-amber-50/60">
      <div className="container flex flex-wrap items-center gap-3 py-2 text-xs">
        <span className="font-bold">وضع المحاكاة</span>
        <div className="flex items-center gap-1">
          <label className="opacity-70">الدور</label>
          <select value={role} onChange={(e)=>setRole(e.target.value as any)} className="rounded-md border px-2 py-1">
            <option value="visitor">زائر</option>
            <option value="user">مشترك</option>
            <option value="admin">أدمن</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <label className="opacity-70">الاشتراك</label>
          <select value={subscription} onChange={(e)=>setSubscription(e.target.value as any)} className="rounded-md border px-2 py-1">
            <option value="inactive">غير نشط</option>
            <option value="active">نشط</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <label className="opacity-70">اللغة</label>
          <select value={lang} onChange={(e)=>setLang(e.target.value as any)} className="rounded-md border px-2 py-1">
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>
        <label className="ms-auto flex items-center gap-2">
          <input type="checkbox" checked={chatReadOnly} onChange={(e)=>setChatReadOnly(e.target.checked)} />
          <span>قناة الدردشة مقفلة</span>
        </label>
      </div>
    </div>
  );
}
