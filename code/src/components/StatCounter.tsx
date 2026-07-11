import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatCounterProps {
  target: number;
  className?: string;
  suffix?: string;
}

export function StatCounter({ target, className = '', suffix = '' }: StatCounterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const animObj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        gsap.fromTo(animObj,
          { val: 0 },
          {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              if (el) el.textContent = Math.floor(animObj.val).toString();
            }
          }
        );
      },
      onEnterBack: () => {
        gsap.fromTo(animObj,
          { val: 0 },
          {
            val: target,
            duration: 1.8,
            onUpdate: () => {
              if (el) el.textContent = Math.floor(animObj.val).toString();
            }
          }
        );
      }
    });

    return () => {
      st.kill();
    };
  }, [target]);

  return (
    <span className={className}>
      <span ref={elementRef}>0</span>
      {suffix}
    </span>
  );
}
