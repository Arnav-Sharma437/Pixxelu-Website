"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CASES = [
  {
    id: 1,
    title: "Global fashion retailer store overhaul & checkout tuning.",
    platform: "Shopify",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    color: "bg-[#96bf48]" // Shopify green
  },
  {
    id: 2,
    title: "Architecture studio portfolio & client booking portal.",
    platform: "Squarespace",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    color: "bg-white" // Squarespace white
  },
  {
    id: 3,
    title: "Headless CMS migration for high-traffic financial publication.",
    platform: "WordPress",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    color: "bg-[#21759b]" // WP blue
  },
  {
    id: 4,
    title: "Studio rebrand & rapid relaunch on Wix.",
    platform: "Wix",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
    color: "bg-yellow-500" // Wix yellow-ish representation
  }
];

export default function CasesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".cases-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cases-header",
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );

      // Grid items staggered reveal
      const items = gsap.utils.toArray(".case-grid-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cases-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-transparent text-white pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
      
      {/* Header Block */}
      <div className="cases-header flex flex-col items-center md:items-start text-center md:text-left mb-16 md:mb-24">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-[1px] bg-orange" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-orange uppercase">
            CASE STUDIES
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight mb-6">
          Real work. Real platforms.
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
          A closer look at how we've solved platform problems for real businesses.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="cases-grid grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
        {CASES.map((item, index) => {
          // Calculate span based on index (0=7, 1=5, 2=5, 3=7) for the alternating pattern
          const isWide = index === 0 || index === 3;
          const colSpanClass = isWide ? "md:col-span-7" : "md:col-span-5";

          return (
            <div
              key={item.id}
              className={`case-grid-item group relative bg-[#121212] border border-white/10 rounded-xl overflow-hidden aspect-[4/3] md:aspect-[auto] md:h-[450px] cursor-pointer ${colSpanClass}`}
            >
              {/* Background Image */}
              <img 
                src={item.image} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500 z-10 flex flex-col justify-between p-6 md:p-8">
                
                {/* Top Pill (Hidden until hover) */}
                <div className="flex items-start justify-between w-full opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out">
                  <span className="inline-flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase bg-black text-white border border-white/10 px-3 py-1.5 rounded-full shadow-lg">
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span>{item.platform}</span>
                  </span>
                  
                  <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-white bg-orange px-4 py-2 rounded-full shadow-lg">
                    View case <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </div>

                {/* Bottom Title */}
                <div className="mt-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400 ease-out">
                  <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
