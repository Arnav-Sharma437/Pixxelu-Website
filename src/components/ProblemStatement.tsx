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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
      className="bg-white text-black py-24 md:py-32 border-b border-grey-800/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Animated Stats Strip (At the top of the content section) */}
        <div className="border-b border-grey-800/10 pb-16 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            <div className="flex flex-col items-center md:items-start md:px-8 justify-center">
              <span className="stat-val-1 text-3xl font-extrabold font-display tracking-tight text-black select-none">
                0+
              </span>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-grey-500 mt-1">
                Custom Sites Launched
              </span>
            </div>
            <div className="flex flex-col items-center md:items-start md:px-8 justify-center border-y md:border-y-0 md:border-x border-grey-800/10">
              <span className="stat-val-2 text-3xl font-extrabold font-display tracking-tight text-black select-none">
                0 Platforms
              </span>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-grey-500 mt-1">
                Mastered & Custom-Built
              </span>
            </div>
            <div className="flex flex-col items-center md:items-start md:px-8 justify-center">
              <span className="stat-val-3 text-3xl font-extrabold font-display tracking-tight text-black select-none">
                0.0 Avg
              </span>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-grey-500 mt-1">
                Client Satisfaction Rating
              </span>
            </div>
          </div>
        </div>

        {/* Main thesis statement */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-black leading-[1.1]">
            Choosing the wrong platform costs more than a website redesign.
          </h2>
        </div>

        {/* Detailed context paragraphs in columns */}
        <div className="problem-columns-grid grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
          <div className="problem-column md:col-span-4 flex flex-col space-y-4">
            <h3 className="text-base font-bold tracking-wider text-orange uppercase font-display">
              The Platform Trap
            </h3>
            <p className="text-sm sm:text-base text-grey-500 font-normal leading-relaxed">
              Most digital agencies specialize in exactly one platform. If they only know WordPress, they build you a WordPress site. If they only know Webflow, everything is Webflow. As a result, companies end up fighting systems that are either overly complex for their lean operations or too limited to support their commerce scaling.
            </p>
          </div>

          <div className="problem-column md:col-span-4 flex flex-col space-y-4">
            <h3 className="text-base font-bold tracking-wider text-black uppercase font-display">
              Our Methodology
            </h3>
            <p className="text-sm sm:text-base text-grey-500 font-normal leading-relaxed">
              We operate differently. Pixxelu specializes exclusively in four major web systems: Squarespace, Wix, Shopify, and WordPress. We analyze your team's workflow, editing capabilities, API integrations, and conversion goals first. Then, and only then, we choose the engine that aligns with your operational realities.
            </p>
          </div>

          <div className="problem-column md:col-span-4 flex flex-col space-y-4 justify-between">
            <div className="space-y-4">
              <h3 className="text-base font-bold tracking-wider text-black uppercase font-display">
                Operational Freedom
              </h3>
              <p className="text-sm sm:text-base text-grey-500 font-normal leading-relaxed">
                By matching the right software backend, we ensure your marketing team can publish blogs instantly, your commerce team can manage inventory effortlessly, and your developers can integrate custom extensions without breaking core layouts.
              </p>
            </div>
            
            <div className="pt-6 md:pt-0">
              <Link
                href="#platform-dive"
                className="underline-reveal inline-flex items-center text-xs font-bold tracking-[0.1em] text-orange hover:text-black uppercase group transition-colors duration-300"
              >
                <span>Compare our platforms</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
