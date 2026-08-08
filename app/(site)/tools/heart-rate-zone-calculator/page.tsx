import type { Metadata } from "next";
import { getTool } from "@/lib/tools";
import ToolPageHeader from "@/components/ToolPageHeader";
import AdSlot from "@/components/AdSlot";
import ToolFaq from "@/components/ToolFaq";
import Disclaimer from "@/components/Disclaimer";
import HeartRateZoneCalculator from "@/components/calculators/HeartRateZoneCalculator";

const tool = getTool("heart-rate-zone-calculator")!;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <ToolPageHeader name={tool.name} description={tool.description} />
      <HeartRateZoneCalculator />
      <Disclaimer />
      <div className="mt-10">
        <AdSlot />
      </div>
      <ToolFaq tool={tool} />
    </div>
  );
}
