import dynamic from "next/dynamic";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SmoothScroll from "./components/SmoothScroll";

function SectionSkeleton() {
  return (
    <div aria-hidden="true" className="section-padding">
      <div className="container-tight">
        <div className="h-8 w-48 rounded-full bg-white/[0.03] animate-pulse mb-6" />
        <div className="h-64 md:h-80 w-full rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] animate-pulse" />
      </div>
    </div>
  );
}

const Projects = dynamic(() => import("./components/Projects"), {
  loading: () => <SectionSkeleton />,
});

const Testimonials = dynamic(() => import("./components/Testimonials"), {
  loading: () => <SectionSkeleton />,
});

const About = dynamic(() => import("./components/About"), {
  loading: () => <SectionSkeleton />,
});

const Contact = dynamic(() => import("./components/Contact"), {
  loading: () => <SectionSkeleton />,
});

const FooterSection = dynamic(() => import("./components/Footer"), {
  loading: () => <SectionSkeleton />,
});

export default function Home() {
  return (
    <SmoothScroll>
      <div
        id="scroll-progress"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left scale-x-0 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 will-change-transform"
      />

      <Navbar />

      <main>
        <HeroSection />
        <Projects />
        <Testimonials />
        <About />
        <Contact />
      </main>

      <FooterSection />
    </SmoothScroll>
  );
}