import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import Project from "./components/Projects"
import Footer from "./components/Footer"
import About from "./components/About"
import Skills from "./components/Skills"
import Contact from "./components/Contact"
export default function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Project/>
    <About/>
    <Skills/>
    <Contact/>
    <Footer/>
    </>
  );
}