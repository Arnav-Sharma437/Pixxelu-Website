"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
      <p className="text-xs text-zinc-400 leading-relaxed font-normal">{desc}</p>
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

/* ─────────────────────────────────────────────────────────
   Inline SVG Watermarks — flat white, no external assets needed
───────────────────────────────────────────────────────── */
function SquarespaceWatermark() {
  return (
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M150 30C84.3 30 30 84.3 30 150s54.3 120 120 120 120-54.3 120-120S215.7 30 150 30zm0 210c-49.7 0-90-40.3-90-90s40.3-90 90-90 90 40.3 90 90-40.3 90-90 90z"
        fill="white"
      />
      <path
        d="M185 115l-35 35-35-35-21.2 21.2L150 192.4l56.2-56.2L185 115z"
        fill="white"
      />
    </svg>
  );
}

function WixWatermark() {
  return (
    <svg viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <text
        x="0"
        y="100"
        fontFamily="'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="120"
        fill="white"
        letterSpacing="-5"
      >
        Wix
      </text>
    </svg>
  );
}

function ShopifyWatermark() {
  return (
    <svg viewBox="0 0 300 340" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Shopify bag icon */}
      <path
        d="M248.5 75.3l-3.5-.3c-.3 0-29-2.2-29-2.2s-19.2-19-21.2-21c-.7-.7-1.6-1-2.6-1.2l-11 192.8 59.3-12.8L248.5 75.3z"
        fill="white"
      />
      <path
        d="M181.8 52.3c-.3 0-.6 0-1 .1-.3-1-1-2-1.8-3C176 45.5 171 43.4 165 44c-1.2.1-2.3.4-3.4.7-1-2.7-2.6-5.1-4.8-7C151.4 32.7 142 33 136 38.6c-10.4 9.6-14.6 24-15.6 37.7l-21 6.5 3 186.6 98.6-18.5L181.8 52.3zM160 48c4-.4 7 .8 9 3.5.5.7 1 1.5 1.3 2.3l-22.7 7c1.4-9 5.4-17.2 12.4-12.8zm-15 6.7c-.5 6-1.7 12-4 17.4l-13 4c2.4-13.4 7-24 17-21.4zm-4.8 159.6c.7 8.3 5.4 15 14.7 15.8 9.8.8 18-5.3 18.8-15.3.8-9.3-5.4-17.3-14-18.7v-29c12.7 1.7 22.7 12.3 21.3 26.3-1.5 17-14.6 27.6-31.4 26.2-15.7-1.4-25.5-14-24-30 1-10.7 7.6-19 16.3-23v28.7c-1 .2-1.5 1.6-1.7 3z"
        fill="white"
      />
    </svg>
  );
}

