"use client";

import { useState } from "react";

export default function CopyAnchor({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.hash = id;
    window.history.replaceState(null, "", url.toString());
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={`#${id}`}
      className="absolute -left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all text-burgundy/50 hover:text-burgundy dark:text-gold/50 dark:hover:text-gold hidden md:flex items-center justify-center p-1 rounded hover:bg-burgundy/10 dark:hover:bg-gold/10 print:hidden cursor-pointer"
      aria-label="Sao chép liên kết đến mục này"
      title={copied ? "Đã sao chép liên kết!" : "Sao chép liên kết"}
      onClick={handleCopy}
    >
      {copied ? (
        <span className="relative flex items-center justify-center text-emerald-600 dark:text-gold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 animate-scale-in"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      )}
    </a>
  );
}
