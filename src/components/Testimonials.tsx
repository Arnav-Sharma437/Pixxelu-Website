"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote: "Pixxelu migrated our complex 500-page site to Squarespace without a single broken link or drops in our search impressions. Truly impressive speed and execution.",
    author: "Marcus Vance",
    role: "VP of Marketing",
    company: "Apex Global",
    rating: 5,
  },
  {
    quote: "Our Shopify store rebuild doubled our conversion rate in the first month. The checkout is blistering fast, and editing catalog banners is incredibly easy.",
    author: "Sarah Chen",
    role: "Founder",
    company: "Muse Apparel",
    rating: 5,
  },
  {
    quote: "We needed a custom booking database on Wix. Other agencies said it was impossible and pushed other tech. Pixxelu solved it in two weeks using Wix Studio.",
    author: "David Kroll",
    role: "Operations Director",
    company: "Rise Fitness",
    rating: 5,
  },
  {
    quote: "The AI-native approach is real. We got our custom WordPress architecture in under 3 weeks, and it passes all Lighthouse performance audits with perfect scores.",
    author: "Elena Rostova",
    role: "Tech Lead",
    company: "Fintech Insiders",
    rating: 5,
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const cards = container.querySelectorAll(".testimonial-card");
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      cards.forEach((card: any) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        // Adjust scale and opacity based on distance from center
        const maxDistance = containerRect.width * 0.8;
        const ratio = Math.min(distance / maxDistance, 1);
        
        const scale = 1 - ratio * 0.08; // scale from 1.0 to 0.92
        const opacity = 1 - ratio * 0.45; // opacity from 1.0 to 0.55

        card.style.transform = `scale(${scale})`;
        card.style.opacity = opacity.toString();
      });
    };

    // Run once on load
    setTimeout(handleScroll, 100);

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="bg-white text-black py-24 md:py-32 border-b border-grey-800/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 flex justify-between items-end flex-wrap gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold tracking-[0.2em] text-orange uppercase">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-black mt-1.5 leading-none">
              Trusted by growth teams.
            </h2>
          </div>
          <div className="text-xs text-grey-500 font-semibold tracking-wider uppercase hidden sm:block">
            Swipe or scroll to navigate →
          </div>
        </div>

        {/* Scroll-Snap Carousel Container */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar space-x-6 pb-8 px-[10vw] md:px-[25vw] cursor-grab active:cursor-grabbing"
          style={{ scrollPadding: "0 25vw" }}
        >
          {TESTIMONIALS_DATA.map((item, index) => (
            <div
              key={index}
              className="testimonial-card flex-shrink-0 w-[290px] sm:w-[380px] md:w-[450px] bg-white border border-grey-800/15 p-8 md:p-10 snap-center flex flex-col justify-between transition-all duration-300 ease-out"
              style={{ transform: "scale(0.96)", opacity: 0.7 }}
            >
              {/* Rating stars */}
              <div className="flex space-x-1 mb-6 text-orange">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-black mb-8 font-display">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Author metadata */}
              <div className="flex items-center space-x-3.5 border-t border-grey-800/10 pt-6 mt-auto">
                {/* Custom Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-off-black text-white flex items-center justify-center font-bold font-display text-sm">
                  {item.author.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <cite className="not-italic text-sm font-bold text-black block">
                    {item.author}
                  </cite>
                  <span className="text-xs text-grey-500 font-medium">
                    {item.role}, {item.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
