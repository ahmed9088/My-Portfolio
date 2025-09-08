"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, 
  Server, 
  Database, 
  Wrench, 
  Zap,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { useTheme } from "./theme-provider"; // Import the useTheme hook

// Professional Particle class for TechStack section
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

// Professional Canvas component for TechStack section
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

// Tech icons
const techIcons = {
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  angular: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  vue: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  php: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
  flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  csharp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
};

// Category icons
const categoryIcons = {
  frontend: <Code className="w-5 h-5" />,
  backend: <Server className="w-5 h-5" />,
  databases: <Database className="w-5 h-5" />,
  tools: <Wrench className="w-5 h-5" />,
};

// Skill Card Component
function SkillCard({ skill, index, proficiency = 85, category, isDark }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={`h-full border shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-sm overflow-hidden ${
        isDark 
          ? 'border-slate-700/50 bg-slate-800/90' 
          : 'border-gray-200/50 bg-white/90'
      } ${isHovered ? 'ring-2 ring-blue-500/50' : ''}`}>
        <CardContent className="p-5 flex flex-col items-center text-center">
          <motion.div 
            className={`w-16 h-16 flex items-center justify-center mb-4 rounded-xl ${
              isDark 
                ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' 
                : 'bg-gradient-to-br from-blue-50 to-purple-50'
            }`}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              background: isDark 
                ? "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))" 
                : "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))"
            }}
            transition={{ duration: 0.3 }}
          >
            <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain" />
          </motion.div>
          <h3 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{skill.name}</h3>
          <div className="w-full mt-2">
            <div className={`h-2 rounded-full overflow-hidden ${
              isDark ? 'bg-slate-700' : 'bg-gray-200'
            }`}>
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${proficiency}%` }}
                transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                viewport={{ once: true }}
              />
            </div>
            <div className="flex justify-between items-center mt-1">
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{proficiency}%</div>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                >
                  {proficiency >= 90 ? 'Expert' : proficiency >= 75 ? 'Advanced' : 'Intermediate'}
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Main TechStack Component
export default function TechStack() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  // Use the theme context
  const { isDark, mounted } = useTheme();
  
  const categories = [
    {
      id: "frontend",
      name: "Frontend",
      icon: categoryIcons.frontend,
      skills: [
        { name: "HTML5", icon: techIcons.html, proficiency: 95 },
        { name: "CSS3", icon: techIcons.css, proficiency: 90 },
        { name: "JavaScript", icon: techIcons.javascript, proficiency: 85 },
        { name: "React", icon: techIcons.react, proficiency: 80 },
        { name: "Angular", icon: techIcons.angular, proficiency: 75 },
        { name: "Vue.js", icon: techIcons.vue, proficiency: 70 },
        { name: "Tailwind CSS", icon: techIcons.tailwind, proficiency: 85 },
        { name: "Bootstrap", icon: techIcons.bootstrap, proficiency: 80 },
      ],
    },
    {
      id: "backend",
      name: "Backend",
      icon: categoryIcons.backend,
      skills: [
        { name: "PHP", icon: techIcons.php, proficiency: 85 },
        { name: "Laravel", icon: techIcons.laravel, proficiency: 80 },
        { name: "Python", icon: techIcons.python, proficiency: 75 },
        { name: "Java", icon: techIcons.java, proficiency: 85 },
      ],
    },
    {
      id: "databases",
      name: "Databases",
      icon: categoryIcons.databases,
      skills: [
        { name: "MySQL", icon: techIcons.mysql, proficiency: 90 },
        { name: "PostgreSQL", icon: techIcons.postgresql, proficiency: 80 },
        { name: "MongoDB", icon: techIcons.mongodb, proficiency: 75 },
        { name: "Firebase", icon: techIcons.firebase, proficiency: 70 },
      ],
    },
    {
      id: "tools",
      name: "Tools & Platforms",
      icon: categoryIcons.tools,
      skills: [
        { name: "Git", icon: techIcons.git, proficiency: 90 },
        { name: "Docker", icon: techIcons.docker, proficiency: 80 },
        { name: "Kubernetes", icon: techIcons.kubernetes, proficiency: 70 },
        { name: "AWS", icon: techIcons.aws, proficiency: 75 },
        { name: "Figma", icon: techIcons.figma, proficiency: 85 },
      ],
    },
  ];
  
  const [activeTab, setActiveTab] = useState(categories[0].id);
  
  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return null;
  
  return (
    <section id="tech" ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden min-h-screen">
      {/* Particles Background */}
      <ParticlesCanvas isDark={isDark} />
      
      {/* Professional background elements - theme responsive */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className={`absolute top-1/4 -right-20 w-64 h-64 rounded-full filter blur-3xl ${isDark ? 'bg-blue-400/5' : 'bg-blue-400/1'}`} />
        <div className={`absolute bottom-1/3 -left-20 w-72 h-72 rounded-full filter blur-3xl ${isDark ? 'bg-purple-400/5' : 'bg-purple-400/1'}`} />
      </div>
      
      <div className="container px-4 md:px-6 relative z-10 max-w-6xl mx-auto">
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
            My Tech Skills
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Technology Stack
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto" />
        </motion.div>
        
        {/* Tabs */}
        <Tabs defaultValue={categories[0].id} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid grid-cols-2 md:grid-cols-4 gap-2 mb-10 backdrop-blur-sm p-1 rounded-xl max-w-2xl mx-auto border shadow-sm ${
            isDark 
              ? 'bg-slate-800/90 border-slate-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id} 
                className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all flex items-center gap-2"
              >
                {category.icon}
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
              >
                {category.skills.map((skill, index) => (
                  <SkillCard 
                    key={skill.name} 
                    skill={skill} 
                    index={index} 
                    proficiency={skill.proficiency}
                    category={category.id}
                    isDark={isDark}
                  />
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className={`mt-16 backdrop-blur-sm border rounded-xl p-6 shadow-sm ${
            isDark 
              ? 'bg-slate-800/90 border-slate-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            <Zap className={`h-6 w-6 mr-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Technical Expertise</h3>
          </div>
          <p className={`text-center max-w-2xl mx-auto mb-6 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            I specialize in building modern web applications with a focus on clean code, 
            responsive design, and optimal performance. My experience spans both frontend 
            and backend technologies, allowing me to create complete solutions from concept to deployment.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { title: "Frontend Dev", value: "80%", icon: <Code className="w-5 h-5" /> },
              { title: "Backend Dev", value: "75%", icon: <Server className="w-5 h-5" /> },
              { title: "Database Design", value: "85%", icon: <Database className="w-5 h-5" /> },
              { title: "DevOps", value: "70%", icon: <Wrench className="w-5 h-5" /> }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                viewport={{ once: true }}
                className={`rounded-xl p-4 text-center border ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-slate-700/50' 
                    : 'bg-gradient-to-br from-blue-50 to-purple-50 border-gray-200/50'
                }`}
              >
                <div className={`flex justify-center mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {item.icon}
                </div>
                <div className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</div>
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.title}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {["Responsive Design", "RESTful APIs", "CI/CD", "Testing", "Agile Methodology", "Performance Optimization"].map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-1 ${
                  isDark 
                    ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 text-blue-300 border-blue-800/30' 
                    : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}