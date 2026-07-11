import React from 'react';

const MARQUEE_ITEMS = [
  'Figma', 'Photoshop', 'Illustrator', 'After Effects', 'Blender',
  'Webflow', 'React', 'Framer', 'Spline', 'Cinema 4D',
  'InDesign', 'Premiere Pro', 'Sketch', 'Principle', 'Notion',
];

export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="w-full overflow-hidden py-8 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#282828] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#282828] to-transparent z-10 pointer-events-none" />

      <div className="flex gap-6 animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#F7E9E8]/10 bg-[#F7E9E8]/[0.03] text-[#F7E9E8]/50 text-sm font-medium tracking-wide hover:text-[#F7E9E8] hover:border-[#AD1D12]/30 transition-colors duration-300 shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#AD1D12]/60" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
