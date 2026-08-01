"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ==========================================================================
   REUSABLE COMPONENTS
   ========================================================================== */

// 1. ContactButton
export function ContactButton() {
  return (
    <button
      onClick={() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }}
      className="rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
        outline: "2px solid white",
        outlineOffset: "-3px",
      }}
    >
      Contact Us
    </button>
  );
}

// 2. LiveProjectButton
export function LiveProjectButton() {
  return (
    <button className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-300 hover:bg-[#D7E2EA]/10 cursor-pointer">
      Live Project
    </button>
  );
}

// 3. FadeIn wrapper
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: any;
  className?: string;
}

export function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, as = "div", className }: FadeInProps) {
  const Component = motion.create(as);
  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}

// 4. Magnet wrapper
export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}: {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}) {
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)");
  const [transition, setTransition] = useState(inactiveTransition);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - elementCenterX;
    const distanceY = e.clientY - elementCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < padding) {
      setTransition(activeTransition);
      setTransform(`translate3d(${distanceX / strength}px, ${distanceY / strength}px, 0px)`);
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    setTransition(inactiveTransition);
    setTransform("translate3d(0px, 0px, 0px)");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition,
        willChange: "transform",
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
}

// 5. AnimatedText Character-by-character Scroll Opacity Reveal
export function AnimatedText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, wordIdx) => {
        return (
          <span key={wordIdx} className="inline-block mr-2 whitespace-nowrap">
            {word.split("").map((char, charIdx) => {
              const charGlobalIdx = text.indexOf(word) + charIdx;
              const start = charGlobalIdx / text.length;
              const end = (charGlobalIdx + 1) / text.length;
              const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);

              return (
                <span key={charIdx} className="relative inline-block">
                  <span className="opacity-20 select-none">{char}</span>
                  <motion.span
                    style={{ opacity }}
                    className="absolute left-0 top-0 text-[#D7E2EA]"
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
}

/* ==========================================================================
   SECTIONS
   ========================================================================== */

// 1. HeroSection
function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeAnimId = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  const fadeVideo = (targetOpacity: number, duration: number, onComplete?: () => void) => {
    const video = videoRef.current;
    if (!video) return;
    if (fadeAnimId.current !== null) cancelAnimationFrame(fadeAnimId.current);
    const startOpacity = parseFloat(video.style.opacity || "0");
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      video.style.opacity = (startOpacity + (targetOpacity - startOpacity) * progress).toString();
      if (progress < 1) {
        fadeAnimId.current = requestAnimationFrame(animate);
      } else {
        if (onComplete) onComplete();
      }
    };
    fadeAnimId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.style.opacity = "0";
    const handleCanPlay = () => fadeVideo(0.55, 500);
    const handleTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fadeVideo(0, 500);
      }
    };
    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play().then(() => {
          fadingOutRef.current = false;
          fadeVideo(0.55, 500);
        }).catch(() => {});
      }, 100);
    };
    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    return () => {
      if (fadeAnimId.current !== null) cancelAnimationFrame(fadeAnimId.current);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-40 pb-28 md:pb-40 bg-[#0C0C0C]">

      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover translate-y-[17%]"
          style={{ opacity: 0, transition: "none" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]/60" />
      </div>

      {/* Hero Header Title */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 text-center relative z-20">
        <div className="overflow-hidden w-full">
          <FadeIn as="h1" delay={0.15} y={40} className="font-black uppercase tracking-tight leading-[0.95] w-full text-[7vw] sm:text-[8vw] md:text-[9vw] lg:text-[10vw] flex flex-col items-center">
            <span className="block" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #C8D8E4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>we are pixxelu</span>
            <span className="block tracking-normal font-medium mt-2 text-[5vw] sm:text-[5.5vw] md:text-[6vw] lg:text-[6.5vw]" style={{ background: "linear-gradient(180deg, #E0ECFF 0%, #BBCCD7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>digital technology</span>
          </FadeIn>
          <FadeIn delay={0.35} y={20} className="mt-6 text-white/70 text-sm sm:text-base md:text-lg font-light tracking-wide max-w-xl mx-auto">
            We design, develop &amp; launch websites on Wix, Squarespace, WordPress &amp; Shopify
          </FadeIn>
        </div>
      </div>

      {/* Bottom Bar Content */}
      <div className="w-full px-8 md:px-16 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-25 relative">
        <FadeIn delay={0.35} y={20} className="text-white/60 font-light uppercase tracking-widest leading-snug text-[9px] sm:text-[10px] md:text-xs max-w-[200px] sm:max-w-[280px] text-left">
          seo · digital marketing · high-conversion websites
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

// 2. MarqueeSection (Horizontal parallax scrolls)
// Using reliable Unsplash images showing web design / digital agency work
const MARQUEE_GIFS = [
  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
  "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
  "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80",
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80",
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
  "https://images.unsplash.com/photo-1587620962725-abab19836100?w=800&q=80",
  "https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=800&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
];

function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(currentOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const row1Gifs = [...MARQUEE_GIFS.slice(0, 11), ...MARQUEE_GIFS.slice(0, 11), ...MARQUEE_GIFS.slice(0, 11)];
  const row2Gifs = [...MARQUEE_GIFS.slice(11), ...MARQUEE_GIFS.slice(11), ...MARQUEE_GIFS.slice(11)];

  return (
    <section ref={sectionRef} className="bg-transparent pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden relative w-full">
      <div className="flex flex-col space-y-6">
        
        {/* Row 1 (Moves Right) */}
        <div className="overflow-hidden w-full flex">
          <div
            className="flex gap-3 shrink-0"
            style={{
              transform: `translate3d(${offset - 200}px, 0px, 0px)`,
              willChange: "transform",
            }}
          >
            {row1Gifs.map((gif, index) => (
              <div key={index} className="w-[320px] sm:w-[420px] h-[200px] sm:h-[270px] relative rounded-2xl overflow-hidden shrink-0 border border-white/5">
                <Image
                  src={gif}
                  alt={`Marquee item ${index}`}
                  fill
                  sizes="(max-width: 640px) 320px, 420px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (Moves Left) */}
        <div className="overflow-hidden w-full flex">
          <div
            className="flex gap-3 shrink-0"
            style={{
              transform: `translate3d(${-(offset - 200)}px, 0px, 0px)`,
              willChange: "transform",
            }}
          >
            {row2Gifs.map((gif, index) => (
              <div key={index} className="w-[320px] sm:w-[420px] h-[200px] sm:h-[270px] relative rounded-2xl overflow-hidden shrink-0 border border-white/5">
                <Image
                  src={gif}
                  alt={`Marquee item ${index}`}
                  fill
                  sizes="(max-width: 640px) 320px, 420px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// 3. AboutSection (Corner 3D float decorations + character reveal narrative)
function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 overflow-hidden text-center z-20">
      
      {/* Decorative Corner Images */}
      {/* Top Left: Moon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 select-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <div className="w-[120px] sm:w-[160px] md:w-[210px] aspect-square relative">
            <Image
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
              alt="Moon element"
              fill
              sizes="(max-width: 640px) 120px, (max-width: 768px) 160px, 210px"
              className="object-contain"
            />
          </div>
        </FadeIn>
      </div>

      {/* Bottom Left: 3D sphere shape */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 select-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <div className="w-[100px] sm:w-[140px] md:w-[180px] aspect-square relative">
            <Image
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
              alt="3D object decoration"
              fill
              sizes="(max-width: 640px) 100px, (max-width: 768px) 140px, 180px"
              className="object-contain"
            />
          </div>
        </FadeIn>
      </div>

      {/* Top Right: Lego Block */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 select-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <div className="w-[120px] sm:w-[160px] md:w-[210px] aspect-square relative">
            <Image
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
              alt="Lego Block element"
              fill
              sizes="(max-width: 640px) 120px, (max-width: 768px) 160px, 210px"
              className="object-contain"
            />
          </div>
        </FadeIn>
      </div>

      {/* Bottom Right: 3D geometric grouping */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 select-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <div className="w-[130px] sm:w-[170px] md:w-[220px] aspect-square relative">
            <Image
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
              alt="3D grouping decoration"
              fill
              sizes="(max-width: 640px) 130px, (max-width: 768px) 170px, 220px"
              className="object-contain"
            />
          </div>
        </FadeIn>
      </div>

      {/* Layout stack container */}
      <div className="flex flex-col items-center justify-center space-y-10 sm:space-y-14 md:space-y-16 max-w-4xl z-20">
        
        {/* Title */}
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[3rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem]">
            About us
          </h2>
        </FadeIn>

        {/* Character scroll reveal text block */}
        <AnimatedText
          text="We leverage advanced AI models to scaffold structure, test modules, and write clean boilerplate. This efficiency frees our engineers to focus 100% of their energy on bespoke animations, accessibility audits, and custom integrations. Let's build something incredible together!"
          className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] text-base sm:text-lg md:text-xl lg:text-[1.35rem]"
        />

        {/* Contact button */}
        <FadeIn delay={0.2} y={30}>
          <ContactButton />
        </FadeIn>

      </div>
    </section>
  );
}

// 4. ServicesSection (Platform Matrix aligned with Homepage)
interface ServiceItemProps {
  num: string;
  title: string;
  desc: string;
  delay: number;
}

function ServiceRow({ num, title, desc, delay }: ServiceItemProps) {
  return (
    <FadeIn delay={delay} y={25} className="w-full border-b border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12 flex flex-col md:flex-row items-start justify-between gap-6">
      {/* Number on the left */}
      <span className="font-black text-black leading-none tracking-tight text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[8.5rem] shrink-0">
        {num}
      </span>
      
      {/* Name and description stacked on the right */}
      <div className="flex flex-col space-y-3 text-left md:max-w-2xl">
        <h3 className="font-semibold text-black uppercase text-lg sm:text-xl md:text-2xl lg:text-[2.1rem] tracking-tight">
          {title}
        </h3>
        <p className="font-light text-black/60 leading-relaxed text-sm sm:text-base md:text-[1.25rem]">
          {desc}
        </p>
      </div>
    </FadeIn>
  );
}

function ServicesSection() {
  const services = [
    { num: "01", title: "Wix Studio", desc: "Next-generation website design, Velo full-stack custom database development, API connections, search engine optimization (SEO), and interactive pixel-perfect user experiences." },
    { num: "02", title: "Squarespace", desc: "Design-first web presences engineered for rapid launch. Visual brand integrations, custom code modifications, localized SEO tuning, and automated client booking portals." },
    { num: "03", title: "WordPress", desc: "Custom CMS engineering and backend development. Headless React decoupings, Gutenberg block codings, speed-optimized SEO structures, and dynamic marketing pipelines." },
    { num: "04", title: "Shopify", desc: "High-conversion e-commerce development. Custom Liquid theme overrides, product schema SEO tweaks, ERP connection hooks, and optimized digital marketing conversion checkouts." }
  ];

  return (
    <section id="services" className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Title */}
        <h2 className="text-black font-black uppercase text-[3rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-none mb-16 sm:mb-20 md:mb-28">
          Services
        </h2>

        {/* List of service items */}
        <div className="w-full flex flex-col">
          {services.map((s, i) => (
            <ServiceRow
              key={s.num}
              num={s.num}
              title={s.title}
              desc={s.desc}
              delay={i * 0.1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// 5. ProjectsSection (Sticky Stacking cards mapping Homepage Outcomes)
interface ProjectData {
  num: string;
  category: string;
  name: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const PROJECTS_DATA: ProjectData[] = [
  {
    num: "01",
    category: "Shopify Case Study",
    name: "Nextlevel Fashion",
    col1Img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    col1Img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    col2Img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
  },
  {
    num: "02",
    category: "Squarespace Case Study",
    name: "Aura Architecture",
    col1Img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    col1Img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2Img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
  },
  {
    num: "03",
    category: "WordPress Case Study",
    name: "Solaris Publication",
    col1Img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    col1Img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    col2Img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
  }
];

function ProjectCard({ project, index, scrollProgress }: { project: ProjectData; index: number; scrollProgress: any }) {
  const totalCards = PROJECTS_DATA.length;
  
  // Scale down card as we scroll past it
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollProgress, [index / totalCards, (index + 1) / totalCards], [1, targetScale]);

  return (
    <div
      className="sticky w-full h-[85vh] flex items-center justify-center top-24 md:top-32"
      style={{
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className="relative w-full max-w-6xl bg-[#0C0C0C] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] shadow-2xl flex flex-col justify-between h-[75vh] overflow-hidden"
      >
        
        {/* Top Row Card Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full border-b border-[#D7E2EA]/15 pb-4 md:pb-6">
          <div className="flex items-center space-x-4 md:space-x-6">
            <span className="font-black text-orange leading-none tracking-tight text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] shrink-0">
              {project.num}
            </span>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold tracking-widest text-[#D7E2EA]/40 uppercase">
                {project.category}
              </span>
              <h4 className="text-lg sm:text-2xl md:text-3xl font-black uppercase text-[#D7E2EA] tracking-tight font-display">
                {project.name}
              </h4>
            </div>
          </div>
          
          <div className="flex justify-start sm:justify-end shrink-0">
            <LiveProjectButton />
          </div>
        </div>

        {/* Bottom Row: 2-column image grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 mt-6 items-stretch overflow-hidden">
          
          {/* Column 1: Left (40% width, 2 stacked images) */}
          <div className="md:col-span-5 flex flex-col gap-4 justify-between h-full">
            <div className="relative w-full h-[48%] rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden border border-[#D7E2EA]/10 bg-white/5">
              <Image
                src={project.col1Img1}
                alt={`${project.name} client mockup top`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative w-full h-[48%] rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden border border-[#D7E2EA]/10 bg-white/5">
              <Image
                src={project.col1Img2}
                alt={`${project.name} client mockup bottom`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Column 2: Right (60% width, 1 tall image) */}
          <div className="md:col-span-7 relative rounded-[30px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[60px] overflow-hidden border border-[#D7E2EA]/10 bg-white/5 h-full">
            <Image
              src={project.col2Img}
              alt={`${project.name} main feature visual`}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
              loading="lazy"
            />
          </div>

        </div>

      </motion.div>
    </div>
  );
}

function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-32 pb-32 overflow-visible z-30"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center">
        
        {/* Title */}
        <div className="mb-20">
          <FadeIn delay={0} y={40}>
            <h2 className="hero-heading font-black uppercase tracking-tight text-[3rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-none">
              Project
            </h2>
          </FadeIn>
        </div>

        {/* Stack of sticky project cards */}
        <div className="w-full flex flex-col relative">
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectCard
              key={project.num}
              project={project}
              index={idx}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ==========================================================================
   MAIN WRAPPER & EXPORT
   ========================================================================== */
export default function PortfolioPage() {
  return (
    <div className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] select-text">
      {/* Primary Site Header */}
      <Navbar />

      <main className="w-full overflow-x-clip">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        
        <div id="contact" className="h-2" />
      </main>

      {/* Primary Site Footer */}
      <Footer />
    </div>
  );
}
