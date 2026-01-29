import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Hero from "./components/hero.jsx";
import About from "./components/about.jsx";
import Education from "./components/education.jsx";
import TechStack from "./components/tech-stack.jsx";
import Projects from "./components/projects.jsx";
import Contact from "./components/contact.jsx";
import Footer from "./components/footer.jsx";
import Background from "./components/Background";
import Header from "./components/header.jsx";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import { ThemeProvider } from "./components/theme-provider.jsx";
import CustomCursor from "./components/ui/CustomCursor";
import ScrollProgress from "./components/ui/ScrollProgress";

// Define section configuration for better maintainability
const SECTIONS = [
  { id: "hero", component: Hero },
  { id: "about", component: About },
  { id: "experience", component: Education },
  { id: "skills", component: TechStack },
  { id: "projects", component: Projects },
  { id: "contact", component: Contact }
];

// Intersection Observer hook for section tracking
function useSectionObserver(sectionIds, options = {}) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const observerRef = useRef(null);

  useEffect(() => {
    const { threshold = 0.5, rootMargin = "-100px 0px" } = options;

    const handleIntersect = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          break;
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin
    });

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, options]);

  return activeSection;
}

// Custom hook for preloading resources
function useResourcePreloader(resources) {
  useEffect(() => {
    const preloadResources = async () => {
      const promises = resources.map(resource => {
        return new Promise((resolve, reject) => {
          if (resource.type === 'image') {
            const img = new Image();
            img.src = resource.url;
            img.onload = resolve;
            img.onerror = reject;
          } else if (resource.type === 'font') {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.href = resource.url;
            link.crossOrigin = 'anonymous';
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
          }
        });
      });

      try {
        await Promise.all(promises);
      } catch (error) {
        console.warn('Some resources failed to preload:', error);
      }
    };

    preloadResources();
  }, [resources]);
}

// Performance monitoring hook
function usePerformanceMonitoring() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Log initial page load metrics
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Page load performance:', {
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
            firstPaint: perfData.responseEnd - perfData.fetchStart
          });
        }, 0);
      });

      // Setup performance observer for long tasks
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) { // Tasks longer than 50ms
              console.warn('Long task detected:', entry);
            }
          }
        });

        observer.observe({ entryTypes: ['longtask'] });

        return () => observer.disconnect();
      }
    }
  }, []);
}

// Error boundary hook
function useErrorBoundary() {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (event) => {
      setError(event.error);
      console.error('Global error caught:', event.error);
    };

    const handleUnhandledRejection = (event) => {
      setError(event.reason);
      console.error('Unhandled promise rejection:', event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return error;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get section IDs from configuration
  const sectionIds = useMemo(() => SECTIONS.map(section => section.id), []);

  // Use custom hooks
  const activeSection = useSectionObserver(sectionIds, {
    threshold: 0.3,
    rootMargin: "-80px 0px"
  });

  const error = useErrorBoundary();
  usePerformanceMonitoring();

  // Preload critical resources
  useResourcePreloader([]);

  // Handle loading screen with resource loading simulation
  useEffect(() => {
    const loadResources = async () => {
      try {
        // Simulate minimum loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Additional loading logic can be added here
        setIsLoading(false);
      } catch (error) {
        console.error('Error during loading:', error);
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling with transition state
  const scrollToSection = useCallback((sectionId) => {
    setIsTransitioning(true);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Reset transition state after animation completes
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  }, []);

  // Show error state if there's an error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/20">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're sorry, but an unexpected error occurred.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider defaultTheme="system">
      <div className={`min-h-screen ${isTransitioning ? 'pointer-events-none' : ''}`}>
        <CustomCursor />
        <ScrollProgress />
        <Background />
        <Header
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />

        <main className="scroll-smooth bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          {SECTIONS.map(({ id, component: Component }) => (
            <section
              key={id}
              id={id}
              className="min-h-screen scroll-mt-16"
            >
              <Component />
            </section>
          ))}

          <Footer />
          {showScrollTop && <ScrollToTop />}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;