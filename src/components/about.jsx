"use client";
import { motion } from "framer-motion";
import { Sparkles, Code, Database, Smartphone, Palette, ArrowRight } from "lucide-react";
import { useTheme } from "./theme-provider";

export default function About() {
  const { mounted } = useTheme();

  if (!mounted) return null;

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container px-6 relative z-10 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-24 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4 block underline underline-offset-8 text-left">The Narrative</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 leading-none text-left">ABOUT</h2>

            <div className="space-y-6 text-xl text-muted-foreground font-light leading-relaxed text-left">
              <p>
                Hyper-focused on the intersection of <span className="text-foreground font-bold italic">logic</span> and <span className="text-foreground font-bold italic">aesthetics</span>. I don't just write code; I craft digital signatures.
              </p>
              <p>
                Based in Hyderabad, Pakistan, I spend my time architecting scalable systems and refining user journeys. My background in Computer Science and Software Development drives my relentless pursuit of technical excellence.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="text-4xl font-black text-primary">03+</h4>
                <p className="text-xs uppercase tracking-widest opacity-40 font-bold">Years of Research</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-primary">50+</h4>
                <p className="text-xs uppercase tracking-widest opacity-40 font-bold">Deployments</p>
              </div>
            </div>
          </motion.div>

          {/* Service Cards */}
          <div className="grid gap-6">
            {[
              { icon: <Code />, title: "Full Stack Development", desc: "End-to-end architectures that scale with your vision." },
              { icon: <Palette />, title: "UI/UX Engineering", desc: "Design systems that breathe and react to humans." },
              { icon: <Database />, title: "System Architecture", desc: "Robust backends and optimized data pipelines." },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl border-2 hover:border-primary transition-all duration-500 bg-muted/30 hover:bg-muted/10 text-left"
              >
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-foreground text-background group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 uppercase tracking-tight">{service.title}</h3>
                    <p className="text-muted-foreground font-light">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}