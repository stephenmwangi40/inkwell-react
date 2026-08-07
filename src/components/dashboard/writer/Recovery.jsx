import { Link } from "react-router-dom";
import Button from "../../ui/Button";

export default function WriterRecovery() {
  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">Account recovery</h2>
      <p className="text-sm text-slate">If you’re locked out, use the recovery form on the writer login flow.</p>
      <div className="rounded-2xl border border-line bg-white p-5 space-y-3">
        <p className="text-sm text-ink-soft">Security question is configured under <strong>Settings</strong>. You can also open the public recovery page:</p>
        <Button to="/writer-forgot-password">Open recovery page</Button>
        <p className="text-xs text-slate">Demo answer: “first pet”</p>
      </div>
    </div>
  );
}
