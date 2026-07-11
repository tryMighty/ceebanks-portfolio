import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Sparkles, Move, Maximize2 } from 'lucide-react';
import ceebanksImg from '../ceebanks.png';

// ─── Locked positions from captain ───────────────────────────────────────────
const INITIAL = {
  'web-design':   { x: 24,          y: 96,          scale: 1 },
  'branding':     { x: -82.6667,    y: -43.3333,    scale: 1 },
  '3d-motion':    { x: 190,         y: -158.667,    scale: 1 },
  'app-design':   { x: -64,         y: 8.66669,     scale: 1 },
  'illustration': { x: 162.667,     y: 56,          scale: 1 },
  'logo-design':  { x: -201.333,    y: 77.3334,     scale: 1 },
  'hello':        { x: 38.666656,   y: 34.666626,   scale: 1 },
  'lets-work':    { x: 108.666687,  y: 52.666626,   scale: 1 },
  'ceebanks-text':{ x: 0,           y: 0,           scale: 1 },
  'brand-text':   { x: 0,           y: 0,           scaleY: 0.7, fontSize: 28 },
};

const SKILL_TAGS = [
  { id: 'web-design',   label: 'Web Design',   top: '25%', left: '20%' },
  { id: 'branding',     label: 'Branding',     top: '22%', right: '22%' },
  { id: '3d-motion',    label: '3D Motion',    top: '40%', left: '12%' },
  { id: 'app-design',   label: 'App Design',   top: '38%', right: '15%' },
  { id: 'illustration', label: 'Illustration', top: '55%', left: '18%' },
  { id: 'logo-design',  label: 'Logo Design',  top: '52%', right: '12%' },
];

