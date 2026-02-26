import 'highlight.js/styles/github.css';
import '@/styles/markdown.css';
import 'katex/dist/katex.min.css';
import { ReactNode } from 'react';

export default function PostLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
