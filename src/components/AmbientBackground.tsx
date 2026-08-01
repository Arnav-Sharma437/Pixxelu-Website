'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom Vertex Shader for Google Antigravity-style infinite flight
const vertexShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform float uScrollVelocity;
  uniform vec2 uMouse;
  uniform float uHoverActive;
  uniform float uPixelRatio;

  attribute float aSize;
  attribute vec3 aRandom;

  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // 1. Organic slow drift
    pos.x += sin(uTime * 0.15 + aRandom.x * 6.28) * 0.25;
    pos.y += cos(uTime * 0.1 + aRandom.y * 6.28) * 0.25;

    // 2. Scroll-driven Z-axis flight
    // pos.z ranges from -50.0 to 10.0. Camera is at Z = 15.
    // Scroll down moves camera forward (moves particles closer to camera)
    float zOffset = uScroll * 1.4 + uScrollVelocity * 0.4 * aRandom.z;
    pos.z += zOffset;

    // Infinite Z wrapping loop
    float zRange = 60.0; // from -50.0 to 10.0
    float zMin = -50.0;
    pos.z = zMin + mod(pos.z - zMin, zRange);

    // 3. Scroll-driven spiraling rotation based on Z depth
    float zDepthFactor = (pos.z + 50.0) / 60.0; // 0 (far) to 1 (near)
    float angle = uScroll * 0.02 * zDepthFactor; // twist increases closer to screen
    float s = sin(angle);
    float c = cos(angle);
    vec2 rotated = vec2(
      pos.x * c - pos.y * s,
      pos.x * s + pos.y * c
    );
    pos.xy = rotated;

    // 4. Mouse repulsion on the XY plane
    float distToMouse = distance(pos.xy, uMouse);
    if (distToMouse < 4.5 && uHoverActive > 0.5) {
      float force = (1.0 - (distToMouse / 4.5)) * 1.6;
      vec2 dir = normalize(pos.xy - uMouse);
      // scale force slightly based on proximity to screen (Z-parallax)
      pos.xy += dir * force * zDepthFactor;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Perspective point size scale
    gl_PointSize = aSize * (450.0 / -mvPosition.z) * uPixelRatio;

    // Smooth fade near clip planes (Z=10 and Z=-50) to prevent popping
    float fadeNear = smoothstep(10.0, 5.0, pos.z);
    float fadeFar = smoothstep(-50.0, -42.0, pos.z);
    
    vAlpha = fadeNear * fadeFar * (0.2 + 0.8 * sin(uTime * 0.5 + aRandom.x * 6.28));
  }
`;

// Custom Fragment Shader
const fragmentShader = `
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Soft circle glow profile
    float glow = smoothstep(0.5, 0.05, dist);

    // Deep royal blue particle color (#0055ff)
    vec3 color = vec3(0.0, 0.35, 1.0);

    gl_FragColor = vec4(color, glow * vAlpha * 0.85);
  }
`;

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 2. Particle Attributes creation (6000 particles)
    const particleCount = prefersReducedMotion ? 1200 : 6000;
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const randoms = new Float32Array(particleCount * 3);

    // Distribute particles inside a 3D cylindrical tunnel
    for (let i = 0; i < particleCount; i++) {
      // Cylinder radius 12.0
      const radius = Math.random() * 12.0;
      const theta = Math.random() * Math.PI * 2;
      
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      // Z depth spans from -50.0 to 10.0
      positions[i * 3 + 2] = -50.0 + Math.random() * 60.0;

      // Attenuated particle size
      sizes[i] = 0.05 + Math.random() * 0.15;

      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

    // 3. Shader Material configuration
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uScrollVelocity: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uHoverActive: { value: 0 },
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

    // 4. Interactive Events Tracking
    let targetMouse = new THREE.Vector2(999, 999);
    let currentMouse = new THREE.Vector2(999, 999);
    let isHovering = false;

    let targetScroll = 0;
    let currentScroll = 0;
    let scrollVelocity = 0;
    let prevScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    let cameraTargetRotation = new THREE.Vector2(0, 0);
    let cameraCurrentRotation = new THREE.Vector2(0, 0);

    const updateMouseCoords = (clientX: number, clientY: number) => {
      const nx = (clientX / window.innerWidth) * 2 - 1;
      const ny = -(clientY / window.innerHeight) * 2 + 1;

      // Project mouse on XY plane at Z=0
      targetMouse.x = nx * 14;
      targetMouse.y = ny * 9;

      // Camera tilt parallax target (yaw/pitch)
      cameraTargetRotation.x = nx * 0.12; // Yaw rotation limit
      cameraTargetRotation.y = ny * 0.08; // Pitch rotation limit
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
      cameraTargetRotation.set(0, 0);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      targetScroll = currentScrollY * 0.035; // velocity scaling factor
      
      const deltaScroll = currentScrollY - prevScrollY;
      scrollVelocity = deltaScroll;
      prevScrollY = currentScrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };
    window.addEventListener('resize', onResize);

    // 5. High Performance Render loop
    let clock = new THREE.Clock();
    let animationId: number;

    const tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Elastic mouse tracking
        currentMouse.lerp(targetMouse, 0.05);
        uniforms.uMouse.value.copy(currentMouse);
        uniforms.uHoverActive.value = isHovering ? 1.0 : 0.0;

        // Camera tilt yaw/pitch rotation (creates stunning 3D parallax layout depth)
        cameraCurrentRotation.lerp(cameraTargetRotation, 0.05);
        camera.rotation.y = cameraCurrentRotation.x;
        camera.rotation.x = -cameraCurrentRotation.y;

        // Scroll mapping updates
        currentScroll = THREE.MathUtils.lerp(currentScroll, targetScroll, 0.07);
        uniforms.uScroll.value = currentScroll;

        // Scroll velocity decay
        scrollVelocity = THREE.MathUtils.lerp(scrollVelocity, 0, 0.08);
        uniforms.uScrollVelocity.value = scrollVelocity;

        // Time updates
        uniforms.uTime.value = elapsed;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(tick);
    };

    tick();

    // 6. Component unmount cleanups
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseleave', onMouseLeave);
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
        zIndex: -1,
        pointerEvents: 'none',
        background: '#ffffff',
      }}
    />
  );
}
