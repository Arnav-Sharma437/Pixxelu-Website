"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveText from "./WaveText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "Custom CMS Mastery",
    tag: "WordPress, Shopify, Webflow.",
    description:
      "We don't just use CMS; we bend them to our will. From headless WordPress architectures to completely bespoke Shopify Liquid themes, we build backends so powerful you'll feel like a wizard.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "High-Performance Dev",
    tag: "Next.js & React ecosystems.",
    description:
      "Bloated templates? Never heard of them. We engineer pixel-perfect frontends that load faster than you can blink. Complex APIs, custom interactions, zero compromises.",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "UI/UX Engineering",
    tag: "Figma to flawless execution.",
    description:
      "We turn wild design concepts into interfaces people are addicted to using. No boring layouts allowed. If it doesn't make your competitors jealous, we don't ship it.",
    img: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=600&q=80"
  },
];

export default function OhhMyServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Stagger reveal service items
      const items = gsap.utils.toArray(".service-item");
      gsap.fromTo(
        items,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
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
      className="text-[#1a1a1a] py-32 px-6 md:px-12 lg:px-24 relative"
      id="services"
    >
      {/* Clouds */}
      <div className="absolute top-0 right-[-5%] w-80 h-32 bg-white/40 blur-3xl rounded-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="services-header mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase cursor-pointer">
            <WaveText text="WHAT WE MAKE" />
          </h2>
        </div>

        <div ref={listRef} className="w-full flex flex-col gap-12">
          {services.map((s, i) => (
            <div 
              key={i} 
              className="service-item group flex flex-col md:flex-row items-center gap-8 bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white"
            >
              <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-sm h-64 relative bg-gray-200">
                {/* Placeholder for the cool images they have */}
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 rounded text-xs font-bold shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f85c37]" />
                  {i + 1}
                </div>
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 px-4">
                <div className="flex flex-col">
                  <h3 className="text-3xl font-black tracking-tight cursor-pointer">
                    <WaveText text={s.title} />
                  </h3>
                  <span className="text-[#f85c37] font-serif italic text-lg mt-1">
                    {s.tag}
                  </span>
                </div>
                <p className="text-black/70 text-lg leading-relaxed max-w-lg font-medium">
                  {s.description}
                </p>
                <div className="pt-4">
                  <button className="bg-black text-white px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider cursor-pointer hover:bg-[#f85c37] transition-colors">
                    See details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
