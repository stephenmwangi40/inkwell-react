import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";

export default function NotFoundPage() {
  return (
    <MarketingLayout>
      <section className="py-20 sm:py-28">
        <div className="container-app max-w-lg text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue">404</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Page not found</h1>
          <p className="mt-3 text-ink-soft">That link may be outdated, or the page moved.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/">Go home</Button>
            <Button to="/samples" variant="outline">Browse samples</Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
