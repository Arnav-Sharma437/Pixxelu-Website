"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProblemStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Set static default values for stats
      const val1 = document.querySelector(".stat-val-1");
      if (val1) val1.textContent = "50+";
      const val2 = document.querySelector(".stat-val-2");
      if (val2) val2.textContent = "4 Platforms";
      const val3 = document.querySelector(".stat-val-3");
      if (val3) val3.textContent = "5.0 Avg";
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Stats count-up ScrollTrigger animation
      const stats = [
        { target: 50, decimals: 0, suffix: "+", element: ".stat-val-1" },
        { target: 4, decimals: 0, suffix: " Platforms", element: ".stat-val-2" },
        { target: 5.0, decimals: 1, suffix: " Avg", element: ".stat-val-3" },
      ];

      stats.forEach((stat) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat.element,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            const el = document.querySelector(stat.element);
            if (el) {
              el.textContent = obj.val.toFixed(stat.decimals) + stat.suffix;
            }
          },
        });
      });

      // 2. Staggered fade + rise reveal for three columns
      gsap.fromTo(
        ".problem-column",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".problem-columns-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-white text-black py-24 md:py-32 border-b border-grey-800/10 relative overflow-hidden bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:5rem_5rem]"
    >
      {/* Drifting background orange/grey glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange/5 rounded-full blur-[90px] pointer-events-none animate-[pulse_12s_infinite_ease-in-out]" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-grey-800/10 rounded-full blur-[110px] pointer-events-none animate-[pulse_18s_infinite_ease-in-out_2s]" />

      {/* Continuous moving tech lines / shapes in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {/* Floating SVG mesh grid that slowly rotates */}
        <svg className="absolute top-12 right-12 w-48 h-48 text-grey-800/30 animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="5,5" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        {/* Pulsing sine wave layout */}
        <svg className="absolute bottom-12 left-12 w-64 h-64 text-orange/20 animate-[pulse_10s_infinite_ease-in-out]" viewBox="0 0 200 200">
          <path d="M20,100 Q60,40 100,100 T180,100" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="8,8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Animated Floating Stats Board */}
        <div className="bg-white/70 backdrop-blur-md border border-grey-800/10 rounded-2xl p-6 md:p-8 shadow-sm mb-20 hover:shadow-md transition-shadow duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-grey-800/10">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center md:items-start md:px-8 justify-center group pb-6 md:pb-0">
              <div className="flex items-center space-x-2">
                <span className="stat-val-1 text-4xl md:text-5xl font-black font-display tracking-tight text-black select-none group-hover:text-orange transition-colors duration-300">
                  0+
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_8px_rgba(232,92,43,0.6)]" />
              </div>
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-grey-500 mt-2">
                Custom Sites Launched
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center md:items-start md:px-8 justify-center group py-6 md:py-0">
              <div className="flex items-center space-x-2">
                <span className="stat-val-2 text-4xl md:text-5xl font-black font-display tracking-tight text-black select-none group-hover:text-orange transition-colors duration-300">
                  0 Platforms
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-grey-800" />
              </div>
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-grey-500 mt-2">
                Mastered & Custom-Built
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center md:items-start md:px-8 justify-center group pt-6 md:pt-0">
              <div className="flex items-center space-x-2">
                <span className="stat-val-3 text-4xl md:text-5xl font-black font-display tracking-tight text-black select-none group-hover:text-orange transition-colors duration-300">
                  0.0 Avg
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange shadow-[0_0_8px_rgba(232,92,43,0.6)]" />
              </div>
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-grey-500 mt-2">
                Client Satisfaction Rating
              </span>
            </div>

          </div>
        </div>

        {/* Main thesis statement */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-black leading-[1.05]">
            Choosing the wrong platform{" "}
            <span className="text-orange underline decoration-orange/30 decoration-wavy underline-offset-[12px]">
              costs more
            </span>{" "}
            than a website redesign.
          </h2>
        </div>

        {/* Staggered Nodal Hover Cards */}
        <div className="problem-columns-grid grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 text-left items-stretch">
          
          {/* Card 1 - The Platform Trap */}
          <div className="problem-column md:col-span-4 bg-white border border-grey-800/10 hover:border-orange/20 p-8 rounded-2xl transition-all duration-500 hover:shadow-[0_22px_45px_rgba(232,92,43,0.03)] flex flex-col justify-between group relative overflow-hidden h-full">
            <div className="absolute top-6 right-8 text-[40px] font-black font-display text-grey-800/5 select-none transition-colors group-hover:text-orange/5">
              01
            </div>

            <div className="space-y-5">
              {/* Lock Icon */}
              <div className="w-10 h-10 rounded-lg bg-orange/5 text-orange flex items-center justify-center group-hover:bg-orange group-hover:text-white transition-all duration-300">
                <svg className="w-5 h-5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>

              <h3 className="text-lg font-bold tracking-tight text-black font-display">
                The Platform Trap
              </h3>
              
              <p className="text-sm text-grey-500 font-normal leading-relaxed">
                Most digital agencies specialize in exactly one platform. If they only know WordPress, they build you a WordPress site. If they only know Webflow, everything is Webflow. As a result, companies end up fighting systems that are either overly complex for operations or too limited to support their commerce scaling.
              </p>
            </div>
          </div>

          {/* Card 2 - Our Methodology */}
          <div className="problem-column md:col-span-4 bg-white border border-grey-800/10 hover:border-orange/20 p-8 rounded-2xl transition-all duration-500 hover:shadow-[0_22px_45px_rgba(232,92,43,0.03)] flex flex-col justify-between group relative overflow-hidden h-full">
            <div className="absolute top-6 right-8 text-[40px] font-black font-display text-grey-800/5 select-none transition-colors group-hover:text-orange/5">
              02
            </div>

            <div className="space-y-5">
              {/* Branch Node Icon */}
              <div className="w-10 h-10 rounded-lg bg-orange/5 text-orange flex items-center justify-center group-hover:bg-orange group-hover:text-white transition-all duration-300">
                <svg className="w-5 h-5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="M9 12h3a3 3 0 003-3V8m-6 4h3a3 3 0 013 3v1" />
                </svg>
              </div>

              <h3 className="text-lg font-bold tracking-tight text-black font-display">
                Our Methodology
              </h3>

              <p className="text-sm text-grey-500 font-normal leading-relaxed">
                We operate differently. Pixxelu specializes exclusively in four major web systems: Squarespace, Wix, Shopify, and WordPress. We analyze your team's workflow, editing capabilities, API integrations, and conversion goals first. Then, and only then, we choose the engine that aligns with your operational realities.
              </p>
            </div>
          </div>

          {/* Card 3 - Operational Freedom */}
          <div className="problem-column md:col-span-4 bg-white border border-grey-800/10 hover:border-orange/20 p-8 rounded-2xl transition-all duration-500 hover:shadow-[0_22px_45px_rgba(232,92,43,0.03)] flex flex-col justify-between group relative overflow-hidden h-full">
            <div className="absolute top-6 right-8 text-[40px] font-black font-display text-grey-800/5 select-none transition-colors group-hover:text-orange/5">
              03
            </div>

            <div className="space-y-5">
              {/* Paper Plane Icon */}
              <div className="w-10 h-10 rounded-lg bg-orange/5 text-orange flex items-center justify-center group-hover:bg-orange group-hover:text-white transition-all duration-300">
                <svg className="w-5 h-5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>

              <h3 className="text-lg font-bold tracking-tight text-black font-display">
                Operational Freedom
              </h3>

              <p className="text-sm text-grey-500 font-normal leading-relaxed">
                By matching the right software backend, we ensure your marketing team can publish blogs instantly, your commerce team can manage inventory effortlessly, and your developers can integrate custom extensions without breaking core layouts.
              </p>
            </div>

            <div className="pt-6 border-t border-grey-800/5 mt-4">
              <Link
                href="#platform-dive"
                className="inline-flex items-center text-xs font-bold tracking-[0.12em] text-orange hover:text-black uppercase group/btn transition-colors duration-300"
              >
                <span>Compare our platforms</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/btn:translate-x-1.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
