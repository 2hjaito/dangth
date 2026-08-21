'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { enableImageZoom } from '@/utils/zoomImage'

export default function ImageZoomClient() {
  const pathname = usePathname()

  useEffect(() => {
    enableImageZoom()

    // Optional: nếu bạn cần clear các effect trước khi zoom lại
    return () => {
      // cleanup nếu enableImageZoom trả về zoom instance hoặc handler
      // ví dụ: zoom.detach() nếu bạn dùng medium-zoom
    }
  }, [pathname])

  return null
}
