'use client'

import { useEffect } from 'react'
import { Check, Copy } from 'lucide-react'
import { createRoot } from 'react-dom/client'

function iconSvg(type: 'copy' | 'check') {
  return type === 'copy'
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>`
}

export default function CodeCopyClient() {
  useEffect(() => {
    const addButtons = () => {
      document.querySelectorAll<HTMLPreElement>('.prose pre').forEach((pre) => {
        if (pre.querySelector('.copy-code-btn')) return

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

        pre.appendChild(btn)
      })
    }

    addButtons()

    const observer = new MutationObserver(addButtons)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return null
}