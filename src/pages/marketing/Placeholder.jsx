import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
export default function Placeholder({ title, subtitle }) {
  return (
    <MarketingLayout>
      <div className="container-app py-16 sm:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
          <p className="mt-4 text-ink-soft">{subtitle || "This page is reserved and will be updated with full content soon."}</p>
          <p className="mt-2 text-sm text-slate">Content coming soon — please check back later.</p>
          <Button to="/" className="mt-8">Back to home</Button>
        </div>
      </div>
    </MarketingLayout>
  );
}
