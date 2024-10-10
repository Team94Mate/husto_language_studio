import { useEffect } from 'react';

export const useScrollEffect = () => {
  useEffect(() => {
    const handleScroll = () => {
      const stickyElement = document.querySelector('.Midia') as HTMLElement;
      const container = document.querySelector('.main') as HTMLElement;
      const containerRec = container?.getBoundingClientRect();
      const isMobile = window.matchMedia('(min-width: 961px)').matches;

      if (!stickyElement || !container || !containerRec) {
        return;
      }

      if (containerRec?.top > -113 || containerRec.bottom < 674) {
        stickyElement.style.display = 'none';
      } else {
        stickyElement.style.display = 'block';
      }

      if (!isMobile) {
        stickyElement.style.display = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};
