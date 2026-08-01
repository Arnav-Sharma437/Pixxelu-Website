"use client";

import { useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { Cpu, Zap, Eye } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   Particle class
───────────────────────────────────────────────────────── */
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
  opacity: number;

  constructor(scatterX: number, scatterY: number) {
    this.x = scatterX;
    this.y = scatterY;
    this.scatterX = scatterX;
    this.scatterY = scatterY;
    this.targetX = 0;
    this.targetY = 0;
    this.vx = 0;
    this.vy = 0;
    this.size = Math.random() * 1.2 + 0.8;
    this.opacity = Math.random() * 0.5 + 0.3;
  }

  update(morphed: boolean, mouseX: number, mouseY: number) {
    const tx = morphed ? this.targetX : this.scatterX;
    const ty = morphed ? this.targetY : this.scatterY;

    // Mouse repulsion (only when morphed — don't disturb scatter state)
    let repX = 0;
    let repY = 0;
    if (morphed) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 70 && dist > 0) {
        const force = (70 - dist) / 70;
        repX = (dx / dist) * force * 5;
        repY = (dy / dist) * force * 5;
      }
    }

    // Spring toward target (with repulsion layered on top)
    const ease = morphed ? 0.07 : 0.04;
    this.vx = (tx - this.x) * ease + repX;
    this.vy = (ty - this.y) * ease + repY;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D, morphed: boolean) {
    const alpha = morphed
      ? Math.min(0.85, this.opacity + 0.35)
      : this.opacity * 0.55;
    ctx.fillStyle = `rgba(232, 92, 43, ${alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* ─────────────────────────────────────────────────────────
   Offscreen shape sampling
───────────────────────────────────────────────────────── */
function getShapePoints(
  text: string,
  fontSize: number,
  w: number,
  h: number,
  gap: number
): { x: number; y: number }[] {
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const ctx = off.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.font = `900 ${fontSize}px 'Courier New', monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2);

  const data = ctx.getImageData(0, 0, w, h).data;
  const pts: { x: number; y: number }[] = [];
  for (let y = 0; y < h; y += gap) {
    for (let x = 0; x < w; x += gap) {
      if (data[(y * w + x) * 4 + 3] > 128) pts.push({ x, y });
    }
  }
  return pts;
}

/* ─────────────────────────────────────────────────────────
   Particle Canvas
───────────────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const morphedRef = useRef(false);
  const mouseRef = useRef({ x: -999, y: -999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);

  // Build particles once canvas mounts
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width;
    const H = canvas.height;

    // Sample "< />" shape from offscreen canvas
    const fontSize = Math.min(W * 0.38, 160);
    const pts = getShapePoints("< />", fontSize, W, H, 5);

    // Shuffle target points so assignment looks organic
    const shuffled = [...pts].sort(() => Math.random() - 0.5);

    // Create particles — scatter them randomly, assign targets
    const particles = shuffled.map((pt) => {
      const p = new Particle(
        Math.random() * W,
        Math.random() * H
      );
      p.targetX = pt.x;
      p.targetY = pt.y;
      return p;
    });

    particlesRef.current = particles;
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const morphed = morphedRef.current;
    const { x: mx, y: my } = mouseRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particlesRef.current) {
      p.update(morphed, mx, my);
      p.draw(ctx, morphed);
    }

    if (visibleRef.current) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, []);

  // Mouse tracking
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
    canvas.addEventListener("mousemove", handler);
    return () => canvas.removeEventListener("mousemove", handler);
  }, []);

  // IntersectionObserver: pause/resume RAF
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(canvas);
    return () => obs.disconnect();
  }, [animate]);

  // Init + start loop + handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement!;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      initParticles();
    };

    resize();
    rafRef.current = requestAnimationFrame(animate);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [initParticles, animate]);

  // Expose morph trigger
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: canvasRef.current,
        start: "top 65%",
        once: true,
        onEnter: () => {
          morphedRef.current = true;
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: "none" }}
      aria-hidden="true"
    />
  );
}

/* ─────────────────────────────────────────────────────────
   Main Section
───────────────────────────────────────────────────────── */
export default function WhyAi() {
  return (
    <section
      id="insights"
      className="bg-transparent text-white py-12 md:py-32 relative overflow-hidden border-b border-white/5"
    >
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-orange/[0.015] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

        {/* ── Left Text Column ── */}
        <div className="lg:col-span-6 flex flex-col space-y-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-orange uppercase">
              The Pixxelu Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-white mt-1.5 leading-tight">
              Built with AI.<br />Refined by hand.
            </h2>
            <p className="text-base text-zinc-400 mt-4 max-w-xl font-normal leading-relaxed">
              We leverage advanced AI models to scaffold structure, test modules, and write clean boilerplate. This efficiency frees our engineers to focus 100% of their energy on bespoke animations, accessibility audits, and custom integrations.
            </p>
          </div>

          {/* Differentiator Points */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-none border border-orange/30 bg-orange/5 text-orange flex items-center justify-center shrink-0 mt-1">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white">60% speed-to-market boost</h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                  By automating database setups and boilerplate components, we launch highly tailored sites in weeks, not months.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-none border border-white/10 bg-white/5 text-white flex items-center justify-center shrink-0 mt-1">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white">Zero-template customized code</h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                  Every site is customized from scratch for your brand. AI assists in validating CSS architectures and checking API endpoints.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-none border border-white/10 bg-white/5 text-white flex items-center justify-center shrink-0 mt-1">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white">Master designer inspections</h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                  An AI compiles the setup, but a human designer refines typography scales, adjusts margin alignments, and secures keyboard focus paths.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Particle Canvas Column ── */}
        <div className="lg:col-span-6 relative w-full aspect-square max-w-[480px] mx-auto border border-white/10 rounded-2xl overflow-hidden bg-black/30 backdrop-blur-sm">

          {/* Corner labels */}
          <div className="absolute top-3 left-4 text-[8px] font-mono text-zinc-500 uppercase tracking-widest z-10 pointer-events-none select-none">
            pixxelu // particle.morph
          </div>
          <div className="absolute top-3 right-4 text-[8px] font-mono text-orange/60 z-10 pointer-events-none select-none">
            ◉ live
          </div>

          {/* Particle canvas fills the box */}
          <ParticleCanvas />

          {/* Centered overlay label — sits inside the bracket shape */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none gap-3">
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-orange bg-black/60 backdrop-blur-sm px-3 py-1 border border-orange/30 rounded-full">
              AI-Native Workflow
            </span>
            <p className="text-xs text-zinc-400 text-center max-w-[180px] leading-relaxed">
              Particles assemble as you scroll
            </p>
          </div>

          {/* Corner crosshairs */}
          <div className="absolute top-4 right-4 text-[9px] text-zinc-600 font-mono pointer-events-none">+</div>
          <div className="absolute bottom-4 left-4 text-[9px] text-zinc-600 font-mono pointer-events-none">+</div>
          <div className="absolute bottom-4 right-4 text-[9px] text-zinc-600 font-mono pointer-events-none">+</div>
        </div>

      </div>
    </section>
  );
}
