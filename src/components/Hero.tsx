"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeAnimId = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  const fadeVideo = (targetOpacity: number, duration: number, onComplete?: () => void) => {
    const video = videoRef.current;
    if (!video) return;
    if (fadeAnimId.current !== null) cancelAnimationFrame(fadeAnimId.current);
    const startOpacity = parseFloat(video.style.opacity || "0");
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      video.style.opacity = (startOpacity + (targetOpacity - startOpacity) * progress).toString();
      if (progress < 1) {
        fadeAnimId.current = requestAnimationFrame(animate);
      } else {
        if (onComplete) onComplete();
      }
    };
    fadeAnimId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.style.opacity = "0";

    const handleCanPlay = () => fadeVideo(0.6, 600);
    const handleTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fadeVideo(0, 500);
      }
    };
    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play().then(() => {
          fadingOutRef.current = false;
          fadeVideo(0.6, 600);
        }).catch(() => {});
      }, 100);
    };

    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      if (fadeAnimId.current !== null) cancelAnimationFrame(fadeAnimId.current);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black pt-36 pb-24 md:pb-32">

      {/* ── Full-screen background video ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover translate-y-[17%]"
          style={{ opacity: 0, transition: "none" }}
        />
        {/* Dark gradient overlay — heavier at top (nav) and bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />
      </div>

      {/* ── Hero centre content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">

        {/* Eyebrow pill */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-orange backdrop-blur-sm"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
          We Are Pixxelu
        </div>

        {/* Main headline */}
        <h1 className="font-black uppercase tracking-tight leading-[0.9] w-full text-[11vw] sm:text-[9vw] md:text-[10vw] lg:text-[11vw] flex flex-col items-center gap-1">
          <span
            className="block"
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #C0D4E8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            A Digital Agency
          </span>
          <span
            className="block"
            style={{
              background: "linear-gradient(180deg, #E0ECFF 30%, #7EA8CF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Focused on Web<span style={{ WebkitTextFillColor: "#E85C2B" }}>.</span>
          </span>
        </h1>

        {/* Sub-description */}
        <p className="mt-6 max-w-2xl text-white/60 text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide">
          We design, develop &amp; launch high-conversion websites on&nbsp;
          <span className="text-white/90 font-medium">Wix</span>,&nbsp;
          <span className="text-white/90 font-medium">Squarespace</span>,&nbsp;
          <span className="text-white/90 font-medium">WordPress</span>&nbsp;&amp;&nbsp;
          <span className="text-white/90 font-medium">Shopify</span>.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="#platform-dive"
            className="inline-flex items-center gap-3 rounded-full bg-white text-black px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] hover:bg-orange hover:text-white transition-all duration-300 hover:scale-105"
          >
            Explore Platforms
            <span className="text-base leading-none">→</span>
          </Link>
          <Link
            href="/our-portfolio"
            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
          >
            Our Portfolio
            <span className="text-base leading-none">↗</span>
          </Link>
        </div>
      </div>

      {/* ── Bottom ticker strip ── */}
      <div className="relative z-10 w-full overflow-hidden border-t border-white/5 bg-black/50 backdrop-blur-sm py-4 select-none pointer-events-none">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] w-[200%] shrink-0">
          {[0, 1].map((i) => (
            <div key={i} className="flex justify-around items-center w-1/2 shrink-0">
              {["pixxelu", "squarespace", "wix studio", "shopify", "wordpress", "seo", "digital marketing"].map((item) => (
                <span key={item} className="flex items-center gap-6 text-sm sm:text-base md:text-lg font-light tracking-[0.15em] uppercase text-white/30 px-4">
                  {item}
                  <span className="text-orange/60">&bull;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-28 md:bottom-16 right-10 hidden md:flex flex-col items-center gap-4 text-white/30 z-10 select-none">
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase [writing-mode:vertical-lr]">Scroll</span>
        <div className="w-px h-12 bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-orange"
            style={{ animation: "scroll-line 2.2s infinite ease-in-out" }}
          />
        </div>
        <style>{`
          @keyframes scroll-line {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
        `}</style>
      </div>

    </section>
  );
}
