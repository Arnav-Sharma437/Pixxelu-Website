"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Check } from "lucide-react";
import WaveText from "./WaveText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const badPractices = [
  "Bloated templates that take 10 seconds to load.",
  "Told 'WordPress can't do that' by junior devs.",
  "Fat monthly retainer just to update a plugin.",
  "Safe, on-brand, but instantly forgettable UI.",
  "Off-the-shelf Shopify themes that look like everyone else's.",
];

const goodPractices = [
  "Headless CMS architectures that load instantly.",
  "We bend WordPress, Shopify, and Webflow to our will.",
  "Fixed scope, fixed price, zero surprise invoices.",
  "Custom, opinionated UI that makes competitors jealous.",
  "Bespoke e-commerce experiences built for conversion.",
];

export default function OhhMyComparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".comparison-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="text-[#1a1a1a] py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-[-5%] w-80 h-32 bg-white/40 blur-3xl rounded-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="comparison-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] cursor-pointer">
            <WaveText text="SAME BRIEF." />
            <br />
            <span className="text-black/40"><WaveText text="DIFFERENT STUDIO." /></span>
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-5xl mx-auto">
          
          {/* Bad Practices (Them) */}
          <div className="comparison-card bg-white/60 backdrop-blur-md rounded-2xl p-10 border border-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-400" />
            <h3 className="text-xl font-bold mb-8 text-black/40 uppercase tracking-widest border-b border-black/10 pb-4">
              Traditional Agency
            </h3>
            <ul className="comparison-list-1 space-y-6">
              {badPractices.map((text, i) => (
                <li key={i} className="flex items-start text-black/60 group">
                  <span className="mr-4 mt-1 bg-white p-1 rounded-full text-red-400 shadow-sm">
                    <X size={16} strokeWidth={3} />
                  </span>
                  <span className="text-lg leading-snug font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Good Practices (Us) */}
          <div className="comparison-card bg-white rounded-2xl p-10 shadow-2xl relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#00c853]" />
            <div className="absolute top-4 right-4 bg-[#f85c37] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider animate-bounce">
              Better
            </div>
            <h3 className="text-xl font-black mb-8 text-[#1a1a1a] uppercase tracking-widest border-b border-black/10 pb-4 cursor-pointer">
              <WaveText text="PIXXELU STUDIO" />
            </h3>
            <ul className="comparison-list-2 space-y-6">
              {goodPractices.map((text, i) => (
                <li key={i} className="flex items-start text-[#1a1a1a] group">
                  <span className="mr-4 mt-1 bg-[#00c853]/20 p-1 rounded-full text-[#00c853]">
                    <Check size={16} strokeWidth={4} />
                  </span>
                  <span className="text-lg leading-snug font-bold">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-24">
          <p className="text-2xl md:text-3xl font-black tracking-tight cursor-pointer">
            <WaveText text="Same brief, same budget. " />
            <br className="md:hidden" />
            <span className="text-[#f85c37]"><WaveText text="Wildly different outcome." /></span>
          </p>
          <div className="mt-8">
            <button className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#f85c37] hover:scale-105 transition-all duration-300 shadow-lg">
              Pick your plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
