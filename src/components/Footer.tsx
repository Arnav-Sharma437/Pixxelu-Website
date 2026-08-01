"use client";

import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white relative pt-24 pb-48 md:pb-[24vw] overflow-hidden border-t border-white/15 select-none bg-gradient-to-b from-[#0d0d0d] to-black">
      
      {/* Huge solid-fill horizontal wordmark in background (matching Baunfire style, fully visible) */}
      <div className="absolute bottom-4 md:bottom-8 left-0 w-full overflow-hidden select-none pointer-events-none z-0 leading-none text-center">
        <span
          className="text-[20vw] font-black font-display uppercase tracking-[0.05em] text-white/[0.035] inline-block"
        >
          pixxelu
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col space-y-16 relative z-10">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Column 1: Clean Sitemaps (Services, Cases, etc.) */}
          <div className="lg:col-span-3 flex flex-col space-y-3 text-left">
            {[
              { label: "Platform Matrix", href: "#platform-dive" },
              { label: "Case Studies", href: "#cases" },
              { label: "Our Method", href: "#company" },
              { label: "AI Pipeline", href: "#insights" },
              { label: "Contact Us", href: "#contact" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-xl md:text-2xl font-bold font-display tracking-tight text-grey-800 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 2: Square Social Tiles */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-3 gap-3 max-w-[170px]">
              
              {/* LinkedIn */}
              <Link
                href="#"
                className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 hover:border-orange hover:bg-orange text-white flex items-center justify-center transition-all duration-300 group"
              >
                <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>

              {/* Website / Globe */}
              <Link
                href="#"
                className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 hover:border-orange hover:bg-orange text-white flex items-center justify-center transition-all duration-300 group"
              >
                <Globe className="w-5 h-5 transition-transform group-hover:scale-105" />
              </Link>

              {/* Instagram */}
              <Link
                href="#"
                className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 hover:border-orange hover:bg-orange text-white flex items-center justify-center transition-all duration-300 group"
              >
                <svg className="w-5 h-5 stroke-current fill-none stroke-[2] transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
                </svg>
              </Link>

              {/* GitHub */}
              <Link
                href="#"
                className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 hover:border-orange hover:bg-orange text-white flex items-center justify-center transition-all duration-300 group"
              >
                <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>

              {/* Facebook */}
              <Link
                href="#"
                className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 hover:border-orange hover:bg-orange text-white flex items-center justify-center transition-all duration-300 group"
              >
                <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </Link>

              {/* Twitter / X */}
              <Link
                href="#"
                className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 hover:border-orange hover:bg-orange text-white flex items-center justify-center transition-all duration-300 group"
              >
                <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>

            </div>
          </div>

          {/* Column 3: Global Offices (Matching Estonia/Switzerland/USA layout from screenshot) */}
          <div className="lg:col-span-6 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* India Card */}
              <Link
                href="mailto:info@pixxelu.com"
                className="bg-white/5 border border-white/10 hover:border-orange hover:bg-white/10 p-5 rounded-xl flex items-center justify-between transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl leading-none select-none">🇮🇳</span>
                  <div>
                    <span className="text-xs font-bold text-white uppercase block">India</span>
                    <span className="text-[10px] text-grey-800 tracking-wider block mt-0.5 uppercase">Dharamshala</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-grey-800 group-hover:text-orange group-hover:translate-x-1 transition-all" />
              </Link>

              {/* Australia Card */}
              <Link
                href="mailto:info@pixxelu.com"
                className="bg-white/5 border border-white/10 hover:border-orange hover:bg-white/10 p-5 rounded-xl flex items-center justify-between transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl leading-none select-none">🇦🇺</span>
                  <div>
                    <span className="text-xs font-bold text-white uppercase block">Australia</span>
                    <span className="text-[10px] text-grey-800 tracking-wider block mt-0.5 uppercase">Sydney</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-grey-800 group-hover:text-orange group-hover:translate-x-1 transition-all" />
              </Link>

              {/* USA Card (Col-span 2) */}
              <Link
                href="mailto:info@pixxelu.com"
                className="sm:col-span-2 bg-white/5 border border-white/10 hover:border-orange hover:bg-white/10 p-5 rounded-xl flex items-center justify-between transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl leading-none select-none">🇺🇸</span>
                  <div>
                    <span className="text-xs font-bold text-white uppercase block">United States</span>
                    <span className="text-[10px] text-grey-800 tracking-wider block mt-0.5 uppercase">New York</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-grey-800 group-hover:text-orange group-hover:translate-x-1 transition-all" />
              </Link>

            </div>
          </div>

        </div>

        {/* Middle Row (Copyright + Link policies) */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-grey-800 font-bold tracking-widest uppercase relative z-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center sm:justify-start">
            <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
            <span className="text-white/10">/</span>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-white/10">/</span>
            <Link href="#" className="hover:text-white transition-colors">Cookies Policy</Link>
          </div>
          <div>
            PIXXELU &copy; {currentYear}
          </div>
        </div>

        {/* Bottom Row: Monochrome Trust Badges / Certifications (matching reference) */}
        <div className="border-t border-white/5 pt-8 grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-40 hover:opacity-75 transition-opacity duration-300 pb-4 relative z-10">
          
          {/* Badge 1: Wix Certified */}
          <div className="flex flex-col items-center text-center">
            <svg className="w-10 h-10 text-white stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <circle cx="12" cy="11" r="3" />
            </svg>
            <span className="text-[8px] font-bold tracking-widest uppercase mt-2 text-white">Wix Certified</span>
          </div>

          {/* Badge 2: Circle Member */}
          <div className="flex flex-col items-center text-center">
            <svg className="w-10 h-10 text-white stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
            <span className="text-[8px] font-bold tracking-widest uppercase mt-2 text-white">Circle Member</span>
          </div>

          {/* Badge 3: Shopify Partner */}
          <div className="flex flex-col items-center text-center">
            <svg className="w-10 h-10 text-white stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 17V7l6 5-6 5z" />
            </svg>
            <span className="text-[8px] font-bold tracking-widest uppercase mt-2 text-white">Shopify Partner</span>
          </div>

          {/* Badge 4: WP VIP Special */}
          <div className="flex flex-col items-center text-center col-span-2 md:col-span-1">
            <span className="font-display font-black text-lg tracking-tighter text-white">WP.VIP</span>
            <span className="text-[8px] font-bold tracking-widest uppercase mt-2.5 text-white">VIP Specialist</span>
          </div>

          {/* Badge 5: Clutch Rated */}
          <div className="flex flex-col items-center text-center col-span-2 md:col-span-1">
            <div className="flex items-center space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
                </svg>
              ))}
            </div>
            <span className="text-[8px] font-bold tracking-widest uppercase mt-3.5 text-white">Clutch 5.0 Rated</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
