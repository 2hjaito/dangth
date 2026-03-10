"use client";
import Script from "next/script";
import { useEffect } from "react";

export default function GoogleAdsenseBanner() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // ignore
      }
    }
  }, []);

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
