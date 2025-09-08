"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { useTheme } from "./theme-provider"; // Import the useTheme hook

export default function Header({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);
  
  // Use the theme context instead of props
  const { theme, resolvedTheme, setTheme, toggleTheme, resetToSystemTheme, isDark, isLight, isSystem, mounted } = useTheme();

  // Enhanced scroll detection with hide/show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for styling
      setScrolled(currentScrollY > 20);
      
      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Show header when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigation = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "About", href: "#about", id: "about" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/ahmed9088",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/ahmed-saffar-memon-b26298294",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:memon1ahmed@gmail.com",
      label: "Email",
    },
  ];

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const mobileItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: { x: -10, opacity: 0 },
  };

  const handleNavClick = (href) => {
    setIsOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Account for fixed header height
        behavior: "smooth"
      });
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <motion.header
      ref={headerRef}
      variants={headerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg dark:shadow-primary/5 border-b border-gray-200/50 dark:border-slate-700/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Enhanced Logo */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 relative"
          >
            <a
              href="#"
              className="text-2xl md:text-3xl font-bold relative"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Ahmed's Portfolio
              </span>
            </a>
            {/* Subtle Glowing Background Effect */}
            <motion.div
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur-sm opacity-10"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                variants={itemVariants}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 group
                  ${
                    activeSection === item.id
                      ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 shadow-sm"
                      : "text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-500 dark:hover:to-purple-500"
                  }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white transition-all duration-300 ${
                    activeSection === item.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </motion.a>
            ))}
          </div>

          {/* Desktop Social Links & Theme Toggle */}
          <motion.div variants={itemVariants} className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.15, 
                  rotate: 5,
                  backgroundColor: isDark ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.05)"
                }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-500 dark:hover:to-purple-500 transition-all rounded-full"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
            
            {/* Theme Toggle Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, rotate: 15 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-500 dark:hover:to-purple-500 transition-all relative"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ y: 10, opacity: 0, rotate: -30 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -10, opacity: 0, rotate: 30 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
              
              {/* Theme Dropdown */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden z-50"
                  >
                    <button
                      onClick={() => {
                        setTheme("light");
                        setIsDropdownOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-3 text-left text-sm ${
                        isLight 
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <Sun className="w-4 h-4 mr-3" />
                      Light Mode
                    </button>
                    <button
                      onClick={() => {
                        setTheme("dark");
                        setIsDropdownOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-3 text-left text-sm ${
                        isDark 
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <Moon className="w-4 h-4 mr-3" />
                      Dark Mode
                    </button>
                    <div className="border-t border-gray-200 dark:border-slate-700 my-1"></div>
                    <button
                      onClick={() => {
                        resetToSystemTheme();
                        setIsDropdownOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-3 text-left text-sm ${
                        isSystem 
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <div className="w-4 h-4 mr-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      System Theme
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile Menu Toggle */}
            <motion.button
              variants={itemVariants}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "open" : "closed"}
                  initial={{ rotate: isOpen ? -45 : 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-slate-700/50 rounded-b-xl shadow-lg"
            >
              <div className="px-2 pt-2 pb-4 space-y-1">
                {navigation.map((item) => (
                  <motion.a
                    key={item.name}
                    variants={mobileItemVariants}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-colors
                      ${
                        activeSection === item.id
                          ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500"
                          : "text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-500 dark:hover:to-purple-500"
                      }`}
                  >
                    {item.name}
                    {activeSection === item.id && (
                      <motion.div
                        layout
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </motion.a>
                ))}
              </div>
              
              <div className="px-4 pt-4 pb-6 border-t border-gray-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Connect</h3>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Toggle theme"
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>
                <div className="flex items-center justify-center gap-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={mobileItemVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-500 dark:hover:to-purple-500 transition-all rounded-full"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}