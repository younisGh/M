import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Building2,
  Users,
  UserCircle2,
  BarChart3,
  MessageSquareText,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Shield,
} from "lucide-react";

const items = [
  { to: "/dashboard", label: "الرئيسية", icon: Home },
  { to: "/dashboard/companies", label: "الشركات", icon: Building2 },
  { to: "/dashboard/users", label: "المستخدمون", icon: Users },
  { to: "/dashboard/profile", label: "الملف الشخصي", icon: UserCircle2 },
  { to: "/dashboard/stats", label: "الإحصائيات", icon: BarChart3 },
  { to: "/dashboard/posts", label: "المنشورات", icon: MessageSquareText },
  { to: "/dashboard/chat", label: "الدردشة", icon: MessageSquareText },
  { to: "/dashboard/broadcast", label: "قناة الإدارة", icon: MessageSquareText },
  { to: "/dashboard/notifications", label: "الإشعارات", icon: Bell },
  { to: "/dashboard/payments", label: "المدفوعات", icon: CreditCard },
  { to: "/dashboard/calls", label: "المكالمات", icon: MessageSquareText },
  { to: "/dashboard/privacy", label: "سياسة الخصوصية", icon: Shield },
  { to: "/dashboard/settings", label: "الإعدادات", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isRtl, setIsRtl] = useState<boolean>(true);

  useEffect(() => {
    const updateDir = () => setIsRtl(document?.documentElement?.dir === "rtl");
    updateDir();
    const obs = new MutationObserver(updateDir);
    if (document?.documentElement) {
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
    }
    return () => obs.disconnect();
  }, []);

  return (
    <aside className={`relative h-[calc(100vh-4rem)] ${isRtl ? "border-r" : "border-l"} bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 ${collapsed ? "w-20" : "w-64"} transition-[width] duration-200`}>
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col">
        <div className="flex items-center justify-between p-3">
          <div className="text-sm font-extrabold text-primary">لوحة التحكم</div>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="inline-flex items-center justify-center rounded-md border px-2 py-2 text-foreground/70 hover:bg-accent"
            title={collapsed ? "توسيع" : "تصغير"}
          >
            {collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
        <nav className="mt-2 grid gap-1 p-2">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group inline-flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent text-foreground/80"
                }`
              }
              title={label}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className={`${collapsed ? "sr-only" : "block"}`}>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto p-3 text-xs text-foreground/50">© {new Date().getFullYear()}</div>
      </div>
    </aside>
  );
}
