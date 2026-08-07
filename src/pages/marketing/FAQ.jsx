import MarketingLayout from "../../components/layout/MarketingLayout";
const faqs = [
  { q: "How fast is a writer assigned?", a: "Most briefs are matched within a few hours on business days." },
  { q: "Can I request changes after delivery?", a: "Yes. Every plan includes revision rounds from the order page." },
  { q: "Is my payment protected?", a: "Card payments are held until you approve the final draft." },
  { q: "Can I upload reference files?", a: "Yes — attach references when you submit a brief." },
  { q: "How do I become a writer?", a: "Writer accounts are set up after a portfolio review by our team." },
];
export default function FAQPage() {
  return (
    <MarketingLayout>
      <section className="bg-slate-tint py-12 sm:py-16">
        <div className="container-app">
          <h1 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">FAQ</h1>
          <div className="mx-auto mt-10 max-w-2xl space-y-3">
            {faqs.map((f, i) => (
              <details key={f.q} className="group rounded-xl border border-line bg-white" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}<span className="text-slate group-open:rotate-180">▾</span>
                </summary>
                <p className="border-t border-line px-5 py-4 text-[0.95rem] text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
