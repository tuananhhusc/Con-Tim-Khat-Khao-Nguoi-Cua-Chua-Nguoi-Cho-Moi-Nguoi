"use client";

import { useState, useEffect, useRef } from "react";

export default function ReadingTools() {
  const [dark, setDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(isDark);

    // Read stored font size
    const savedSize = localStorage.getItem("proseFontSize");
    if (savedSize) {
      document.documentElement.style.setProperty("--prose-font-size", savedSize);
    }

    // Handle outside click & escape key
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const changeFontSize = (delta: number) => {
    const currentSizeStr = getComputedStyle(document.documentElement)
      .getPropertyValue("--prose-font-size")
      .trim();
    let currentSize = 18; // Default font size for prose-lg is 18px (1.125rem)
    if (currentSizeStr && currentSizeStr.endsWith("px")) {
      currentSize = parseInt(currentSizeStr, 10);
    }
    const newSize = Math.max(14, Math.min(30, currentSize + delta * 2));
    const newSizePx = `${newSize}px`;

    document.documentElement.style.setProperty("--prose-font-size", newSizePx);
    localStorage.setItem("proseFontSize", newSizePx);
  };

  const handlePrint = () => {
    setIsOpen(false);
    setTimeout(() => window.print(), 150);
  };

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed top-5 right-5 z-40 flex flex-col items-center gap-3 print:hidden"
      id="reading-tools"
    >
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Công cụ đọc"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Công cụ đọc & Tùy chọn giao diện"
        className="w-14 h-14 rounded-full bg-burgundy dark:bg-gold text-white dark:text-dark-slate shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20 dark:border-dark-slate/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          )}
        </svg>
      </button>

      {/* Expandable Menu */}
      <div
        className={`flex flex-col items-center gap-3 transition-all duration-300 origin-top ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 -translate-y-2 pointer-events-none absolute top-16"
        }`}
      >
        {/* Font Size increase */}
        <button
          onClick={() => changeFontSize(1)}
          aria-label="Phóng to cỡ chữ bài đọc"
          title="Phóng to cỡ chữ (+2px)"
          className="w-12 h-12 rounded-full bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border border-burgundy/20 dark:border-gold/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg cursor-pointer text-burgundy dark:text-gold font-bold font-serif text-xl"
        >
          A+
        </button>

        {/* Font Size decrease */}
        <button
          onClick={() => changeFontSize(-1)}
          aria-label="Thu nhỏ cỡ chữ bài đọc"
          title="Thu nhỏ cỡ chữ (-2px)"
          className="w-12 h-12 rounded-full bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border border-burgundy/20 dark:border-gold/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg cursor-pointer text-burgundy dark:text-gold font-bold font-serif text-base"
        >
          A-
        </button>

        {/* Print / Save PDF */}
        <button
          onClick={handlePrint}
          aria-label="In hoặc lưu PDF"
          title="In hoặc lưu định dạng PDF"
          className="w-12 h-12 rounded-full bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border border-burgundy/20 dark:border-gold/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg cursor-pointer text-burgundy dark:text-gold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
        </button>

        {/* Dark Mode toggle */}
        <button
          onClick={toggleTheme}
          aria-label={dark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
          title={dark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
          className="w-12 h-12 rounded-full bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border border-burgundy/20 dark:border-gold/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
        >
          {dark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-burgundy"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
