"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CaseItem {
  platform: string;
  headline: string;
  metric: string;
  linkText: string;
  mockupType: "shopify" | "squarespace" | "wordpress";
}

const CASES_DATA: CaseItem[] = [
  {
    platform: "Shopify",
    headline: "Global fashion retailer store overhaul & checkout tuning.",
    metric: "2x conversion rate lift",
    linkText: "View Shopify case",
    mockupType: "shopify",
  },
  {
    platform: "Squarespace",
    headline: "Architecture studio portfolio & client booking portal.",
    metric: "45% increase in bookings",
    linkText: "View Squarespace case",
    mockupType: "squarespace",
  },
  {
    platform: "WordPress",
    headline: "Headless CMS migration for high-traffic financial publication.",
    metric: "60% page load speedup",
    linkText: "View WordPress case",
    mockupType: "wordpress",
  },
];

export default function FeaturedOutcomes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".outcomes-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".outcomes-header",
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );

      // Staggered reveal for rows
      const rows = containerRef.current?.querySelectorAll(".case-row");
      rows?.forEach((row) => {
        const img = row.querySelector(".case-img-wrap");
        const content = row.querySelector(".case-content-wrap");
        const divider = row.nextElementSibling;
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        });
        
        tl.fromTo(
          img,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }
        )
        .fromTo(
          content,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
          "-=0.6"
        );

        if (divider && divider.classList.contains("case-divider")) {
          tl.fromTo(
            divider,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: "power1.inOut" },
            "-=0.4"
          );
        }
      });

      // Count up animation for case-stat-number
      const stats = containerRef.current?.querySelectorAll(".case-stat-number");
      stats?.forEach((stat) => {
        const val = parseFloat(stat.getAttribute("data-val") || "0");
        const suffix = stat.getAttribute("data-suffix") || "";
        const obj = { value: 0 };
        
        gsap.to(obj, {
          value: val,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            stat.textContent = `${Math.round(obj.value)}${suffix}`;
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="cases"
      className="bg-white text-black py-28 md:py-36 border-b border-grey-800/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="outcomes-header mb-20 md:mb-28 flex flex-col items-start">
          <span className="text-[10px] font-bold tracking-[0.2em] text-orange uppercase">
            Outcomes &mdash; 3 recent case studies
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-black mt-2">
            Real systems. Provable business results.
          </h2>
        </div>

        {/* Case Rows Stack with generous breathing room */}
        <div className="space-y-24 md:space-y-36">
          {CASES_DATA.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className="case-row-container flex flex-col space-y-24 md:space-y-36">
                
                <div
                  className="case-row grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                >
                  {/* Mockup Container (Alternating column order on desktop) */}
                  <div
                    className={`lg:col-span-5 case-img-wrap ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="bg-[#121212] relative border border-grey-800/15 aspect-[16/10] w-full p-3 overflow-hidden flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(232,92,43,0.06)] hover:border-orange/20 rounded-xl transition-all duration-500 hover:scale-[1.02] group">
                      
                      {/* Browser Header Bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-white/10 shrink-0">
                        <div className="flex space-x-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                        </div>
                        
                        {/* Fake URL bar */}
                        <div className="w-3/5 h-3.5 bg-white/5 border border-white/10 rounded flex items-center justify-center">
                          <span className="text-[6px] text-grey-800 font-mono tracking-wider truncate">
                            case-outcome-0{index + 1}.pixxelu.co
                          </span>
                        </div>
                        <div className="w-4 h-1"></div>
                      </div>

                      {/* Browser Body Mock UI screenshots */}
                      <div className="flex-1 flex flex-col justify-center items-center relative mt-2">
                        
                        {item.mockupType === "shopify" && (
                          <div className="w-full h-full flex flex-col space-y-2 px-1 justify-center">
                            <div className="flex justify-between items-center">
                              <span className="text-[8px] font-bold text-white uppercase tracking-wider">Checkout Funnel</span>
                              <span className="text-[8px] font-bold text-orange">CR +100%</span>
                            </div>
                            
                            {/* Vector graph funnel bars */}
                            <div className="flex-1 flex items-end justify-between space-x-2 py-1">
                              <div className="flex-1 flex flex-col justify-end h-full">
                                <div className="bg-white/10 hover:bg-white/20 transition-all h-[95%] w-full relative flex items-center justify-center">
                                  <span className="text-[7px] text-grey-500 font-mono">Cart</span>
                                </div>
                              </div>
                              <div className="flex-1 flex flex-col justify-end h-full">
                                <div className="bg-white/20 hover:bg-white/35 transition-all h-[75%] w-full relative flex items-center justify-center">
                                  <span className="text-[7px] text-white font-mono">Info</span>
                                </div>
                              </div>
                              <div className="flex-1 flex flex-col justify-end h-full">
                                <div className="bg-white/30 hover:bg-white/45 transition-all h-[55%] w-full relative flex items-center justify-center">
                                  <span className="text-[7px] text-white font-mono">Pay</span>
                                </div>
                              </div>
                              <div className="flex-1 flex flex-col justify-end h-full">
                                <div className="bg-orange hover:bg-orange/90 transition-all h-[45%] w-full relative flex items-center justify-center">
                                  <span className="text-[7px] text-white font-bold font-mono">Done</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.mockupType === "squarespace" && (
                          <div className="w-full h-full grid grid-cols-[2fr_1fr] gap-3 px-1">
                            {/* Main architectural design visual */}
                            <div className="border border-white/15 bg-white/5 relative flex flex-col overflow-hidden">
                              {/* Simulated SVG floorplan/blueprint */}
                              <svg className="w-full h-full opacity-60" viewBox="0 0 100 60">
                                <line x1="10" y1="10" x2="90" y2="10" stroke="white" strokeWidth="0.5" />
                                <line x1="10" y1="50" x2="90" y2="50" stroke="white" strokeWidth="0.5" />
                                <line x1="20" y1="10" x2="20" y2="50" stroke="white" strokeWidth="0.5" />
                                <line x1="50" y1="10" x2="50" y2="50" stroke="white" strokeWidth="0.5" />
                                <line x1="80" y1="10" x2="80" y2="50" stroke="white" strokeWidth="0.5" />
                                <rect x="25" y="15" width="20" height="30" fill="#E85C2B" opacity="0.3" />
                                <circle cx="65" cy="30" r="10" fill="white" opacity="0.1" />
                              </svg>
                              <div className="absolute bottom-2 left-2 h-2.5 bg-white/20 w-2/3"></div>
                            </div>
                            
                            {/* Right calendar booking interface */}
                            <div className="border border-white/15 bg-white/5 p-1.5 flex flex-col justify-between">
                              <div className="text-[6px] text-white font-bold uppercase tracking-wider mb-1">Book Visit</div>
                              <div className="grid grid-cols-4 gap-1">
                                {Array.from({ length: 12 }).map((_, calendarIndex) => (
                                  <div
                                    key={calendarIndex}
                                    className={`aspect-square text-[4px] flex items-center justify-center ${
                                      calendarIndex === 5 ? "bg-orange text-white" : "bg-white/10"
                                    }`}
                                  >
                                    {calendarIndex + 1}
                                  </div>
                                ))}
                              </div>
                              <div className="h-3.5 bg-orange mt-2 flex items-center justify-center text-[5px] font-bold text-white">
                                CONFIRM
                              </div>
                            </div>
                          </div>
                        )}

                        {item.mockupType === "wordpress" && (
                          <div className="w-full h-full flex items-center justify-around px-2">
                            {/* PageSpeed Performance ring */}
                            <div className="flex flex-col items-center space-y-1">
                              <div className="relative w-16 h-16 flex items-center justify-center">
                                {/* Outer green circle progress */}
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  <path
                                    className="text-white/10"
                                    strokeWidth="2.5"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  />
                                  <path
                                    className="text-green-500"
                                    strokeWidth="2.5"
                                    strokeDasharray="99, 100"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  />
                                </svg>
                                <span className="absolute text-sm font-extrabold text-green-500 font-mono">99</span>
                              </div>
                              <span className="text-[6px] text-green-500 font-bold uppercase tracking-wider">Performance</span>
                            </div>

                            {/* Page load statistics curve */}
                            <div className="w-[180px] h-[55px] bg-white/5 border border-white/10 p-2 flex flex-col justify-between">
                              <div className="flex justify-between items-center text-[5px] text-grey-800 uppercase tracking-widest border-b border-white/5 pb-1">
                                <span>Page Load Speed</span>
                                <span className="text-green-500">0.4s (Blistering)</span>
                              </div>
                              {/* SVG line graph */}
                              <svg className="w-full h-6 overflow-visible" viewBox="0 0 100 20">
                                {/* Baseline */}
                                <line x1="0" y1="18" x2="100" y2="18" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                                {/* Curve */}
                                <path
                                  d="M0 18 Q 20 2, 40 10 T 80 5 T 100 3"
                                  fill="none"
                                  stroke="#E85C2B"
                                  strokeWidth="1.2"
                                />
                                {/* Area fill */}
                                <path
                                  d="M0 18 Q 20 2, 40 10 T 80 5 T 100 3 L 100 18 L 0 18 Z"
                                  fill="rgba(232, 92, 43, 0.1)"
                                />
                              </svg>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>

                  {/* Case Details (Alternating column order on desktop) */}
                  <div
                    className={`lg:col-span-7 case-content-wrap flex flex-col justify-center space-y-6 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div>
                      {/* Platform tag with brand colored dot */}
                      <span className="inline-flex items-center space-x-2 text-[9px] font-bold tracking-widest uppercase bg-grey-800/5 text-grey-500 border border-grey-800/15 px-3 py-1 rounded mb-4">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          item.platform === "Shopify" ? "bg-[#96bf48]" :
                          item.platform === "Squarespace" ? "bg-black" :
                          "bg-[#21759b]"
                        }`} />
                        <span>{item.platform}</span>
                      </span>

                      <h3 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-black leading-tight max-w-xl">
                        {item.headline}
                      </h3>
                    </div>

                    {/* Accent Hero Number with Label */}
                    <div className="flex flex-col space-y-1">
                      <span
                        className="case-stat-number text-5xl sm:text-6xl md:text-7xl font-black text-orange font-display block leading-none"
                        data-val={item.platform === "Shopify" ? 2 : item.platform === "Squarespace" ? 45 : 60}
                        data-suffix={item.platform === "Shopify" ? "x" : "%"}
                      >
                        0{item.platform === "Shopify" ? "x" : "%"}
                      </span>
                      <span className="text-xs font-bold text-grey-500 uppercase tracking-widest">
                        {item.metric.split(" ").slice(1).join(" ")}
                      </span>
                    </div>

                    <div>
                      <Link
                        href="#contact"
                        className="inline-flex items-center text-xs font-bold tracking-[0.1em] text-orange hover:text-black uppercase group transition-colors duration-300"
                      >
                        <span>{item.linkText}</span>
                        <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>

                </div>

                {/* Horizontal divider scales in on enter */}
                {index < CASES_DATA.length - 1 && (
                  <div className="case-divider w-full h-[1px] bg-grey-800/15 origin-left" />
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
