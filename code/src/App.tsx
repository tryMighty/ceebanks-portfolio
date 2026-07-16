import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ceebanksImg from '../ceebanks.png';

import { AsciiFooter } from './components/AsciiFooter';
import { FluidCursor } from './components/FluidCursor';
import { AboutTextScroll } from './components/AboutTextScroll';
import { HowItWorksScroll } from './components/HowItWorksScroll';

gsap.registerPlugin(ScrollTrigger);



/* ─── App ───────────────────────────────────────────────────────────────── */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const navRef = useRef<HTMLDivElement>(null);
  
  const imageRef = useRef<HTMLImageElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const isParallaxActive = useRef(true);

  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Nav hiding logic removed since nav is no longer fixed
  }, []);

  /* About Section Scroll Pin & Text Reveal */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (aboutSectionRef.current && aboutTextRef.current) {
        ScrollTrigger.create({
          trigger: aboutSectionRef.current,
          start: "top top",
          end: "+=150%", // Keep pinned for 1.5x viewport height
          scrub: 1,
          refreshPriority: 1, // Force this pin to be calculated before downstream triggers
          onUpdate: (self) => {
            const clipValue = Math.max(0, 100 - self.progress * 100);
            aboutTextRef.current?.style.setProperty('clip-path', `inset(0 0 ${clipValue}% 0)`);
          }
        });
        
        // Force an immediate refresh after creation to ensure downstream triggers recalculate their positions
        ScrollTrigger.refresh();
      }
    });
    return () => ctx.revert();
  }, []);

  const parallaxTimeoutRef = useRef<number | null>(null);

  /* Parallax effect for mouse */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Parallax effect
      if (!isParallaxActive.current) return;
      
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;

      if (imageRef.current) gsap.to(imageRef.current, { x: x * 30, y: y * 30, duration: 1, ease: 'power2.out' });
      if (watermarkRef.current) gsap.to(watermarkRef.current, { x: x * -60, y: y * -60, duration: 1, ease: 'power2.out' });
      if (tagsRef.current) gsap.to(tagsRef.current, { x: x * 70, y: y * 70, duration: 1, ease: 'power2.out' });
      if (bubblesRef.current) gsap.to(bubblesRef.current, { x: x * 50, y: y * 50, duration: 1, ease: 'power2.out' });

      // Reset after 10s of inactivity
      if (parallaxTimeoutRef.current) clearTimeout(parallaxTimeoutRef.current);
      parallaxTimeoutRef.current = window.setTimeout(() => {
        gsap.to([imageRef.current, watermarkRef.current, tagsRef.current, bubblesRef.current], {
          x: 0,
          y: 0,
          duration: 1.5,
          ease: 'power2.out'
        });
      }, 10000);
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (parallaxTimeoutRef.current) clearTimeout(parallaxTimeoutRef.current);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const handleDoubleClick = () => {
    isParallaxActive.current = false;
    gsap.to([imageRef.current, watermarkRef.current, tagsRef.current, bubblesRef.current], {
      x: 0,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        isParallaxActive.current = true;
      }
    });
  };

  return (
    <div className="min-h-screen text-[#F7E9E8] antialiased relative selection:bg-[#AD1D12] selection:text-[#F7E9E8] overflow-x-hidden bg-transparent">
      
      <main className="relative z-10 bg-[#282828] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-b border-black/20">
      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <div ref={navRef} className="absolute top-0 left-1/2 -translate-x-1/2 z-50 max-w-7xl w-full px-4 sm:px-6">
        <header className="w-full py-2 flex items-center justify-between text-[#282828] transition-all duration-300">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('Home')}>
            <span className="font-grotesk font-bold tracking-tight text-lg">CeeBanks<span className="text-[#AD1D12]">.</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {['Home', 'About', 'Portfolio', 'Services'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item)}
                className={`text-sm font-medium tracking-wide transition-[color,transform] duration-200 ease-out cursor-pointer active:scale-[0.97] ${
                  activeTab === item ? 'text-[#282828] font-bold' : 'text-[#282828]/60 hover:text-[#282828]'
                }`}>
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => scrollToSection('Contact')}
              className="px-6 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-[background,color,transform] duration-200 ease-out active:scale-[0.97] border cursor-pointer border-[#AD1D12] text-[#F7E9E8] bg-[#AD1D12] hover:bg-[#AD1D12]/90 shadow-[0_4px_20px_rgba(173,29,18,0.25)]">
              Get In Touch
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-black/5 cursor-pointer text-[#282828] active:scale-[0.97] transition-transform duration-200 ease-out">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full z-40 px-4 sm:px-6 md:hidden animate-in fade-in slide-in-from-top duration-200">
          <div className="w-full px-6 py-4 rounded-xl backdrop-blur-xl border bg-[#282828]/95 border-[#F7E9E8]/10 shadow-xl shadow-black/30">
            <div className="flex flex-col gap-4 py-2">
              {['Home', 'About', 'Portfolio', 'Services'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item)}
                  className={`text-left text-base font-medium py-1.5 cursor-pointer ${
                    activeTab === item ? 'text-[#AD1D12]' : 'text-[#F7E9E8]/65'
                  }`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section id="home" onDoubleClick={handleDoubleClick} className="relative w-full h-[85svh] lg:h-[100svh] flex flex-col items-center justify-end overflow-hidden bg-[#F7E9E8] z-20 select-none touch-manipulation">

        {/* WebGL Fluid Cursor Trail */}
        <FluidCursor />

        {/* Background BRAND DESIGNER watermark */}
        <div
          className="invertible absolute left-1/2 pointer-events-auto select-none z-0 flex flex-col items-center justify-center w-full"
          style={{ top: '48%', transform: 'translateX(-50%) translateY(-50%)' }}
        >
          <div ref={watermarkRef} className="flex flex-col items-center justify-center w-full">
            <h1 className="text-[22vw] font-black tracking-[-0.04em] text-[#282828]/[0.06] whitespace-nowrap font-grotesk leading-[0.85]">BRAND</h1>
            <h1 className="text-[22vw] font-black tracking-[-0.04em] text-[#AD1D12]/[0.07] whitespace-nowrap font-grotesk leading-[0.85]">DESIGNER</h1>
          </div>
        </div>

        {/* Floating Skill Tags */}
        <div className="absolute inset-0 z-30 pointer-events-none flex justify-center">
          <div ref={tagsRef} className="relative w-full max-w-5xl h-full hidden md:block">
            <div className="invertible pointer-events-auto absolute top-[28%] left-[14%] bg-white/70 backdrop-blur-xl px-5 py-2 rounded-full font-bold text-xs text-[#282828] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60">Brand Strategy</div>
            <div className="invertible pointer-events-auto absolute top-[26%] right-[13%] bg-white/70 backdrop-blur-xl px-5 py-2 rounded-full font-bold text-xs text-[#282828] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60">Visual Identity</div>
            <div className="invertible pointer-events-auto absolute top-[52%] left-[6%] bg-white/70 backdrop-blur-xl px-5 py-2 rounded-full font-bold text-xs text-[#282828] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60">Logo Design</div>
            <div className="invertible pointer-events-auto absolute top-[50%] right-[7%] bg-white/70 backdrop-blur-xl px-5 py-2 rounded-full font-bold text-xs text-[#282828] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60">Typography</div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[72vh] md:h-[77vh] flex justify-center items-end z-20 pointer-events-none">
          <img ref={imageRef} src={ceebanksImg} alt="CeeBanks"
            className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] scale-[1.15] md:scale-[1.25] origin-bottom" />
        </div>

        {/* Bottom Content */}
        <div className="relative z-40 w-full max-w-7xl mx-auto flex flex-col items-center pb-0 pointer-events-none px-4">
          <div className="relative w-full flex justify-center">
            <div ref={bubblesRef} className="absolute w-full h-full z-50 pointer-events-none">
              <div 
                className="invertible absolute z-50 -top-5 sm:-top-8 left-[8%] sm:left-[15%] lg:left-[22%] bg-white/90 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-[#282828] shadow-lg border border-black/5 hover:scale-105 transition-transform duration-200"
                style={{ transform: 'translate(12.5px, 34.1667px)' }}
              >
                Hello, my name is
              </div>
              <div 
                className="invertible absolute z-50 -top-8 sm:-top-12 right-[8%] sm:right-[15%] lg:right-[22%] bg-white/90 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-[#282828] shadow-lg border border-black/5 hover:scale-105 transition-transform duration-200"
                style={{ transform: 'translate(95.8333px, 53.3334px)' }}
              >
                Let's work together!
              </div>
            </div>

            <h2
              className="invertible pointer-events-auto text-[19vw] sm:text-[17vw] lg:text-[15.5vw] leading-[0.75] font-extrabold tracking-tighter text-center w-full font-grotesk"
              style={{
                background: 'linear-gradient(to bottom, #282828 30%, #28282855 70%, #28282800 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
              CeeBanks<span style={{
                background: 'linear-gradient(to bottom, #AD1D12 30%, #AD1D1255 70%, #AD1D1200 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* ── About Section ────────────────────────────────────────────────── */}
      <section ref={aboutSectionRef} id="about" className="relative w-full overflow-hidden bg-[#282828] pt-0 pb-16 lg:pb-24">
        {/* WebGL Fluid Cursor Trail */}
        <FluidCursor />
        
        {/* Grid lines background */}
        <div className="absolute inset-0 pointer-events-none border border-white/5 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] z-0"></div>

        {/* ── Inverted CeeBanks Text ─────────────────────────────────────────── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center px-4 mt-0 mb-12 sm:mb-16 lg:mb-24 pointer-events-none">
          <h2 className="text-[19vw] sm:text-[17vw] lg:text-[15.5vw] leading-[0.75] font-extrabold tracking-tighter text-center w-full font-grotesk text-[#F7E9E8]">
            CeeBanks<span className="text-[#AD1D12]">.</span>
          </h2>
        </div>

        {/* ── Intro / Nuggets 3 ────────────────────────────────────────────── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24 lg:mb-32">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 md:gap-16 items-center">
            
            {/* Left: Profile Image */}
            <div className="relative max-w-[240px] md:max-w-[280px] mx-auto md:mx-0 w-full">
              <div className="aspect-square w-full overflow-hidden rounded-sm bg-[#1a1a1a]">
                <img src={ceebanksImg} alt="CeeBanks Profile" className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 ease-out" />
              </div>
              {/* Signature overlay */}
              <div className="absolute -top-5 -left-4 md:-left-8 text-[#AD1D12] font-serif italic text-4xl sm:text-5xl -rotate-12 drop-shadow-lg z-20 pointer-events-none tracking-tight">
                CeeBanks
              </div>
            </div>
            
            {/* Right: Text */}
            <div className="relative w-full">
              {/* Background Text (Faded) */}
              <div className="flex flex-col gap-6 md:gap-8 text-[#F7E9E8]/30">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2] font-medium tracking-tight">
                  I explore how to shape timeless brand identities with strategic craft and taste, building the visual foundations for tomorrow's leading businesses.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-light">
                  I focus on <span className="underline decoration-white/20 underline-offset-4 cursor-pointer">Brand Strategy</span>, and previously crafted visual systems for <span className="underline decoration-white/20 underline-offset-4 cursor-pointer">innovative startups</span>, <span className="underline decoration-white/20 underline-offset-4 cursor-pointer">creative agencies</span>, and ambitious founders.<span className="inline-block w-2.5 h-2.5 bg-[#AD1D12]/30 ml-1 mb-0.5"></span>
                </p>
              </div>

              {/* Foreground Text (Revealed on Scroll) */}
              <div ref={aboutTextRef} className="absolute inset-0 flex flex-col gap-6 md:gap-8 text-[#F7E9E8]" style={{ clipPath: 'inset(0 0 100% 0)' }}>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.2] font-medium tracking-tight">
                  I explore how to shape timeless brand identities with <span className="bg-[#AD1D12] text-[#F7E9E8]">strategic</span> craft and taste, building the visual foundations for tomorrow's leading businesses.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-light text-[#F7E9E8]/90">
                  I focus on <span className="underline decoration-white/50 underline-offset-4 hover:text-white hover:decoration-white transition-colors cursor-pointer">Brand Strategy</span>, and previously crafted visual systems for <span className="underline decoration-white/50 underline-offset-4 hover:text-white hover:decoration-white transition-colors cursor-pointer">innovative startups</span>, <span className="underline decoration-white/50 underline-offset-4 hover:text-white hover:decoration-white transition-colors cursor-pointer">creative agencies</span>, and ambitious founders.<span className="inline-block w-2.5 h-2.5 bg-[#AD1D12] ml-1 mb-0.5"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Text Scroll ─────────────────────────────────────────── */}
      <AboutTextScroll />

      {/* ── How It Works Scroll ──────────────────────────────────────── */}
      <HowItWorksScroll />
      
      </main>

      {/* ── Ascii Footer ────────────────────────────────────────────────── */}
      <AsciiFooter />



    </div>
  );
}
