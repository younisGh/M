import { useMemo, useState } from "react";
import { Eye, MessageSquare, Heart, Home, Plus, Video, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type Post = {
  id: string;
  author: string;
  title?: string;
  body: string;
  views: number;
  comments: number;
  likes: number;
};

function PostItem({ p }: { p: Post }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="rounded-2xl border bg-card p-4">
      <header className="mb-2 flex items-center justify-between">
        <div className="text-xs text-foreground/60">{p.author}</div>
        <div className="flex items-center gap-3 text-[11px] text-foreground/60">
          <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {p.views}</span>
          <span className="inline-flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {p.comments}</span>
          <span className="inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {p.likes}</span>
        </div>
      </header>
      {p.title && <h3 className="mb-1 text-sm font-semibold">{p.title}</h3>}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-right text-sm leading-6 text-foreground/90 hover:underline"
        aria-expanded={open}
      >
        <span className={open ? "whitespace-pre-wrap" : "line-clamp-3 whitespace-pre-wrap"}>{p.body}</span>
      </button>
    </article>
  );
}

export default function SubscribersPage() {
  const navigate = useNavigate();
  const seed = useMemo<Post[]>(
    () => [
      {
        id: "1",
        author: "شركة الرافدين",
        title: "توسعة خدماتنا",
        body: "أطلقنا اليوم مجموعة من الخدمات الجديدة لدعم الشركات الصغيرة والمتوسطة في التحول الرقمي...\nتفاصيل أكثر داخل المنشور.",
        views: 1200,
        comments: 35,
        likes: 210,
      },
      {
        id: "2",
        author: "نفط الجنوب",
        body: "فرص تدريب جديدة لحديثي ال��خرج في قسم التشغيل والصيانة مع شهادات معتمدة.",
        views: 780,
        comments: 18,
        likes: 96,
      },
      {
        id: "3",
        author: "بناء العراق",
        body: "بدء العمل في مشروع الإسكان الجديد بمنطقة الكرادة، المرحلة الأولى تشمل 300 وحدة سكنية.",
        views: 980,
        comments: 22,
        likes: 144,
      },
    ],
    [],
  );

  const [posts, setPosts] = useState<Post[]>(seed);
  const [showComposer, setShowComposer] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [text, setText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  function addPost() {
    if (!text.trim()) return;
    setPosts((p) => [
      { id: String(Date.now()), author: "أنا", body: text, views: 0, comments: 0, likes: 0 },
      ...p,
    ]);
    setText("");
    setShowComposer(false);
  }

  function addVideo() {
    if (!videoUrl.trim()) return;
    setPosts((p) => [
      { id: String(Date.now()), author: "أنا", title: "فيديو جديد", body: `رابط الفيديو: ${videoUrl}`, views: 0, comments: 0, likes: 0 },
      ...p,
    ]);
    setVideoUrl("");
    setShowVideo(false);
  }

  return (
    <section className="relative">
      {/* Fixed left rail */}
      <div className="pointer-events-none fixed left-0 top-1/3 z-50 flex flex-col items-start gap-2">
        <Link to="/" className="pointer-events-auto inline-flex items-center justify-center rounded-r-xl border bg-background/80 p-3 shadow hover:bg-accent" title="الرئيسية" aria-label="الرئيسية">
          <Home className="h-5 w-5" />
        </Link>
        <button onClick={() => setShowComposer(true)} className="pointer-events-auto inline-flex items-center justify-center rounded-r-xl border bg-background/80 p-3 shadow hover:bg-accent" title="إضافة منشور" aria-label="إضافة منشور">
          <Plus className="h-5 w-5" />
        </button>
        <button onClick={() => setShowVideo(true)} className="pointer-events-auto inline-flex items-center justify-center rounded-r-xl border bg-background/80 p-3 shadow hover:bg-accent" title="إضافة فيديو" aria-label="إضافة فيديو">
          <Video className="h-5 w-5" />
        </button>
        <button onClick={() => navigate("/chat")} className="pointer-events-auto inline-flex items-center justify-center rounded-r-xl border bg-background/80 p-3 shadow hover:bg-accent" title="الدردشة" aria-label="الدردشة">
          <MessageCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="container py-6">
        <h1 className="mb-4 text-2xl font-extrabold">المشتركين</h1>
        <div className="grid gap-3">
          {posts.map((p) => (
            <PostItem key={p.id} p={p} />
          ))}
        </div>
      </div>

      {/* Simple modals */}
      {showComposer && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="w-[min(92vw,560px)] rounded-2xl border bg-card p-4 shadow-xl">
            <h2 className="mb-2 text-lg font-bold">إضافة منشور</h2>
            <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="اكتب منشورك هنا" className="min-h-[120px] w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
            <div className="mt-3 flex justify-end gap-2">
              <button onClick={()=>setShowComposer(false)} className="rounded-xl border px-4 py-2 text-sm">إلغاء</button>
              <button onClick={addPost} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">نشر</button>
            </div>
          </div>
        </div>
      )}

      {showVideo && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="w-[min(92vw,560px)] rounded-2xl border bg-card p-4 shadow-xl">
            <h2 className="mb-2 text-lg font-bold">إضافة فيديو</h2>
            <input value={videoUrl} onChange={(e)=>setVideoUrl(e.target.value)} placeholder="رابط الفيديو" className="w-full rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
            <div className="mt-3 flex justify-end gap-2">
              <button onClick={()=>setShowVideo(false)} className="rounded-xl border px-4 py-2 text-sm">إلغاء</button>
              <button onClick={addVideo} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">إضافة</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
