import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ceebanksImg from '../../ceebanks.png';

gsap.registerPlugin(ScrollTrigger);

const ASCII_CHARS = "... ..... :::=+xX#0369";
const FONT_SIZE = 18;
const CELL_SIZE = 20;
const ASCII_COLUMNS = 80;
const DPR = 2; // Assuming high DPI for crispness

const CHAR_COLOR = "rgba(247, 233, 232, 0.15)";
const HOVER_COLOR = "#F7E9E8"; // Light brand color
const HOVER_CHAR_COLOR = "#282828"; // Dark brand color

const HOVER_RADIUS = 8;
const CLUSTER_SIZE = 10;
const HIGHLIGHT_LIFETIME = 300;

const backgroundCharIndex = ASCII_CHARS.lastIndexOf(".");

export function AsciiFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const revealerRef = useRef<HTMLDivElement>(null);
  const leftHandRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!footerRef.current || !revealerRef.current) return;

    const footer = footerRef.current;
    
    // Elements to animate
    const headingChars = footer.querySelectorAll(".footer-header h1");
    const contentLines = footer.querySelectorAll(".footer-links a, .footer-text p");

    gsap.set(headingChars, { yPercent: 100, opacity: 0 });
    gsap.set(contentLines, { yPercent: 50, opacity: 0 });

    // Hand ASCII rendering
    const sampleImagePixels = (image: HTMLImageElement, gridRows: number) => {
      const canvas = document.createElement("canvas");
      canvas.width = ASCII_COLUMNS;
      canvas.height = gridRows;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new Uint8ClampedArray(0);
      ctx.drawImage(image, 0, 0, ASCII_COLUMNS, gridRows);
      return ctx.getImageData(0, 0, ASCII_COLUMNS, gridRows).data;
    };

    const pixelToCharIndex = (pixels: Uint8ClampedArray, pixelOffset: number) => {
      const alpha = pixels[pixelOffset + 3];
      if (alpha < 128) return -1; // Ignore transparent pixels
      
      const r = pixels[pixelOffset];
      const g = pixels[pixelOffset + 1];
      const b = pixels[pixelOffset + 2];
      
      // Attempt to filter out solid light background if image isn't transparent
      if (r > 230 && g > 230 && b > 230) return -1;

      const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
      return Math.min(ASCII_CHARS.length - 1, Math.floor((1 - brightness) * ASCII_CHARS.length));
    };

    const buildCells = (image: HTMLImageElement) => {
      const rows = Math.round(ASCII_COLUMNS / (image.naturalWidth / image.naturalHeight));
      const pixels = sampleImagePixels(image, rows);
      const cells = new Map();

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < ASCII_COLUMNS; col++) {
          const charIndex = pixelToCharIndex(pixels, (row * ASCII_COLUMNS + col) * 4);
          if (charIndex <= backgroundCharIndex) continue;

          cells.set(`${col},${row}`, {
            col,
            row,
            char: ASCII_CHARS[charIndex],
            highlightEndTime: 0,
          });
        }
      }
      return { rows, cells };
    };

    let hands: any[] = [];
    let animationFrameId: number;

    const setupHand = (image: HTMLImageElement) => {
      if (!image.naturalWidth) return null;
      const { rows, cells } = buildCells(image);
      const cellList = Array.from(cells.values());

      const wrapper = image.closest(".footer-hand-img");
      if (!wrapper) return null;
      
      let canvas = wrapper.querySelector("canvas");
      if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.style.inset = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        wrapper.appendChild(canvas);
      }

      canvas.width = ASCII_COLUMNS * CELL_SIZE * DPR;
      canvas.height = rows * CELL_SIZE * DPR;

      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";

      const metrics = ctx.measureText("X");
      const glyphHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      const baselineOffset = CELL_SIZE / 2 + glyphHeight / 2 - metrics.actualBoundingBoxDescent;

      const canvasWidth = ASCII_COLUMNS * CELL_SIZE;
      const canvasHeight = rows * CELL_SIZE;

      const handObj = { canvas, cells, cellList, rows, ctx, canvasWidth, canvasHeight, baselineOffset };
      return handObj;
    };

    const initHands = () => {
      [leftHandRef.current].forEach(img => {
        if (!img) return;
        if (img.complete && img.naturalWidth) {
          const h = setupHand(img);
          if (h) hands.push(h);
        } else {
          img.onload = () => {
            const h = setupHand(img);
            if (h) hands.push(h);
          };
        }
      });
    };
    
    initHands();

    const renderHands = () => {
      const now = Date.now();
      hands.forEach(hand => {
        const { ctx, canvasWidth, canvasHeight, cellList, baselineOffset } = hand;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        for (const cell of cellList) {
          const x = cell.col * CELL_SIZE;
          const y = cell.row * CELL_SIZE;
          const isHighlighted = cell.highlightEndTime > now;

          if (isHighlighted) {
            ctx.fillStyle = HOVER_COLOR;
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
          }

          ctx.fillStyle = isHighlighted ? HOVER_CHAR_COLOR : CHAR_COLOR;
          ctx.fillText(cell.char, x + CELL_SIZE / 2, y + baselineOffset);
        }
      });
      animationFrameId = requestAnimationFrame(renderHands);
    };
    renderHands();

    const highlightCluster = (cells: Map<string, any>, startCell: any) => {
      const now = Date.now();
      startCell.highlightEndTime = now + HIGHLIGHT_LIFETIME;

      const steps = Math.floor(Math.random() * CLUSTER_SIZE) + 1;
      const litCells = [startCell];
      let current = startCell;

      for (let step = 0; step < steps; step++) {
        const neighbours = [];
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const neighbour = cells.get(`${current.col + dx},${current.row + dy}`);
            if (neighbour && !litCells.includes(neighbour)) {
              neighbours.push(neighbour);
            }
          }
        }

        if (neighbours.length === 0) break;

        const next = neighbours[Math.floor(Math.random() * neighbours.length)];
        next.highlightEndTime = now + HIGHLIGHT_LIFETIME + step * 10;
        litCells.push(next);
        current = next;
      }
    };

    const hoverHand = (hand: any, clientX: number, clientY: number) => {
      const rect = hand.canvas.getBoundingClientRect();
      const mouseCol = ((clientX - rect.left) / rect.width) * ASCII_COLUMNS;
      const mouseRow = ((clientY - rect.top) / rect.height) * hand.rows;

      let closest = null;
      let closestDist = Infinity;
      for (const cell of hand.cellList) {
        const dx = mouseCol - cell.col;
        const dy = mouseRow - cell.row;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closestDist) {
          closestDist = dist;
          closest = cell;
        }
      }

      if (closest && closestDist <= HOVER_RADIUS) {
        highlightCluster(hand.cells, closest);
      }
    };

    // Parallax
    const PARALLAX_STRENGTH = 20;
    const PARALLAX_EASE = 0.05;
    const parallaxScale = 1 + (PARALLAX_STRENGTH * 2) / 200;
    
    const pointer = { x: 0, y: 0 };
    const drift = { x: 0, y: 0 };
    const reveal = { left: -125, right: 125 };
    
    const handWrappers = footer.querySelectorAll(".footer-hand-img");

    const setPointerTarget = (clientX: number, clientY: number) => {
      const rect = footer.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width - 0.5) * PARALLAX_STRENGTH * 2;
      pointer.y = ((clientY - rect.top) / rect.height - 0.5) * PARALLAX_STRENGTH * 2;
    };

    let parallaxFrameId: number;
    const renderParallax = () => {
      drift.x += (pointer.x - drift.x) * PARALLAX_EASE;
      drift.y += (pointer.y - drift.y) * PARALLAX_EASE;

      handWrappers.forEach((wrapper: any, i) => {
        const direction = i === 0 ? 1 : -1;
        const revealX = i === 0 ? reveal.left : reveal.right;
        const x = drift.x * direction;
        const y = -drift.y;
        wrapper.style.transform = `translate(calc(${x}px + ${revealX}%), ${y}px) scale(${parallaxScale})`;
      });

      parallaxFrameId = requestAnimationFrame(renderParallax);
    };
    renderParallax();

    const onMouseMove = (event: MouseEvent) => {
      hands.forEach((hand) => hoverHand(hand, event.clientX, event.clientY));
      setPointerTarget(event.clientX, event.clientY);
    };
    window.addEventListener("mousemove", onMouseMove);

    // Scroll Animations
    const charStagger = { each: 0.04, from: "center" as const };

    const animateIn = () => {
      gsap.to(reveal, { left: 0, right: 0, duration: 1, ease: "expo.out", overwrite: true });
      gsap.to(headingChars, { yPercent: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.1, overwrite: true });
      gsap.to(contentLines, { yPercent: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.1, overwrite: true });
    };

    const animateOut = () => {
      gsap.to(reveal, { left: -125, right: 125, duration: 0.4, ease: "expo.in", overwrite: true });
      gsap.to(headingChars, { yPercent: 100, opacity: 0, duration: 0.4, ease: "expo.in", stagger: 0.05, overwrite: true });
      gsap.to(contentLines, { yPercent: 50, opacity: 0, duration: 0.4, ease: "expo.in", stagger: 0.05, overwrite: true });
    };

    const stIn = ScrollTrigger.create({
      trigger: revealerRef.current,
      start: "top 50%",
      onEnter: animateIn,
    });

    const stOut = ScrollTrigger.create({
      trigger: revealerRef.current,
      start: "top 85%",
      onLeaveBack: animateOut,
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(parallaxFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      stIn.kill();
      stOut.kill();
    };
  }, []);

  return (
    <>
      <div ref={revealerRef} className="relative w-full h-[100svh] z-10 pointer-events-none"></div>
      <footer ref={footerRef} className="fixed top-0 left-0 w-full h-[100svh] bg-[#282828] overflow-hidden z-0 font-grotesk">
        <div className="absolute inset-0 flex justify-center items-center px-10 opacity-60">
          <div className="footer-hand-img relative w-[50%] max-w-[500px] min-w-[250px] will-change-transform">
            <img ref={leftHandRef} className="ascii-hand block w-full opacity-0" src={ceebanksImg} alt="" crossOrigin="anonymous" />
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full p-10 flex flex-col md:flex-row justify-between gap-8 text-white z-10">
          <nav className="footer-links flex flex-col gap-2">
            <a href="#about" className="text-white no-underline text-lg hover:text-[#AD1D12] transition-colors">About</a>
            <a href="#portfolio" className="text-white no-underline text-lg hover:text-[#AD1D12] transition-colors">Portfolio</a>
            <a href="#services" className="text-white no-underline text-lg hover:text-[#AD1D12] transition-colors">Services</a>
            <a href="#contact" className="text-white no-underline text-lg hover:text-[#AD1D12] transition-colors">Contact</a>
          </nav>
          <div className="footer-text max-w-md text-right pointer-events-none">
            <p className="text-lg leading-relaxed text-white/70">
              A strategic brand designer crafting iconic visual identities and cohesive design systems. I help visionary founders and teams build brands that command attention and drive growth.
            </p>
          </div>
        </div>

        <div className="footer-header absolute bottom-0 left-0 w-full p-6 sm:p-10 flex justify-center items-end text-white pointer-events-none">
          <h1 className="text-[clamp(2.5rem,8vw,10rem)] font-medium leading-none tracking-tight m-0 uppercase text-center">
            CeeBanks &copy; {new Date().getFullYear()}
          </h1>
        </div>
      </footer>
    </>
  );
}
