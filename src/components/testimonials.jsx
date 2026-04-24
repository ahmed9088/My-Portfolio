import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Hamza Ali Khan",
    role: "Startup Founder",
    platform: "Upwork",
    rating: 5,
    text: "Ahmed built our entire SaaS platform from scratch. His code quality is exceptional and he always delivers on time. The React frontend he built is blazing fast and the Node.js backend handles thousands of requests without breaking a sweat. Highly recommend!",
    avatar: "HK",
  },
  {
    name: "Fatima Zahra Sheikh",
    role: "E-commerce Business Owner",
    platform: "Fiverr",
    rating: 5,
    text: "I needed a complete Shopify + custom Laravel dashboard for my online store. Ahmed delivered beyond expectations — the design was beautiful, the admin panel was intuitive, and he even added features I hadn't thought of. Will definitely work with him again.",
    avatar: "FS",
  },
  {
    name: "Muhammad Bilal Raza",
    role: "Marketing Agency Director",
    platform: "LinkedIn",
    rating: 5,
    text: "We've hired Ahmed for multiple projects now — from WordPress sites to full React applications. His communication is excellent, he understands requirements quickly, and his attention to detail is impressive. He's become our go-to developer.",
    avatar: "BR",
  },
  {
    name: "Ayesha Noor Malik",
    role: "Healthcare Startup CEO",
    platform: "Facebook",
    rating: 5,
    text: "Ahmed developed a patient management system for our clinic using Next.js and PostgreSQL. The app is fast, secure, and our staff loves using it. He also trained our team on how to manage it. Professional and reliable!",
    avatar: "AM",
  },
  {
    name: "Usman Tariq Qureshi",
    role: "Real Estate Developer",
    platform: "Upwork",
    rating: 5,
    text: "I was struggling to find a developer who could build a property listing platform with map integration and Flutter mobile app. Ahmed delivered both perfectly. His full-stack skills are no joke — frontend, backend, and mobile, all top quality.",
    avatar: "UQ",
  },
  {
    name: "Sana Batool Rizvi",
    role: "EdTech Founder",
    platform: "Fiverr",
    rating: 5,
    text: "Ahmed created an online learning platform for us with video streaming, quiz modules, and payment integration. He used Laravel on the backend and React on the frontend. The site handles 500+ students daily without any issues. Amazing work!",
    avatar: "SR",
  },
];

const platformColors = {
  Upwork: "bg-green-500/15 text-green-400",
  Fiverr: "bg-emerald-500/15 text-emerald-400",
  LinkedIn: "bg-blue-500/15 text-blue-400",
  Facebook: "bg-sky-500/15 text-sky-400",
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="section-label">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            What my clients
            <br />
            <span className="text-muted-foreground">say about me</span>
          </h2>
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          viewport={{ once: true }}
          className="card-dark p-8 md:p-12 mb-8 relative overflow-hidden"
        >
          <Quote className="absolute top-6 right-6 w-16 h-16 text-primary/10" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-8 max-w-3xl">
                "{testimonials[current].text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  {testimonials[current].avatar}
                </div>
                <div>
                  <p className="font-bold">{testimonials[current].name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {testimonials[current].role}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        platformColors[testimonials[current].platform]
                      }`}
                    >
                      {testimonials[current].platform}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-sm text-muted-foreground ml-2">
              {current + 1} / {testimonials.length}
            </span>
          </div>
        </motion.div>

        {/* Mini cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              viewport={{ once: true }}
              className={`card-dark p-6 cursor-pointer transition-all ${
                current === i
                  ? "border-primary/40"
                  : "hover:border-primary/20"
              }`}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-3 h-3 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
