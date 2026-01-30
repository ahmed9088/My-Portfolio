"use client";
import { motion } from "framer-motion";
import { Sparkles, Code, Database, Smartphone, Palette, ArrowRight, Quote, Globe, Cpu, MapPin, Zap, Layout } from "lucide-react";
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
            className="bento-item bento-item-large group relative"
          >
            <div className="absolute top-8 right-8 text-[10px] font-mono opacity-20 group-hover:opacity-40 transition-opacity">OBJ // 001</div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8 serif italic">
              "Logic is the skeleton, aesthetics is the skin, and <span className="font-bold border-b-2 border-primary/20">intent</span> is the soul of every machine I build."
            </p>
            <div className="flex gap-4 mt-auto">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center opacity-40">
                <span className="text-[10px] font-mono font-bold">1.2s</span>
              </div>
              <div className="flex-1 h-12 rounded-full border border-border flex items-center px-4 opacity-40">
                <div className="w-full h-[1px] bg-foreground/10" />
              </div>
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
            <div className="flex justify-between items-start mb-6">
              <MapPin className="w-8 h-8 opacity-40 group-hover:text-primary transition-colors" />
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Location</span>
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">Karachi, PK</h3>
            <p className="text-muted-foreground font-light mb-8 italic">Operating globally from the heart of Sindh.</p>
            <div className="mt-auto pt-8 border-t border-border/50">
              <div className="w-full h-12 bg-foreground/5 rounded-lg flex items-center justify-center overflow-hidden relative">
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                />
                <div className="w-2 h-2 border border-primary/40 rounded-full animate-ping" />
              </div>
            </div>
          </motion.div>

          {/* Stats Block 1 */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item text-center group"
          >
            <Zap className="w-6 h-6 mx-auto mb-4 opacity-40 group-hover:text-primary transition-colors" />
            <h4 className="text-6xl font-black text-primary mb-2 tracking-tightest">03+</h4>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Years Research</p>
          </motion.div>

          {/* Stats Block 2 */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item text-center group"
          >
            <Layout className="w-6 h-6 mx-auto mb-4 opacity-40 group-hover:text-primary transition-colors" />
            <h4 className="text-6xl font-black text-primary mb-2 tracking-tightest">50+</h4>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Architectures</p>
          </motion.div>

          {/* Philosophy Block */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item bento-item-tall group bg-foreground text-background"
          >
            <Quote className="w-10 h-10 mb-8 opacity-20" />
            <p className="text-3xl font-black uppercase tracking-tightest leading-none mb-6">
              Design <br /> is the <br /> silence <br /> between <br /> the notes.
            </p>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mt-auto">Perspective // 001</p>
          </motion.div>

          {/* Decorative Artifact */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bento-item bento-item-wide"
          >
            <div className="flex items-center gap-4 mb-4">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Current Obsessions</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {['Distributed Systems', 'Generative UI', 'Type Design', 'Inertial Motion'].map(item => (
                <span key={item} className="px-3 py-1 rounded-full border border-border text-[9px] font-bold uppercase tracking-[0.2em] group-hover:border-primary/50 transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
