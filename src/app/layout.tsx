import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import GSAPInit from "@/components/GSAPInit";
import CustomCursor from "@/components/CustomCursor";
import AmbientBackground from "@/components/AmbientBackground";
import "./globals.css";

const kanitFont = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pixxelu | Digital Technology Agency",
  description: "Pixxelu builds high-performance websites exclusively on Squarespace, Wix, Shopify, and WordPress. AI-native workflow, refined by master designers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kanitFont.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-transparent text-white font-body">
        <GSAPInit />
        <CustomCursor />
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}



