import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Background({ children }) {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const lastX = useSpring(mouseX, springConfig);
  const lastY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (!isMobile) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile, mouseX, mouseY]);

  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none bg-background overflow-hidden">
        {/* Mouse Spotlight - Desktop only  */}
        {!isMobile && (
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-[80px] bg-primary/5 pointer-events-none"
            style={{
              x: lastX,
              y: lastY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        )}

        {/* Ambient Orbs - Reduced motion */}
        <div className="absolute top-1/4 -right-24 w-80 h-80 bg-primary/5 rounded-full filter blur-[60px]" />
        <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-blue-500/5 rounded-full filter blur-[60px]" />

        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>
      {children}
    </>
  );
}