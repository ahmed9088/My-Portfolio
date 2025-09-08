"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme, useThemeChange } from "./theme-provider";

export default function Background({ children }) {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, isDark, mounted: themeMounted } = useTheme();
  const particlesRef = useRef([]);
  const animationFrameIdRef = useRef(null);
  const lastTimeRef = useRef(0);
  const resizeTimeoutRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  // Set mounted state to prevent hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Track mouse position for interactive effects
    const handleMouseMove = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle theme changes efficiently
  const handleThemeChange = useCallback(() => {
    if (particlesRef.current.length > 0) {
      particlesRef.current.forEach(particle => particle.updateColor());
    }
  }, []);

  // Use the theme change hook to avoid re-renders
  useThemeChange(handleThemeChange);

  // Particle class with enhanced features
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.size = Math.random() * 1.5 + 0.5;
      this.baseSpeedX = (Math.random() - 0.5) * 0.3;
      this.baseSpeedY = (Math.random() - 0.5) * 0.3;
      this.speedX = this.baseSpeedX;
      this.speedY = this.baseSpeedY;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.updateColor();
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    updateColor() {
      const hue = isDark 
        ? 220 + Math.random() * 60  // Cooler blue tones for dark mode
        : 210 + Math.random() * 60;  // Warmer blue tones for light mode
      
      const saturation = isDark ? 100 : 80;
      const lightness = isDark ? 70 : 60;
      
      this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${this.opacity})`;
    }

    update() {
      // Add subtle pulsing effect
      this.pulsePhase += 0.02;
      const pulseFactor = 1 + Math.sin(this.pulsePhase) * 0.05;
      
      // Apply mouse interaction (subtle attraction/repulsion)
      const dx = this.x - mousePositionRef.current.x;
      const dy = this.y - mousePositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const force = (150 - distance) / 150 * 0.02;
        this.speedX += dx / distance * force;
        this.speedY += dy / distance * force;
      }
      
      // Apply base speed with pulse factor
      this.x += this.speedX * pulseFactor;
      this.y += this.speedY * pulseFactor;
      
      // Gradually return to base speed
      this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
      this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
      
      // Bounce off edges with some randomness
      if (this.x < 0 || this.x > window.innerWidth) {
        this.speedX *= -1;
        this.speedX += (Math.random() - 0.5) * 0.1;
      }
      if (this.y < 0 || this.y > window.innerHeight) {
        this.speedY *= -1;
        this.speedY += (Math.random() - 0.5) * 0.1;
      }
      
      // Occasionally change direction slightly
      if (Math.random() < 0.005) {
        this.baseSpeedX += (Math.random() - 0.5) * 0.1;
        this.baseSpeedY += (Math.random() - 0.5) * 0.1;
      }
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Efficient canvas setup
  const setCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  // Create particles based on device capabilities
  const createParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const screenSize = width * height;
    
    // Calculate particle count based on screen size and device capabilities
    const isMobile = width < 768;
    const isTablet = width < 1024;
    const isHighPerf = navigator.hardwareConcurrency > 4;
    
    let particleCount;
    if (isMobile) {
      particleCount = Math.floor(screenSize / 25000); // Fewer particles on mobile
    } else if (isTablet) {
      particleCount = Math.floor(screenSize / 20000);
    } else {
      particleCount = isHighPerf 
        ? Math.floor(screenSize / 15000)  // More particles on high-end devices
        : Math.floor(screenSize / 18000);
    }
    
    // Reuse existing particles when possible
    const currentCount = particlesRef.current.length;
    
    if (currentCount < particleCount) {
      // Add new particles
      for (let i = currentCount; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    } else if (currentCount > particleCount) {
      // Remove excess particles
      particlesRef.current = particlesRef.current.slice(0, particleCount);
    }
    
    // Reset all particles
    particlesRef.current.forEach(particle => particle.reset());
  }, []);

  // Optimized animation loop
  const animate = useCallback((timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    
    const deltaTime = timestamp - lastTimeRef.current;
    const targetFPS = 60;
    const interval = 1000 / targetFPS;
    
    // Throttle animation to target FPS
    if (deltaTime > interval) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas with a subtle trail effect
      ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.05)' : 'rgba(248, 250, 252, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      const particles = particlesRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Skip some connections on mobile for performance
      const skipConnections = width < 768;
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
        
        if (!skipConnections || i % 2 === 0) {
          // Draw connections between close particles
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              const opacity = (1 - distance / 120) * 0.2;
              ctx.strokeStyle = isDark 
                ? `rgba(100, 150, 255, ${opacity})`
                : `rgba(79, 70, 229, ${opacity})`;
              ctx.lineWidth = 0.3;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      
      lastTimeRef.current = timestamp - (deltaTime % interval);
    }
    
    animationFrameIdRef.current = requestAnimationFrame(animate);
  }, [isDark]);

  // Handle window resize with debounce
  const handleResize = useCallback(() => {
    clearTimeout(resizeTimeoutRef.current);
    resizeTimeoutRef.current = setTimeout(() => {
      setCanvasSize();
      createParticles();
    }, 200);
  }, [setCanvasSize, createParticles]);

  // Initialize and clean up
  useEffect(() => {
    // Don't run until both component and theme are mounted
    if (!mounted || !themeMounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setCanvasSize();
    createParticles();
    animate(0);
    
    // Add event listeners
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameIdRef.current);
      clearTimeout(resizeTimeoutRef.current);
    };
  }, [mounted, themeMounted, setCanvasSize, createParticles, animate]);

  // Calculate responsive orb sizes
  const orbSizes = useMemo(() => {
    const width = window.innerWidth;
    if (width < 640) { // sm
      return {
        right: { size: "w-48 h-48", position: "-right-16" },
        left: { size: "w-56 h-56", position: "-left-16" },
        center: { size: "w-64 h-64", position: "" }
      };
    } else if (width < 768) { // md
      return {
        right: { size: "w-56 h-56", position: "-right-16" },
        left: { size: "w-64 h-64", position: "-left-16" },
        center: { size: "w-80 h-80", position: "" }
      };
    } else if (width < 1024) { // lg
      return {
        right: { size: "w-64 h-64", position: "-right-20" },
        left: { size: "w-72 h-72", position: "-left-20" },
        center: { size: "w-96 h-96", position: "" }
      };
    } else { // xl and above
      return {
        right: { size: "w-80 h-80", position: "-right-24" },
        left: { size: "w-96 h-96", position: "-left-24" },
        center: { size: "w-[32rem] h-[32rem]", position: "" }
      };
    }
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none" 
      />
      
      {/* Gradient overlay - responsive to screen size */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        {/* Subtle gradient orbs for visual interest - adjust size based on screen */}
        <motion.div 
          className={`absolute top-1/4 ${orbSizes.right.position} ${orbSizes.right.size} bg-blue-400/10 rounded-full filter blur-3xl`}
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className={`absolute bottom-1/3 ${orbSizes.left.position} ${orbSizes.left.size} bg-purple-400/10 rounded-full filter blur-3xl`}
          animate={{
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${orbSizes.center.size} bg-indigo-400/5 rounded-full filter blur-3xl`}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      {/* Content */}
      {children}
    </>
  );
}