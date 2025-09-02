import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [isRtl, setIsRtl] = useState<boolean>(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) setOpen(false);

    const updateDir = () => setIsRtl(document?.documentElement?.dir === "rtl");
    updateDir();
    const obs = new MutationObserver(updateDir);
    if (document?.documentElement) {
      obs.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir"],
      });
    }
    return () => obs.disconnect();
  }, []);

  const togglePos = isRtl ? "right-4" : "left-4";
  const fixedSide = isRtl ? "right-0" : "left-0";
  const flexDir = isRtl ? "flex-row-reverse" : "flex-row";

  return (
    <section className="container py-0">
      {/* Corner toggle button */}
      <button
        aria-label={open ? "إغلاق القائمة الجانبية" : "فتح القائمة الجانبية"}
        onClick={() => setOpen((v) => !v)}
        className={`fixed ${togglePos} top-20 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background/80 backdrop-blur shadow hover:bg-accent`}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <div className={`mt-4 flex ${flexDir} gap-4`}>
        {/* Sidebar: fixed when open */}
        {open && (
          <div
            className={`fixed ${fixedSide} top-16 z-50 h-[calc(100vh-4rem)] w-64`}
          >
            <Sidebar />
          </div>
        )}

        <div className="min-h-[calc(100vh-6rem)] flex-1 rounded-2xl border bg-card p-4 shadow-sm">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
