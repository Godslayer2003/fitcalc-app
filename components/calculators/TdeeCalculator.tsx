"use client";

import { useState } from "react";

type Sex = "male" | "female";

const ACTIVITY_LEVELS: { label: string; value: number; hint: string }[] = [
  { label: "Sedentary", value: 1.2, hint: "little or no exercise" },
  { label: "Light", value: 1.375, hint: "exercise 1-3 days/week" },
  { label: "Moderate", value: 1.55, hint: "exercise 3-5 days/week" },
  { label: "Active", value: 1.725, hint: "exercise 6-7 days/week" },
  { label: "Very active", value: 1.9, hint: "hard exercise + physical job" },
];

export default function TdeeCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("30");
  const [heightCm, setHeightCm] = useState("178");
  const [weightKg, setWeightKg] = useState("75");
  const [activity, setActivity] = useState(1.55);

  const ageNum = parseFloat(age) || 0;
  const heightNum = parseFloat(heightCm) || 0;
  const weightNum = parseFloat(weightKg) || 0;

  const bmr =
    sex === "male"
      ? 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
      : 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;

  const tdee = bmr * activity;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Sex</label>
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value as Sex)}
            className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
          />
        </div>
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

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium">Activity level</label>
        <div className="flex flex-col gap-2">
          {ACTIVITY_LEVELS.map((level) => {
            const selected = activity === level.value;
            return (
              <label
                key={level.label}
                className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors ${
                  selected
                    ? "border-accent bg-accent-soft"
                    : "border-black/10 hover:border-black/20 dark:border-white/10 dark:hover:border-white/20"
                }`}
              >
                <span>
                  <span className={`font-semibold ${selected ? "text-accent" : ""}`}>{level.label}</span>{" "}
                  <span className="text-zinc-500 dark:text-zinc-400">— {level.hint}</span>
                </span>
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    selected ? "border-accent" : "border-black/20 dark:border-white/20"
                  }`}
                >
                  {selected && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
                </span>
                <input
                  type="radio"
                  name="activity"
                  checked={selected}
                  onChange={() => setActivity(level.value)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Base metabolic rate
          </div>
          <div className="mt-1 text-4xl font-bold tracking-tight">
            {Math.round(bmr).toLocaleString()}
            <span className="ml-1 text-lg font-medium text-zinc-400">kcal</span>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-accent bg-accent-soft p-6">
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Daily calories (TDEE)
          </div>
          <div className="mt-1 text-4xl font-bold tracking-tight text-accent">
            {Math.round(tdee).toLocaleString()}
            <span className="ml-1 text-lg font-medium text-accent/60">kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
