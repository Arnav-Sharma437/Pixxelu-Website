"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Check for accessibility settings and touch support
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    
    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    // Add CSS flag to document layout
    document.documentElement.classList.add("custom-cursor-active");

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    // GSAP quickTo is the gold standard for high-performance cursor tracking
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Hover scale effects
    const handleMouseEnter = () => {
      gsap.to(dot, { scale: 1.5, duration: 0.15 });
      gsap.to(ring, { scale: 1.8, backgroundColor: "rgba(232, 92, 43, 0.12)", borderColor: "#E85C2B", duration: 0.2 });
    };

    const handleMouseLeave = () => {
      gsap.to(dot, { scale: 1, duration: 0.15 });
      gsap.to(ring, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(232, 92, 43, 0.4)", duration: 0.2 });
    };

    const attachHoverListeners = () => {
      const interactiveElements = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    // Attach listeners initially
    attachHoverListeners();

    // Re-attach listeners when DOM updates (helpful for dynamic routes / client updates)
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      {/* Inner glowing dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-orange rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      {/* Outer tracking ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 border border-orange/45 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
    </>
  );
}
