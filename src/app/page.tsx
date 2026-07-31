import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import PlatformDeepDive from "@/components/PlatformDeepDive";
import FeaturedOutcomes from "@/components/FeaturedOutcomes";
import Expertise from "@/components/Expertise";
import WhyAi from "@/components/WhyAi";
import Testimonials from "@/components/Testimonials";
import StatsBar from "@/components/StatsBar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <ProblemStatement />
        <PlatformDeepDive />
        <FeaturedOutcomes />
        <Expertise />
        <WhyAi />
        <Testimonials />
        <StatsBar />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

