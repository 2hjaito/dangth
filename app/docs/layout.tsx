import 'highlight.js/styles/github.css';
import 'katex/dist/katex.min.css';
import '@/styles/markdown.css';
import '@/styles/dark-mode.css';
import { ReactNode } from 'react';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return children;
}
