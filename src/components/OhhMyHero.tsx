"use client";

import { useEffect, useRef, useCallback } from "react";
import WaveText from "./WaveText";

class Particle {
  x: number;
  y: number;
  scatterX: number;
  scatterY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;

  constructor(targetX: number, targetY: number, canvasWidth: number, canvasHeight: number) {
    this.targetX = targetX;
    this.targetY = targetY;
    
    // Start particles slightly scattered around their target for a quick assemble effect
    this.x = targetX + (Math.random() - 0.5) * 100;
    this.y = targetY + (Math.random() - 0.5) * 100;
    
    this.scatterX = this.x;
    this.scatterY = this.y;
    this.vx = 0;
    this.vy = 0;
    
    this.size = Math.random() * 2 + 1.5;
    // Pixxelu Orange or Dark Grey for particles
    this.color = Math.random() > 0.4 ? "#f85c37" : "#1a1a1a";
  }

  update(mouseX: number, mouseY: number) {
    // Mouse repulsion
    let repX = 0;
    let repY = 0;
    
    // Calculate distance to mouse
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Interaction radius
    const interactionRadius = 100;
    
    if (dist < interactionRadius && dist > 0) {
      const force = (interactionRadius - dist) / interactionRadius;
      repX = (dx / dist) * force * 15; // Push strength
      repY = (dy / dist) * force * 15;
    }

    // Spring toward target (very strong spring so it holds shape well)
    const spring = 0.1;
    const friction = 0.8;
    
    this.vx += (this.targetX - this.x) * spring;
    this.vy += (this.targetY - this.y) * spring;
    
    this.vx += repX;
    this.vy += repY;
    
    this.vx *= friction;
    this.vy *= friction;
    
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size); // square particles match the screenshot
  }
}

function getShapePoints(
  textLines: string[],
  canvasWidth: number,
  canvasHeight: number,
  gap: number
): { x: number; y: number }[] {
  const off = document.createElement("canvas");
  off.width = canvasWidth;
  off.height = canvasHeight;
  const ctx = off.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  
  // Calculate responsive font size
  const fontSize = Math.min(canvasWidth * 0.12, 180);
  ctx.font = `900 ${fontSize}px 'Arial Black', Impact, sans-serif`;
  
  const lineHeight = fontSize * 0.9;
  const startY = canvasHeight / 2 - (lineHeight * (textLines.length - 1)) / 2;

  textLines.forEach((line, i) => {
    ctx.fillText(line, canvasWidth / 2, startY + i * lineHeight);
  });

  const data = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
  const pts: { x: number; y: number }[] = [];
  
  for (let y = 0; y < canvasHeight; y += gap) {
    for (let x = 0; x < canvasWidth; x += gap) {
      if (data[(y * canvasWidth + x) * 4 + 3] > 128) {
        pts.push({ x, y });
      }
    }
  }
  return pts;
}

export default function OhhMyHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width;
    const H = canvas.height;

    // Use smaller gap for more dense particles, higher for performance
    const pts = getShapePoints(["IMPOSSIBLE", "TO IGNORE ."], W, H, 6);

    particlesRef.current = pts.map((pt) => new Particle(pt.x, pt.y, W, H));
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const { x: mx, y: my } = mouseRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particlesRef.current) {
      p.update(mx, my);
      p.draw(ctx);
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handler = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const resetMouse = () => {
      mouseRef.current = { x: -999, y: -999 };
    };
    canvas.addEventListener("mousemove", handler);
    canvas.addEventListener("mouseleave", resetMouse);
    return () => {
      canvas.removeEventListener("mousemove", handler);
      canvas.removeEventListener("mouseleave", resetMouse);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      // High DPI canvas support
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      initParticles();
    };

    resize();
    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles, animate]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      
      {/* Decorative clouds behind the canvas */}
      <div className="absolute top-32 left-10 w-64 h-24 bg-white/40 blur-2xl rounded-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-20 w-96 h-32 bg-white/40 blur-3xl rounded-[100px] pointer-events-none" />

      {/* Floating tag above the main text */}
      <div className="relative z-20 mb-8 flex items-center bg-white/80 backdrop-blur-md px-4 py-2 rounded shadow-sm border border-black/5">
        <span className="text-sm font-semibold text-black mr-2">Worked with 15+</span>
        <span className="bg-[#f85c37] text-white text-[10px] font-bold px-1.5 py-0.5 rounded mr-1">P</span>
        <span className="text-sm font-bold text-[#f85c37]">Pixxelu</span>
        <span className="text-sm font-semibold text-black ml-1">brands</span>
      </div>

      {/* Canvas Layer for the interactive text */}
      <div className="relative w-full max-w-7xl h-[60vh] md:h-[70vh] z-10 mx-auto">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ cursor: "crosshair" }}
        />
      </div>

      {/* Bottom CTA text */}
      <div className="relative z-20 mt-8 text-center flex flex-col items-center">
        <h2 className="text-2xl font-serif italic text-black/60 mb-2">
          a little about us
        </h2>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1a1a1a] uppercase cursor-pointer">
          <WaveText text="WHAT'S UP" />
        </h1>
      </div>
    </section>
  );
}
