"use client";

import { useState } from "react";

const ZONES = [
  { name: "Zone 1 — Very light", low: 50, high: 60 },
  { name: "Zone 2 — Light (fat burn)", low: 60, high: 70 },
  { name: "Zone 3 — Moderate (aerobic)", low: 70, high: 80 },
  { name: "Zone 4 — Hard (anaerobic)", low: 80, high: 90 },
  { name: "Zone 5 — Maximum", low: 90, high: 100 },
];

export default function HeartRateZoneCalculator() {
  const [age, setAge] = useState("30");
  const [restingHr, setRestingHr] = useState("65");

  const ageNum = Math.max(0, parseFloat(age) || 0);
  const resting = Math.max(0, parseFloat(restingHr) || 0);
  const maxHr = 220 - ageNum;
  const reserve = maxHr - resting;

  function targetAt(pct: number): number {
    return reserve * (pct / 100) + resting;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <label className="mb-1 block text-sm font-medium">Resting heart rate (bpm)</label>
          <input
            type="number"
            value={restingHr}
            onChange={(e) => setRestingHr(e.target.value)}
            className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-zinc-500">
        Estimated max heart rate: {maxHr.toFixed(0)} bpm (220 − age)
      </p>

      <div className="mt-6 flex flex-col gap-2">
        {ZONES.map((zone) => (
          <div
            key={zone.name}
            className="flex items-center justify-between rounded-lg border border-black/10 px-4 py-2.5 text-sm dark:border-white/10"
          >
            <span className="font-medium">{zone.name}</span>
            <span className="font-mono text-zinc-600 dark:text-zinc-300">
              {targetAt(zone.low).toFixed(0)}–{targetAt(zone.high).toFixed(0)} bpm
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
