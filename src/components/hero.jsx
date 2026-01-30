"use client";
import { motion } from "framer-motion";
import cvFile from "../assets/documents/My Resume.pdf";
import { Button } from "./ui/button";
import { Download, Github, Linkedin, Twitter, Mail, ExternalLink, Code, Palette, ArrowRight } from "lucide-react";
import myImage from "../assets/images/ahmed.png";
import { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import Magnetic from "./ui/Magnetic";

export default function Hero() {
  const { isDark, mounted } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  if (!mounted) return null;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container px-6 relative z-10 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Main Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="text-primary font-medium tracking-widest uppercase text-xs">
                Based in Pakistan & Available Worldwide
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
            >
              CRAFTING <br />
              <span className="text-gradient">DIGITAL</span> <br />
              EXPERIENCES
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed"
            >
              Ahmed Saffar — A Full Stack Developer & Designer focused on building high-performance, visually-stunning web applications.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <Magnetic>
                <Button
                  size="xl"
                  className="rounded-full px-8 py-7 text-lg group bg-foreground text-background hover:scale-105 transition-transform"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start a Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Magnetic>

              <Magnetic>
                <Button
                  variant="outline"
                  size="xl"
                  className="rounded-full px-8 py-7 text-lg border-2"
                  asChild
                >
                  <a href={cvFile} download>
                    <Download className="mr-2 w-5 h-5" />
                    Archive CV
                  </a>
                </Button>
              </Magnetic>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6 justify-center lg:justify-start grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
              {[
                { icon: <Github className="w-6 h-6" />, href: "https://github.com" },
                { icon: <Linkedin className="w-6 h-6" />, href: "https://linkedin.com" },
                { icon: <Twitter className="w-6 h-6" />, href: "https://twitter.com" },
                { icon: <Mail className="w-6 h-6" />, href: "mailto:contact@example.com" },
              ].map((social, i) => (
                <Magnetic key={i}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    {social.icon}
                  </a>
                </Magnetic>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative group"
          >
            <div className="relative aspect-[4/5] max-w-[400px] mx-auto lg:ml-auto overflow-hidden rounded-[2rem] bg-muted grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src={myImage}
                alt="Ahmed Saffar"
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl">
                <p className="text-sm font-medium leading-tight">
                  “I believe in code that is as beautiful under the hood as it is on the surface.”
                </p>
              </div>
            </div>

            {/* Decor - more abstract/human than generic icons */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-primary/20 rounded-full animate-spin-slow pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Dynamic background text - human "boutique" touch */}
      <div className="absolute bottom-10 right-10 pointer-events-none select-none overflow-hidden hidden xl:block">
        <span className="text-[12rem] font-black opacity-[0.02] leading-none whitespace-nowrap">
          SAFFAR © 2026
        </span>
      </div>
    </section>
  );
}