import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMock } from "@/mock/MockContext";

type Province = { id: string; name_ar: string; name_en: string; active: boolean };
type Section = { id: string; name_ar: string; name_en: string; parentId: string | null; active: boolean };

export default function OnboardingPage() {
  const nav = useNavigate();
  const { setOnboarded, setProvinceId, setSectionId, lang } = useMock();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [province, setProvince] = useState("");
  const [section, setSection] = useState("");

  useEffect(() => {
    fetch("/data/mohtaref-taxonomy.json").then(r=>r.json()).then((j)=>{
      setProvinces(j.provinces || []);
      setSections(j.sections || []);
    });
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!province || !section) return;
    setProvinceId(province);
    setSectionId(section);
    setOnboarded(true);
    nav("/dashboard");
  }

  const topSections = sections.filter(s=>!s.parentId);

  return (
    <section className="container py-12">
      <div className="mx-auto mb-8 max-w-xl text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">البدء السريع</h1>
        <p className="mt-2 text-foreground/70">اختر المحافظة والقسم المناسبين لحسابك.</p>
      </div>

      <form onSubmit={submit} className="mx-auto grid max-w-xl gap-4 rounded-2xl border bg-card p-6">
        <div className="grid gap-2">
          <label className="text-sm font-semibold">المحافظة</label>
          <select value={province} onChange={(e)=>setProvince(e.target.value)} className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" required>
            <option value="">اختر المحافظة</option>
            {provinces.filter(p=>p.active).map((p)=> (
              <option key={p.id} value={p.id}>{lang === 'ar' ? p.name_ar : p.name_en}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold">القسم</label>
          <select value={section} onChange={(e)=>setSection(e.target.value)} className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" required>
            <option value="">اختر القسم</option>
            {topSections.filter(s=>s.active).map((s)=> (
              <option key={s.id} value={s.id}>{lang === 'ar' ? s.name_ar : s.name_en}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="mt-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">متابعة</button>
      </form>
    </section>
  );
}
