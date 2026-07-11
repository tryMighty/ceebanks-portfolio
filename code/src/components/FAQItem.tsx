import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  key?: React.Key;
  question: string;
  answer: string;
  index: number;
}

export function FAQItem({ question, answer, index }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const toggle = () => {
    const content = contentRef.current;
    if (!content) return;

    if (!open) {
      gsap.set(content, { height: 'auto' });
      const h = content.offsetHeight;
      gsap.fromTo(content, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.45, ease: 'expo.out' });
      gsap.to(arrowRef.current, { rotation: 180, duration: 0.3, ease: 'expo.out' });
    } else {
      gsap.to(content, { height: 0, opacity: 0, duration: 0.35, ease: 'expo.in' });
      gsap.to(arrowRef.current, { rotation: 0, duration: 0.3, ease: 'expo.out' });
    }
    setOpen(!open);
  };

  return (
    <div className="single-reveal border-b border-[#F7E9E8]/10">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-6 sm:py-7 text-left cursor-pointer group active:scale-[0.99] transition-transform duration-200 ease-out"
      >
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-[#AD1D12] font-grotesk font-bold text-sm tabular-nums">
            0{index + 1}
          </span>
          <span className="font-grotesk font-semibold text-lg sm:text-xl text-[#F7E9E8] group-hover:text-[#AD1D12] transition-colors duration-200 ease-out">
            {question}
          </span>
        </div>
        <ChevronDown ref={arrowRef as React.Ref<SVGSVGElement>} className="w-5 h-5 text-[#F7E9E8]/40 shrink-0 transition-colors duration-200 group-hover:text-[#AD1D12]" />
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0 }}>
        <p className="pb-6 pl-10 sm:pl-14 text-[#F7E9E8]/60 text-sm sm:text-base leading-relaxed max-w-2xl">
          {answer}
        </p>
      </div>
    </div>
  );
}
