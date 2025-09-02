import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/50">
      <div className="text-center p-8 rounded-2xl border bg-card shadow-sm">
        <h1 className="text-5xl font-extrabold text-primary mb-3">404</h1>
        <p className="text-lg text-foreground/70 mb-6">الصفحة غير موجودة</p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
        >
          العودة للرئيسية
        </a>
      </div>
    </div>
  );
};

export default NotFound;
