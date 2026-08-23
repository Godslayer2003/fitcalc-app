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
