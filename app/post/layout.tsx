import 'highlight.js/styles/github.css';
import '@/styles/markdown.css';
import 'katex/dist/katex.min.css';
import '@/styles/dark-mode.css';
import '@/styles/post.css';
import '@/styles/zoom.css';
import { ReactNode } from 'react';
import ImageZoomClient from '@/components/ImageZoomClient';
import CodeCopyClient from '@/components/CodeCopyClient';

export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ImageZoomClient />
      <CodeCopyClient />
      {children}
    </>
  );
}
