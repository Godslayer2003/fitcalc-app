import type { Metadata } from "next";
import { getTool } from "@/lib/tools";
import BmiCalculator from "@/components/calculators/BmiCalculator";

const tool = getTool("bmi-calculator")!;

export const metadata: Metadata = {
  title: `${tool.name} (Embed)`,
  description: tool.description,
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <div className="px-4 py-5">
      <h1 className="mb-4 text-lg font-semibold">{tool.name}</h1>
      <BmiCalculator />
    </div>
  );
}
