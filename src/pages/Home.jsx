import Button from "../components/ui/Button";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MarketingLayout from "../components/layout/MarketingLayout";
import PriceCalculator from "../components/marketing/PriceCalculator";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getDB } from "../lib/db";

const services = [
  { num: "01", title: "Business & pitch copy", desc: "Investor decks, pitch narratives, one-pagers — written to move a decision forward.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=220&fit=crop", alt: "Business pitch deck on a laptop screen" },
  { num: "02", title: "Research & reports", desc: "Whitepapers and market research with sourced, fact-checked claims.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=220&fit=crop", alt: "Research charts and printed reports" },
  { num: "03", title: "Brand & web copy", desc: "Style guides, landing pages, and product copy that hold a consistent voice.", img: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=400&h=220&fit=crop", alt: "Brand style guide and swatches on a desk" },
  { num: "04", title: "Academic support", desc: "Structured essays and papers with citation formatting handled for you.", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=220&fit=crop", alt: "Student writing a structured academic paper" },
  { num: "05", title: "PR & press kits", desc: "Announcements and press kits written for pickup, not just publishing.", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=220&fit=crop", alt: "Press kit and announcement documents" },
  { num: "06", title: "Editing & polish", desc: "Line edits and structural passes on a draft you already have.", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=220&fit=crop", alt: "Editor marking up a printed draft" },
];

const process = [
  { n: 1, title: "Assigned", desc: "Your brief is matched to a vetted writer within hours." },
  { n: 2, title: "Drafting", desc: "Your writer works the brief; you can message anytime." },
  { n: 3, title: "Review", desc: "You review the draft and request changes if needed." },
  { n: 4, title: "Delivered", desc: "Final files land in your dashboard, ready to use." },
];

const writers = [
  { name: "Maya Okoye", craft: "Business & Pitch Copy", rating: "4.9", reviews: 212, img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces" },
  { name: "Theo Marsh", craft: "Research Reports", rating: "4.8", reviews: 167, img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces" },
  { name: "Elena Vos", craft: "Brand & Web Copy", rating: "5.0", reviews: 98, img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces" },
  { name: "Sam Rourke", craft: "PR & Press Kits", rating: "4.9", reviews: 140, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces" },
];

const testimonials = [
  { quote: "Our investor narrative went through two rounds of edits and still landed two days early. The order tracker made status calls unnecessary.", name: "Amara Chen", company: "Brightleaf Co.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" },
  { quote: "Having a dedicated writer for the whole engagement, not a new one each time, changed the quality of everything we shipped.", name: "Deacon Frost", company: "Northline", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces" },
  { quote: "Payment only released after I approved the draft, which made the whole process feel low-risk for a first-time client.", name: "Priya Nair", company: "Quillworks", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces" },
];

const faqs = [
  { q: "How fast is a writer assigned?", a: "Most briefs are matched to a vetted writer within a few hours on business days. You'll see the order move to \"Assigned\" on your dashboard the moment it happens." },
  { q: "Can I request changes after delivery?", a: "Yes. Every plan includes revision rounds, and you can request a revision straight from the order page — your writer is notified immediately with your notes." },
  { q: "Is my payment protected?", a: "Card payments are held securely and only released to the writer once you've approved the final draft, so there's no risk in paying up front." },
  { q: "Can I upload my own reference files?", a: "Yes — when you submit a brief you can optionally attach reference documents, and your writer can upload finished drafts back to the same order for you to review." },
  { q: "How do I become a writer on the platform?", a: "Writer accounts are set up by our team after a short review of your portfolio. Once live, you get your own desk with earnings tracking, a customer list, and full order control." },
];

function Eyebrow({ children, className = "" }) {
  return (
    <span className={`mb-3 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-blue ${className}`}>
      <span className="inline-block h-0.5 w-4 bg-gold" />
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section overflow-hidden pb-12 pt-10 sm:pt-14 lg:pt-16">
          <div className="container-app">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <Eyebrow>Professional writing, on schedule</Eyebrow>
                <h1 className="font-display text-[2.1rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[2.6rem] lg:text-[3rem]">
                  A real writer. A visible timeline. Work that lands.
                </h1>
                <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-ink-soft">
                  Matched to a vetted professional for business copy, research, and content — then tracked on one shared order from brief to final delivery.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button to="/signup" size="lg">Order Now — free brief</Button>
                  <Button to="/process" variant="outline" size="lg">How it works</Button>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex">
                    {[
                      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
                    ].map((src, i) => (
                      <img
                        key={src}
                        src={src}
                        alt="Client avatar"
                        className={`h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm ${i ? "-ml-2.5" : ""}`}
                        width={36}
                        height={36}
                        loading="lazy"
                      />
                    ))}
                  </div>
                  <span className="text-[0.84rem] text-slate">
                    <strong className="font-semibold text-ink">2,300+</strong> briefs delivered on deadline
                  </span>
                </div>
              </div>

              <div className="relative mx-auto max-w-[420px] lg:ml-auto">
                <div className="aspect-[4/5] overflow-hidden rounded-[20px] bg-slate-tint shadow-[0_4px_12px_rgba(18,21,26,.04),0_24px_56px_rgba(18,21,26,.12)]">
                  <img
                    src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&h=1100&fit=crop"
                    alt="Writer working at a desk with notes and a laptop"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute left-[-12px] top-5 w-[180px] rounded-xl border border-line/90 bg-white p-3 shadow-[0_10px_36px_rgba(18,21,26,.14)] sm:left-[-36px] sm:w-[196px]">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-blue-tint text-sm font-bold text-blue-dark">✓</span>
                    <div>
                      <strong className="block text-[0.82rem] font-semibold leading-tight text-ink">Draft approved</strong>
                      <span className="text-[0.72rem] text-slate">Market whitepaper</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-7 right-[-8px] w-[180px] rounded-xl border border-line/90 bg-white p-3 shadow-[0_10px_36px_rgba(18,21,26,.14)] sm:right-[-28px] sm:w-[200px]">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-blue-tint text-sm font-bold text-blue-dark">$</span>
                    <div>
                      <strong className="block text-[0.82rem] font-semibold leading-tight text-ink">$520 paid</strong>
                      <span className="text-[0.72rem] text-slate">Secure checkout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature teasers */}
        <section className="pb-12 sm:pb-16">
          <div className="container-app">
            <div className="mkt-grid-3">
              {[
                { title: "Shared order workspace", body: "Clients and writers work from the same project view — files, messages, and status in one place." },
                { title: "Upload any file", body: "Attach briefs, references, or finished drafts at every stage, right inside the order." },
                { title: "One-click revisions", body: "Request changes from the order page. Notes stay linked to the same job." },
              ].map((f) => (
                <div key={f.title} className="rounded-2xl border border-line bg-white p-6 transition hover:border-blue/35 hover:shadow-[0_8px_28px_rgba(0,123,255,.06)] sm:p-7">
                  <strong className="mb-2.5 block text-[1.02rem] font-semibold tracking-tight text-ink">{f.title}</strong>
                  <p className="m-0 text-[0.925rem] leading-relaxed text-slate">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logo strip */}
        <section className="pb-10">
          <div className="container-app">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60 sm:gap-x-14">
              {["Northline", "Brightleaf", "Quillworks", "Marden & Co", "Fenwick Labs"].map((n) => (
                <span key={n} className="font-display text-lg font-semibold tracking-tight text-ink-soft sm:text-xl">{n}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section bg-slate-tint py-14 sm:py-16 lg:py-20">
          <div className="container-app">
            <div className="mb-10 max-w-xl">
              <Eyebrow>Services</Eyebrow>
              <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-ink sm:text-[2rem]">
                Whatever the brief, matched to the right writer
              </h2>
              <p className="mt-3 text-ink-soft">Every category has writers screened for that craft — specialists, not generalists.</p>
            </div>
            <div className="mkt-grid-3">
              {services.map((s) => (
                <div key={s.num} className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:shadow-md">
                  <img src={s.img} alt={s.alt} className="h-[140px] w-full object-cover sm:h-[160px]" loading="lazy" width={400} height={220} />
                  <div className="p-5">
                    <div className="mb-2 text-xs font-bold tracking-wider text-blue">{s.num}</div>
                    <h3 className="font-display text-lg font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-slate">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="section py-14 sm:py-16 lg:py-20">
          <div className="container-app">
            <div className="mb-10 max-w-xl">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-ink sm:text-[2rem]">
                One ribbon tracks every order, start to finish
              </h2>
              <p className="mt-3 text-ink-soft">The same four stages on your dashboard and your writer’s — no guessing, no status calls.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((p) => (
                <div key={p.n} className="rounded-2xl border border-line bg-white p-6">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">{p.n}</div>
                  <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-slate">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Built for both */}
        <section className="section bg-slate-tint py-14 sm:py-16">
          <div className="container-app">
            <div className="mb-8 max-w-xl">
              <Eyebrow>Platform</Eyebrow>
              <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-ink sm:text-[2rem]">
                Built for both sides
              </h2>
              <p className="mt-3 text-ink-soft">A dashboard for clients. A desk for writers. One shared order.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { t: "Live order tracking", d: "See exactly which stage a job is in — always in sync." },
                { t: "Direct messaging", d: "Talk inside the order. No separate inboxes or lost threads." },
                { t: "Secure checkout", d: "Funds held until the draft is approved. Fair for both sides." },
                { t: "Writer earnings & charts", d: "Dedicated payout dashboard, performance insights, and full control of your desk." },
              ].map((f) => (
                <div key={f.t} className="flex gap-3 rounded-2xl border border-line bg-white p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-tint text-xs font-bold text-blue-dark">✓</span>
                  <div>
                    <strong className="block text-ink">{f.t}</strong>
                    <p className="mt-1 text-[0.9rem] text-slate">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/signup">Create client account</Button>
              <Button to="/writer-login" variant="outline">Writer desk</Button>
            </div>
          </div>
        </section>

        {/* Writers */}
        <section id="writers" className="section py-14 sm:py-16 lg:py-20">
          <div className="container-app">
            <div className="mb-10 max-w-xl">
              <Eyebrow>Our writers</Eyebrow>
              <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-ink sm:text-[2rem]">Meet a few of the desk</h2>
              <p className="mt-3 text-ink-soft">Writers apply, get vetted by craft, and run their own schedule from a dedicated dashboard — with earnings tracking and direct client messaging.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {writers.map((w) => (
                <div key={w.name} className="overflow-hidden rounded-2xl border border-line bg-white text-center shadow-sm">
                  <img src={w.img} alt={`Portrait of ${w.name}`} className="aspect-square w-full object-cover" loading="lazy" width={400} height={400} />
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold text-ink">{w.name}</h3>
                    <p className="text-sm text-slate">{w.craft}</p>
                    <p className="mt-2 text-sm font-medium text-ink">★★★★★ {w.rating} <span className="font-normal text-slate">({w.reviews})</span></p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { n: "2,300+", l: "Projects delivered" },
                { n: "98%", l: "On-time delivery" },
                { n: "180+", l: "Vetted writers" },
                { n: "4.9/5", l: "Average client rating" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-line bg-white p-4 text-center">
                  <div className="font-display text-2xl font-semibold text-ink sm:text-3xl">{s.n}</div>
                  <div className="mt-1 text-xs text-slate sm:text-sm">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section bg-slate-tint py-14 sm:py-16">
          <div className="container-app">
            <div className="mb-10 max-w-xl">
              <Eyebrow>Client stories</Eyebrow>
              <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-ink sm:text-[2rem]">What clients say after delivery</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.name} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                  <div className="mb-3 text-gold">★★★★★</div>
                  <p className="text-[0.95rem] leading-relaxed text-ink-soft">“{t.quote}”</p>
                  <div className="mt-5 flex items-center gap-3">
                    <img src={t.img} alt={t.name} className="h-10 w-10 rounded-full object-cover" width={38} height={38} loading="lazy" />
                    <div>
                      <strong className="block text-sm text-ink">{t.name}</strong>
                      <span className="text-xs text-slate">{t.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="section py-14 sm:py-16 lg:py-20">
          <div className="container-app">
            <div className="mb-10 max-w-xl text-center mx-auto">
              <Eyebrow className="justify-center">Pricing</Eyebrow>
              <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-ink sm:text-[2rem]">Simple per-project pricing</h2>
              <p className="mt-3 text-ink-soft">Priced by scope at the brief stage — no subscriptions, no surprise add-ons.</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {/* Starter */}
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold text-ink">Starter</h3>
                <p className="mt-1 text-sm text-slate">For short, single-deliverable briefs.</p>
                <div className="mt-5 font-display text-3xl font-semibold text-ink">$0.09 <span className="text-base font-normal text-slate">/word</span></div>
                <ul className="mt-5 space-y-2 text-sm text-ink-soft">
                  <li>Up to 1,500 words</li>
                  <li>Standard 5-day turnaround</li>
                  <li>1 revision round</li>
                  <li>Email support</li>
                </ul>
                <Button to="/signup" variant="outline" className="mt-6 w-full">Start a project</Button>
              </div>
              {/* Professional */}
              <div className="relative rounded-2xl border-2 border-blue bg-white p-6 shadow-md sm:p-8">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue px-3 py-0.5 text-xs font-semibold text-white">Most popular</span>
                <h3 className="font-display text-xl font-semibold text-ink">Professional</h3>
                <p className="mt-1 text-sm text-slate">For ongoing business and research work.</p>
                <div className="mt-5 font-display text-3xl font-semibold text-ink">$0.14 <span className="text-base font-normal text-slate">/word</span></div>
                <ul className="mt-5 space-y-2 text-sm text-ink-soft">
                  <li>Unlimited length</li>
                  <li>3-day priority turnaround</li>
                  <li>3 revision rounds</li>
                  <li>Dedicated writer</li>
                  <li>Direct messaging</li>
                </ul>
                <Button to="/signup" className="mt-6 w-full">Start a project</Button>
              </div>
              {/* Enterprise */}
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold text-ink">Enterprise</h3>
                <p className="mt-1 text-sm text-slate">For teams with recurring content needs.</p>
                <div className="mt-5 font-display text-3xl font-semibold text-ink">Custom</div>
                <ul className="mt-5 space-y-2 text-sm text-ink-soft">
                  <li>Dedicated writer pool</li>
                  <li>Same-day rush available</li>
                  <li>Unlimited revisions</li>
                  <li>Priority account manager</li>
                </ul>
                <Button href="mailto:hello@inkwellandco.com" variant="outline" className="mt-6 w-full">Talk to sales</Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        
        {/* Estimate + featured content */}
        <section className="section bg-white py-14 sm:py-16 lg:py-20">
          <div className="container-app">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <PriceCalculator />
              <FeaturedContent />
            </div>
          </div>
        </section>

        <section id="faq" className="section bg-slate-tint py-14 sm:py-16">
          <div className="container-app">
            <div className="mx-auto mb-10 max-w-xl text-center">
              <Eyebrow className="justify-center">FAQ</Eyebrow>
              <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-ink sm:text-[2rem]">Common questions before you start</h2>
              <p className="mt-3 text-ink-soft">Still unsure? Send us a brief anyway — the first conversation with a writer is free.</p>
            </div>
            <div className="mx-auto max-w-2xl space-y-3">
              {faqs.map((f, i) => (
                <details key={f.q} className="group rounded-xl border border-line bg-white open:shadow-sm" open={i === 0}>
                  <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-3">
                    {f.q}
                    <span className="text-slate transition group-open:rotate-180">▾</span>
                  </summary>
                  <p className="border-t border-line px-5 py-4 text-[0.95rem] leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="py-12 sm:py-16">
          <div className="container-app">
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-ink px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10 sm:py-10">
              <div>
                <h2 className="font-display text-2xl font-semibold sm:text-[1.75rem]">Ready to hand off the first draft?</h2>
                <p className="mt-2 text-[#c9ccd1]">Tell us the brief — a vetted writer is matched within hours.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button to="/signup" variant="gold">Order Now</Button>
                <Button to="/writer-login" variant="outline" className="!border-white/35 !text-white hover:!border-white hover:!bg-white/10">
                  Writer login
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


function FeaturedContent() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const fn = () => setTick((n) => n + 1);
    window.addEventListener("inkwell-db-updated", fn);
    return () => window.removeEventListener("inkwell-db-updated", fn);
  }, []);
  const { blog, sample } = useMemo(() => {
    try {
      const db = getDB();
      const blogs = [...(db.blogs || [])].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      const samples = db.samples || [];
      return { blog: blogs[0], sample: samples[0] };
    } catch {
      return { blog: null, sample: null };
    }
  }, [tick]);

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold text-ink">From the library</h3>
      {blog && (
        <Link to="/blogs" className="block rounded-2xl border border-line bg-slate-tint/40 p-4 transition hover:border-blue/40 sm:p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-blue">Latest post</div>
          <div className="mt-1 font-semibold text-ink">{blog.title}</div>
          <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{blog.body}</p>
          <span className="mt-2 inline-block text-sm font-semibold text-blue">Read blog →</span>
        </Link>
      )}
      {sample && (
        <Link to={`/samples/${sample.id}`} className="block rounded-2xl border border-line bg-slate-tint/40 p-4 transition hover:border-blue/40 sm:p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-blue">Featured sample</div>
          <div className="mt-1 font-semibold text-ink">{sample.title}</div>
          <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{sample.paper}</p>
          <span className="mt-2 inline-block text-sm font-semibold text-blue">View sample →</span>
        </Link>
      )}
      {!blog && !sample && (
        <p className="rounded-2xl border border-line p-6 text-sm text-slate">Blog posts and samples will appear here once published from the writer desk.</p>
      )}
    </div>
  );
}
