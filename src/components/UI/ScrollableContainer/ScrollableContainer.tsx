import React, { useRef, useEffect, useState} from 'react';
import './ScrollableContainer.css';
import { useLanguage } from '../../../contexts/LanguageContext';

interface ScrollableContainerProps {
  children: React.ReactNode;
}

const ScrollableContainer = ({ children }: ScrollableContainerProps) => {
  const { t, language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
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
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
        updateScrollButtons();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();

    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    smoothScroll(scrollAmount, 500); 
  };

  const leftLabel = (t("navbar.scrollLeft") as string) || (language === "en" ? "Scroll left" : "Desplazar a la izquierda");
  const rightLabel = (t("navbar.scrollRight") as string) || (language === "en" ? "Scroll right" : "Desplazar a la derecha");

  return (
    <div className="scrollable-wrapper">
      <button className="scroll-btn left" onClick={() => scroll('left')} disabled={!canScrollLeft} aria-label={leftLabel}>&lt;</button>
      <div className="scrollable-container" ref={scrollRef}>
        {children}
      </div>
      <button className="scroll-btn right" onClick={() => scroll('right')} disabled={!canScrollRight} aria-label={rightLabel}>&gt;</button>
    </div>
  );
};

export default ScrollableContainer;
