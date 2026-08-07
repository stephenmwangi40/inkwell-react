import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
import { getDB } from "../../lib/db";

export default function BlogsPage() {
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

  const blogs = useMemo(() => {
    try {
      return [...(getDB().blogs || [])].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    } catch {
      return [];
    }
  }, [tick]);

  const [openId, setOpenId] = useState(null);
  useEffect(() => {
    if (!openId && blogs[0]) setOpenId(blogs[0].id);
  }, [blogs, openId]);

  const open = blogs.find((b) => b.id === openId) || blogs[0];

  const selectPost = (id) => {
    setOpenId(id);
    // Scroll to article on small screens after picking a post
    requestAnimationFrame(() => {
      const el = document.getElementById("blog-article");
      if (el && window.matchMedia("(max-width: 1023px)").matches) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  return (
    <MarketingLayout>
      {/* Hero — fluid on all phones */}
      <section className="relative w-full max-w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=75"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/75" aria-hidden />
        <div className="container-app relative px-4 py-10 xs:py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-3xl text-center text-white">
            <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-gold sm:text-[0.78rem]">
              From the desk
            </p>
            <h1 className="font-display text-[1.5rem] font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Notes on craft, process &amp; pricing
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-[0.875rem] leading-relaxed text-white/90 sm:mt-4 sm:text-base lg:text-lg">
              Practical writing for founders and marketers — published by the Inkwell team.
            </p>
            <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
              <Button
                to="/signup"
                className="w-full justify-center bg-gold text-[#3a2f00] hover:brightness-95 sm:w-auto sm:min-w-[9.5rem]"
              >
                Start a project
              </Button>
              <Button
                to="/samples"
                variant="outline"
                className="w-full justify-center border-white/40 bg-white/5 text-white hover:bg-white/15 sm:w-auto"
              >
                View samples
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-full overflow-x-hidden py-8 sm:py-12 lg:py-16">
        <div className="container-app px-4 sm:px-5 md:px-6">
          {blogs.length === 0 ? (
            <div className="rounded-2xl border border-line bg-white px-4 py-12 text-center text-sm text-slate">
              No posts yet. Check back soon.
            </div>
          ) : (
            <div className="flex w-full max-w-full flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-12">
              {/* Post picker — full width stacked cards on phone (no horizontal overflow) */}
              <aside className="order-1 w-full max-w-full lg:order-2">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate">
                  All posts ({blogs.length})
                </h3>

                {/* Mobile: native select for quick jump */}
                <label className="mb-3 block w-full lg:hidden">
                  <span className="sr-only">Choose a post</span>
                  <select
                    value={open?.id || ""}
                    onChange={(e) => selectPost(e.target.value)}
                    className="w-full max-w-full rounded-[10px] border border-line bg-white px-3 py-3 text-sm font-medium text-ink outline-none focus:border-blue"
                  >
                    {blogs.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.title}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Vertical list — always stacked, never horizontal on phone */}
                <div className="flex w-full max-w-full flex-col gap-2.5">
                  {blogs.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => selectPost(b.id)}
                      className={`flex w-full max-w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                        open?.id === b.id
                          ? "border-blue bg-blue-tint shadow-sm"
                          : "border-line bg-white hover:border-blue/40"
                      }`}
                    >
                      {b.imageUrl ? (
                        <img
                          src={b.imageUrl}
                          alt=""
                          className="h-14 w-14 shrink-0 rounded-lg object-cover sm:h-16 sm:w-16"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-tint text-[0.65rem] text-slate sm:h-16 sm:w-16">
                          Post
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="line-clamp-2 text-sm font-medium leading-snug text-ink">{b.title}</div>
                        <div className="mt-1 text-[0.7rem] text-slate">
                          {b.author} · {b.date}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </aside>

              {/* Article */}
              {open && (
                <article id="blog-article" className="order-2 w-full min-w-0 max-w-full scroll-mt-20 lg:order-1">
                  {open.imageUrl && (
                    <img
                      src={open.imageUrl}
                      alt=""
                      className="mb-4 h-auto w-full max-w-full rounded-xl object-cover sm:mb-6 sm:rounded-2xl"
                      style={{ aspectRatio: "16 / 10", maxHeight: "360px" }}
                    />
                  )}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate sm:text-sm">
                    <span className="font-medium text-ink-soft">{open.author}</span>
                    <span aria-hidden>·</span>
                    <time dateTime={open.date}>{open.date}</time>
                  </div>
                  <h2 className="mt-2 break-words font-display text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl lg:text-3xl">
                    {open.title}
                  </h2>
                  <div className="mt-4 space-y-3 break-words text-[0.9375rem] leading-relaxed text-ink-soft sm:mt-6 sm:space-y-4 sm:text-[1.05rem]">
                    {(open.body || "").split(/\n\n+/).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  <div className="mt-8 w-full max-w-full rounded-xl border border-line bg-slate-tint/60 p-4 sm:mt-10 sm:rounded-2xl sm:p-6">
                    <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
                      Ready to brief a writer?
                    </h3>
                    <p className="mt-1 text-xs text-ink-soft sm:text-sm">
                      Matched specialists, $0.04 per word, tracked from assignment to delivery.
                    </p>
                    <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row">
                      <Button to="/signup" className="w-full justify-center sm:w-auto">
                        Order now
                      </Button>
                      <Button to="/pricing" variant="outline" className="w-full justify-center sm:w-auto">
                        See pricing
                      </Button>
                    </div>
                  </div>
                </article>
              )}
            </div>
          )}

          <p className="mt-10 px-1 text-center text-sm text-slate sm:mt-12">
            Looking for example work?{" "}
            <Link to="/samples" className="font-medium text-blue hover:underline">
              View writing samples
            </Link>
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
