"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS_DATA = [
  { value: 50, suffix: "+", label: "Sites Launched" },
  { value: 4, suffix: "", label: "Platforms Mastered" },
  { value: 5.0, suffix: "", label: "Average Rating", isFloat: true },
];

export default function CasesStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const stats = containerRef.current?.querySelectorAll(".case-page-stat");
      
      stats?.forEach((stat) => {
        const val = parseFloat(stat.getAttribute("data-val") || "0");
        const suffix = stat.getAttribute("data-suffix") || "";
        const isFloat = stat.getAttribute("data-float") === "true";
        const obj = { value: 0 };
        
        gsap.to(obj, {
          value: val,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            const formattedValue = isFloat ? obj.value.toFixed(1) : Math.round(obj.value);
            stat.textContent = `${formattedValue}${suffix}`;
          }
        });
      });

      // Simple fade up for the whole section
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-transparent text-white py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
        
        {STATS_DATA.map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center pt-8 md:pt-0 text-center">
            <span 
              className="case-page-stat text-6xl md:text-8xl font-black font-display text-orange leading-none mb-4"
              data-val={stat.value}
              data-suffix={stat.suffix}
              data-float={stat.isFloat}
            >
              0{stat.suffix}
            </span>
            <span className="text-sm md:text-base font-bold tracking-[0.15em] text-zinc-400 uppercase">
              {stat.label}
            </span>
          </div>
        ))}

      </div>
    </section>
  );
}
