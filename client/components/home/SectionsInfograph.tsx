import { useState } from "react";
import {
  LayoutGrid,
  Building2,
  Briefcase,
  Hammer,
  Users,
  FileText,
  Scale,
  Factory,
  Package,
  Ruler,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import type { ComponentType } from "react";

export interface SectionItem {
  letter: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  branches?: string[];
}

export interface SectionsInfographProps {
  controlledOpen?: boolean;
  onToggle?: () => void;
  showTrigger?: boolean;
}

export const sectionsData: SectionItem[] = [
  {
    letter: "أ",
    title: "شركات الاستثمار والمستثمرين في العراق",
    icon: Building2,
    branches: ["سكني", "تجاري", "صحي", "صناعي", "زراعي", "سياحي"],
  },
  {
    letter: "ب",
    title: "الشركات الراغبة بالاستثمار في العراق",
    icon: Briefcase,
  },
  {
    letter: "ج",
    title: "شركات المقاولات العراقية والعربية والأجنبية",
    icon: Hammer,
  },
  { letter: "د", title: "المقاولين والمتعهدين في العراق", icon: Users },
  {
    letter: "هـ",
    title: "المكاتب الاستشارية دراسات الجدوى والتحاسب الضريبي",
    icon: FileText,
  },
  {
    letter: "ز",
    title: "المحا��ين",
    icon: Scale,
    branches: ["تسجيل الشركات", "التسجيل العقاري", "القطاع المصرفي"],
  },
  {
    letter: "و",
    title: "المعامل العراقية المجازة من التنم��ة الصناعية",
    icon: Factory,
  },
  {
    letter: "ي",
    title: "شركات تجهيز المعدات والمصانع والمواد الأولية",
    icon: Package,
  },
  { letter: "ع", title: "المكاتب الهندسية والتصميم", icon: Ruler },
  { letter: "غ", title: "شركات النقل في كافة المجالات", icon: Truck },
];

export function SectionsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sectionsData.map(({ letter, title, icon: Icon, branches }) => (
        <div
          key={letter}
          className="relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-brand"
        >
          <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-violet-200/40 blur-2xl" />
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-violet-600 text-white">
              <span className="text-sm font-bold">{letter}</span>
            </div>
            <Icon className="h-5 w-5 text-violet-700" aria-hidden />
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          </div>
          {branches && branches.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {branches.map((b) => (
                <Badge
                  key={b}
                  variant="secondary"
                  className="bg-violet-50 text-violet-700"
                >
                  {b}
                </Badge>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function SectionsInfograph({
  controlledOpen,
  onToggle,
  showTrigger = true,
}: SectionsInfographProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const toggle = onToggle ?? (() => setUncontrolledOpen((v) => !v));

  return (
    <div className="container pb-8">
      {showTrigger && (
        <div className="mx-auto flex max-w-3xl items-center justify-center">
          <button
            type="button"
            onClick={toggle}
            className="group relative inline-flex items-center gap-2 rounded-full border bg-white/70 px-5 py-2 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur transition hover:shadow-brand focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            aria-expanded={open}
            aria-controls="sections-panel"
          >
            <LayoutGrid className="h-4 w-4" aria-hidden />
            <span>الأقسام</span>
            <span
              className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
              aria-hidden
            >
              ▾
            </span>
            <span className="pointer-events-none absolute -z-10 inset-0 rounded-full bg-violet-200/40 blur-xl opacity-0 transition group-hover:opacity-100" />
          </button>
        </div>
      )}

      <div
        id="sections-panel"
        className={`mx-auto mt-6 max-w-5xl overflow-hidden transition-all duration-500 ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <SectionsGrid />
      </div>
    </div>
  );
}
