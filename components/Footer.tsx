import React from 'react';
import { SITE_CONFIG } from '@/config/config';
import { FaCode, FaRss } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-[50px] pt-[20px] pb-[20px] text-[var(--text-color)] dark:text-[var(--text-color-dark)] dark:bg-[var(--background-color-dark)] border-t border-gray-200 dark:border-[#9a9a9a7c]">
      <div className="max-w-[700px] mx-auto px-4 text-sm text-gray-700 dark:text-gray-300 flex justify-between items-center">

        <p className="text-left">
          <span>© Davis 2025</span>{" "}
          <span className="hidden md:inline">
            · Developer at{" "}
            <a
              href="https://devlands.io.vn"
              className="underline hover:text-primary"
            >
              Devlands
            </a>
          </span>
        </p>

        <p className="flex items-center gap-4">
          <a
            href={SITE_CONFIG.githubRepo}
            aria-label="Xem mã nguồn trên GitHub"
            className="flex items-center gap-1 underline hover:text-primary"
          >
            <FaCode />
            <span className="hidden md:inline">SRC</span>
          </a>
          <a
            href='/rss.xml'
            aria-label="Xem RSS feed"
            className="flex items-center gap-1 underline hover:text-primary"
          >
            <FaRss />
            <span className="hidden md:inline">RSS</span>
          </a>
        </p>

      </div>
    </footer>

  );
}