
'use client';

import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  valueString: string; // e.g., "5,000+", "50+"
  duration?: number;
  className?: string;
}

const AnimatedNumber: FC<AnimatedNumberProps> = ({ valueString, duration = 2000, className }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const targetNumberRef = useRef(0);
  const suffixRef = useRef('');

  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    targetNumberRef.current = parseInt(valueString.replace(/[^0-9]/g, ''), 10) || 0;
    suffixRef.current = valueString.replace(/[0-9,]/g, '');
  }, [valueString]);

  useEffect(() => {
    if (!hasAnimated) return; // Only animate if triggered by observer

    let startValue = 0;
    const target = targetNumberRef.current;
    
    // If target is 0, just set it and return
    if (target === 0) {
      setCurrentValue(0);
      return;
    }

    const stepTime = 16; // Roughly 60fps
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= target) {
        setCurrentValue(target);
        clearInterval(timer);
      } else {
        setCurrentValue(Math.ceil(startValue));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasAnimated, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Optional: unobserve after animating if it should only run once
          // observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasAnimated]); // Rerun observer effect if hasAnimated changes (e.g. for re-triggering logic)

  return (
    <span ref={elementRef} className={className}>
      {currentValue.toLocaleString()}
      {suffixRef.current}
    </span>
  );
};

export default AnimatedNumber;
