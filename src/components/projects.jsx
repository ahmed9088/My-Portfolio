import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Github, ExternalLink, Star, GitFork, ArrowRight, Code2 } from "lucide-react";

const FALLBACK_REPOS = [
  {
    id: 1,
    name: "My-Portfolio",
    description: "Personal portfolio website showcasing my work and skills. Built with React and Tailwind CSS.",
    language: "React",
    stargazers_count: 12,
    forks_count: 4,
    updated_at: new Date().toISOString(),
    html_url: "https://github.com/ahmed9088/My-Portfolio",
    homepage: "https://itsahmed.tech",
  },
  {
    id: 2,
    name: "Web-Projects",
    description: "Collection of web experiments and learning projects built with modern technologies.",
    language: "JavaScript",
    stargazers_count: 8,
    forks_count: 2,
    updated_at: new Date().toISOString(),
    html_url: "https://github.com/ahmed9088",
    homepage: null,
  },
  {
    id: 3,
    name: "Code-Playground",
    description: "A space for testing new ideas and building prototypes with cutting-edge tools.",
    language: "TypeScript",
    stargazers_count: 5,
    forks_count: 1,
    updated_at: new Date().toISOString(),
    html_url: "https://github.com/ahmed9088",
    homepage: null,
  },
];

const langColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Dart: "#00B4AB",
  React: "#61DAFB",
  "Jupyter Notebook": "#DA5B0B",
};

function ProjectCard({ repo, index }) {
  const previewUrl = repo.homepage
    ? `https://api.microlink.io?url=${encodeURIComponent(repo.homepage)}&screenshot=true&meta=false&embed=screenshot.url`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true }}
      className={`${index === 0 ? "md:col-span-2" : ""}`}
    >
      <article className="card-dark overflow-hidden h-full flex flex-col group">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted/20">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={`Preview of ${repo.name} project`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5">
              <Code2 className="h-12 w-12 text-muted-foreground/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

          {/* Live badge */}
          {repo.homepage && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
                Live
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {repo.name.replace(/-/g, " ")}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
            {repo.description || "A custom-engineered digital solution."}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: langColors[repo.language] || "#888" }}
                  />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                {repo.forks_count}
              </span>
            </div>

            <div className="flex gap-2">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
                aria-label={`View ${repo.name} on GitHub`}
              >
                <Github className="h-4 w-4" />
              </a>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary text-primary-foreground hover:brightness-110 transition-all"
                  aria-label={`Visit ${repo.name} live site`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "ahmed9088";
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await axios.get(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
          {
            headers: GITHUB_TOKEN
              ? { Authorization: `token ${GITHUB_TOKEN}` }
              : {},
          }
        );
        const sortedRepos = res.data
          .filter((r) => !r.archived)
          .sort(
            (a, b) =>
              b.stargazers_count +
              b.forks_count -
              (a.stargazers_count + a.forks_count)
          );

        setRepos(sortedRepos.length > 0 ? sortedRepos : FALLBACK_REPOS);
      } catch (err) {
        console.error("Error fetching repos:", err);
        setRepos(FALLBACK_REPOS);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [GITHUB_USERNAME, GITHUB_TOKEN]);

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Projects</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Recent
              <br />
              <span className="text-muted-foreground">work</span>
            </h2>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            viewport={{ once: true }}
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm self-start md:self-auto"
          >
            View All on GitHub
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`aspect-[4/5] bg-card animate-pulse rounded-3xl ${
                  i === 1 ? "md:col-span-2" : ""
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.slice(0, 5).map((repo, idx) => (
              <ProjectCard key={repo.id} repo={repo} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
