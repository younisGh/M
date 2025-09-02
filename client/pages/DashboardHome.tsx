export default function DashboardHome() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl md:text-3xl font-extrabold">مرحبًا بك في لوحة التحكم</h1>
      <p className="text-foreground/70">اختر من القائمة الجانبية للتنقل بين الأقسام.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-4">
          <div className="text-sm text-foreground/60">عدد الشركات</div>
          <div className="mt-2 text-3xl font-extrabold">128</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-foreground/60">المستخدمون الجدد</div>
          <div className="mt-2 text-3xl font-extrabold">42</div>
        </div>
      </div>
    </div>
  );
}
