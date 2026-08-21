/* -----------------------
   Tools (tĩnh, dropdown)
------------------------ */

import {
  SiAdobephotoshop, SiAdobeillustrator,
  SiAdobeaftereffects, SiAdobepremierepro,
  SiAdobelightroom, SiAdobeaudition, SiAdobe
} from "react-icons/si";
import { FaShieldVirus } from "react-icons/fa6";
import { FaWindows } from "react-icons/fa";
import type { ToolBlock } from "@/lib/content/page";

const toolIconMap = {
  photoshop: SiAdobephotoshop,
  illustrator: SiAdobeillustrator,
  aftereffects: SiAdobeaftereffects,
  premierepro: SiAdobepremierepro,
  lightroom: SiAdobelightroom,
  audition: SiAdobeaudition,
  adobe: SiAdobe,
  antivirus: FaShieldVirus,
  windows: FaWindows,
};

type ToolsSectionProps = {
  title?: string;
  items: ToolBlock[];
};

export function ToolsSection({ title = "Tools", items }: ToolsSectionProps) {
  return (
    <div className="mt-10">
      {/* Dùng details/summary để làm dropdown không cần hook */}
      <details className="group rounded-none border border-gray-300 dark:border-gray-600">
        <summary className="cursor-pointer list-none px-4 md:px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E7EB]">
            {title}
          </h2>
          <span
            className="transition-transform duration-200 group-open:rotate-90"
            aria-hidden
          >
            ▶
          </span>
        </summary>

        <div className="px-4 md:px-6 pb-4 flex flex-col gap-4">
          {items.map((tool) => {
            const Icon = toolIconMap[tool.icon as keyof typeof toolIconMap] ?? SiAdobe;

            return (
              <div
                key={tool.title}
                className="flex items-stretch gap-4 rounded-none border border-gray-300 dark:border-gray-600 hover:bg-muted transition-colors"
              >
                {/* Cột icon bên trái: cao bằng card */}
                <div className="flex items-center justify-center px-4 bg-muted/0 border-r border-gray-300 dark:border-gray-600 rounded-none text-gray-800 dark:text-[#dadada]">
                  <Icon className="text-4xl" aria-hidden />
                </div>

                {/* Phần text bên phải: tên trên, mô tả dưới */}
                <div className="flex flex-col justify-center py-3 pr-4">
                  <a
                    href={tool.href}
                    className="hover:underline text-gray-900 dark:text-[#E5E7EB]"
                  >
                    <h3 className="text-base font-semibold">{tool.title}</h3>
                  </a>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}

