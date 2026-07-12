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
    // Hide nav when reaching the footer
    const st = ScrollTrigger.create({
      trigger: "main",
      start: "bottom 90%", // when the bottom of main is near the bottom of viewport
      onEnter: () => {
        if (navRef.current) gsap.to(navRef.current, { y: -100, opacity: 0, duration: 0.3, ease: 'power2.out' });
      },
      onLeaveBack: () => {
        if (navRef.current) gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
      }
    });

    return () => st.kill();
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
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
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
      <div ref={navRef} className="fixed top-3 left-1/2 -translate-x-1/2 z-50 max-w-7xl w-full px-4 sm:px-6 will-change-transform">
        <header className="w-full px-6 py-3 rounded-2xl flex items-center justify-between backdrop-blur-xl border border-black/10 bg-white/10 text-[#282828] shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('Home')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#282828] p-[1.5px] shadow-[0_4px_20px_rgba(40,40,40,0.15)] transition-transform duration-200 active:scale-[0.97]">
              <div className="w-full h-full bg-[#282828] rounded-[10px] flex items-center justify-center">
                <span className="font-grotesk font-extrabold text-lg tracking-tighter text-[#F7E9E8]">CB</span>
              </div>
            </div>
            <span className="font-grotesk font-bold tracking-tight text-lg hidden sm:inline-block">CeeBanks</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {['Home', 'About', 'Portfolio', 'Services', 'FAQ', 'Contact'].map((item) => (
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
              className="px-6 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-[background,color,transform] duration-200 ease-out active:scale-[0.97] border cursor-pointer border-[#282828] text-[#F7E9E8] bg-[#282828] hover:bg-[#282828]/80 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
              Get In Touch
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-black/5 cursor-pointer text-[#282828] active:scale-[0.97] transition-transform duration-200 ease-out">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>
      </div>

      {mobileMenuOpen && (
        <div className="fixed top-20 left-0 w-full z-40 px-4 sm:px-6 md:hidden animate-in fade-in slide-in-from-top duration-200">
          <div className="w-full px-6 py-4 rounded-xl backdrop-blur-xl border bg-[#282828]/95 border-[#F7E9E8]/10 shadow-xl shadow-black/30">
            <div className="flex flex-col gap-4 py-2">
              {['Home', 'About', 'Portfolio', 'Services', 'FAQ', 'Contact'].map((item) => (
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
      <section id="home" onDoubleClick={handleDoubleClick} className="relative w-full h-screen flex flex-col items-center justify-end overflow-hidden bg-[#F7E9E8] rounded-b-[40px] shadow-2xl z-20 select-none touch-manipulation">

        {/* WebGL Fluid Cursor Trail */}
        <FluidCursor />

        {/* Background BRAND DESIGNER watermark */}
        <div
          className="invertible absolute left-1/2 pointer-events-auto select-none z-0 flex flex-col items-center justify-center w-full"
          style={{ top: '52%', transform: 'translateX(-50%) translateY(-50%)' }}
        >
          <div ref={watermarkRef} className="flex flex-col items-center justify-center w-full">
            <h1 className="text-[22vw] font-black tracking-[-0.04em] text-[#282828]/[0.06] whitespace-nowrap font-grotesk leading-[0.85]">BRAND</h1>
            <h1 className="text-[22vw] font-black tracking-[-0.04em] text-[#282828]/[0.06] whitespace-nowrap font-grotesk leading-[0.85]">DESIGNER</h1>
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
              <div style={{ transform: 'translateX(38.666656px) translateY(34.666626px)' }}
                className="invertible absolute -top-5 sm:-top-8 left-[8%] sm:left-[15%] lg:left-[22%] bg-white/90 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-[#282828] shadow-lg border border-black/5 pointer-events-auto">
                Hello, my name is
              </div>
              <div style={{ transform: 'translateX(108.666687px) translateY(52.666626px)' }}
                className="invertible absolute -top-8 sm:-top-12 right-[8%] sm:right-[15%] lg:right-[22%] bg-white/90 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-[#282828] shadow-lg border border-black/5 pointer-events-auto">
                Let's work together!
              </div>
            </div>
            <h2
              className="invertible pointer-events-auto text-[19vw] sm:text-[17vw] lg:text-[15.5vw] leading-[0.75] font-extrabold tracking-tighter text-center w-full font-grotesk"
              style={{
                background: 'linear-gradient(to bottom, #282828 30%, #28282855 70%, #28282800 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
              CeeBanks
            </h2>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTIONS BELOW HERO - Dark background
         ══════════════════════════════════════════════════════════════════ */}

      {/* ── About / Case Study ──────────────────────────────────────────── */}
      <section id="about" className="relative py-28 sm:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
              {/* Left: headline + stats */}
              <div className="single-reveal space-y-8">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#AD1D12]">Case Study</p>
                <SectionHeading className="text-4xl sm:text-5xl lg:text-6xl" italicWord="activation">
                  Powering activation from first click.
                </SectionHeading>
                <p className="text-[#F7E9E8]/60 text-base leading-relaxed max-w-lg">
                  CeeBanks' redesign strategy was clarifying, composed with a clear hierarchy,
                  simpler navigation, and a cleaner dashboard for faster activation and better experience.
                </p>
                <div className="flex gap-10 pt-2">
                  <div>
                    <div className="font-grotesk font-bold text-3xl sm:text-4xl text-[#F7E9E8]">
                      <StatCounter target={5.6} suffix="M+" className="" />
                    </div>
                    <p className="text-[#F7E9E8]/40 text-xs mt-1">Branded Reach</p>
                  </div>
                  <div>
                    <div className="font-grotesk font-bold text-3xl sm:text-4xl text-[#F7E9E8]">
                      <StatCounter target={97} suffix="%" className="" />
                    </div>
                    <p className="text-[#F7E9E8]/40 text-xs mt-1">Client Satisfaction</p>
                  </div>
                </div>
              </div>

              {/* Right: testimonial card */}
              <div className="single-reveal">
                <TiltCard className="rounded-2xl border border-[#F7E9E8]/10 bg-[#F7E9E8]/[0.03] p-8 sm:p-10 backdrop-blur-sm">
                  <div className="space-y-6">
                    <span className="text-[#AD1D12] text-5xl font-serif leading-none">&ldquo;</span>
                    <p className="text-[#F7E9E8]/80 text-base leading-relaxed -mt-4">
                      The redesign greatly improved usability and engagement. The process was structured,
                      collaborative, and detail-oriented. Our conversion rates went up 40% in the first month.
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#AD1D12] to-[#F7E9E8]/30 flex items-center justify-center text-sm font-bold">
                        SB
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Sophie Barrett</p>
                        <p className="text-[#F7E9E8]/40 text-xs">Product Designer at Thompson</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Divider */}
      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-[#F7E9E8]/10 to-transparent" />

      {/* ── Social Proof / Stats ────────────────────────────────────────── */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center">
          <ScrollReveal>
            <p className="single-reveal text-xs font-semibold tracking-[0.2em] uppercase text-[#AD1D12] mb-6">Testimonials</p>
            <div className="single-reveal">
              <SectionHeading className="text-4xl sm:text-5xl lg:text-7xl text-center mx-auto max-w-3xl">
                250+ clients. Countless wins.
              </SectionHeading>
            </div>
            <p className="single-reveal text-[#F7E9E8]/50 text-base mt-6 max-w-xl mx-auto leading-relaxed">
              Empowering founders and teams globally to turn bold ideas into brands people remember and markets reward.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Divider */}
      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-[#F7E9E8]/10 to-transparent" />

      {/* ── Portfolio / Featured Projects ───────────────────────────────── */}
      <section id="portfolio" className="relative py-28 sm:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <ScrollReveal>
            <p className="single-reveal text-xs font-semibold tracking-[0.2em] uppercase text-[#AD1D12] mb-6">Portfolio</p>
            <div className="single-reveal mb-6">
              <SectionHeading className="text-4xl sm:text-5xl lg:text-6xl" italicWord="Featured">
                Featured projects you'll love.
              </SectionHeading>
            </div>
            <p className="single-reveal text-[#F7E9E8]/50 text-base max-w-xl leading-relaxed mb-16">
              A selection of projects focused on clarity, usability, and meaningful, lasting positive impact worldwide.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((p) => (
                <div key={p.title} className="reveal-card group">
                  <TiltCard className="rounded-2xl border border-[#F7E9E8]/10 bg-[#F7E9E8]/[0.03] overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-semibold tracking-wide text-white/90">
                          {p.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-grotesk font-bold text-lg">{p.title}</h3>
                        <ArrowUpRight className="w-4 h-4 text-[#F7E9E8]/30 group-hover:text-[#AD1D12] transition-colors duration-300" />
                      </div>
                      <p className="text-[#F7E9E8]/50 text-sm">{p.desc}</p>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Marquee */}
          <div className="mt-20">
            <Marquee />
          </div>
        </div>
      </section>

      {/* ── Divider */}
      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-[#F7E9E8]/10 to-transparent" />

      {/* ── Services ────────────────────────────────────────────────────── */}
      <section id="services" className="relative py-28 sm:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-10 items-end mb-16">
              <div className="single-reveal">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#AD1D12] mb-6">Services</p>
                <SectionHeading className="text-4xl sm:text-5xl lg:text-6xl" italicWord="life.">
                  How I can help bring ideas to life.
                </SectionHeading>
              </div>
              <p className="single-reveal text-[#F7E9E8]/50 text-base leading-relaxed">
                Focused solutions to design better products and meaningful user experiences daily.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((s) => (
                <div key={s.title} className="reveal-card group">
                  <TiltCard className="rounded-2xl border border-[#F7E9E8]/8 bg-[#F7E9E8]/[0.03] p-7 hover:border-[#AD1D12]/20 transition-colors duration-500">
                    <div className="space-y-4">
                      <div className="w-11 h-11 rounded-xl bg-[#AD1D12]/10 flex items-center justify-center group-hover:bg-[#AD1D12]/20 transition-colors duration-300">
                        <s.icon className="w-5 h-5 text-[#AD1D12]" />
                      </div>
                      <h3 className="font-grotesk font-bold text-lg">{s.title}</h3>
                      <p className="text-[#F7E9E8]/50 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Divider */}
      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-[#F7E9E8]/10 to-transparent" />

      {/* ── Process ─────────────────────────────────────────────────────── */}
      <section className="relative py-28 sm:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
              {/* Left */}
              <div className="single-reveal space-y-8">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#AD1D12]">How I Work</p>
                <SectionHeading className="text-4xl sm:text-5xl lg:text-6xl" italicWord="done.">
                  See how I get things done.
                </SectionHeading>
                <p className="text-[#F7E9E8]/50 text-base leading-relaxed max-w-md">
                  A structured approach to delivering clear and effective design solutions every time.
                </p>
              </div>

              {/* Right - steps */}
              <div className="space-y-0">
                {PROCESS_STEPS.map((step, i) => (
                  <div key={step.title} className="single-reveal flex gap-5 py-5 border-b border-[#F7E9E8]/8 group cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-[#AD1D12]/10 flex items-center justify-center shrink-0 group-hover:bg-[#AD1D12] transition-colors duration-300">
                      <span className="text-[#AD1D12] font-grotesk font-bold text-xs group-hover:text-[#F7E9E8] transition-colors duration-300">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-grotesk font-bold text-base group-hover:text-[#AD1D12] transition-colors duration-200">{step.title}</h4>
                      <p className="text-[#F7E9E8]/40 text-sm mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Quote card */}
          <ScrollReveal>
            <div className="single-reveal mt-20 max-w-xl ml-auto">
              <TiltCard className="rounded-2xl border border-[#F7E9E8]/10 bg-[#F7E9E8]/[0.03] p-8">
                <p className="text-[#F7E9E8]/70 text-base leading-relaxed italic">
                  "Great design is rarely accidental. It comes from clarity, structure, and thoughtful iteration."
                </p>
                <p className="text-[#F7E9E8]/30 text-sm mt-4">- CeeBanks</p>
              </TiltCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Divider */}
      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-[#F7E9E8]/10 to-transparent" />

      {/* ── What Sets Me Apart ──────────────────────────────────────────── */}
      <section className="relative py-28 sm:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
              <div className="single-reveal space-y-6">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#AD1D12]">Advantages</p>
                <SectionHeading className="text-4xl sm:text-5xl lg:text-6xl" italicWord="apart.">
                  What sets me apart.
                </SectionHeading>
                <p className="text-[#F7E9E8]/50 text-base leading-relaxed max-w-md">
                  A system-driven workflow to reduce delays, improve consistency,
                  and help teams execute ideas efficiently.
                </p>
              </div>

              <div className="space-y-4">
                {ADVANTAGES.map((a) => (
                  <div key={a.label} className="single-reveal flex items-center justify-between py-4 px-5 rounded-xl border border-[#F7E9E8]/8 bg-[#F7E9E8]/[0.02] group hover:border-[#AD1D12]/20 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-[#AD1D12]" />
                      <span className="font-medium text-sm sm:text-base">{a.label}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#AD1D12]/10 text-[#AD1D12] text-xs font-bold">
                      +{a.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Divider */}
      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-[#F7E9E8]/10 to-transparent" />

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="relative py-28 sm:py-36">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <ScrollReveal>
            <p className="single-reveal text-xs font-semibold tracking-[0.2em] uppercase text-[#AD1D12] mb-6">FAQ</p>
            <div className="single-reveal mb-14">
              <SectionHeading className="text-4xl sm:text-5xl lg:text-6xl">
                Questions? Answers.
              </SectionHeading>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={0.08}>
            <div>
              {FAQS.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Divider */}
      <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-[#F7E9E8]/10 to-transparent" />

      {/* ── Contact / CTA ───────────────────────────────────────────────── */}
      <section id="contact" className="relative py-28 sm:py-36">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
          <ScrollReveal>
            <p className="single-reveal text-xs font-semibold tracking-[0.2em] uppercase text-[#AD1D12] mb-6">Get In Touch</p>
            <div className="single-reveal">
              <SectionHeading className="text-4xl sm:text-5xl lg:text-7xl text-center mx-auto">
                Let's create something amazing together.
              </SectionHeading>
            </div>
            <p className="single-reveal text-[#F7E9E8]/50 text-base mt-6 max-w-lg mx-auto leading-relaxed">
              Ready to elevate your brand? Let's talk about your next project and bring your vision to life.
            </p>
            <div className="single-reveal flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a href="mailto:hello@ceebanks.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#AD1D12] hover:bg-[#AD1D12]/90 text-[#F7E9E8] font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#AD1D12]/20 hover:shadow-[#AD1D12]/30 active:scale-[0.98]">
                <Mail className="w-4 h-4" />
                Start a Project
              </a>
              <a href="mailto:hello@ceebanks.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#F7E9E8]/15 text-[#F7E9E8] font-semibold text-sm hover:bg-[#F7E9E8]/5 transition-all duration-300 active:scale-[0.98]">
                hello@ceebanks.com
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>

          {/* Social links */}
          <ScrollReveal>
            <div className="single-reveal flex justify-center gap-4 mt-14">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-11 h-11 rounded-xl border border-[#F7E9E8]/10 flex items-center justify-center text-[#F7E9E8]/40 hover:text-[#AD1D12] hover:border-[#AD1D12]/30 transition-all duration-300">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#F7E9E8]/8 py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#AD1D12] flex items-center justify-center">
              <span className="font-grotesk font-extrabold text-xs text-[#F7E9E8]">CB</span>
            </div>
            <span className="font-grotesk font-bold text-sm tracking-tight">CeeBanks</span>
          </div>
          <div className="flex items-center gap-8 text-[#F7E9E8]/30 text-xs">
            {['Home', 'About', 'Portfolio', 'Services', 'FAQ', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item)}
                className="hover:text-[#F7E9E8]/60 transition-colors duration-200 cursor-pointer">
                {item}
              </button>
            ))}
          </div>
          <p className="text-[#F7E9E8]/20 text-xs">&copy; 2026 CeeBanks. All rights reserved.</p>
        </div>
      </footer>
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
