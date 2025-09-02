import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { sectionsData } from "@/components/home/SectionsInfograph";
import { Users as UsersIcon, FileText, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";

const monthly = [
  { name: "يناير", users: 30, companies: 12 },
  { name: "فبراير", users: 45, companies: 16 },
  { name: "مارس", users: 60, companies: 20 },
  { name: "أبريل", users: 80, companies: 24 },
  { name: "مايو", users: 95, companies: 28 },
  { name: "يونيو", users: 110, companies: 32 },
];

function hashNum(str: string, min: number, max: number) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  const val = Math.abs(h % (max - min + 1)) + min;
  return val;
}

const palette = [
  "bg-violet-600",
  "bg-indigo-600",
  "bg-rose-500",
  "bg-emerald-600",
  "bg-amber-500",
  "bg-sky-600",
  "bg-fuchsia-600",
  "bg-teal-600",
  "bg-cyan-600",
  "bg-pink-500",
];

export default function StatsPage() {
  const sectionCards = sectionsData.map((s, idx) => {
    const subscribers = hashNum(s.title, 40, 120);
    const posts = Math.round(subscribers * 1.6);
    const branches = s.branches?.length ?? 0;
    return {
      ...s,
      subscribers,
      posts,
      branches,
      color: palette[idx % palette.length],
    };
  });

  const totals = sectionCards.reduce(
    (acc, s) => {
      acc.subscribers += s.subscribers;
      acc.posts += s.posts;
      acc.branches += s.branches;
      return acc;
    },
    { subscribers: 0, posts: 0, branches: 0 },
  );

  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-extrabold">الأدمن</h1>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sectionCards.map((s, i) => (
          <Link
            to={`/dashboard/section/${i}`}
            key={s.title}
            className={`relative block overflow-hidden rounded-2xl border p-5 text-white shadow-sm transition hover:brightness-105 ${s.color}`}
          >
            <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white/30 text-white">
                <span className="text-sm font-bold">{s.letter}</span>
              </div>
              <h3 className="text-sm font-semibold">{s.title}</h3>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
              <div>
                <div className="text-2xl font-extrabold">{s.subscribers}</div>
                <div className="opacity-90">المشتركين</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold">{s.posts}</div>
                <div className="opacity-90">المنشورات</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold">{s.branches}</div>
                <div className="opacity-90">الأفرع</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Platform totals */}
      <div className="grid gap-4 rounded-2xl border bg-card p-4 text-center sm:grid-cols-3">
        <div className="grid place-items-center gap-1">
          <UsersIcon className="h-5 w-5 text-violet-700" aria-hidden />
          <div className="text-2xl font-extrabold text-violet-700">
            {totals.subscribers}
          </div>
          <div className="text-xs text-foreground/60">إجمالي المشتركين</div>
        </div>
        <div className="grid place-items-center gap-1">
          <FileText className="h-5 w-5 text-indigo-700" aria-hidden />
          <div className="text-2xl font-extrabold text-indigo-700">
            {totals.posts}
          </div>
          <div className="text-xs text-foreground/60">إجمالي المنشورات</div>
        </div>
        <div className="grid place-items-center gap-1">
          <GitBranch className="h-5 w-5 text-emerald-700" aria-hidden />
          <div className="text-2xl font-extrabold text-emerald-700">
            {totals.branches}
          </div>
          <div className="text-xs text-foreground/60">إجمالي الأفرع</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-4">
          <div className="mb-2 text-sm text-foreground/60">نمو المستخدمين</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly} margin={{ left: 8, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border p-4">
          <div className="mb-2 text-sm text-foreground/60">الشركات المنضمة</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly} margin={{ left: 8, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="companies"
                  fill="hsl(var(--primary))"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
