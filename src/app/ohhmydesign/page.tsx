import OhhMyHero from "@/components/OhhMyHero";
import OhhMyServices from "@/components/OhhMyServices";
import OhhMyComparison from "@/components/OhhMyComparison";
import OhhMyTimeline from "@/components/OhhMyTimeline";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

      {/* Standard Pixxelu Navbar */}
      <div className="relative z-40">
        <Navbar />
      </div>
      
      {/* 2. The Canvas Particle Hero */}
      <OhhMyHero />
      
      {/* 3. The Services Section */}
      <OhhMyServices />
      
      {/* 4. The Us vs Them Comparison */}
      <OhhMyComparison />
      
      {/* 5. Massive Pixxelu text block just before the footer */}
      <section className="relative pt-32 pb-12 px-6 flex flex-col items-center">
        <div className="absolute top-10 left-[-10%] w-96 h-32 bg-white/40 blur-3xl rounded-[100px] pointer-events-none" />
        <div className="absolute top-40 right-10 w-64 h-24 bg-white/30 blur-2xl rounded-[100px] pointer-events-none" />

        <div className="w-full flex justify-center mt-12 mb-4 z-10">
          <h1 className="text-[15vw] font-black tracking-tighter leading-none text-white uppercase select-none drop-shadow-lg">
            PIXXELU
          </h1>
        </div>
      </section>

      {/* 6. Standard Pixxelu Footer */}
      <div className="relative z-50">
        <Footer />
      </div>
    </main>
  );
}
