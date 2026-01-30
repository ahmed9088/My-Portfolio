import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Github, Linkedin, Mail, ArrowUpRight, Clock } from "lucide-react";
import { useTheme } from "./theme-provider";
import Magnetic from "./ui/Magnetic";

export default function Header({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [time, setTime] = useState("");
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  const { theme, setTheme, isDark, mounted } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "About", href: "#about", id: "about" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  if (!mounted) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? "py-4" : "py-8"
        }`}
    >
      <nav className="container mx-auto px-6 max-w-7xl">
        <div className={`glass-card rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-border/50 shadow-2xl" : "bg-transparent border-transparent shadow-none"
          }`}>

          {/* Minimal Identity */}
          <div className="flex items-center gap-8">
            <a href="#home" className="group flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center text-background font-black text-xs transition-transform group-hover:rotate-[360deg] duration-700">
                AS
              </div>
              <span className="font-bold tracking-tightest uppercase text-sm hidden sm:block">Ahmed Saffar</span>
            </a>

            <div className="hidden lg:flex items-center gap-3 opacity-30 text-[10px] font-mono uppercase tracking-widest border-l border-border/50 pl-8">
              <Clock className="w-3 h-3" />
              <span>{time} PKT</span>
            </div>
          </div>

          {/* Boutique Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navigation.map((item) => (
              <Magnetic key={item.name}>
                <a
                  href={item.href}
                  className={`px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] transition-all relative group ${activeSection === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 hover:bg-muted rounded-full transition-colors opacity-60 hover:opacity-100"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="h-4 w-[1px] bg-border/50 hidden sm:block" />
            <a
              href="https://github.com/ahmed9088"
              target="_blank"
              className="text-[10px] font-mono uppercase tracking-widest hidden sm:flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
            >
              Github <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-6 right-6 mt-4 p-8 glass-card rounded-[2rem] md:hidden shadow-3xl"
            >
              <div className="flex flex-col gap-8">
                {navigation.map((item, i) => (
                  <motion.a
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-black uppercase tracking-tightest hover:text-primary transition-colors flex justify-between items-center"
                  >
                    {item.name}
                    <span className="text-xs opacity-20 font-mono italic serif lowercase">0{i + 1}</span>
                  </motion.a>
                ))}
                <div className="pt-8 border-t border-border flex justify-between items-center">
                  <div className="flex gap-4">
                    <Github className="w-5 h-5 opacity-40" />
                    <Linkedin className="w-5 h-5 opacity-40" />
                  </div>
                  <span className="text-[10px] font-mono opacity-40">2026 // Ahmed Saffar Folio</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
