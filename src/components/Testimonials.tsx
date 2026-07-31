"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatar: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote: "Pixxelu migrated our complex 500-page site to Squarespace without a single broken link or drops in our weekly search impressions. Truly impressive speed and execution.",
    author: "Marcus Vance",
    role: "VP of Marketing",
    company: "Apex Global",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    quote: "Our Shopify store rebuild doubled our conversion rate in the first month. The checkout is blistering fast, and editing catalog banners is incredibly easy.",
    author: "Sarah Chen",
    role: "Founder",
    company: "Muse Apparel",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    quote: "We needed a custom booking database on Wix. Other agencies said it was impossible and pushed other tech. Pixxelu solved it in two weeks using Wix Studio.",
    author: "David Kroll",
    role: "Operations Director",
    company: "Rise Fitness",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    quote: "The AI-native approach is real. We got our custom WordPress architecture in under 3 weeks, and it passes all Lighthouse performance audits with perfect scores.",
    author: "Elena Rostova",
    role: "Tech Lead",
    company: "Fintech Insiders",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=49",
  },
];

export default function Testimonials() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const cards = gsap.utils.toArray('.testimonial-card');
    cards.forEach((card: any, i: number) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top top+=' + (100 + i * 20), // slight stacked offset per card
        pin: true,
        pinSpacing: false, // this is what makes them STACK instead of pushing content down
        end: () => '+=' + (cards.length - i) * 400,
      });
      // optional: subtly scale down + darken cards as they get buried under new ones
      gsap.to(card, {
        scale: 0.96 - i * 0.01,
        scrollTrigger: {
          trigger: cards[i + 1] || card,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.id !== "matrixTrigger") {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section className="testimonials-stack bg-white text-black py-24 md:py-32 border-b border-grey-800/10" ref={stackRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:gap-12 items-start justify-between">
        
        <div className="stack-header md:sticky md:top-32 md:w-1/3 mb-16 md:mb-0">
          <p className="eyebrow text-[10px] font-bold tracking-[0.2em] text-orange uppercase">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-black mt-2 leading-none">
            Trusted by growth teams.
          </h2>
          <p className="text-xs text-grey-500 font-semibold tracking-wider uppercase mt-4">
            Scroll down to watch them stack ↓
          </p>
        </div>

        <div className="cards-track md:w-2/3 w-full flex flex-col space-y-24 md:space-y-36 pb-32">
          {TESTIMONIALS_DATA.map((t, i) => (
            <div
              key={i}
              className="testimonial-card w-full max-w-[550px] bg-white border border-grey-800/20 p-8 md:p-12 shadow-md flex flex-col justify-between"
              style={{ zIndex: i + 1 }}
            >
              <div className="flex space-x-1 mb-6 text-orange">
                {Array.from({ length: t.rating }).map((_, starIndex) => (
                  <Star key={starIndex} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <blockquote className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-black mb-8 font-display">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center space-x-4 border-t border-grey-800/10 pt-6 mt-auto">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-grey-800/20">
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <cite className="not-italic text-sm font-bold text-black block">
                    {t.author}
                  </cite>
                  <span className="text-xs text-grey-500 font-medium">
                    {t.role}, {t.company}
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
