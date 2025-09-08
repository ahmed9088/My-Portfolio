"use client";
import { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from "react";

const ThemeContext = createContext();

// Theme transition effect
const applyThemeTransition = () => {
  const root = document.documentElement;
  root.style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease';
  setTimeout(() => {
    root.style.transition = '';
  }, 300);
};

export function ThemeProvider({ children, defaultTheme = "system" }) {
  const [theme, setThemeState] = useState(() => {
    // Load theme from localStorage or use default
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || defaultTheme;
    }
    return defaultTheme;
  });
  
  const [resolvedTheme, setResolvedTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const mediaQueryRef = useRef(null);
  const themeChangeCallbacksRef = useRef(new Set());
  
  // Function to set the theme
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
  }, []);
  
  // Function to toggle between light and dark
  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) => {
      if (prevTheme === "dark") return "light";
      if (prevTheme === "light") return "dark";
      // If currently system, toggle to the opposite of the current resolved theme
      return resolvedTheme === "dark" ? "light" : "dark";
    });
  }, [resolvedTheme]);
  
  // Function to reset to system theme
  const resetToSystemTheme = useCallback(() => {
    setTheme("system");
  }, []);
  
  // Register a callback to be called when theme changes
  const registerThemeChangeCallback = useCallback((callback) => {
    themeChangeCallbacksRef.current.add(callback);
    return () => {
      themeChangeCallbacksRef.current.delete(callback);
    };
  }, []);
  
  // Apply theme to DOM and save to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const root = window.document.documentElement;
    
    // Remove any previous theme class
    root.classList.remove("light", "dark");
    
    // Determine the resolved theme
    let currentResolvedTheme;
    if (theme === "system") {
      currentResolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      currentResolvedTheme = theme;
    }
    
    // Apply the resolved theme with transition
    applyThemeTransition();
    root.classList.add(currentResolvedTheme);
    setResolvedTheme(currentResolvedTheme);
    
    // Save the current theme setting to localStorage
    localStorage.setItem("theme", theme);
    
    // Add a data attribute for CSS targeting
    root.setAttribute("data-theme", currentResolvedTheme);
    
    // Add data attribute for responsive breakpoints
    root.setAttribute("data-device", 
      window.innerWidth < 768 ? "mobile" : 
      window.innerWidth < 1024 ? "tablet" : "desktop"
    );
    
    // Notify all registered callbacks
    themeChangeCallbacksRef.current.forEach(callback => {
      callback(currentResolvedTheme);
    });
    
    setMounted(true);
  }, [theme]);
  
  // Listen for system theme changes when in "system" mode
  useEffect(() => {
    if (typeof window === "undefined" || theme !== "system") return;
    
    // Clean up previous media query if exists
    if (mediaQueryRef.current) {
      mediaQueryRef.current.removeEventListener("change", handleSystemThemeChange);
    }
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryRef.current = mediaQuery;
    
    const handleSystemThemeChange = (e) => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      const newResolvedTheme = e.matches ? "dark" : "light";
      
      // Apply the resolved theme with transition
      applyThemeTransition();
      root.classList.add(newResolvedTheme);
      setResolvedTheme(newResolvedTheme);
      root.setAttribute("data-theme", newResolvedTheme);
      
      // Notify all registered callbacks
      themeChangeCallbacksRef.current.forEach(callback => {
        callback(newResolvedTheme);
      });
    };
    
    // Add the listener
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);
  
  // Handle responsive changes with debounce
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    let resizeTimeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const root = window.document.documentElement;
        root.setAttribute("data-device", 
          window.innerWidth < 768 ? "mobile" : 
          window.innerWidth < 1024 ? "tablet" : "desktop"
        );
      }, 100); // Debounce for 100ms
    };
    
    window.addEventListener("resize", handleResize);
    // Initial call
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);
  
  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    resetToSystemTheme,
    isDark: resolvedTheme === "dark",
    isLight: resolvedTheme === "light",
    isSystem: theme === "system",
    mounted,
    registerThemeChangeCallback
  }), [theme, resolvedTheme, mounted, setTheme, toggleTheme, resetToSystemTheme, registerThemeChangeCallback]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Custom hook for listening to theme changes without re-rendering
export function useThemeChange(callback) {
  const { registerThemeChangeCallback } = useTheme();
  
  useEffect(() => {
    return registerThemeChangeCallback(callback);
  }, [registerThemeChangeCallback, callback]);
}

// Custom hook for getting the current theme without subscribing to re-renders
export function useCurrentTheme() {
  const ref = useRef("light");
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    ref.current = resolvedTheme;
  }, [resolvedTheme]);
  
  return () => ref.current;
}