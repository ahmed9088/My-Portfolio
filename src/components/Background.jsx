"use client";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";

export default function Background({ children }) {
  const [mounted, setMounted] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const orbSizes = useMemo(() => {
    if (typeof window === "undefined") return null;
    const width = window.innerWidth;
    if (width < 640) return { right: "w-48 h-48", left: "w-56 h-56", center: "w-64 h-64" };
    return { right: "w-80 h-80", left: "w-96 h-96", center: "w-[32rem] h-[32rem]" };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="fixed inset-0 -z-5 pointer-events-none bg-background overflow-hidden">
        <motion.div
          className={`absolute top-1/4 -right-24 ${orbSizes?.right || 'w-80 h-80'} bg-primary/10 rounded-full filter blur-[120px]`}
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute bottom-1/4 -left-24 ${orbSizes?.left || 'w-96 h-96'} bg-blue-400/10 rounded-full filter blur-[120px]`}
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${orbSizes?.center || 'w-[32rem] h-[32rem]'} bg-indigo-500/5 rounded-full filter blur-[150px]`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {children}
    </>
  );
}