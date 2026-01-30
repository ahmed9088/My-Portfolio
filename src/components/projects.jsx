"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, useScroll, useSpring, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Github, ExternalLink, Star, GitFork, Calendar, ArrowRight, Code2 } from "lucide-react";
import { useTheme } from "./theme-provider";
import Magnetic from "./ui/Magnetic";

const FALLBACK_REPOS = [
  {
    id: 1,
    name: "My-Portfolio",
    description: "Personal portfolio website showcasing my work and skills. Built with React and lots of coffee.",
    language: "React",
    stargazers_count: 12,
    forks_count: 4,
    updated_at: new Date().toISOString(),
    html_url: "https://github.com/ahmed9088/My-Portfolio",
    homepage: "https://ahmed-saffar.vercel.app"
  },
  {
    id: 2,
    name: "Web-Projects",
    description: "Collection of small web experiments and learning projects. Some good, some... learning experiences!",
    language: "JavaScript",
    stargazers_count: 8,
    forks_count: 2,
    updated_at: new Date().toISOString(),
    html_url: "https://github.com/ahmed9088",
    homepage: null
  },
  {
    id: 3,
    name: "Code-Playground",
    description: "Where I test new ideas and break things before building them properly.",
    language: "TypeScript",
    stargazers_count: 5,
    forks_count: 1,
    updated_at: new Date().toISOString(),
    html_url: "https://github.com/ahmed9088",
    homepage: null
  }
];

function ProjectCard({ repo, index, isDark, isFeatured }) {
  const cardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobile ? 0 : (index % 2 === 0 ? -100 : 100)]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const previewUrl = repo.homepage
    ? `https://api.microlink.io?url=${encodeURIComponent(repo.homepage)}&screenshot=true&meta=false&embed=screenshot.url`
    : null;

  return (
    <motion.div
      ref={cardRef}
      style={{ y: yParallax, opacity }}
      className={`h-full ${isFeatured ? "md:col-span-2" : ""}`}
      data-cursor="project"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="h-full"
      >
        <Card className="h-full flex flex-col glass-card overflow-hidden relative group transition-all duration-500 hover:border-primary/30">
          {/* Depth Map Shimmer */}
          {!isMobile && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                x: useTransform(x, [-300, 300], [-30, 30]),
                y: useTransform(y, [-300, 300], [-30, 30]),
              }}
            />
          )}

          <div className="relative aspect-video overflow-hidden border-b border-white/5">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={repo.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => e.target.style.display = 'none'}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10">
                <Code2 className="h-12 w-12 opacity-20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            <div className="absolute top-4 right-4 z-20">
              <Badge className={`${repo.homepage ? 'bg-primary' : 'bg-white/5 opacity-50'} border-none px-3 py-1 text-[8px] font-black uppercase tracking-widest text-white`}>
                {repo.homepage ? 'Live Artifact' : 'Source Protocol'}
              </Badge>
            </div>
          </div>

          <CardContent className="p-8 md:p-10 flex-grow relative z-10 text-left">
            <h3 className="font-black tracking-tightest text-2xl md:text-3xl mb-4 uppercase">
              {repo.name.replace(/-/g, ' ')}
            </h3>
            <p className="text-muted-foreground mb-8 text-sm md:text-base font-light leading-relaxed line-clamp-3 italic serif">
              {repo.description || "A custom-engineered digital solution focused on performance and user experience."}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {repo.language && (
                <span className="px-3 py-1 rounded-full border border-primary/20 text-[9px] font-bold uppercase tracking-widest opacity-60">
                  {repo.language}
                </span>
              )}
            </div>
            <div className="flex items-center gap-6 opacity-40 text-[10px] font-mono uppercase tracking-widest">
              <div className="flex items-center gap-2"><Star className="h-3 w-3" /> {repo.stargazers_count}</div>
              <div className="flex items-center gap-2"><GitFork className="h-3 w-3" /> {repo.forks_count}</div>
            </div>
          </CardContent>

          <CardFooter className="p-8 md:p-10 pt-0 flex justify-between items-center relative z-10 mt-auto">
            <div className="text-[10px] opacity-20 font-mono tracking-[0.2em] uppercase">
              {new Date(repo.updated_at).getFullYear()} // ARCHIVE
            </div>
            <div className="flex gap-4">
              <Magnetic>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-border hover:bg-primary hover:text-white transition-all">
                  <Github className="h-5 w-5" />
                </a>
              </Magnetic>
              {repo.homepage && (
                <Magnetic>
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-primary text-white hover:scale-110 transition-all">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </Magnetic>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { mounted } = useTheme();

  const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "ahmed9088";
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
          headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
        });
        const sortedRepos = res.data
          .filter(r => !r.archived)
          .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count));

        if (sortedRepos.length === 0) {
          setRepos(FALLBACK_REPOS);
        } else {
          setRepos(sortedRepos);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching repos:", err);
        setRepos(FALLBACK_REPOS);
        setLoading(false);
      }
    };
    fetchRepos();
  }, [GITHUB_USERNAME, GITHUB_TOKEN]);

  if (!mounted) return null;

  return (
    <section id="projects" className="py-24 md:py-40 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container px-6 relative z-10 mx-auto max-w-7xl">
        <header className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left mb-8"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              My Projects
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              A few things I've built recently. Check them out and let me know what you think!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end"
          >
            <Magnetic>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm md:text-base font-semibold hover:text-primary transition-colors py-3 px-6 rounded-full border border-border hover:border-primary/50"
              >
                View More on GitHub
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
          </motion.div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className={`aspect-[4/5] bg-muted/20 animate-pulse rounded-[2rem] ${i === 1 ? "md:col-span-2" : ""}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {repos.slice(0, 5).map((repo, idx) => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                index={idx}
                isDark={false}
                isFeatured={idx === 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
