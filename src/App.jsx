import { useState, useEffect, lazy, Suspense } from "react";
import Lenis from "lenis";
import CustomCursor from "./components/ui/CustomCursor";
import ScrollProgress from "./components/ui/ScrollProgress";
import Header from "./components/header.jsx";

// Lazy loaded components for better performance
const Hero = lazy(() => import("./components/hero.jsx"));
const About = lazy(() => import("./components/about.jsx"));
const Education = lazy(() => import("./components/education.jsx"));
const TechStack = lazy(() => import("./components/tech-stack.jsx"));
const Projects = lazy(() => import("./components/projects.jsx"));
const Testimonials = lazy(() => import("./components/testimonials.jsx"));
const Contact = lazy(() => import("./components/contact.jsx"));
const Footer = lazy(() => import("./components/footer.jsx"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));

// Loading fallback
const LoadingSection = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const isMobile = 'ontouchstart' in window || window.innerWidth < 768;

    let lenis;
    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }

    // Section Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );

    ["home", "about", "experience", "skills", "projects", "testimonials", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      if (lenis) lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <ScrollProgress />
      <Header activeSection={activeSection} />
      <main>
        <Suspense fallback={<LoadingSection />}>
          <Hero />
          <About />
          <Education />
          <TechStack />
          <Projects />
          <Testimonials />
          <Contact />
          <Footer />
          <ScrollToTop />
        </Suspense>
      </main>
    </div>
  );
}