import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/lib/tools";
import { siteConfig } from "@/lib/site";
import EmbedSnippet from "./EmbedSnippet";

export const metadata: Metadata = {
  title: "Embed a calculator on your site",
  description: `Health & fitness calculator widgets from ${siteConfig.name}, embeddable on any website.`,
};

export default function EmbedPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link href="/" className="text-sm font-semibold hover:opacity-70">
        ← {siteConfig.name}
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
        Embed a calculator on your site
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-500 dark:text-zinc-400">
        Every calculator on {siteConfig.name} is available as an
        embed — just copy the snippet below into your page. Each
        widget includes a small &quot;Powered by {siteConfig.name}&quot;
        credit link.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        {tools.map((tool) => (
          <div
            key={tool.slug}
            className="rounded-xl border border-black/10 p-5 dark:border-white/10"
          >
            <h2 className="text-base font-semibold">{tool.name}</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {tool.description}
            </p>
            <div className="mt-3">
              <EmbedSnippet
                code={`<iframe src="${siteConfig.url}/embed/${tool.slug}" width="100%" height="600" style="border:1px solid #e5e5e5;border-radius:12px;" loading="lazy"></iframe>`}
              />
            </div>
            <Link
              href={`/embed/${tool.slug}`}
              target="_blank"
              className="mt-3 inline-block text-xs font-semibold underline"
            >
              Preview widget →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
