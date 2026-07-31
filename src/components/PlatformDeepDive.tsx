"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

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
  const [activePlatform, setActivePlatform] = useState<string>("squarespace");

  const currentPlatformData = PLATFORM_LIST.find((p) => p.key === activePlatform) || PLATFORM_LIST[0];

  return (
    <section
      className="platform-matrix bg-off-black text-white py-24 md:py-32 border-b border-grey-800/10"
      id="platform-dive"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
        
        {/* Left Column (Sticky Sidebar on Desktop) */}
        <div className="matrix-left md:col-span-4 flex flex-col space-y-6 md:sticky md:top-32">
          <div>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-orange">
              Signature Service
            </span>
            <h3 className="reveal-text text-xl md:text-2xl font-bold font-display tracking-tight text-white mt-1.5 mb-8">
              Platform Matrix
            </h3>
          </div>

          {/* Interactive Navigation (Click/Hover transitions active state) */}
          <div className="flex flex-col space-y-4">
            {PLATFORM_LIST.map((platform) => (
              <button
                key={platform.key}
                className={`platform-nav-btn text-left text-lg md:text-xl font-bold tracking-wide transition-all uppercase pl-4 border-l-2 focus:outline-none cursor-pointer ${
                  activePlatform === platform.key
                    ? "text-white border-orange"
                    : "text-grey-500 border-transparent hover:text-white"
                }`}
                onClick={() => setActivePlatform(platform.key)}
                onMouseEnter={() => setActivePlatform(platform.key)}
              >
                {platform.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column (Standard Content Grid - No Parallax/Overlaps) */}
        <div className="md:col-span-8 w-full">
          <div className="transition-all duration-300 ease-in-out flex flex-col space-y-6">
            <div>
              <span className="inline-block text-[11px] font-bold tracking-widest text-grey-800 uppercase bg-white/5 border border-white/15 px-3 py-1">
                {currentPlatformData.tagline}
              </span>
              <h4 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-white mt-4 max-w-xl">
                {currentPlatformData.headline}
              </h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentPlatformData.services.map((service, sIndex) => (
                <ServiceCard key={sIndex} title={service.title} desc={service.desc} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
