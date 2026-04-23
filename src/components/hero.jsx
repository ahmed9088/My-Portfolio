import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import myImage from "../assets/images/ahmed.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-12 md:py-0"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for freelance work
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Hi, I'm{" "}
              <span className="text-primary">Ahmed</span>
              <br />
              <span className="text-muted-foreground">Saffar Memon</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
              Freelance Full Stack Developer helping businesses worldwide through{" "}
              <span className="text-foreground font-semibold">Upwork, Fiverr & direct clients</span>. 
              I craft fast, secure, and beautiful web applications using React, Next.js, Node.js, and Laravel.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#contact" className="btn-primary">
                <Mail className="w-4 h-4" />
                Message Me
              </a>
              <a href="#projects" className="btn-outline">
                View Projects
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Glow behind image */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-primary/20 blur-3xl scale-90" />
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-border bg-card">
                <img
                  src={myImage}
                  alt="Ahmed Saffar Memon - Full Stack Developer from Hyderabad, Pakistan"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 30%" }}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
