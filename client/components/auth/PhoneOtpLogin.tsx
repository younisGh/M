import { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import type { RequestOtpRequest, RequestOtpResponse, VerifyOtpRequest, VerifyOtpResponse } from "@shared/api";

export default function PhoneOtpLogin() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"phone" | "verify" | "success">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let t: any;
    if (cooldown > 0) t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  function reset() {
    setStep("phone");
    setPhone("");
    setCode("");
    setLoading(false);
    setError("");
    setCooldown(0);
  }

  async function requestOtp() {
    setLoading(true);
    setError("");
    try {
      const body: RequestOtpRequest = { phone };
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as RequestOtpResponse & { error?: string };
      if (!res.ok || !data.success) throw new Error(data.error || "request_failed");
      setStep("verify");
      setCooldown(60);
    } catch {
      setError("تعذر إرسال الرمز. تحقق من الرقم وحاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    setLoading(true);
    setError("");
    try {
      const body: VerifyOtpRequest = { phone, code };
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as VerifyOtpResponse & { error?: string };
      if (!res.ok || !data.success) throw new Error(data.error || "verify_failed");
      setStep("success");
      setTimeout(() => setOpen(false), 1200);
    } catch {
      setError("رمز غير صحيح أو منتهي الصلاحية.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-accent"
      >
        تسجيل الدخول
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => { setOpen(false); reset(); }} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border bg-background p-6 shadow-lg">
            <div className="mb-4">
              <div className="text-lg font-semibold">
                {step === "phone" ? "تسجيل الدخول برقم الهاتف" : step === "verify" ? "أدخل رمز التحقق" : "تم تسجيل الدخول"}
              </div>
              <div className="text-sm text-foreground/70 mt-1">
                {step === "phone" && "أدخل رقم هاتفك لإرسال رمز تحقق مؤقت."}
                {step === "verify" && `تم إرسال رمز إلى ${phone}. أدخل الرمز لإتمام تسجيل الدخول.`}
                {step === "success" && "تم التحقق بنجاح."}
              </div>
            </div>
            {step === "verify" && (
              <button
                onClick={() => { setOpen(false); reset(); }}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium hover:bg-accent"
                aria-label="إغلاق"
                title="إغلاق"
              >
                ×
              </button>
            )}

            {step === "phone" && (
              <div className="grid gap-3">
                <label className="text-sm font-semibold">رقم الهاتف</label>
                <input
                  inputMode="tel"
                  placeholder="مثال: +9647XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40"
                />
                {error && <div className="text-sm text-destructive">{error}</div>}
                <div className="flex items-center gap-3">
                  <button
                    onClick={requestOtp}
                    disabled={loading || !/\+?\d{7,15}/.test(phone)}
                    className="mt-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-l from-primary to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-brand disabled:opacity-60"
                  >
                    {loading ? "جاري الإرسال..." : "إرسال الرمز"}
                  </button>
                  <button
                    onClick={() => { setOpen(false); reset(); }}
                    className="mt-1 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold hover:bg-accent"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}

            {step === "verify" && (
              <div className="grid gap-4">
                <InputOTP maxLength={6} value={code} onChange={setCode} containerClassName="justify-center">
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                {error && <div className="text-sm text-destructive text-center">{error}</div>}
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={verifyOtp}
                    disabled={loading || code.length !== 6}
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand disabled:opacity-60"
                  >
                    {loading ? "جاري التحقق..." : "تحقق"}
                  </button>
                  <button
                    onClick={() => { setOpen(false); reset(); }}
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-accent"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={requestOtp}
                    disabled={cooldown > 0}
                    className="text-sm text-foreground/70 hover:text-primary"
                  >
                    {cooldown > 0 ? `إعادة الإرسال خلال ${cooldown}s` : "إعادة إرسال الرمز"}
                  </button>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="text-center text-sm text-foreground/70">تم تسجيل الدخول بنجاح.</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
