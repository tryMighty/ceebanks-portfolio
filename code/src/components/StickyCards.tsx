import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  title: string;
  tag: string;
  desc: string;
  img: string;
  color: string;
}

interface StickyCardsProps {
  cards: CardProps[];
}

export function StickyCards({ cards }: StickyCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const domCards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (domCards.length === 0) return;

    const totalCards = domCards.length;
    const segmentSize = 1 / totalCards;

    const cardYOffset = 5;
    const cardScaleStep = 0.075;

    // Set initial states
    domCards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + i * cardYOffset,
        scale: 1 - i * cardScaleStep,
        transformOrigin: 'center bottom',
        willChange: 'transform',
      });
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: `+=${window.innerHeight * totalCards * 1.5}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          const activeIndex = Math.min(
            Math.floor(progress / segmentSize),
            totalCards - 1
          );

          const segProgress = (progress - activeIndex * segmentSize) / segmentSize;

          domCards.forEach((card, i) => {
            if (i < activeIndex) {
              gsap.set(card, {
                yPercent: -250,
                rotationX: 35,
              });
            } else if (i === activeIndex) {
              gsap.set(card, {
                yPercent: gsap.utils.interpolate(-50, -200, segProgress),
                rotationX: gsap.utils.interpolate(0, 35, segProgress),
                scale: 1,
              });
            } else {
              const behindIndex = i - activeIndex;
              const currentYOffset = (behindIndex - segProgress) * cardYOffset;
              const currentScale = 1 - (behindIndex - segProgress) * cardScaleStep;

              gsap.set(card, {
                yPercent: -50 + currentYOffset,
                rotationX: 0,
                scale: currentScale,
              });
            }
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [cards.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden rounded-[2rem] bg-[#282828] mb-20"
      style={{ perspective: '850px' }}
    >
      {cards.map((card, i) => (
        <div
          key={card.title}
          ref={(el) => (cardRefs.current[i] = el)}
          className="absolute top-1/2 left-1/2 w-[90%] sm:w-[80%] lg:w-[65%] h-[75%] sm:h-[65%] flex flex-col md:flex-row items-center gap-6 p-6 sm:p-10 rounded-[2rem] text-[#282828] shadow-2xl overflow-hidden"
          style={{ backgroundColor: card.color, zIndex: cards.length - i }}
        >
          <div className="flex-1 h-full flex flex-col justify-between py-2 sm:py-6 relative z-10 w-full">
            <div className="space-y-4">
              <span className="px-4 py-1.5 rounded-full bg-black/20 backdrop-blur-md text-xs font-bold tracking-widest uppercase border border-white/10">
                {card.tag}
              </span>
              <h3 className="font-grotesk font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
                {card.title}
              </h3>
            </div>
            <p className="font-medium text-base sm:text-lg opacity-90 max-w-sm">
              {card.desc}
            </p>
          </div>
          <div className="flex-1 w-full h-[50%] md:h-full rounded-2xl overflow-hidden relative shadow-inner">
            <div className="absolute inset-0 bg-black/10 z-10 mix-blend-overlay"></div>
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-1000 ease-out"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
