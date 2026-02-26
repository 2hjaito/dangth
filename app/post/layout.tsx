import 'highlight.js/styles/github.css';
import '@/styles/markdown.css';
import 'katex/dist/katex.min.css';
import '@/styles/dark-mode.css';
import { ReactNode } from 'react';
import ImageZoomClient from '@/components/ImageZoomClient';

export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ImageZoomClient />
      {children}
    </>
  );
}
