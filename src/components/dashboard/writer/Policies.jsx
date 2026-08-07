export default function WriterPolicies() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Policies</h2>
      <div className="space-y-4 rounded-2xl border border-line bg-white p-5 text-sm leading-relaxed text-ink-soft">
        <section>
          <h3 className="font-semibold text-ink">Writer code of conduct</h3>
          <p className="mt-2">Deliver on agreed deadlines, communicate status changes, and never share client materials outside the order.</p>
        </section>
        <section>
          <h3 className="font-semibold text-ink">Escrow & payments</h3>
          <p className="mt-2">Client payments are held until draft approval. Pricing is <strong>$0.04 per word</strong>. Pending amounts appear under Earnings.</p>
        </section>
        <section>
          <h3 className="font-semibold text-ink">Revisions</h3>
          <p className="mt-2">Respond to revision requests within 48 hours unless otherwise agreed on the order.</p>
        </section>
        <section>
          <h3 className="font-semibold text-ink">Privacy</h3>
          <p className="mt-2">Client briefs and files are confidential. Full legal text will be published on the public Privacy and Terms pages.</p>
        </section>
      </div>
    </div>
  );
}
