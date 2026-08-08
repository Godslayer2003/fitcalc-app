"use client";

import { useState } from "react";

type Unit = "kg" | "lb";

const PERCENTAGES = [50, 60, 70, 75, 80, 85, 90, 95, 100];

export default function OneRepMaxCalculator() {
  const [weight, setWeight] = useState("100");
  const [reps, setReps] = useState("5");
  const [unit, setUnit] = useState<Unit>("kg");

  const w = Math.max(0, parseFloat(weight) || 0);
  const r = Math.max(1, parseFloat(reps) || 1);

  const oneRepMax = r === 1 ? w : w * (1 + r / 30);

  return (
    <div>
      <div className="mb-5 flex gap-2">
        <button
          onClick={() => setUnit("kg")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            unit === "kg"
              ? "bg-accent text-white"
              : "border border-black/15 hover:border-accent hover:text-accent dark:border-white/15"
          }`}
        >
          kg
        </button>
        <button
          onClick={() => setUnit("lb")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            unit === "lb"
              ? "bg-accent text-white"
              : "border border-black/15 hover:border-accent hover:text-accent dark:border-white/15"
          }`}
        >
          lb
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Weight lifted ({unit})</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Reps completed</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border-2 border-accent bg-accent-soft p-6">
        <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Estimated one-rep max
        </div>
        <div className="mt-1 text-6xl font-bold tracking-tight text-accent">
          {oneRepMax.toFixed(1)}
          <span className="ml-1 text-2xl font-medium text-accent/60">{unit}</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-2 text-sm font-medium">Training percentages</h3>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {PERCENTAGES.map((pct) => (
            <div
              key={pct}
              className="rounded-lg border border-black/10 p-2 text-center dark:border-white/10"
            >
              <div className="text-xs text-zinc-500 dark:text-zinc-400">{pct}%</div>
              <div className="text-sm font-semibold">
                {((oneRepMax * pct) / 100).toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
