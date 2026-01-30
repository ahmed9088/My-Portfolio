"use client";
import { motion } from "framer-motion";
import { Sparkles, Code, Database, Smartphone, Palette, ArrowRight, Quote, Globe, Cpu } from "lucide-react";
import { useTheme } from "./theme-provider";

export default function About() {
  const { mounted } = useTheme();

  if (!mounted) return null;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="about" className="py-40 relative overflow-hidden bg-background">
      <div className="container px-6 relative z-10 mx-auto max-w-7xl">
        <header className="mb-24 text-left">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] mb-6 block">01 // THE NARRATIVE</span>
          <h2 className="text-7xl md:text-9xl font-black tracking-tightest leading-none">IDENTITY</h2>
        </header>

        <div className="bento-grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">

          {/* Main Persona Block */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item bento-item-large bg-foreground text-background"
          >
            <Quote className="w-12 h-12 mb-8 opacity-20" />
            <p className="text-3xl md:text-4xl font-light leading-tight mb-8 serif italic">
              "Logic is the skeleton, aesthetics is the skin, and <span className="font-bold border-b-2 border-background/20">intent</span> is the soul of every machine I build."
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center font-mono text-xs">AS</div>
              <span className="text-sm font-mono uppercase tracking-widest opacity-60">Creative Architect</span>
            </div>
          </motion.div>

          {/* Location Block */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item bento-item-wide group"
          >
            <div className="flex justify-between items-start mb-12">
              <Globe className="w-8 h-8 opacity-40 group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Location</span>
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">Karachi, PK</h3>
            <p className="text-muted-foreground font-light">Working globally from the heart of Sindh.</p>
          </motion.div>

          {/* Research Block */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item text-center"
          >
            <h4 className="text-6xl font-black text-primary mb-2 tracking-tightest">03+</h4>
            <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-40">Years Research</p>
          </motion.div>

          {/* Deployment Block */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item text-center"
          >
            <h4 className="text-6xl font-black text-primary mb-2 tracking-tightest">50+</h4>
            <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-40">Deployments</p>
          </motion.div>

          {/* Philosophy Block */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item bento-item-wide"
          >
            <div className="flex items-center gap-4 mb-8">
              <Cpu className="w-6 h-6 text-primary" />
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Perspective</span>
            </div>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Based in Karachi, I spend my time architecting scalable systems and refining user journeys. My background in Computer Science drives my relentless pursuit of technical excellence.
            </p>
          </motion.div>

          {/* Interests/Boutique touch */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item bg-muted/50 border-none"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-40 mb-6 block">Current Obsessions</span>
            <ul className="space-y-3 font-medium text-sm">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Distributed Systems</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Generative UI</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Typographic Art</li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
