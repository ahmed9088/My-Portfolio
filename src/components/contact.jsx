"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Send, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useTheme } from "./theme-provider";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { mounted } = useTheme();

  if (!mounted) return null;

  return (
    <section id="contact" className="py-32 relative">
      <div className="container px-6 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-24">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4 block underline underline-offset-8">Get in touch</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 uppercase leading-none">COLLAB</h2>

            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="p-4 rounded-full bg-muted group-hover:bg-primary group-hover:text-background transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black opacity-30 uppercase tracking-widest mb-1 font-mono">Mail Me</p>
                  <a href="mailto:memon1ahmed@gmail.com" className="text-2xl font-bold hover:text-primary transition-colors italic">memon1ahmed@gmail.com</a>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="p-4 rounded-full bg-muted group-hover:bg-primary group-hover:text-background transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black opacity-30 uppercase tracking-widest mb-1 font-mono">Location</p>
                  <p className="text-2xl font-bold italic">Hyderabad, Pakistan</p>
                </div>
              </div>
            </div>

            <div className="mt-20 p-8 rounded-[2rem] bg-muted/30 border-2 border-dashed border-border flex items-center justify-between group cursor-pointer hover:border-primary transition-colors">
              <span className="text-lg font-bold">Open for new projects</span>
              <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-muted/20 p-8 md:p-12 rounded-[3rem] border border-border"
          >
            <form className="space-y-8">
              <div className="space-y-2 text-left">
                <label className="text-xs font-black uppercase tracking-widest opacity-40 ml-2 font-mono">Full Name</label>
                <Input className="bg-transparent border-0 border-b-2 border-border rounded-none px-2 py-6 text-xl focus-visible:ring-0 focus-visible:border-primary transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-black uppercase tracking-widest opacity-40 ml-2 font-mono">Email Address</label>
                <Input className="bg-transparent border-0 border-b-2 border-border rounded-none px-2 py-6 text-xl focus-visible:ring-0 focus-visible:border-primary transition-colors" placeholder="john@example.com" />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-black uppercase tracking-widest opacity-40 ml-2 font-mono">Your Message</label>
                <Textarea className="bg-transparent border-0 border-b-2 border-border rounded-none px-2 py-6 text-xl focus-visible:ring-0 focus-visible:border-primary transition-colors min-h-[150px] resize-none" placeholder="Tell me about your project..." />
              </div>

              <Button size="xl" className="w-full rounded-full py-8 text-xl group bg-primary text-primary-foreground font-black uppercase tracking-tighter">
                Send Message
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}