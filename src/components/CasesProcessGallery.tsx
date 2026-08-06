"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROCESS_IMAGES = [
  "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1507238692062-5a042e9e18c4?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1542744094-24638ea0b3b5?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
];

export default function CasesProcessGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Pin the entire container so we can scroll through the parallax effect
      ScrollTrigger.create({
        trigger: pinContainerRef.current,
        pin: true,
        start: "top top",
        end: "+=2500", // Scroll distance
        scrub: true,
      });

      // Parallax left column upwards
      gsap.fromTo(
        leftColRef.current,
        { y: 200 },
        {
          y: -800,
          ease: "none",
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: "top top",
            end: "+=2500",
            scrub: true,
          },
        }
      );

      // Parallax right column upwards faster
      gsap.fromTo(
        rightColRef.current,
        { y: 500 },
        {
          y: -1200,
          ease: "none",
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: "top top",
            end: "+=2500",
            scrub: true,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-transparent my-32">
      {/* 
        This container will be pinned. We set its height to 100vh so it fills the screen while pinned.
        overflow-hidden prevents the parallax images from bleeding out.
      */}
      <div 
        ref={pinContainerRef}
        className="w-full h-[100vh] relative overflow-hidden flex items-center justify-center border-t border-b border-white/5 bg-[#0a0a0a]"
      >
        
        {/* Parallax Background Images Container */}
        <div className="absolute inset-0 z-0 flex justify-between px-4 md:px-24 pointer-events-none opacity-40 mix-blend-screen">
          
          {/* Left Parallax Column */}
          <div ref={leftColRef} className="w-1/3 md:w-1/4 flex flex-col space-y-8 mt-24">
            {PROCESS_IMAGES.slice(0, 3).map((src, i) => (
              <div key={`left-${i}`} className="w-full aspect-[4/5] rounded-lg overflow-hidden border border-white/10 bg-[#121212]">
                <img src={src} alt="Process mockup" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* Right Parallax Column */}
          <div ref={rightColRef} className="w-1/3 md:w-1/4 flex flex-col space-y-12">
            {PROCESS_IMAGES.slice(3, 6).map((src, i) => (
              <div key={`right-${i}`} className="w-full aspect-square rounded-lg overflow-hidden border border-white/10 bg-[#121212]">
                <img src={src} alt="Process mockup" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Center Pinned Text */}
        <div className="relative z-10 text-center max-w-2xl px-6 pointer-events-auto">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-[1px] bg-orange" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-orange uppercase">
              PROCESS
            </span>
            <div className="w-8 h-[1px] bg-orange" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold font-display tracking-tight text-white mb-6 drop-shadow-2xl">
            How we work
          </h2>
          
          <p className="text-zinc-300 text-lg md:text-xl leading-relaxed drop-shadow-md max-w-lg mx-auto">
            From wireframes to final deployment, we build scalable platforms with a relentless focus on performance and conversion.
          </p>
        </div>

        {/* Top and Bottom gradient masks to fade the scrolling images nicely */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-0 pointer-events-none" />

      </div>
    </section>
  );
}
