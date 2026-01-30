"use client";
import { motion } from "framer-motion";
import { Calendar, GraduationCap, Briefcase, MapPin, ArrowUpRight, Code2, Building2 } from "lucide-react";
import { useTheme } from "./theme-provider";

export default function Education() {
  const { mounted } = useTheme();

  if (!mounted) return null;

  const experiences = [
    {
      period: "2024 — PRESENT",
      title: "Software Engineering Scholar",
      subtitle: "GCU Hyderabad",
      desc: "Deep-diving into theoretical foundations and core computing principles.",
      icon: <GraduationCap />,
      type: "Academic"
    },
    {
      period: "2022 — 2025",
      title: "Full-Stack Specialist",
      subtitle: "Aptech Defence",
      desc: "Architecting boutique digital interfaces using PHP, Laravel, and Flutter.",
      icon: <Code2 />,
      type: "Research"
    },
    {
      period: "2023 — 2024",
      title: "Technical Mentor",
      subtitle: "Aptech Defence",
      desc: "Mentoring software aspirants and architecting educational web solutions.",
      icon: <Building2 />,
      type: "Studio"
    },
  ];

  return (
    <section id="experience" className="py-40 relative bg-background/50 border-y border-border/50">
      <div className="container px-6 relative z-10 mx-auto max-w-7xl">
        <header className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12 text-left">
          <div>
            <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] mb-6 block">02 // THE JOURNEY</span>
            <h2 className="text-7xl md:text-9xl font-black tracking-tightest leading-none">CULTURE</h2>
          </div>
          <p className="max-w-xs text-muted-foreground text-lg font-light leading-relaxed">
            A chronological record of technical evolution and academic research.
          </p>
        </header>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative grid md:grid-cols-[1fr_2fr] gap-12 py-16 border-t border-border/50 hover:bg-muted/5 transition-colors cursor-default text-left"
            >
              <div className="flex flex-col gap-4">
                <span className="text-xs font-mono uppercase tracking-[0.5em] opacity-40">{exp.period}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary rounded-full">{exp.type}</span>
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-40 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h4 className="text-xl font-bold mb-6 opacity-60 italic serif lowercase">{exp.subtitle}</h4>
                <p className="text-2xl text-muted-foreground font-light leading-snug max-w-2xl">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-border/50 w-full" />
        </div>
      </div>
    </section>
  );
}
