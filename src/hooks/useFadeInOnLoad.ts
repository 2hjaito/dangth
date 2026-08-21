import { useEffect, useState } from 'react';

export default function useFadeInOnLoad(delay = 100) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return isVisible;
}
