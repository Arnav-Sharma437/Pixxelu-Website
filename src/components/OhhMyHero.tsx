"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function OhhMyHero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Fade + translate up for the small intro text
      tl.fromTo(
        ".hero-intro",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Animate the main big text lines
      tl.fromTo(
        ".hero-big-text-line",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" },
        "-=0.5"
      );

      // Animate the description paragraph
      tl.fromTo(
        ".hero-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
      
      // Animate buttons
      tl.fromTo(
        ".hero-button",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center bg-[#050505] text-white pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background ambient glow matching Pixxelu's style but darker */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className="hero-intro text-orange font-mono text-sm tracking-widest uppercase mb-8">
          Pixxelu Studio
        </p>

        <h1 
          ref={textRef}
          className="font-black font-display uppercase leading-[0.85] tracking-tighter text-[15vw] sm:text-[12vw] md:text-[130px] lg:text-[160px]"
        >
          <span className="block overflow-hidden">
            <span className="hero-big-text-line block text-white">IMPOSSIBLE</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-big-text-line block text-zinc-400">TO IGNORE <span className="text-orange">.</span></span>
          </span>
        </h1>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h2 className="hero-desc text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
              We make people stop and ask, "who made that?"
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-6">
            <p className="hero-desc text-zinc-400 text-lg md:text-xl leading-relaxed mb-10">
              That reaction is the whole job. We do strategy, design, and code for brands that refuse to look ordinary. No templates, ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="hero-button inline-flex items-center justify-center bg-orange text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors duration-300">
                Book a call
              </a>
              <a href="#work" className="hero-button inline-flex items-center justify-center border border-white/20 bg-white/5 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors duration-300">
                See the work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
