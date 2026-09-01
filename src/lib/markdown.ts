import fs from "fs";
import path from "path";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Reads the report markdown file from content/report.md.
 * Returns the full raw markdown string.
 */
export function getReportContent(): string {
  const filePath = path.join(process.cwd(), "content", "report.md");
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * Slugifies a heading text into a URL-safe ID.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // keep Unicode letters/numbers
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Extracts H2 and H3 headings from markdown for Table of Contents.
 * Handles numbered headings like "2. Title" or "2.1. Title".
 */
export function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split("\n");
  const headings: Heading[] = [];
  const idCount: Record<string, number> = {};

  for (let line of lines) {
    line = line.trim();
    // Match ## or ### at start of line
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length; // 2 or 3
    const text = match[2].trim();
    let id = slugify(text);

    // Deduplicate IDs
    if (idCount[id]) {
      idCount[id]++;
      id = `${id}-${idCount[id]}`;
    } else {
      idCount[id] = 1;
    }

    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Splits the markdown into title (first line) and body (rest).
 * The first line is used as the Hero section title.
 */
export function splitTitleAndBody(markdown: string): {
  title: string;
  body: string;
} {
  const lines = markdown.split("\n");
  // Find the first non-empty line as the title
  let titleIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim()) {
      titleIndex = i;
      break;
    }
  }

  const title = lines[titleIndex].replace(/^#+\s*/, "").trim();
  const body = lines
    .slice(titleIndex + 1)
    .join("\n")
    .trim();

  return { title, body };
}
