import { Scale, Apple, Dumbbell, HeartPulse, type LucideIcon } from "lucide-react";
import type { Tool } from "./tools";

export const categoryIcons: Record<Tool["category"], LucideIcon> = {
  "Body Composition": Scale,
  Nutrition: Apple,
  Training: Dumbbell,
  Wellness: HeartPulse,
};

export const categoryStyles: Record<
  Tool["category"],
  { text: string; iconBg: string; ring: string }
> = {
  "Body Composition": {
    text: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-500",
    ring: "hover:border-blue-500/40 dark:hover:border-blue-500/40",
  },
  Nutrition: {
    text: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-500",
    ring: "hover:border-orange-500/40 dark:hover:border-orange-500/40",
  },
  Training: {
    text: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-500",
    ring: "hover:border-violet-500/40 dark:hover:border-violet-500/40",
  },
  Wellness: {
    text: "text-teal-600 dark:text-teal-400",
    iconBg: "bg-teal-500",
    ring: "hover:border-teal-500/40 dark:hover:border-teal-500/40",
  },
};
