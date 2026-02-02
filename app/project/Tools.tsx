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



type ToolItem = {
  icon: React.ReactNode;
  name: string;
  description: string;
  href?: string;
};

const TOOL_ITEMS: ToolItem[] = [
  {
    icon: <SiAdobephotoshop className="text-4xl" aria-hidden />,
    name: "Photoshop 2023",
    description: "Phần mềm thiết kế",
    href: "https://drive.google.com/file/d/1aZqd2Mxjru8u5tj5hdhjDMIpfIHnUFFP/view?usp=share_link"
  },
  {
    icon: <SiAdobeillustrator className="text-4xl" aria-hidden />,
    name: "Illustrator 2023",
    description: "Phần mềm thiết kế đồ họa.",
    href: "https://drive.google.com/file/d/1OgZ8TuYhH7IY-d6TfWEE0G0svOKDOIVk/view?usp=share_link"
  },
  {
    icon: <SiAdobeaftereffects className="text-4xl" aria-hidden />,
    name: "After Effects 2023",
    description: "Phần mềm thiết kế chuyển động.",
    href: "https://drive.google.com/file/d/1e5ZzCP5qLkJWG9_a7pdexaPDSUHqSjC7/view?usp=share_link"
  },
  {
    icon: <SiAdobepremierepro className="text-4xl" aria-hidden />,
    name: "Premiere Pro 2023",
    description: "Phần mềm chỉnh sửa video.",
    href: "https://drive.google.com/file/d/1NwcJDIDDAOgHz5DlDc22Og6H12Zsit-9/view?usp=drive_link"
  },
  {
    icon: <SiAdobelightroom className="text-4xl" aria-hidden />,
    name: "Lightroom Classic 2023",
    description: "Phần mềm chỉnh sửa ảnh.",
    href: "https://drive.google.com/file/d/1xpRDeSOg6JgTlX66XUAL8XR95-kYf-om/view?usp=sharing"
  },
  {
    icon: <SiAdobeaudition className="text-4xl" aria-hidden />,
    name: "Audition 2023",
    description: "Phần mềm chỉnh sửa âm thanh.",
    href: "https://drive.google.com/file/d/1zw7_seC8aiym6FS8X3H_ubqkkD0rVN_M/view?usp=sharing"
  },
  {
    icon: <SiAdobe className="text-4xl" aria-hidden />,
    name: "Media Encoder 2023",
    description: "Phần mềm mã hóa đa phương tiện.",
    href: "https://drive.google.com/uc?id=1yQBVkxIYwE4R2M5RrIY_mynhOa2VJfYT"
  },
  {
    icon: <FaShieldVirus className="text-4xl" aria-hidden />,
    name: "Antivirus",
    description: "Phần mềm duyệt virus.",
    href: "https://drive.google.com/drive/folders/1uv53NDtowH1nkLs12WI-clhpYQSOO_WD?usp=drive_link"
  },
  {
    icon: <FaWindows className="text-4xl" aria-hidden />,
    name: "MS Office 2016",
    description: "Phần mềm văn phòng Microsoft.",
    href: "https://drive.google.com/file/d/1WaU74f2Bjl_hA3dTiulAQAOxe1SekfwD/view?usp=drive_link"
  },
];
export function ToolsSection() {
  return (
    <div className="mt-10">
      {/* Dùng details/summary để làm dropdown không cần hook */}
      <details className="group rounded-lg border border-gray-300 dark:border-gray-600">
        <summary className="cursor-pointer list-none px-4 md:px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E7EB]">
            Tools
          </h2>
          <span
            className="transition-transform duration-200 group-open:rotate-90"
            aria-hidden
          >
            ▶
          </span>
        </summary>

        <div className="px-4 md:px-6 pb-4 flex flex-col gap-4">
          {TOOL_ITEMS.map((tool) => (
            <div
              key={tool.name}
              className="flex items-stretch gap-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-muted transition-colors"
            >
              {/* Cột icon bên trái: cao bằng card */}
              <div className="flex items-center justify-center px-4 bg-muted/0 border-r border-gray-300 dark:border-gray-600 rounded-l-lg text-gray-800 dark:text-[#dadada]">
                {tool.icon}
              </div>

              {/* Phần text bên phải: tên trên, mô tả dưới */}
              <div className="flex flex-col justify-center py-3 pr-4">
                <a
                  href={tool.href}
                  className="hover:underline text-gray-900 dark:text-[#E5E7EB]"
                >
                  <h3 className="text-base font-semibold">{tool.name}</h3>
                </a>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

