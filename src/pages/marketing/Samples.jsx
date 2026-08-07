import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
import { getDB } from "../../lib/db";

function useSamples() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const onStorage = () => setTick((n) => n + 1);
    window.addEventListener("storage", onStorage);
    window.addEventListener("inkwell-db-updated", onStorage);
    const id = setInterval(onStorage, 2500);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("inkwell-db-updated", onStorage);
      clearInterval(id);
    };
  }, []);
  return useMemo(() => {
    try {
      return getDB().samples || [];
    } catch {
      return [];
    }
  }, [tick]);
}

export default function SamplesPage() {
  const samples = useSamples();
  const navigate = useNavigate();
  const categories = useMemo(() => {
    const set = new Set(samples.map((s) => s.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [samples]);
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? samples : samples.filter((s) => s.category === filter);

  return (
    <MarketingLayout>
      <section className="page-hero relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" aria-hidden />
        <div className="container-app relative flex min-h-[inherit] flex-col justify-center py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center text-white">
            <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gold sm:mb-3 sm:text-[0.78rem]">
              Portfolio
            </p>
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Writing samples
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/90 sm:mt-4 sm:text-base lg:text-lg">
              Real-style briefs by category. Tap any card for the full sample.
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
              <Button to="/signup" className="w-full bg-gold text-[#3a2f00] hover:brightness-95 sm:w-auto sm:min-w-[160px]">
                Start a project
              </Button>
              <Button to="/pricing" variant="outline" className="w-full border-white/40 bg-white/5 text-white hover:bg-white/15 sm:w-auto">
                View pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container-app">
          <div className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1 sm:mb-8 sm:flex-wrap sm:overflow-visible">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                  filter === c
                    ? "bg-blue text-white shadow-sm"
                    : "border border-line bg-white text-ink-soft hover:border-blue"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-line bg-white px-4 py-12 text-center text-slate sm:px-6 sm:py-16">
              No samples in this category yet.
            </div>
          ) : (
            <div className="mkt-grid-3">
              {filtered.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => navigate(`/samples/${s.id}`)}
                  className="group flex flex-col rounded-2xl border border-line bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-md sm:p-5 lg:p-6"
                >
                  <div className="text-[0.65rem] font-bold uppercase tracking-wider text-blue sm:text-xs">
                    {s.category}
                    {s.subcategory ? ` · ${s.subcategory}` : ""}
                  </div>
                  <h2 className="mt-2 font-display text-base font-semibold text-ink group-hover:text-blue-dark sm:text-lg">
                    {s.title}
                  </h2>
                  <p className="mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-ink-soft sm:mt-3 sm:text-[0.92rem]">
                    {s.paper}
                  </p>
                  <span className="mt-3 text-sm font-semibold text-blue sm:mt-4">Read full sample →</span>
                </button>
              ))}
            </div>
          )}

          <div className="mt-10 overflow-hidden rounded-2xl bg-ink px-4 py-8 text-center text-white sm:mt-12 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <h2 className="font-display text-lg font-semibold sm:text-2xl lg:text-3xl">
              Need work like this for your brief?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-[#c9ccd1] sm:mt-3 sm:text-base">
              Matched to a vetted writer — $0.04 per word, secure escrow, tracked end to end.
            </p>
            <div className="mt-5 flex flex-col items-stretch justify-center gap-2.5 sm:mt-6 sm:flex-row sm:items-center sm:gap-3">
              <Button to="/signup" className="w-full bg-gold text-[#3a2f00] hover:brightness-95 sm:w-auto">
                Order now
              </Button>
              <Button to="/process" variant="outline" className="w-full border-white/25 text-white hover:bg-white/10 sm:w-auto">
                How it works
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

export function SampleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const samples = useSamples();
  const sample = samples.find((s) => s.id === id);
  const related = samples.filter((s) => s.id !== id && s.category === sample?.category).slice(0, 3);

  if (!sample) {
    return (
      <MarketingLayout>
        <section className="py-16 sm:py-24">
          <div className="container-app max-w-lg px-4 text-center">
            <h1 className="font-display text-xl font-semibold text-ink sm:text-2xl">Sample not found</h1>
            <p className="mt-2 text-sm text-ink-soft sm:text-base">It may have been removed or the link is outdated.</p>
            <Button to="/samples" className="mt-6">Back to samples</Button>
          </div>
        </section>
      </MarketingLayout>
    );
  }

  const paragraphs = (sample.paper || "").split(/\n\n+/).filter(Boolean);

  return (
    <MarketingLayout>
      <section className="border-b border-line bg-slate-tint/50">
        <div className="container-app py-6 sm:py-10 lg:py-12">
          <button
            type="button"
            onClick={() => navigate("/samples")}
            className="mb-3 text-sm font-semibold text-blue hover:underline sm:mb-4"
          >
            ← All samples
          </button>
          <div className="max-w-3xl">
            <div className="text-[0.65rem] font-bold uppercase tracking-wider text-blue sm:text-xs">
              {sample.category}
              {sample.subcategory ? ` · ${sample.subcategory}` : ""}
            </div>
            <h1 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              {sample.title}
            </h1>
            <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3">
              <Button to="/signup" className="w-full sm:w-auto">Start a project like this</Button>
              <Button to="/pricing" variant="outline" className="w-full sm:w-auto">Pricing</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-14">
        <div className="container-app">
          <div className="sample-detail-layout">
            <article className="min-w-0">
              <div className="rounded-xl border border-line bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-8">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate sm:mb-4 sm:text-sm">
                  Sample paper
                </h2>
                <div className="space-y-3 text-[0.95rem] leading-relaxed text-ink-soft sm:space-y-4 sm:text-[1.05rem]">
                  {paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-ink p-5 text-white sm:mt-8 sm:rounded-2xl sm:p-6 lg:p-8">
                <h3 className="font-display text-lg font-semibold sm:text-xl">Commission similar work</h3>
                <p className="mt-2 text-sm text-[#c9ccd1]">
                  Tell us the brief — we’ll match a specialist. Transparent $0.04/word pricing.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row">
                  <Button to="/signup" className="w-full bg-gold text-[#3a2f00] hover:brightness-95 sm:w-auto">
                    Order now
                  </Button>
                  <Button to="/blogs" variant="outline" className="w-full border-white/25 text-white hover:bg-white/10 sm:w-auto">
                    Read the blog
                  </Button>
                </div>
              </div>
            </article>

            <aside className="space-y-4">
              <div className="rounded-xl border border-line bg-white p-4 sm:rounded-2xl sm:p-5">
                <h3 className="text-sm font-semibold text-ink">At a glance</h3>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate">Category</dt>
                    <dd className="font-medium text-ink">{sample.category}</dd>
                  </div>
                  {sample.subcategory && (
                    <div className="flex justify-between gap-2">
                      <dt className="text-slate">Type</dt>
                      <dd className="text-right font-medium text-ink">{sample.subcategory}</dd>
                    </div>
                  )}
                </dl>
                <Button to="/signup" className="mt-4 w-full" size="sm">
                  Start project
                </Button>
              </div>

              {related.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate sm:text-sm">
                    More in {sample.category}
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        to={`/samples/${r.id}`}
                        className="block rounded-xl border border-line bg-white p-3 transition hover:border-blue/40"
                      >
                        <div className="text-xs font-semibold text-blue">{r.subcategory || r.category}</div>
                        <div className="mt-0.5 line-clamp-2 font-medium text-ink">{r.title}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
