"use client";

import { useEffect, useRef, useState } from "react";
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
  <div className="bg-white/5 border border-white/10 p-5 hover:border-orange hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group cursor-pointer">
    <div>
      <h4 className="text-sm font-bold tracking-tight text-white mb-1.5 group-hover:text-orange transition-colors">
        {title}
      </h4>
      <p className="text-xs text-grey-800 leading-relaxed font-normal">
        {desc}
      </p>
    </div>
    <div className="flex justify-end mt-4">
      <ArrowUpRight className="w-4 h-4 text-grey-800 group-hover:text-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
    headline: "Transactional engines built for commerce scalability.",
    tagline: "Best for stores ready to scale commerce",
    services: [
      { title: "Store Configuration", desc: "Tax engines, shipping logic, and checkout integrations." },
      { title: "Liquid Theme Dev", desc: "Fully custom Shopify theme development optimized for performance." },
      { title: "App Ecosystem Sync", desc: "Seamless integration of ERPs, inventory management, and CRM apps." },
      { title: "CRO Implementation", desc: "High-speed landing pages and checkout flows to maximize sales." },
    ],
  },
  {
    key: "wordpress",
    label: "WORDPRESS",
    headline: "Full-control architectures built for content scale.",
    tagline: "Best for content-heavy sites that need full control",
    services: [
      { title: "Headless CMS Setup", desc: "Decouple backend editing from frontend speed using Next.js." },
      { title: "Custom Blocks & ACF", desc: "Easy editing systems using custom Gutenberg blocks." },
      { title: "WooCommerce Engine", desc: "Scalable online stores customized to complex transactional needs." },
      { title: "Speed & Security Tuning", desc: "Object caching, CDN routing, and vulnerability hardening." },
    ],
  },
];

