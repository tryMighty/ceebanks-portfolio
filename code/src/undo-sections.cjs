const fs = require('fs');

let content = fs.readFileSync('C:/Users/Mighty/documents/Client-Projects/ceebanks-portfolio/code/src/App.tsx', 'utf8');

const replacements = [
  ['<section id="about" className="relative h-[100dvh] w-full flex flex-col justify-center py-[clamp(1rem,4vh,3rem)] overflow-hidden">', '<section id="about" className="relative py-28 sm:py-36">'],
  ['<section id="portfolio" className="relative h-[100dvh] w-full flex flex-col justify-center py-[clamp(1rem,4vh,3rem)] overflow-hidden">', '<section id="portfolio" className="relative py-28 sm:py-36">'],
  ['<section id="services" className="relative h-[100dvh] w-full flex flex-col justify-center py-[clamp(1rem,4vh,3rem)] overflow-hidden">', '<section id="services" className="relative py-28 sm:py-36">'],
  ['<section id="testimonials" className="relative h-[100dvh] w-full flex flex-col justify-center py-[clamp(1rem,4vh,3rem)] overflow-hidden">', '<section id="testimonials" className="relative py-28 sm:py-36">'],
  
  ['className="grid md:grid-cols-2 gap-[clamp(1rem,3vw,2.5rem)] items-center"', 'className="grid md:grid-cols-2 gap-10"'],
  ['className="relative rounded-3xl overflow-hidden bg-gray-200 aspect-video md:aspect-[4/3] max-h-[35dvh]"', 'className="relative rounded-3xl overflow-hidden bg-gray-200 aspect-square"'],
  ['className="flex gap-[clamp(0.5rem,1.5vw,1.5rem)] mt-[clamp(1rem,3vh,3rem)]"', 'className="flex gap-6 mt-12"'],
  ['className="text-[clamp(1.5rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight mb-[clamp(0.5rem,1.5vh,1.5rem)]"', 'className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight mb-6"'],
  ['className="text-[#1A1A1A]/70 text-[clamp(0.875rem,1.5vh,1.125rem)] leading-relaxed max-w-md"', 'className="text-[#1A1A1A]/70 text-lg leading-relaxed max-w-md"'],
  
  ['className="text-center mb-[clamp(1rem,3vh,4rem)]"', 'className="text-center mb-16"'],
  ['className="grid md:grid-cols-2 gap-[clamp(1rem,2vw,2rem)]"', 'className="grid md:grid-cols-2 gap-8"'],
  ['className="relative aspect-video max-h-[25dvh] rounded-3xl overflow-hidden mb-[clamp(0.5rem,1.5vh,1.5rem)] bg-gray-200 group"', 'className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-gray-200 group"'],
  
  ['className="text-center mb-[clamp(1.5rem,4vh,5rem)]"', 'className="text-center mb-20"'],
  ['className="grid md:grid-cols-2 gap-[clamp(1.5rem,4vw,6rem)] items-stretch h-[55dvh]"', 'className="grid md:grid-cols-2 gap-16 lg:gap-24"'],
  ['className="flex flex-col justify-between h-full gap-[clamp(0.25rem,1vh,1rem)]"', 'className="space-y-4"'],
  ['className="flex-1 bg-[#F4F4F4] rounded-2xl p-[clamp(0.5rem,1.5vh,1.5rem)] border border-[#1A1A1A]/5"', 'className="flex-1 bg-[#F4F4F4] rounded-2xl p-6 border border-[#1A1A1A]/5"'],
  ['className="relative rounded-3xl overflow-hidden bg-gray-200 h-full max-h-[55dvh]"', 'className="relative rounded-3xl overflow-hidden bg-gray-200"'],
  
  ['className="grid md:grid-cols-2 gap-[clamp(1rem,3vw,2rem)] items-stretch h-[55dvh]"', 'className="grid md:grid-cols-2 gap-8"'],
  ['className="relative rounded-3xl overflow-hidden bg-gray-200 h-full"', 'className="relative rounded-3xl overflow-hidden bg-gray-200 aspect-[3/4]"'],
  ['className="flex flex-col justify-between h-full gap-[clamp(0.5rem,1.5vh,1.5rem)]"', 'className="space-y-6"'],
  ['className="bg-[#F4F4F4] rounded-3xl p-[clamp(0.75rem,1.5vh,2rem)] border border-[#1A1A1A]/5 flex flex-col justify-center"', 'className="bg-[#F4F4F4] rounded-3xl p-8 border border-[#1A1A1A]/5"']
];

for (const [target, replacement] of replacements) {
  content = content.split(target).join(replacement);
}

fs.writeFileSync('C:/Users/Mighty/documents/Client-Projects/ceebanks-portfolio/code/src/App.tsx', content);
console.log('Undid updates successfully');
