"use client";

import { useState } from "react";
import { MdOutlineFormatListBulleted } from "react-icons/md";

type Heading = {
  id: string;
  text: string;
  level: number;
};

type FloatingTOCProps = {
  slug: string;
  headings: Heading[];
};

export default function FloatingTOC({ slug, headings }: FloatingTOCProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const isCenterZoom = zoomed && !collapsed;

  return (
    <>
      {isCenterZoom && (
        <div
          className="hidden xl:block fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
          onClick={() => setZoomed(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={
          isCenterZoom
            ? "hidden xl:flex fixed inset-0 z-50 items-start justify-center pt-20"
            : "hidden xl:block fixed top-[100px] right-8 z-40"
        }
      >
        <div
          className={`transition-all duration-300 ease-out ${collapsed
              ? "h-12 w-12 rounded-full"
              : zoomed
                ? "w-[min(760px,calc(100vw-4rem))] rounded-2xl"
                : "w-[260px] rounded-lg"
            } ${isCenterZoom ? "origin-top" : "origin-top-right"}`}
        >
          {collapsed ? (
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              aria-label="Mở mục lục"
              title="Mở mục lục"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/70 bg-[var(--background-color)]/90 text-gray-600 shadow-md backdrop-blur-sm transition hover:scale-105 hover:text-blue-500 dark:border-gray-700/70 dark:bg-[var(--background-color-dark)]/90 dark:text-gray-300"
            >
              <MdOutlineFormatListBulleted className="text-[22px]" />
            </button>
          ) : (
            <aside
              className={`overflow-y-auto border border-gray-200/70 p-4 text-sm text-gray-700 shadow-sm dark:border-gray-700/70 dark:text-gray-200 ${zoomed
                  ? "max-h-[calc(100vh-160px)] rounded-2xl p-6 bg-[var(--background-color)]/90 dark:bg-[var(--background-color-dark)]/90 backdrop-blur-sm shadow-xl"
                  : "max-h-[calc(100vh-120px)] rounded-lg bg-[var(--background-color)]/90 dark:bg-[var(--background-color-dark)]/90 backdrop-blur-sm"
                }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setCollapsed(true);
                      setZoomed(false);
                    }}
                    aria-label="Thu nhỏ mục lục"
                    title="Thu nhỏ mục lục"
                    className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] text-[8px] font-bold text-black/70 transition hover:brightness-95"
                  >
                    <span className="opacity-0 transition-opacity group-hover:opacity-100">x</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCollapsed(true);
                      setZoomed(false);
                    }}
                    aria-label="Thu nhỏ mục lục"
                    title="Thu nhỏ mục lục"
                    className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] text-[9px] font-semibold text-black/70 transition hover:brightness-95"
                  >
                    <span className="-mt-[1px] opacity-0 transition-opacity group-hover:opacity-100">-</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomed((prev) => !prev)}
                    aria-label={zoomed ? "Thu nhỏ mục lục" : "Phóng to mục lục"}
                    title={zoomed ? "Thu nhỏ mục lục" : "Phóng to mục lục"}
                    className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] text-[8px] font-bold text-black/70 transition hover:brightness-95"
                  >
                    <span className="opacity-0 transition-opacity group-hover:opacity-100">+</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCollapsed(true);
                    setZoomed(false);
                  }}
                  aria-label="Thu nhỏ mục lục"
                  title="Thu nhỏ mục lục"
                  className="rounded-md px-2 py-0.5 text-base leading-none text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/60 dark:hover:text-white"
                >
                  -
                </button>
              </div>

              <strong className="mb-4 block text-base text-gray-800 dark:text-gray-100">Mục lục</strong>
              <ul className="space-y-1">
                {headings.map((heading, idx) => (
                  <li key={idx} className={`toc-item level-${heading.level}`}>
                    <a
                      href={`/post/${slug}#${heading.id}`}
                      className={`block truncate text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 ${zoomed ? "max-w-[680px]" : "max-w-[220px]"
                        }`}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
                <li className="toc-item level-2">
                  <a href={`/post/${slug}#comments`}>Thảo luận</a>
                </li>
              </ul>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
