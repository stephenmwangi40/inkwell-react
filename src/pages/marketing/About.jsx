import { Link } from "react-router-dom";
import MarketingLayout from "../../components/layout/MarketingLayout";
import Button from "../../components/ui/Button";

export default function AboutPage() {
  return (
    <MarketingLayout>
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/70" aria-hidden />
        <div className="container-app relative py-14 text-center text-white sm:py-16 lg:py-20">
          <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-gold">About</p>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">Writing that ships decisions</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Inkwell & Co. matches founders and teams with vetted writers — tracked from brief to delivery.
          </p>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="container-app max-w-3xl space-y-6 text-[1.02rem] leading-relaxed text-ink-soft">
          <p>
            We built Inkwell for people who need clear, specialist writing without hiring a full-time desk.
            Every order has a shared timeline, messages, and files so status meetings stay short.
          </p>
          <p>
            Pricing is transparent at <strong className="text-ink">$0.04 per word</strong>. Client payments sit in
            escrow-style pending status until you approve the draft.
          </p>
          <p>
            This public site is a product prototype: content and dashboards run in the browser so you can explore
            the full flow before a production database is connected.
          </p>
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button to="/signup">Start a project</Button>
            <Button to="/contact" variant="outline">Contact us</Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
