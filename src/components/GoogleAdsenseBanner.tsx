"use client";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export default function GoogleAdsenseBanner() {
  const insRef = useRef<HTMLModElement | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // ignore
      }
      // Sau 2 giây, kiểm tra xem quảng cáo có hiển thị không
      const timer = setTimeout(() => {
        const el = insRef.current;
        if (el) {
          // Nếu chiều cao nhỏ hoặc không có child nào => ẩn
          if ((el as HTMLElement).offsetHeight < 50 || el.children.length === 0) {
            setHidden(true);
          }
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (hidden) return null;

  return (
    <>
      <Script
        id="adsbygoogle-init"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9187603281407054"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9187603281407054"
        data-ad-slot="3197399858"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
}
