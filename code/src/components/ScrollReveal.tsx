import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  stagger?: number;
  y?: number;
  scale?: number;
  duration?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  stagger = 0.15,
  y = 40,
  scale = 0.95,
  duration = 1,
  className = ''
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Find all target children that should be animated
    const targets = el.querySelectorAll('.single-reveal, .reveal-card, .reveal-grid');
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial values
      gsap.set(targets, {
        opacity: 0,
        y: y,
        scale: scale,
      });

      // Animate on scroll trigger
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: duration,
            stagger: stagger,
            ease: 'expo.out',
            overwrite: 'auto',
          });
        },
        onLeaveBack: () => {
          gsap.to(targets, {
            opacity: 0,
            y: y,
            scale: scale,
            duration: duration * 0.5,
            stagger: stagger * 0.5,
            ease: 'expo.in',
            overwrite: 'auto',
          });
        }
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [stagger, y, scale, duration]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

