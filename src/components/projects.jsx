"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, ExternalLink, Star, GitFork, Calendar, Code, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useTheme } from "./theme-provider"; // Import the useTheme hook

// Professional Particle class for Projects section
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

// Professional Canvas component for Projects section
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

// Project Card Component
function ProjectCard({ repo, index, isDark }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Spotlight effect
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    setMouseX(e.clientX - left);
    setMouseY(e.clientY - top);
  };

  // 3D Tilt effect using motion values for better performance
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleTilt = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="h-full perspective-1000"
      onMouseMove={(e) => {
        handleMouseMove(e);
        handleTilt(e);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
    >
      <Card className={`h-full flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-sm overflow-hidden relative ${isDark
          ? 'border-slate-700/50 bg-slate-800/90'
          : 'border-gray-200/50 bg-white/90'
        } ${isHovered ? 'ring-2 ring-blue-500/50' : ''}`}>

        {/* Spotlight Effect Layer */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)'}, transparent 40%)`
          }}
        />

        <CardContent className="p-5 flex-grow relative z-10" style={{ transform: "translateZ(50px)" }}>
          <div className="flex justify-between items-start mb-3">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{repo.name}</h3>
            {repo.fork && (
              <Badge variant="outline" className={`text-xs ${isDark
                  ? 'bg-amber-900/20 text-amber-300 border-amber-800/30'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                Fork
              </Badge>
            )}
          </div>
          <p className={`text-sm mb-4 line-clamp-3 ${isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
            {repo.description || "No description provided"}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.language && (
              <Badge variant="secondary" className={`text-xs ${isDark
                  ? 'bg-blue-900/20 text-blue-300'
                  : 'bg-blue-50 text-blue-700'
                }`}>
                {repo.language}
              </Badge>
            )}
            {repo.topics && repo.topics.slice(0, 3).map((topic, i) => (
              <Badge key={i} variant="outline" className={`text-xs ${isDark
                  ? 'border-slate-600'
                  : 'border-gray-200'
                }`}>
                {topic}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className={`flex items-center gap-4 text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              <span>{repo.stargazers_count}</span>
            </div>
            {repo.forks_count > 0 && (
              <div className="flex items-center gap-1">
                <GitFork className="h-3 w-3" />
                <span>{repo.forks_count}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0 flex justify-between items-center relative z-10" style={{ transform: "translateZ(30px)" }}>
          <div className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
            <Calendar className="h-3 w-3" />
            <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline" className={`gap-1 ${isDark
                ? 'border-slate-600 hover:bg-slate-700'
                : 'border-gray-300/50 hover:bg-gray-100'
              }`}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
            {repo.homepage && (
              <Button asChild size="sm" variant="outline" className={`gap-1 ${isDark
                  ? 'border-slate-600 hover:bg-slate-700'
                  : 'border-gray-300/50 hover:bg-gray-100'
                }`}>
                <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [repos, setRepos] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the theme context
  const { isDark, mounted } = useTheme();

  // Environment variables
  const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });

        // Filter out archived repos and sort by last updated
        const filteredRepos = response.data
          .filter(repo => !repo.archived)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        setRepos(filteredRepos);

        // Generate unique categories from repo topics
        const allTopics = ["All", ...new Set(filteredRepos.flatMap((repo) => repo.topics || []))];
        setCategories(allTopics);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching GitHub repos:", err);
        setError("Failed to fetch repositories.");
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const filteredRepos = () => {
    if (activeTab === "All") return repos;
    return repos.filter((repo) => repo.topics && repo.topics.includes(activeTab));
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden min-h-screen">
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
          className="flex flex-col items-center text-center mb-16"
        >
          <Badge variant="outline" className={`mb-4 px-4 py-1.5 text-sm backdrop-blur-sm shadow-sm ${isDark
              ? 'border-slate-700/50 bg-slate-800/90'
              : 'border-gray-300/50 bg-white/90'
            }`}>
            My GitHub
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Featured Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6" />
          <p className={`max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Explore my GitHub repositories with dynamic filtering and seamless UI experience.
          </p>
        </motion.div>

        {/* Tabs for Repository Categories */}
        <Tabs defaultValue="All" onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid grid-cols-2 md:grid-cols-4 gap-2 mb-10 backdrop-blur-sm p-1 rounded-xl max-w-2xl mx-auto border shadow-sm ${isDark
              ? 'bg-slate-800/90 border-slate-700/50'
              : 'bg-white/90 border-gray-200/50'
            }`}>
            {categories.slice(0, 8).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Repository Content */}
          <TabsContent value={activeTab} className="mt-0">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className={isDark ? "text-red-400" : "text-red-500"}>{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            ) : filteredRepos().length === 0 ? (
              <div className="text-center py-12">
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>No repositories found in this category.</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRepos()
                    .slice(0, showAll ? filteredRepos().length : 6)
                    .map((repo, index) => (
                      <ProjectCard key={repo.id} repo={repo} index={index} isDark={isDark} />
                    ))}
                </div>

                {/* Show More/Show Less Button */}
                {filteredRepos().length > 6 && (
                  <div className="flex justify-center mt-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => setShowAll(!showAll)}
                        variant="outline"
                        className={`gap-2 ${isDark
                            ? 'border-slate-600 hover:bg-slate-700'
                            : 'border-gray-300/50 hover:bg-gray-100'
                          }`}
                      >
                        {showAll ? (
                          <>
                            Show Less
                          </>
                        ) : (
                          <>
                            Show More
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* GitHub Stats */}
        {!loading && !error && repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className={`mt-16 backdrop-blur-sm border rounded-xl p-6 shadow-sm ${isDark
                ? 'bg-slate-800/90 border-slate-700/50'
                : 'bg-white/90 border-gray-200/50'
              }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <Github className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>GitHub Profile</h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                    {GITHUB_USERNAME} • {repos.length} repositories
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-center">
                  <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Stars</div>
                </div>
                <div className="text-center">
                  <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {repos.reduce((sum, repo) => sum + repo.forks_count, 0)}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Forks</div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    View Profile
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}