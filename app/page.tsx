import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import Terminal from "./components/Terminal";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
