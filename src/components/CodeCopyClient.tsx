'use client'

import { useEffect } from 'react'

function iconSvg(type: 'copy' | 'check') {
  return type === 'copy'
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>`
}

export default function CodeCopyClient() {
  useEffect(() => {
    let zoomOverlay: HTMLDivElement | null = null

    const getCodeFrame = (pre: HTMLPreElement) => pre.closest<HTMLDivElement>('.code-block-frame')

    const getLanguage = (pre: HTMLPreElement) => {
      const dataLang = pre.dataset.lang
      if (dataLang) return dataLang

      const code = pre.querySelector('code')
      const languageClass = Array.from(code?.classList ?? []).find((className) => className.startsWith('language-'))
      return languageClass?.replace('language-', '')
    }

    const closeZoom = () => {
      document.querySelectorAll<HTMLDivElement>('.prose .code-block-frame.code-zoomed').forEach((frame) => {
        frame.classList.remove('code-zoomed')
      })
      if (zoomOverlay) {
        zoomOverlay.remove()
        zoomOverlay = null
      }
    }

    const openZoom = (pre: HTMLPreElement) => {
      const frame = getCodeFrame(pre)
      if (!frame) return

      closeZoom()
      frame.classList.remove('code-collapsed')
      frame.classList.add('code-zoomed')

      zoomOverlay = document.createElement('div')
      zoomOverlay.className = 'code-zoom-overlay'
      zoomOverlay.onclick = closeZoom
      document.body.appendChild(zoomOverlay)
    }

    const toggleCollapse = (pre: HTMLPreElement) => {
      const frame = getCodeFrame(pre)
      if (!frame) return

      const isCollapsed = frame.classList.toggle('code-collapsed')
      if (isCollapsed) {
        frame.classList.remove('code-zoomed')
        if (zoomOverlay) {
          zoomOverlay.remove()
          zoomOverlay = null
        }
      }
    }

    const addButtons = () => {
      document.querySelectorAll<HTMLPreElement>('.prose pre').forEach((pre) => {
        const existingFrame = getCodeFrame(pre)
        if (existingFrame?.querySelector('.copy-code-btn')) return

        Array.from(pre.children).forEach((child) => {
          if (
            child.classList.contains('copy-code-btn') ||
            child.classList.contains('code-lang-label') ||
            child.classList.contains('code-window-controls') ||
            child.classList.contains('code-restore-btn')
          ) {
            child.remove()
          }
        })

        pre.classList.add('has-window-controls')

        const frame = existingFrame ?? document.createElement('div')
        frame.className = 'code-block-frame'
        if (!existingFrame) {
          pre.parentNode?.insertBefore(frame, pre)
          frame.appendChild(pre)
        }

        const controls = document.createElement('div')
        controls.className = 'code-window-controls'

        const closeBtn = document.createElement('button')
        closeBtn.type = 'button'
        closeBtn.className = 'cw-btn cw-close'
        closeBtn.setAttribute('aria-label', 'Thu nhỏ block code')
        closeBtn.setAttribute('title', 'Thu nhỏ block code')
        closeBtn.innerHTML = '<span>x</span>'
        closeBtn.onclick = () => toggleCollapse(pre)

        const minimizeBtn = document.createElement('button')
        minimizeBtn.type = 'button'
        minimizeBtn.className = 'cw-btn cw-minimize'
        minimizeBtn.setAttribute('aria-label', 'Thu nhỏ block code')
        minimizeBtn.setAttribute('title', 'Thu nhỏ block code')
        minimizeBtn.innerHTML = '<span>-</span>'
        minimizeBtn.onclick = () => toggleCollapse(pre)

        const zoomBtn = document.createElement('button')
        zoomBtn.type = 'button'
        zoomBtn.className = 'cw-btn cw-zoom'
        zoomBtn.setAttribute('aria-label', 'Phóng to block code')
        zoomBtn.setAttribute('title', 'Phóng to block code')
        zoomBtn.innerHTML = '<span>+</span>'
        zoomBtn.onclick = () => {
          if (frame.classList.contains('code-zoomed')) {
            closeZoom()
            return
          }
          openZoom(pre)
        }

        controls.appendChild(closeBtn)
        controls.appendChild(minimizeBtn)
        controls.appendChild(zoomBtn)
        frame.appendChild(controls)

        const lang = getLanguage(pre)
        if (lang) {
          const langLabel = document.createElement('span')
          langLabel.className = 'code-lang-label'
          langLabel.textContent = lang === 'typescript' ? 'ts' : lang
          frame.appendChild(langLabel)
        }

        const restoreBtn = document.createElement('button')
        restoreBtn.type = 'button'
        restoreBtn.className = 'code-restore-btn'
        restoreBtn.setAttribute('aria-label', 'Mở lại block code')
        restoreBtn.setAttribute('title', 'Mở lại block code')
        restoreBtn.innerHTML = '</>'
        restoreBtn.onclick = () => frame.classList.remove('code-collapsed')
        frame.appendChild(restoreBtn)

        const btn = document.createElement('button')
        btn.type = 'button'
        btn.className = 'copy-code-btn'
        btn.innerHTML = iconSvg('copy')
        btn.setAttribute('aria-label', 'Copy code')
        btn.setAttribute('title', 'Copy code')

        btn.onclick = async () => {
          const code = pre.querySelector('code')?.innerText ?? ''
          await navigator.clipboard.writeText(code)

          btn.innerHTML = iconSvg('check')
          btn.setAttribute('title', 'Copied!')

          setTimeout(() => {
            btn.innerHTML = iconSvg('copy')
            btn.setAttribute('title', 'Copy code')
          }, 1500)
        }

        frame.appendChild(btn)
      })
    }

    addButtons()

    const observer = new MutationObserver(addButtons)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      closeZoom()
    }
  }, [])

  return null
}