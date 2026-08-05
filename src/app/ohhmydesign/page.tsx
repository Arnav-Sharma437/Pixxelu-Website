import OhhMyHero from "@/components/OhhMyHero";
import OhhMyServices from "@/components/OhhMyServices";
import OhhMyComparison from "@/components/OhhMyComparison";
import ScrollPercentage from "@/components/ScrollPercentage";

export const metadata = {
  title: "Pixxelu Studio | Impossible to Ignore",
  description: "We make people stop and ask, who made that?",
};

export default function OhhMyDesignPage() {
  return (
    <main className="bg-black min-h-screen relative selection:bg-orange selection:text-black">
      <ScrollPercentage />
      <OhhMyHero />
      <OhhMyServices />
      <OhhMyComparison />
      
      {/* Simple Footer just for this page to match the vibe */}
      <footer className="bg-black text-white py-20 text-center border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight uppercase mb-8">
            So are we.
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-12">
            It&apos;s perfect light for building, so send it over.
          </p>
          <a href="mailto:hello@pixxelu.com" className="text-orange hover:text-white transition-colors font-mono tracking-widest uppercase text-sm border-b border-orange hover:border-white pb-1">
            hello@pixxelu.com
          </a>
        </div>
      </footer>
    </main>
  );
}
