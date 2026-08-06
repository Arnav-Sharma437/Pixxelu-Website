"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const OLDER_CASES = [
  {
    id: 1,
    title: "Boutique hotel booking engine integration",
    platform: "WordPress",
    stat: "+30% direct bookings",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=150&q=80",
    color: "bg-[#21759b]"
  },
  {
    id: 2,
    title: "Artisan coffee roaster subscription setup",
    platform: "Shopify",
    stat: "15k recurring MRR",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=150&q=80",
    color: "bg-[#96bf48]"
  },
  {
    id: 3,
    title: "Local restaurant chain menu & ordering",
    platform: "Squarespace",
    stat: "Zero downtime during peak",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=150&q=80",
    color: "bg-white"
  },
  {
    id: 4,
    title: "Independent gym membership portal",
    platform: "Wix",
    stat: "Automated onboarding",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=150&q=80",
    color: "bg-yellow-500"
  },
];

export default function CasesList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".case-list-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
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
    <section ref={containerRef} className="bg-transparent text-white pb-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col border-t border-white/10 pt-16">
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold font-display tracking-tight text-white">More case studies</h2>
        </div>

        <div className="flex flex-col border-t border-white/5">
          {OLDER_CASES.map((item) => (
            <div 
              key={item.id} 
              className="case-list-item group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 p-4 md:p-6 border-b border-white/5 hover:bg-white/5 transition-colors duration-300 cursor-pointer"
            >
              
              {/* Left Side: Image & Title */}
              <div className="flex items-center gap-6 w-full md:w-1/2">
                <div className="w-16 h-12 md:w-20 md:h-14 rounded-md overflow-hidden shrink-0 border border-white/10 bg-[#121212]">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-lg md:text-xl font-bold tracking-tight group-hover:text-orange transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Right Side: Platform, Stat, Icon */}
              <div className="flex items-center justify-between w-full md:w-1/2 mt-2 md:mt-0 pl-22 md:pl-0">
                <div className="flex items-center gap-6 w-full justify-between md:justify-end">
                  
                  {/* Platform Tag */}
                  <span className="hidden sm:inline-flex items-center space-x-1.5 text-[9px] font-bold tracking-widest uppercase text-zinc-400">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                    <span>{item.platform}</span>
                  </span>

                  {/* Stat */}
                  <span className="text-sm font-mono text-zinc-300 bg-white/5 px-3 py-1 rounded">
                    {item.stat}
                  </span>

                  {/* Icon */}
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-orange group-hover:border-orange group-hover:text-black transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
