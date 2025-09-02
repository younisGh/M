import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type Role = "visitor" | "user" | "admin";
export type Subscription = "active" | "inactive";
export type Lang = "ar" | "en";

export type MockState = {
  role: Role;
  subscription: Subscription;
  lang: Lang;
  chatReadOnly: boolean;
  onboarded: boolean;
  provinceId: string | null;
  sectionId: string | null;
  setRole: (r: Role) => void;
  setSubscription: (s: Subscription) => void;
  setLang: (l: Lang) => void;
  setChatReadOnly: (v: boolean) => void;
  setOnboarded: (v: boolean) => void;
  setProvinceId: (id: string | null) => void;
  setSectionId: (id: string | null) => void;
};

const MockCtx = createContext<MockState | null>(null);

const LS_KEY = "mohtaref_mock";

export function MockProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("admin");
  const [subscription, setSubscription] = useState<Subscription>("active");
  const [lang, setLang] = useState<Lang>("ar");
  const [chatReadOnly, setChatReadOnly] = useState<boolean>(false);
  const [onboarded, setOnboarded] = useState<boolean>(true);
  const [provinceId, setProvinceId] = useState<string | null>(null);
  const [sectionId, setSectionId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.role) setRole(parsed.role);
        if (parsed.subscription) setSubscription(parsed.subscription);
        if (parsed.lang) setLang(parsed.lang);
        if (typeof parsed.chatReadOnly === "boolean")
          setChatReadOnly(parsed.chatReadOnly);
        if (typeof parsed.onboarded === "boolean")
          setOnboarded(parsed.onboarded);
        if (parsed.provinceId) setProvinceId(parsed.provinceId);
        if (parsed.sectionId) setSectionId(parsed.sectionId);
      } else {
        try {
          localStorage.setItem(
            LS_KEY,
            JSON.stringify({
              role: "admin",
              subscription: "active",
              lang: "ar",
              chatReadOnly: false,
              onboarded: true,
            }),
          );
        } catch {}
      }
    } catch {}
  }, []);

  useEffect(() => {
    const data = {
      role,
      subscription,
      lang,
      chatReadOnly,
      onboarded,
      provinceId,
      sectionId,
    };
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(data));
    } catch {}
    if (typeof document !== "undefined") {
      if (lang === "ar") document.documentElement.dir = "rtl";
      else document.documentElement.dir = "ltr";
      if (lang === "ar") document.documentElement.lang = "ar";
      else document.documentElement.lang = "en";
    }
  }, [
    role,
    subscription,
    lang,
    chatReadOnly,
    onboarded,
    provinceId,
    sectionId,
  ]);

  const value = useMemo<MockState>(
    () => ({
      role,
      subscription,
      lang,
      chatReadOnly,
      onboarded,
      provinceId,
      sectionId,
      setRole,
      setSubscription,
      setLang,
      setChatReadOnly,
      setOnboarded,
      setProvinceId,
      setSectionId,
    }),
    [role, subscription, lang, chatReadOnly, onboarded, provinceId, sectionId],
  );

  return <MockCtx.Provider value={value}>{children}</MockCtx.Provider>;
}

export function useMock() {
  const ctx = useContext(MockCtx);
  if (!ctx) throw new Error("useMock must be used within MockProvider");
  return ctx;
}
