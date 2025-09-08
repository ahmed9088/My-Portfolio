"use client";
import { useRef, useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  GraduationCap, 
  School, 
  Code2, 
  Building2, 
  BookOpen,
  BrainCircuit,
  ExternalLink,
  Calendar,
  MapPin,
  Award
} from "lucide-react";
import { useTheme } from "./theme-provider"; // Import the useTheme hook

// Professional Particle class for Education section
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

// Professional Canvas component for Education section
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

export default function Education() {
  const containerRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);
  
  // Use the theme context
  const { isDark, mounted } = useTheme();
  
  const timelineItems = [
    {
      period: "November 2022 - April 2025",
      title: "Advanced Diploma in Software Engineering",
      subtitle: "Aptech Defence",
      description:
        "Studying Advanced Software Development techniques, including technologies like HTML, CSS, PHP, Laravel, Flutter, and MySQL. Gained comprehensive knowledge of Agile & DevOps methodologies.",
      icon: <Code2 className="h-6 w-6" />,
      iconBg: "bg-blue-50 border-blue-200",
      iconBgDark: "bg-blue-900/20 border-blue-800/30",
      delay: 0.2,
      link: "https://www.aptech-education.com.pk/",
      skills: ["HTML/CSS", "PHP", "Laravel", "Flutter", "MySQL", "Agile", "DevOps"]
    },
    {
      period: "January 2024 - Present",
      title: "Bachelor's in Computer Science",
      subtitle: "Government College University, Hyderabad",
      description:
        "Currently pursuing a Bachelor's degree in Computer Science. Focused on Programming Fundamentals, Object-Oriented Programming, Data Structures, Mathematics, and Digital Logic Design.",
      icon: <GraduationCap className="h-6 w-6" />,
      iconBg: "bg-purple-50 border-purple-200",
      iconBgDark: "bg-purple-900/20 border-purple-800/30",
      delay: 0.3,
      link: "https://gcue.edu.pk/",
      skills: ["Programming", "OOP", "Data Structures", "Mathematics", "Digital Logic"]
    },
    {
      period: "June 2023 - January 2024",
      title: "PHP Developer",
      subtitle: "Aptech Defence",
      description:
        "Mentored students in Practical PHP Development and enhanced course materials. Delivered innovative web solutions while assisting peers in projects.",
      icon: <Building2 className="h-6 w-6" />,
      iconBg: "bg-blue-50 border-blue-200",
      iconBgDark: "bg-blue-900/20 border-blue-800/30",
      delay: 0.4,
      link: "https://www.aptech-education.com.pk/",
      skills: ["PHP", "Mentoring", "Web Development", "Project Management"]
    },
    {
      period: "July 2023 - Present",
      title: "Freelance Developer",
      subtitle: "Fiverr / Upwork / PeoplePerHour",
      description:
        "Worked on projects like custom website development, database optimization, API integrations, and UI/UX design improvements. Delivered high-quality solutions to international clients.",
      icon: <BookOpen className="h-6 w-6" />,
      iconBg: "bg-purple-50 border-purple-200",
      iconBgDark: "bg-purple-900/20 border-purple-800/30",
      delay: 0.5,
      link: "https://www.fiverr.com/",
      skills: ["Web Development", "Database Optimization", "API Integration", "UI/UX Design"]
    },
  ];
  
  const skills = [
    { name: "PHP", level: 90 },
    { name: "Laravel", level: 85 },
    { name: "MySQL", level: 80 },
    { name: "Flutter", level: 75 },
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 80 },
    { name: "React", level: 75 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Agile Methodologies", level: 80 },
    { name: "DevOps", level: 70 }
  ];
  
  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return null;
  
  return (
    <section id="education" className="py-20 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden min-h-screen">
      {/* Particles Background */}
      <ParticlesCanvas isDark={isDark} />
      
      {/* Professional background elements - theme responsive */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className={`absolute top-1/4 -right-20 w-64 h-64 rounded-full filter blur-3xl ${isDark ? 'bg-blue-400/5' : 'bg-blue-400/1'}`} />
        <div className={`absolute bottom-1/3 -left-20 w-72 h-72 rounded-full filter blur-3xl ${isDark ? 'bg-purple-400/5' : 'bg-purple-400/1'}`} />
      </div>
      
      <motion.div ref={containerRef} style={{ opacity, y }} className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className={`mb-4 px-4 py-1.5 text-sm backdrop-blur-sm shadow-sm ${
            isDark 
              ? 'border-slate-700/50 bg-slate-800/90' 
              : 'border-gray-300/50 bg-white/90'
          }`}>
            Educational Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Education & Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto" />
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line with animation */}
          <motion.div 
            className={`absolute left-8 top-0 bottom-0 w-1 hidden md:block ${
              isDark 
                ? 'bg-gradient-to-b from-blue-800/30 to-purple-800/30' 
                : 'bg-gradient-to-b from-blue-200 to-purple-200'
            }`}
            style={{ 
              scaleY: isInView ? 1 : 0,
              transformOrigin: "top",
              transition: { duration: 1.5, ease: "easeInOut" }
            }}
          />
          
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: item.delay }}
              viewport={{ once: true }}
              className="relative flex mb-12 group"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Timeline marker with pulse animation */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div 
                  className={`w-16 h-16 rounded-lg flex items-center justify-center shadow-sm ${
                    isDark ? item.iconBgDark : item.iconBg
                  }`}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: isDark 
                      ? "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" 
                      : "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>
                {hoveredItem === index && (
                  <motion.div 
                    className="absolute inset-0 rounded-lg border-2 border-blue-400"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
              
              {/* Content with enhanced hover effect */}
              <div className="ml-8 flex-1">
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`backdrop-blur-sm border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
                    isDark 
                      ? 'bg-slate-800/90 border-slate-700/50' 
                      : 'bg-white/90 border-gray-200/50'
                  } ${
                    hoveredItem === index ? 'ring-2 ring-blue-500/50' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{item.period}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 font-medium mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{item.subtitle}</span>
                      </div>
                    </div>
                    <motion.a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`mt-2 sm:mt-0 transition-colors ${
                        isDark 
                          ? 'text-blue-400 hover:text-blue-300' 
                          : 'text-blue-600 hover:text-blue-800'
                      }`}
                      aria-label="Visit website"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </motion.a>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{item.description}</p>
                  
                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <motion.span 
                        key={skillIndex}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          isDark 
                            ? 'bg-slate-700 text-gray-300 border-slate-600' 
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: isDark 
                            ? "rgba(99, 102, 241, 0.2)" 
                            : "rgba(99, 102, 241, 0.1)",
                          borderColor: isDark 
                            ? "rgba(99, 102, 241, 0.4)" 
                            : "rgba(99, 102, 241, 0.3)"
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Skills Summary with animated progress bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className={`mt-16 backdrop-blur-sm border rounded-xl p-6 shadow-sm ${
            isDark 
              ? 'bg-slate-800/90 border-slate-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <Award className={`h-6 w-6 mr-2 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Key Skills & Technologies</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className={`font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>{skill.name}</span>
                  <span className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>{skill.level}%</span>
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
          
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["Problem Solving", "Critical Thinking", "Team Collaboration", "Project Management", "Adaptability", "Communication"].map((softSkill, index) => (
              <motion.span 
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  isDark 
                    ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 text-blue-300 border-blue-800/30' 
                    : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                viewport={{ once: true }}
              >
                {softSkill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}