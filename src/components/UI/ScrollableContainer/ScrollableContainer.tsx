import React, { useRef, useEffect, useState} from 'react';
import './ScrollableContainer.css';

interface ScrollableContainerProps {
  children: React.ReactNode;
}

const ScrollableContainer = ({ children }: ScrollableContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const smoothScroll = (distance: number, duration: number) => {
    const element = scrollRef.current;
    
    if (!element) return;

    const start = element.scrollLeft;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 0.5 - Math.cos(progress * Math.PI) / 2; 

      element.scrollLeft = start + distance * ease;

      if (progress < 1) {
  requestAnimationFrame(animate);
} else {
  updateScrollButtons(); // Aquí
}

    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
  const el = scrollRef.current;
  if (!el) return;

  updateScrollButtons(); // Inicial

  el.addEventListener('scroll', updateScrollButtons);
  window.addEventListener('resize', updateScrollButtons);

  return () => {
    el.removeEventListener('scroll', updateScrollButtons);
    window.removeEventListener('resize', updateScrollButtons);
  };
}, []);


  const scroll = (direction: 'left' | 'right') => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    smoothScroll(scrollAmount, 500); 
  };

  return (
    <div className="scrollable-wrapper">
      <button className="scroll-btn left" onClick={() => scroll('left')} disabled={!canScrollLeft}>&lt;</button>
      <div className="scrollable-container" ref={scrollRef}>
        {children}
      </div>
      <button className="scroll-btn right" onClick={() => scroll('right')} disabled={!canScrollRight}>&gt;</button>
    </div>
  );
};

export default ScrollableContainer;
