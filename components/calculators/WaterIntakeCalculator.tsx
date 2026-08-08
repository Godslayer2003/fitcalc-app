"use client";

import { useState } from "react";

type Unit = "kg" | "lb";

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("70");
  const [unit, setUnit] = useState<Unit>("kg");
  const [activeMinutes, setActiveMinutes] = useState("30");

  const weightNum = Math.max(0, parseFloat(weight) || 0);
  const weightKg = unit === "kg" ? weightNum : weightNum * 0.453592;
  const minutes = Math.max(0, parseFloat(activeMinutes) || 0);

  const baseMl = weightKg * 33;
  const activityMl = (minutes / 30) * 350;
  const totalMl = baseMl + activityMl;
  const totalL = totalMl / 1000;
  const totalOz = totalMl / 29.5735;
  const totalCups = totalOz / 8;

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
          <label className="mb-1 block text-sm font-medium">Body weight ({unit})</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            Active minutes per day
          </label>
          <input
            type="number"
            value={activeMinutes}
            onChange={(e) => setActiveMinutes(e.target.value)}
            className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border-2 border-accent bg-accent-soft p-5">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Liters</div>
          <div className="mt-1 text-2xl font-bold text-accent">{totalL.toFixed(1)} L</div>
        </div>
        <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Fluid ounces</div>
          <div className="mt-1 text-2xl font-bold">{Math.round(totalOz)} oz</div>
        </div>
        <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Cups</div>
          <div className="mt-1 text-2xl font-bold">{totalCups.toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
}
