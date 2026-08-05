"use client";

import { useState, useEffect } from "react";

export default function OhhMyTimeline() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [time, setTime] = useState("");

  // Track Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const percent = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      setScrollPercent(percent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track Time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate tick marks (100, 200... up to 2000 for visual effect)
  const ticks = Array.from({ length: 20 }, (_, i) => (i + 1) * 100);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#e3f0fa] border-b border-black/10 h-10 flex items-center text-xs font-mono font-bold text-black overflow-hidden select-none">
      
      {/* Left Logo Section */}
      <div className="flex items-center px-4 border-r border-black/10 h-full bg-[#e3f0fa] z-10 shrink-0">
        <div className="w-5 h-5 bg-black rounded-md mr-2 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-white rounded-sm" />
        </div>
        <span className="tracking-widest uppercase">PIXXELU</span>
      </div>

      {/* Timeline Ruler Section */}
      <div className="flex-1 relative h-full flex items-center overflow-hidden">
        
        {/* The moving orange block that tracks percentage */}
        {/* We use a CSS transform based on scrollPercent. At 0%, it's left:0. At 100%, it's left: 100% minus its own width. */}
        <div 
          className="absolute h-full flex items-center bg-[#f85c37] text-white px-3 font-bold transition-all duration-75 ease-out z-10 border-r border-l border-black/20"
          style={{ left: `calc(${scrollPercent}% - (${scrollPercent} * 48px / 100))` }} 
        >
          {Math.round(scrollPercent)}
        </div>

        {/* The tick marks */}
        <div className="absolute inset-0 flex items-end w-[200vw] text-[10px] text-black/40">
          {ticks.map((tick) => (
            <div key={tick} className="flex-1 flex flex-col items-center justify-end h-full pb-1 border-l border-black/10 relative">
              <span className="absolute top-1">{tick}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Live Time Section */}
      <div className="flex items-center px-4 border-l border-black/10 h-full bg-[#e3f0fa] z-10 shrink-0 text-[10px] tracking-wider">
        <div className="w-2 h-2 rounded-full bg-[#00c853] mr-2 animate-pulse" />
        LIVE &middot; {time || "00:00:00 PM"}
      </div>

    </div>
  );
}
