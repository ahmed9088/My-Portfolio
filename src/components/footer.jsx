"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, Globe } from "lucide-react";
import { useTheme } from "./theme-provider";

export default function Footer() {
  const { mounted } = useTheme();
  if (!mounted) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-40 relative bg-background border-t border-border/50">
      <div className="container px-6 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20">

          <div className="flex-1">
            <span className="text-primary font-mono text-[10px] uppercase tracking-[0.5em] mb-8 block">Project Termination // 026</span>
            <h2 className="text-8xl md:text-9xl font-black tracking-tightest leading-none mb-12 uppercase">
              AHMED <br /> SAFFAR
            </h2>
            <div className="flex items-center gap-6 mt-12">
              <div className="flex items-center gap-3 opacity-40 text-xs font-mono uppercase tracking-widest">
                <Globe className="w-4 h-4" />
                <span>Available Globally</span>
              </div>
              <div className="h-4 w-[1px] bg-border/50" />
              <a href="mailto:memon1ahmed@gmail.com" className="text-sm font-bold border-b border-foreground/20 hover:border-foreground transition-all">
                Let's synchronize.
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-20 md:gap-40">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-30 mb-8">Navigation</p>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <li><a href="#about" className="hover:text-primary transition-colors">Identity</a></li>
                <li><a href="#projects" className="hover:text-primary transition-colors">Folklore</a></li>
                <li><a href="#experience" className="hover:text-primary transition-colors">Culture</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-30 mb-8">Social</p>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <li><a href="https://github.com/ahmed9088" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2">Github <ArrowUpRight className="w-3 h-3" /></a></li>
                <li><a href="https://www.linkedin.com/in/ahmed-saffar-memon-b26298294" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2">LinkedIn <ArrowUpRight className="w-3 h-3" /></a></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-40 pt-12 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-mono opacity-20 uppercase tracking-[0.3em] flex gap-8">
            <span>© {currentYear} Ahmed Saffar Folio</span>
            <span>Karachi, PK</span>
          </div>
          <p className="text-[10px] font-mono opacity-20 uppercase tracking-[0.3em]">
            Crafted with Engineering & Aesthetics
          </p>
        </div>
      </div>

      {/* Boutique Background Text */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none opacity-[0.02] translate-y-1/2 translate-x-1/4 hidden xl:block">
        <span className="text-[20vw] font-black leading-none uppercase tracking-tighter">FINISH</span>
      </div>
    </footer>
  );
}
