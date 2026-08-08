"use client";

import { useState } from "react";

const COMMON_DISTANCES_KM: { label: string; km: number }[] = [
  { label: "5K", km: 5 },
  { label: "10K", km: 10 },
  { label: "Half marathon", km: 21.0975 },
  { label: "Marathon", km: 42.195 },
];

function parseTimeToSeconds(h: string, m: string, s: string): number {
  return (parseFloat(h) || 0) * 3600 + (parseFloat(m) || 0) * 60 + (parseFloat(s) || 0);
}

function formatDuration(totalSeconds: number): string {
  if (!isFinite(totalSeconds) || totalSeconds <= 0) return "—";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.round(totalSeconds % 60);
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}

export default function RunningPaceCalculator() {
  const [distanceKm, setDistanceKm] = useState("5");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("25");
  const [seconds, setSeconds] = useState("0");

  const [targetKm, setTargetKm] = useState("10");

  const dist = Math.max(0, parseFloat(distanceKm) || 0);
  const totalSeconds = parseTimeToSeconds(hours, minutes, seconds);

  const paceSecPerKm = dist > 0 ? totalSeconds / dist : 0;
  const paceSecPerMile = paceSecPerKm * 1.60934;

  const target = Math.max(0, parseFloat(targetKm) || 0);
  const predictedSeconds =
    dist > 0 && totalSeconds > 0 && target > 0
      ? totalSeconds * Math.pow(target / dist, 1.06)
      : 0;

  return (
    <div>
      <div>
        <h3 className="mb-3 text-sm font-semibold">Calculate your pace</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Distance (km)</label>
            <input
              type="number"
              value={distanceKm}
              onChange={(e) => setDistanceKm(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Time (h : m : s)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
              />
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
              />
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-black/10 p-4 dark:border-white/10">
            <div className="text-xs text-zinc-500">Pace per km</div>
            <div className="mt-1 text-xl font-bold">{formatDuration(paceSecPerKm)} /km</div>
          </div>
          <div className="rounded-xl border border-black/10 p-4 dark:border-white/10">
            <div className="text-xs text-zinc-500">Pace per mile</div>
            <div className="mt-1 text-xl font-bold">{formatDuration(paceSecPerMile)} /mi</div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="mb-3 text-sm font-semibold">Predict a race time</h3>
        <p className="mb-3 text-xs text-zinc-500">
          Uses the distance and time above as your reference performance.
        </p>
        <label className="mb-1 block text-sm font-medium">Target distance (km)</label>
        <div className="flex flex-wrap gap-2">
          <input
            type="number"
            value={targetKm}
            onChange={(e) => setTargetKm(e.target.value)}
            className="w-32 rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/15"
          />
          {COMMON_DISTANCES_KM.map((d) => (
            <button
              key={d.label}
              onClick={() => setTargetKm(String(d.km))}
              className="rounded-full border border-black/15 px-3 py-1.5 text-xs font-semibold hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.05]"
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-xl border-2 border-zinc-900 p-5 dark:border-white">
          <div className="text-xs text-zinc-500">Predicted time</div>
          <div className="mt-1 text-2xl font-bold">{formatDuration(predictedSeconds)}</div>
        </div>
      </div>
    </div>
  );
}
