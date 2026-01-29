import { useState, useEffect } from "react";
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
import { ThemeProvider } from "./components/theme-provider.jsx";
import CustomCursor from "./components/ui/CustomCursor";
import ScrollProgress from "./components/ui/ScrollProgress";

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
            <Hero />
            <About />
            <Education />
            <TechStack />
            <Projects />
            <Contact />
            <Footer />
            <ScrollToTop />
          </main>
        </Background>
      </div>
    </ThemeProvider>
  );
}