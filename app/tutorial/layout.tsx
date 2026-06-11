import 'highlight.js/styles/github.css';
import 'katex/dist/katex.min.css';
import '@/styles/markdown.css';
import '@/styles/dark-mode.css';
import '@/styles/zoom.css';
import { ReactNode } from 'react';
import ImageZoomClient from '@/components/ImageZoomClient';
import CodeCopyClient from '@/components/CodeCopyClient';

export const metadata = {
  title: 'Tutorials',
  description: 'Các bài viết hướng dẫn chi tiết về lập trình, công nghệ và phát triển phần mềm.',
};


export default function TutorialLayoutRoot({ children }: { children: ReactNode }) {
  return (
    <>
      <ImageZoomClient />
      <CodeCopyClient />
      {children}
    </>
  );
}
