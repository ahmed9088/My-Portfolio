"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Code,
  Server,
  Database,
  Wrench,
  Zap,
} from "lucide-react";
import { useTheme } from "./theme-provider";

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

const categories = [
  {
    id: "frontend",
    name: "Frontend",
    icon: <Code className="w-4 h-4" />,
    skills: [
      { name: "React", icon: techIcons.react },
      { name: "Angular", icon: techIcons.angular },
      { name: "TypeScript", icon: techIcons.typescript },
      { name: "JavaScript", icon: techIcons.javascript },
      { name: "Tailwind", icon: techIcons.tailwind },
      { name: "HTML/CSS", icon: techIcons.html },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: <Server className="w-4 h-4" />,
    skills: [
      { name: "Java", icon: techIcons.java },
      { name: "PHP", icon: techIcons.php },
      { name: "Laravel", icon: techIcons.laravel },
      { name: "Python", icon: techIcons.python },
    ],
  },
  {
    id: "infra",
    name: "Infra",
    icon: <Wrench className="w-4 h-4" />,
    skills: [
      { name: "Git", icon: techIcons.git },
      { name: "Docker", icon: techIcons.docker },
      { name: "Kubernetes", icon: techIcons.kubernetes },
      { name: "AWS", icon: techIcons.aws },
    ],
  },
];

export default function TechStack() {
  const { mounted } = useTheme();
  if (!mounted) return null;

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="container px-6 relative z-10 mx-auto max-w-5xl">
        <header className="mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">STACK</h2>
          <p className="text-muted-foreground text-lg font-light max-w-xl mx-auto">
            A bridge between design and engineering. My toolkit for building scalable digital solutions.
          </p>
        </header>

        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="flex justify-center bg-transparent gap-4 mb-16 h-auto p-0">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="px-8 py-4 rounded-full border-2 data-[state=active]:bg-foreground data-[state=active]:text-background transition-all font-bold"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0 outline-none">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {cat.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center p-5 group-hover:scale-110 transition-transform duration-500">
                      <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <span className="text-sm font-bold opacity-60 group-hover:opacity-100 transition-opacity">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}