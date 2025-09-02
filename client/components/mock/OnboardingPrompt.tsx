import { Link, useLocation } from "react-router-dom";
import { useMock } from "@/mock/MockContext";

export default function OnboardingPrompt() {
  const { onboarded, role } = useMock();
  const loc = useLocation();
  if (role === 'visitor' || onboarded) return null;
  if (loc.pathname.startsWith('/onboarding')) return null;
  return (
    <div className="sticky top-[6.5rem] z-20 border-b bg-blue-50/80 text-blue-900 backdrop-blur supports-[backdrop-filter]:bg-blue-50/60">
      <div className="container flex items-center justify-between py-2 text-xs">
        <span>أكمل الإعداد الأولي لحسابك باختيار المحافظة والقسم.</span>
        <Link to="/onboarding" className="rounded-md bg-blue-600 px-3 py-1 text-white">البدء الآن</Link>
      </div>
    </div>
  );
}
