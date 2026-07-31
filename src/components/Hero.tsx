"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return; // Skip animation, show default static layout
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Headline text reveal (y: 40 -> 0, opacity: 0 -> 1, stagger: 0.08s, ease: power3.out)
      tl.fromTo(
        ".hero-title-line",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
      );

      // 2. Hero mockups staggered entrance (starting just as headline finishes)
      const mockups = mockupsRef.current?.children;
      if (mockups) {
        const targetAngles = [-6, -2, 2, 6];
        tl.fromTo(
          mockups,
          { opacity: 0, y: 50, rotate: -4 },
          {
            opacity: 1,
            y: 0,
            rotate: (i) => targetAngles[i] || 0,
            duration: 0.8,
            stagger: 0.1, // ~0.1s offset per window
            ease: "power2.out",
          },
          "-=0.1" // begins right as headline finishes
        );
      }

      // 3. Subhead + CTAs fade + rise (delayed to run after the headline completes)
      tl.fromTo(
        ".hero-body-element",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.5" // runs concurrent to mockup entrance, ensuring headline is fully read first
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-off-black text-white overflow-hidden pt-32 pb-0 flex flex-col justify-between"
    >
      {/* Ambient background detail (slow movement) */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-orange/5 rounded-full blur-[140px] pointer-events-none animate-[pulse_10s_infinite_ease-in-out]" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-white/5 rounded-full blur-[110px] pointer-events-none animate-[pulse_15s_infinite_ease-in-out]" />

      {/* Hero Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
        
        {/* Left Text Column */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          <div className="hero-body-element inline-flex items-center space-x-2 border border-grey-800/20 px-3 py-1 self-start bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-grey-800">
              AI-Native Digital Agency
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-white leading-[1.05]">
            <span className="block overflow-hidden py-1">
              <span className="hero-title-line inline-block">We build high-converting websites</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="hero-title-line inline-block">on the platform that fits</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="hero-title-line inline-block text-orange">your business.</span>
            </span>
          </h1>

          <p className="hero-body-element text-base sm:text-lg text-grey-800 max-w-xl font-normal leading-relaxed">
            Pixxelu builds exclusively on Squarespace, Wix, Shopify, and WordPress. We match your business to the right platform instead of forcing one tech stack.
          </p>

          <div className="hero-body-element flex flex-wrap gap-4 pt-2">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center text-xs font-bold tracking-[0.1em] uppercase bg-orange text-white px-7 py-4 hover:bg-orange/90 transition-all duration-300 hover:scale-[1.02]"
            >
              Start a project
            </Link>
            <Link
              href="#platform-dive"
              className="inline-flex items-center justify-center text-xs font-bold tracking-[0.1em] uppercase border border-grey-800/40 text-white px-7 py-4 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              See our platforms
            </Link>
          </div>
        </div>

        {/* Right Columns (Overlapping micro-UI mockups) */}
        <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] flex items-center justify-center">
          <div
            ref={mockupsRef}
            className="relative w-full h-full max-w-[400px] flex items-center justify-center"
          >
            {/* Mockup 1: Squarespace */}
            <div
              className="absolute"
              style={{
                transform: "translate(-60px, -60px) rotate(-6deg)",
                zIndex: 10,
              }}
            >
              <div className="animate-[float-ambient_6s_infinite_ease-in-out] w-[220px] h-[150px] bg-[#151515] border border-white/10 shadow-2xl p-2.5 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-1 border-b border-white/10 shrink-0">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/80"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80"></div>
                  </div>
                  <span className="text-[6px] text-grey-800 uppercase font-mono tracking-wider">
                    squarespace.co
                  </span>
                </div>
                {/* Micro UI: Portfolio Layout */}
                <div className="flex-1 flex flex-col space-y-2 mt-2">
                  <div className="h-2.5 bg-white/20 w-3/4"></div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="aspect-[4/3] bg-orange/40"></div>
                    <div className="aspect-[4/3] bg-white/5 border border-white/10"></div>
                  </div>
                  <div className="h-1 bg-white/10 w-full"></div>
                </div>
              </div>
            </div>

            {/* Mockup 2: Wix */}
            <div
              className="absolute"
              style={{
                transform: "translate(60px, -40px) rotate(-2deg)",
                zIndex: 11,
              }}
            >
              <div className="animate-[float-ambient_7s_infinite_ease-in-out_1s] w-[220px] h-[150px] bg-[#1c1c1c] border border-white/10 shadow-2xl p-2.5 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-1 border-b border-white/10 shrink-0">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/80"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80"></div>
                  </div>
                  <span className="text-[6px] text-grey-800 uppercase font-mono tracking-wider">
                    wixstudio.co
                  </span>
                </div>
                {/* Micro UI: Design Studio dashboard */}
                <div className="flex-1 flex flex-col justify-between mt-2">
                  <div className="h-2 bg-white/20 w-2/3"></div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="h-10 bg-white/5 border border-white/10 flex flex-col justify-center items-center">
                      <div className="w-4 h-1 bg-white/30 mb-1"></div>
                      <div className="w-6 h-1 bg-white/10"></div>
                    </div>
                    <div className="h-10 bg-orange/10 border border-orange/30 flex flex-col justify-center items-center">
                      <div className="w-4 h-1 bg-orange/60 mb-1"></div>
                      <div className="w-6 h-1 bg-orange/30"></div>
                    </div>
                    <div className="h-10 bg-white/5 border border-white/10 flex flex-col justify-center items-center">
                      <div className="w-4 h-1 bg-white/30 mb-1"></div>
                      <div className="w-6 h-1 bg-white/10"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mockup 3: Shopify */}
            <div
              className="absolute"
              style={{
                transform: "translate(-40px, 50px) rotate(2deg)",
                zIndex: 12,
              }}
            >
              <div className="animate-[float-ambient_5s_infinite_ease-in-out_2s] w-[220px] h-[150px] bg-[#121212] border border-white/10 shadow-2xl p-2.5 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-1 border-b border-white/10 shrink-0">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/80"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80"></div>
                  </div>
                  <span className="text-[6px] text-grey-800 uppercase font-mono tracking-wider">
                    shopify.store
                  </span>
                </div>
                {/* Micro UI: Store Product Detail and Cart Checkout */}
                <div className="flex-1 flex flex-col justify-between mt-2">
                  <div className="flex justify-between items-center">
                    <div className="h-2.5 bg-white/30 w-1/2"></div>
                    <div className="h-3.5 bg-orange w-10 flex items-center justify-center text-[5px] font-bold">ADD</div>
                  </div>
                  <div className="flex-1 flex items-center space-x-2 bg-white/5 border border-white/5 p-1.5 mt-2">
                    <div className="w-7 h-7 bg-white/10 border border-white/10"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-1.5 bg-white/20 w-4/5"></div>
                      <div className="h-1 bg-white/10 w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mockup 4: WordPress */}
            <div
              className="absolute"
              style={{
                transform: "translate(50px, 70px) rotate(6deg)",
                zIndex: 13,
              }}
            >
              <div className="animate-[float-ambient_8s_infinite_ease-in-out_1.5s] w-[220px] h-[150px] bg-[#1a1a1a] border border-white/10 shadow-2xl p-2.5 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-1 border-b border-white/10 shrink-0">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/80"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80"></div>
                  </div>
                  <span className="text-[6px] text-grey-800 uppercase font-mono tracking-wider">
                    wordpress.cms
                  </span>
                </div>
                {/* Micro UI: CMS Dashboard chart */}
                <div className="flex-1 flex flex-col justify-between mt-2">
                  <div className="flex justify-between items-center">
                    <div className="h-2 bg-orange w-12"></div>
                    <div className="h-1 bg-white/10 w-6"></div>
                  </div>
                  {/* SVG Mini Chart */}
                  <div className="h-10 flex items-end justify-between px-1.5 py-1 bg-white/5 border border-white/5 mt-1.5">
                    <div className="w-1.5 bg-orange/40 h-[30%]"></div>
                    <div className="w-1.5 bg-orange/50 h-[50%]"></div>
                    <div className="w-1.5 bg-orange/60 h-[40%]"></div>
                    <div className="w-1.5 bg-orange h-[80%]"></div>
                    <div className="w-1.5 bg-orange/70 h-[60%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


