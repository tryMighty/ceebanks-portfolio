import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import ceebanksImg from '../ceebanks.png';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [showDemoModal, setShowDemoModal] = useState<string | null>(null);

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

  return (
    <div className="h-screen overflow-hidden bg-[#282828] text-[#F7E9E8] transition-colors duration-300 antialiased relative flex flex-col selection:bg-[#AD1D12] selection:text-[#F7E9E8] overflow-x-hidden">

      {/* Top Header / Navbar */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 max-w-7xl w-full px-4 sm:px-6">
        <header className="w-full px-6 py-3 rounded-2xl flex items-center justify-between backdrop-blur-xl border border-black/10 bg-white/10 text-[#282828] shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('Home')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#AD1D12] to-[#F7E9E8] p-[1.5px] shadow-[0_0_20px_rgba(173,29,18,0.3)]">
              <div className="w-full h-full bg-[#AD1D12] rounded-[10px] flex items-center justify-center">
                <span className="font-grotesk font-extrabold text-lg tracking-tighter text-[#F7E9E8]">CB</span>
              </div>
            </div>
            <span className="font-grotesk font-bold tracking-tight text-lg hidden sm:inline-block">CeeBanks</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {['Home', 'About', 'Portfolio', 'Services', 'FAQ', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  activeTab === item ? 'text-[#282828] font-bold' : 'text-[#282828]/60 hover:text-[#282828]'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowDemoModal('Get In Touch')}
              className="px-6 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 active:scale-95 border cursor-pointer border-[#282828] text-[#F7E9E8] bg-[#282828] hover:bg-[#282828]/80 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              Get In Touch
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-black/5 cursor-pointer text-[#282828]">
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
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-left text-base font-medium py-1.5 cursor-pointer ${
                    activeTab === item ? 'text-[#AD1D12]' : 'text-[#F7E9E8]/65'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Section 1: Hero Section */}
        <section id="home" className="relative w-full h-full flex flex-col items-center justify-end overflow-hidden bg-[#F7E9E8] rounded-b-[40px] shadow-2xl z-20">

          {/* Background Text */}
          <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-full flex flex-col items-center justify-center scale-y-[0.7] -space-y-2 sm:-space-y-4 lg:-space-y-6">
            <h1 className="text-[28vw] sm:text-[26vw] lg:text-[22vw] leading-none font-extrabold tracking-tighter text-[#282828]/5 whitespace-nowrap font-grotesk">BRAND</h1>
            <h1 className="text-[28vw] sm:text-[26vw] lg:text-[22vw] leading-none font-extrabold tracking-tighter text-[#282828]/5 whitespace-nowrap font-grotesk">DESIGNER</h1>
          </div>

          {/* Floating Skill Tags */}
          <div className="absolute inset-0 z-30 pointer-events-none flex justify-center">
            <div className="relative w-full max-w-5xl h-full hidden md:block">
              <div style={{ transform: 'translateX(24px) translateY(96px)' }} className="absolute top-[25%] left-[20%] bg-white/70 backdrop-blur-xl px-6 py-3 rounded-full font-bold text-sm text-[#282828] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60">
                Web Design
              </div>
              <div style={{ transform: 'translateX(-82.6667px) translateY(-43.3333px)' }} className="absolute top-[22%] right-[22%] bg-white/70 backdrop-blur-xl px-6 py-3 rounded-full font-bold text-sm text-[#282828] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60">
                Branding
              </div>
              <div style={{ transform: 'translateX(190px) translateY(-158.667px)' }} className="absolute top-[40%] left-[12%] bg-white/70 backdrop-blur-xl px-6 py-3 rounded-full font-bold text-sm text-[#282828] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60">
                3D Motion
              </div>
              <div style={{ transform: 'translateX(-64px) translateY(8.66669px)' }} className="absolute top-[38%] right-[15%] bg-white/70 backdrop-blur-xl px-6 py-3 rounded-full font-bold text-sm text-[#282828] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60">
                App Design
              </div>
              <div style={{ transform: 'translateX(162.667px) translateY(56px)' }} className="absolute top-[55%] left-[18%] bg-white/70 backdrop-blur-xl px-6 py-3 rounded-full font-bold text-sm text-[#282828] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60">
                Illustration
              </div>
              <div style={{ transform: 'translateX(-201.333px) translateY(77.3334px)' }} className="absolute top-[52%] right-[12%] bg-white/70 backdrop-blur-xl px-6 py-3 rounded-full font-bold text-sm text-[#282828] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60">
                Logo Design
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[72vh] md:h-[77vh] flex justify-center items-end z-20 pointer-events-none">
            <img src={ceebanksImg} alt="CeeBanks" className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)] grayscale contrast-125 brightness-95 scale-[1.15] md:scale-[1.25] origin-bottom" />
          </div>

          {/* Bottom Content overlay */}
          <div className="relative z-40 w-full max-w-7xl mx-auto flex flex-col items-center pb-0 pointer-events-none px-4">
            <div className="relative w-full flex justify-center">

              {/* Greeting - Hello */}
              <div
                style={{ transform: 'translateX(38.666656494140625px) translateY(34.6666259765625px)' }}
                className="absolute -top-5 sm:-top-8 left-[8%] sm:left-[15%] lg:left-[22%] bg-white/90 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-[#282828] shadow-lg border border-black/5 z-50"
              >
                Hello, my name is
              </div>

              {/* Greeting - Let's work */}
              <div
                style={{ transform: 'translateX(108.66668701171875px) translateY(52.6666259765625px)' }}
                className="absolute -top-8 sm:-top-12 right-[8%] sm:right-[15%] lg:right-[22%] bg-white/90 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-[#282828] shadow-lg border border-black/5 z-50"
              >
                Let's work together!
              </div>

              <h2 className="text-[19vw] sm:text-[17vw] lg:text-[15.5vw] leading-[0.75] font-extrabold tracking-tighter text-[#282828] text-center w-full font-grotesk mix-blend-normal">
                CeeBanks
              </h2>
            </div>
          </div>

        </section>
      </div>

      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#282828]/95 text-[#F7E9E8] border border-[#F7E9E8]/10 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F7E9E8]/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#AD1D12] animate-pulse" />
                <h3 className="font-grotesk font-bold text-xl">{showDemoModal}</h3>
              </div>
              <button
                onClick={() => setShowDemoModal(null)}
                className="p-1 rounded-lg text-[#F7E9E8]/50 hover:text-[#F7E9E8] hover:bg-[#F7E9E8]/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-[#F7E9E8]/80">
              You clicked on <strong className="text-[#AD1D12]">{showDemoModal}</strong>.
            </p>
            <button
              onClick={() => setShowDemoModal(null)}
              className="w-full py-3.5 bg-[#AD1D12] hover:bg-[#AD1D12]/90 text-[#F7E9E8] font-semibold rounded-xl text-sm transition-all shadow-lg shadow-[#AD1D12]/20 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