function WordPressWatermark() {
  return (
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="150" cy="150" r="120" stroke="white" strokeWidth="14" fill="none" />
      <circle cx="150" cy="150" r="5" fill="white" />
      {/* W letter */}
      <path
        d="M72 110l26 80 20-50 20 50 26-80"
        stroke="white"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const WATERMARKS: Record<string, React.ComponentType> = {
  squarespace: SquarespaceWatermark,
  wix: WixWatermark,
  shopify: ShopifyWatermark,
  wordpress: WordPressWatermark,
};

/* ─────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────── */
export default function PlatformDeepDive() {
  const [activePlatform, setActivePlatform] = useState("squarespace");
  const [prevPlatform, setPrevPlatform] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const watermarkRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const animatingRef = useRef(false);

  /* ── Watermark morph: fade out old, scale+fade in new ── */
  const switchPlatform = useCallback((key: string) => {
    if (key === activePlatform || animatingRef.current) return;
    animatingRef.current = true;

    const prevEl = watermarkRefs.current[activePlatform];
    const nextEl = watermarkRefs.current[key];

    const tl = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false;
      },
    });

    // Fade out previous watermark
    if (prevEl) {
      tl.to(prevEl, { opacity: 0, scale: 1, duration: 0.35, ease: "power2.in" }, 0);
    }

    // Fade in + slight scale settle for new watermark
    if (nextEl) {
      tl.fromTo(
        nextEl,
        { opacity: 0, scale: 0.94 },
        { opacity: 0.1, scale: 1.04, duration: 0.5, ease: "power2.out" },
        0.15
      );
    }

    setPrevPlatform(activePlatform);
    setActivePlatform(key);
  }, [activePlatform]);

  /* ── Set initial watermark state ── */
  useEffect(() => {
    // Squarespace starts visible (first active)
    const firstEl = watermarkRefs.current["squarespace"];
    if (firstEl) {
      gsap.set(firstEl, { opacity: 0.1, scale: 1.04 });
    }
    // All others start hidden
    PLATFORM_LIST.slice(1).forEach(({ key }) => {
      const el = watermarkRefs.current[key];
      if (el) gsap.set(el, { opacity: 0, scale: 1 });
    });
  }, []);

  /* ── Parallax scroll animations ── */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
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

  const currentPlatformData =
    PLATFORM_LIST.find((p) => p.key === activePlatform) || PLATFORM_LIST[0];

  return (
    <section
      ref={sectionRef}
      className="platform-matrix bg-transparent text-white py-12 md:py-32 border-b border-white/5 relative overflow-hidden"
      id="platform-dive"
    >
      {/* Decorative Parallax Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="parallax-bg-shape absolute top-10 right-[-10%] w-[500px] h-[500px] bg-orange/[0.015] rounded-full blur-[120px] pointer-events-none" />
        <svg
          className="parallax-bg-shape absolute bottom-10 left-[5%] w-72 h-72 text-white/5 opacity-80"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.1" fill="none" strokeDasharray="3,3" />
          <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="0.05" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start relative z-10">

        {/* ── Left Sidebar ── */}
        <div className="matrix-left md:col-span-4 flex flex-col space-y-6 md:sticky md:top-32">
          <div>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-orange">
              Signature Service
            </span>
            <h3 className="reveal-text text-xl md:text-2xl font-bold font-display tracking-tight text-white mt-1.5 mb-8">
              Platform Matrix
            </h3>
          </div>

          <div className="flex flex-col space-y-4">
            {PLATFORM_LIST.map((platform) => (
              <button
                key={platform.key}
                className={`platform-nav-btn text-left text-lg md:text-xl font-bold tracking-wide transition-all uppercase pl-4 border-l-2 focus:outline-none cursor-pointer ${
                  activePlatform === platform.key
                    ? "text-white border-orange font-black"
                    : "text-zinc-500 border-transparent hover:text-white"
                }`}
                onClick={() => switchPlatform(platform.key)}
                onMouseEnter={() => switchPlatform(platform.key)}
              >
                {platform.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Right Panel with watermark layer ── */}
        <div className="md:col-span-8 w-full relative">

          {/* ── Watermark layer — behind all content ── */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center"
            style={{ zIndex: 0 }}
            aria-hidden="true"
          >
            {PLATFORM_LIST.map(({ key }) => {
              const WatermarkSVG = WATERMARKS[key];
              return (
                <div
                  key={key}
                  ref={(el) => { watermarkRefs.current[key] = el; }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ opacity: 0 }}
                >
                  <div className="w-[55%] max-w-[260px] select-none">
                    <WatermarkSVG />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Panel content (z-index above watermark) ── */}
          <div
            className="relative transition-all duration-300 ease-in-out flex flex-col space-y-6"
            style={{ zIndex: 1 }}
          >
            <div>
              <span className="inline-block text-[11px] font-bold tracking-widest text-zinc-400 uppercase bg-white/5 border border-white/10 px-3 py-1 rounded">
                {currentPlatformData.tagline}
              </span>
              <h4 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white mt-4 max-w-xl">
                {currentPlatformData.headline}
              </h4>
            </div>

            {/* Split Grid */}
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
