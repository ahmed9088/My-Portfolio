import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, User, Briefcase, Code2, FolderGit2, MessageSquare, BookOpen, Mail } from "lucide-react";
import { useTheme } from "./theme-provider";

const navigation = [
  { name: "About", href: "#about", id: "about", icon: User },
  { name: "Experience", href: "#experience", id: "experience", icon: Briefcase },
  { name: "Skills", href: "#skills", id: "skills", icon: Code2 },
  { name: "Projects", href: "#projects", id: "projects", icon: FolderGit2 },
  { name: "Reviews", href: "#testimonials", id: "testimonials", icon: MessageSquare },
  { name: "Blog", href: "#blog", id: "blog", icon: BookOpen },
  { name: "Contact", href: "#contact", id: "contact", icon: Mail },
];

export default function Header({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isDark, setTheme, mounted } = useTheme();
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ═══════════════════════ DESKTOP — Dynamic Island ═══════════════════════ */}
      <motion.header
        ref={headerRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-4 inset-x-0 z-50 hidden md:flex justify-center pointer-events-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.nav
          layout
          aria-label="Main navigation"
          className="relative pointer-events-auto"
          transition={{ layout: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } }}
        >
          <motion.div
            layout
            className="relative flex items-center gap-1 px-2 py-1.5 rounded-[22px]"
            style={{
              background: isDark
                ? "rgba(15, 15, 15, 0.85)"
                : "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: `1px solid ${
                isDark
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.06)"
              }`,
              boxShadow: isDark
                ? "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset"
                : "0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(255, 255, 255, 0.5) inset",
            }}
          >
            {/* Logo pill */}
            <a
              href="#home"
              className="relative flex items-center gap-2 px-4 py-2 rounded-[16px] transition-colors duration-200"
              aria-label="Ahmed Saffar - Home"
              style={{
                background: activeSection === "home"
                  ? isDark
                    ? "rgba(135, 207, 74, 0.12)"
                    : "rgba(135, 207, 74, 0.1)"
                  : "transparent",
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "hsl(96, 52%, 54%)" }}
              />
              <span className="text-sm font-bold tracking-tight whitespace-nowrap">
                it's <span style={{ color: "hsl(96, 52%, 54%)" }}>AHMED</span>
              </span>
            </a>

            {/* Divider */}
            <div
              className="w-px h-5 mx-1 flex-shrink-0"
              style={{
                background: isDark
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.06)",
              }}
            />

            {/* Nav items */}
            {navigation.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-3.5 py-2 text-[13px] font-medium rounded-[14px] transition-all duration-200 whitespace-nowrap"
                  style={{
                    color: isActive
                      ? "hsl(96, 52%, 54%)"
                      : isDark
                        ? "rgba(255, 255, 255, 0.55)"
                        : "rgba(0, 0, 0, 0.5)",
                    background: isActive
                      ? isDark
                        ? "rgba(135, 207, 74, 0.1)"
                        : "rgba(135, 207, 74, 0.08)"
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDark
                        ? "rgba(255, 255, 255, 0.9)"
                        : "rgba(0, 0, 0, 0.85)";
                      e.currentTarget.style.background = isDark
                        ? "rgba(255, 255, 255, 0.06)"
                        : "rgba(0, 0, 0, 0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDark
                        ? "rgba(255, 255, 255, 0.55)"
                        : "rgba(0, 0, 0, 0.5)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {item.name}
                </a>
              );
            })}

            {/* Divider */}
            <div
              className="w-px h-5 mx-1 flex-shrink-0"
              style={{
                background: isDark
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.06)",
              }}
            />

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 rounded-[12px] transition-all duration-200"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                color: isDark ? "rgba(255, 255, 255, 0.55)" : "rgba(0, 0, 0, 0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.color = isDark
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(0, 0, 0, 0.85)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = isDark
                  ? "rgba(255, 255, 255, 0.55)"
                  : "rgba(0, 0, 0, 0.5)";
              }}
            >
              <motion.div
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </button>

            {/* Let's Talk CTA */}
            <a
              href="mailto:memon1ahmed@gmail.com"
              className="ml-1 px-4 py-2 text-[13px] font-semibold rounded-[14px] transition-all duration-200 whitespace-nowrap"
              style={{
                background: "hsl(96, 52%, 54%)",
                color: "#000",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.15)";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(1)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Let's Talk
            </a>
          </motion.div>
        </motion.nav>
      </motion.header>

      {/* ═══════════════════════ MOBILE — Dynamic Island Bar ═══════════════════════ */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-3 left-3 right-3 z-50 md:hidden"
      >
        <div
          className="flex items-center justify-between px-4 py-2.5 rounded-[20px]"
          style={{
            background: isDark
              ? "rgba(15, 15, 15, 0.9)"
              : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            border: `1px solid ${
              isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.06)"
            }`,
            boxShadow: isDark
              ? "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset"
              : "0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(255, 255, 255, 0.5) inset",
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            className="text-base font-bold tracking-tight"
            aria-label="Ahmed Saffar - Home"
          >
            it's <span style={{ color: "hsl(96, 52%, 54%)" }}>AHMED</span>
          </a>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 rounded-[12px] transition-colors"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                color: isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.5)",
              }}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Hamburger / Close */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-[12px] transition-all duration-200"
              aria-label="Toggle menu"
              style={{
                background: isOpen
                  ? isDark
                    ? "rgba(135, 207, 74, 0.15)"
                    : "rgba(135, 207, 74, 0.1)"
                  : "transparent",
                color: isOpen
                  ? "hsl(96, 52%, 54%)"
                  : isDark
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.6)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ═══════════════════════ MOBILE — Full Screen Overlay ═══════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{
                background: isDark
                  ? "rgba(0, 0, 0, 0.6)"
                  : "rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="fixed top-3 left-3 right-3 z-50 md:hidden overflow-hidden"
              style={{
                borderRadius: "24px",
                background: isDark
                  ? "rgba(18, 18, 18, 0.97)"
                  : "rgba(255, 255, 255, 0.97)",
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                border: `1px solid ${
                  isDark
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.06)"
                }`,
                boxShadow: isDark
                  ? "0 24px 80px rgba(0, 0, 0, 0.6), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset"
                  : "0 24px 80px rgba(0, 0, 0, 0.12), 0 0 0 0.5px rgba(255, 255, 255, 0.5) inset",
              }}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between px-5 py-4">
                <a
                  href="#home"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold tracking-tight"
                >
                  it's <span style={{ color: "hsl(96, 52%, 54%)" }}>AHMED</span>
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-[14px] transition-colors"
                  style={{
                    background: isDark
                      ? "rgba(255, 255, 255, 0.06)"
                      : "rgba(0, 0, 0, 0.04)",
                    color: isDark
                      ? "rgba(255, 255, 255, 0.6)"
                      : "rgba(0, 0, 0, 0.5)",
                  }}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Separator */}
              <div
                className="mx-5 h-px"
                style={{
                  background: isDark
                    ? "rgba(255, 255, 255, 0.06)"
                    : "rgba(0, 0, 0, 0.05)",
                }}
              />

              {/* Navigation Links */}
              <div className="px-3 py-3">
                {navigation.map((item, index) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className="flex items-center gap-4 px-4 py-3.5 rounded-[16px] transition-all duration-200 group"
                      style={{
                        background: isActive
                          ? isDark
                            ? "rgba(135, 207, 74, 0.1)"
                            : "rgba(135, 207, 74, 0.08)"
                          : "transparent",
                      }}
                    >
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-[12px] transition-colors duration-200"
                        style={{
                          background: isActive
                            ? isDark
                              ? "rgba(135, 207, 74, 0.15)"
                              : "rgba(135, 207, 74, 0.12)"
                            : isDark
                              ? "rgba(255, 255, 255, 0.04)"
                              : "rgba(0, 0, 0, 0.03)",
                        }}
                      >
                        <Icon
                          className="w-[18px] h-[18px] transition-colors duration-200"
                          style={{
                            color: isActive
                              ? "hsl(96, 52%, 54%)"
                              : isDark
                                ? "rgba(255, 255, 255, 0.4)"
                                : "rgba(0, 0, 0, 0.35)",
                          }}
                        />
                      </div>
                      <span
                        className="text-[15px] font-semibold tracking-tight transition-colors duration-200"
                        style={{
                          color: isActive
                            ? "hsl(96, 52%, 54%)"
                            : isDark
                              ? "rgba(255, 255, 255, 0.75)"
                              : "rgba(0, 0, 0, 0.7)",
                        }}
                      >
                        {item.name}
                      </span>

                      {/* Active indicator dot */}
                      {isActive && (
                        <motion.div
                          layoutId="mobile-active-dot"
                          className="ml-auto w-1.5 h-1.5 rounded-full"
                          style={{ background: "hsl(96, 52%, 54%)" }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Separator */}
              <div
                className="mx-5 h-px"
                style={{
                  background: isDark
                    ? "rgba(255, 255, 255, 0.06)"
                    : "rgba(0, 0, 0, 0.05)",
                }}
              />

              {/* CTA Button */}
              <div className="p-4">
                <motion.a
                  href="mailto:memon1ahmed@gmail.com"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-[16px] text-sm font-semibold transition-all duration-200"
                  style={{
                    background: "hsl(96, 52%, 54%)",
                    color: "#000",
                  }}
                >
                  <Mail className="w-4 h-4" />
                  Let's Talk
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
