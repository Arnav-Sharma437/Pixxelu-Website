'use client';

import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Slow-drifting soft radial gradient blobs in orange tones, extremely low opacity (0.015 - 0.02)
      const blobs = [
        { x: canvas.width * 0.15, y: canvas.height * 0.25, r: 500, color: 'rgba(232,92,43,0.02)' },
        { x: canvas.width * 0.85, y: canvas.height * 0.7, r: 600, color: 'rgba(232,92,43,0.015)' },
      ];

      blobs.forEach((b, i) => {
        const offsetX = Math.sin(time * 0.00025 + i) * 80;
        const offsetY = Math.cos(time * 0.00015 + i) * 80;
        const gradient = ctx.createRadialGradient(
          b.x + offsetX, b.y + offsetY, 0,
          b.x + offsetX, b.y + offsetY, b.r
        );
        gradient.addColorStop(0, b.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      if (!prefersReducedMotion) {
        time += 16;
        animationId = requestAnimationFrame(draw);
      }
    }
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
      }}
    />
  );
}
