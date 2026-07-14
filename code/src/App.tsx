import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sparkles, Globe, Palette, Smartphone, PenTool, Box, Layers, ArrowUpRight, Mail, Instagram, Twitter, Linkedin, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ceebanksImg from '../ceebanks.png';
import elanImg from '../assets/elan-collective.jpg';
import bloomImg from '../assets/bloom-illustrations.jpg';
import techImg from '../assets/tech-startup.jpg';

import { ScrollReveal } from './components/ScrollReveal';
import { TiltCard } from './components/TiltCard';
import { StatCounter } from './components/StatCounter';
import { FAQItem } from './components/FAQItem';
import { Marquee } from './components/Marquee';
import { SectionHeading } from './components/SectionHeading';
import { AsciiFooter } from './components/AsciiFooter';
import { TryoutSection } from './components/TryoutSection';
import { FluidCursor } from './components/FluidCursor';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────────────────────── */
const SERVICES = [
  { icon: Globe, title: 'Web Design', desc: 'Designing modern, responsive websites with clean visuals and UX.' },
  { icon: Smartphone, title: 'App Design', desc: 'Creating intuitive mobile and web interfaces that are easy to use.' },
  { icon: Palette, title: 'Branding', desc: 'Building visual identities that clearly and consistently represent brands.' },
  { icon: PenTool, title: 'Illustration', desc: 'Creating custom visuals that add personality and visual storytelling.' },
  { icon: Box, title: '3D Motion', desc: 'Designing 3D visuals and motion to add depth and energy.' },
  { icon: Layers, title: 'Logo Design', desc: 'Crafting unique logos that clearly express your unique brand.' },
];

const PROCESS_STEPS = [
  { title: 'Discover', desc: 'Understanding goals, users, and challenges.' },
  { title: 'Define', desc: 'Structuring flows and defining direction.' },
  { title: 'Design', desc: 'Creating intuitive and refined solutions.' },
  { title: 'Refine', desc: 'Iterating through feedback and testing.' },
  { title: 'Deliver', desc: 'Producing polished, ready-for-use assets.' },
];

const ADVANTAGES = [
  { label: 'Faster delivery', pct: 87, color: '#AD1D12' },
  { label: 'More automated', pct: 82, color: '#AD1D12' },
  { label: 'Reduced revision cycles', pct: 76, color: '#AD1D12' },
  { label: 'Consistent on all screen', pct: 70, color: '#AD1D12' },
  { label: 'Designed for growth', pct: 58, color: '#AD1D12' },
];

const FAQS = [
  { q: 'What is your typical project timeline?', a: 'Most branding and web design projects take 4-8 weeks from kickoff to delivery. Timelines vary based on scope, but I always provide a detailed schedule upfront so you know exactly what to expect.' },
  { q: 'How does your pricing work?', a: 'I offer project-based pricing tailored to your needs. After an initial consultation, I provide a detailed proposal with transparent costs. No hidden fees, no hourly surprises.' },
  { q: 'What does your design process look like?', a: 'My process follows five stages: Discover, Define, Design, Refine, and Deliver. Each phase includes checkpoints so you stay involved and informed throughout the journey.' },
  { q: 'How many revisions are included?', a: 'Each project includes 2-3 rounds of revisions at key milestones. My collaborative approach means we align early, so major reworks are rare. Additional rounds can be arranged if needed.' },
  { q: 'What deliverables will I receive?', a: 'You receive all source files, exported assets, brand guidelines (for branding projects), and developer-ready specs. Everything is organized and clearly labeled for your team.' },
  { q: 'Do you work with international clients?', a: 'Absolutely. I work with clients globally across different time zones. Communication happens async through structured updates, with live calls scheduled at mutually convenient times.' },
];

const PROJECTS = [
  { title: 'Elan Collective', desc: 'Minimal identity for a luxury fashion brand.', img: elanImg, tag: 'Branding' },
  { title: 'Bloom Illustrations', desc: 'Creative illustrations crafted for modern digital products.', img: bloomImg, tag: 'Illustration' },
  { title: 'NovaTech Dashboard', desc: 'UI/UX design for a tech analytics platform.', img: techImg, tag: 'UI/UX' },
];

/* ─── App ───────────────────────────────────────────────────────────────── */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [showDemoModal, setShowDemoModal] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  
  const imageRef = useRef<HTMLImageElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const isParallaxActive = useRef(true);

  useEffect(() => {
    // Nav hiding logic removed since nav is no longer fixed
  }, []);

  /* Lenis smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
    return () => lenis.destroy();
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
      
      <main className="relative z-10 bg-[#282828] overflow-hidden">
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
      <section id="home" onDoubleClick={handleDoubleClick} className="relative w-full h-[85svh] lg:h-[100svh] flex flex-col items-center justify-end overflow-hidden bg-[#F7E9E8] rounded-b-[30px] lg:rounded-b-[40px] shadow-2xl z-20 select-none touch-manipulation">

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

      {/* ── Tryout Section ──────────────────────────────────────────────── */}
      <TryoutSection />
      
      </main>

      {/* ── Ascii Footer ────────────────────────────────────────────────── */}
      <AsciiFooter />

      {/* ── Demo Modal ───────────────────────────────────────────────────── */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#282828]/95 text-[#F7E9E8] border border-[#F7E9E8]/10 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F7E9E8]/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#AD1D12] animate-pulse" />
                <h3 className="font-grotesk font-bold text-xl">{showDemoModal}</h3>
              </div>
              <button onClick={() => setShowDemoModal(null)}
                className="p-1 rounded-lg text-[#F7E9E8]/50 hover:text-[#F7E9E8] hover:bg-[#F7E9E8]/5 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-[#F7E9E8]/80">
              You clicked on <strong className="text-[#AD1D12]">{showDemoModal}</strong>.
            </p>
            <button onClick={() => setShowDemoModal(null)}
              className="w-full py-3.5 bg-[#AD1D12] hover:bg-[#AD1D12]/90 text-[#F7E9E8] font-semibold rounded-xl text-sm transition-all shadow-lg shadow-[#AD1D12]/20 cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
