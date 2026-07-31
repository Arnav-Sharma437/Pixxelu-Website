"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="bg-off-black text-white py-24 md:py-36 relative overflow-hidden border-b border-grey-800/10"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="text-[10px] font-bold tracking-[0.25em] text-orange uppercase mb-6">
          Start Your Journey
        </span>

        {/* Big display title */}
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold font-display tracking-tight text-white max-w-4xl leading-[0.95] mb-10">
          Have a project in mind? Let&apos;s talk.
        </h2>

        {/* CTA Button */}
        <div className="mb-14">
          <Link
            href="mailto:hello@pixxelu.co"
            className="inline-flex items-center justify-center text-xs font-bold tracking-[0.1em] uppercase bg-orange text-white px-9 py-5 hover:bg-orange/95 hover:scale-[1.03] transition-all duration-300 group"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Contact links */}
        <div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-3 sm:space-y-0 border-t border-white/10 pt-8 w-full max-w-xl justify-center">
          <Link
            href="mailto:hello@pixxelu.co"
            className="text-xs sm:text-sm font-semibold tracking-wider text-grey-800 hover:text-white transition-colors"
          >
            hello@pixxelu.co
          </Link>
          <span className="hidden sm:inline text-grey-800">/</span>
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-grey-800 select-all">
            +1 (555) 902-8812
          </span>
          <span className="hidden sm:inline text-grey-800">/</span>
          <Link
            href="#"
            className="text-xs sm:text-sm font-semibold tracking-wider text-grey-800 hover:text-white transition-colors"
          >
            @pixxelu
          </Link>
        </div>
      </div>
    </section>
  );
}
