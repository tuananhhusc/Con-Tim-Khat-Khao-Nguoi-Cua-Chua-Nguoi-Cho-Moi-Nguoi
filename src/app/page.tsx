import { getReportContent, extractHeadings, splitTitleAndBody } from "@/lib/markdown";
import HeroSection from "@/components/HeroSection";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import BackToTopButton from "@/components/BackToTopButton";
import ReadingTools from "@/components/ReadingTools";
import Footer from "@/components/Footer";

export default function HomePage() {
  // Read and parse markdown at build time (Server Component) - updated
  const rawMarkdown = getReportContent();
  const { body } = splitTitleAndBody(rawMarkdown);
  const headings = extractHeadings(body);
  const wordCount = body.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 250);

  return (
    <>
      {/* Reading progress indicator */}
      <ReadingProgressBar />

      {/* Reading Tools (Theme, Font Size, Print) */}
      <ReadingTools />

      {/* Hero section */}
      <HeroSection
        title="Con tim khát khao"
        subtitle="Người của Chúa, Người cho mọi người"
        author="Nhà Ứng Sinh Dòng Tên Việt Nam"
        date="Năm Học 2026–2027"
        readingTime={readingTime}
      />

      {/* Main content area with sidebar ToC */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:flex lg:gap-12 lg:justify-center">
          {/* Table of Contents sidebar - LEFT */}
          <TableOfContents headings={headings} />

          {/* Article content — constrained width - RIGHT */}
          <div className="flex-1 min-w-0 max-w-3xl mx-auto lg:mx-0">
            <MarkdownRenderer content={body} />

            {/* Sources section divider */}
            <div className="mt-16 mb-8">
              <div className="ornamental-divider">
                <span className="text-burgundy/40 dark:text-gold/30 text-sm font-[family-name:var(--font-heading)]">
                  ✝
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to top */}
      <BackToTopButton />
    </>
  );
}
