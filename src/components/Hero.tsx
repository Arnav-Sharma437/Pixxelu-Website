"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return; // Skip animation, show default static layout
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Fade + rise eyebrow
      tl.fromTo(
        ".hero-eyebrow",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // 2. Animate title lines (rise up from mask)
      tl.fromTo(
        ".hero-title-line",
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.08, ease: "power3.out" },
        "-=0.35"
      );

      // 3. Animate body elements (paragraph + CTA button)
      tl.fromTo(
        ".hero-body-element",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: "power2.out" },
        "-=0.45"
      );

      // 4. Fade in background vector assets & floating cards
      tl.fromTo(
        ".hero-bg-asset",
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        "-=0.7"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-transparent text-white min-h-screen flex items-center justify-between overflow-hidden pt-40 pb-28 md:pb-40"
    >
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff/[0.015]_1px,transparent_1px),linear-gradient(to_bottom,#ffffff/[0.015]_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none z-0" />

      {/* Dynamic Drifting Background Glows */}
      <div className="hero-bg-asset absolute top-1/4 left-[5%] w-[450px] h-[450px] bg-orange/[0.02] rounded-full blur-[120px] pointer-events-none animate-[pulse_10s_infinite_ease-in-out] z-0" />
      <div className="hero-bg-asset absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[140px] pointer-events-none animate-[pulse_15s_infinite_ease-in-out_2.5s] z-0" />

      {/* Infinite Horizontal Scrolling Marquee Ticker at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-y border-white/5 bg-black/40 backdrop-blur-sm py-5 z-20 select-none pointer-events-none">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] w-[200%] shrink-0">
          <div className="flex justify-around items-center w-1/2 shrink-0">
            <span className="marquee-text text-lg sm:text-xl md:text-2xl">pixxelu</span>
            <span className="text-orange text-lg sm:text-xl md:text-2xl">&bull;</span>
            <span className="marquee-text text-lg sm:text-xl md:text-2xl">squarespace</span>
            <span className="text-orange text-lg sm:text-xl md:text-2xl">&bull;</span>
            <span className="marquee-text text-lg sm:text-xl md:text-2xl">wix studio</span>
            <span className="text-orange text-lg sm:text-xl md:text-2xl">&bull;</span>
            <span className="marquee-text text-lg sm:text-xl md:text-2xl">shopify</span>
            <span className="text-orange text-lg sm:text-xl md:text-2xl">&bull;</span>
            <span className="marquee-text text-lg sm:text-xl md:text-2xl">wordpress</span>
            <span className="text-orange text-lg sm:text-xl md:text-2xl">&bull;</span>
          </div>
          <div className="flex justify-around items-center w-1/2 shrink-0">
            <span className="marquee-text text-lg sm:text-xl md:text-2xl">pixxelu</span>
            <span className="text-orange text-lg sm:text-xl md:text-2xl">&bull;</span>
            <span className="marquee-text text-lg sm:text-xl md:text-2xl">squarespace</span>
            <span className="text-orange text-lg sm:text-xl md:text-2xl">&bull;</span>
            <span className="marquee-text text-lg sm:text-xl md:text-2xl">wix studio</span>
            <span className="text-orange text-lg sm:text-xl md:text-2xl">&bull;</span>
            <span className="marquee-text text-lg sm:text-xl md:text-2xl">shopify</span>
            <span className="text-orange text-lg sm:text-xl md:text-2xl">&bull;</span>
            <span className="marquee-text text-lg sm:text-xl md:text-2xl">wordpress</span>
            <span className="text-orange text-lg sm:text-xl md:text-2xl">&bull;</span>
          </div>
        </div>
      </div>


      {/* Main Content Grid (Full width container alignment) */}
      <div className="w-full px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 relative">
        
        {/* Left Column (Content copy stack) */}
        <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
          
          {/* Muted red/orange eyebrow */}
          <div className="hero-eyebrow text-[10px] font-bold tracking-[0.3em] uppercase text-orange">
            We Are Pixxelu
          </div>

          {/* Large display title (A digital agency focused on web.) */}
          <h1 className="text-5xl sm:text-6xl md:text-[80px] font-black font-display tracking-tight text-white leading-[0.98]">
            <span className="block overflow-hidden py-1">
              <span className="hero-title-line inline-block">A digital agency</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="hero-title-line inline-block">focused on web<span className="text-orange">.</span></span>
            </span>
          </h1>

          {/* Subhead Description Paragraph */}
          <p className="hero-body-element text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed">
            We are a creative team of designers, developers, strategists, and producers building elevated websites on Squarespace, Wix, Shopify, and WordPress.
          </p>

          {/* Pill CTA Button (GET TO KNOW US +) */}
          <div className="hero-body-element pt-4">
            <Link
              href="#platform-dive"
              className="inline-flex items-center justify-center space-x-4 bg-white/5 border border-white/10 rounded-full px-8 py-4.5 hover:bg-white hover:text-black hover:border-white text-white transition-all duration-300 group"
            >
              <span className="text-xs font-bold uppercase tracking-[0.15em]">Get to know us</span>
              <span className="text-sm font-light leading-none translate-y-[-0.5px]">+</span>
            </Link>
          </div>
        </div>

        {/* Right Column (Generative Orb Spinner + Floating Glassmorphic Cards) */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] md:min-h-[480px] lg:min-h-[600px] w-full">
          
          {/* SVG Orbital Network backdrop (hero-bg-asset) */}
          <div className="hero-bg-asset absolute w-[110%] h-[110%] pointer-events-none select-none z-0 flex items-center justify-center opacity-100">
            <style jsx>{`
              @keyframes rot-clockwise {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes rot-counter {
                from { transform: rotate(0deg); }
                to { transform: rotate(-360deg); }
              }
              @keyframes pulse-slow {
                0%, 100% { opacity: 0.08; }
                50% { opacity: 0.18; }
              }
              .animate-clockwise {
                animation: rot-clockwise 55s linear infinite;
                transform-origin: center;
              }
              .animate-counter {
                animation: rot-counter 38s linear infinite;
                transform-origin: center;
              }
              .animate-pulse-slow {
                animation: pulse-slow 8s ease-in-out infinite;
              }
            `}</style>

            <svg className="w-full h-full text-white/20" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="0.08" fill="none" />
              
              {/* Clockwise rotating ring */}
              <g className="animate-clockwise">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.12" strokeDasharray="1, 8" fill="none" />
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.08" fill="none" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.05" strokeDasharray="2, 2" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.05" strokeDasharray="2, 2" />
                <circle cx="50" cy="10" r="0.8" fill="#E85C2B" />
                <circle cx="50" cy="90" r="0.8" fill="currentColor" />
              </g>

              {/* Counter-clockwise rotating ring */}
              <g className="animate-counter">
                <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.1" strokeDasharray="10, 15" fill="none" />
                <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.08" fill="none" strokeDasharray="2, 4" />
                <circle cx="15" cy="50" r="0.8" fill="currentColor" />
                <circle cx="85" cy="50" r="0.8" fill="#E85C2B" />
              </g>

              {/* Core center glows */}
              <circle cx="50" cy="50" r="12" className="animate-pulse-slow text-orange/10" fill="currentColor" />
              <circle cx="50" cy="50" r="6" stroke="currentColor" strokeWidth="0.15" fill="none" />
            </svg>
          </div>

          {/* Floating Main Hero Video Card */}
          <div className="hero-bg-asset relative w-full max-w-[800px] lg:max-w-[1000px] aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl z-10 animate-[float-ambient_6s_infinite_ease-in-out]">
            <video
              src="/videos/banner-pixxel.mp4"
              poster="/hero-sketch.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity duration-300"
            />
          </div>

        </div>

      </div>

      {/* Scroll indicator (Bottom-right corner) */}
      <div className="absolute bottom-12 right-12 hidden md:flex flex-col items-center space-y-4 text-white/30 z-10 select-none">
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full h-1/2 bg-orange"
            style={{
              animation: "scroll-line 2.2s infinite ease-in-out"
            }}
          />
        </div>

        {/* CSS Keyframe for the vertical scrolling line */}
        <style jsx>{`
          @keyframes scroll-line {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
        `}</style>
      </div>

    </section>
  );
}
