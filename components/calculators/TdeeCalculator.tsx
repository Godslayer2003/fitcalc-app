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
          {ACTIVITY_LEVELS.map((level) => (
            <label
              key={level.label}
              className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-2.5 text-sm ${
                activity === level.value
                  ? "border-zinc-900 dark:border-white"
                  : "border-black/10 dark:border-white/10"
              }`}
            >
              <span>
                <span className="font-medium">{level.label}</span>{" "}
                <span className="text-zinc-500">— {level.hint}</span>
              </span>
              <input
                type="radio"
                name="activity"
                checked={activity === level.value}
                onChange={() => setActivity(level.value)}
                className="ml-3"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Base metabolic rate (BMR)</div>
          <div className="mt-1 text-2xl font-bold">{Math.round(bmr).toLocaleString()} kcal</div>
        </div>
        <div className="rounded-xl border-2 border-accent bg-accent-soft p-5">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Daily calories (TDEE)</div>
          <div className="mt-1 text-2xl font-bold text-accent">{Math.round(tdee).toLocaleString()} kcal</div>
        </div>
      </div>
    </div>
  );
}
