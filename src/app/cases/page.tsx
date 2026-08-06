import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import CasesGrid from "@/components/CasesGrid";
import CasesList from "@/components/CasesList";
import CasesProcessGallery from "@/components/CasesProcessGallery";
import CasesStats from "@/components/CasesStats";

export const metadata = {
  title: "Case Studies | Pixxelu",
  description: "A closer look at how we've solved platform problems for real businesses.",
};

export default function CasesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col relative z-10 w-full overflow-hidden">
        <CasesGrid />
        <CasesList />
        <CasesProcessGallery />
        <CasesStats />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
