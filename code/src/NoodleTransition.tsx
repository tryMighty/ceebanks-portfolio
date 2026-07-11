import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STROKE_STAGGER   = 0.045;
const STROKE_DRAW_TIME = 1.25;
const PIN_HEIGHT       = 3; // 3 viewports of scroll pinning duration
const DRAW_ORDER       = [0, 12, 2, 10, 4, 8, 6, 1, 3, 5, 7, 9, 11];

const STROKE_PATHS = [
  "M -251 -42 C 156 -405 595 -695 1176 -648",
  "M -195 90 C 212 -273 651 -562 1232 -516",
  "M -138 223 C 269 -140 707 -430 1288 -383",
  "M -82 355 C 325 -8 764 -297 1345 -250",
  "M -26 488 C 381 125 820 -165 1401 -118",
  "M 30 620 C 438 257 876 -32 1457 15",
  "M 87 753 C 494 390 932 101 1513 147",
  "M 143 885 C 550 522 989 233 1570 280",
  "M 199 1018 C 606 655 1045 366 1626 412",
  "M 255 1150 C 663 788 1101 498 1682 545",
  "M 312 1283 C 719 920 1157 631 1738 677",
  "M 368 1416 C 775 1053 1214 763 1795 810",
  "M 424 1548 C 831 1185 1270 896 1851 942",
];

const startAt = (o: number) => o * STROKE_STAGGER;
const wobble  = (o: number) => (o % 2 === 0 ? 0 : STROKE_STAGGER * 0.6);
const drawDur = (o: number) => STROKE_DRAW_TIME + (o % 3) * 0.12;

interface NoodleContextType {
  triggerRef: React.RefObject<HTMLElement | null>;
  setTriggerRef: (ref: React.RefObject<HTMLElement | null>) => void;
}

const NoodleContext = createContext<NoodleContextType | undefined>(undefined);

export function NoodleProvider({ children }: { children: React.ReactNode }) {
  const [triggerRef, setTriggerRefState] = useState<React.RefObject<HTMLElement | null>>({ current: null });

  const setTriggerRef = (ref: React.RefObject<HTMLElement | null>) => {
    setTriggerRefState(ref);
  };

  return (
    <NoodleContext.Provider value={{ triggerRef, setTriggerRef }}>
      {children}
    </NoodleContext.Provider>
  );
}

export function useNoodle() {
  const context = useContext(NoodleContext);
  if (!context) throw new Error('useNoodle must be used within a NoodleProvider');
  return context;
}

export function NoodleTrigger({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const { setTriggerRef } = useNoodle();
  const localRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setTriggerRef(localRef);
  }, [setTriggerRef]);

  return (
    <main ref={localRef} id={id} className={className}>
      {children}
    </main>
  );
}