type State = { x: number; y: number; scale?: number; scaleY?: number; fontSize?: number };

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [showDemoModal, setShowDemoModal] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const state = useRef<Record<string, State>>(
    Object.fromEntries(Object.entries(INITIAL).map(([k, v]) => [k, { ...v }]))
  );
  const [, forceRender] = useState(0);
  const rerender = () => forceRender(n => n + 1);

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

  const getState = (id: string): State => state.current[id] ?? { x: 0, y: 0, scale: 1 };

  const updateState = (id: string, patch: Partial<State>) => {
    state.current[id] = { ...getState(id), ...patch };
    rerender();
  };

  const getCoordinates = () => {
    const coords = Object.entries(state.current).map(([id, s]) => ({
      id,
      x: Math.round(s.x * 100) / 100,
      y: Math.round(s.y * 100) / 100,
      ...(s.scale !== undefined && s.scale !== 1 ? { scale: s.scale } : {}),
      ...(s.scaleY !== undefined ? { scaleY: s.scaleY } : {}),
      ...(s.fontSize !== undefined ? { fontSize: s.fontSize } : {}),
    }));
    const json = JSON.stringify(coords, null, 2);
    navigator.clipboard.writeText(json);
    alert('All coordinates + sizes copied! Paste them to the firstmate.');
  };

  const sel = selected ? getState(selected) : null;

  const DragWrap = ({ id, children, className, style }: {
    id: string; children: React.ReactNode; className?: string; style?: React.CSSProperties;
  }) => {
    const s = getState(id);
    return (
      <motion.div
        drag={layoutMode}
        dragMomentum={false}
        initial={{ x: s.x, y: s.y }}
        onDragEnd={(_, info) => {
          updateState(id, { x: s.x + info.offset.x, y: s.y + info.offset.y });
        }}
        onClick={() => layoutMode && setSelected(id)}
        className={`${className ?? ''} ${layoutMode ? 'cursor-grab active:cursor-grabbing' : ''} ${layoutMode && selected === id ? 'ring-2 ring-[#AD1D12] ring-offset-2 ring-offset-transparent' : ''}`}
        style={{ ...style, transform: `translateX(${s.x}px) translateY(${s.y}px) scale(${s.scale ?? 1})` }}
      >
        {layoutMode && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#AD1D12] rounded-full z-[200] pointer-events-none opacity-70" />
        )}
        {children}
      </motion.div>
    );
  };

  return (
    <div className="h-screen overflow-hidden bg-[#282828] text-[#F7E9E8] transition-colors duration-300 antialiased relative flex flex-col selection:bg-[#AD1D12] selection:text-[#F7E9E8] overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
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
              <button key={item} onClick={() => scrollToSection(item)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${activeTab === item ? 'text-[#282828] font-bold' : 'text-[#282828]/60 hover:text-[#282828]'}`}>
                {item}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowDemoModal('Get In Touch')}
              className="px-6 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 active:scale-95 border cursor-pointer border-[#282828] text-[#F7E9E8] bg-[#282828] hover:bg-[#282828]/80 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
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
                <button key={item} onClick={() => scrollToSection(item)}
                  className={`text-left text-base font-medium py-1.5 cursor-pointer ${activeTab === item ? 'text-[#AD1D12]' : 'text-[#F7E9E8]/65'}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <section id="home" className="relative w-full h-full flex flex-col items-center justify-end overflow-hidden bg-[#F7E9E8] rounded-b-[40px] shadow-2xl z-20">

          {/* Background BRAND DESIGNER text */}
          <motion.div
            drag={layoutMode}
            dragMomentum={false}
            initial={{ x: getState('brand-text').x, y: getState('brand-text').y }}
            onDragEnd={(_, info) => {
              const s = getState('brand-text');
              updateState('brand-text', { x: s.x + info.offset.x, y: s.y + info.offset.y });
            }}
            onClick={() => layoutMode && setSelected('brand-text')}
            className={`absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-full flex flex-col items-center justify-center -space-y-2 sm:-space-y-4 lg:-space-y-6
              ${layoutMode ? '!pointer-events-auto cursor-grab active:cursor-grabbing' : ''}
              ${layoutMode && selected === 'brand-text' ? 'outline outline-2 outline-[#AD1D12]' : ''}`}
            style={{
              transform: `translateX(${getState('brand-text').x}px) translateY(${getState('brand-text').y}px) scaleY(${getState('brand-text').scaleY ?? 0.7})`,
            }}
          >
            <h1 style={{ fontSize: `${getState('brand-text').fontSize ?? 28}vw` }}
              className="leading-none font-extrabold tracking-tighter text-[#282828]/5 whitespace-nowrap font-grotesk">BRAND</h1>
            <h1 style={{ fontSize: `${getState('brand-text').fontSize ?? 28}vw` }}
              className="leading-none font-extrabold tracking-tighter text-[#282828]/5 whitespace-nowrap font-grotesk">DESIGNER</h1>
          </motion.div>

          {/* Floating Skill Tags */}
          <div className="absolute inset-0 z-30 flex justify-center" style={{ pointerEvents: layoutMode ? 'auto' : 'none' }}>
            <div className="relative w-full max-w-5xl h-full hidden md:block">
              {SKILL_TAGS.map((tag) => {
                const s = getState(tag.id);
                return (
                  <motion.div
                    key={tag.id}
                    drag={layoutMode}
                    dragMomentum={false}
                    initial={{ x: s.x, y: s.y }}
                    onDragEnd={(_, info) => updateState(tag.id, { x: s.x + info.offset.x, y: s.y + info.offset.y })}
                    onClick={() => layoutMode && setSelected(tag.id)}
                    className={`absolute bg-white/70 backdrop-blur-xl px-5 py-2 rounded-full font-bold text-xs text-[#282828] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60
                      ${layoutMode ? 'cursor-grab active:cursor-grabbing' : ''}
                      ${layoutMode && selected === tag.id ? 'ring-2 ring-[#AD1D12]' : ''}`}
                    style={{
                      top: tag.top,
                      left: (tag as any).left,
                      right: (tag as any).right,
                      transform: `translateX(${s.x}px) translateY(${s.y}px) scale(${s.scale ?? 1})`,
                    }}
                  >
                    {tag.label}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Hero Image */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[72vh] md:h-[77vh] flex justify-center items-end z-20 pointer-events-none">
            <img src={ceebanksImg} alt="CeeBanks" className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)] grayscale contrast-125 brightness-95 scale-[1.15] md:scale-[1.25] origin-bottom" />
          </div>

          {/* Bottom Content */}
          <div className="relative z-40 w-full max-w-7xl mx-auto flex flex-col items-center pb-0 px-4" style={{ pointerEvents: layoutMode ? 'auto' : 'none' }}>
            <div className="relative w-full flex justify-center">

              {/* Hello tag */}
              {(() => {
                const s = getState('hello');
                return (
                  <motion.div
                    drag={layoutMode}
                    dragMomentum={false}
                    initial={{ x: s.x, y: s.y }}
                    onDragEnd={(_, info) => updateState('hello', { x: s.x + info.offset.x, y: s.y + info.offset.y })}
                    onClick={() => layoutMode && setSelected('hello')}
                    className={`absolute -top-5 sm:-top-8 left-[8%] sm:left-[15%] lg:left-[22%] bg-white/90 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-[#282828] shadow-lg border border-black/5 z-50
                      ${layoutMode ? 'cursor-grab active:cursor-grabbing' : ''}
                      ${layoutMode && selected === 'hello' ? 'ring-2 ring-[#AD1D12]' : ''}`}
                    style={{ transform: `translateX(${s.x}px) translateY(${s.y}px) scale(${s.scale ?? 1})` }}
                  >
                    Hello, my name is
                  </motion.div>
                );
              })()}

              {/* Let's work tag */}
              {(() => {
                const s = getState('lets-work');
                return (
                  <motion.div
                    drag={layoutMode}
                    dragMomentum={false}
                    initial={{ x: s.x, y: s.y }}
                    onDragEnd={(_, info) => updateState('lets-work', { x: s.x + info.offset.x, y: s.y + info.offset.y })}
                    onClick={() => layoutMode && setSelected('lets-work')}
                    className={`absolute -top-8 sm:-top-12 right-[8%] sm:right-[15%] lg:right-[22%] bg-white/90 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-[#282828] shadow-lg border border-black/5 z-50
                      ${layoutMode ? 'cursor-grab active:cursor-grabbing' : ''}
                      ${layoutMode && selected === 'lets-work' ? 'ring-2 ring-[#AD1D12]' : ''}`}
                    style={{ transform: `translateX(${s.x}px) translateY(${s.y}px) scale(${s.scale ?? 1})` }}
                  >
                    Let's work together!
                  </motion.div>
                );
              })()}

              {/* CeeBanks text */}
              {(() => {
                const s = getState('ceebanks-text');
                return (
                  <motion.h2
                    drag={layoutMode}
                    dragMomentum={false}
                    initial={{ x: s.x, y: s.y }}
                    onDragEnd={(_, info) => updateState('ceebanks-text', { x: s.x + info.offset.x, y: s.y + info.offset.y })}
                    onClick={() => layoutMode && setSelected('ceebanks-text')}
                    className={`leading-[0.75] font-extrabold tracking-tighter text-[#282828] text-center w-full font-grotesk mix-blend-normal
                      ${layoutMode ? 'cursor-grab active:cursor-grabbing' : ''}
                      ${layoutMode && selected === 'ceebanks-text' ? 'outline outline-2 outline-[#AD1D12]' : ''}`}
                    style={{
                      fontSize: `${getState('ceebanks-text').fontSize ?? 17}vw`,
                      transform: `translateX(${s.x}px) translateY(${s.y}px) scale(${s.scale ?? 1})`,
                    }}
                  >
                    CeeBanks
                  </motion.h2>
                );
              })()}
            </div>
          </div>
        </section>
      </div>

      {/* ── Layout Mode Panel ──────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 items-end">
        <button
          onClick={() => { setLayoutMode(l => !l); setSelected(null); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-xl border cursor-pointer transition-all
            ${layoutMode ? 'bg-[#AD1D12] text-white border-[#AD1D12]' : 'bg-white text-[#282828] border-black/10'}`}
        >
          <Move className="w-4 h-4" />
          {layoutMode ? 'Layout Mode ON' : 'Layout Mode'}
        </button>

        {layoutMode && selected && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/10 p-4 w-64 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#282828] uppercase tracking-wider">{selected}</span>
              <button onClick={() => setSelected(null)} className="text-[#282828]/40 hover:text-[#282828] cursor-pointer"><X className="w-4 h-4" /></button>
            </div>

            {/* Scale / size controls */}
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#282828]/60">Scale</span>
              <div className="flex items-center gap-2">
                <input type="range" min={0.3} max={2.5} step={0.01}
                  value={getState(selected).scale ?? 1}
                  onChange={e => updateState(selected, { scale: parseFloat(e.target.value) })}
                  className="w-full accent-[#AD1D12]" />
                <span className="text-xs font-mono text-[#282828]/60 w-8">{((getState(selected).scale ?? 1) * 100).toFixed(0)}%</span>
              </div>
            </label>

            {selected === 'brand-text' && (
              <>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[#282828]/60">Font Size (vw)</span>
                  <div className="flex items-center gap-2">
                    <input type="range" min={10} max={40} step={0.5}
                      value={getState('brand-text').fontSize ?? 28}
                      onChange={e => updateState('brand-text', { fontSize: parseFloat(e.target.value) })}
                      className="w-full accent-[#AD1D12]" />
                    <span className="text-xs font-mono text-[#282828]/60 w-8">{getState('brand-text').fontSize ?? 28}vw</span>
                  </div>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[#282828]/60">Vertical Squeeze (scaleY)</span>
                  <div className="flex items-center gap-2">
                    <input type="range" min={0.2} max={1.0} step={0.01}
                      value={getState('brand-text').scaleY ?? 0.7}
                      onChange={e => updateState('brand-text', { scaleY: parseFloat(e.target.value) })}
                      className="w-full accent-[#AD1D12]" />
                    <span className="text-xs font-mono text-[#282828]/60 w-8">{((getState('brand-text').scaleY ?? 0.7) * 100).toFixed(0)}%</span>
                  </div>
                </label>
              </>
            )}

            {selected === 'ceebanks-text' && (
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#282828]/60">Font Size (vw)</span>
                <div className="flex items-center gap-2">
                  <input type="range" min={8} max={25} step={0.5}
                    value={getState('ceebanks-text').fontSize ?? 17}
                    onChange={e => updateState('ceebanks-text', { fontSize: parseFloat(e.target.value) })}
                    className="w-full accent-[#AD1D12]" />
                  <span className="text-xs font-mono text-[#282828]/60 w-8">{getState('ceebanks-text').fontSize ?? 17}vw</span>
                </div>
              </label>
            )}

            <div className="pt-1 border-t border-black/5 text-xs text-[#282828]/40 flex items-center gap-1">
              <Move className="w-3 h-3" /> Drag to move
              <Maximize2 className="w-3 h-3 ml-2" /> Sliders to resize
            </div>
          </div>
        )}

        {layoutMode && (
          <button
            onClick={getCoordinates}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#282828] text-white shadow-xl border border-white/10 cursor-pointer hover:bg-[#282828]/80 transition-all"
          >
            Copy All Coordinates
          </button>
        )}
      </div>

      {/* ── Demo Modal ─────────────────────────────────────────────────────── */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#282828]/95 text-[#F7E9E8] border border-[#F7E9E8]/10 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F7E9E8]/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#AD1D12] animate-pulse" />
                <h3 className="font-grotesk font-bold text-xl">{showDemoModal}</h3>
              </div>
              <button onClick={() => setShowDemoModal(null)} className="p-1 rounded-lg text-[#F7E9E8]/50 hover:text-[#F7E9E8] hover:bg-[#F7E9E8]/5 cursor-pointer">
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
