'use client';

import { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaUser, FaCertificate, FaSun, FaMoon, FaSpinner } from 'react-icons/fa';
import { GiMagicPortal, GiEvilBook } from 'react-icons/gi';
import { Projects } from './icons';

import useDarkMode from '@/hooks/useDarkMode';

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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

  /** Nav items */
  const navItems = [
    { label: 'Home', href: '/', icon: <FaUser /> },
    { label: 'Projects', href: '/project', icon: <Projects /> },
    { label: 'Certs', href: '/cert', icon: <FaCertificate /> },
    { label: 'Tutorials', href: '/tutorial', icon: <GiEvilBook /> },
    { label: 'Posts', href: '/post', icon: <GiMagicPortal /> },
  ];

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
        {navItems.map(({ label, href, icon }) => (
          <div className="nav-item relative" key={href}>
            <Link
              href={href}
              prefetch={false}
              onClick={() => setActiveNav(href)}
              title={label}
              className="
                group w-11 h-11 rounded-xl 
                bg-[#EAEAEA] text-[#9A9A9A] 
                dark:bg-[#4A5363] dark:text-[#9A9A9A]
                flex items-center justify-center 
                transition-all ease-out duration-300
                hover:scale-150 hover:mt-[-18px] hover:z-10 hover:mx-2
              "
            >
              {/* Spinner chính chủ trở lại */}
              {activeNav === href ? (
                <FaSpinner className="animate-spin" />
              ) : (
                icon
              )}
            </Link>
          </div>
        ))}

        {/* THEME TOGGLE */}
        <button
          onClick={handleToggleTheme}
          title="Toggle theme"
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
