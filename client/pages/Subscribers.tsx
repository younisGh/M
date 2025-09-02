import { useMemo, useState } from "react";
import { Eye, MessageSquare, Heart, Home, Plus, Video, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export type Post = {
  id: string;
  author: string;
  title?: string;
  body: string;
  imageUrl: string;
  views: number;
  comments: number;
  likes: number;
};

type VideoItem = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  views: number;
  comments: number;
  likes: number;
};

function Metrics({ p }: { p: Pick<Post, "views" | "comments" | "likes"> }) {
  return (
    <div className="flex items-center gap-3 text-[11px] text-white/90 drop-shadow">
      <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {p.views}</span>
      <span className="inline-flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {p.comments}</span>
      <span className="inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {p.likes}</span>
    </div>
  );
}

function PostCard({ p }: { p: Post }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-brand">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={p.imageUrl} alt={p.title ?? p.author} className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-2 right-2 flex items-center justify-between gap-2">
          <Metrics p={p} />
        </div>
      </div>
      <div className="p-4">
        <header className="mb-1 flex items-center justify-between">
          <div className="text-xs text-foreground/60">{p.author}</div>
        </header>
        {p.title && <h3 className="text-sm font-semibold">{p.title}</h3>}
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-2 w-full text-right text-sm leading-6 text-foreground/90 hover:underline"
          aria-expanded={open}
        >
          <span className={open ? "whitespace-pre-wrap" : "line-clamp-2 whitespace-pre-wrap"}>{p.body}</span>
        </button>
      </div>
    </article>
  );
}

