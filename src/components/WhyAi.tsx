"use client";

import { Cpu, Zap, Eye } from "lucide-react";

export default function WhyAi() {
  return (
    <section
      id="insights"
      className="bg-off-black text-white py-24 md:py-32 relative overflow-hidden border-b border-grey-800/10"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Text Column */}
        <div className="lg:col-span-6 flex flex-col space-y-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-orange uppercase">
              The Pixxelu Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-white mt-1.5 leading-tight">
              Built with AI.<br />Refined by hand.
            </h2>
            <p className="text-base text-grey-800 mt-4 max-w-xl font-normal leading-relaxed">
              We leverage advanced AI models to scaffold structure, test modules, and write clean boilerplate. This efficiency frees our engineers to focus 100% of their energy on bespoke animations, accessibility audits, and custom integrations.
            </p>
          </div>

          {/* Differentiator Points */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-none border border-orange/30 bg-orange/5 text-orange flex items-center justify-center shrink-0 mt-1">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white">
                  60% speed-to-market boost
                </h3>
                <p className="text-xs sm:text-sm text-grey-800 mt-1 leading-relaxed">
                  By automating database setups and boilerplate components, we launch highly tailored sites in weeks, not months.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-none border border-white/20 bg-white/5 text-white flex items-center justify-center shrink-0 mt-1">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white">
                  Zero-template customized code
                </h3>
                <p className="text-xs sm:text-sm text-grey-800 mt-1 leading-relaxed">
                  Every site is customized from scratch for your brand. AI assists in validating CSS architectures and checking API endpoints.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-none border border-white/20 bg-white/5 text-white flex items-center justify-center shrink-0 mt-1">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white">
                  Master designer inspections
                </h3>
                <p className="text-xs sm:text-sm text-grey-800 mt-1 leading-relaxed">
                  An AI compiles the setup, but a human designer refines typography scales, adjusts margin alignments, and secures keyboard focus paths.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Gradient Mesh Visual Column */}
        <div className="lg:col-span-6 relative w-full aspect-square max-w-[450px] mx-auto border border-white/10 p-4">
          <div className="absolute top-2 left-2 text-[8px] font-mono text-grey-800 uppercase tracking-widest z-20">
            pixxelu // interactive mesh
          </div>

          {/* Glowing Animated Mesh Container */}
          <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
            {/* Embedded styles for the mesh animation */}
            <style jsx>{`
              @keyframes mesh-pulse {
                0% { transform: scale(1) translate(0px, 0px) rotate(0deg); }
                33% { transform: scale(1.1) translate(30px, -20px) rotate(5deg); }
                66% { transform: scale(0.95) translate(-20px, 30px) rotate(-5deg); }
                100% { transform: scale(1) translate(0px, 0px) rotate(0deg); }
              }
              .mesh-glow-1 {
                animation: mesh-pulse 15s ease-in-out infinite;
              }
              .mesh-glow-2 {
                animation: mesh-pulse 18s ease-in-out infinite reverse;
              }
            `}</style>

            {/* Glowing spot 1 */}
            <div className="mesh-glow-1 absolute -top-10 -left-10 w-[250px] h-[250px] bg-orange/40 rounded-full blur-[70px] mix-blend-screen pointer-events-none" />
            {/* Glowing spot 2 */}
            <div className="mesh-glow-2 absolute -bottom-16 -right-16 w-[300px] h-[300px] bg-orange/30 rounded-full blur-[85px] mix-blend-screen pointer-events-none" />
            {/* Glowing spot 3 */}
            <div className="mesh-glow-1 absolute top-1/3 right-1/4 w-[180px] h-[180px] bg-white/10 rounded-full blur-[50px] pointer-events-none" />

            {/* Centered tech layout grid lines */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-white"></div>
              ))}
            </div>

            {/* Futuristic overlay text block */}
            <div className="relative z-10 text-center flex flex-col items-center justify-center p-6 space-y-2">
              <span className="text-[10px] font-bold tracking-[0.25em] text-orange bg-orange/10 px-3 py-1 border border-orange/20">
                AI.ENGINE_ACTIVE
              </span>
              <span className="text-xl font-bold tracking-tight font-display text-white">
                Engineered for speed.
              </span>
              <span className="text-xs text-grey-800 max-w-[220px]">
                Boilerplate automation matches with custom human inspection.
              </span>
            </div>

            {/* Corner crosshairs */}
            <div className="absolute top-3 right-3 text-[9px] text-grey-800 font-mono">+</div>
            <div className="absolute bottom-3 left-3 text-[9px] text-grey-800 font-mono">+</div>
          </div>
        </div>
      </div>
    </section>
  );
}
