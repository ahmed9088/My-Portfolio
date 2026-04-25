"use client";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";

const experiences = [
  {
    period: "2022 - Present",
    title: "Freelance Full Stack Developer",
    company: "Self-Employed",
    description:
      "Helping individuals and businesses build web & mobile applications through Upwork, Fiverr, Facebook, LinkedIn, and many other platforms. Delivered 50+ projects ranging from landing pages to full-scale SaaS products using React, Next.js, Node.js, Laravel, and Flutter.",
    type: "work",
  },
  {
    period: "2024 - Present",
    title: "BS Computer Science",
    company: "GCU Hyderabad",
    description:
      "Studying core CS fundamentals, algorithms, data structures, and software engineering principles.",
    type: "education",
  },
  {
    period: "2023 - 2024",
    title: "Technical Mentor",
    company: "Aptech",
    description:
      "Mentored aspiring software developers, taught web development fundamentals, and helped students build real-world projects.",
    type: "mentorship",
  },
  {
    period: "2022 - 2025",
    title: "ADSE - Full Stack Development",
    company: "Aptech",
    description:
      "Advanced Diploma in Software Engineering. Mastered PHP, Laravel, Flutter, React, and full-stack web architecture.",
    type: "education",
  },
];

export default function Education() {
  const { mounted } = useTheme();
  if (!mounted) return null;

  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="section-label">Experience</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            My professional
            <br />
            <span className="text-muted-foreground">journey so far</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="timeline-item"
            >
              <div className="card-dark p-6 md:p-8 ml-2">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {exp.period}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      exp.type === "work"
                        ? "bg-primary/15 text-primary"
                        : exp.type === "education"
                        ? "bg-blue-500/15 text-blue-400"
                        : "bg-purple-500/15 text-purple-400"
                    }`}
                  >
                    {exp.type}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  {exp.title}
                </h3>
                <p className="text-primary font-semibold text-sm mb-3">
                  {exp.company}
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
