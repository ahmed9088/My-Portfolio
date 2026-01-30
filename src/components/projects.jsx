"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Github, ExternalLink, Star, GitFork, Calendar, ArrowRight, Code2 } from "lucide-react";
import { useTheme } from "./theme-provider";
import Magnetic from "./ui/Magnetic";

function ProjectCard({ repo, index, isDark, isFeatured }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className={`h-full ${isFeatured ? "md:col-span-2" : ""}`}
    >
      <Card className={`h-full flex flex-col glass-card overflow-hidden relative group transition-all duration-500 ${isHovered ? "shadow-primary/20 scale-[1.02]" : ""}`}>
        <div className="shimmer-overlay" />

        <CardContent className="p-8 md:p-10 flex-grow relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Code2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className={`font-bold tracking-tight ${isFeatured ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                  {repo.name}
                </h3>
                {repo.fork && <Badge variant="outline" className="text-[10px] mt-1 opacity-50 uppercase tracking-widest">Forked Project</Badge>}
              </div>
            </div>
          </div>

          <p className={`text-muted-foreground mb-10 font-light leading-relaxed ${isFeatured ? "text-xl max-w-2xl" : "text-lg line-clamp-2"}`}>
            {repo.description || "A custom-engineered digital solution focused on performance and user experience."}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {repo.language && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none rounded-full px-4 py-1.5 text-sm">
                {repo.language}
              </Badge>
            )}
            {repo.topics?.slice(0, 3).map(topic => (
              <Badge key={topic} variant="outline" className="rounded-full px-4 py-1.5 text-sm opacity-60">
                {topic}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-8 opacity-60 text-sm font-medium">
            <div className="flex items-center gap-2"><Star className={`h-5 w-5 ${repo.stargazers_count > 0 ? "text-yellow-500 fill-yellow-500" : ""}`} /> {repo.stargazers_count} stars</div>
            {repo.forks_count > 0 && <div className="flex items-center gap-2"><GitFork className="h-5 w-5" /> {repo.forks_count} forks</div>}
          </div>
        </CardContent>

        <CardFooter className="p-8 md:p-10 pt-0 flex justify-between items-center relative z-10 mt-auto">
          <div className="flex items-center gap-2 text-xs opacity-40 font-mono tracking-wider">
            <Calendar className="h-4 w-4" />
            {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
          </div>
          <div className="flex gap-3">
            <Magnetic>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="GitHub Repository"
              >
                <Github className="h-6 w-6" />
              </a>
            </Magnetic>
            {repo.homepage && (
              <Magnetic>
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Live Demo"
                >
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
          headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
        });
        const sortedRepos = res.data
          .filter(r => !r.archived && !r.fork)
          .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count));
        setRepos(sortedRepos);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching repos:", err);
        setLoading(false);
      }
    };
    fetchRepos();
  }, [GITHUB_USERNAME, GITHUB_TOKEN]);

  if (!mounted) return null;

  return (
    <section id="projects" className="py-40 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container px-6 relative z-10 mx-auto max-w-7xl">
        <header className="mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-mono text-xs uppercase tracking-[0.4em] mb-6 block">
              <span className="opacity-50">03 //</span> SELECTED PRODUCTIONS
            </span>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-10">
              PROJECTS
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-12"
          >
            <p className="max-w-xl text-muted-foreground text-xl md:text-2xl font-light leading-relaxed">
              Merging technical excellence with purposeful design. A collection of experimental digital products and open-source contributions.
            </p>

            <Magnetic>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors py-4 px-8 rounded-full border border-primary/20 hover:border-primary/50"
              >
                View all on GitHub
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {repos.slice(0, 5).map((repo, idx) => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                index={idx}
                isDark={isDark}
                isFeatured={idx === 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