export function NoodleOverlay() {
  const { triggerRef } = useNoodle();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const trigger = triggerRef.current;
    if (!overlay || !trigger) return;

    const ctx = gsap.context(() => {
      // 1. Configure initial dash arrays on all stroke paths
      const paths = overlay.querySelectorAll('.n-fill, .n-border');
      paths.forEach((p) => {
        const pathEl = p as SVGPathElement;
        const len = pathEl.getTotalLength();
        gsap.set(pathEl, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
      });

      // Set next section initially invisible and off-screen
      const nextSection = document.querySelector('.next-sections-wrap');
      if (nextSection) {
        gsap.set(nextSection, { y: '100vh', opacity: 0 });
      }

      // ── Phase timing constants ──
      // The timeline is scrubbed across PIN_HEIGHT viewports of scroll.
      // Phase 1 - Draw In:     0    -> 1.0   (strokes cover the hero)
      // Phase 2 - Swap:        0.85 -> 1.35  (hero fades, next section slides in, while covered)
      // Phase 3 - Draw Out:    1.2  -> 2.2   (strokes recede, revealing new content)
      const DRAW_IN_PHASE_END = 1.0;
      const SWAP_START = 0.85;
      const DRAW_OUT_START = 1.2;

      // 2. Pin the hero section - scroll only drives the timeline, nothing moves
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          // Pin at the hero's natural position (below the navbar).
          // This fires immediately at scroll=0 so the hero never moves.
          start: () => `top top+=${trigger.getBoundingClientRect().top + window.scrollY}`,
          end: `+=${PIN_HEIGHT * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
        }
      });

      // 3. PHASE 1 - Strokes draw in (covering the hero)
      //    Stagger all 13 strokes across the 0 -> DRAW_IN_PHASE_END window.
      const totalPaths = STROKE_PATHS.length;
      const maxOrder = DRAW_ORDER.length - 1;

      for (let i = 0; i < totalPaths; i++) {
        const fill = overlay.querySelector(`g:nth-child(${i + 1}) .n-fill`) as SVGPathElement;
        const border = overlay.querySelector(`g:nth-child(${i + 1}) .n-border`) as SVGPathElement;
        if (!fill || !border) continue;

        const orderIdx = DRAW_ORDER.indexOf(i);
        const order = orderIdx === -1 ? i : orderIdx;

        // Normalised stagger: each stroke starts at an evenly-spaced time
        // within the first 40% of the draw-in phase, giving later strokes
        // time to finish drawing before the phase ends.
        const staggeredStart = (order / maxOrder) * (DRAW_IN_PHASE_END * 0.4);
        const dur = 0.55 + (order % 3) * 0.06;
        const fillLen = fill.getTotalLength();
        const borderLen = border.getTotalLength();

        // Draw in
        tl.fromTo(border,
          { strokeDashoffset: borderLen },
          { strokeDashoffset: 0, duration: dur, ease: 'sine.inOut' },
          staggeredStart
        );
        tl.fromTo(fill,
          { strokeDashoffset: fillLen },
          { strokeDashoffset: 0, duration: dur, ease: 'sine.inOut' },
          staggeredStart + 0.03
        );

        // PHASE 3 - Draw out (strokes recede to reveal new content)
        const drawOutStart = DRAW_OUT_START + (order / maxOrder) * 0.4;
        tl.to(border,
          { strokeDashoffset: -borderLen, duration: dur, ease: 'sine.inOut' },
          drawOutStart
        );
        tl.to(fill,
          { strokeDashoffset: -fillLen, duration: dur, ease: 'sine.inOut' },
          drawOutStart + 0.03
        );
      }

      // 4. PHASE 2 - Content swap (happens while noodle fully covers the viewport)

      // Fade the hero content out behind the noodle
      tl.to(trigger, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      }, SWAP_START);

      // Slide the next section up into the viewport position behind the noodle
      if (nextSection) {
        tl.to(nextSection, {
          y: '0vh',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }, SWAP_START + 0.1);
      }

      // 5. Sparkles appear during the covered moment, fade during draw-out
      const sparks = overlay.querySelectorAll('.n-spark');
      sparks.forEach((sp, i) => {
        tl.fromTo(sp,
          { scale: 0, rotation: -45, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.35,
            ease: 'back.out(1.7)',
          },
          SWAP_START + 0.05 + i * 0.06
        );
        tl.to(sp,
          { scale: 0, opacity: 0, duration: 0.3 },
          DRAW_OUT_START + 0.4 + i * 0.06
        );
      });
    }, overlay);

    return () => {
      ctx.revert();
    };
  }, [triggerRef]);

  return (
    <div ref={overlayRef} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      {/* Strokes */}
      <div style={{ position: 'absolute', inset: '-10%', width: '120%', height: '120%', pointerEvents: 'none' }}>
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <g fill="none" strokeLinecap="round">
            {STROKE_PATHS.map((d, i) => (
              <g key={i}>
                <path className="n-border" d={d} stroke="rgba(247,233,232,0.60)" strokeWidth={150}
                  style={{ willChange: 'stroke-dashoffset' }} />
                <path className="n-fill" d={d} stroke="#AD1D12" strokeWidth={143}
                  style={{ willChange: 'stroke-dashoffset' }} />
              </g>
            ))}
          </g>
        </svg>
      </div>
      {/* Sparkles */}
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
        <g fill="rgba(247,233,232,0.25)" stroke="rgba(247,233,232,0.60)" strokeWidth="4" strokeLinejoin="round">
          {[
            'translate(360 230) scale(1.5)',
            'translate(1180 520) scale(1)',
            'translate(640 730) scale(0.65)',
          ].map((t, i) => (
            <g key={i} transform={t}>
              <path className="n-spark" vectorEffect="non-scaling-stroke"
                style={{ transform: 'scale(0)', willChange: 'transform' }}
                d="M 0 -55 C 8 -16 16 -8 55 0 C 16 8 8 16 0 55 C -8 16 -16 8 -55 0 C -16 -8 -8 -16 0 -55 Z" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
