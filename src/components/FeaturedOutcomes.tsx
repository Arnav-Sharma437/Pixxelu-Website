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

    const rows = containerRef.current?.querySelectorAll(".case-row");
    if (!rows) return;

    gsap.fromTo(
      rows,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="cases"
      className="bg-white text-black py-24 md:py-32 border-b border-grey-800/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col items-start">
          <span className="text-[10px] font-bold tracking-[0.2em] text-orange uppercase">
            Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-black mt-1.5">
            Real systems. Provable business results.
          </h2>
        </div>

        {/* Case Rows Stack */}
        <div className="space-y-16 md:space-y-24">
          {CASES_DATA.map((item, index) => (
            <div
              key={index}
              className="case-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center border-t border-grey-800/10 pt-10 md:pt-16 first:border-t-0 first:pt-0"
            >
              {/* Mockup Container (Left or Right depending on index or keep standard layout) */}
              {/* Let's use 16:10 aspect ratio box as requested, flexible and responsive */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="bg-off-black relative border border-grey-800/20 aspect-[16/10] w-full p-4 overflow-hidden flex flex-col justify-between shadow-sm">
                  {/* Browser Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 shrink-0">
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                    </div>
                    <span className="text-[7px] text-grey-800 font-mono uppercase tracking-wider">
                      case-outcome-0{index + 1}.pixxelu.co
                    </span>
                  </div>

                  {/* Browser Body Mock Content based on mockupType */}
                  <div className="flex-1 flex flex-col justify-center space-y-3">
                    {item.mockupType === "shopify" && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                          <div className="w-1/2 space-y-1.5">
                            <div className="h-3 bg-white/25 w-full"></div>
                            <div className="h-1.5 bg-grey-800 w-2/3"></div>
                          </div>
                          <div className="w-10 h-3 bg-orange"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-16 bg-white/5 border border-white/10 flex flex-col justify-end p-1.5">
                            <div className="h-1 bg-white/20 w-3/4 mb-1"></div>
                            <div className="h-1.5 bg-orange w-1/2"></div>
                          </div>
                          <div className="h-16 bg-white/5 border border-white/10 flex flex-col justify-end p-1.5">
                            <div className="h-1 bg-white/20 w-3/4 mb-1"></div>
                            <div className="h-1.5 bg-white/25 w-1/2"></div>
                          </div>
                          <div className="h-16 bg-white/5 border border-white/10 flex flex-col justify-end p-1.5">
                            <div className="h-1 bg-white/20 w-3/4 mb-1"></div>
                            <div className="h-1.5 bg-white/25 w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.mockupType === "squarespace" && (
                      <div className="grid grid-cols-[130px_1fr] gap-4">
                        <div className="aspect-[4/3] bg-orange/20 border border-orange/30 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full border border-orange animate-pulse"></div>
                        </div>
                        <div className="space-y-2 flex flex-col justify-center">
                          <div className="h-3 bg-white/20 w-4/5"></div>
                          <div className="h-2 bg-white/10 w-full"></div>
                          <div className="h-2 bg-white/10 w-full"></div>
                          <div className="h-3 w-16 bg-white/20 mt-1"></div>
                        </div>
                      </div>
                    )}

                    {item.mockupType === "wordpress" && (
                      <div className="flex space-x-3 items-stretch h-24">
                        <div className="w-8 bg-white/5 flex flex-col space-y-1.5 p-1 border-r border-white/5 shrink-0">
                          <div className="h-1 bg-orange w-full"></div>
                          <div className="h-1 bg-white/15 w-4/5"></div>
                          <div className="h-1 bg-white/15 w-3/4"></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="space-y-1.5">
                            <div className="h-2 bg-white/20 w-full"></div>
                            <div className="h-1.5 bg-white/10 w-5/6"></div>
                            <div className="h-1.5 bg-white/10 w-2/3"></div>
                          </div>
                          <div className="flex justify-between items-center border-t border-white/5 pt-1.5">
                            <div className="w-12 h-1.5 bg-white/15"></div>
                            <div className="w-6 h-3 bg-orange/40"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Case Details (Right or Left) */}
              <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center space-y-6">
                <div>
                  <span className="inline-block text-[9px] font-bold tracking-widest uppercase bg-grey-800/10 text-grey-500 border border-grey-800/25 px-2.5 py-0.5 mb-4">
                    {item.platform}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-black leading-tight max-w-xl">
                    {item.headline}
                  </h3>
                </div>

                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-orange font-display">
                    {item.metric.split(" ")[0]}
                  </span>
                  <span className="text-sm font-semibold text-grey-500 uppercase tracking-wide">
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
          ))}
        </div>
      </div>
    </section>
  );
}
