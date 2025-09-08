"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useToast } from "./ui/use-toast";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Linkedin, 
  Github, 
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  User,
  AtSign
} from "lucide-react";
import { useTheme } from "./theme-provider"; // Import the useTheme hook

// Professional Particle class for Contact section
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

// Professional Canvas component for Contact section
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

// Contact Info Card Component
function ContactInfoCard({ item, index, isDark }) {
  return (
    <motion.a
      href={item.link}
      target={item.title === "Location" ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="flex items-start gap-4 group"
    >
      <motion.div 
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
          isDark 
            ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 text-blue-400 border-blue-800/30' 
            : 'bg-gradient-to-br from-blue-50 to-purple-50 text-blue-600 border-blue-100'
        }`}
        whileHover={{ 
          scale: 1.1,
          background: isDark 
            ? "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))" 
            : "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))"
        }}
      >
        {item.icon}
      </motion.div>
      <div>
        <h4 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.title}</h4>
        <p className={`text-base group-hover:transition-colors ${
          isDark 
            ? 'text-white group-hover:text-blue-400' 
            : 'text-gray-900 group-hover:text-blue-600'
        }`}>
          {item.value}
        </p>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  
  // Use the theme context
  const { isDark, mounted } = useTheme();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFocus = (field) => {
    setFocusedField(field);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append("access_key", "3aa15a33-2b36-4eb9-9859-b55b7a6d76d2");
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("message", formData.message);
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      }).then((res) => res.json());
      
      if (response.success) {
        toast({
          title: (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Message sent!</span>
            </div>
          ),
          description: "Thank you for reaching out. I'll get back to you soon.",
          variant: "default",
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span>Error</span>
          </div>
        ),
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "memon1ahmed@gmail.com",
      link: "mailto:memon1ahmed@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      value: "+92 307 3762276",
      link: "tel:+923073762276",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      value: "Hyderabad, Pakistan",
      link: "https://maps.google.com/?q=Hyderabad,Pakistan",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: "LinkedIn",
      value: "linkedin.com/in/ahmed-saffar-memon",
      link: "https://www.linkedin.com/in/ahmed-saffar-memon-b26298294",
    },
    {
      icon: <Github className="h-5 w-5" />,
      title: "GitHub",
      value: "github.com/ahmed9088",
      link: "https://github.com/ahmed9088",
    },
  ];
  
  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return null;
  
  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden min-h-screen">
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
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <Badge variant="outline" className={`mb-4 px-4 py-1.5 text-sm backdrop-blur-sm shadow-sm ${
            isDark 
              ? 'border-slate-700/50 bg-slate-800/90' 
              : 'border-gray-300/50 bg-white/90'
          }`}>
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Contact Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8" />
          <p className={`max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Have a question or want to work together? Feel free to reach out to me using the form below.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className={`h-full backdrop-blur-sm border shadow-sm overflow-hidden ${
              isDark 
                ? 'bg-slate-800/90 border-slate-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Information</h3>
                </div>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <ContactInfoCard key={index} item={item} index={index} isDark={isDark} />
                  ))}
                </div>
                
                {/* Social Links */}
                <div className={`mt-8 pt-6 border-t ${
                  isDark ? 'border-slate-700/50' : 'border-gray-200/50'
                }`}>
                  <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Connect with me</h4>
                  <div className="flex gap-3">
                    {contactInfo.slice(3).map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isDark 
                            ? 'text-gray-300 bg-slate-700' 
                            : 'text-gray-600 bg-gray-100'
                        }`}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className={`h-full backdrop-blur-sm border shadow-sm overflow-hidden ${
              isDark 
                ? 'bg-slate-800/90 border-slate-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <Send className="h-5 w-5 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Send Me a Message</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <motion.div 
                      className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${
                        focusedField === 'name' 
                          ? (isDark ? 'text-blue-400' : 'text-blue-600') 
                          : (isDark ? 'text-gray-400' : 'text-gray-400')
                      }`}
                      animate={{ scale: focusedField === 'name' ? 1.1 : 1 }}
                    >
                      <User className="h-5 w-5" />
                    </motion.div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      required
                      className={`pl-10 border focus:border-blue-500 dark:focus:border-blue-400 ${
                        isDark 
                          ? 'bg-slate-800/50 border-slate-600' 
                          : 'bg-white/50 border-gray-300/50'
                      }`}
                    />
                  </div>
                  
                  <div className="relative">
                    <motion.div 
                      className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${
                        focusedField === 'email' 
                          ? (isDark ? 'text-blue-400' : 'text-blue-600') 
                          : (isDark ? 'text-gray-400' : 'text-gray-400')
                      }`}
                      animate={{ scale: focusedField === 'email' ? 1.1 : 1 }}
                    >
                      <AtSign className="h-5 w-5" />
                    </motion.div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      required
                      className={`pl-10 border focus:border-blue-500 dark:focus:border-blue-400 ${
                        isDark 
                          ? 'bg-slate-800/50 border-slate-600' 
                          : 'bg-white/50 border-gray-300/50'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      required
                      rows={5}
                      className={`border focus:border-blue-500 dark:focus:border-blue-400 resize-none ${
                        isDark 
                          ? 'bg-slate-800/50 border-slate-600' 
                          : 'bg-white/50 border-gray-300/50'
                      }`}
                    />
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className={`inline-block backdrop-blur-sm border rounded-xl p-6 shadow-sm max-w-2xl ${
            isDark 
              ? 'bg-slate-800/90 border-slate-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <h3 className={`font-semibold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Response Time</h3>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              I typically respond to messages within 24-48 hours. For urgent inquiries, 
              please consider reaching out via phone or LinkedIn for a faster response.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}