import { useState, useEffect } from "react";
import Lenis from "lenis";
import CustomCursor from "./components/ui/CustomCursor";
import ScrollProgress from "./components/ui/ScrollProgress";
import Header from "./components/header.jsx";
import Hero from "./components/hero.jsx";
import About from "./components/about.jsx";
import Education from "./components/education.jsx";
import TechStack from "./components/tech-stack.jsx";
import Projects from "./components/projects.jsx";
import Testimonials from "./components/testimonials.jsx";
import Contact from "./components/contact.jsx";
import Footer from "./components/footer.jsx";
import ScrollToTop from "./components/ScrollToTop";

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
        <Hero />
        <About />
        <Education />
        <TechStack />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
        <ScrollToTop />
      </main>
    </div>
  );
}