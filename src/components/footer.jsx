"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Heart, Code } from "lucide-react";
import { useTheme } from "./theme-provider"; // Import the useTheme hook

// Professional Particle class for Footer section
class Particle {
  constructor(canvas, isDark) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 0.6 + 0.3;
    this.speedX = Math.random() * 0.25 - 0.125;
    this.speedY = Math.random() * 0.25 - 0.125;
    this.opacity = Math.random() * 0.04 + 0.01;
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

// Professional Canvas component for Footer section
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

// Social Link Component
function SocialLink({ href, icon, label, index, isDark }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
        isDark 
          ? 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 border-slate-700/50' 
          : 'text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 border-gray-200/50'
      }`}
      aria-label={label}
      whileHover={{ 
        scale: 1.1,
        rotate: 5,
        y: -5
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      viewport={{ once: true }}
    >
      {icon}
    </motion.a>
  );
}

// Footer Link Component
function FooterLink({ href, label, index, isDark }) {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };
  
  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`text-sm relative group ${
        isDark 
          ? 'text-gray-300 hover:text-blue-400' 
          : 'text-gray-600 hover:text-blue-600'
      }`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      viewport={{ once: true }}
    >
      {label}
      <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 group-hover:w-full ${
        isDark 
          ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
          : 'bg-gradient-to-r from-blue-500 to-purple-500'
      }`}></span>
    </motion.a>
  );
}

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.1 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();
  
  // Use the theme context
  const { isDark, mounted } = useTheme();
  
  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  const socialLinks = [
    {
      href: "https://github.com/ahmed9088",
      icon: <Github className="h-5 w-5" />,
      label: "GitHub"
    },
    {
      href: "https://www.linkedin.com/in/ahmed-saffar-memon-b26298294",
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn"
    },
    {
      href: "mailto:memon1ahmed@gmail.com",
      icon: <Mail className="h-5 w-5" />,
      label: "Email"
    }
  ];
  
  const footerLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" }
  ];
  
  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return null;
  
  return (
    <footer ref={footerRef} className={`relative border-t overflow-hidden ${
      isDark 
        ? 'border-slate-700/50 bg-gradient-to-b from-slate-900 to-slate-800' 
        : 'border-gray-200/50 bg-gradient-to-b from-slate-50 to-blue-50'
    }`}>
      {/* Particles Background */}
      <ParticlesCanvas isDark={isDark} />
      
      {/* Professional background elements - theme responsive */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className={`absolute top-0 left-0 w-64 h-64 rounded-full filter blur-3xl ${isDark ? 'bg-blue-400/5' : 'bg-blue-400/1'}`} />
        <div className={`absolute bottom-0 right-0 w-72 h-72 rounded-full filter blur-3xl ${isDark ? 'bg-purple-400/5' : 'bg-purple-400/1'}`} />
      </div>
      
      <div className="container px-4 md:px-6 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <motion.div 
              className="flex items-center justify-center md:justify-start gap-2 mb-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Code className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Ahmed Saffar
              </h2>
            </motion.div>
            <p className={`text-sm max-w-md ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Full-Stack Developer & UI/UX Designer passionate about creating beautiful, functional web experiences.
            </p>
          </motion.div>
          
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link, index) => (
              <SocialLink key={index} {...link} index={index} isDark={isDark} />
            ))}
          </motion.div>
        </div>
        
        {/* Footer Links and Copyright */}
        <div className={`border-t pt-6 ${
          isDark ? 'border-slate-700/50' : 'border-gray-200/50'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className={`flex flex-col sm:flex-row items-center gap-1 text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              <span>&copy; {currentYear} Ahmed Saffar. All rights reserved.</span>
              <span className="hidden sm:inline">|</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> by Ahmed
              </span>
            </motion.div>
            
            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              {footerLinks.map((link, index) => (
                <FooterLink key={index} {...link} index={index} isDark={isDark} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </footer>
  );
}