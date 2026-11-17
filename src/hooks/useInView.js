import { useEffect, useRef, useState } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // One-shot trigger
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
        ...options,
      }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, isInView];
}
