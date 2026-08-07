import MarketingLayout from "../../components/layout/MarketingLayout";

export default function Terms() {
  return (
    <MarketingLayout>
      <section className="py-12 sm:py-16">
        <div className="container-app max-w-3xl">
          <h1 className="font-display text-3xl font-semibold text-ink">Terms of Service</h1>
          <p className="mt-2 text-sm text-slate">Last updated: August 2026 · Prototype summary</p>
          <div className="mt-8 space-y-6 text-[1.02rem] leading-relaxed text-ink-soft">
            <section>
              <h2 className="font-semibold text-ink">Service</h2>
              <p className="mt-2">Inkwell & Co. provides writing and related services ordered through the platform. Orders are priced at $0.04 per word unless otherwise agreed in writing.</p>
            </section>
            <section>
              <h2 className="font-semibold text-ink">Client responsibilities</h2>
              <p className="mt-2">Provide accurate briefs, respond to review requests in a reasonable time, and use delivered work lawfully. You retain ownership of final deliverables upon full payment and approval.</p>
            </section>
            <section>
              <h2 className="font-semibold text-ink">Revisions</h2>
              <p className="mt-2">Reasonable revisions within the original scope are included. Major scope changes may require a new order or price adjustment.</p>
            </section>
            <section>
              <h2 className="font-semibold text-ink">Payments & escrow</h2>
              <p className="mt-2">Funds may be held pending approval of the draft. Cancelled orders before substantial work may be refunded subject to fair-use review.</p>
            </section>
            <section>
              <h2 className="font-semibold text-ink">Prototype notice</h2>
              <p className="mt-2">This build is a front-end prototype. No real legal agreement is formed until production terms are published and accepted at signup.</p>
            </section>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
