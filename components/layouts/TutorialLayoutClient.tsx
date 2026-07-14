'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'
import { GiEvilBook } from 'react-icons/gi'
import { TutorialConfigItem } from '@/config/tutorial.config'
import TutorialSidebar from '../tutorial/SideBar'

export default function TutorialLayoutClient({
  children,
  activeSlug,
  tree,
  isContentLoading,
}: {
  children: React.ReactNode
  activeSlug: string
  tree: TutorialConfigItem[]
  isContentLoading?: boolean
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [stickyTitle, setStickyTitle] = useState('')
  const [isStickyVisible, setIsStickyVisible] = useState(false)

  useEffect(() => {
    const container = document.getElementById('tutorial-main-content')
    if (!container) return

    const heading = container.querySelector('h1, h2') as HTMLElement | null
    if (!heading) return

    setStickyTitle((heading.textContent || '').trim())

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStickyVisible(!entry.isIntersecting)
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-80px 0px 0px 0px',
      }
    )

    observer.observe(heading)
    return () => observer.disconnect()
  }, [activeSlug])

  return (
    <div className="flex justify-center px-4 md:px-8 lg:px-12 relative">
      <div
        className={`hidden lg:block fixed top-3 left-1/2 z-[60] w-[min(760px,calc(100vw-2rem))] -translate-x-1/2 transition-all duration-300 ease-out ${isStickyVisible && stickyTitle
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-6 scale-95 opacity-0 pointer-events-none'
          }`}
      >
        <div className="rounded-xl border border-gray-200/70 bg-[var(--background-color)]/88 px-4 py-2.5 shadow-md backdrop-blur-sm dark:border-gray-700/70 dark:bg-[var(--background-color-dark)]/88">
          <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
            {stickyTitle}
          </p>
        </div>
      </div>

      <div className="flex w-full max-w-[1280px] min-h-screen relative">
        <div className="hidden lg:block w-[260px]" />
        <aside className="hidden lg:block fixed top-0 left-[max(1rem,calc(50%-640px))] h-[calc(100vh-48px)] w-[260px] mt-[24px] rounded-2xl border border-gray-200/70 dark:border-gray-700/70 overflow-y-auto px-6 py-8 bg-white/82 dark:bg-[var(--background-color-dark)]/82 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
          <TutorialSidebar activeSlug={activeSlug} tree={tree} />
        </aside>

        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white/86 dark:bg-[var(--background-color-dark)]/86 backdrop-blur-md overflow-y-auto pt-[60px]">
            <button
              className="fixed top-0 left-0 w-full px-4 py-3 bg-white/86 dark:bg-[var(--background-color-dark)]/86 backdrop-blur-md text-left border-b border-gray-200/70 dark:border-gray-700/70 shadow"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <p className="flex items-start gap-2 font-semibold text-2xl dark:text-[var(--text-color-dark)] ">
                <IoMdClose /> <GiEvilBook /> Tutorials
              </p>
            </button>
            <div className="px-6 py-4">
              <TutorialSidebar activeSlug={activeSlug} tree={tree} />
            </div>
          </div>
        )}

        <main id="tutorial-main-content" className="flex-1 px-0 lg:px-[100px] py-10 mx-auto pt-20 lg:w-full w-full">
          {!isMobileSidebarOpen && (
            <button
              className="lg:hidden fixed top-0 left-0 w-full z-50 px-4 py-3 bg-white/86 dark:bg-[var(--background-color-dark)]/86 backdrop-blur-md text-left border-b border-gray-200/70 dark:border-gray-700/70 shadow"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <p className="flex items-start gap-2 font-semibold text-2xl dark:text-[var(--text-color-dark)] ">
                <GiHamburgerMenu /> <GiEvilBook /> Tutorials
              </p>
            </button>
          )}

          {isContentLoading ? (
            <div className="prose dark:prose-invert animate-pulse max-w-none">
              <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-6" /> {/* tiêu đề lớn */}
              <div className="space-y-3 mb-10">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
              </div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4" />
              <div className="grid gap-3 mb-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-11/12" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-4/5" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-9/12" />
              </div>
              <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded w-full" />
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  )
}
