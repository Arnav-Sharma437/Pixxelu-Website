"use client";

import { useState, useEffect } from "react";

export default function ScrollPercentage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the user has scrolled
      const totalScroll = document.documentElement.scrollTop;
      // Calculate the maximum scrollable height
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      
      // Calculate the percentage
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      
      // Format to 2 digits
      setScrollProgress(Math.min(100, Math.max(0, Math.round(scroll * 100))));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-8 right-8 z-50 mix-blend-difference pointer-events-none text-white font-mono text-sm sm:text-base font-bold tracking-widest">
      [{scrollProgress.toString().padStart(2, "0")}%]
    </div>
  );
}
