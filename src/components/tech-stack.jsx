"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Online icons for maximum tech stack
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
}

// Skill Card Component
function SkillCard({ skill, index, proficiency = 85 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-full aspect-square max-w-[120px] rounded-xl bg-card border border-border/50 p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group"
      >
        <img src={skill.icon} alt={skill.name} className="w-12 h-12 object-contain" />
        <span className="text-sm font-medium">{skill.name}</span>
        <Progress value={proficiency} className="absolute bottom-0 left-0 w-full h-1" />
      </motion.div>
    </motion.div>
  )
}

// Main TechStack Component
export default function TechStack() {
  const categories = [
    {
      id: "frontend",
      name: "Frontend",
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
      skills: [
        { name: "Git", icon: techIcons.git, proficiency: 90 },
        { name: "Docker", icon: techIcons.docker, proficiency: 80 },
        { name: "Kubernetes", icon: techIcons.kubernetes, proficiency: 70 },
        { name: "AWS", icon: techIcons.aws, proficiency: 75 },
        { name: "Figma", icon: techIcons.figma, proficiency: 85 },
      ],
    },
  ]

  const [activeTab, setActiveTab] = useState(categories[0].id)

  return (
    <section id="tech" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <Badge className="mb-4 px-4 py-1">My Tech Skills</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Technology Stack</h2>
        </div>

        <Tabs defaultValue={categories[0].id} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {category.skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} proficiency={skill.proficiency} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
