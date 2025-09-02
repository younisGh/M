import { useMemo } from "react";

export default function Companies() {
  const sectors = useMemo(
    () => [
      "قسم 1",
      "قسم 2",
      "قسم 3",
      "قسم 4",
      "قسم 5",
      "قسم 6",
      "قسم 7",
      "قسم 8",
      "قسم 9",
      "قسم 10",
      "قسم 11",
      "قسم 12"
    ],
    [],
  );

  return (
    <section className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
          دليل الشركات
        </h1>
        <p className="mt-2 text-foreground/70">
          استكشف الشركات حسب القطاع أو المحافظة. هذه صفحة مبدئية وسنقوم
          بتخصيصها وفق احتياجاتك.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((s) => (
          <div
            key={s}
            className="rounded-xl border bg-card p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-2 text-sm text-foreground/60">قطاع</div>
            <div className="text-lg font-bold">{s}</div>
            <p className="mt-2 text-foreground/70">
              تصفح الشركات ضمن قطاع {s}.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
