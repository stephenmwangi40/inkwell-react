import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
export default function PricingPage() {
  return (
    <MarketingLayout>
      <section className="py-12 sm:py-16">
        <div className="container-app">
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl text-center">Simple per-project pricing</h1>
          <p className="mx-auto mt-2 max-w-xl text-center text-ink-soft">Priced by scope at the brief stage — no subscriptions, no surprise add-ons.</p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="font-display text-xl font-semibold">Starter</h3>
              <div className="mt-4 font-display text-3xl font-semibold">$0.09 <span className="text-base font-normal text-slate">/word</span></div>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft"><li>Up to 1,500 words</li><li>5-day turnaround</li><li>1 revision</li></ul>
              <Button to="/signup" variant="outline" className="mt-6 w-full">Start a project</Button>
            </div>
            <div className="relative rounded-2xl border-2 border-blue bg-white p-6 shadow-md">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue px-3 py-0.5 text-xs font-semibold text-white">Most popular</span>
              <h3 className="font-display text-xl font-semibold">Professional</h3>
              <div className="mt-4 font-display text-3xl font-semibold">$0.14 <span className="text-base font-normal text-slate">/word</span></div>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft"><li>Unlimited length</li><li>3-day priority</li><li>3 revisions</li><li>Dedicated writer</li></ul>
              <Button to="/signup" className="mt-6 w-full">Start a project</Button>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="font-display text-xl font-semibold">Enterprise</h3>
              <div className="mt-4 font-display text-3xl font-semibold">Custom</div>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft"><li>Writer pool</li><li>Same-day rush</li><li>Unlimited revisions</li></ul>
              <Button href="mailto:hello@inkwellandco.com" variant="outline" className="mt-6 w-full">Talk to sales</Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
