import { useState, useRef } from 'react';

interface UseSwipeProps {
  slideCount: number;
}

interface UseSwipeReturn {
  currentSlideIndex: number;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  setCurrentSlideIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const useSwipe = ({ slideCount }: UseSwipeProps): UseSwipeReturn => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartRef.current - touchEndRef.current;
    const threshold = 50;

    if (distance > threshold) {
      setCurrentSlideIndex(prevIndex =>
        prevIndex < slideCount - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (distance < -threshold) {
      setCurrentSlideIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex,
      );
    }
  };

  return {
    currentSlideIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    setCurrentSlideIndex,
  };
};
