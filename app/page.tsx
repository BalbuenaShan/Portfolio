import About from "@/components/About";
import Contact from "@/components/Contact";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import TechSkills from "@/components/TechSkills";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Gallery />
      <TechSkills />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
