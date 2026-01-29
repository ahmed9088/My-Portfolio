"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import axios from "axios";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, ExternalLink, Star, GitFork, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useTheme } from "./theme-provider";

function ProjectCard({ repo, index, isDark }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleTilt = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - (left + width / 2));
    y.set(e.clientY - (top + height / 2));
  };

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)'}, transparent 40%)`
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={(e) => { handleMouseMove(e); handleTilt(e); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="h-full"
    >
      <Card className="h-full flex flex-col border-white/10 glass overflow-hidden relative group">
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ background, opacity: isHovered ? 1 : 0 }}
        />

        <CardContent className="p-8 flex-grow relative z-10">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold tracking-tight">{repo.name}</h3>
            {repo.fork && <Badge variant="outline" className="text-[10px] uppercase tracking-widest opacity-50">Fork</Badge>}
          </div>

          <p className="text-muted-foreground mb-8 line-clamp-2 font-light text-lg">
            {repo.description || "Experimental digital product and research."}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {repo.language && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none rounded-full px-3 py-1">
                {repo.language}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-6 opacity-40 text-sm">
            <div className="flex items-center gap-1.5"><Star className="h-4 w-4" /> {repo.stargazers_count}</div>
            {repo.forks_count > 0 && <div className="flex items-center gap-1.5"><GitFork className="h-4 w-4" /> {repo.forks_count}</div>}
          </div>
        </CardContent>

        <CardFooter className="p-8 pt-0 flex justify-between items-center relative z-10">
          <p className="text-xs opacity-30 font-mono tracking-tighter">
            {new Date(repo.updated_at).getFullYear()} / REPOSITORY
          </p>
          <div className="flex gap-4">
            <Magnetic>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="p-2 hover:text-primary transition-colors">
                <Github className="h-6 w-6" />
              </a>
            </Magnetic>
            {repo.homepage && (
              <Magnetic>
                <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="p-2 hover:text-primary transition-colors">
                  <ExternalLink className="h-6 w-6" />
                </a>
              </Magnetic>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark, mounted } = useTheme();

  const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
          headers: { Authorization: `token ${GITHUB_TOKEN}` },
        });
        setRepos(res.data.filter(r => !r.archived).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  if (!mounted) return null;

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="container px-6 relative z-10 mx-auto max-w-7xl">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4 block underline underline-offset-8">Selected Works</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">PROJECTS</h2>
          </div>
          <p className="max-w-xs text-muted-foreground text-lg font-light leading-relaxed">
            A curated selection of my work on GitHub, ranging from tools to large-scale applications.
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-[2rem]" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.slice(0, 6).map((repo, idx) => (
              <ProjectCard key={repo.id} repo={repo} index={idx} isDark={isDark} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}