'use client';

import { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaUser, FaCertificate, FaSun, FaMoon, FaSpinner } from 'react-icons/fa';
import { GiMagicPortal, GiEvilBook, GiSpellBook } from 'react-icons/gi';
import { Projects } from './icons';
import { navbarConfig } from '@/config/navbar.config';
import { localizePath, parseLocaleFromPathname } from '@/lib/i18n';

import useDarkMode from '@/hooks/useDarkMode';

const navIconMap = {
  user: FaUser,
  projects: Projects,
  certificate: FaCertificate,
  tutorials: GiEvilBook,
  posts: GiMagicPortal,
  docs: GiSpellBook,
};

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { locale } = parseLocaleFromPathname(pathname);

  const { isDark, toggleDarkMode } = useDarkMode();
  const [isLoadingTheme, setIsLoadingTheme] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);

  /** Khi route thay đổi → tắt spinner */
  useEffect(() => {
    setActiveNav(null);
  }, [pathname]);

  /** Toggle dark mode — cực nhẹ */
  const handleToggleTheme = () => {
    setIsLoadingTheme(true);
    setTimeout(() => {
      toggleDarkMode();
      setIsLoadingTheme(false);
    }, 120);
  };

  /** Hide navbar khi scroll xuống — cực nhẹ */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let lastY = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY;
      nav.classList.toggle("nav-hide", goingDown);
      lastY = y;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 left-1/2 z-[9999] -translate-x-1/2 px-3">

      <div
        ref={navRef}
        className="
          inline-flex gap-2 items-center 
          bg-[#FFFFFF] dark:bg-[#404B5D] 
          px-4 py-2 rounded-2xl 
          border border-[#e4e4e4] dark:border-[#5a5a5a] 
          shadow-lg transition-transform duration-300
        "
      >

        {/* NAV ITEMS */}
        {navbarConfig.items.map(({ label, href, icon }) => {
          const Icon = navIconMap[icon];
          const localizedHref = localizePath(href, locale);
          const isActive = pathname === localizedHref;

          return (
            <div className="nav-item relative" key={href}>
              <Link
                href={localizedHref}
                prefetch={false}
                onClick={() => setActiveNav(localizedHref)}
                title={label}
                className="
                  group w-11 h-11 rounded-xl 
                  bg-[#EAEAEA] text-[#9A9A9A] 
                  dark:bg-[#4A5363] dark:text-[#9A9A9A]
                  relative flex items-center justify-center 
                  transition-all ease-out duration-300
                  hover:scale-150 hover:mt-[-18px] hover:z-10 hover:mx-2
                "
              >
                {/* Spinner chính chủ trở lại */}
                {activeNav === localizedHref ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <Icon />
                )}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-current"
                  />
                )}
              </Link>
            </div>
          );
        })}

        {/* THEME TOGGLE */}
        <button
          onClick={handleToggleTheme}
          title={navbarConfig.themeToggle.title}
          className="
            group w-11 h-11 rounded-xl 
            bg-[#EAEAEA] text-[#9A9A9A] 
            dark:bg-[#4A5363] dark:text-[#9A9A9A]
            flex items-center justify-center 
            transition-all ease-out duration-300 
            hover:scale-150 hover:mt-[-18px] hover:z-10 hover:mx-2
          "
        >
          {isLoadingTheme ? (
            <FaSpinner className="animate-spin" />
          ) : isDark ? (
            <FaMoon />
          ) : (
            <FaSun />
          )}
        </button>

      </div>
    </div>
  );
}
