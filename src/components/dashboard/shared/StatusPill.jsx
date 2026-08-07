import { STATUS_LABELS, STATUS_COLORS } from "../../../lib/db";
export default function StatusPill({ status }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[status] || "bg-slate-tint text-slate"}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}
