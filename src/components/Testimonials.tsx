"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  hook: string;
  quote: string;
  author: string;
  authorShort: string;
  avatar: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    hook: "Your store needs to scale, but your platform checkout is slow?",
    quote: "As a scaling direct-to-consumer brand, we know checkout speed dictates conversion. Pixxelu rebuilt our Shopify checkout flow and custom sync pipelines, ensuring rapid inventory updates never compromise the shopping experience.",
    author: "Sarah Chen",
    authorShort: "Sarah C.",
    avatar: "https://i.pravatar.cc/300?img=47",
  },
  {
    hook: "Your site needs custom scheduling, but templates restrict you?",
    quote: "We needed a custom booking system synced directly with our internal customer database. Other agencies said it required a complex headless stack, but Pixxelu engineered it directly on Wix Studio in record time.",
    author: "David Kroll",
    authorShort: "David K.",
    avatar: "https://i.pravatar.cc/300?img=33",
  },
  {
    hook: "Your team needs layout design freedom, but lockups block you?",
    quote: "Our marketing team was constantly waiting for developers to make minor changes. Pixxelu migrated our core website to Squarespace with custom fluid blocks, giving our editors complete publishing autonomy.",
    author: "Marcus Vance",
    authorShort: "Marcus V.",
    avatar: "https://i.pravatar.cc/300?img=11",
  },
  {
    hook: "Your content needs headless speed, but WordPress blocks editors?",
    quote: "We publish dozens of financial reports weekly and needed lightning-fast load times. Pixxelu decoupled our WordPress backend using a custom Next.js frontend, maintaining perfect Lighthouse scores under high traffic loads.",
    author: "Elena Rostova",
    authorShort: "Elena R.",
    avatar: "https://i.pravatar.cc/300?img=49",
  },
];

export default function Testimonials() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.testimonial-card');
      cards.forEach((card: any, i: number) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top+=' + (100 + i * 20), // slight stacked offset per card
          pin: true,
          pinSpacing: false, // this is what makes them STACK instead of pushing content down
          end: () => '+=' + (cards.length - i) * 450,
        });
        // subtly scale down + darken cards as they get buried under new ones
        gsap.to(card, {
          scale: 0.96 - i * 0.015,
          scrollTrigger: {
            trigger: cards[i + 1] || card,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
    }, stackRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials-stack bg-white text-black py-24 md:py-32 border-b border-grey-800/10" ref={stackRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col space-y-16">
        
        {/* Section Header */}
        <div className="stack-header mb-8">
          <p className="eyebrow text-[10px] font-bold tracking-[0.2em] text-orange uppercase">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-black mt-2 leading-none">
            Trusted by growth teams.
          </h2>
        </div>

        {/* Stacked Cards list */}
        <div className="cards-track w-full flex flex-col space-y-24 md:space-y-36 pb-32">
          {TESTIMONIALS_DATA.map((t, i) => (
            <div
              key={i}
              className="testimonial-card w-full bg-white border border-grey-800/20 p-8 md:p-12 shadow-2xl flex flex-col justify-between"
              style={{ zIndex: i + 1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full">
                
                {/* Column 1: Left Hook Question (md:col-span-3) */}
                <div className="md:col-span-3 flex flex-col justify-start">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold font-display text-black leading-tight">
                    {t.hook}
                  </h3>
                </div>

                {/* Column 2: Middle Client Quote & CTA Button (md:col-span-5) */}
                <div className="md:col-span-5 flex flex-col space-y-6">
                  <p className="text-sm sm:text-base text-grey-500 font-normal leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center text-xs font-bold tracking-[0.1em] uppercase bg-[#ff6b00] hover:bg-[#e05e00] text-white px-6 py-3.5 transition-all duration-300 font-display"
                    >
                      <span>REDESIGN MY WEBSITE</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>

                {/* Column 3: Right Client Portrait Mockup (md:col-span-4) */}
                <div className="md:col-span-4 flex justify-center md:justify-end">
                  <div className="relative w-full max-w-[240px] aspect-[3/4] rounded-lg overflow-hidden border border-grey-800/10 shadow-lg group cursor-pointer">
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      fill
                      sizes="240px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/25 group-hover:via-black/20 transition-all duration-300" />

                    {/* Centered Play Button Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/95 text-orange flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom right semi-transparent label */}
                    <div className="absolute bottom-4 right-4 bg-orange text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1.5">
                      {t.authorShort}
                    </div>
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
