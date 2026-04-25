import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Hamza A.",
    role: "Founder, QuickServ",
    platform: "Upwork",
    rating: 5,
    text: "Honestly, I was skeptical at first because we'd already been burned by two developers who just disappeared mid-project. Ahmed was different — he actually listened to what we needed, asked smart questions, and delivered the first working version in like 10 days. Our SaaS dashboard loads way faster than I expected and he even caught some UX issues I hadn't thought of. Would 100% hire again.",
    avatar: "HA",
  },
  {
    name: "Fatima Z.",
    role: "Runs an online clothing brand",
    platform: "Fiverr",
    rating: 5,
    text: "I'm not a tech person at all, so I was nervous about getting a custom site built. Ahmed explained everything in plain language — no confusing jargon. He built my Shopify store with a custom dashboard where I can track orders and inventory. It's been 6 months and I haven't needed to contact him for any bugs. That says a lot.",
    avatar: "FZ",
  },
  {
    name: "Bilal R.",
    role: "Marketing Agency Owner",
    platform: "LinkedIn",
    rating: 5,
    text: "We've sent Ahmed maybe 7 or 8 projects now? Everything from quick WordPress fixes to a full React app for one of our bigger clients. What I appreciate most is that he doesn't just say yes to everything — if something won't work, he'll tell you upfront and suggest a better approach. Super reliable.",
    avatar: "BR",
  },
  {
    name: "Ayesha N.",
    role: "Co-founder, a small clinic",
    platform: "Facebook",
    rating: 5,
    text: "We needed a patient booking system and Ahmed built it with Next.js (I had to Google what that was lol). But seriously — the app works great, our receptionist figured it out in one day without any training manual, and patients can book appointments from their phones now. He also helped us set up the hosting so we're not paying crazy server bills.",
    avatar: "AN",
  },
  {
    name: "Usman T.",
    role: "Property Business",
    platform: "Upwork",
    rating: 5,
    text: "Finding a developer who can do both web AND mobile is surprisingly hard. I needed a property listing site with map integration plus a Flutter app for our agents in the field. Ahmed handled both. The app isn't fancy or over-designed — it just works, which is exactly what my team needed. Good communication throughout the whole project.",
    avatar: "UT",
  },
  {
    name: "Sana B.",
    role: "EdTech Startup",
    platform: "Fiverr",
    rating: 5,
    text: "Ahmed built our learning platform — video courses, quizzes, payment gateway, the whole thing. I'll be honest, we kept changing requirements midway (sorry Ahmed 😅) and he handled it really well. Never complained, just adjusted and kept moving. We have around 500 students using it daily now and it hasn't crashed once.",
    avatar: "SB",
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
