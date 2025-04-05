import Hero from "./components/hero.jsx";
import About from "./components/about.jsx";
import Education from "./components/education.jsx";
import TechStack from "./components/tech-stack.jsx";
import Projects from "./components/projects.jsx";
import Contact from "./components/contact.jsx";
import Footer from "./components/footer.jsx";
import Background from "./components/Background";
import Header from "./components/header.jsx";

function App() {
  return (
    <main className="min-h-screen scroll-smooth"> {/* Added scroll-smooth for better user experience */}
      <Background />
      <Header />
      {/* Added id attributes to match header navigation */}
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>
      <section id="about" className="min-h-screen">
        <About />
      </section>
      <section id="experience" className="min-h-screen">
        <Education />
      </section>
      <section id="skills" className="min-h-screen">
        <TechStack />
      </section>
      <section id="projects" className="min-h-screen">
        <Projects />
      </section>
      <section id="contact" className="min-h-screen">
        <Contact />
      </section>
      <Footer />
    </main>
  );
}

export default App;