function VideoCard({ v }: { v: VideoItem }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-brand">
      <div className="relative aspect-[16/9] overflow-hidden">
        {playing ? (
          <video src={v.videoUrl} className="h-full w-full object-cover" controls autoPlay playsInline onEnded={() => setPlaying(false)} />
        ) : (
          <>
            <img src={v.thumbnailUrl} alt={v.title} className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
            <button onClick={() => setPlaying(true)} className="absolute inset-0 grid place-items-center text-white/90" aria-label="تشغيل الفيديو" title="تشغيل">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-black/50 backdrop-blur text-xl">▶</span>
            </button>
          </>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-2 right-2 flex items-center justify-between gap-2">
          <Metrics p={v as any} />
        </div>
        <div className="absolute left-2 top-2 rounded-full bg-black/40 px-2 py-1 text-xs text-white">فيديو</div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold">{v.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-foreground/80">{v.description}</p>
      </div>
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
        body: "أطلقنا اليوم مجموعة من الخدمات الجديدة لدعم الشركات الصغيرة والمتوسطة في التحول الرقمي... تفاصيل أكثر داخل المنشور.",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
        views: 1200,
        comments: 35,
        likes: 210,
      },
      {
        id: "2",
        author: "نفط الجنوب",
        body: "فرص تدريب جديدة لحديثي التخرج في قسم التشغيل والصيانة مع شهادات معتمدة.",
        imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
        views: 780,
        comments: 18,
        likes: 96,
      },
      {
        id: "3",
        author: "بناء العراق",
        body: "بدء العمل في مشروع الإسكان الجديد بمنطقة الكرادة، المرحلة الأولى تشمل 300 وحدة سكنية.",
        imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
        views: 980,
        comments: 22,
        likes: 144,
      },
    ],
    [],
  );

  const videosSeed = useMemo<VideoItem[]>(
    () => [
      {
        id: "v1",
        title: "مشروع مصنع جديد",
        description: "ملخص عن خطوط الإنتاج والطاقة الاستيعابية والميزات التقنية.",
        thumbnailUrl: "https://images.unsplash.com/photo-1581092598539-6603cf16e2aa?q=80&w=1600&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        views: 1400,
        comments: 24,
        likes: 180,
      },
      {
        id: "v2",
        title: "مخطط منطقة لوجستية",
        description: "عرض بصري لمخططات البنى التحتية للمستودعات وساحة الحاويات.",
        thumbnailUrl: "https://images.unsplash.com/photo-1517502474097-f9b30659dadb?q=80&w=1600&auto=format&fit=crop",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        views: 920,
        comments: 12,
        likes: 102,
      },
      {
        id: "v3",
        title: "محطة طاقة شمسية",
        description: "نموذج أولي لمزرعة ألواح ضمن مشروع الطاقة.",
        thumbnailUrl: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop",
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        views: 1100,
        comments: 19,
        likes: 130,
      },
    ],
    [],
  );

  const [tab, setTab] = useState<'posts' | 'videos'>('posts');
  const [posts, setPosts] = useState<Post[]>(seed);
  const [videos, setVideos] = useState<VideoItem[]>(videosSeed);
  const [showComposer, setShowComposer] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [text, setText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop");
  const [pickedImageUrl, setPickedImageUrl] = useState<string>("");

  function addPost() {
    if (!text.trim()) return;
    const img = pickedImageUrl || imageUrl;
    setPosts((p) => [
      { id: String(Date.now()), author: "أنا", body: text, imageUrl: img, views: 0, comments: 0, likes: 0 },
      ...p,
    ]);
    setText("");
    setPickedImageUrl("");
    setShowComposer(false);
  }

  function addVideo() {
    if (!videoUrl.trim() && !videoTitle.trim()) return;
    setVideos((v) => [
      {
        id: String(Date.now()),
        title: videoTitle || "فيديو جديد",
        description: videoDesc || "",
        thumbnailUrl: imageUrl,
        videoUrl: videoUrl || "",
        views: 0,
        comments: 0,
        likes: 0,
      },
      ...v,
    ]);
    setVideoUrl("");
    setVideoTitle("");
    setVideoDesc("");
    setShowVideo(false);
  }

  return (
    <section className="relative">
      {/* Fixed left rail */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center gap-3">
        <Link to="/subscribers" className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white shadow-lg shadow-black/10 transition hover:brightness-110" title="الرئيسية" aria-label="الرئيسية">
          <Home className="h-5 w-5" />
        </Link>
        <button onClick={() => setShowComposer(true)} className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-black/10 transition hover:brightness-110" title="إضافة منشور" aria-label="إضافة منشور">
          <Plus className="h-5 w-5" />
        </button>
        <button onClick={() => setShowVideo(true)} className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-black shadow-lg shadow-black/10 transition hover:brightness-110" title="إضافة فيديو" aria-label="إضافة فيديو">
          <Video className="h-5 w-5" />
        </button>
        <button onClick={() => navigate("/chat")} className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-black/10 transition hover:brightness-110" title="الدردشة" aria-label="الدردشة">
          <MessageCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="container py-6">
        <div className="mb-4 inline-flex rounded-xl border bg-card p-1 text-sm">
          <button
            className={`rounded-lg px-4 py-2 font-semibold ${tab === 'posts' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
            onClick={() => setTab('posts')}
            aria-selected={tab === 'posts'}
            role="tab"
          >
            المنشورات
          </button>
          <button
            className={`rounded-lg px-4 py-2 font-semibold ${tab === 'videos' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
            onClick={() => setTab('videos')}
            aria-selected={tab === 'videos'}
            role="tab"
          >
            الفيديوهات
          </button>
        </div>

        {tab === 'posts' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <VideoCard key={v.id} v={v} />
            ))}
          </div>
        )}
      </div>

      {/* Composer modal */}
      {showComposer && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="w-[min(92vw,560px)] rounded-2xl border bg-card p-4 shadow-xl">
            <h2 className="mb-2 text-lg font-bold">إضافة منشور</h2>
            <div className="mb-2 grid gap-2">
              <input value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} placeholder="رابط الصورة (اختياري)" className="w-full rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
              <div className="flex items-center gap-2">
                <input id="postImageFile" type="file" accept="image/*" className="hidden" onChange={(e)=>{ const f=e.target.files?.[0]; if(f){ const url=URL.createObjectURL(f); setPickedImageUrl(url);} }} />
                <label htmlFor="postImageFile" className="cursor-pointer rounded-xl border px-3 py-2 text-xs hover:bg-accent">إرفاق صورة</label>
                {pickedImageUrl && <img src={pickedImageUrl} alt="preview" className="h-10 w-16 rounded object-cover" />}
              </div>
              <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="اكتب منشورك هنا" className="min-h-[120px] w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button onClick={()=>setShowComposer(false)} className="rounded-xl border px-4 py-2 text-sm">إلغاء</button>
              <button onClick={addPost} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">نشر</button>
            </div>
          </div>
        </div>
      )}

      {/* Video modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="w-[min(92vw,560px)] rounded-2xl border bg-card p-4 shadow-xl">
            <h2 className="mb-2 text-lg font-bold">إضافة فيديو</h2>
            <div className="grid gap-2">
              <input value={videoTitle} onChange={(e)=>setVideoTitle(e.target.value)} placeholder="عنوان الفيديو" className="w-full rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
              <textarea value={videoDesc} onChange={(e)=>setVideoDesc(e.target.value)} placeholder="تفاصيل الفيديو" className="min-h-[90px] w-full rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
              <input value={videoUrl} onChange={(e)=>setVideoUrl(e.target.value)} placeholder="رابط الفيديو (اختياري)" className="w-full rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
              <div className="flex items-center gap-2">
                <input id="videoFile" type="file" accept="video/*" className="hidden" onChange={(e)=>{ const f=e.target.files?.[0]; if(f){ const url=URL.createObjectURL(f); setVideoUrl(url);} }} />
                <label htmlFor="videoFile" className="cursor-pointer rounded-xl border px-3 py-2 text-xs hover:bg-accent">إرفاق مقطع فيديو</label>
              </div>
            </div>
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
