import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorState, setCursorState] = useState("default"); // default, hover, project, drag
  const [cursorLabel, setCursorLabel] = useState("");

  const springConfig = { damping: 30, stiffness: 500, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if it's a touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const projectCard = target.closest("[data-cursor='project']");
      const interactive = target.closest("button, a, [role='button']");
      const dragArea = target.closest("[data-cursor='drag']");

      if (projectCard) {
        setCursorState("project");
        setCursorLabel("VIEW");
      } else if (dragArea) {
        setCursorState("drag");
        setCursorLabel("DRAG");
      } else if (interactive) {
        setCursorState("hover");
        setCursorLabel("");
      } else {
        setCursorState("default");
        setCursorLabel("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          width: cursorState === "project" || cursorState === "drag" ? 80 : cursorState === "hover" ? 40 : 12,
          height: cursorState === "project" || cursorState === "drag" ? 80 : cursorState === "hover" ? 40 : 12,
          backgroundColor: cursorState === "default" ? "var(--primary)" : "transparent",
          border: cursorState === "default" ? "none" : "1px solid var(--primary)",
        }}
        className="rounded-full flex items-center justify-center overflow-hidden"
      >
        <AnimatePresence>
          {cursorLabel && (
            <motion.span
              key={cursorLabel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[10px] font-black uppercase tracking-widest text-primary"
            >
              {cursorLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
