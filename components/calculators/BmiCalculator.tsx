"use client";

import { useState } from "react";

type Units = "metric" | "imperial";

function bmiCategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500" };
  if (bmi < 25) return { label: "Normal weight", color: "text-green-600" };
  if (bmi < 30) return { label: "Overweight", color: "text-yellow-600" };
  return { label: "Obese", color: "text-red-500" };
}

export default function BmiCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [heightCm, setHeightCm] = useState("175");
  const [weightKg, setWeightKg] = useState("70");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");
  const [weightLb, setWeightLb] = useState("154");

  let heightM: number;
  let weightForCalc: number;

  if (units === "metric") {
    heightM = (parseFloat(heightCm) || 0) / 100;
    weightForCalc = parseFloat(weightKg) || 0;
  } else {
    const totalIn = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
    heightM = totalIn * 0.0254;
    weightForCalc = (parseFloat(weightLb) || 0) * 0.453592;
  }

  const bmi = heightM > 0 ? weightForCalc / (heightM * heightM) : 0;
  const category = bmi > 0 ? bmiCategory(bmi) : null;

  return (
    <div>
      <div className="mb-5 flex gap-2">
        <button
          onClick={() => setUnits("metric")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            units === "metric"
              ? "bg-accent text-white"
              : "border border-black/15 hover:border-accent hover:text-accent dark:border-white/15"
          }`}
        >
          Metric
        </button>
        <button
          onClick={() => setUnits("imperial")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            units === "imperial"
              ? "bg-accent text-white"
              : "border border-black/15 hover:border-accent hover:text-accent dark:border-white/15"
          }`}
        >
          Imperial
        </button>
      </div>

      {units === "metric" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Height (cm)</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Weight (kg)</label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Height (ft)</label>
            <input
              type="number"
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Height (in)</label>
            <input
              type="number"
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Weight (lb)</label>
            <input
              type="number"
              value={weightLb}
              onChange={(e) => setWeightLb(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
            />
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-accent/20 bg-accent-soft p-5">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">Your BMI</div>
        <div className="mt-1 text-3xl font-bold text-accent">{bmi > 0 ? bmi.toFixed(1) : "—"}</div>
        {category && (
          <div className={`mt-1 text-sm font-medium ${category.color}`}>
            {category.label}
          </div>
        )}
      </div>
    </div>
  );
}
