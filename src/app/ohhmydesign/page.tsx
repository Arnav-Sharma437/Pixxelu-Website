import OhhMyHero from "@/components/OhhMyHero";
import OhhMyServices from "@/components/OhhMyServices";
import OhhMyComparison from "@/components/OhhMyComparison";
import OhhMyTimeline from "@/components/OhhMyTimeline";
import WaveText from "@/components/WaveText";

export const metadata = {
  title: "OhhMyDesign Clone | Pixxelu Studio",
  description: "Impossible to Ignore.",
};

export default function OhhMyDesignPage() {
  return (
    // Base layout mimicking the sky-blue gradient of the reference site
    <main className="bg-gradient-to-b from-[#56a5e2] to-[#80c3f0] min-h-screen relative selection:bg-[#f85c37] selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. The Sticky Ruler Timeline */}
      <OhhMyTimeline />
      
      {/* 2. The Canvas Particle Hero */}
      <OhhMyHero />
      
      {/* 3. The Services Section */}
      <OhhMyServices />
      
      {/* 4. The Us vs Them Comparison */}
      <OhhMyComparison />
      
      {/* 5. The Exact Footer Recreation */}
      <footer className="relative pt-32 pb-12 px-6 flex flex-col items-center border-t border-white/20 mt-20">
        
        {/* Some decorative clouds */}
        <div className="absolute top-10 left-[-10%] w-96 h-32 bg-white/40 blur-3xl rounded-[100px] pointer-events-none" />
        <div className="absolute top-40 right-10 w-64 h-24 bg-white/30 blur-2xl rounded-[100px] pointer-events-none" />

        <div className="text-center z-10 w-full max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#1a1a1a] mb-2 cursor-pointer">
              <WaveText text="THIS BUTTON DOES" />
              <br />
              <WaveText text="ABSOLUTELY" /> <span className="text-[#f85c37]">NOTHING</span>
            </h2>
            <div className="mt-4 bg-[#f85c37] text-white px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider cursor-pointer hover:scale-105 transition-transform shadow-md">
              Try It
            </div>
          </div>
          
          <div className="mt-24 mb-16 flex flex-col md:flex-row justify-between items-center w-full border-b border-black/10 pb-8 gap-8">
            <a href="mailto:hello@pixxelu.com" className="text-2xl md:text-4xl font-black text-[#1a1a1a] hover:text-[#f85c37] transition-colors cursor-pointer">
              hello@pixxelu.com <span className="text-[#f85c37]">&nearr;</span>
            </a>
            
            <div className="flex gap-4">
              <span className="bg-[#f85c37] text-white px-4 py-2 rounded-full font-bold uppercase text-xs tracking-wider">
                Book a call
              </span>
              <span className="border border-black/20 text-[#1a1a1a] px-4 py-2 rounded-full font-bold uppercase text-xs tracking-wider hover:bg-white/50 transition-colors">
                Show us the idea
              </span>
            </div>
          </div>
          
          {/* Huge Logo at the bottom */}
          <div className="w-full flex justify-center mt-12 mb-4">
            <h1 className="text-[12vw] font-black tracking-tighter leading-none text-[#1a1a1a] uppercase select-none">
              <span className="text-[#f85c37]">O</span>hh<span className="text-[#f85c37]">M</span>yDesign
            </h1>
          </div>
        </div>
      </footer>
    </main>
  );
}
