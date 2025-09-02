import { Link } from "react-router-dom";
import SplashIntro from "@/components/branding/SplashIntro";
import HeroGraphic from "@/components/branding/HeroGraphic";
import { useEffect, useState } from "react";
import { Newspaper, MessageSquare, Image as ImageIcon, Bell, PhoneCall, Wrench, Users, Building2, LayoutGrid } from "lucide-react";
import PostCard, { Post } from "@/components/home/PostCard";
import { SectionsGrid } from "@/components/home/SectionsInfograph";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import type { ComponentType } from "react";
function Stat({ value, label, icon: Icon }: { value: string; label: string; icon?: ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-2xl border bg-card/60 p-4 text-center">
      <div className="text-2xl font-extrabold text-violet-700">{value}</div>
      <div className="mt-1 inline-flex items-center justify-center gap-1 text-xs text-foreground/70">
        {Icon ? <Icon className="h-4 w-4 text-violet-700" aria-hidden /> : null}
        <span>{label}</span>
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-brand">
      <div className="absolute -right-14 -top-14 h-28 w-28 rounded-full bg-violet-200/50 blur-2xl transition group-hover:scale-150" />
      <div className="mb-2 text-xs text-foreground/60">ميزة</div>
      <div className="text-lg font-bold">{title}</div>
      <div className="mt-3 text-sm text-foreground/70">{desc}</div>
    </div>
  );
}

export default function Index() {
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReveal(true), 700);
    return () => clearTimeout(t);
  }, []);

  const [sectionsOpen, setSectionsOpen] = useState(false);

  const icons: { Icon: ComponentType<{ className?: string }>; label: string }[] = [
    { Icon: Newspaper, label: "منشورات" },
    { Icon: MessageSquare, label: "رسائل" },
    { Icon: ImageIcon, label: "صور" },
    { Icon: Bell, label: "إشعارات" },
    { Icon: PhoneCall, label: "مكالمات" },
    { Icon: Wrench, label: "خدمات" },
  ];

  const posts: Post[] = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
      description: "افتتاح قسم جديد للخدمات الرقمية وتوسعة فريق الدعم.",
      comments: 24,
      views: 980,
      rating: 4.7,
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop",
      description: "نصائح عملية لإدارة الوقت وزيادة الإنتاجية.",
      comments: 12,
      views: 640,
      rating: 4.3,
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1529336953121-a0ce1a56a4a1?q=80&w=1600&auto=format&fit=crop",
      description: "قصص نجاح شركائنا في التحول الرقمي.",
      comments: 36,
      views: 1320,
      rating: 4.8,
    },
    {
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1600&auto=format&fit=crop",
      description: "ورشة عمل تفاعلية حول التسويق الحديث.",
      comments: 9,
      views: 420,
      rating: 4.1,
    },
    {
      id: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
      description: "إطلاق تحديثات جديدة لمنصة الأعمال وخارطة ال��ريق القادمة.",
      comments: 41,
      views: 1760,
      rating: 4.9,
    },
    {
      id: 6,
      imageUrl:
        "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
      description: "أفضل الممارسات في بناء فرق العمل عن بُعد.",
      comments: 7,
      views: 310,
      rating: 4.0,
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-background via-violet-50/60 to-muted/50">
      <SplashIntro />

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-120px] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-violet-200/60 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-60px] h-[320px] w-[320px] rounded-full bg-indigo-300/50 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="container py-8 md:py-12">
        <div className={`mx-auto max-w-4xl text-center transition-all duration-700 ${
          reveal ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}>
          <HeroGraphic />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/signup"
              className="rounded-xl bg-gradient-to-l from-violet-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-brand transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            >
              ابدأ
            </Link>
            <button
              type="button"
              onClick={() => setSectionsOpen((v) => !v)}
              className="group relative inline-flex items-center gap-2 rounded-xl border bg-white/70 px-6 py-3 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur transition hover:shadow-brand focus:outline-none focus:ring-2 focus:ring-violet-500/40"
              aria-expanded={sectionsOpen}
              aria-controls="sections-panel"
            >
              <LayoutGrid className="h-4 w-4" aria-hidden />
              <span>الأقسام</span>
              <span className={`transition-transform ${sectionsOpen ? "rotate-180" : "rotate-0"}`} aria-hidden>
                ▾
              </span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:max-w-xl md:mx-auto">
            <Stat value="+120" label="مشترك" icon={Users} />
            <Stat value="+60" label="الشركات" icon={Building2} />
          </div>
        </div>
      </section>

      {/* Icon Strip */}
      <section className="container pb-4">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-3 md:grid-cols-6">
          {icons.map(({ Icon, label }, i) => (
            <div
              key={i}
              className="grid place-items-center rounded-2xl border bg-card/70 p-4 text-violet-700"
              aria-label={label}
              title={label}
            >
              <Icon className="h-6 w-6" aria-hidden />
              <span className="mt-2 text-xs font-medium text-foreground/70">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sections Popup */}
      <Dialog open={sectionsOpen} onOpenChange={setSectionsOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="text-center">الأقسام</DialogTitle>
          </DialogHeader>
          <SectionsGrid />
        </DialogContent>
      </Dialog>

      {/* Posts Feed */}
      <section className="container pb-16">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm text-foreground/60">المنشورات</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
