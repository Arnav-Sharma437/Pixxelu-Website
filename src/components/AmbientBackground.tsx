'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom Vertex Shader
const vertexShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform float uScrollVelocity;
  uniform vec2 uMouse;
  uniform float uHoverActive;
  uniform float uRippleTime;
  uniform vec2 uRippleCenter;
  uniform float uPixelRatio;

  attribute float aSize;
  attribute vec3 aRandom;

  varying float vAlpha;

  // Simple pseudo-random hash
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // Simple 2D Noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    vec3 pos = position;

    // 1. Organic floating movement based on perlin-noise approximation
    float noiseX = noise(pos.xy * 0.15 + vec2(uTime * 0.04, uTime * 0.02 + aRandom.x)) * 2.0 - 1.0;
    float noiseY = noise(pos.yx * 0.15 + vec2(uTime * 0.03 - aRandom.y, uTime * 0.05)) * 2.0 - 1.0;
    pos.x += noiseX * 0.5;
    pos.y += noiseY * 0.5;

    // 2. Parallax vertical scroll based on Z-depth
    // Particles further back (more negative Z) move slower than particles closer to screen
    float zDepthFactor = (pos.z + 20.0) / 20.0; // scales from 0 to 1
    pos.y += uScroll * 0.25 * zDepthFactor;
    
    // Add extra scroll speed push based on velocity
    pos.y += uScrollVelocity * 1.5 * zDepthFactor * aRandom.z;

    // 3. Elastic Mouse Repulsion
    float distToMouse = distance(pos.xy, uMouse);
    if (distToMouse < 3.0 && uHoverActive > 0.5) {
      float force = (1.0 - (distToMouse / 3.0)) * 1.2;
      vec2 dir = normalize(pos.xy - uMouse);
      pos.xy += dir * force;
    }

    // 4. Click ripple expansion wave
    if (uRippleTime > 0.0 && uRippleTime < 2.5) {
      float distToRipple = distance(pos.xy, uRippleCenter);
      float rippleRadius = uRippleTime * 8.0; // shockwave speed
      float thickness = 0.8;
      if (distToRipple < rippleRadius && distToRipple > rippleRadius - thickness) {
        float rippleForce = (1.0 - abs(distToRipple - (rippleRadius - thickness / 2.0)) / (thickness / 2.0)) * 0.7;
        vec2 rippleDir = normalize(pos.xy - uRippleCenter);
        pos.xy += rippleDir * rippleForce;
      }
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuates with distance
    gl_PointSize = aSize * (350.0 / -mvPosition.z) * uPixelRatio;

    // Alpha breathing fade
    vAlpha = 0.3 + 0.7 * sin(uTime * 0.4 + aRandom.x * 6.28);
  }
`;

// Custom Fragment Shader
const fragmentShader = `
  varying float vAlpha;

  void main() {
    // Crop circular points
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Soft glowing falloff
    float glow = smoothstep(0.5, 0.05, dist);

    // Premium glowing blue color (#0055ff)
    vec3 color = vec3(0.0, 0.33, 1.0);

    gl_FragColor = vec4(color, glow * vAlpha * 0.85);
  }
`;

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    
    // Fit canvas in perspective space
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 2. Geometry creation (4000 particles)
    const particleCount = prefersReducedMotion ? 1000 : 4000;
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const randoms = new Float32Array(particleCount * 3);

    // Distribute particles in 3D box
    for (let i = 0; i < particleCount; i++) {
      // Position x: -14 to 14, y: -25 to 55 (extra height to allow scrolling), z: -20 to 0
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.3) * 80;
      positions[i * 3 + 2] = -Math.random() * 20;

      // Particle size
      sizes[i] = 0.06 + Math.random() * 0.12;

      // Custom attributes for shader noise offsets
      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

    // 3. Shader Material setup
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uScrollVelocity: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uHoverActive: { value: 0 },
      uRippleTime: { value: 999 },
      uRippleCenter: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 4. Interactive Events tracking
    let targetMouse = new THREE.Vector2(999, 999);
    let currentMouse = new THREE.Vector2(999, 999);
    let isHovering = false;

    let targetScroll = 0;
    let currentScroll = 0;
    let scrollVelocity = 0;
    let prevScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    // Convert mouse pixels to WebGL coordinate bounds
    const updateMouseCoords = (clientX: number, clientY: number) => {
      // Mouse X normalized (-1 to 1)
      const nx = (clientX / window.innerWidth) * 2 - 1;
      // Mouse Y normalized (1 to -1)
      const ny = -(clientY / window.innerHeight) * 2 + 1;

      // Unproject mouse coordinates into WebGL flat plane coordinate limits (approx 12x8 at Z=0)
      targetMouse.x = nx * 14;
      targetMouse.y = ny * 9;
    };

    const onMouseMove = (e: MouseEvent) => {
      isHovering = true;
      updateMouseCoords(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isHovering = true;
        updateMouseCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseLeave = () => {
      isHovering = false;
      targetMouse.set(999, 999);
    };

    // Click Ripple shockwave activation
    const onClick = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;

      uniforms.uRippleCenter.value.set(nx * 14, ny * 9);
      uniforms.uRippleTime.value = 0;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('click', onClick);

    // Scroll tracker
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      targetScroll = currentScrollY * 0.05; // speed factor
      
      const deltaScroll = currentScrollY - prevScrollY;
      scrollVelocity = deltaScroll;
      prevScrollY = currentScrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Handle viewport resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };
    window.addEventListener('resize', onResize);

    // 5. Render/Animation loop
    let clock = new THREE.Clock();
    let animationId: number;

    const tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smoothly lerp mouse coordinate updates (elastic magnet effect)
        currentMouse.lerp(targetMouse, 0.06);
        uniforms.uMouse.value.copy(currentMouse);
        uniforms.uHoverActive.value = isHovering ? 1.0 : 0.0;

        // Smoothly lerp scroll values
        currentScroll = THREE.MathUtils.lerp(currentScroll, targetScroll, 0.08);
        uniforms.uScroll.value = currentScroll;

        // Decelerate scroll velocity representation
        scrollVelocity = THREE.MathUtils.lerp(scrollVelocity, 0, 0.1);
        uniforms.uScrollVelocity.value = scrollVelocity;

        // Increment time uniform
        uniforms.uTime.value = elapsed;

        // Increment ripple wave time
        if (uniforms.uRippleTime.value < 3.0) {
          uniforms.uRippleTime.value += delta;
        }
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(tick);
    };

    tick();

    // 6. Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1, // Sits at the bottom of the stack, behind transparent body & sections
        pointerEvents: 'none',
        background: '#ffffff',
      }}
    />
  );
}
