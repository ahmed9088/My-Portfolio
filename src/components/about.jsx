"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, Code, Database, Smartphone, Palette, ExternalLink, Award, Zap } from "lucide-react";
import { Badge } from "./ui/badge";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "./theme-provider"; // Import the useTheme hook

// Professional Particle class for About section
class Particle {
  constructor(canvas, isDark) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 0.6 + 0.3; // Smaller, more refined
    this.speedX = Math.random() * 0.25 - 0.125; // Slower, more controlled
    this.speedY = Math.random() * 0.25 - 0.125;
    this.opacity = Math.random() * 0.04 + 0.01; // Very subtle
    this.updateColor(isDark);
  }
  
  updateColor(isDark) {
    // Adjust color based on theme
    if (isDark) {
      // Dark mode: cooler blue tones with higher opacity
      this.color = `hsla(${Math.random() * 60 + 220}, 80%, 70%, ${this.opacity * 1.5})`;
    } else {
      // Light mode: warmer blue tones
      this.color = `hsla(${Math.random() * 60 + 220}, 70%, 60%, ${this.opacity})`;
    }
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Boundary check with wrap-around
    if (this.x > this.canvas.width) this.x = 0;
    else if (this.x < 0) this.x = this.canvas.width;
    if (this.y > this.canvas.height) this.y = 0;
    else if (this.y < 0) this.y = this.canvas.height;
  }
  
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Professional Canvas component for About section
const ParticlesCanvas = ({ isDark }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);
  const isDarkRef = useRef(isDark);
  
  // Update ref when isDark changes
  useEffect(() => {
    isDarkRef.current = isDark;
    // Update existing particles with new colors
    particles.current.forEach(particle => particle.updateColor(isDark));
  }, [isDark]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size with device pixel ratio support
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Minimal particles for professional look
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 4 : 8;
      particles.current = Array.from({ length: particleCount }, () => new Particle(canvas, isDarkRef.current));
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation loop with performance optimization
    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;
    
    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      
      // Throttle animation to target FPS
      if (deltaTime > interval) {
        // Clear canvas with theme-appropriate color
        ctx.fillStyle = isDarkRef.current ? 'rgba(15, 23, 42, 0.01)' : 'rgba(249, 250, 251, 0.01)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.current.forEach(particle => {
          particle.update();
          particle.draw(ctx);
        });
        
        // Draw subtle connections
        const connectionColor = isDarkRef.current 
          ? 'rgba(100, 150, 255, 0.015)' 
          : 'rgba(99, 102, 241, 0.01)';
        ctx.strokeStyle = connectionColor;
        ctx.lineWidth = 0.3;
        
        // Skip some connections on mobile for performance
        const skipConnections = window.innerWidth < 768;
        
        for (let i = 0; i < particles.current.length; i++) {
          // Skip every other connection on mobile
          if (skipConnections && i % 2 !== 0) continue;
          
          for (let j = i + 1; j < particles.current.length; j++) {
            const dx = particles.current[i].x - particles.current[j].x;
            const dy = particles.current[i].y - particles.current[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particles.current[i].x, particles.current[i].y);
              ctx.lineTo(particles.current[j].x, particles.current[j].y);
              ctx.stroke();
            }
          }
        }
        
        lastTime = timestamp - (deltaTime % interval);
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default function About() {
  const [hoveredService, setHoveredService] = useState(null);
  
  // Use the theme context
  const { isDark, mounted } = useTheme();
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true }
  }
  
  const slideInLeft = {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.2 },
    viewport: { once: true }
  }
  
  const slideInRight = {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.4 },
    viewport: { once: true }
  }
  
  const services = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Full Stack Development",
      description: "Developing scalable, efficient, and visually appealing web applications.",
      color: "bg-blue-50",
      borderColor: "border-blue-100",
      hoverColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      darkColor: "bg-blue-900/20",
      darkBorderColor: "border-blue-800/30",
      darkHoverColor: "bg-gradient-to-r from-blue-600 to-blue-700"
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "Backend Development",
      description: "Building robust APIs, databases, and systems using PHP, Laravel, and Firebase.",
      color: "bg-purple-50",
      borderColor: "border-purple-100",
      hoverColor: "bg-gradient-to-r from-purple-500 to-purple-600",
      darkColor: "bg-purple-900/20",
      darkBorderColor: "border-purple-800/30",
      darkHoverColor: "bg-gradient-to-r from-purple-600 to-purple-700"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Frontend Development",
      description: "Crafting modern and responsive UI/UX designs with Tailwind CSS and React.",
      color: "bg-blue-50",
      borderColor: "border-blue-100",
      hoverColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      darkColor: "bg-blue-900/20",
      darkBorderColor: "border-blue-800/30",
      darkHoverColor: "bg-gradient-to-r from-blue-600 to-blue-700"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile App Development",
      description: "Creating cross-platform mobile applications with Flutter.",
      color: "bg-purple-50",
      borderColor: "border-purple-100",
      hoverColor: "bg-gradient-to-r from-purple-500 to-purple-600",
      darkColor: "bg-purple-900/20",
      darkBorderColor: "border-purple-800/30",
      darkHoverColor: "bg-gradient-to-r from-purple-600 to-purple-700"
    }
  ]
  
  const skills = [
    { name: "React", level: 90 },
    { name: "Laravel", level: 85 },
    { name: "PHP", level: 80 },
    { name: "Flutter", level: 75 },
    { name: "UI/UX Design", level: 85 },
    { name: "Tailwind CSS", level: 90 }
  ]
  
  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return null;
  
  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Professional Particles Background */}
      <ParticlesCanvas isDark={isDark} />
      
      {/* Professional background elements - theme responsive */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className={`absolute top-1/4 -right-20 w-64 h-64 rounded-full filter blur-3xl ${isDark ? 'bg-blue-400/5' : 'bg-blue-400/1'}`} />
        <div className={`absolute bottom-1/3 -left-20 w-72 h-72 rounded-full filter blur-3xl ${isDark ? 'bg-purple-400/5' : 'bg-purple-400/1'}`} />
      </div>
      
      <div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          transition={fadeIn.transition}
          viewport={fadeIn.viewport}
          className="flex flex-col items-center text-center mb-16"
        >
          <Badge variant="outline" className={`mb-4 px-4 py-1.5 text-sm backdrop-blur-sm shadow-sm ${
            isDark 
              ? 'border-slate-700/50 bg-slate-800/90' 
              : 'border-gray-300/50 bg-white/90'
          }`}>
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Who I Am
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Background */}
          <motion.div
            initial={slideInLeft.initial}
            whileInView={slideInLeft.whileInView}
            transition={slideInLeft.transition}
            viewport={slideInLeft.viewport}
          >
            <Card className={`backdrop-blur-sm border shadow-lg overflow-hidden ${
              isDark 
                ? 'bg-slate-800/90 border-slate-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">My Background</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  I'm a passionate and innovative Full-Stack Developer & UI/UX Designer from Hyderabad, Pakistan. I am currently pursuing a Bachelor's in Computer Science and have completed a three-year diploma in Advanced Software Development from Aptech Pakistan.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  I specialize in building scalable web applications and mobile apps with a focus on robust backend systems and user-friendly interfaces. I enjoy leveraging modern technologies like Laravel, Flutter, PHP, and Tailwind CSS to bring ideas to life and solve real-world problems.
                </p>
                
                {/* Skills section */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Technical Skills</h4>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                        </div>
                        <div className={`h-2 rounded-full overflow-hidden ${
                          isDark ? 'bg-slate-700' : 'bg-gray-200'
                        }`}>
                          <motion.div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.1 * index }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild variant="outline" size="sm" className={`gap-2 transition-all backdrop-blur-sm ${
                    isDark 
                      ? 'border-slate-700/50 hover:bg-slate-800/50' 
                      : 'border-gray-300/50 hover:bg-gray-50/50'
                  }`}>
                    <a href="https://github.com/ahmed9088" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className={`gap-2 transition-all backdrop-blur-sm ${
                    isDark 
                      ? 'border-slate-700/50 hover:bg-slate-800/50' 
                      : 'border-gray-300/50 hover:bg-gray-50/50'
                  }`}>
                    <a href="https://www.linkedin.com/in/ahmed-saffar-memon-b26298294" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className={`gap-2 transition-all backdrop-blur-sm ${
                    isDark 
                      ? 'border-slate-700/50 hover:bg-slate-800/50' 
                      : 'border-gray-300/50 hover:bg-gray-50/50'
                  }`}>
                    <a href="mailto:memon1ahmed@gmail.com">
                      <Mail className="w-4 h-4" />
                      Email Me
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Right Column - Services */}
          <motion.div
            initial={slideInRight.initial}
            whileInView={slideInRight.whileInView}
            transition={slideInRight.transition}
            viewport={slideInRight.viewport}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">What I Do</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    onHoverStart={() => setHoveredService(index)}
                    onHoverEnd={() => setHoveredService(null)}
                    className={`backdrop-blur-sm border rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 ${
                      isDark 
                        ? 'bg-slate-800/90 border-slate-700/50' 
                        : 'bg-white/90 border-gray-200/50'
                    } ${
                      hoveredService === index ? 'ring-2 ring-blue-500/50' : ''
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
                      isDark 
                        ? (hoveredService === index 
                            ? service.darkHoverColor + ' text-white border-transparent' 
                            : service.darkColor + ' ' + service.darkBorderColor + ' border')
                        : (hoveredService === index 
                            ? service.hoverColor + ' text-white border-transparent' 
                            : service.color + ' ' + service.borderColor + ' border')
                    }`}>
                      {service.icon}
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">{service.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{service.description}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Stats section */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className={`backdrop-blur-sm border rounded-xl p-4 text-center ${
                    isDark 
                      ? 'bg-slate-800/90 border-slate-700/50' 
                      : 'bg-white/90 border-gray-200/50'
                  }`}
                >
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">3+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className={`backdrop-blur-sm border rounded-xl p-4 text-center ${
                    isDark 
                      ? 'bg-slate-800/90 border-slate-700/50' 
                      : 'bg-white/90 border-gray-200/50'
                  }`}
                >
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Projects Completed</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                  className={`backdrop-blur-sm border rounded-xl p-4 text-center ${
                    isDark 
                      ? 'bg-slate-800/90 border-slate-700/50' 
                      : 'bg-white/90 border-gray-200/50'
                  }`}
                >
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">20+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Happy Clients</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Additional Info Section */}
        <motion.div
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          transition={{ ...fadeIn.transition, delay: 0.3 }}
          viewport={fadeIn.viewport}
          className="mt-16 text-center"
        >
          <div className={`inline-block backdrop-blur-sm border rounded-xl p-6 shadow-sm max-w-2xl ${
            isDark 
              ? 'bg-slate-800/90 border-slate-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">My Approach</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I believe in creating digital experiences that are both functional and beautiful. 
              My approach combines technical expertise with creative problem-solving to deliver 
              solutions that exceed expectations and provide real value to users.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}