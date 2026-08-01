"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItem {
  value: number;
  decimals: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const STATS_DATA: StatItem[] = [
  { value: 5.0, decimals: 1, suffix: ".0", label: "Average Client Rating" },
  { value: 4, decimals: 0, suffix: "", label: "Platforms Supported" },
  { value: 2, decimals: 0, prefix: "", suffix: "x", label: "Average Conversion Lift" },
];

export default function StatsBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const statsElements = barRef.current?.querySelectorAll(".stat-number");
      if (!statsElements || !statsElements.length) return;

      statsElements.forEach((el: any, index: number) => {
        const data = STATS_DATA[index];
        const targetVal = data.value;
        const decimals = data.decimals;
        
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: targetVal,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          onUpdate: () => {
            el.innerText = (data.prefix || "") + obj.val.toFixed(decimals) + data.suffix;
          },
        });
      });
    }, barRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={barRef}
      className="bg-orange/90 backdrop-blur-sm text-white py-16 md:py-20 overflow-hidden relative border-y border-white/10 shadow-sm"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center">
          {STATS_DATA.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <span className="stat-number text-5xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white select-none">
                {item.prefix || ""}{item.value.toFixed(item.decimals)}{item.suffix}
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/80 mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
