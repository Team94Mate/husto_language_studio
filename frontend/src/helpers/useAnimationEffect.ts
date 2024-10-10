// import { useEffect } from 'react';

import { useEffect } from 'react';

export const useAnimationEffect = () => {
  // useEffect(() => {
  //   const animations = document.querySelectorAll('.animation');

  //   animations.forEach(animation => {
  //     setTimeout(() => {
  //       animation.classList.add('show');
  //     }, 500);
  //   });
  // }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            // Optionally, remove the class when scrolling out of view
            entry.target.classList.remove('show');
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      },
    );

    const elements = document.querySelectorAll('.animation');

    elements.forEach(el => observer.observe(el));

    // Cleanup observer on unmount
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
};
