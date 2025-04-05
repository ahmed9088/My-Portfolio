"use client"

import { useRef } from "react"
import { Badge } from "./ui/badge"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  GraduationCap, 
  School, 
  Code2, 
  Building2, 
  BookOpen,
  BrainCircuit,
  ExternalLink 
} from "lucide-react"

export default function Education() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const timelineItems = [
    {
      period: "November 2022 - April 2025",
      title: "Advanced Diploma in Software Engineering (ADSE) - Aptech Defence",
      description:
        "Studying Advanced Software Development techniques, including technologies like HTML, CSS, PHP, Laravel, Flutter, and MySQL. Gained comprehensive knowledge of Agile & DevOps methodologies.",
      icon: (
        <a href="https://www.aptech-education.com.pk/" target="_blank" rel="noopener noreferrer">
          <Code2 className="h-6 w-6" />
        </a>
      ),
      iconBg: "from-blue-600 to-blue-400",
      delay: 0.2,
      link: "https://www.aptech-education.com.pk/",
    },
    {
      period: "January 2024 - Present",
      title: "Computer Science (BS) - Government College University, Hyderabad",
      description:
        "Currently pursuing a Bachelor's degree in Computer Science. Focused on Programming Fundamentals, Object-Oriented Programming, Data Structures, Mathematics, and Digital Logic Design.",
      icon: (
        <a href="https://gcue.edu.pk/" target="_blank" rel="noopener noreferrer">
          <GraduationCap className="h-6 w-6" />
        </a>
      ),
      iconBg: "from-emerald-600 to-emerald-400",
      delay: 0.3,
      link: "https://gcue.edu.pk/",
    },
    {
      period: "June 2023 - January 2024",
      title: "PHP Developer - Aptech Defence",
      description:
        "Mentored students in Practical PHP Development and enhanced course materials. Delivered innovative web solutions while assisting peers in projects.",
      icon: (
        <a href="https://www.aptech-education.com.pk/" target="_blank" rel="noopener noreferrer">
          <Building2 className="h-6 w-6" />
        </a>
      ),
      iconBg: "from-purple-600 to-purple-400",
      delay: 0.4,
      link: "https://www.aptech-education.com.pk/",
    },
    {
      period: "July 2023 - Present",
      title: "Freelancer - Fiverr / Upwork / PeoplePerHour",
      description:
        "Worked on projects like custom website development, database optimization, API integrations, and UI/UX design improvements. Delivered high-quality solutions to international clients.",
      icon: (
        <a href="https://www.fiverr.com/" target="_blank" rel="noopener noreferrer">
          <BookOpen className="h-6 w-6" />
        </a>
      ),
      iconBg: "from-red-600 to-red-400",
      delay: 0.5,
      link: "https://www.fiverr.com/",
    },
  ]

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/70 to-black/80" />

      {/* Glowing Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <motion.div ref={containerRef} style={{ opacity }} className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.5,
            }}
            className="inline-block"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/20">
              Educational Journey
            </Badge>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400">
            Education & Experience
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6 rounded-full"
          />
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: item.delay,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative flex flex-col md:flex-row items-start mb-16 group"
            >
              {/* Timeline Line */}
              {index < timelineItems.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1.5, delay: item.delay + 0.3 }}
                  viewport={{ once: true }}
                  className="absolute left-8 top-16 w-1 bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-transparent bottom-0 hidden md:block"
                />
              )}

              {/* Icon with Pulse Effect */}
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.iconBg} p-3 flex items-center justify-center text-white shadow-lg relative`}
                >
                  {item.icon}
                </motion.div>
              </div>

              {/* Content Card */}
              <div className="ml-0 md:ml-8 flex-1 mt-4 md:mt-0">
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Period Badge */}
                  {item.period && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-purple-300 mb-3">
                      {item.period}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    {item.title}
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 ml-2 text-blue-400" />
                    </a>
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
