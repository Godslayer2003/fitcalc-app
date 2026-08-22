export interface ProgressEntry {
  date: string; // YYYY-MM-DD
  value: number;
}

export type ProgressMetric = "bmi" | "bodyFat";

export const PROGRESS_METRICS: Record<ProgressMetric, { label: string; unit: string }> = {
  bmi: { label: "BMI", unit: "" },
  bodyFat: { label: "Body Fat", unit: "%" },
};

export type ProgressLog = Record<ProgressMetric, ProgressEntry[]>;

const MAX_ENTRIES_PER_METRIC = 60;
const EMPTY_LOG: ProgressLog = { bmi: [], bodyFat: [] };

export function getProgressLog(raw: unknown): ProgressLog {
  const parsed = (raw as Partial<ProgressLog>) ?? {};
  return {
    bmi: parsed.bmi ?? [],
    bodyFat: parsed.bodyFat ?? [],
  };
}

export function appendProgressEntry(
  existing: ProgressLog,
  metric: ProgressMetric,
  value: number,
): ProgressLog {
  const today = new Date().toISOString().slice(0, 10);
  const withoutToday = existing[metric].filter((e) => e.date !== today);
  const entries = [...withoutToday, { date: today, value }].slice(-MAX_ENTRIES_PER_METRIC);
  return { ...existing, [metric]: entries };
}

export { EMPTY_LOG };
