"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin, GraduationCap, Building2, Code2 } from "lucide-react";
import { useTheme } from "./theme-provider";

const timelineItems = [
  {
    period: "2022 - 2025",
    title: "Advanced Software Engineering",
    subtitle: "Aptech Defence",
    desc: "Full-stack specialization with focus on PHP, Laravel, and Flutter.",
    icon: <Code2 />
  },
  {
    period: "2024 - Present",
    title: "BS Computer Science",
    subtitle: "GCU Hyderabad",
    desc: "Theoretical foundations and core computing principles.",
    icon: <GraduationCap />
  },
  {
    period: "2023 - 2024",
    title: "PHP Developer",
    subtitle: "Aptech Defence",
    desc: "Architecting web solutions and mentoring software aspirants.",
    icon: <Building2 />
  }
];

export default function Education() {
  const { mounted } = useTheme();
  if (!mounted) return null;

  return (
    <section id="experience" className="py-32 relative">
      <div className="container px-6 mx-auto max-w-5xl">
        <header className="mb-24">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4 block underline underline-offset-8">The Journey</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">CV / EXP</h2>
        </header>

        <div className="space-y-12">
          {timelineItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex flex-col md:flex-row gap-8 pb-12 border-b border-border last:border-0"
            >
              <div className="md:w-1/4">
                <span className="text-sm font-black opacity-30 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{item.period}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-start gap-6">
                  <div className="p-3 rounded-xl bg-muted text-foreground group-hover:bg-primary group-hover:text-background transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.subtitle}</span>
                    </div>
                    <p className="text-lg font-light text-muted-foreground max-w-2xl">{item.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}