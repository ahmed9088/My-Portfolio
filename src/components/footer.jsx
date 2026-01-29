"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useTheme } from "./theme-provider";

export default function Footer() {
  const { mounted } = useTheme();
  if (!mounted) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 border-t border-border mt-32">
      <div className="container px-6 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">

          <div className="text-left">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">Ahmed Saffar</h2>
            <p className="text-muted-foreground font-light max-w-xs">
              Building the future of the web, one pixel at a time. Crafted with passion in Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-6 font-mono">Social</p>
              <ul className="space-y-4 font-bold uppercase tracking-tight">
                <li><a href="https://github.com/ahmed9088" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2">Github <ArrowUpRight className="w-3 h-3" /></a></li>
                <li><a href="https://www.linkedin.com/in/ahmed-saffar-memon-b26298294" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2">LinkedIn <ArrowUpRight className="w-3 h-3" /></a></li>
              </ul>
            </div>

            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-6 font-mono">Links</p>
              <ul className="space-y-4 font-bold uppercase tracking-tight">
                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] opacity-30">
          <p>© {currentYear} ALL RIGHTS RESERVED</p>
          <p>DESIGNED & DEVELOPED BY AHMED SAFFAR</p>
        </div>
      </div>
    </footer>
  );
}