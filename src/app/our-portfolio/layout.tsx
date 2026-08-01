import type { Metadata } from "next";
import { Kanit } from "next/font/google";

const kanitFont = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Jack -- 3D Creator",
  description: "Portfolio of Jack -- 3D Creator driven by crafting striking and unforgettable projects.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${kanitFont.variable} font-kanit min-h-screen bg-[#0C0C0C] text-[#D7E2EA] antialiased`}>
      {children}
    </div>
  );
}
