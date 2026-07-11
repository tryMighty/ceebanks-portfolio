import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import ceebanksImg from '../ceebanks.png';
import { NoodleProvider, NoodleTrigger, NoodleOverlay } from './NoodleTransition';

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

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <NoodleProvider>
    <div className="min-h-screen bg-[#282828] text-[#F7E9E8] transition-colors duration-300 antialiased relative flex flex-col selection:bg-[#AD1D12] selection:text-[#F7E9E8] overflow-x-hidden">

      {/* Top Header / Navbar */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-40 max-w-7xl w-full px-4 sm:px-6">
        <header className="w-full px-6 py-3 rounded-2xl flex items-center justify-between backdrop-blur-xl border border-black/10 bg-white/10 text-[#282828] transition-all duration-300">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('Home')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#AD1D12] to-[#F7E9E8] p-[1.5px] shadow-[0_0_25px_rgba(173,29,18,0.45)]">
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
                  activeTab === item
                    ? 'text-[#282828] font-bold'
                    : 'text-[#282828]/60 hover:text-[#282828]'
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
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-black/5 cursor-pointer">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden relative z-30 px-6 py-4 mx-4 mt-2 rounded-xl backdrop-blur-xl border bg-[#282828]/95 border-[#F7E9E8]/10 shadow-lg shadow-black/30 animate-in fade-in slide-in-from-top duration-200">
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
      )}

      <NoodleOverlay />

      <div className="relative z-10 w-full flex flex-col gap-24 lg:gap-36">

        {/* Section 1: Hero Section */}
        <NoodleTrigger id="home" className="relative z-10 w-full min-h-[100vh] flex flex-col items-center justify-end overflow-hidden bg-[#F7E9E8] rounded-b-[40px] pt-32 shadow-2xl">
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 mt-20">
              <h1 className="hero-bg-text text-[16vw] font-bold tracking-tighter text-[#282828]/5 whitespace-nowrap font-grotesk">DESIGNER</h1>
           </div>
           
           <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-end h-full mt-10 px-4">
              <div className="absolute inset-0 pointer-events-none hidden md:block z-10">
                 <div className="tag-anim absolute top-[30%] left-[20%] bg-white/60 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium text-[#282828] shadow-sm border border-black/5">Web Design</div>
                 <div className="tag-anim absolute top-[50%] left-[15%] bg-white/60 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium text-[#282828] shadow-sm border border-black/5">Branding</div>
                 <div className="tag-anim absolute top-[70%] left-[22%] bg-white/60 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium text-[#282828] shadow-sm border border-black/5">3D Motion</div>
                 
                 <div className="tag-anim absolute top-[30%] right-[20%] bg-white/60 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium text-[#282828] shadow-sm border border-black/5">App Design</div>
                 <div className="tag-anim absolute top-[50%] right-[15%] bg-white/60 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium text-[#282828] shadow-sm border border-black/5">Illustration</div>
                 <div className="tag-anim absolute top-[70%] right-[22%] bg-white/60 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium text-[#282828] shadow-sm border border-black/5">Logo Design</div>
              </div>

              <div className="hero-img-wrap relative z-20 flex justify-center items-end h-[75vh] md:h-[85vh] w-full max-w-5xl mx-auto">
                 <img src={ceebanksImg} alt="CeeBanks" className="h-full w-auto object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)] grayscale contrast-125 brightness-95 scale-110 md:scale-125 origin-bottom" />
              </div>

              <div className="absolute bottom-16 sm:bottom-20 w-full flex flex-col items-center z-30 pointer-events-none">
                 <div className="flex justify-between w-full max-w-5xl px-4 sm:px-12 mb-[-1.5rem] relative z-40">
                    <div className="tag-anim bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-xs sm:text-sm font-medium text-[#282828] shadow-md border border-black/5 -rotate-2">Hello, my name is</div>
                    <div className="tag-anim bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-xs sm:text-sm font-medium text-[#282828] shadow-md border border-black/5 rotate-2">Let's work together!</div>
                 </div>
                 <h2 className="hero-name text-[14vw] sm:text-[15vw] leading-[0.8] font-bold tracking-tighter text-[#282828] text-center w-full drop-shadow-xl font-grotesk mix-blend-normal z-30">
                    CeeBanks
                 </h2>
              </div>
           </div>
        </NoodleTrigger>
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
    </NoodleProvider>
  );
}
