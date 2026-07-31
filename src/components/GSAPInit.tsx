"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GSAPInit() {
  useEffect(() => {
    // Safety net: clear any orphaned triggers from a previous mount before page components load
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger calculations after everything (fonts, layout heights, images) has fully loaded
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return null;
}
