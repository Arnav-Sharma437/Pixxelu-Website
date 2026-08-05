"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "UI/UX Design",
    tag: "Figma.",
    description:
      "We turn fuzzy ideas into interfaces people actually enjoy using. From the first wireframe to pixel-final Figma, every screen is built to convert and to scale with you.",
  },
  {
    title: "Web Development",
    tag: "Next.js & React.",
    description:
      "We build pixel-perfect Next.js sites that are fast, animated, SEO-ready and fully editable by your team, with no developer bottleneck to slow you down.",
  },
  {
    title: "Brand Design",
    tag: "Logo, decks, guidelines.",
    description:
      "We turn strategic insight into a brand that actually sticks. From moodboards that set direction to a full identity system, we make something distinct, scalable and built for traction.",
  },
];

export default function OhhMyServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Reveal header
      gsap.fromTo(
        ".services-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Stagger reveal service items
      const items = gsap.utils.toArray(".service-item");
      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0a0a] text-white py-32 px-6 md:px-12 lg:px-24"
      id="services"
    >
      <div className="max-w-7xl mx-auto">
        <div className="services-header mb-20">
          <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight uppercase">
            What we make
          </h2>
        </div>

        <div ref={listRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {services.map((s, i) => (
            <div key={i} className="service-item group flex flex-col space-y-6">
              <div className="pb-6 border-b border-white/10 group-hover:border-orange transition-colors duration-500">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                  {s.title}
                </h3>
                <span className="text-orange font-mono text-sm tracking-wider uppercase">
                  {s.tag}
                </span>
              </div>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
