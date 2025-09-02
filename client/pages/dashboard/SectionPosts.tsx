import { useParams, Link } from "react-router-dom";
import { sectionsData } from "@/components/home/SectionsInfograph";
import { Trash2, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface SectionPost { id: string; text: string; author: string }

function storageKey(idx: number) { return `section_posts_${idx}`; }

export default function SectionPostsPage() {
  const params = useParams();
  const idx = Number(params.idx ?? -1);
  const section = sectionsData[idx];

  const [posts, setPosts] = useState<SectionPost[]>([]);

  useEffect(() => {
    if (!section) return;
    try {
      const raw = localStorage.getItem(storageKey(idx));
      if (raw) {
        setPosts(JSON.parse(raw));
      } else {
        const seed: SectionPost[] = Array.from({ length: 5 }).map((_, i) => ({
          id: `${Date.now()}_${i}`,
          author: "الإدارة",
          text: `منشور ${i + 1} ضمن قسم ${section.title}`,
        }));
        setPosts(seed);
        localStorage.setItem(storageKey(idx), JSON.stringify(seed));
      }
    } catch {}
  }, [idx, section]);

  useEffect(() => {
    try { localStorage.setItem(storageKey(idx), JSON.stringify(posts)); } catch {}
  }, [idx, posts]);

  const header = useMemo(() => (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-extrabold">{section ? `منشورات قسم: ${section.title}` : "قسم غير موجود"}</h1>
      <Link to="/dashboard/stats" className="inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground">
        <ArrowRight className="h-4 w-4" /> عودة إلى الإحصائيات
      </Link>
    </div>
  ), [section]);

  function remove(id: string) {
    if (!confirm("هل تريد حذف هذا المنشور؟")) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  if (!section) {
    return (
      <section className="grid gap-4">
        {header}
        <div className="rounded-2xl border bg-card p-4">لا يوجد قسم بهذا المعرف.</div>
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      {header}
      <div className="grid gap-3">
        {posts.map((p) => (
          <div key={p.id} className="rounded-2xl border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-foreground/60">{p.author}</div>
                <div className="mt-1 whitespace-pre-wrap text-sm">{p.text}</div>
              </div>
              <button
                onClick={() => remove(p.id)}
                className="inline-flex items-center justify-center rounded-md border p-2 text-destructive hover:bg-destructive/10"
                title="حذف"
                aria-label="حذف المنشور"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="rounded-2xl border bg-card p-6 text-center text-sm text-foreground/60">لا توجد منشورات حالياً.</div>
        )}
      </div>
    </section>
  );
}
