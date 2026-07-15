import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutTextScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  
  const text1 = "A space for brands shaped with clarity and intention. Each identity follows a simple path from core values to visual form, from form to lasting impression.";
  const text2 = "I craft brand identities and visual systems that value strategy above excess. Through minimal design and precise storytelling, I aim to build brands that stand out and offer a clear sense of purpose.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // First text reveal
      if (text1Ref.current) {
        ScrollTrigger.create({
          trigger: text1Ref.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 1,
          onUpdate: (self) => {
            const clipValue = Math.max(0, 100 - self.progress * 100);
            text1Ref.current?.style.setProperty('--clip-value', `${clipValue}%`);
          }
        });
      }

      // Services slide-in
      if (servicesRef.current) {
        ScrollTrigger.create({
          trigger: servicesRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          onUpdate: (self) => {
            const headers = servicesRef.current?.querySelectorAll(".services-header");
            if (!headers || headers.length < 3) return;
            gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
            gsap.set(headers[1], { x: `${-100 + self.progress * 100}%` });
            gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
          },
        });

        // Services pin, merge, scale
        ScrollTrigger.create({
          trigger: servicesRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 2}`,
          pin: true,
          scrub: 1,
          pinSpacing: false,
          onUpdate: (self) => {
            const headers = servicesRef.current?.querySelectorAll(".services-header");
            if (!headers || headers.length < 3) return;

            if (self.progress <= 0.5) {
              const yProgress = self.progress / 0.5;
              gsap.set(headers[0], { y: `${yProgress * 100}%` });
              gsap.set(headers[2], { y: `${yProgress * -100}%` });
            } else {
              gsap.set(headers[0], { y: "100%" });
              gsap.set(headers[2], { y: "-100%" });

              const scaleProgress = (self.progress - 0.5) / 0.5;
              const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
              const scale = 1 - scaleProgress * (1 - minScale);

              headers.forEach((header) => gsap.set(header, { scale }));
            }
          },
        });
      }

      // Second text reveal
      if (text2Ref.current) {
        ScrollTrigger.create({
          trigger: text2Ref.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 1,
          onUpdate: (self) => {
            const clipValue = Math.max(0, 100 - self.progress * 100);
            text2Ref.current?.style.setProperty('--clip-value', `${clipValue}%`);
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="scroll-animation-wrapper">
      <section className="about">
        <h2 
          className="animate-text font-grotesk text-center max-w-5xl" 
          ref={text1Ref} 
          data-text={text1}
        >
          {text1}
        </h2>
      </section>

      <section className="services" ref={servicesRef}>
        <div className="services-header flex justify-center"><h2 className="text-[15vw] font-black font-grotesk leading-none text-[#F7E9E8] tracking-tighter whitespace-nowrap">WHAT I DO</h2></div>
        <div className="services-header flex justify-center"><h2 className="text-[15vw] font-black font-grotesk leading-none text-[#F7E9E8] tracking-tighter whitespace-nowrap">WHAT I DO</h2></div>
        <div className="services-header flex justify-center"><h2 className="text-[15vw] font-black font-grotesk leading-none text-[#F7E9E8] tracking-tighter whitespace-nowrap">WHAT I DO</h2></div>
      </section>

      <section className="services-copy">
        <h2 
          className="animate-text font-grotesk text-center max-w-5xl" 
          ref={text2Ref} 
          data-text={text2}
        >
          {text2}
        </h2>
      </section>
    </div>
  );
};
