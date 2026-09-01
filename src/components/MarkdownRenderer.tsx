import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import CopyAnchor from "./CopyAnchor";

interface MarkdownRendererProps {
  content: string;
}

/**
 * Slugify helper — must match the one in lib/markdown.ts for ToC anchors to work.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}


// Track heading IDs for deduplication within a render
const headingIdCount: Record<string, number> = {};

function getHeadingId(text: string): string {
  // Extract text content from children
  let id = slugify(text);
  if (headingIdCount[id]) {
    headingIdCount[id]++;
    id = `${id}-${headingIdCount[id]}`;
  } else {
    headingIdCount[id] = 1;
  }
  return id;
}

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children)) {
    const props = children.props as Record<string, unknown>;
    if (props && "children" in props) {
      return extractText(props.children as React.ReactNode);
    }
  }
  return "";
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Reset heading counter on each render
  // eslint-disable-next-line react-hooks/immutability
  Object.keys(headingIdCount).forEach((key) => delete headingIdCount[key]);

  return (
    <article className="prose prose-lg max-w-none">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // H2 with anchor ID
          h2: ({ children, ...props }) => {
            const text = extractText(children);
            const id = getHeadingId(text);
            return (
              <h2 id={id} className="group relative" {...props}>
                {children}
                <CopyAnchor id={id} />
              </h2>
            );
          },

          // H3 with anchor ID
          h3: ({ children, ...props }) => {
            const text = extractText(children);
            const id = getHeadingId(text);
            return (
              <h3 id={id} className="group relative" {...props}>
                {children}
                <CopyAnchor id={id} />
              </h3>
            );
          },

          // Blockquote — solemn Bible/Saint quote styling
          blockquote: ({ children, ...props }) => (
            <blockquote {...props}>{children}</blockquote>
          ),

          // Table — academic bordered style
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-8 rounded-lg border border-burgundy/15 dark:border-gold/30 shadow-xs">
              <table {...props}>{children}</table>
            </div>
          ),

          // Links — open external in new tab or render academic citation badge
          a: ({ href, children, ...props }) => {
            if (href?.startsWith("#ref-")) {
              return (
                <sup className="inline-block mx-0.5 -top-1.5 align-baseline">
                  <a
                    href={href}
                    title={`Xem tài liệu trích dẫn`}
                    className="inline-flex items-center justify-center min-w-[1.25rem] h-[1.15rem] px-1 text-[11px] font-bold font-sans rounded-full bg-burgundy/10 text-burgundy border border-burgundy/25 hover:bg-burgundy hover:text-white dark:bg-gold/15 dark:text-gold dark:border-gold/35 dark:hover:bg-gold dark:hover:text-dark-slate transition-all duration-150 no-underline cursor-pointer shadow-2xs active:scale-90"
                    {...props}
                  >
                    {children}
                  </a>
                </sup>
              );
            }

            const isExternal =
              href?.startsWith("http") || href?.startsWith("//");
            return (
              <a
                href={href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                {...props}
              >
                {children}
              </a>
            );
          },

          // Horizontal rule — ornamental
          hr: (props) => <hr {...props} />,

          // Strong — slightly colored
          strong: ({ children, ...props }) => (
            <strong {...props}>{children}</strong>
          ),
        }}
      >
        {content}
      </Markdown>
    </article>
  );
}

