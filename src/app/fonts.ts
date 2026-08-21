import localFont from 'next/font/local'

export const cmuSansVi = localFont({
  src: [
    {
      path: '../../public/fonts/cmu/vi/CMUSansSerifVietnamized.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/cmu/sans/cmunsx.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-cmusans-vi',
  display: 'swap',
  preload: false,
})

