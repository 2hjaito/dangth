import './globals.css'
import '@/styles/global.css'

import { ReactNode } from 'react'
import { cmuSansVi } from './fonts'
import Navbar from '@/components/Navbar'
import CodeCopyClient from '@/components/CodeCopyClient'
import { layoutMetadata, structuredData } from '@/config/layout.config'


// import Live2DWidgetClient from '@/components/Live2DWidgetClient'
import Footer from '@/components/Footer'


export const metadata = layoutMetadata;

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
      <body
        className='dark:bg-[var(--background-color-dark)] min-h-screen flex flex-col'
        suppressHydrationWarning
      >
        <Navbar />
        <CodeCopyClient />

        <main className='dark:bg-[var(--background-color-dark)]'>{children}</main>
        {/* <Live2DWidgetClient modelName="HK416-2-destroy" /> */}
        <Footer />
      </body>
    </html>
  )
}
