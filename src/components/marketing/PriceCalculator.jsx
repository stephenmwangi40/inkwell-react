import { useState } from "react";
import { Link } from "react-router-dom";
import { WORD_RATE, WORDS_PER_PAGE, priceFromWords } from "../../lib/db";

export default function PriceCalculator() {
  const [words, setWords] = useState(1000);
  const price = priceFromWords(words);
  const pages = Math.max(1, Math.round(words / WORDS_PER_PAGE));

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
      <h3 className="font-display text-lg font-semibold text-ink">Estimate your project</h3>
      <p className="mt-1 text-sm text-slate">${WORD_RATE.toFixed(2)} per word · ~{WORDS_PER_PAGE} words per page</p>
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-ink">Word count</label>
        <input
          type="number"
          min={50}
          step={50}
          value={words}
          onChange={(e) => setWords(Math.max(0, Number(e.target.value) || 0))}
          className="w-full rounded-[10px] border border-line px-3.5 py-2.5 outline-none focus:border-blue"
        />
        <input
          type="range"
          min={100}
          max={10000}
          step={50}
          value={Math.min(10000, Math.max(100, words))}
          onChange={(e) => setWords(Number(e.target.value))}
          className="mt-3 w-full accent-[var(--color-blue)]"
        />
      </div>
      <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-4">
        <div>
          <div className="text-xs text-slate">Estimated total</div>
          <div className="font-display text-2xl font-semibold text-ink">${price.toFixed(2)}</div>
          <div className="text-xs text-slate">≈ {pages} page{pages === 1 ? "" : "s"}</div>
        </div>
        <Link
          to="/signup"
          className="rounded-[10px] bg-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-dark"
        >
          Start project
        </Link>
      </div>
    </div>
  );
}
