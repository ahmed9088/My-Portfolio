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
  const { isDark, mounted } = useTheme();
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  if (!mounted) return null;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-background">
      <div className="container px-6 relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-start gap-20">

          {/* Main Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-[1.5] text-left"
          >
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 mb-12">
              <div className="flex items-center gap-3 glass px-5 py-2.5 rounded-full border-border/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium tracking-tight">Available for new ventures</span>
              </div>
              <div className="flex items-center gap-3 opacity-40 text-sm font-mono">
                <Clock className="w-4 h-4" />
                <span>{time} PKT</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-9xl lg:text-[10rem] font-black mb-12 leading-[0.8] tracking-tightest uppercase"
            >
              DESIGN <br />
              <span className="serif lowercase text-[0.9em] opacity-60">driven</span> <br />
              ENGINEERING
            </motion.h1>

            <div className="flex flex-col md:flex-row items-start md:items-end gap-12">
              <motion.p
                variants={itemVariants}
                className="text-2xl text-muted-foreground max-w-md font-light leading-snug"
              >
                Ahmed Saffar is a multi-disciplinary developer crafting high-performance digital signatures.
              </motion.p>

              <motion.div variants={itemVariants}>
                <Magnetic>
                  <Button
                    size="xl"
                    className="rounded-full px-10 py-10 text-xl font-bold group bg-foreground text-background hover:bg-foreground/90 transition-all shadow-2xl"
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Folklore
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:rotate-[-45deg] transition-transform duration-500" />
                  </Button>
                </Magnetic>
              </motion.div>
            </div>
          </motion.div>

          {/* Abstract Image Concept */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative w-full lg:w-auto"
          >
            <div className="relative aspect-[3/4] w-full max-w-[450px] ml-auto overflow-hidden bg-muted group">
              <img
                src={myImage}
                alt="Ahmed Saffar"
                className="w-full h-full object-cover grayscale transition-all duration-[2000ms] group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-10 left-10 text-left">
                <span className="text-xs font-mono uppercase tracking-[0.4em] opacity-40 mb-2 block">Folio // 026</span>
                <h4 className="text-3xl font-black italic serif lowercase leading-none">The Architect</h4>
              </div>
            </div>

            {/* Minimalist Floating Card */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 glass-card p-6 hidden xl:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-background font-black">AS</div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest">Ahmed Saffar</p>
                  <p className="text-[10px] opacity-40 font-mono">Creative Developer</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Boutique Signature */}
      <div className="absolute top-1/2 -right-20 rotate-90 pointer-events-none hidden 2xl:block">
        <span className="text-sm font-mono uppercase tracking-[1em] opacity-10">
          Handcrafted in Karachi // Modern Engineering
        </span>
      </div>
    </section>
  );
}
