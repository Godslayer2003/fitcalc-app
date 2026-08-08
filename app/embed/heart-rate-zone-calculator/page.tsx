import type { Metadata } from "next";
import { getTool } from "@/lib/tools";
import HeartRateZoneCalculator from "@/components/calculators/HeartRateZoneCalculator";

const tool = getTool("heart-rate-zone-calculator")!;

export const metadata: Metadata = {
  title: `${tool.name} (Embed)`,
  description: tool.description,
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <div className="px-4 py-5">
      <h1 className="mb-4 text-lg font-semibold">{tool.name}</h1>
      <HeartRateZoneCalculator />
    </div>
  );
}
