import { useEffect, useState } from "react";

export default function SplashIntro({ durationMs = 1600 }: { durationMs?: number }) {
  const [mounted, setMounted] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 30);
    const t2 = setTimeout(() => setShow(false), durationMs);
    const t3 = setTimeout(() => setMounted(false), durationMs + 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [durationMs]);

  if (!mounted) return null;

  return (
    <div
      onClick={() => setShow(false)}
      className={`fixed inset-0 z-[60] grid place-items-center overflow-hidden transition-opacity duration-400 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      aria-label="Mohtaref Intro"
      role="dialog"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-100 via-white to-violet-50" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-200 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-20 h-72 w-72 rounded-full bg-indigo-300 blur-3xl" />
      </div>
      <div
        className={`flex flex-col items-center gap-3 rounded-2xl border bg-white/70 px-8 py-10 text-center shadow-2xl backdrop-blur-lg transition-all ${
          show ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-2"
        }`}
      >
        <img src="/logo-mohtaref.svg" alt="Mohtaref" className="h-16 w-auto drop-shadow dark:hidden" />
        <img src="/logo-mohtaref-dark.svg" alt="Mohtaref" className="hidden h-16 w-auto drop-shadow dark:block" />
        <div className="bg-gradient-to-r from-violet-700 to-indigo-500 bg-clip-text text-3xl font-black text-transparent">
          Mohtaref
        </div>
        <div className="text-sm text-foreground/70">منصة أعمال عصرية</div>
        <div className="mt-2 text-[10px] text-foreground/50">انقر للتخطي</div>
      </div>
    </div>
  );
}
