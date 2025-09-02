import { useMemo, useState } from "react";

interface User {
  id: string;
  name: string;
  role: "admin" | "manager" | "member";
  company: string;
}

export default function UsersPage() {
  const [q, setQ] = useState("");
  const users = useMemo<User[]>(
    () => [
      { id: "1", name: "علي كريم", role: "admin", company: "شركة الرافدين" },
      { id: "2", name: "سارة محمد", role: "manager", company: "نفط الجنوب" },
      { id: "3", name: "حسن عمران", role: "member", company: "بناء العراق" },
      { id: "4", name: "نور مهدي", role: "member", company: "مصرف الرافدين" },
    ],
    [],
  );

  const filtered = users.filter(
    (u) => u.name.includes(q) || u.company.includes(q) || u.role.includes(q as any),
  );

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">المستخدمون</h1>
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث بالاسم أو الشركة أو الدور"
            className="w-72 rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            إضافة مستخدم
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-right font-semibold">الاسم</th>
              <th className="px-4 py-3 text-right font-semibold">الشركة</th>
              <th className="px-4 py-3 text-right font-semibold">الدور</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3 text-foreground/80">{u.company}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                      u.role === "admin"
                        ? "bg-primary/10 text-primary"
                        : u.role === "manager"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-violet-500/10 text-violet-600"
                    }`}
                  >
                    {u.role === "admin" ? "مسؤول" : u.role === "manager" ? "مدير" : "عضو"}
                  </span>
                </td>
                <td className="px-4 py-3 text-left">
                  <button className="text-primary hover:underline">تحرير</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
