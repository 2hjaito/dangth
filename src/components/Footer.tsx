import React from 'react';
import { FaCode, FaRss } from "react-icons/fa";
import { footerConfig } from '@/config/footer.config';

const footerIconMap = {
  source: FaCode,
  rss: FaRss,
};

export default function Footer() {
  return (
    <>
      {/* <GoogleAdsenseBanner /> */}
      <footer className="relative z-10 mt-[50px] pt-[20px] pb-[28px] text-[var(--text-color)] dark:text-[var(--text-color-dark)] dark:bg-[var(--background-color-dark)] border-t border-gray-200 dark:border-[#9a9a9a7c]">
        <div className="max-w-[700px] mx-auto px-4 text-sm text-gray-700 dark:text-gray-300 flex flex-row gap-3 justify-between items-center">

          <p className="min-w-0 text-left">
            <span>{footerConfig.copyright}</span>{" "}
            {footerConfig.attribution && (
              <span>
                · {footerConfig.attribution.label}{" "}
                <a
                  href={footerConfig.attribution.href}
                  target={footerConfig.attribution.external ? '_blank' : undefined}
                  rel={footerConfig.attribution.external ? 'noopener noreferrer' : undefined}
                  className="underline hover:text-primary"
                >
                  {footerConfig.attribution.text}
                </a>
              </span>
            )}
          </p>

          <p className="flex shrink-0 items-center gap-4">
            {footerConfig.links.map((link) => {
              const Icon = footerIconMap[link.type];

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-1 underline hover:text-primary"
                >
                  <Icon />
                  <span className="hidden md:inline">{link.label}</span>
                </a>
              );
            })}
          </p>

        </div>
      </footer>
    </>
  );
}