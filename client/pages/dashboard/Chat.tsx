import { useMemo, useRef, useState } from "react";
import { useMock } from "@/mock/MockContext";
import PaywallNotice from "@/components/mock/PaywallNotice";

type Attachment = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
};

interface Message {
  id: string;
  from: string;
  text: string;
  attachments?: Attachment[];
}

interface Contact { id: string; name: string; company: string }

export default function ChatPage() {
  const listRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contacts = useMemo<Contact[]>(
    () => [
      { id: "u1", name: "علي كريم", company: "شركة الرافدين" },
      { id: "u2", name: "سارة محمد", company: "نفط الجنوب" },
      { id: "u3", name: "حسن عمران", company: "بناء العراق" },
      { id: "u4", name: "نور مهدي", company: "مصرف الرافدين" },
    ],
    [],
  );

  const [query, setQuery] = useState("");
  const filtered = contacts.filter((c) => c.name.includes(query) || c.company.includes(query));

  const [activeId, setActiveId] = useState<string>(contacts[0]?.id || "");
  const active = contacts.find((c) => c.id === activeId);

  const [conversations, setConversations] = useState<Record<string, Message[]>>({
    u1: [
      { id: "m1", from: "علي كريم", text: "أهلًا! كيف يمكنني المساعدة؟" },
    ],
  });

  const [text, setText] = useState("");
  const [pending, setPending] = useState<Attachment[]>([]);

  const { role, subscription, chatReadOnly } = useMock();

  function onPickFiles() {
    fileInputRef.current?.click();
  }

  function onFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const mapped: Attachment[] = files.map((f) => ({
      id: `${f.name}-${f.size}-${Date.now()}`,
      name: f.name,
      url: URL.createObjectURL(f),
      type: f.type,
      size: f.size,
    }));
    setPending((p) => [...p, ...mapped]);
    e.currentTarget.value = "";
  }

  function removePending(id: string) {
    setPending((p) => p.filter((a) => a.id !== id));
  }

  function send() {
    if (!text.trim() && pending.length === 0) return;
    if (role !== "admin" && chatReadOnly) {
      alert("القناة مقفلة من قبل الإدارة.");
      return;
    }
    if (subscription !== "active") {
      alert("الاشتراك غير نشط. قم بالترقية لإرسال الرسائل.");
      return;
    }
    setConversations((conv) => {
      const list = conv[activeId] || [];
      const msg: Message = {
        id: String(Date.now()),
        from: "أنا",
        text,
        attachments: pending,
      };
      return { ...conv, [activeId]: [...list, msg] };
    });
    setText("");
    setPending([]);
    setTimeout(() => listRef.current?.scrollTo({ top: 1e9, behavior: "smooth" }), 0);
  }

  const msgs = conversations[activeId] || [];

  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-extrabold">التواصل</h1>
      <div className="grid gap-4 md:grid-cols-[300px,1fr]">
        {/* Contacts */}
        <aside className="rounded-2xl border p-3">
          <div className="mb-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن مستخدم أو شركة"
              className="w-full rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="space-y-1">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`w-full rounded-xl px-3 py-2 text-right text-sm ${
                  activeId === c.id ? "bg-accent" : "hover:bg-accent"
                }`}
              >
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-foreground/60">{c.company}</div>
              </button>
            ))}
          </div>
        </aside>

        {/* Conversation */}
        <div className="flex min-h-[460px] flex-col rounded-2xl border">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="text-sm">
              <div className="font-extrabold">{active?.name || "مستخدم"}</div>
              <div className="text-foreground/60">{active?.company}</div>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-xs text-foreground/70" title="حجم الخط">
                Aa
                <input type="range" min={12} max={18} value={fontSize} onChange={(e)=>setFontSize(Number(e.target.value))} />
              </label>
              <button onClick={()=>setClosed((v)=>!v)} className={`rounded-full border p-2 text-xs ${closed? 'bg-amber-500/20':'hover:bg-accent'}`} title="إغلاق/فتح" aria-label="إغلاق/فتح">{closed? 'مغلقة' : 'مفتوحة'}</button>
              <button className="rounded-full border p-2 text-sm hover:bg-accent" title="اتصال صوتي" aria-label="اتصال صوتي">🔊</button>
              <button className="rounded-full border p-2 text-sm hover:bg-accent" title="اتصال فيديوي" aria-label="اتصال فيديوي">🎥</button>
            </div>
          </div>

          <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto p-4" style={{ fontSize }}>
            {msgs.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  m.from === "أنا"
                    ? "ms-auto bg-primary text-primary-foreground"
                    : "bg-accent"
                }`}
              >
                <div className="text-[11px] opacity-70">{m.from}</div>
                {m.text && <div className="mt-1 whitespace-pre-wrap">{m.text}</div>}
                {m.attachments && m.attachments.length > 0 && (
                  <div className={`mt-2 grid gap-2 ${m.attachments.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {m.attachments.map((a) => (
                      <AttachmentView key={a.id} a={a} />)
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="border-t p-3">
            <PaywallNotice feature="المراسلة" />
            {closed && <div className="mb-2 rounded-xl border bg-amber-50 p-2 text-xs text-amber-700">المحادثة مغلقة. افتحها لإرسال رسائل.</div>}
            {pending.length > 0 && (
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {pending.map((a) => (
                  <PendingAttachment key={a.id} a={a} onRemove={() => removePending(a.id)} />
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                placeholder={`أرسل رسالة إلى ${active?.name ?? "المستخدم"}`}
                className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
                disabled={closed}
              />
              <input ref={fileInputRef} type="file" multiple accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.*" className="hidden" onChange={onFilesSelected} />
              <input ref={imageInputRef} type="file" multiple accept="image/*" className="hidden" onChange={onImageSelected} />
              <input ref={audioInputRef} type="file" multiple accept="audio/*" className="hidden" onChange={onAudioSelected} />

              <button onClick={onPickImage} disabled={closed} className="rounded-xl border px-3 py-2 text-xs hover:bg-accent disabled:opacity-60">صورة</button>
              <button onClick={onPickAudio} disabled={closed} className="rounded-xl border px-3 py-2 text-xs hover:bg-accent disabled:opacity-60">صوت</button>
              <button onClick={onPickFiles} disabled={closed} className="rounded-xl border px-3 py-2 text-xs hover:bg-accent disabled:opacity-60">ملف</button>
              <button
                onClick={send}
                disabled={closed}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                إرسال
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function isImage(type: string) {
  return type.startsWith("image/");
}

function humanSize(n: number) {
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
  return `${(n / (1024 * 1024)).toFixed(1)}MB`;
}

function AttachmentView({ a }: { a: Attachment }) {
  return isImage(a.type) ? (
    <a href={a.url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border">
      <img src={a.url} alt={a.name} className="h-40 w-full object-cover" />
    </a>
  ) : (
    <a
      href={a.url}
      download={a.name}
      className="flex items-center justify-between rounded-xl border bg-background px-3 py-2 text-xs hover:bg-accent"
    >
      <span className="truncate">{a.name}</span>
      <span className="text-foreground/60">{humanSize(a.size)}</span>
    </a>
  );
}

function PendingAttachment({ a, onRemove }: { a: Attachment; onRemove: () => void }) {
  return isImage(a.type) ? (
    <div className="relative">
      <img src={a.url} alt={a.name} className="h-16 w-16 rounded-lg object-cover" />
      <button onClick={onRemove} className="absolute right-[-8px] top-[-8px] rounded-full bg-destructive px-1.5 py-0.5 text-[10px] text-destructive-foreground">إزالة</button>
    </div>
  ) : (
    <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-1.5 text-xs">
      <span className="truncate max-w-[140px]">{a.name}</span>
      <span className="text-foreground/60">{humanSize(a.size)}</span>
      <button onClick={onRemove} className="text-destructive">إزالة</button>
    </div>
  );
}
