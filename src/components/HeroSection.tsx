import IHSSymbol from "./IHSSymbol";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  readingTime?: number;
}

export default function HeroSection({
  title,
  subtitle,
  author = "Nhà Ứng Sinh Dòng Tên Việt Nam",
  date = "Năm Học 2026–2027",
  readingTime,
}: HeroSectionProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-parchment via-parchment to-transparent dark:from-dark-slate dark:via-dark-slate dark:to-transparent pt-16 pb-12 md:pt-24 md:pb-16 border-b border-burgundy/15 dark:border-gold/15">
      {/* IHS watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <IHSSymbol className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] text-burgundy/[0.05] dark:text-gold/[0.06]" />
      </div>

      {/* Top gold rule */}
      <div className="w-24 h-[2px] mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-8" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Small cross ornament */}
        <div className="text-burgundy dark:text-gold text-2xl mb-4 font-serif">
          ✝
        </div>

        {/* Title */}
        <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-burgundy dark:text-gold leading-tight tracking-tight mb-5">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-charcoal dark:text-[#E2D9CC] italic mb-6 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Author & Date */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-charcoal-light dark:text-[#D1C7B7] font-[family-name:var(--font-sans)] font-medium">
          {author && (
            <span className="flex items-center gap-1.5 bg-burgundy/5 dark:bg-white/5 px-3 py-1 rounded-full border border-burgundy/15 dark:border-gold/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-burgundy dark:text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {author}
            </span>
          )}
          {date && (
            <span className="flex items-center gap-1.5 bg-burgundy/5 dark:bg-white/5 px-3 py-1 rounded-full border border-burgundy/15 dark:border-gold/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-burgundy dark:text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {date}
            </span>
          )}
          {readingTime && (
            <span className="flex items-center gap-1.5 bg-burgundy/5 dark:bg-white/5 px-3 py-1 rounded-full border border-burgundy/15 dark:border-gold/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-burgundy dark:text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Khoảng {readingTime} phút đọc
            </span>
          )}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="mt-8 w-48 h-[1px] mx-auto bg-gradient-to-r from-transparent via-burgundy/40 to-transparent dark:via-gold/40" />

      {/* Ornamental motto */}
      <div className="mt-3 text-center text-burgundy dark:text-gold text-xs font-semibold tracking-[0.4em] font-[family-name:var(--font-heading)] uppercase">
        Ad Majorem Dei Gloriam
      </div>
    </header>
  );
}
