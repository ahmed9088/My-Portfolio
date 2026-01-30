"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useTheme } from "./theme-provider.jsx";

export default function Background({ children }) {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 300, mass: 2 };
  const lastX = useSpring(mouseX, springConfig);
  const lastY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none bg-background overflow-hidden">
        {/* Animated Mouse Spotlight */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-primary/5 pointer-events-none"
          style={{
            x: lastX,
            y: lastY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        {/* Ambient Orbs */}
        <motion.div
          className="absolute top-1/4 -right-24 w-80 h-80 bg-blue-500/5 rounded-full filter blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-24 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px]"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
      {children}
    </>
  );
}