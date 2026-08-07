import MarketingLayout from "../../components/layout/MarketingLayout";

export default function Privacy() {
  return (
    <MarketingLayout>
      <section className="py-12 sm:py-16">
        <div className="container-app max-w-3xl">
          <h1 className="font-display text-3xl font-semibold text-ink">Privacy Policy</h1>
          <p className="mt-2 text-sm text-slate">Last updated: August 2026 · Prototype summary</p>
          <div className="mt-8 space-y-6 text-[1.02rem] leading-relaxed text-ink-soft">
            <section>
              <h2 className="font-semibold text-ink">What we collect</h2>
              <p className="mt-2">Account details (name, email), order briefs, messages, uploaded files, and payment method metadata shown in the dashboard. This prototype stores demo data in your browser only.</p>
            </section>
            <section>
              <h2 className="font-semibold text-ink">How we use it</h2>
              <p className="mt-2">To run your orders, match writers, communicate status, and improve the product. We do not sell personal data.</p>
            </section>
            <section>
              <h2 className="font-semibold text-ink">Payments</h2>
              <p className="mt-2">Card details in this demo are not sent to a real processor. Production will use a PCI-compliant provider; full card numbers are never stored on our servers.</p>
            </section>
            <section>
              <h2 className="font-semibold text-ink">Your choices</h2>
              <p className="mt-2">You may update profile data in the dashboard or request account deletion by contacting hello@inkwellandco.com. Full legal policy will replace this summary before public launch.</p>
            </section>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
