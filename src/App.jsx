import { useState, useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "./components/theme-provider.jsx";
import CustomCursor from "./components/ui/CustomCursor";
import ScrollProgress from "./components/ui/ScrollProgress";
import Header from "./components/header.jsx";
import Background from "./components/Background";

// Lazy loaded components for better performance
const Hero = lazy(() => import("./components/hero.jsx"));
const About = lazy(() => import("./components/about.jsx"));
const Education = lazy(() => import("./components/education.jsx"));
const TechStack = lazy(() => import("./components/tech-stack.jsx"));
const Projects = lazy(() => import("./components/projects.jsx"));
const Contact = lazy(() => import("./components/contact.jsx"));
const Footer = lazy(() => import("./components/footer.jsx"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));

// Loading fallback
const LoadingSection = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <span className="text-xs font-mono uppercase tracking-[0.5em] opacity-40">Synchronizing Folio</span>
    </div>
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );

    ["home", "about", "experience", "skills", "projects", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="selection:bg-primary/20">
        <CustomCursor />
        <ScrollProgress />
        <Background>
          <Header activeSection={activeSection} />
          <main className="relative z-10 overflow-x-hidden">
            <Suspense fallback={<LoadingSection />}>
              <Hero />
              <About />
              <Education />
              <TechStack />
              <Projects />
              <Contact />
              <Footer />
              <ScrollToTop />
            </Suspense>
          </main>
        </Background>
      </div>
    </ThemeProvider>
  );
}