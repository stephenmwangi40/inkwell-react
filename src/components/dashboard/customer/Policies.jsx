import { Link } from "react-router-dom";
export default function CustomerPolicies() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Policies</h2>
      <div className="space-y-4 rounded-2xl border border-line bg-white p-5 text-sm leading-relaxed text-ink-soft">
        <section>
          <h3 className="font-semibold text-ink">Pricing</h3>
          <p className="mt-2">All projects are priced at <strong>$0.04 per word</strong>. Estimates update live when you set word count or pages (~250 words/page).</p>
        </section>
        <section>
          <h3 className="font-semibold text-ink">Secure payments</h3>
          <p className="mt-2">Card and crypto payments are held in escrow and only released to the writer after you approve the final draft.</p>
        </section>
        <section>
          <h3 className="font-semibold text-ink">Revisions</h3>
          <p className="mt-2">Request revisions from any order in review or delivered. Notes stay linked to that order thread.</p>
        </section>
        <section>
          <h3 className="font-semibold text-ink">Legal</h3>
          <p className="mt-2">
            <Link to="/privacy" className="text-blue hover:underline">Privacy Policy</Link>
            {" · "}
            <Link to="/terms" className="text-blue hover:underline">Terms of Service</Link>
            {" — full documents to be updated on those pages."}
          </p>
        </section>
      </div>
    </div>
  );
}
