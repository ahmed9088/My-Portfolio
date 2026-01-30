import { motion } from "framer-motion";
import cvFile from "../assets/documents/My Resume.pdf";
import { Button } from "./ui/button";
import { Download, Github, Linkedin, Twitter, Mail, ExternalLink, Code, Palette, ArrowRight, MapPin, Clock } from "lucide-react";
import myImage from "../assets/images/ahmed.png";
import { useState, useEffect } from "react";
import Magnetic from "./ui/Magnetic";

export default function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center py-20 md:py-32 overflow-hidden bg-background">
      <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">

          {/* Main Content */}
          <div className="flex-1 w-full text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm"
            >
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium">Available for work</span>
              </div>
              <div className="flex items-center gap-2 opacity-50 text-xs">
                <Clock className="w-3 h-3" />
                <span>Karachi · {time}</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight"
            >
              Hey, I'm Ahmed 👋
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light leading-relaxed"
            >
              I build fast, beautiful web apps that people actually enjoy using.
              Currently exploring AI, experimenting with design systems, and drinking way too much coffee.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Magnetic>
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-base font-bold group"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base font-bold"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get in Touch
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 relative w-full max-w-[350px] lg:max-w-none"
          >
            <div className="relative aspect-square w-full max-w-[400px] mx-auto lg:ml-auto group">
              <div className="w-full h-full rounded-3xl overflow-hidden bg-muted relative border border-border/50">
                <img
                  src={myImage}
                  alt="Ahmed Saffar"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ objectPosition: 'center 30%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 glass-card px-5 py-3 rounded-2xl border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-semibold">Open to opportunities</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
