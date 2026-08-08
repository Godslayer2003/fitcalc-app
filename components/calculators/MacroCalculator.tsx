"use client";

import { useState } from "react";

export default function MacroCalculator() {
  const [calories, setCalories] = useState("2200");
  const [proteinPct, setProteinPct] = useState(30);
  const [fatPct, setFatPct] = useState(30);

  const cal = Math.max(0, parseFloat(calories) || 0);
  const carbPct = Math.max(0, 100 - proteinPct - fatPct);

  const proteinG = (cal * (proteinPct / 100)) / 4;
  const carbG = (cal * (carbPct / 100)) / 4;
  const fatG = (cal * (fatPct / 100)) / 9;

  const over100 = proteinPct + fatPct > 100;

  return (
    <div>
      <div>
        <label className="mb-1 block text-sm font-medium">Daily calorie target</label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
        />
        <p className="mt-1 text-xs text-zinc-500">
          Not sure? Use the TDEE calculator first.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Protein: {proteinPct}%
          </label>
          <input
            type="range"
            min={10}
            max={60}
            value={proteinPct}
            onChange={(e) => setProteinPct(parseInt(e.target.value, 10))}
            className="w-full"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Fat: {fatPct}%</label>
          <input
            type="range"
            min={10}
            max={60}
            value={fatPct}
            onChange={(e) => setFatPct(parseInt(e.target.value, 10))}
            className="w-full"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            Carbs: {carbPct}% (remainder)
          </label>
        </div>
      </div>

      {over100 && (
        <p className="mt-3 text-sm text-red-500">
          Protein + fat can&apos;t exceed 100% — lower one of the sliders.
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-accent/20 bg-accent-soft p-4">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Protein</div>
          <div className="mt-1 text-xl font-bold text-accent">{Math.round(proteinG)}g</div>
        </div>
        <div className="rounded-xl border border-accent/20 bg-accent-soft p-4">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Carbs</div>
          <div className="mt-1 text-xl font-bold text-accent">{Math.round(carbG)}g</div>
        </div>
        <div className="rounded-xl border border-accent/20 bg-accent-soft p-4">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Fat</div>
          <div className="mt-1 text-xl font-bold text-accent">{Math.round(fatG)}g</div>
        </div>
      </div>
    </div>
  );
}
