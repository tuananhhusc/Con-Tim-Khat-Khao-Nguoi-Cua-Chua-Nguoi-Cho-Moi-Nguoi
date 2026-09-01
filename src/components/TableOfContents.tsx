"use client";

import { useState, useEffect, useCallback } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track active heading via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false);
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  // Split number prefix (e.g. "2.1.") and title text
  const parseHeadingText = (text: string) => {
    const match = text.match(/^([\d.]+)\s*(.*)$/);
    if (match) {
      return { num: match[1], title: match[2] };
    }
    return { num: "", title: text };
  };

  const tocList = (
    <nav aria-label="Mục lục bài viết" className="text-left">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-2.5 border-b-2 border-burgundy/30 dark:border-gold/30">
        <span className="text-burgundy dark:text-gold text-sm font-serif">✝</span>
        <h2 className="font-[var(--font-heading)] text-sm font-bold uppercase tracking-wider text-burgundy dark:text-gold">
          Mục lục nghiên cứu
        </h2>
      </div>

      {/* Heading items */}
      <ul className="space-y-1.5 text-sm">
        {headings.map(({ id, text, level }) => {
          const { num, title } = parseHeadingText(text);
          const isActive = activeId === id;

          return (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`group flex items-start w-full text-left py-1.5 px-2.5 rounded transition-all duration-200 cursor-pointer ${
                  level === 3 ? "pl-5 text-[13.5px]" : "font-medium text-sm"
                } ${
                  isActive
                    ? "bg-burgundy/10 text-burgundy dark:bg-gold/15 dark:text-gold font-semibold border-l-[3px] border-burgundy dark:border-gold shadow-xs"
                    : "text-charcoal dark:text-[#E2D9CC] hover:bg-burgundy/5 hover:text-burgundy dark:hover:bg-white/5 dark:hover:text-gold border-l-[3px] border-transparent"
                }`}
              >
                {num && (
                  <span
                    className={`shrink-0 font-sans text-xs mr-2 mt-[1px] font-semibold transition-colors ${
                      isActive
                        ? "text-burgundy dark:text-gold"
                        : "text-burgundy/70 dark:text-gold/80 group-hover:text-burgundy dark:group-hover:text-gold"
                    }`}
                  >
                    {num}
                  </span>
                )}
                <span className="leading-snug flex-1">{title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[280px] shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-5 pl-1 scrollbar-thin border-r border-burgundy/15 dark:border-gold/15">
          {tocList}
        </div>
      </aside>

      {/* Mobile floating button */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-expanded={mobileOpen}
        aria-label="Mở mục lục bài viết"
        className="lg:hidden fixed bottom-8 left-6 z-40 bg-burgundy hover:bg-burgundy-light text-white px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 transition-all duration-300 text-sm font-semibold cursor-pointer border border-gold/30 active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <span>Mục lục</span>
      </button>

      {/* Mobile slide-over panel */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Mục lục bài viết"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-parchment dark:bg-dark-slate shadow-2xl p-6 overflow-y-auto border-r border-burgundy/20 dark:border-gold/20 animate-slide-in-left">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-burgundy/20 dark:border-gold/20">
              <div className="flex items-center gap-2">
                <span className="text-burgundy dark:text-gold font-serif">✝</span>
                <span className="font-[var(--font-heading)] text-base font-bold text-burgundy dark:text-gold">
                  Mục lục
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-full bg-burgundy/10 hover:bg-burgundy/20 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-burgundy dark:text-gold active:scale-95"
                aria-label="Đóng mục lục"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {tocList}
          </div>
        </div>
      )}

      {/* Animation keyframe */}
      <style jsx global>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.25s ease-out;
        }
      `}</style>
    </>
  );
}
