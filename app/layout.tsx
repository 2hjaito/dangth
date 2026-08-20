import './globals.css'
import '@/styles/global.css'

import { ReactNode } from 'react'
import Script from 'next/script';
import { cmuSansVi } from './fonts'
import Navbar from '@/components/Navbar'


// import Live2DWidgetClient from '@/components/Live2DWidgetClient'
import Footer from '@/components/Footer'


import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://dangth.dev'),

  title: {
    default: 'Trần Hữu Đang – Lập trình viên Fullstack',
    template: '%s | Trần Hữu Đang',
  },

  description:
    'Portfolio của Trần Hữu Đang – Lập trình viên Fullstack với kinh nghiệm Next.js, Spring Boot, DevOps, Microservices và xây dựng hệ thống web.',

  keywords: [
    'Trần Hữu Đang',
    'lập trình viên fullstack',
    'fullstack developer vietnam',
    'nextjs developer',
    'spring boot developer',
    'portfolio lập trình viên',
  ],

  authors: [{ name: "Trần Hữu Đang" }],
  creator: "Trần Hữu Đang",
  publisher: "Trần Hữu Đang",

  alternates: {
    canonical: 'https://dangth.dev',
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    title: 'Trần Hữu Đang – Lập trình viên Fullstack',
    description:
      'Portfolio cá nhân của Trần Hữu Đang, chia sẻ dự án, kinh nghiệm và kỹ năng phát triển web.',
    url: 'https://dangth.dev',
    siteName: 'Trần Hữu Đang',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Trần Hữu Đang – Lập trình viên Fullstack',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Trần Hữu Đang – Lập trình viên Fullstack',
    description: 'Portfolio lập trình viên Fullstack.',
    images: ['/og-image.png'],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://dangth.dev/#person',
      name: 'Trần Hữu Đang',
      url: 'https://dangth.dev',
      jobTitle: 'Fullstack Developer',
      sameAs: [
        'https://github.com/2hjaito',
        'https://www.linkedin.com/in/tranhuudang',
        'https://www.facebook.com/dangth.dev/',
        'https://www.youtube.com/@2hjaito',
      ],
      knowsAbout: ['Next.js', 'Spring Boot', 'DevOps', 'Microservices'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://dangth.dev/#website',
      url: 'https://dangth.dev',
      name: 'Trần Hữu Đang',
      publisher: { '@id': 'https://dangth.dev/#person' },
      inLanguage: 'vi-VN',
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (

    <html className={cmuSansVi.variable} lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

      </head>
      <body className='dark:bg-[var(--background-color-dark)] min-h-screen flex flex-col'>
        <Navbar />

        <main className='dark:bg-[var(--background-color-dark)]'>{children}</main>
        {/* <Live2DWidgetClient modelName="HK416-2-destroy" /> */}
        <Footer />
      </body>
    </html>
  )
}
