import { ReactNode } from 'react';
import ImageZoomClient from '@/components/ImageZoomClient';

export default function CertLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ImageZoomClient />
      {children}
    </>
  );
}
