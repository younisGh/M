import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MockProvider } from "@/mock/MockContext";
import { useMock } from "@/mock/MockContext";
import Index from "./pages/Index";
import OnboardingPage from "./pages/Onboarding";
import OnboardingPrompt from "@/components/mock/OnboardingPrompt";
import NotFound from "./pages/NotFound";
import Companies from "./pages/Companies";
import Signup from "./pages/Signup";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import EdgeStickers from "./components/layout/EdgeStickers";
import UsersPage from "./pages/dashboard/Users";
import ProfilePage from "./pages/dashboard/Profile";
import StatsPage from "./pages/dashboard/Stats";
import PostsPage from "./pages/dashboard/Posts";
import ChatPage from "./pages/dashboard/Chat";
import SubscribersPage from "./pages/Subscribers";
import BroadcastPage from "./pages/dashboard/Broadcast";
import NotificationsPage from "./pages/dashboard/Notifications";
import CallsPage from "./pages/dashboard/Calls";
import SettingsPage from "./pages/dashboard/Settings";
import PaymentsPage from "./pages/dashboard/Payments";
import PrivacyPage from "./pages/dashboard/Privacy";
import SectionPostsPage from "./pages/dashboard/SectionPosts";

const queryClient = new QueryClient();

import PhoneOtpLogin from "./components/auth/PhoneOtpLogin";

function Header() {
  const { lang, setLang } = useMock();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background/70">
      <div className="container relative flex h-16 items-center justify-between pl-12 md:pl-16">
        <Link to="/" className="hidden md:flex items-center gap-2 text-xl font-extrabold text-primary">
          <img src="/logo-mohtaref.svg" alt="Mohtaref logo" className="h-8 w-auto dark:hidden" />
          <img src="/logo-mohtaref-dark.svg" alt="Mohtaref logo" className="hidden h-8 w-auto dark:block" />
          <span className="text-foreground">Mohtaref</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-foreground/80">
          <PhoneOtpLogin />
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-l from-primary to-indigo-500 px-4 py-2 text-white shadow-brand transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            ابدأ
          </Link>
        </nav>
        <button
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          title={lang === 'ar' ? 'English' : 'العربية'}
          aria-label="Change language"
          className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full border text-base hover:bg-accent md:left-3"
        >
          <span role="img" aria-hidden>{lang === 'ar' ? '🇬🇧' : '🇮🇶'}</span>
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-white/50 dark:bg-background/70">
      <div className="container py-8 text-center text-sm text-foreground/60">
        © {new Date().getFullYear()} Mohtaref · جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

import type { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <EdgeStickers />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MockProvider>
      <BrowserRouter>
        <Layout>
          <OnboardingPrompt />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/subscribers" element={<SubscribersPage />} />
            <Route path="/chat" element={<ChatPage />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="companies" element={<Companies />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="stats" element={<StatsPage />} />
              <Route path="posts" element={<PostsPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="broadcast" element={<BroadcastPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="calls" element={<CallsPage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="section/:idx" element={<SectionPostsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      </MockProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
