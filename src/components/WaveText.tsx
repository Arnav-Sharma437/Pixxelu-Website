"use client";

import { useRef } from "react";
import { gsap } from "gsap";

interface WaveTextProps {
  text: string;
  className?: string;
}

export default function WaveText({ text, className = "" }: WaveTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (!containerRef.current) return;
    
    // Select all the letter spans inside the container
    const letters = containerRef.current.querySelectorAll(".wave-letter");
    
    // Kill any ongoing animation on these letters so it restarts cleanly
    gsap.killTweensOf(letters);
    
    // Animate up and back down
    gsap.to(letters, {
      y: -8,
      duration: 0.2,
      stagger: {
        each: 0.03,
        yoyo: true,
        repeat: 1
      },
      ease: "sine.inOut"
    });
  };

  return (
    <span 
      ref={containerRef} 
      onMouseEnter={handleMouseEnter}
      className={`inline-block cursor-pointer ${className}`}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <span 
          key={i} 
          className="wave-letter inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </span>
  );
}
