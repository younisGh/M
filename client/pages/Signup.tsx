import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { CreditCard, Wallet, Smartphone, CheckCircle2 } from "lucide-react";
import { sectionsData } from "@/components/home/SectionsInfograph";

export default function Signup() {
  const navigate = useNavigate();
  const [gateOpen, setGateOpen] = useState(true);

  const governorates = useMemo(
    () => [
      "بغداد",
      "البصرة",
      "نينوى",
      "الأنبار",
      "أربيل",
      "السليمانية",
      "دهوك",
      "النجف",
      "كربلاء",
      "بابل",
      "ذي قار",
      "القادسية",
      "المثنى",
      "ميسان",
      "واسط",
      "ديالى",
      "كركوك",
      "صلاح الدين",
    ],
    [],
  );

  const [submitted, setSubmitted] = useState(false);
  const [section, setSection] = useState("");
  const [branch, setBranch] = useState("");
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [paymentMethod, setPaymentMethod] = useState<"asiacell" | "zain" | "mastercard" | "">("");
  const [otp, setOtp] = useState("");
  const selectedSection = useMemo(() => sectionsData.find((s) => s.title === section), [section]);
  const availableBranches = selectedSection?.branches ?? [];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    // Here you would typically call an API
    console.log(Object.fromEntries(form.entries()));
    setSubmitted(true);
  }

  return (
    <section className="container py-12">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">إنشاء حساب</h1>
        <p className="mt-2 text-foreground/70">
          انضم إلى منصة Mohtaref وابدأ بالتواصل مع مجتمع الأعمال في جميع المحافظات.
        </p>
      </div>

      <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-6 shadow-brand relative">
        {/* Subscription Gate Popup */}
        <Dialog open={gateOpen} onOpenChange={() => { /* keep open until user chooses */ }}>
          <DialogContent className="max-w-md text-center">
            <DialogHeader>
              <DialogTitle>الاشتراك الشهري</DialogTitle>
              <DialogDescription>سعر الاشتراك 10$ شهريًا. هل توافق على المتابعة؟</DialogDescription>
            </DialogHeader>
            <div className="mt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setGateOpen(false)}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand"
              >
                موافقة
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-accent"
              >
                إلغاء
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Progress Stepper */}
        <ol className="mb-6 flex items-center justify-between gap-2 text-xs">
          {["المعلومات الأساسية", "طريقة الدفع", "توثيق الحساب", "اكتمال"].map((t, i) => {
            const s = (i + 1) as 1 | 2 | 3 | 4;
            const active = step === s;
            const done = step > s;
            return (
              <li key={t} className="flex flex-1 items-center">
                <div className={`flex items-center gap-2 ${done ? "text-green-600" : active ? "text-violet-700" : "text-foreground/60"}`}>
                  <span className={`grid h-6 w-6 place-items-center rounded-full border ${done ? "bg-green-600 text-white border-green-600" : active ? "bg-violet-600 text-white border-violet-600" : "border-foreground/30"}`}>
                    {done ? "✓" : i + 1}
                  </span>
                  <span className="hidden sm:block">{t}</span>
                </div>
                {i < 3 && <div className="mx-2 h-px flex-1 bg-border" />}
              </li>
            );
          })}
        </ol>

        {step === 1 && (
          <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
            <div className="grid gap-2">
              <label className="text-sm font-semibold">اسم الشركة</label>
              <input name="name" required className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" placeholder="مثال: شركة الرافدين" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="block text-sm font-semibold">الأقسام</label>
                <select
                  name="section"
                  required
                  value={section}
                  onChange={(e) => { setSection(e.target.value); setBranch(""); }}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">اختر القسم</option>
                  {sectionsData.map((sec) => (
                    <option key={sec.title} value={sec.title}>{sec.title}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label className="block text-sm font-semibold">المحافظة</label>
                <select name="governorate" required className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40">
                  <option value="">اختر المحافظة</option>
                  {governorates.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            {availableBranches.length > 0 && (
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold">الفرع (اختياري)</label>
                  <select
                    name="branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="">اختر الفرع (اختياري)</option>
                    {availableBranches.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div />
              </div>
            )}

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-semibold">البريد الإلكتروني</label>
                <input type="email" name="email" required className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" placeholder="you@company.com" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold">كلمة المرور</label>
                <input type="password" name="password" required className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" placeholder="••••••••" />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-foreground/80">
              <input type="checkbox" name="terms" required className="h-4 w-4 rounded border" />
              أوافق على الشروط وسياسة الخصوصية
            </label>

            <div className="flex items-center justify-between">
              <div />
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-l from-primary to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-brand"
              >
                التالي
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-semibold">اختر طريقة الدفع</label>
              <div className="grid gap-3 sm:grid-cols-3">
                <button type="button" onClick={() => setPaymentMethod("asiacell")} className={`rounded-2xl border p-4 text-right transition hover:shadow-brand ${paymentMethod === "asiacell" ? "ring-2 ring-violet-500" : ""}`}>
                  <div className="mb-2 text-violet-700"><Smartphone className="inline h-5 w-5" /> اسياحوالة</div>
                  <div className="text-xs text-foreground/70">تحويل عبر شبكة آسياسيل</div>
                </button>
                <button type="button" onClick={() => setPaymentMethod("zain")} className={`rounded-2xl border p-4 text-right transition hover:shadow-brand ${paymentMethod === "zain" ? "ring-2 ring-violet-500" : ""}`}>
                  <div className="mb-2 text-violet-700"><Wallet className="inline h-5 w-5" /> زين كاش</div>
                  <div className="text-xs text-foreground/70">محفظة زين كاش</div>
                </button>
                <button type="button" onClick={() => setPaymentMethod("mastercard")} className={`rounded-2xl border p-4 text-right transition hover:shadow-brand ${paymentMethod === "mastercard" ? "ring-2 ring-violet-500" : ""}`}>
                  <div className="mb-2 text-violet-700"><CreditCard className="inline h-5 w-5" /> ماستركارد</div>
                  <div className="text-xs text-foreground/70">الدفع بالبطاقة</div>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(1)} className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-accent" type="button">السابق</button>
              <button onClick={() => setStep(3)} disabled={!paymentMethod} className="inline-flex items-center justify-center rounded-xl bg-gradient-to-l from-primary to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-brand disabled:opacity-60" type="button">التالي</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4">
            <div className="text-sm text-foreground/70 text-center">أدخل رمز التحقق المرسل إلى بريدك أو هاتفك</div>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(2)} className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-accent" type="button">السابق</button>
              <button onClick={() => { if (otp.length === 6) { setSubmitted(true); setStep(4); } }} className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand disabled:opacity-60" type="button" disabled={otp.length !== 6}>تحقق</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="grid place-items-center gap-3 py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
            <div className="text-xl font-extrabold">اكتمل التسجيل</div>
            <Link to="/dashboard" className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-l from-primary to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-brand">الانتقال إلى لوحة المشتركين</Link>
          </div>
        )}
      </div>
    </section>
  );
}
