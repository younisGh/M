export default function Placeholder({ title, description }: { title: string; description?: string }) {
  return (
    <div className="grid place-items-center py-12">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold">{title}</h1>
        {description ? (
          <p className="mt-2 text-foreground/70">{description}</p>
        ) : (
          <p className="mt-2 text-foreground/70">هذه صفحة مبدئية سيتم تخصيصها لاحقًا.</p>
        )}
      </div>
    </div>
  );
}
