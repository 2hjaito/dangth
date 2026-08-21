import { useEffect, useState } from 'react';
import { GISCUS } from '@/config/config';

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('dark-mode');
    const prefersDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    setIsDark(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('dark-mode', newTheme ? 'dark' : 'light');
    document.getElementById('comments')?.setAttribute('theme', newTheme ? GISCUS.dark : GISCUS.light);
  };

  return { isDark, toggleDarkMode };
}
