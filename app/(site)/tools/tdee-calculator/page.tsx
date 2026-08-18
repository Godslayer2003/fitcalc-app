import type { Metadata } from "next";
import { getTool } from "@/lib/tools";
import ToolPageHeader from "@/components/ToolPageHeader";
import ToolFaq from "@/components/ToolFaq";
import ToolArticle from "@/components/ToolArticle";
import Disclaimer from "@/components/Disclaimer";
import TdeeCalculator from "@/components/calculators/TdeeCalculator";

const tool = getTool("tdee-calculator")!;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <ToolPageHeader name={tool.name} description={tool.description} category={tool.category} />
      <TdeeCalculator />
      <Disclaimer />
      <ToolArticle sections={tool.sections} />
      <ToolFaq tool={tool} />
    </div>
  );
}
