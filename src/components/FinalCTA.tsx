"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for CTA content elements
      gsap.fromTo(
        ".cta-animate",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="bg-off-black text-white py-24 md:py-36 relative overflow-hidden border-b border-grey-800/10"
    >
      {/* Dynamic drifting background glows */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange/5 rounded-full blur-[120px] pointer-events-none animate-[pulse_10s_infinite_ease-in-out]" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none animate-[pulse_15s_infinite_ease-in-out_2s]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* Eyebrow */}
        <span className="cta-animate text-[10px] font-bold tracking-[0.25em] text-orange uppercase mb-6 block">
          Start Your Journey
        </span>

        {/* Big display title */}
        <h2 className="cta-animate text-4xl sm:text-6xl md:text-8xl font-extrabold font-display tracking-tight text-white max-w-4xl leading-[0.95] mb-10">
          Have a project in mind? Let&apos;s talk.
        </h2>

        {/* CTA Button */}
        <div className="cta-animate mb-14">
          <Link
            href="mailto:info@pixxelu.com"
            className="inline-flex items-center justify-center text-xs font-bold tracking-[0.1em] uppercase bg-orange text-white px-9 py-5 hover:bg-orange/95 hover:scale-[1.03] transition-all duration-300 group"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Contact links */}
        <div className="cta-animate flex flex-col sm:flex-row items-center sm:space-x-8 space-y-3 sm:space-y-0 border-t border-white/10 pt-8 w-full max-w-xl justify-center">
          <Link
            href="mailto:info@pixxelu.com"
            className="underline-reveal text-xs sm:text-sm font-semibold tracking-wider text-grey-800 hover:text-white transition-colors"
          >
            info@pixxelu.com
          </Link>
          <span className="hidden sm:inline text-grey-800">/</span>
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-grey-800 select-all">
            +91 92180 00707
          </span>
          <span className="hidden sm:inline text-grey-800">/</span>
          <Link
            href="#"
            className="underline-reveal text-xs sm:text-sm font-semibold tracking-wider text-grey-800 hover:text-white transition-colors"
          >
            @pixxelu
          </Link>
        </div>
      </div>
    </section>
  );
}
