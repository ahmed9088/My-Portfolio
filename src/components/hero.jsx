"use client";
import { motion } from "framer-motion";
import cvFile from "../assets/documents/My Resume.pdf";
import { Button } from "./ui/button";
import { Download, Github, Linkedin, Twitter, Mail, ExternalLink, Sparkles, Code, Palette, Cpu } from "lucide-react";
import myImage from "../assets/images/ahmed.png";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "./theme-provider"; // Import the useTheme hook

// Professional Particle class
class Particle {
  constructor(canvas, isDark) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 0.8 + 0.4; // Smaller, more refined
    this.speedX = Math.random() * 0.3 - 0.15; // Slower, more controlled
    this.speedY = Math.random() * 0.3 - 0.15;
    this.opacity = Math.random() * 0.05 + 0.01; // Very subtle
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

// Professional Canvas component
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
      const particleCount = isMobile ? 5 : 10;
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
            
            if (distance < 120) {
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

// Role icon mapping
const roleIcons = {
  "Full Stack Developer": <Code className="w-4 h-4" />,
  "UI/UX Designer": <Palette className="w-4 h-4" />,
  "Creative Technologist": <Cpu className="w-4 h-4" />
};

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [currentRole, setCurrentRole] = useState("Full Stack Developer");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingTimeoutRef = useRef(null);
  
  // Use the theme context
  const { isDark, mounted } = useTheme();
  
  const roles = ["Full Stack Developer", "UI/UX Designer", "Creative Technologist"];
  const typingSpeed = 100;
  const deletingSpeed = 80;
  const pauseTime = 1500;
  
  // Typing effect
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];
      
      setTypedText(isDeleting 
        ? fullText.substring(0, typedText.length - 1)
        : fullText.substring(0, typedText.length + 1)
      );
      
      if (!isDeleting && typedText === fullText) {
        setCurrentRole(fullText);
        typingTimeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
      
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      typingTimeoutRef.current = setTimeout(handleTyping, speed);
    };
    
    typingTimeoutRef.current = setTimeout(handleTyping, typingSpeed);
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [typedText, isDeleting, loopNum]);
  
  // Social links
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:contact@example.com", label: "Email" },
  ];
  
  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return null;
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Professional Particles Background */}
      <ParticlesCanvas isDark={isDark} />
      
      {/* Professional background elements - theme responsive */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className={`absolute top-1/4 -right-20 w-64 h-64 rounded-full filter blur-3xl ${isDark ? 'bg-blue-400/5' : 'bg-blue-400/1'}`} />
        <div className={`absolute bottom-1/3 -left-20 w-72 h-72 rounded-full filter blur-3xl ${isDark ? 'bg-purple-400/5' : 'bg-purple-400/1'}`} />
      </div>
      
      <div className="container px-4 py-16 md:py-0 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full mb-6 border border-gray-200/50 dark:border-slate-700/50 shadow-sm"
          >
            <Sparkles className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Welcome to my portfolio
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Hi, I'm Ahmed Saffar
            </span>
          </motion.h1>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className={`inline-flex items-center px-3 py-1.5 rounded-full font-medium backdrop-blur-sm ${
              isDark 
                ? 'bg-blue-900/20 text-blue-300' 
                : 'bg-blue-100/50 text-blue-700'
            }`}>
              {roleIcons[currentRole]}
              <span className="ml-2">{currentRole}</span>
            </div>
            <div className="flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 text-xl font-medium">
                {typedText}
              </span>
              <motion.span 
                className="ml-1 inline-block w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Passionate about building scalable web applications, crafting seamless UI/UX experiences, and delivering innovative solutions.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg text-white font-medium py-3 px-8 rounded-xl transition-all duration-300"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
                <ExternalLink className="w-4 h-4" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 border-gray-300/50 dark:border-slate-700/50 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 text-gray-700 dark:text-gray-300 font-medium py-3 px-8 rounded-xl transition-all duration-300 backdrop-blur-sm" 
                asChild
              >
                <a href={cvFile} download>
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Social Links */}
          <motion.div 
            className="flex gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-white transition-all border border-gray-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md"
                whileHover={{ 
                  y: -5,
                  background: "linear-gradient(to right, #4f46e5, #7c3aed)",
                  borderColor: "transparent"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex-1 flex justify-center lg:justify-end mt-8 lg:mt-0"
        >
          <div className="relative w-full max-w-md">
            <div className="relative">
              {/* Main image container with professional styling */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl border-8 border-white/80 dark:border-slate-800/80 backdrop-blur-sm">
                <div className={`absolute inset-0 ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-900/5 to-purple-900/5' 
                    : 'bg-gradient-to-br from-blue-100/5 to-purple-100/5'
                }`}></div>
                <img
                  src={myImage}
                  alt="Ahmed Saffar"
                  className="w-full h-auto object-cover relative z-10"
                />
                <div className={`absolute inset-0 ${
                  isDark 
                    ? 'bg-gradient-to-t from-black/20 to-transparent' 
                    : 'bg-gradient-to-t from-black/10 to-transparent'
                } opacity-30 z-20`} />
              </div>
              
              {/* Professional status badge */}
              <motion.div
                className={`absolute bottom-6 right-6 backdrop-blur-sm px-4 py-2 rounded-xl border shadow-md flex items-center gap-2 ${
                  isDark 
                    ? 'bg-slate-800/90 border-slate-700/50' 
                    : 'bg-white/90 border-gray-200/50'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Available for work</span>
              </motion.div>
              
              {/* Decorative elements */}
              <div className={`absolute -top-4 -left-4 w-16 h-16 rounded-2xl backdrop-blur-sm border shadow-lg flex items-center justify-center ${
                isDark 
                  ? 'bg-slate-800/80 border-slate-700/50' 
                  : 'bg-white/80 border-gray-200/50'
              }`}>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-xl">AS</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Professional Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center">
          <motion.div 
            className={`text-sm font-medium mb-2 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll down
          </motion.div>
          <div className={`w-10 h-16 border-2 rounded-full flex justify-center p-1 backdrop-blur-sm ${
            isDark ? 'border-slate-700/50' : 'border-gray-300/50'
          }`}>
            <motion.div 
              className="w-2 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}