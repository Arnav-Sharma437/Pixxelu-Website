"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if prefers-reduced-motion is active
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return; // Skip animation, show default static layout
    }

    // Animate content elements (headline, subhead, buttons)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fade-up",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // Animate staggered browser mockups
      const mockups = mockupsRef.current?.children;
      if (mockups) {
        gsap.fromTo(
          mockups,
          { opacity: 0, y: 60, rotate: -4 },
          {
            opacity: 1,
            y: 0,
            rotate: (i) => [-6, -2, 2, 6][i] || 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
            delay: 0.4,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-off-black text-white overflow-hidden pt-32 pb-0 flex flex-col justify-between"
    >
      {/* Background radial accent */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
        {/* Left Text Column */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          <div className="hero-fade-up inline-flex items-center space-x-2 border border-grey-800/20 px-3 py-1 self-start bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-grey-800">
              AI-Native Digital Agency
            </span>
          </div>

          <h1 className="hero-fade-up text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-white leading-[1.05]">
            We build high-converting websites on the platform that fits your business.
          </h1>

          <p className="hero-fade-up text-base sm:text-lg text-grey-800 max-w-xl font-normal leading-relaxed">
            Pixxelu builds exclusively on Squarespace, Wix, Shopify, and WordPress. We match your business to the right platform instead of forcing one tech stack.
          </p>

          <div className="hero-fade-up flex flex-wrap gap-4 pt-2">
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

        {/* Right Abstract Visuals Column (Overlap Mockups) */}
        <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] flex items-center justify-center">
          <div
            ref={mockupsRef}
            className="relative w-full h-full max-w-[400px] flex items-center justify-center"
          >
            {/* Mockup 1: Squarespace */}
            <div
              className="absolute w-[220px] h-[150px] bg-[#1a1a1a] border border-white/10 shadow-2xl p-2 flex flex-col justify-between"
              style={{
                transform: "translate(-60px, -60px) rotate(-6deg)",
                zIndex: 10,
              }}
            >
              <div className="flex items-center justify-between pb-1 border-b border-white/10 shrink-0">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                </div>
                <span className="text-[6px] text-grey-800 uppercase font-mono tracking-widest">
                  Squarespace
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-1.5">
                <div className="h-2.5 bg-orange/40 w-2/3"></div>
                <div className="h-1.5 bg-white/10 w-full"></div>
                <div className="h-1.5 bg-white/10 w-4/5"></div>
              </div>
            </div>

            {/* Mockup 2: Wix */}
            <div
              className="absolute w-[220px] h-[150px] bg-[#1e1e1e] border border-white/10 shadow-2xl p-2 flex flex-col justify-between"
              style={{
                transform: "translate(60px, -40px) rotate(-2deg)",
                zIndex: 11,
              }}
            >
              <div className="flex items-center justify-between pb-1 border-b border-white/10 shrink-0">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                </div>
                <span className="text-[6px] text-grey-800 uppercase font-mono tracking-widest">
                  Wix Studio
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-2">
                <div className="h-2 bg-white/20 w-3/4"></div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="h-5 bg-white/5 border border-white/10"></div>
                  <div className="h-5 bg-orange/30 border border-orange/20"></div>
                  <div className="h-5 bg-white/5 border border-white/10"></div>
                </div>
              </div>
            </div>

            {/* Mockup 3: Shopify */}
            <div
              className="absolute w-[220px] h-[150px] bg-[#161616] border border-white/10 shadow-2xl p-2 flex flex-col justify-between"
              style={{
                transform: "translate(-40px, 50px) rotate(2deg)",
                zIndex: 12,
              }}
            >
              <div className="flex items-center justify-between pb-1 border-b border-white/10 shrink-0">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                </div>
                <span className="text-[6px] text-grey-800 uppercase font-mono tracking-widest">
                  Shopify Store
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-between py-1.5">
                <div className="flex justify-between items-center">
                  <div className="h-2 bg-white/20 w-1/3"></div>
                  <div className="h-2 bg-orange w-8"></div>
                </div>
                <div className="h-8 bg-white/5 border border-white/10 flex items-center justify-center">
                  <div className="w-3/4 h-2 bg-white/10"></div>
                </div>
              </div>
            </div>

            {/* Mockup 4: WordPress */}
            <div
              className="absolute w-[220px] h-[150px] bg-[#222222] border border-white/10 shadow-2xl p-2 flex flex-col justify-between"
              style={{
                transform: "translate(50px, 70px) rotate(6deg)",
                zIndex: 13,
              }}
            >
              <div className="flex items-center justify-between pb-1 border-b border-white/10 shrink-0">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                </div>
                <span className="text-[6px] text-grey-800 uppercase font-mono tracking-widest">
                  WordPress CMS
                </span>
              </div>
              <div className="flex-1 flex space-y-1.5 justify-center flex-col">
                <div className="h-2 bg-orange w-1/2"></div>
                <div className="h-1.5 bg-white/15 w-full"></div>
                <div className="h-1.5 bg-white/15 w-full"></div>
                <div className="h-1.5 bg-white/15 w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Strip (White section with hairline vertical dividers) */}
      <div className="bg-white text-black mt-20 border-t border-grey-800/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
          <div className="flex flex-col items-center md:items-start md:px-8 py-2 justify-center">
            <span className="text-3xl font-bold font-display tracking-tight text-black">
              50+
            </span>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-grey-500 mt-1">
              Custom Sites Launched
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start md:px-8 py-2 justify-center border-y md:border-y-0 md:border-x border-grey-800/10">
            <span className="text-3xl font-bold font-display tracking-tight text-black">
              4 Platforms
            </span>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-grey-500 mt-1">
              Mastered & Custom-Built
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start md:px-8 py-2 justify-center">
            <span className="text-3xl font-bold font-display tracking-tight text-black">
              5.0 Avg
            </span>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-grey-500 mt-1">
              Client Satisfaction Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
