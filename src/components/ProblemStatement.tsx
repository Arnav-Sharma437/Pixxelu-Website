"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProblemStatement() {
  return (
    <section className="bg-white text-black py-24 md:py-32 border-b border-grey-800/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main thesis statement */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-black leading-[1.1]">
            Choosing the wrong platform costs more than a website redesign.
          </h2>
        </div>

        {/* Detailed context paragraphs in columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
          <div className="md:col-span-4 flex flex-col space-y-4">
            <h3 className="text-base font-bold tracking-wider text-orange uppercase font-display">
              The Platform Trap
            </h3>
            <p className="text-sm sm:text-base text-grey-500 font-normal leading-relaxed">
              Most digital agencies specialize in exactly one platform. If they only know WordPress, they build you a WordPress site. If they only know Webflow, everything is Webflow. As a result, companies end up fighting systems that are either overly complex for their lean operations or too limited to support their commerce scaling.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col space-y-4">
            <h3 className="text-base font-bold tracking-wider text-black uppercase font-display">
              Our Methodology
            </h3>
            <p className="text-sm sm:text-base text-grey-500 font-normal leading-relaxed">
              We operate differently. Pixxelu specializes exclusively in four major web systems: Squarespace, Wix, Shopify, and WordPress. We analyze your team's workflow, editing capabilities, API integrations, and conversion goals first. Then, and only then, we choose the engine that aligns with your operational realities.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col space-y-4 justify-between">
            <div className="space-y-4">
              <h3 className="text-base font-bold tracking-wider text-black uppercase font-display">
                Operational Freedom
              </h3>
              <p className="text-sm sm:text-base text-grey-500 font-normal leading-relaxed">
                By matching the right software backend, we ensure your marketing team can publish blogs instantly, your commerce team can manage inventory effortlessly, and your developers can integrate custom extensions without breaking core layouts.
              </p>
            </div>
            
            <div className="pt-6 md:pt-0">
              <Link
                href="#platform-dive"
                className="inline-flex items-center text-xs font-bold tracking-[0.1em] text-orange hover:text-black uppercase group transition-colors duration-300"
              >
                <span>Compare our platforms</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
