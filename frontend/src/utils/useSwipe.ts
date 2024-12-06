import { useRef, useState, useEffect, RefObject } from 'react';

type SwipeOptions = {
  ref?: RefObject<HTMLDivElement>;
  onSwipeEnd?: (newIndex: number) => void;
};

export const useSwipe = (options?: SwipeOptions) => {
  const { ref: externalRef, onSwipeEnd } = options || {};
  const internalRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = externalRef || internalRef;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  let startX = 0;
  let scrollLeft = 0;
  let isSwiping = false;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX = e.touches[0].pageX;
    scrollLeft = sliderRef.current?.scrollLeft || 0;
    isSwiping = true;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (sliderRef.current && isSwiping) {
      const touchX = e.touches[0].pageX;
      const moveDistance = startX - touchX;

      sliderRef.current.scrollLeft = scrollLeft + moveDistance;
    }
  };

  const SWIPE_THRESHOLD = 50;

  const handleTouchEnd = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const cardWidth = slider.offsetWidth;

      const movedDistance = slider.scrollLeft - scrollLeft;

      const newIndex =
        Math.abs(movedDistance) > SWIPE_THRESHOLD
          ? Math.round(slider.scrollLeft / cardWidth)
          : currentCardIndex;

      slider.scrollTo({
        left: newIndex * cardWidth,
      });

      setCurrentCardIndex(newIndex);
      if (onSwipeEnd) {
        onSwipeEnd(newIndex);
      }
    }

    isSwiping = false;
  };

  const handleDotClick = (index: number) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth;

      sliderRef.current.scrollTo({
        left: index * cardWidth,
      });

      setCurrentCardIndex(index);
      if (onSwipeEnd) {
        onSwipeEnd(index);
      }
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  }, [sliderRef]);

  return {
    sliderRef,
    currentCardIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDotClick,
  };
};
