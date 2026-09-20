import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Projects from "../components/sections/Projects";
import Process from "../components/sections/Process";
import About from "../components/sections/About";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import ProjectTypes from "../components/sections/ProjectTypes";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    // Wait a tick for this page's sections to mount before scrolling.
    const id = location.hash.slice(1);
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 0);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
        <Projects />
      <Services />
      <ProjectTypes />
    
      <Process />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

export default Home;