"use client";
import { useState, useEffect, useCallback } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setProgress(Math.min(scrollPercent, 100));
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateProgress();
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateProgress]);

  return (
    <div id="reading-progress" className="fixed top-0 left-0 w-full h-[3px] z-50 bg-transparent">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(to right, #722F37, #C5B358)",
        }}
      />
    </div>
  );
}
