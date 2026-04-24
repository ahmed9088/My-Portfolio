import { motion } from "framer-motion";

const techIcons = {
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  next: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  php: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  wordpress: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
};

const skills = [
  { name: "React", icon: techIcons.react, level: 92 },
  { name: "Next.js", icon: techIcons.next, level: 88 },
  { name: "TypeScript", icon: techIcons.typescript, level: 85 },
  { name: "Node.js", icon: techIcons.node, level: 90 },
  { name: "Laravel", icon: techIcons.laravel, level: 88 },
  { name: "Flutter", icon: techIcons.flutter, level: 80 },
  { name: "Python", icon: techIcons.python, level: 75 },
  { name: "PostgreSQL", icon: techIcons.postgresql, level: 82 },
  { name: "MongoDB", icon: techIcons.mongodb, level: 80 },
  { name: "Tailwind", icon: techIcons.tailwind, level: 95 },
  { name: "Docker", icon: techIcons.docker, level: 70 },
  { name: "Figma", icon: techIcons.figma, level: 85 },
  { name: "Firebase", icon: techIcons.firebase, level: 78 },
  { name: "Git", icon: techIcons.git, level: 90 },
  { name: "WordPress", icon: techIcons.wordpress, level: 82 },
  { name: "PHP", icon: techIcons.php, level: 85 },
];

export default function TechStack() {
  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="section-label">Skills</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Technologies I
            <br />
            <span className="text-muted-foreground">work with</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              viewport={{ once: true }}
              className="card-dark p-5 group hover:border-primary/40"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 p-1.5 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <img
                    src={skill.icon}
                    alt={`${skill.name} icon`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="text-sm font-bold block">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">{skill.level}%</span>
                </div>
              </div>
              <div className="skill-bar-bg">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
