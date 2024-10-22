import { useEffect } from 'react';

export const useAnimationEffect = (dependency: unknown[] = []) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      {
        threshold: 0,
      },
    );

    const elements = document.querySelectorAll('.animation');

    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [dependency]);
};
