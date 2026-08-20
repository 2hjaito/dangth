'use client'

import { useEffect } from 'react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'
import { GiEvilBook } from 'react-icons/gi'
import { MdOutlineFormatListBulleted } from 'react-icons/md'
import { TutorialConfigItem } from '@/config/tutorial.config'
import TutorialSidebar from '../tutorial/SideBar'

type Heading = {
  id: string
  text: string
  level: number
}

function slugifyHeading(text: string) {
  return (
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section'
  )
}

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
  const pathname = usePathname()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [stickyTitle, setStickyTitle] = useState('')
  const [isStickyVisible, setIsStickyVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeHeadingId, setActiveHeadingId] = useState('')
  const [hasComments, setHasComments] = useState(false)
  const [isTocCollapsed, setIsTocCollapsed] = useState(true)
  const [isTocZoomed, setIsTocZoomed] = useState(false)

  const isCenterZoom = isTocZoomed && !isTocCollapsed

  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement
      const maxScroll = doc.scrollHeight - window.innerHeight
      const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0

      setScrollProgress(Math.min(1, Math.max(0, nextProgress)))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [activeSlug, pathname])

  useEffect(() => {
    const container = document.getElementById('tutorial-main-content')
    if (!container) return

    const heading = container.querySelector('h1, h2') as HTMLElement | null
    const proseContainer =
      (container.querySelector('.prose') as HTMLElement | null) ?? container

    const nextHeadings = Array.from(
      proseContainer.querySelectorAll('h2, h3, h4')
    )
      .map((node, index) => {
        const text = (node.textContent || '').trim()
        if (!text) return null

        const element = node as HTMLElement
        const baseId = slugifyHeading(text)
        const fallbackId = `${baseId}-${index + 1}`
        const id = element.id || fallbackId

        if (!element.id) {
          element.id = id
        }

        return {
          id,
          text,
          level: Number(element.tagName.slice(1)),
        }
      })
      .filter((item): item is Heading => item !== null)

    setHeadings(nextHeadings)
    setActiveHeadingId(nextHeadings[0]?.id ?? '')
    setHasComments(Boolean(document.getElementById('comments')))
    setIsTocCollapsed(true)
    setIsTocZoomed(false)

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
  }, [activeSlug, pathname, isContentLoading])

  useEffect(() => {
    if (headings.length === 0) return

    const updateActiveHeading = () => {
      const comments = document.getElementById('comments')
      if (comments) {
        const commentsTop = comments.getBoundingClientRect().top
        if (commentsTop <= 180) {
          setActiveHeadingId('comments')
          return
        }
      }

      let nextActiveId = headings[0]?.id ?? ''

      for (const heading of headings) {
        const element = document.getElementById(heading.id)
        if (!element) continue

        if (element.getBoundingClientRect().top <= 180) {
          nextActiveId = heading.id
        } else {
          break
        }
      }

      setActiveHeadingId(nextActiveId)
    }

    updateActiveHeading()
    window.addEventListener('scroll', updateActiveHeading, { passive: true })
    window.addEventListener('resize', updateActiveHeading)

    return () => {
      window.removeEventListener('scroll', updateActiveHeading)
      window.removeEventListener('resize', updateActiveHeading)
    }
  }, [headings, pathname])

  useEffect(() => {
    const container = document.getElementById('tutorial-main-content')
    if (!container) return

    const scripts = Array.from(
      container.querySelectorAll<HTMLScriptElement>(
        '.tutorial-live-demo script[data-live-script="true"]:not([data-live-executed="true"])'
      )
    )

    let cancelled = false

    const executeScripts = async () => {
      for (const script of scripts) {
        if (cancelled) return

        script.setAttribute('data-live-executed', 'true')

        if (script.src) {
          await new Promise<void>((resolve) => {
            const nextScript = document.createElement('script')

            Array.from(script.attributes).forEach((attribute) => {
              if (attribute.name === 'data-live-script' || attribute.name === 'type') {
                return
              }

              nextScript.setAttribute(attribute.name, attribute.value)
            })

            nextScript.async = false
            nextScript.onload = () => resolve()
            nextScript.onerror = () => resolve()

            script.replaceWith(nextScript)
          })

          continue
        }

        try {
          const globalEval = window.eval
          globalEval(script.textContent ?? '')
        } catch (error) {
          console.error('Tutorial live demo execution failed:', error)
        }

        script.remove()
      }
    }

    void executeScripts()

    return () => {
      cancelled = true
    }
  }, [pathname, isContentLoading])

  return (
    <div className="flex justify-center px-4 md:px-8 lg:px-12 relative">
      <div className="fixed inset-x-0 top-0 z-[90] h-1 bg-emerald-500/15 dark:bg-blue-500/15">
        <div
          className="h-full origin-left bg-emerald-500 transition-transform duration-150 ease-out dark:bg-blue-500"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {isCenterZoom && (
        <div
          className="hidden xl:block fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
          onClick={() => setIsTocZoomed(false)}
          aria-hidden="true"
        />
      )}

      {headings.length > 0 && (
        <div
          className={
            isCenterZoom
              ? 'hidden xl:flex fixed inset-0 z-50 items-start justify-center pt-20'
              : 'hidden xl:block fixed top-4 right-6 z-40'
          }
        >
          <div
            className={`transition-all duration-300 ease-out ${isTocCollapsed
              ? 'h-12 w-12 rounded-full'
              : isTocZoomed
                ? 'w-[min(760px,calc(100vw-4rem))] rounded-2xl'
                : 'w-[260px] rounded-lg'
              } ${isCenterZoom ? 'origin-top' : 'origin-top-right'}`}
          >
            {isTocCollapsed ? (
              <button
                type="button"
                onClick={() => setIsTocCollapsed(false)}
                aria-label="Mở mục lục"
                title="Mở mục lục"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200/80 bg-[var(--background-color)]/92 text-emerald-700 shadow-md backdrop-blur-sm transition hover:scale-105 hover:text-emerald-500 dark:border-blue-700/70 dark:bg-[var(--background-color-dark)]/92 dark:text-blue-300 dark:hover:text-blue-200"
              >
                <MdOutlineFormatListBulleted className="text-[22px]" />
              </button>
            ) : (
              <aside
                className={`flex overflow-hidden border p-4 text-sm text-gray-700 shadow-sm dark:text-gray-200 ${isTocZoomed
                  ? 'max-h-[calc(100vh-160px)] rounded-2xl border-emerald-200/80 bg-[var(--background-color)]/92 p-6 backdrop-blur-sm shadow-xl dark:border-blue-700/70 dark:bg-[var(--background-color-dark)]/92'
                  : 'max-h-[calc(100vh-120px)] rounded-lg border-emerald-200/80 bg-[var(--background-color)]/92 backdrop-blur-sm dark:border-blue-700/70 dark:bg-[var(--background-color-dark)]/92'
                  }`}
              >
                <div className="flex min-h-0 w-full flex-col">
                  <div className="mb-4 shrink-0">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setIsTocCollapsed(true)
                            setIsTocZoomed(false)
                          }}
                          aria-label="Đóng mục lục"
                          title="Đóng mục lục"
                          className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] text-[8px] font-bold text-black/70 transition hover:brightness-95"
                        >
                          <span className="opacity-0 transition-opacity group-hover:opacity-100">x</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsTocCollapsed(true)
                            setIsTocZoomed(false)
                          }}
                          aria-label="Thu nhỏ mục lục"
                          title="Thu nhỏ mục lục"
                          className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] text-[9px] font-semibold text-black/70 transition hover:brightness-95"
                        >
                          <span className="-mt-[1px] opacity-0 transition-opacity group-hover:opacity-100">-</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsTocZoomed((prev) => !prev)}
                          aria-label={isTocZoomed ? 'Thu nhỏ mục lục' : 'Phóng to mục lục'}
                          title={isTocZoomed ? 'Thu nhỏ mục lục' : 'Phóng to mục lục'}
                          className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] text-[8px] font-bold text-black/70 transition hover:brightness-95"
                        >
                          <span className="opacity-0 transition-opacity group-hover:opacity-100">+</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsTocCollapsed(true)
                          setIsTocZoomed(false)
                        }}
                        aria-label="Thu nhỏ mục lục"
                        title="Thu nhỏ mục lục"
                        className="rounded-md px-2 py-0.5 text-base leading-none text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/60 dark:hover:text-white"
                      >
                        -
                      </button>
                    </div>

                    <strong className="block text-base text-emerald-700 dark:text-blue-300">
                      Mục lục
                    </strong>
                  </div>
                  <div className="tutorial-hover-scroll min-h-0 flex-1 overflow-y-auto pr-1">
                    <ul className="space-y-1 pb-1">
                      {headings.map((heading, index) => (
                        <li
                          key={`${heading.id}-${index}`}
                          className="leading-relaxed"
                          style={{ marginLeft: `${Math.max(heading.level - 2, 0) * 16}px` }}
                        >
                          <a
                            href={`${pathname}#${heading.id}`}
                            className={`block truncate rounded-md px-2 py-1 transition ${activeHeadingId === heading.id
                              ? 'bg-emerald-50 font-semibold text-emerald-700 dark:bg-blue-950/50 dark:text-blue-300'
                              : 'text-gray-700 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-blue-300'
                              } ${isTocZoomed ? 'max-w-[680px]' : 'max-w-[220px]'
                              }`}
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                      {hasComments && (
                        <li className="leading-relaxed">
                          <a
                            href={`${pathname}#comments`}
                            className={`block truncate rounded-md px-2 py-1 transition ${activeHeadingId === 'comments'
                              ? 'bg-emerald-50 font-semibold text-emerald-700 dark:bg-blue-950/50 dark:text-blue-300'
                              : 'text-gray-700 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-blue-300'
                              } ${isTocZoomed ? 'max-w-[680px]' : 'max-w-[220px]'
                              }`}
                          >
                            Thảo luận
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      )}

      <div
        className={`hidden lg:block fixed top-3 left-[calc(50%+145px)] z-[60] w-[min(760px,calc(100vw-24rem))] -translate-x-1/2 transition-all duration-300 ease-out ${isStickyVisible && stickyTitle
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

      <div className="flex w-full max-w-[1320px] min-h-screen relative">
        <div className="hidden lg:block w-[290px]" />
        <aside className="tutorial-hover-scroll hidden lg:block fixed top-0 left-[max(1rem,calc(50%-660px))] h-[calc(100vh-48px)] w-[290px] mt-[24px] rounded-2xl border border-gray-200/70 dark:border-gray-700/70 overflow-y-auto px-4 py-5 bg-white/82 dark:bg-[var(--background-color-dark)]/82 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
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
