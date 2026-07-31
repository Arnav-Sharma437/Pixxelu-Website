"use client";

import Link from "next/link";
import { PixxeluLogo } from "./Navbar";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16 md:py-20 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col space-y-12">
        
        {/* Top block */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo & description */}
          <div className="flex flex-col space-y-4 max-w-sm">
            <PixxeluLogo isDarkNav={true} />
            <p className="text-xs text-grey-800 leading-relaxed font-normal">
              Pixxelu is a specialized web agency crafting high-performance, responsive sites. Exclusively built on Squarespace, Wix, Shopify, and WordPress.
            </p>
          </div>

          {/* Sitemaps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col space-y-3">
              <span className="text-[9px] font-bold tracking-[0.2em] text-orange uppercase">
                Platforms
              </span>
              <Link href="#platform-dive" className="text-xs text-grey-800 hover:text-white transition-colors">
                Squarespace
              </Link>
              <Link href="#platform-dive" className="text-xs text-grey-800 hover:text-white transition-colors">
                Wix Studio
              </Link>
              <Link href="#platform-dive" className="text-xs text-grey-800 hover:text-white transition-colors">
                Shopify
              </Link>
              <Link href="#platform-dive" className="text-xs text-grey-800 hover:text-white transition-colors">
                WordPress
              </Link>
            </div>

            <div className="flex flex-col space-y-3">
              <span className="text-[9px] font-bold tracking-[0.2em] text-orange uppercase">
                Company
              </span>
              <Link href="#cases" className="text-xs text-grey-800 hover:text-white transition-colors">
                Case Studies
              </Link>
              <Link href="#company" className="text-xs text-grey-800 hover:text-white transition-colors">
                Our Method
              </Link>
              <Link href="#insights" className="text-xs text-grey-800 hover:text-white transition-colors">
                AI Pipeline
              </Link>
              <Link href="#contact" className="text-xs text-grey-800 hover:text-white transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex flex-col space-y-3 col-span-2 sm:col-span-1">
              <span className="text-[9px] font-bold tracking-[0.2em] text-orange uppercase">
                Connect
              </span>
              <Link href="#" className="text-xs text-grey-800 hover:text-white transition-colors">
                GitHub
              </Link>
              <Link href="#" className="text-xs text-grey-800 hover:text-white transition-colors">
                LinkedIn
              </Link>
              <Link href="#" className="text-xs text-grey-800 hover:text-white transition-colors">
                Twitter/X
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom block */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-grey-800 font-semibold tracking-wider uppercase">
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
