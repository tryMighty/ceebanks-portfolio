import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  children: string;
  className?: string;
  italicWord?: string;
}

export function SectionHeading({ children, className = '', italicWord }: SectionHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.heading-char');
    if (chars.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(chars, { opacity: 0, rotateX: -80, y: 50, z: -50, scale: 0.95 });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(chars, {
            opacity: 1,
            rotateX: 0,
            y: 0,
            z: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.03,
            ease: 'expo.out',
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* Split text into chars, wrapping the italic word */
  const words = children.split(' ');
  let charIndex = 0;

  return (
    <h2
      ref={containerRef}
      className={`font-grotesk font-bold leading-[1.05] tracking-tight ${className}`}
      style={{ perspective: '800px' }}
    >
      {words.map((word, wi) => {
        const isItalic = italicWord && word.toLowerCase() === italicWord.toLowerCase();
        const chars = word.split('').map((ch) => {
          const idx = charIndex++;
          return (
            <span
              key={idx}
              className="heading-char inline-block"
              style={{ transformOrigin: 'bottom center' }}
            >
              {ch}
            </span>
          );
        });
        // Count the space
        charIndex++;
        return (
          <span key={wi} className={isItalic ? 'italic font-serif' : ''}>
            {chars}
            {wi < words.length - 1 && <span className="heading-char inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </h2>
  );
}
