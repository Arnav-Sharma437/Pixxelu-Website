"use client";

import Link from "next/link";
import { PixxeluLogo } from "./Navbar";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white relative py-20 md:py-28 overflow-hidden border-t border-white/15 select-none bg-gradient-to-b from-[#0d0d0d] to-black">
      
      {/* Huge outlines wordmark in background (high-end pattern, matching hero style) */}
      <div className="absolute bottom-[-3vw] left-0 w-full overflow-hidden select-none pointer-events-none z-0 leading-none opacity-[0.04]">
        <span
          className="text-[20vw] font-black font-display uppercase tracking-[0.15em] text-center block"
          style={{
            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.35)",
            color: "transparent",
          }}
        >
          pixxelu
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col space-y-16 relative z-10">
        
        {/* Top block */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Logo & description */}
          <div className="flex flex-col space-y-4 max-w-sm">
            <PixxeluLogo isDarkNav={true} />
            <p className="text-xs text-grey-800 leading-relaxed font-normal">
              Pixxelu is a specialized web agency crafting high-performance, responsive sites. Exclusively built on Squarespace, Wix, Shopify, and WordPress.
            </p>
          </div>

          {/* Sitemaps (tightened vertical rhythm) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
            <div className="flex flex-col space-y-2">
              <span className="text-[9px] font-bold tracking-[0.25em] text-orange uppercase mb-2">
                Platforms
              </span>
              <Link href="#platform-dive" className="text-xs text-grey-800 hover:text-white transition-colors py-0.5">
                Squarespace
              </Link>
              <Link href="#platform-dive" className="text-xs text-grey-800 hover:text-white transition-colors py-0.5">
                Wix Studio
              </Link>
              <Link href="#platform-dive" className="text-xs text-grey-800 hover:text-white transition-colors py-0.5">
                Shopify
              </Link>
              <Link href="#platform-dive" className="text-xs text-grey-800 hover:text-white transition-colors py-0.5">
                WordPress
              </Link>
            </div>

            <div className="flex flex-col space-y-2">
              <span className="text-[9px] font-bold tracking-[0.25em] text-orange uppercase mb-2">
                Company
              </span>
              <Link href="#cases" className="text-xs text-grey-800 hover:text-white transition-colors py-0.5">
                Case Studies
              </Link>
              <Link href="#company" className="text-xs text-grey-800 hover:text-white transition-colors py-0.5">
                Our Method
              </Link>
              <Link href="#insights" className="text-xs text-grey-800 hover:text-white transition-colors py-0.5">
                AI Pipeline
              </Link>
              <Link href="#contact" className="text-xs text-grey-800 hover:text-white transition-colors py-0.5">
                Contact
              </Link>
            </div>

            <div className="flex flex-col space-y-2 col-span-2 sm:col-span-1">
              <span className="text-[9px] font-bold tracking-[0.25em] text-orange uppercase mb-2">
                Connect
              </span>
              <Link href="#" className="text-xs text-grey-800 hover:text-white transition-colors py-0.5">
                GitHub
              </Link>
              <Link href="#" className="text-xs text-grey-800 hover:text-white transition-colors py-0.5">
                LinkedIn
              </Link>
              <Link href="#" className="text-xs text-grey-800 hover:text-white transition-colors py-0.5">
                Twitter/X
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row (copyright + AI tag line, clean single line) */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-grey-800 font-semibold tracking-widest uppercase mt-4">
          <div>
            &copy; {currentYear} Pixxelu Ltd. All rights reserved.
          </div>
          <div className="flex items-center space-x-2">
            <span>Built with AI. Refined by hand.</span>
            <span className="w-1 h-1 bg-orange rounded-full"></span>
            <span>Vercel Deploy Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
