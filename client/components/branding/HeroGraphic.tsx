export default function HeroGraphic() {
  return (
    <div className="relative mx-auto mt-2 max-w-3xl">
      <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-violet-200/60 blur-2xl" />
      <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-indigo-300/60 blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border bg-white/70 shadow-2xl backdrop-blur">
        <div className="grid items-stretch md:grid-cols-2">
          <div className="relative hidden min-h-[220px] md:block">
            <svg viewBox="0 0 360 240" className="h-full w-full">
              <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f5f3ff" />
                  <stop offset="100%" stopColor="#eef2ff" />
                </linearGradient>
                <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <radialGradient id="glow" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                </radialGradient>
                <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="20" />
                </filter>
              </defs>

              <rect x="0" y="0" width="360" height="240" fill="url(#bg)"/>
              <circle cx="260" cy="40" r="120" fill="url(#glow)" filter="url(#blur)"/>

              <path d="M0 170 C 60 150, 120 200, 180 170 S 300 150, 360 180 L360 240 L0 240 Z" fill="#e9d5ff" opacity="0.6"/>
              <path d="M0 155 C 60 135, 120 185, 180 155 S 300 135, 360 165 L360 240 L0 240 Z" fill="#c7d2fe" opacity="0.6"/>

              <g stroke="url(#accent)" strokeWidth="1.5" fill="none" opacity="0.9">
                <ellipse cx="110" cy="90" rx="56" ry="26"/>
                <ellipse cx="110" cy="90" rx="36" ry="16"/>
                <circle cx="110" cy="90" r="3" fill="#8b5cf6" stroke="none"/>
                <circle cx="146" cy="90" r="3" fill="#6366f1" stroke="none"/>
              </g>

              <g fill="#a78bfa" opacity="0.9">
                <circle cx="40" cy="40" r="2"/>
                <circle cx="70" cy="24" r="2"/>
                <circle cx="300" cy="60" r="2"/>
                <circle cx="330" cy="30" r="2"/>
              </g>
            </svg>
          </div>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <img src="/logo-mohtaref.svg" alt="Mohtaref" className="h-14 w-auto dark:hidden" />
            <img src="/logo-mohtaref-dark.svg" alt="Mohtaref" className="hidden h-14 w-auto dark:block" />
            <div className="mt-2 text-lg font-extrabold text-violet-700">Mohtaref</div>
            <div className="mt-1 text-xs text-foreground/60">منصة الأعمال</div>
          </div>
        </div>
      </div>
    </div>
  );
}
