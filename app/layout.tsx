import './globals.css'
import '@/styles/global.css'
import '@/styles/animation.css'
import '@/styles/dark-mode.css'

import { ReactNode } from 'react'
import { cmuSansVi } from './fonts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ImageZoomClient from '@/components/ImageZoomClient'

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

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (

    <html className={cmuSansVi.variable} lang="vi">
      <head>
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" /> */}
      </head>
      <body className='dark:bg-[var(--background-color-dark)] min-h-screen flex flex-col'>
        <ImageZoomClient />
        <Navbar />
        <main className='dark:bg-[var(--background-color-dark)]'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
