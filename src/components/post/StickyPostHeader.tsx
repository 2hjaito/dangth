"use client";

import { useEffect, useState } from "react";

type StickyPostHeaderProps = {
  title: string;
  targetId: string;
};

export default function StickyPostHeader({ title, targetId }: StickyPostHeaderProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-80px 0px 0px 0px",
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      className={`fixed top-3 left-1/2 z-50 w-[min(760px,calc(100vw-2rem))] -translate-x-1/2 transition-all duration-300 ease-out ${visible
          ? "translate-y-0 scale-100 opacity-100"
          : "-translate-y-6 scale-95 opacity-0 pointer-events-none"
        }`}
    >
      <div className="rounded-xl border border-gray-200/70 bg-[var(--background-color)]/88 px-4 py-2.5 shadow-md backdrop-blur-sm dark:border-gray-700/70 dark:bg-[var(--background-color-dark)]/88">
        <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-100">{title}</p>
      </div>
    </div>
  );
}