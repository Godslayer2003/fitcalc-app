"use client";

import { useState } from "react";

type Sex = "male" | "female";
type Units = "in" | "cm";

function toInches(value: number, units: Units): number {
  return units === "cm" ? value / 2.54 : value;
}

export default function BodyFatCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [units, setUnits] = useState<Units>("in");
  const [height, setHeight] = useState("70");
  const [neck, setNeck] = useState("15");
  const [waist, setWaist] = useState("34");
  const [hip, setHip] = useState("40");

  const heightIn = toInches(parseFloat(height) || 0, units);
  const neckIn = toInches(parseFloat(neck) || 0, units);
  const waistIn = toInches(parseFloat(waist) || 0, units);
  const hipIn = toInches(parseFloat(hip) || 0, units);

  let bodyFat = 0;
  let valid = false;

  if (sex === "male") {
    const diff = waistIn - neckIn;
    if (diff > 0 && heightIn > 0) {
      bodyFat =
        495 /
          (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(heightIn)) -
        450;
      valid = true;
    }
  } else {
    const sum = waistIn + hipIn - neckIn;
    if (sum > 0 && heightIn > 0) {
      bodyFat =
        495 /
          (1.29579 - 0.35004 * Math.log10(sum) + 0.221 * Math.log10(heightIn)) -
        450;
      valid = true;
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setSex("male")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              sex === "male"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                : "border border-black/15 hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.05]"
            }`}
          >
            Male
          </button>
          <button
            onClick={() => setSex("female")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              sex === "female"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                : "border border-black/15 hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.05]"
            }`}
          >
            Female
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setUnits("in")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              units === "in"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                : "border border-black/15 hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.05]"
            }`}
          >
            Inches
          </button>
          <button
            onClick={() => setUnits("cm")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              units === "cm"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                : "border border-black/15 hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.05]"
            }`}
          >
            cm
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Height ({units})</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Neck ({units})</label>
          <input
            type="number"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Waist ({units})</label>
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
          />
        </div>
        {sex === "female" && (
          <div>
            <label className="mb-1 block text-sm font-medium">Hip ({units})</label>
            <input
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
            />
          </div>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-black/10 p-5 dark:border-white/10">
        <div className="text-xs text-zinc-500">Estimated body fat</div>
        <div className="mt-1 text-3xl font-bold">
          {valid ? `${bodyFat.toFixed(1)}%` : "—"}
        </div>
        {!valid && (
          <p className="mt-1 text-sm text-red-500">
            Waist measurement must be greater than neck measurement.
          </p>
        )}
      </div>
    </div>
  );
}
