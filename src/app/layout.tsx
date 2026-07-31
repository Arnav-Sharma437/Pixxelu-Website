import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import GSAPInit from "@/components/GSAPInit";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const displayFont = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-white text-black font-body select-none">
        <GSAPInit />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}



