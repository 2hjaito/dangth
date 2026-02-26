import { ReactNode } from 'react';
import ImageZoomClient from '@/components/ImageZoomClient';
import '@/styles/zoom.css';

export default function CertLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ImageZoomClient />
      {children}
    </>
  );
}
