import { MessageSquare, Eye, Star } from "lucide-react";

export type Post = {
  id: number;
  imageUrl: string;
  description: string;
  comments: number;
  views: number;
  rating: number;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition hover:shadow-brand" aria-label={post.description}>
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
        <img
          src={post.imageUrl}
          alt={post.description}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-foreground/80">{post.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-foreground/60">
        <div className="flex items-center gap-1" title="التعليقات">
          <MessageSquare className="h-4 w-4" aria-hidden />
          <span aria-label="عدد التعليقات">{post.comments}</span>
        </div>
        <div className="flex items-center gap-1" title="المشاهدات">
          <Eye className="h-4 w-4" aria-hidden />
          <span aria-label="عدد المشاهدات">{post.views}</span>
        </div>
        <div className="flex items-center gap-1" title="التقييم">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden />
          <span aria-label="التقييم">{post.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}
