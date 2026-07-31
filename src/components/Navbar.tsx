"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";

export const PixxeluLogo = ({ isDarkNav = false }: { isDarkNav?: boolean }) => {
  const ixxelColor = isDarkNav ? "text-white" : "text-black";
  const taglineColor = isDarkNav ? "text-grey-800" : "text-grey-500";

  return (
    <Link href="/" className="group flex flex-col items-start focus:outline-none" aria-label="Pixxelu Homepage">
      <div className="flex items-baseline text-2xl font-bold tracking-tight font-display select-none">
        <span className="text-orange font-extrabold">p</span>
        <span className={`${ixxelColor} transition-colors duration-300 font-bold`}>ixxel</span>
        <span className="text-orange font-extrabold">u</span>
      </div>
      <span className={`text-[8px] font-medium tracking-[0.2em] uppercase ${taglineColor} -mt-0.5 transition-colors duration-300`}>
        DIGITAL TECHNOLOGY
      </span>
    </Link>
  );
};

interface PlatformInfo {
  name: string;
  tagline: string;
  services: string[];
  mockupType: "squarespace" | "wix" | "shopify" | "wordpress";
}

const PLATFORMS_DATA: Record<string, PlatformInfo> = {
  squarespace: {
    name: "SQUARESPACE",
    tagline: "Best for design-led brands who want to move fast",
    services: [
      "Visual Brand Integration",
      "Custom CSS Styling & Extensions",
      "Scheduling & Membership Portals",
      "Platform Migration & Content Sync",
    ],
    mockupType: "squarespace",
  },
  wix: {
    name: "WIX",
    tagline: "Best for lean teams who want speed without a dev team",
    services: [
      "Wix Studio Custom Designs",
      "Velo Custom Code Integrations",
      "Database & Booking Systems",
      "SEO & Performance Tuning",
    ],
    mockupType: "wix",
  },
  shopify: {
    name: "SHOPIFY",
    tagline: "Best for stores ready to scale commerce",
    services: [
      "New Store Setup & Configuration",
      "Custom Theme Development",
      "App Setup & API Integrations",
      "Conversion Rate Optimization (CRO)",
    ],
    mockupType: "shopify",
  },
  wordpress: {
    name: "WORDPRESS",
    tagline: "Best for content-heavy sites that need full control",
    services: [
      "Headless CMS Architecture",
      "Advanced Custom Fields (ACF)",
      "WooCommerce Development",
      "Enterprise Speed & Security Scaling",
    ],
    mockupType: "wordpress",
  },
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [hoveredPlatform, setHoveredPlatform] = useState<keyof typeof PLATFORMS_DATA>("squarespace");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll height
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine navbar theme
  // transparent dark mode on hero, white opaque once scrolled past hero
  const isDarkNav = !isScrolled && !isMegaMenuOpen && !isMobileMenuOpen;

  const currentPlatformInfo = PLATFORMS_DATA[hoveredPlatform];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-grey-800/10 text-black py-4"
          : isMegaMenuOpen || isMobileMenuOpen
          ? "bg-white text-black py-5 border-b border-grey-800/10"
          : "bg-transparent text-white py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <PixxeluLogo isDarkNav={isDarkNav} />

        {/* Center Navigation (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Platforms trigger */}
          <div
            className="relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="flex items-center space-x-1 py-2 text-xs font-semibold tracking-[0.1em] uppercase hover:text-orange transition-colors cursor-pointer"
              aria-expanded={isMegaMenuOpen}
              aria-haspopup="true"
            >
              <span>Platforms</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isMegaMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <Link
            href="#cases"
            className="text-xs font-semibold tracking-[0.1em] uppercase hover:text-orange transition-colors"
          >
            Cases
          </Link>
          <Link
            href="#company"
            className="text-xs font-semibold tracking-[0.1em] uppercase hover:text-orange transition-colors"
          >
            Company
          </Link>
          <Link
            href="#insights"
            className="text-xs font-semibold tracking-[0.1em] uppercase hover:text-orange transition-colors"
          >
            Insights
          </Link>
          <Link
            href="#contact"
            className="text-xs font-semibold tracking-[0.1em] uppercase hover:text-orange transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Action Button & Mobile menu toggle */}
        <div className="flex items-center space-x-4">
          <Link
            href="#contact"
            className={`hidden sm:inline-flex items-center justify-center text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 border hover:scale-[1.02] ${
              isDarkNav
                ? "bg-white text-black border-white hover:bg-white/95"
                : "bg-black text-white border-black hover:bg-black/90"
            }`}
          >
            Get In Touch
          </Link>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 focus:outline-none"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className={`w-6 h-6 ${isDarkNav ? "text-white" : "text-black"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown (Desktop) */}
      <div
        className={`hidden md:block absolute left-0 w-full bg-white text-black border-t border-grey-800/10 transition-all duration-300 origin-top ${
          isMegaMenuOpen
            ? "opacity-100 scale-y-100 pointer-events-auto visible"
            : "opacity-0 scale-y-95 pointer-events-none invisible"
        }`}
        style={{ top: "100%" }}
        onMouseEnter={() => setIsMegaMenuOpen(true)}
        onMouseLeave={() => setIsMegaMenuOpen(false)}
      >
        <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-[250px_1fr] gap-12">
          {/* Left Column - Platform Stack */}
          <div className="flex flex-col space-y-4 border-r border-grey-800/10 pr-8">
            {(Object.keys(PLATFORMS_DATA) as Array<keyof typeof PLATFORMS_DATA>).map((key) => {
              const platform = PLATFORMS_DATA[key];
              const isActive = hoveredPlatform === key;
              return (
                <button
                  key={key}
                  onMouseEnter={() => setHoveredPlatform(key)}
                  className={`text-left text-lg font-bold tracking-wider transition-all uppercase focus:outline-none cursor-pointer ${
                    isActive ? "text-black pl-2 border-l-2 border-orange" : "text-grey-500 hover:text-black"
                  }`}
                >
                  {platform.name}
                </button>
              );
            })}
          </div>

          {/* Right Column - Service List & Dynamic Mockup */}
          <div className="grid grid-cols-[1fr_300px] gap-8">
            {/* Services List */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold tracking-wider text-orange uppercase mb-2">
                  Key Capabilities
                </p>
                <h4 className="text-xl font-bold font-display tracking-tight text-black mb-4">
                  {currentPlatformInfo.tagline}
                </h4>
                <ul className="space-y-3">
                  {currentPlatformInfo.services.map((service, index) => (
                    <li key={index} className="flex items-center text-sm text-grey-500 font-medium">
                      <span className="w-1.5 h-1.5 bg-orange mr-3 shrink-0"></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`#platform-dive`}
                onClick={() => setIsMegaMenuOpen(false)}
                className="inline-flex items-center text-xs font-bold tracking-[0.08em] text-orange hover:text-black uppercase mt-6 transition-colors duration-300 group/link"
              >
                <span>Deep dive {currentPlatformInfo.name}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>

            {/* Dynamic CSS Mockup Graphic */}
            <div className="bg-off-black relative rounded-none p-3 h-full aspect-[4/3] flex flex-col overflow-hidden border border-grey-800/20 shadow-md">
              {/* Window Header */}
              <div className="flex items-center space-x-1 mb-2.5 pb-1 border-b border-white/10 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <div className="ml-2 text-[8px] text-grey-800 uppercase font-mono tracking-wider truncate max-w-[150px]">
                  pixxelu.co/{hoveredPlatform}
                </div>
              </div>

              {/* Dynamic UI Content based on platform */}
              <div className="flex-1 flex flex-col space-y-2 justify-center">
                {hoveredPlatform === "squarespace" && (
                  <div className="space-y-2">
                    <div className="h-3 bg-white/20 w-3/4"></div>
                    <div className="h-2 bg-white/10 w-5/6"></div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="aspect-[4/3] bg-orange/40"></div>
                      <div className="aspect-[4/3] bg-white/10"></div>
                    </div>
                  </div>
                )}
                {hoveredPlatform === "wix" && (
                  <div className="space-y-1.5">
                    <div className="h-4 bg-white/10 flex items-center px-1">
                      <div className="w-2 h-2 rounded-full bg-orange"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="h-10 bg-white/5 border border-white/10"></div>
                      <div className="h-10 bg-white/5 border border-white/10"></div>
                      <div className="h-10 bg-white/5 border border-white/10"></div>
                    </div>
                    <div className="h-2 bg-white/20 w-1/2"></div>
                  </div>
                )}
                {hoveredPlatform === "shopify" && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pb-1 border-b border-white/5">
                      <div className="h-2 bg-white/30 w-1/4"></div>
                      <div className="h-2.5 bg-orange w-8"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-12 bg-white/5 flex flex-col justify-between p-1.5">
                        <div className="h-1.5 bg-white/30 w-3/4"></div>
                        <div className="h-2 bg-orange/80 w-1/3"></div>
                      </div>
                      <div className="h-12 bg-white/5 flex flex-col justify-between p-1.5">
                        <div className="h-1.5 bg-white/30 w-1/2"></div>
                        <div className="h-2 bg-white/20 w-1/2"></div>
                      </div>
                    </div>
                  </div>
                )}
                {hoveredPlatform === "wordpress" && (
                  <div className="flex space-x-2">
                    <div className="w-1/3 h-16 bg-white/5 flex flex-col justify-between p-1 border-r border-white/5">
                      <div className="h-1 bg-orange w-4/5"></div>
                      <div className="h-1 bg-white/15 w-3/5"></div>
                      <div className="h-1 bg-white/15 w-2/3"></div>
                      <div className="h-1 bg-white/15 w-1/2"></div>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 bg-white/20 w-full"></div>
                      <div className="h-2 bg-white/10 w-5/6"></div>
                      <div className="h-2 bg-white/10 w-2/3"></div>
                      <div className="h-3.5 bg-orange w-12 mt-1"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-white text-black border-t border-grey-800/10 transition-transform duration-300 overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 py-8 flex flex-col h-full justify-between">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-grey-500 uppercase mb-3">
                Our Platforms
              </p>
              <div className="flex flex-col space-y-3.5">
                {(Object.keys(PLATFORMS_DATA) as Array<keyof typeof PLATFORMS_DATA>).map((key) => {
                  const platform = PLATFORMS_DATA[key];
                  return (
                    <Link
                      key={key}
                      href={`#platform-dive`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base font-bold tracking-wide text-black hover:text-orange flex justify-between items-center group"
                    >
                      <span>{platform.name}</span>
                      <ArrowRight className="w-4 h-4 text-grey-500 group-hover:text-orange group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <hr className="border-grey-800/10" />

            <div className="flex flex-col space-y-4">
              <Link
                href="#cases"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold tracking-tight hover:text-orange transition-colors"
              >
                Cases
              </Link>
              <Link
                href="#company"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold tracking-tight hover:text-orange transition-colors"
              >
                Company
              </Link>
              <Link
                href="#insights"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold tracking-tight hover:text-orange transition-colors"
              >
                Insights
              </Link>
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold tracking-tight hover:text-orange transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="pb-12">
            <Link
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center inline-block text-xs font-bold tracking-widest uppercase bg-black text-white py-4 hover:bg-orange transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
