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

      // 4. Fade in background vector assets
      tl.fromTo(
        ".hero-bg-asset",
        { opacity: 0, scale: 0.97 },
        { opacity: 0.25, scale: 1, duration: 1.2, ease: "power2.out" },
        "-=0.7"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0c0c0c] text-white min-h-screen flex items-center justify-between overflow-hidden pt-36 pb-24 md:pb-36"
    >
      
      {/* Background circular outline vector (hero-bg-asset) */}
      <div className="hero-bg-asset absolute right-[-10%] top-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[850px] max-h-[850px] pointer-events-none select-none z-0 opacity-15">
        <svg className="w-full h-full text-white" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="49.5" stroke="currentColor" strokeWidth="0.1" fill="none" />
        </svg>
      </div>

      {/* Massive vertical stacked letters watermark running down the right-center (hero-bg-asset) */}
      <div className="hero-bg-asset absolute right-[15%] top-1/2 -translate-y-1/2 flex flex-col items-center justify-center space-y-4 text-white font-black text-[9vw] font-display uppercase select-none pointer-events-none leading-none z-0 opacity-10">
        <span>p</span>
        <span>i</span>
        <span>x</span>
        <span>x</span>
        <span>e</span>
        <span>l</span>
        <span>u</span>
      </div>

      {/* Micro-coordinate dots (hero-bg-asset) */}
      <div className="hero-bg-asset absolute top-[28%] right-[42%] text-white pointer-events-none opacity-20 z-0">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          <circle cx="4" cy="12" r="1.2" fill="currentColor" />
          <circle cx="20" cy="12" r="1.2" fill="currentColor" />
          <circle cx="12" cy="4" r="1.2" fill="currentColor" />
          <circle cx="12" cy="20" r="1.2" fill="currentColor" />
          <circle cx="16" cy="16" r="1.2" fill="#E85C2B" />
        </svg>
      </div>

      <div className="hero-bg-asset absolute bottom-[22%] left-[45%] text-white pointer-events-none opacity-25 z-0">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          <circle cx="4" cy="12" r="1.2" fill="currentColor" />
          <circle cx="20" cy="12" r="1.2" fill="#E85C2B" />
          <circle cx="12" cy="4" r="1.2" fill="currentColor" />
          <circle cx="12" cy="20" r="1.2" fill="currentColor" />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
        
        {/* Left Column (Content text stack) */}
        <div className="lg:col-span-8 flex flex-col space-y-6 text-left">
          
          {/* Muted red/orange eyebrow */}
          <div className="hero-eyebrow text-[10px] font-bold tracking-[0.3em] uppercase text-orange">
            We Are Pixxelu
          </div>

          {/* Large display title (A digital agency focused on web.) */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display tracking-tight text-white leading-[1.05]">
            <span className="block overflow-hidden py-1">
              <span className="hero-title-line inline-block">A digital agency</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="hero-title-line inline-block">focused on web<span className="text-orange">.</span></span>
            </span>
          </h1>

          {/* Subhead Description Paragraph */}
          <p className="hero-body-element text-sm sm:text-base text-grey-800 max-w-xl font-normal leading-relaxed">
            We are a creative team of designers, developers, strategists, and producers building elevated websites on Squarespace, Wix, Shopify, and WordPress.
          </p>

          {/* Pill CTA Button (GET TO KNOW US +) */}
          <div className="hero-body-element pt-4">
            <Link
              href="#platform-dive"
              className="inline-flex items-center justify-center space-x-3 bg-white/5 border border-white/10 rounded-full px-7 py-4 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
            >
              <span className="text-xs font-bold uppercase tracking-[0.15em]">Get to know us</span>
              <span className="text-sm font-light leading-none translate-y-[-0.5px]">+</span>
            </Link>
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
