import React, { useRef } from 'react';
import gsap from 'gsap';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    
    const rx = -(dy / yc) * 6;
    const ry = (dx / xc) * 6;

    gsap.to(card, {
      rotationX: rx,
      rotationY: ry,
      transformPerspective: 1000,
      ease: 'power3.out',
      duration: 0.3,
      boxShadow: '0 20px 40px rgba(0,0,0,0.35), 0 0 20px rgba(173,29,18,0.1)',
      borderColor: 'rgba(173,29,18,0.2)'
    });

    if (innerRef.current) {
      gsap.to(innerRef.current, {
        x: (dx / xc) * 8,
        y: (dy / yc) * 8,
        ease: 'power3.out',
        duration: 0.3
      });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      ease: 'power3.out',
      duration: 0.5,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      borderColor: 'rgba(247,233,232,0.1)'
    });

    if (innerRef.current) {
      gsap.to(innerRef.current, {
        x: 0,
        y: 0,
        ease: 'power3.out',
        duration: 0.5
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card ${className}`}
    >
      <div ref={innerRef} className="tilt-card-inner h-full w-full">
        {children}
      </div>
    </div>
  );
}
