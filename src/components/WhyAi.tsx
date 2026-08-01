"use client";

import { Cpu, Zap, Eye } from "lucide-react";

export default function WhyAi() {
  return (
    <section
      id="insights"
      className="bg-transparent text-black py-24 md:py-32 relative overflow-hidden border-b border-black/5"
    >
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-orange/[0.015] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Text Column */}
        <div className="lg:col-span-6 flex flex-col space-y-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-orange uppercase">
              The Pixxelu Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-black mt-1.5 leading-tight">
              Built with AI.<br />Refined by hand.
            </h2>
            <p className="text-base text-grey-500 mt-4 max-w-xl font-normal leading-relaxed">
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
                <h3 className="text-base font-bold font-display text-black">
                  60% speed-to-market boost
                </h3>
                <p className="text-xs sm:text-sm text-grey-500 mt-1 leading-relaxed">
                  By automating database setups and boilerplate components, we launch highly tailored sites in weeks, not months.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-none border border-black/10 bg-black/5 text-black flex items-center justify-center shrink-0 mt-1">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-black">
                  Zero-template customized code
                </h3>
                <p className="text-xs sm:text-sm text-grey-500 mt-1 leading-relaxed">
                  Every site is customized from scratch for your brand. AI assists in validating CSS architectures and checking API endpoints.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-none border border-black/10 bg-black/5 text-black flex items-center justify-center shrink-0 mt-1">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-black">
                  Master designer inspections
                </h3>
                <p className="text-xs sm:text-sm text-grey-500 mt-1 leading-relaxed">
                  An AI compiles the setup, but a human designer refines typography scales, adjusts margin alignments, and secures keyboard focus paths.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Generative Visual Column */}
        <div className="lg:col-span-6 relative w-full aspect-square max-w-[450px] mx-auto border border-black/10 p-4 rounded-2xl">
          <div className="absolute top-2 left-2 text-[8px] font-mono text-grey-500 uppercase tracking-widest z-20">
            pixxelu // generative mesh active
          </div>

          {/* Glowing Animated Mesh Container */}
          <div className="w-full h-full relative overflow-hidden bg-white/40 backdrop-blur-sm border border-black/5 rounded-xl shadow-md flex items-center justify-center">
            {/* Embedded styles for the mesh animation */}
            <style jsx>{`
              @keyframes mesh-pulse {
                0% { transform: scale(1) translate(0px, 0px) rotate(0deg); }
                33% { transform: scale(1.1) translate(25px, -15px) rotate(3deg); }
                66% { transform: scale(0.95) translate(-15px, 20px) rotate(-3deg); }
                100% { transform: scale(1) translate(0px, 0px) rotate(0deg); }
              }
              @keyframes rot-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              .mesh-glow-1 {
                animation: mesh-pulse 12s ease-in-out infinite;
              }
              .mesh-glow-2 {
                animation: mesh-pulse 16s ease-in-out infinite reverse;
              }
              .grid-rot {
                animation: rot-slow 35s linear infinite;
              }
            `}</style>

            {/* Glowing spot 1 */}
            <div className="mesh-glow-1 absolute -top-12 -left-12 w-[260px] h-[260px] bg-orange/[0.08] rounded-full blur-[65px] mix-blend-multiply pointer-events-none" />
            {/* Glowing spot 2 */}
            <div className="mesh-glow-2 absolute -bottom-16 -right-16 w-[320px] h-[320px] bg-orange/[0.05] rounded-full blur-[80px] mix-blend-multiply pointer-events-none" />
            {/* Glowing spot 3 */}
            <div className="mesh-glow-1 absolute top-1/4 right-1/4 w-[200px] h-[200px] bg-black/[0.02] rounded-full blur-[60px] pointer-events-none" />

            {/* High-density grid lines & rotating tech overlays */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-[0.04] pointer-events-none">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-black"></div>
              ))}
            </div>

            {/* Generative SVG Mesh Lines Overlay */}
            <svg className="grid-rot absolute inset-0 w-full h-full opacity-30 pointer-events-none scale-110 text-black" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.3" fill="none" strokeDasharray="1, 4" />
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.3" fill="none" strokeDasharray="6, 12" />
              <circle cx="50" cy="50" r="20" stroke="#E85C2B" strokeWidth="0.5" fill="none" />
              
              {/* Connected node network */}
              <line x1="30" y1="30" x2="50" y2="20" stroke="currentColor" strokeWidth="0.3" />
              <line x1="50" y1="20" x2="70" y2="30" stroke="currentColor" strokeWidth="0.3" />
              <line x1="70" y1="30" x2="70" y2="70" stroke="currentColor" strokeWidth="0.3" />
              <line x1="70" y1="70" x2="50" y2="80" stroke="currentColor" strokeWidth="0.3" />
              <line x1="50" y1="80" x2="30" y2="70" stroke="currentColor" strokeWidth="0.3" />
              <line x1="30" y1="70" x2="30" y2="30" stroke="currentColor" strokeWidth="0.3" />
              
              <circle cx="30" cy="30" r="1.5" fill="#E85C2B" />
              <circle cx="50" cy="20" r="1.5" fill="currentColor" />
              <circle cx="70" cy="30" r="1.5" fill="#E85C2B" />
              <circle cx="70" cy="70" r="1.5" fill="currentColor" />
              <circle cx="50" cy="80" r="1.5" fill="#E85C2B" />
              <circle cx="30" cy="70" r="1.5" fill="currentColor" />
            </svg>

            {/* Centered text and state values */}
            <div className="relative z-10 text-center flex flex-col items-center justify-center p-6 space-y-2">
              <span className="text-[9px] font-bold tracking-[0.25em] text-orange bg-orange/10 px-3 py-1 border border-orange/20 rounded">
                PIXXELU_MESH.INIT
              </span>
              <span className="text-xl font-bold tracking-tight font-display text-black">
                Engineered for speed.
              </span>
              <span className="text-xs text-grey-500 max-w-[220px]">
                Boilerplate automation matches with custom human inspection.
              </span>
            </div>

            {/* Interactive Corner Crosshairs */}
            <div className="absolute top-4 right-4 text-[9px] text-grey-400 font-mono">+</div>
            <div className="absolute bottom-4 left-4 text-[9px] text-grey-400 font-mono">+</div>
            <div className="absolute top-4 left-4 text-[9px] text-grey-400 font-mono">+</div>
            <div className="absolute bottom-4 right-4 text-[9px] text-grey-400 font-mono">+</div>
          </div>
        </div>

      </div>
    </section>
  );
}
