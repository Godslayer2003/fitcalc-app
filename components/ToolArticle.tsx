import Link from "next/link";
import type { ContentSection } from "@/lib/tools";

const LINK_PATTERN = /\[([^\]]+)\]\((\/[^)]+)\)/g;

function renderWithLinks(text: string) {
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <Link key={key++} href={match[2]} className="text-accent underline underline-offset-2">
        {match[1]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

export default function ToolArticle({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="mt-12 border-t border-black/10 pt-8 dark:border-white/10">
      <div className="flex flex-col gap-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold">{section.heading}</h2>
            <div className="mt-3 flex flex-col gap-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {section.body.map((paragraph, i) => (
                <p key={i}>{renderWithLinks(paragraph)}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
