import 'highlight.js/styles/github.css';
import '@/styles/markdown.css';
import 'katex/dist/katex.min.css';
import '@/styles/dark-mode.css';
import { ReactNode } from 'react';

export default function TutorialLayoutRoot({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
