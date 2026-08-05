"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const badPractices = [
  "Pitched by seniors, built by whoever is free.",
  "Booked out for weeks, then slow to deliver.",
  "Fat monthly retainer, plus surprise invoices.",
  "Five calls and a deck before a single pixel.",
  "Safe, on brand-ish, instantly forgettable.",
];

const goodPractices = [
  "You talk to the person actually designing it.",
  "First real screens in days, not quarters.",
  "Fixed scope, fixed price, zero surprises.",
  "Less meetings. More shipping.",
  "Custom, opinionated, genuinely hard to forget.",
];

export default function OhhMyComparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".comparison-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Lists reveal
      gsap.fromTo(
        ".comparison-list-1 li",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".comparison-list-2 li",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Footer reveal
      gsap.fromTo(
        ".comparison-footer",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-orange/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="comparison-header text-center mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-display tracking-tight uppercase leading-[0.9]">
            Same brief.<br />
            <span className="text-zinc-500">Different studio.</span>
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Bad Practices (Them) */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-zinc-500 uppercase tracking-widest border-b border-white/10 pb-4">
              Traditional Agency
            </h3>
            <ul className="comparison-list-1 space-y-6">
              {badPractices.map((text, i) => (
                <li key={i} className="flex items-start text-zinc-400 group">
                  <span className="mr-4 mt-1 bg-white/5 p-1 rounded-full text-zinc-500 group-hover:text-red-400 group-hover:bg-red-400/10 transition-colors">
                    <X size={16} />
                  </span>
                  <span className="text-lg leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Good Practices (Us) */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-widest border-b border-white/10 pb-4">
              Pixxelu Studio
            </h3>
            <ul className="comparison-list-2 space-y-6">
              {goodPractices.map((text, i) => (
                <li key={i} className="flex items-start text-white group">
                  <span className="mr-4 mt-1 bg-orange/10 p-1 rounded-full text-orange group-hover:bg-orange group-hover:text-black transition-colors">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <span className="text-lg leading-snug font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="comparison-footer text-center mt-32">
          <p className="text-2xl md:text-4xl font-bold tracking-tight">
            Same brief, same budget. <br className="md:hidden" />
            <span className="text-orange">Wildly different outcome.</span>
          </p>
          <div className="mt-10">
            <a href="#work" className="inline-flex items-center justify-center bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-orange hover:text-white transition-all duration-300 transform hover:scale-105">
              See the work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
