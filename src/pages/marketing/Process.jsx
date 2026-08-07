import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";

const steps = [
  { n: 1, title: "Assigned", desc: "Your brief is matched to a vetted writer within hours." },
  { n: 2, title: "Drafting", desc: "Your writer works the brief; you can message anytime." },
  { n: 3, title: "Review", desc: "You review the draft and request changes if needed." },
  { n: 4, title: "Delivered", desc: "Final files land in your dashboard, ready to use." },
];

export default function ProcessPage() {
  return (
    <MarketingLayout>
      <section className="py-12 sm:py-16">
        <div className="container-app">
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">How it works</h1>
          <p className="mt-2 max-w-xl text-ink-soft">One ribbon tracks every order, start to finish — the same four stages on your dashboard and your writer’s.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((p) => (
              <div key={p.n} className="rounded-2xl border border-line bg-white p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">{p.n}</div>
                <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-[0.9rem] text-slate">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10"><Button to="/signup">Order Now — free brief</Button></div>
        </div>
      </section>
    </MarketingLayout>
  );
}
