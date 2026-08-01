"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    title: "Discovery",
    image: "/process-discovery.jpg",
    imageLeft: true,
    copy: "We don't just build websites; we engineer digital solutions. This begins with our meticulous Discovery Phase — a critical, in-depth collaboration designed to thoroughly understand your business, its complexities, and which platform genuinely fits your goals.",
  },
  {
    number: "02",
    title: "Planning",
    image: "/process-planning.jpg",
    imageLeft: false,
    copy: "Our planning phase transforms vision into a meticulously engineered roadmap. We outline the entire project, establish concrete milestones, and set clear priorities — ensuring the plan aligns with both your long-term vision and your platform choice (Squarespace, Wix, Shopify, or WordPress).",
  },
  {
    number: "03",
    title: "Execution",
    image: "/process-execution.jpg",
    imageLeft: true,
    copy: "Our execution phase brings your vision to life. Design and development work in synergy, crafting visual concepts and building on your chosen platform with attention to performance, accessibility, and conversion.",
  },
  {
    number: "04",
    title: "Delivery",
    image: "/process-delivery.jpg",
    imageLeft: false,
    copy: "We launch, test, and hand off a fully polished, high-performing site — plus the documentation and support your team needs to keep it running smoothly long after launch.",
  },
];

/* ─────────────────────────────────────────────────────────
   Step Icon
───────────────────────────────────────────────────────── */
function StepIcon() {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-orange shrink-0 mt-1"
      style={{ borderColor: "#E85C2B" }}
    >
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ background: "#E85C2B" }}
      />
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────── */
export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Connector line: scroll-driven draw ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Row fade-in animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row) => {
        if (!row) return;
        const image = row.querySelector(".process-img");
        const text = row.querySelector(".process-text");
        gsap.fromTo(
          [image, text],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-black py-24 md:py-36 overflow-hidden border-b border-black/5"
    >
      {/* ── Section header ── */}
      <div className="px-6 md:px-16 text-center mb-20 md:mb-28">
        <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#E85C2B" }}>
          How We Work
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-[#0A0A0A]">
          Our Digital Agency<br className="hidden sm:block" /> Process
        </h2>
        <p className="mt-4 text-[#6B6B6B] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Four structured phases that take you from initial idea to a live, high-performing website.
        </p>
      </div>

      {/* ── SVG Connector Line (desktop only) ── */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
        style={{ zIndex: 0 }}
      >
        <path
          ref={pathRef}
          d="M 270 180 C 270 350, 730 350, 730 520 C 730 690, 270 690, 270 860 C 270 960, 730 960, 730 1000"
          fill="none"
          stroke="#E85C2B"
          strokeWidth="2"
          strokeDasharray="8 10"
          strokeLinecap="round"
        />
      </svg>

      {/* ── Mobile vertical guide line ── */}
      <div
        className="absolute left-6 top-48 bottom-16 w-px md:hidden"
        style={{
          background: "repeating-linear-gradient(to bottom, #E85C2B 0px, #E85C2B 8px, transparent 8px, transparent 18px)",
          zIndex: 0,
        }}
      />

      {/* ── Steps ── */}
      <div className="relative px-6 md:px-16 flex flex-col gap-20 md:gap-36" style={{ zIndex: 1 }}>
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            ref={(el) => { rowRefs.current[i] = el; }}
            className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
              !step.imageLeft ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="process-img w-full md:w-[45%] shrink-0">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-black/5">
                <Image
                  src={step.image}
                  alt={`${step.title} illustration`}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div className="process-text w-full md:w-[45%] flex flex-col gap-5">
              {/* Step number badge */}
              <span
                className="text-[11px] font-black tracking-[0.3em] uppercase"
                style={{ color: "#E85C2B" }}
              >
                Step {step.number}
              </span>

              {/* Title with icon */}
              <div className="flex items-start gap-3">
                <StepIcon />
                <h3 className="text-3xl md:text-4xl font-black text-[#0A0A0A] leading-tight tracking-tight">
                  {step.title}
                </h3>
              </div>

              {/* Body copy */}
              <p className="text-[#6B6B6B] text-base md:text-lg leading-[1.7] max-w-[480px]">
                {step.copy}
              </p>

              {/* Decorative step number */}
              <span
                className="text-[80px] font-black leading-none select-none"
                style={{ color: "#0A0A0A", opacity: 0.04 }}
                aria-hidden="true"
              >
                {step.number}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
