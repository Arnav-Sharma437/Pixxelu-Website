"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import { gsap } from "gsap";

export function PixxeluLogo({ isDarkNav }: { isDarkNav?: boolean }) {
  return (
    <Link href="/" className="flex flex-col items-start leading-none group">
      <span className="text-xl font-black font-display uppercase tracking-tight text-white select-none">
        <span className="text-orange">p</span>
        <span className={isDarkNav ? "text-white" : "text-white"}>ixxel</span>
        <span className="text-orange">u</span>
      </span>
      <span className="text-[6.5px] font-bold tracking-[0.25em] text-grey-500 uppercase mt-0.5 select-none">
        Digital Technology
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  // Synchronize full screen overlay animations using GSAP
  useEffect(() => {
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      // Slide overlay down
      gsap.fromTo(
        overlayRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.5, ease: "power4.out" }
      );

      // Stagger link fades
      const links = menuLinksRef.current?.querySelectorAll(".menu-item");
      if (links) {
        gsap.fromTo(
          links,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.2, ease: "power3.out" }
        );
      }
    }, overlayRef);

    return () => ctx.revert();
  }, [isOpen]);

  const closeMenu = () => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.4,
        ease: "power4.in",
        onComplete: () => setIsOpen(false),
      });
    }, overlayRef);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-transparent transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          {/* Left Side Wordmark Logo */}
          <PixxeluLogo isDarkNav={true} />

          {/* Right Side Controls */}
          <div className="flex items-center space-x-8">
            {/* Let's Talk link (underline-reveal) */}
            <Link
              href="#contact"
              className="underline-reveal text-xs font-bold tracking-[0.15em] text-white uppercase transition-colors duration-300 hidden sm:inline-block"
            >
              Let&apos;s Talk
            </Link>

            {/* Hamburger circular button */}
            <button
              onClick={() => setIsOpen(true)}
              className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Overlay Navigation Menu */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 w-full h-full bg-[#0c0c0c] text-white z-50 flex flex-col justify-between p-8 md:p-16"
        >
          {/* Top Row: Logo & Close button */}
          <div className="flex items-center justify-between w-full">
            <PixxeluLogo isDarkNav={true} />
            <button
              onClick={closeMenu}
              className="w-11 h-11 rounded-full bg-white/10 text-white border border-white/10 flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:bg-white hover:text-black cursor-pointer focus:outline-none"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          {/* Middle Row: Links layout columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full max-w-7xl mx-auto items-center flex-1">
            {/* Left Main links (md:col-span-8) */}
            <div ref={menuLinksRef} className="md:col-span-7 flex flex-col space-y-4 md:space-y-6">
              {[
                { label: "Home", href: "/" },
                { label: "Platform Matrix", href: "#platform-dive" },
                { label: "Case Studies", href: "#cases" },
                { label: "Expertise", href: "#company" },
                { label: "Contact", href: "#contact" },
              ].map((item, index) => (
                <div key={index} className="overflow-hidden py-1">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="menu-item inline-block text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight hover:text-orange transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Sub-Info columns (md:col-span-4) */}
            <div className="md:col-span-5 flex flex-col space-y-8 text-left border-l border-white/10 pl-8 md:pl-12 hidden md:block">
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] text-orange uppercase block mb-3">
                  Say Hello
                </span>
                <Link
                  href="mailto:hello@pixxelu.co"
                  className="underline-reveal text-sm font-semibold tracking-wider text-grey-800 hover:text-white transition-colors"
                >
                  hello@pixxelu.co
                </Link>
                <div className="text-sm text-grey-500 mt-2 font-medium">
                  +1 (555) 902-8812
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] text-orange uppercase block mb-3">
                  Follow Us
                </span>
                <div className="flex flex-col space-y-1 text-sm font-semibold tracking-wider text-grey-800">
                  <Link href="#" className="hover:text-white transition-colors py-0.5">GitHub</Link>
                  <Link href="#" className="hover:text-white transition-colors py-0.5">LinkedIn</Link>
                  <Link href="#" className="hover:text-white transition-colors py-0.5">Twitter / X</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Legal / AI tag */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] text-grey-800 font-semibold tracking-widest uppercase border-t border-white/10 pt-6">
            <div>
              &copy; {new Date().getFullYear()} Pixxelu Ltd. All rights reserved.
            </div>
            <div>
              Built with AI. Refined by hand.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