export default function PlatformDeepDive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const [activePlatform, setActivePlatform] = useState<string>("squarespace");

  const handleLinkClick = (index: number, key: string) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (prefersReducedMotion || isMobile) {
      const element = document.getElementById(`section-${key}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    const trigger = ScrollTrigger.getById("matrixTrigger");
    if (trigger) {
      const start = trigger.start;
      const end = trigger.end;
      const targetScroll = start + (end - start) * (index / 3);
      window.scrollTo({ top: targetScroll + 5, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (prefersReducedMotion || isMobile) {
      return; // Skip GSAP ScrollTrigger pinning and let it scroll naturally
    }

    const panels = gsap.utils.toArray(".panel");
    const leftLinks = leftColRef.current?.querySelectorAll(".platform-nav-btn");

    if (!sectionRef.current || !panels.length || !leftLinks) return;

    // Set initial active state for nav links
    gsap.set(leftLinks, { color: "#6B6B6B", borderLeftColor: "transparent" });
    gsap.set(leftLinks[0], { color: "#FFFFFF", borderLeftColor: "#E85C2B" });

    // 1. Literal GSAP setup as requested
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        id: "matrixTrigger",
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=4000",
        onUpdate: (self) => {
          const progress = self.progress;
          let activeIndex = 0;
          if (progress > 0.83) activeIndex = 3;
          else if (progress > 0.5) activeIndex = 2;
          else if (progress > 0.17) activeIndex = 1;
          
          setActivePlatform(PLATFORM_LIST[activeIndex].key);
        },
      },
    });

    panels.forEach((panel: any, i: number) => {
      if (i === 0) return; // first panel already visible
      const prevPanel = panels[i - 1] as any;
      const label = `seg${i}`;
      
      tl.to(prevPanel, { autoAlpha: 0, duration: 0.3 }, label)
        .to(panel, { autoAlpha: 1, duration: 0.3 }, label)
        .to(leftLinks[i - 1], { color: "#6B6B6B", borderLeftColor: "transparent", duration: 0.2 }, label)
        .to(leftLinks[i], { color: "#FFFFFF", borderLeftColor: "#E85C2B", duration: 0.2 }, label);
    });

    return () => tl.scrollTrigger?.kill();
  }, []);

  return (
    <section
      className="platform-matrix bg-off-black text-white relative min-h-screen flex items-center justify-center py-20 md:py-0 border-b border-grey-800/10"
      ref={sectionRef}
      id="platform-dive"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
        {/* Left Column (Sticky Sidebar on Desktop) */}
        <div className="matrix-left md:col-span-4 flex flex-col space-y-6 md:py-12 md:sticky md:top-32" ref={leftColRef}>
          <div>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-orange">
              Signature Service
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-white mt-1.5 mb-8">
              Platform Matrix
            </h3>
          </div>

          <div className="flex flex-col space-y-4">
            {PLATFORM_LIST.map((platform, index) => (
              <button
                key={platform.key}
                className={`platform-nav-btn text-left text-lg md:text-xl font-bold tracking-wide transition-all uppercase pl-4 border-l-2 focus:outline-none cursor-pointer ${
                  activePlatform === platform.key
                    ? "text-white border-orange"
                    : "text-grey-500 border-transparent hover:text-white"
                }`}
                onClick={() => handleLinkClick(index, platform.key)}
              >
                {platform.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column (Stacked absolute cards) */}
        <div className="md:col-span-8 w-full flex items-center md:items-stretch">
          
          {/* Desktop Overlay Container */}
          <div className="hidden md:block w-full h-full relative">
            <div className="matrix-right" style={{ position: "relative", height: "500px", width: "100%" }}>
              
              {/* Panel 1: Squarespace */}
              <div
                className="panel panel-squarespace w-full flex flex-col justify-center space-y-6"
                style={{ position: "absolute", inset: 0 }}
              >
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-grey-800 uppercase bg-white/5 border border-white/15 px-3 py-1">
                    {PLATFORM_LIST[0].tagline}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white mt-4 max-w-xl">
                    {PLATFORM_LIST[0].headline}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PLATFORM_LIST[0].services.map((service, sIndex) => (
                    <ServiceCard key={sIndex} title={service.title} desc={service.desc} />
                  ))}
                </div>
              </div>

              {/* Panel 2: Wix */}
              <div
                className="panel panel-wix w-full flex flex-col justify-center space-y-6"
                style={{ position: "absolute", inset: 0, visibility: "hidden", opacity: 0 }}
              >
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-grey-800 uppercase bg-white/5 border border-white/15 px-3 py-1">
                    {PLATFORM_LIST[1].tagline}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white mt-4 max-w-xl">
                    {PLATFORM_LIST[1].headline}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PLATFORM_LIST[1].services.map((service, sIndex) => (
                    <ServiceCard key={sIndex} title={service.title} desc={service.desc} />
                  ))}
                </div>
              </div>

              {/* Panel 3: Shopify */}
              <div
                className="panel panel-shopify w-full flex flex-col justify-center space-y-6"
                style={{ position: "absolute", inset: 0, visibility: "hidden", opacity: 0 }}
              >
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-grey-800 uppercase bg-white/5 border border-white/15 px-3 py-1">
                    {PLATFORM_LIST[2].tagline}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white mt-4 max-w-xl">
                    {PLATFORM_LIST[2].headline}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PLATFORM_LIST[2].services.map((service, sIndex) => (
                    <ServiceCard key={sIndex} title={service.title} desc={service.desc} />
                  ))}
                </div>
              </div>

              {/* Panel 4: WordPress */}
              <div
                className="panel panel-wordpress w-full flex flex-col justify-center space-y-6"
                style={{ position: "absolute", inset: 0, visibility: "hidden", opacity: 0 }}
              >
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-grey-800 uppercase bg-white/5 border border-white/15 px-3 py-1">
                    {PLATFORM_LIST[3].tagline}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white mt-4 max-w-xl">
                    {PLATFORM_LIST[3].headline}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PLATFORM_LIST[3].services.map((service, sIndex) => (
                    <ServiceCard key={sIndex} title={service.title} desc={service.desc} />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Mobile Stacking Version */}
          <div className="md:hidden flex flex-col space-y-16 w-full">
            {PLATFORM_LIST.map((platform) => (
              <div
                key={platform.key}
                id={`section-${platform.key}`}
                className="flex flex-col space-y-5 pt-8 border-t border-white/10"
              >
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-grey-800 uppercase bg-white/5 border border-white/15 px-2.5 py-1">
                    {platform.tagline}
                  </span>
                  <h4 className="text-xl font-bold font-display tracking-tight text-white mt-3">
                    {platform.headline}
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {platform.services.map((service, sIndex) => (
                    <ServiceCard key={sIndex} title={service.title} desc={service.desc} />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
