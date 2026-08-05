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

  // Generate tick marks (100, 200... up to 2000)
  const totalTicks = 20;
  const ticks = Array.from({ length: totalTicks }, (_, i) => (i + 1) * 100);

  // Calculate the shift for the ruler based on scroll percentage.
  // The ruler needs to scroll left. 
  // Let's make the ruler width 400% of the screen so it scrolls significantly.
  const rulerWidthPercent = 400; 
  const translateX = -(scrollPercent / 100) * (rulerWidthPercent - 100);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#e6eff5] border-b border-[#c2d6e6] h-[45px] flex items-center text-[10px] sm:text-xs font-mono font-bold text-[#1a1a1a] overflow-hidden select-none shadow-sm">
      
      {/* Left Logo Section */}
      <div className="flex items-center px-4 h-full bg-[#e6eff5] z-20 shrink-0 border-r border-[#c2d6e6]">
        <div className="w-5 h-5 bg-black rounded-sm mr-2 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-[2px]" />
        </div>
        <span className="tracking-widest uppercase hidden sm:inline">PIXXELU</span>
        <span className="tracking-widest uppercase sm:hidden">PXL</span>
      </div>

      {/* Timeline Ruler Section */}
      <div className="flex-1 relative h-full flex items-center overflow-hidden bg-[#e6eff5]">
        
        {/* Fixed Orange Percentage Block */}
        <div className="absolute left-0 top-0 h-full flex items-center bg-[#f85c37] text-white px-3 sm:px-4 font-black z-10 border-r border-black/20 text-xs sm:text-sm">
          {Math.round(scrollPercent)}
        </div>

        {/* Moving Ruler (Tape Measure Effect) */}
        <div 
          className="absolute inset-y-0 left-12 sm:left-16 flex items-end text-[9px] text-[#557b99] transition-transform duration-75 ease-out"
          style={{ 
            width: `${rulerWidthPercent}%`, 
            transform: `translateX(${translateX}%)` 
          }}
        >
          {ticks.map((tick) => (
            <div key={tick} className="flex-1 flex flex-col items-center justify-end h-full pb-1 border-l border-[#c2d6e6] relative">
              <span className="absolute top-1">{tick}</span>
              {/* Minor tick marks */}
              <div className="w-full flex justify-between px-1 absolute bottom-0 h-1 border-l border-[#c2d6e6]/30">
                 <div className="w-[1px] h-1.5 bg-[#c2d6e6]/50 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Live Time Section */}
      <div className="flex items-center px-4 h-full bg-[#e6eff5] z-20 shrink-0 border-l border-[#c2d6e6] text-[9px] sm:text-[10px] tracking-wider text-[#557b99]">
        <div className="w-2 h-2 rounded-full bg-[#00c853] mr-2 animate-pulse" />
        LIVE &middot; {time || "00:00:00 PM"}
      </div>

    </div>
  );
}
