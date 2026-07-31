"use client";

import { useEffect, useRef } from "react";
import { Shuffle, Code2, Gauge, TrendingUp, Cpu, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExpertiseItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

const EXPERTISE_DATA: ExpertiseItem[] = [
  {
    icon: Shuffle,
    title: "Platform Migration",
    desc: "Seamless, secure transition of databases, asset libraries, design layouts, and URL structures from legacy CMS hosts without losing search index positioning.",
  },
  {
    icon: Code2,
    title: "Custom Development",
    desc: "Liquid, Velo, Gutenberg custom block creation, API connections, and clean CSS codebases written for specific features beyond default platform setups.",
  },
  {
    icon: Gauge,
    title: "SEO & Core Web Vitals",
    desc: "Speed tuning, content delivery configurations, schema structures, structured data injection, and search console integrations to scale search impressions.",
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimization",
    desc: "A/B checkout tuning, analytical funnel tracing, friction minimization, user flow design, and page layout updates to maximize revenue.",
  },
  {
    icon: Cpu,
    title: "Systems Integration",
    desc: "Syncing front-end page layouts directly with payment gateways, enterprise ERPs, booking systems, CRMs, and email marketing databases.",
  },
  {
    icon: ShieldCheck,
    title: "Support & Maintenance",
    desc: "Continuous technical maintenance, security monitoring, plugin updates, bug testing, asset updates, and regular feature updates.",
  },
];

export default function Expertise() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered slide+fade reveal for expertise cards
      gsap.fromTo(
        ".expertise-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
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
      id="company"
      className="bg-white text-black py-24 md:py-32 border-b border-grey-800/10"
    >
      {/* 1. Header (Inside container wrapper) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="text-[10px] font-bold tracking-[0.2em] text-orange uppercase">
            Our Areas of Expertise
          </span>
          <h2 className="reveal-text text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-black mt-1.5 leading-tight animate-[pulse_8s_infinite_ease-in-out]">
            Full-stack support for growth-focused teams.
          </h2>
        </div>
      </div>

      {/* 2. Infinite Carousel Slider (Spans full viewport width edge-to-edge) */}
      <div className="w-full overflow-hidden py-12 relative select-none">
        <div className="flex gap-6 w-[200%] shrink-0 animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
          {/* Render cards twice for seamless loop */}
          {[...EXPERTISE_DATA, ...EXPERTISE_DATA].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="expertise-card w-[290px] md:w-[380px] shrink-0 bg-white border border-grey-800/15 p-8 flex flex-col justify-between hover:border-orange hover:bg-orange/[0.02] hover:shadow-[0_25px_60px_rgba(232,92,43,0.18)] hover:-translate-y-4 transition-all duration-300 group cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 bg-off-black text-white flex items-center justify-center mb-6 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-display tracking-tight text-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-grey-500 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
