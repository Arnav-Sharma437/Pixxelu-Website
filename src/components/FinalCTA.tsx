"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for CTA elements
      gsap.fromTo(
        ".cta-animate",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="bg-off-black text-white py-24 md:py-32 relative overflow-hidden border-b border-white/5"
    >
      {/* Dynamic drifting background glows */}
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-orange/5 rounded-full blur-[130px] pointer-events-none animate-[pulse_10s_infinite_ease-in-out]" />
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-white/5 rounded-full blur-[110px] pointer-events-none animate-[pulse_15s_infinite_ease-in-out_2s]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: CTA & Quick Contact */}
          <div className="lg:col-span-6 flex flex-col space-y-8 text-left">
            <div className="space-y-4">
              <span className="cta-animate text-[10px] font-bold tracking-[0.25em] text-orange uppercase block">
                Start Your Journey
              </span>
              <h2 className="cta-animate text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white leading-[1.05] max-w-lg">
                Have a project in mind? Let&apos;s talk.
              </h2>
            </div>

            {/* Quick Contact info links cards */}
            <div className="cta-animate flex flex-col space-y-4 max-w-md pt-2">
              
              {/* Phone item */}
              <Link
                href="tel:+919218000707"
                className="flex items-center space-x-4 bg-white/[0.02] border border-white/10 hover:border-orange/30 p-4 rounded-xl transition-all duration-300 hover:bg-white/[0.04] group"
              >
                <div className="w-10 h-10 rounded-lg bg-orange/5 text-orange flex items-center justify-center shrink-0 group-hover:bg-orange group-hover:text-white transition-all duration-300">
                  <Phone className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-grey-800 tracking-wider uppercase block">Phone Support</span>
                  <span className="text-sm sm:text-base font-semibold tracking-wide text-white font-mono mt-0.5 block select-all">
                    +91 92180 00707
                  </span>
                </div>
              </Link>

              {/* Email item */}
              <Link
                href="mailto:info@pixxelu.com"
                className="flex items-center space-x-4 bg-white/[0.02] border border-white/10 hover:border-orange/30 p-4 rounded-xl transition-all duration-300 hover:bg-white/[0.04] group"
              >
                <div className="w-10 h-10 rounded-lg bg-orange/5 text-orange flex items-center justify-center shrink-0 group-hover:bg-orange group-hover:text-white transition-all duration-300">
                  <Mail className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-grey-800 tracking-wider uppercase block">Email Inquiries</span>
                  <span className="text-sm sm:text-base font-semibold tracking-wide text-white mt-0.5 block select-all">
                    info@pixxelu.com
                  </span>
                </div>
              </Link>

            </div>

            {/* Main Interactive CTA Button */}
            <div className="cta-animate pt-4">
              <Link
                href="mailto:info@pixxelu.com"
                className="inline-flex items-center justify-center text-xs font-bold tracking-[0.15em] uppercase bg-orange text-white px-9 py-5 rounded-full hover:bg-orange/95 hover:scale-[1.03] transition-all duration-300 group"
              >
                <span>Say hello to start a live chat!</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Detailed Contact Information (India, Australia, USA Offices) */}
          <div className="lg:col-span-6 w-full flex flex-col space-y-6 text-left border-t lg:border-t-0 lg:border-l border-white/10 pt-12 lg:pt-0 lg:pl-12">
            <div className="space-y-2 mb-2 cta-animate">
              <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-white">
                Contact Information
              </h3>
              <p className="text-xs text-grey-800 font-normal leading-relaxed">
                Connect with our teams globally across regional offices.
              </p>
            </div>

            {/* Office Locations Address Stack */}
            <div className="cta-animate flex flex-col space-y-4 w-full">
              
              {/* India Card */}
              <div className="flex items-start space-x-4 bg-white/[0.02] border border-white/10 hover:border-orange/20 p-5 rounded-xl transition-all duration-300 hover:bg-white/[0.04] group">
                <span className="text-2xl shrink-0 leading-none select-none" role="img" aria-label="India flag">
                  🇮🇳
                </span>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-orange tracking-wider uppercase block">India Head Office</span>
                  <p className="text-xs sm:text-sm text-grey-800 group-hover:text-white transition-colors duration-300 leading-relaxed font-normal select-all">
                    Building 256, Kachari Adda, near Patrol Pump,<br />
                    Dharamshala, Himachal Pradesh 176215
                  </p>
                </div>
              </div>

              {/* Australia Card */}
              <div className="flex items-start space-x-4 bg-white/[0.02] border border-white/10 hover:border-orange/20 p-5 rounded-xl transition-all duration-300 hover:bg-white/[0.04] group">
                <span className="text-2xl shrink-0 leading-none select-none" role="img" aria-label="Australia flag">
                  🇦🇺
                </span>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-grey-800 tracking-wider uppercase block group-hover:text-white transition-colors duration-300">Australia Office</span>
                  <p className="text-xs sm:text-sm text-grey-800 group-hover:text-white transition-colors duration-300 leading-relaxed font-normal select-all">
                    52 Degree Group 100 Barangaroo Avenue<br />
                    Sydney NSW 2000 Australia
                  </p>
                </div>
              </div>

              {/* USA Card */}
              <div className="flex items-start space-x-4 bg-white/[0.02] border border-white/10 hover:border-orange/20 p-5 rounded-xl transition-all duration-300 hover:bg-white/[0.04] group">
                <span className="text-2xl shrink-0 leading-none select-none" role="img" aria-label="United States flag">
                  🇺🇸
                </span>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-grey-800 tracking-wider uppercase block group-hover:text-white transition-colors duration-300">United States Office</span>
                  <p className="text-xs sm:text-sm text-grey-800 group-hover:text-white transition-colors duration-300 leading-relaxed font-normal select-all">
                    52 Degree Group 17 State Street<br />
                    New York, NY 10004 United States
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
