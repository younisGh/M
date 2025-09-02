import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, Users, Home } from "lucide-react";

export default function EdgeStickers() {
  const { pathname } = useLocation();
  if (pathname.includes("/chat")) return null;

  const items = [
    {
      to: "/dashboard/stats",
      label: "صفحة الأدمن",
      color: "bg-rose-500",
      Icon: ShieldCheck,
    },
    {
      to: "/subscribers",
      label: "صفحة المشتركين",
      color: "bg-emerald-600",
      Icon: Users,
    },
    { to: "/", label: "صفحة الزائر", color: "bg-sky-600", Icon: Home },
  ];
  return (
    <div className="fixed left-0 top-1/3 z-50 flex flex-col items-start gap-2 pointer-events-none">
      {items.map(({ to, label, color, Icon }) => (
        <Link
          key={to}
          to={to}
          className={`pointer-events-auto group inline-flex items-center gap-2 rounded-r-2xl ${color} px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-black/10 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/40`}
          aria-label={label}
          title={label}
        >
          <Icon className="h-4 w-4" aria-hidden />
          <span className="whitespace-nowrap">{label}</span>
        </Link>
      ))}
    </div>
  );
}
