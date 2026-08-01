"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCardProps {
  title: string;
  desc: string;
}

const ServiceCard = ({ title, desc }: ServiceCardProps) => (
  <div className="bg-white/5 border border-white/10 p-5 hover:border-orange hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full shadow-lg rounded-lg">
    <div>
      <h4 className="text-sm font-bold tracking-tight text-white mb-1.5 group-hover:text-orange transition-colors font-display">
        {title}
      </h4>
      <p className="text-xs text-zinc-400 leading-relaxed font-normal">
        {desc}
      </p>
    </div>
    <div className="flex justify-end mt-4">
      <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </div>
  </div>
);

const PLATFORM_LIST = [
  {
    key: "squarespace",
    label: "SQUARESPACE",
    headline: "Design-first web presences engineered for rapid launch.",
    tagline: "Best for design-led brands who want to move fast",
    services: [
      { title: "Visual Brand Integration", desc: "Cohesive translation of your brand guidelines into fluid layouts." },
      { title: "Custom Extensions", desc: "Inject custom CSS/JS for tailored interactions beyond default blocks." },
      { title: "Membership Portals", desc: "Set up scheduling engines, paywalls, and subscriber areas." },
      { title: "Platform Migration", desc: "Securely transition legacy blogs and assets without breaking links." },
    ],
  },
  {
    key: "wix",
    label: "WIX",
    headline: "High-speed solutions built for ultimate editor autonomy.",
    tagline: "Best for lean teams who want speed without a dev team",
    services: [
      { title: "Wix Studio Setup", desc: "Advanced responsive designer tools configured to exact design mocks." },
      { title: "Velo Custom Database", desc: "Hook up dynamic databases, search filters, and backend JS APIs." },
      { title: "Booking Systems", desc: "Custom checkout systems and appointment flows for services." },
      { title: "Interaction Tuning", desc: "Polished micro-animations built directly inside the Wix designer canvas." },
    ],
  },
  {
    key: "shopify",
    label: "SHOPIFY",
    headline: "Scalable transaction systems tuned for high conversion.",
    tagline: "Best for modern direct-to-consumer and retail brands",
    services: [
      { title: "Liquid Customizations", desc: "Modify templates, custom product grids, and custom checkouts." },
      { title: "App Connections", desc: "Securely hook up ERP inventory tools, ship hosts, and marketing tools." },
      { title: "Speed Tuning", desc: "Minimize bundle weights and lazy-load scripts for fast checkouts." },
      { title: "Checkout Extensions", desc: "Optimize sales channels, discount logic, and cart items." },
    ],
  },
  {
    key: "wordpress",
    label: "WORDPRESS",
    headline: "Custom CMS environments built for complete custom scale.",
    tagline: "Best for high-content databases and complex logic hubs",
    services: [
      { title: "Headless Decoupling", desc: "Connect dynamic WP engines with fast Next.js or React frontends." },
      { title: "Gutenberg Block Coding", desc: "Custom editorial blocks coded from scratch to matches styles." },
      { title: "Database Optimizations", desc: "Tune dynamic tables and search indexes for massive catalog speed." },
      { title: "Plugin Engineering", desc: "Coded custom back-end PHP logic and security patches." },
    ],
  },
];

export default function PlatformDeepDive() {
  const [activePlatform, setActivePlatform] = useState("squarespace");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered column parallax
      gsap.fromTo(
        ".parallax-col-left",
        { y: 25 },
        {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(
        ".parallax-col-right",
        { y: -25 },
        {
          y: 25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );

      // Background shapes parallax
      gsap.fromTo(
        ".parallax-bg-shape",
        { y: -50 },
        {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentPlatformData = PLATFORM_LIST.find((p) => p.key === activePlatform) || PLATFORM_LIST[0];

  return (
    <section
      ref={sectionRef}
      className="platform-matrix bg-transparent text-white py-24 md:py-32 border-b border-white/5 relative overflow-hidden"
      id="platform-dive"
    >
      {/* Decorative Parallax Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="parallax-bg-shape absolute top-10 right-[-10%] w-[500px] h-[500px] bg-orange/[0.015] rounded-full blur-[120px] pointer-events-none" />
        
        {/* Outline rotating geometry that slides slowly */}
        <svg className="parallax-bg-shape absolute bottom-10 left-[5%] w-72 h-72 text-white/5 opacity-80" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.1" fill="none" strokeDasharray="3,3" />
          <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="0.05" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start relative z-10">
        
        {/* Left Column (Sticky Sidebar on Desktop) */}
        <div className="matrix-left md:col-span-4 flex flex-col space-y-6 md:sticky md:top-32">
          <div>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-orange">
              Signature Service
            </span>
            <h3 className="reveal-text text-xl md:text-2xl font-bold font-display tracking-tight text-white mt-1.5 mb-8">
              Platform Matrix
            </h3>
          </div>

          {/* Interactive Navigation (Click/Hover transitions active state) */}
          <div className="flex flex-col space-y-4">
            {PLATFORM_LIST.map((platform) => (
              <button
                key={platform.key}
                className={`platform-nav-btn text-left text-lg md:text-xl font-bold tracking-wide transition-all uppercase pl-4 border-l-2 focus:outline-none cursor-pointer ${
                  activePlatform === platform.key
                    ? "text-white border-orange font-black"
                    : "text-zinc-500 border-transparent hover:text-white"
                }`}
                onClick={() => setActivePlatform(platform.key)}
                onMouseEnter={() => setActivePlatform(platform.key)}
              >
                {platform.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column (Staggered Column Parallax Grid) */}
        <div className="md:col-span-8 w-full">
          <div className="transition-all duration-300 ease-in-out flex flex-col space-y-6">
            <div>
              <span className="inline-block text-[11px] font-bold tracking-widest text-zinc-400 uppercase bg-white/5 border border-white/10 px-3 py-1 rounded">
                {currentPlatformData.tagline}
              </span>
              <h4 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white mt-4 max-w-xl">
                {currentPlatformData.headline}
              </h4>
            </div>
            
            {/* Split Grid for Staggered Parallax Scrolling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start pt-6">
              
              {/* Left Column - Cards 1 and 3 */}
              <div className="flex flex-col space-y-4 parallax-col-left">
                <ServiceCard 
                  title={currentPlatformData.services[0].title} 
                  desc={currentPlatformData.services[0].desc} 
                />
                <ServiceCard 
                  title={currentPlatformData.services[2].title} 
                  desc={currentPlatformData.services[2].desc} 
                />
              </div>

              {/* Right Column - Cards 2 and 4 */}
              <div className="flex flex-col space-y-4 parallax-col-right sm:mt-8">
                <ServiceCard 
                  title={currentPlatformData.services[1].title} 
                  desc={currentPlatformData.services[1].desc} 
                />
                <ServiceCard 
                  title={currentPlatformData.services[3].title} 
                  desc={currentPlatformData.services[3].desc} 
                />
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
