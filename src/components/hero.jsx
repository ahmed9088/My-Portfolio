"use client";
import { motion } from "framer-motion";
import cvFile from "../assets/documents/My Resume.pdf";
import { Button } from "./ui/button";
import { Download, Github, Linkedin, Twitter, Mail, ExternalLink, Code, Palette, ArrowRight, MapPin, Clock } from "lucide-react";
import myImage from "../assets/images/ahmed.png";
import { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import Magnetic from "./ui/Magnetic";

export default function Hero() {
  const { mounted } = useTheme();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const titleWords = ["DESIGN", "DRIVEN", "ENGINEERING"];

  if (!mounted) return null;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden bg-background">
      {/* Background Depth Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <h2 className="text-[30vw] font-black tracking-tighter leading-none translate-y-20">
          SAFFAR
        </h2>
      </div>

      <div className="container px-6 relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">

          {/* Main Info */}
          <div className="flex-[1.5] w-full text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <div className="flex items-center gap-3 glass px-4 py-2 rounded-full border-primary/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Global Ops // Active</span>
              </div>
              <div className="flex items-center gap-3 opacity-40 text-[10px] font-mono tracking-widest uppercase">
                <Clock className="w-3 h-3" />
                <span>Karachi, PK // {time}</span>
              </div>
            </motion.div>

            <h1 className="text-[12vw] lg:text-[10rem] font-black mb-12 leading-[0.85] tracking-tightest uppercase flex flex-col items-center lg:items-start">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={i === 1 ? "serif italic lowercase opacity-40 pl-[10%] lg:pl-40" : ""}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <div className="flex flex-col md:flex-row items-center lg:items-end gap-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-sm font-light leading-relaxed text-center lg:text-left"
              >
                Ahmed Saffar constructs high-performance architectures where technical precision meets artistic intent.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Magnetic>
                  <Button
                    size="xl"
                    className="rounded-full px-10 py-10 text-lg font-black group bg-primary text-background hover:scale-95 transition-all"
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    DEPLOY ARCHIVE
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:rotate-[-45deg] transition-transform duration-500" />
                  </Button>
                </Magnetic>
              </motion.div>
            </div>
          </div>

          {/* Architectural Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative w-full max-w-[400px] lg:max-w-none perspective-2000"
          >
            <div className="relative aspect-[4/5] w-full max-w-[450px] mx-auto lg:ml-auto group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-primary/5 rounded-[2rem] -z-10 transition-all duration-700 group-hover:inset-0 group-hover:border-primary/20" />
              <div className="absolute -inset-8 border border-primary/5 rounded-[2rem] -z-20 transition-all duration-1000 group-hover:inset-0 group-hover:opacity-0" />

              <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-muted relative border border-white/5">
                <img
                  src={myImage}
                  alt="Ahmed Saffar"
                  className="w-full h-full object-cover grayscale brightness-90 transition-all duration-[2000ms] group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-105"
                  style={{ objectPosition: 'center 20%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
              </div>

              {/* Status Artifact */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 lg:-right-12 glass-card px-6 py-4 rounded-2xl flex items-center gap-4 border-primary/20"
              >
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40 mb-1">Status</span>
                  <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap">Architect.V2</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Side Label */}
      <div className="absolute top-1/2 -right-32 rotate-90 pointer-events-none hidden xl:block">
        <span className="text-[10px] font-mono uppercase tracking-[1em] opacity-10">
          Crafting Digital Legacies // System 001
        </span>
      </div>
    </section>
  );
}
