import type { Metadata } from "next";
import { getTool } from "@/lib/tools";
import ToolPageHeader from "@/components/ToolPageHeader";
import ToolFaq from "@/components/ToolFaq";
import ToolArticle from "@/components/ToolArticle";
import AffiliateCallout from "@/components/AffiliateCallout";
import Disclaimer from "@/components/Disclaimer";
import MacroCalculator from "@/components/calculators/MacroCalculator";

const tool = getTool("macro-calculator")!;

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <ToolPageHeader name={tool.name} description={tool.description} category={tool.category} />
      <MacroCalculator />
      <Disclaimer />
      <AffiliateCallout
        heading="Tracking macros day to day?"
        body="A food scale and a tracking app make hitting these numbers far easier than eyeballing portions — worth it if you're serious about the targets above."
        ctaLabel="See recommended gear"
        href="#"
      />
      <ToolArticle sections={tool.sections} />
      <ToolFaq tool={tool} />
    </div>
  );
}
