import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
const services = [
  { num: "01", title: "Business & pitch copy", desc: "Investor decks, pitch narratives, one-pagers — written to move a decision forward." },
  { num: "02", title: "Research & reports", desc: "Whitepapers and market research with sourced, fact-checked claims." },
  { num: "03", title: "Brand & web copy", desc: "Style guides, landing pages, and product copy that hold a consistent voice." },
  { num: "04", title: "Academic support", desc: "Structured essays and papers with citation formatting handled for you." },
  { num: "05", title: "PR & press kits", desc: "Announcements and press kits written for pickup, not just publishing." },
  { num: "06", title: "Editing & polish", desc: "Line edits and structural passes on a draft you already have." },
];
export default function ServicesPage() {
  return (
    <MarketingLayout>
      <section className="bg-slate-tint py-12 sm:py-16">
        <div className="container-app">
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Services</h1>
          <p className="mt-2 max-w-xl text-ink-soft">Every category has writers screened for that craft — specialists, not generalists.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.num} className="rounded-2xl border border-line bg-white p-5">
                <div className="text-xs font-bold tracking-wider text-blue">{s.num}</div>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.9rem] text-slate">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10"><Button to="/signup">Order Now</Button></div>
        </div>
      </section>
    </MarketingLayout>
  );
}
