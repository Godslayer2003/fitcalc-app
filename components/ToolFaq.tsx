import type { Tool } from "@/lib/tools";
import { siteConfig } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function ToolFaq({ tool }: { tool: Tool }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: `${tool.name} — ${siteConfig.name}`,
        applicationCategory: "HealthApplication",
        operatingSystem: "Any (runs in browser)",
        url: `${siteConfig.url}/tools/${tool.slug}`,
        description: tool.description,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: tool.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="mt-12 border-t border-black/10 pt-8 dark:border-white/10">
      <h2 className="mb-4 text-lg font-semibold">Frequently asked questions</h2>
      <div className="flex flex-col gap-4">
        {tool.faqs.map((faq, i) => (
          <Reveal key={faq.q} delay={i * 80}>
            <div className="border-l-2 border-accent/30 pl-4">
              <h3 className="text-sm font-medium">{faq.q}</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {faq.a}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
