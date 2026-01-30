import { motion } from "framer-motion";
import { Sparkles, Code, Database, Smartphone, Palette, ArrowRight, Quote, Globe, Cpu, MapPin, Zap, Layout } from "lucide-react";

export default function About() {
  const skills = ["React & Next.js", "TypeScript", "Node.js", "UI/UX Design"];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden bg-background">
      <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A bit about who I am and what I do
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">

          {/* Main Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-10 space-y-6"
          >
            <h3 className="text-2xl font-bold mb-4">Hey there! 👋</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm Ahmed, a developer based in Karachi who loves building things for the web.
                I've been coding for over 3 years and I'm still learning something new every day.
              </p>
              <p>
                What excites me most? Creating user experiences that feel smooth, look great,
                and actually work the way people expect them to. No confusing interfaces,
                no unnecessary complexity—just clean, functional design.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open source, or probably grabbing another cup of coffee. ☕
              </p>
            </div>
          </motion.div>

          {/* Quick Facts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Location</h3>
              </div>
              <p className="text-2xl font-black">Karachi, Pakistan</p>
              <p className="text-sm text-muted-foreground mt-2">Working with clients globally</p>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Experience</h3>
              </div>
              <p className="text-2xl font-black">3+ Years</p>
              <p className="text-sm text-muted-foreground mt-2">Building web applications</p>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Projects</h3>
              </div>
              <p className="text-2xl font-black">50+ Built</p>
              <p className="text-sm text-muted-foreground mt-2">Personal & client work</p>
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10"
        >
          <h3 className="text-2xl font-bold mb-6">What I Work With</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors"
              >
                <p className="font-semibold">{skill}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6 text-center">
            And always exploring new tools and technologies
          </p>
        </motion.div>

      </div>
    </section>
  );
}
