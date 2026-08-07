import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";
export default function WritersPage() {
  return (
    <MarketingLayout>
      <section className="py-12 sm:py-16">
        <div className="container-app">
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Our writers</h1>
          <p className="mt-2 max-w-xl text-ink-soft">Writers apply, get vetted by craft, and run their own schedule from a dedicated dashboard.</p>
          <p className="mt-6 text-slate">Full writer profiles are featured on the home page. <Button to="/" variant="outline" className="ml-2">View on home</Button></p>
        </div>
      </section>
    </MarketingLayout>
  );
}
