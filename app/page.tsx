import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import Project from "./components/Projects"
import FooterSection from "./components/Footer"
import About from "@/app/components/About"

import Contact from "./components/Contact"
export default function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Project/>
    <About/>
    <Contact/>
    <FooterSection/>
    </>
  );
}