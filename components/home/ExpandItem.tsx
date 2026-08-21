"use client";

import { useState } from "react";
import Image from "next/image";

type ExpandItemProps = {
  title: string;
  subtitle: string;
  meta: string;
  logo?: string;
  children: React.ReactNode;
};

export default function ExpandItem({
  title,
  subtitle,
  meta,
  logo,
  children,
}: ExpandItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <article className="item mb-4">
      <header
        className="title flex justify-between items-start py-2 cursor-pointer group"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-start">
          {logo && (
            <Image
              src={logo}
              width={48}
              height={48}
              className="rounded-md object-cover"
              alt={title}
            />
          )}

          <div className={logo ? "ml-2" : ""}>
            <div className="top font-semibold text-[17px] flex items-center gap-1">
              {title}

              <span className="icon-wrap">
                <svg
                  className={`
                    w-4 h-4 transform transition-all duration-300
                    ${open
                      ? "rotate-90 opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                    }
                  `}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </span>
            </div>

            <div className="bot text-sm text-gray-700 dark:text-gray-300">
              {subtitle}
            </div>
          </div>
        </div>

        <div className="times text-[15px] font-semibold">{meta}</div>
      </header>

      <div
        className={`
          details overflow-hidden transition-all duration-300
          ${open ? "max-h-[500px] mt-2" : "max-h-0"}
        `}
      >
        <div className="text-[15px] leading-[26px] text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </div>
    </article>
  );
}