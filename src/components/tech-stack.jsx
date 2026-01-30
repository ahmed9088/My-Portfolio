import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Magnetic from "./ui/Magnetic";
import { Code, Server, Wrench, Cpu, Layout, Boxes } from "lucide-react";

const techIcons = {
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  next: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  php: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
};

const categories = [
  {
    id: "engineering",
    name: "Architectures",
    icon: <Cpu className="w-4 h-4" />,
    skills: [
      { name: "React / Next.js", icon: techIcons.react },
      { name: "PHP / Laravel", icon: techIcons.laravel },
      { name: "TypeScript", icon: techIcons.typescript },
      { name: "Flutter", icon: techIcons.flutter },
      { name: "Python", icon: techIcons.python },
    ],
  },
  {
    id: "foundations",
    name: "Sub-Systems",
    icon: <Boxes className="w-4 h-4" />,
    skills: [
      { name: "PostgreSQL / MySQL", icon: techIcons.mysql },
      { name: "MongoDB", icon: techIcons.mongodb },
      { name: "Tailwind CSS", icon: techIcons.tailwind },
      { name: "Docker", icon: techIcons.docker },
      { name: "Git", icon: techIcons.git },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="skills" className="py-24 md:py-40 relative overflow-hidden bg-background">
      <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-7xl">
        <header className="mb-16 md:mb-24 text-left flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          <div>
            <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] mb-4 md:mb-6 block">03 // THE ENGINE</span>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tightest leading-none">ARCHIVE</h2>
          </div>
          <p className="max-w-xs text-muted-foreground text-lg font-light leading-relaxed serif italic">
            A comprehensive index of technical artifacts and sub-systems utilized in project execution.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-20">
          <div className="flex flex-col gap-12">
            {categories.map((cat) => (
              <div key={cat.id} className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-widest">{cat.name}</h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-4 glass-card group hover:bg-foreground hover:text-background transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 p-1 opacity-60 group-hover:opacity-100 group-hover:invert transition-all">
                          <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-sm font-bold tracking-tight uppercase">{skill.name}</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-20 group-hover:opacity-40 uppercase">Sys // 0{idx + 1}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block relative">
            <div className="sticky top-40 aspect-square w-full glass-card flex items-center justify-center p-20 overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
              >
                <div className="w-full h-full border-[100px] border-foreground rounded-full border-dashed" />
              </motion.div>

              <div className="text-center relative z-10">
                <Layout className="w-20 h-20 mb-8 mx-auto opacity-10" />
                <h4 className="text-4xl font-black uppercase tracking-tightest mb-4">Technical <br /> Mastery</h4>
                <p className="text-muted-foreground font-light max-w-[200px] mx-auto uppercase text-[10px] tracking-[0.5em] leading-relaxed">
                  Optimized architectures for high-performance scale.
                </p>
              </div>

              {/* Decorative dots */}
              <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-primary animate-ping" />
              <div className="absolute bottom-10 right-10 w-2 h-2 rounded-full bg-primary/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
