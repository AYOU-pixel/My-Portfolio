import { Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SmoothScroll from "./components/SmoothScroll";

const Projects = dynamic(() => import("./components/Projects"), {
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

function SectionSkeleton() {
  return (
    <div className="w-full min-h-[50vh] animate-pulse bg-white/[0.02]" />
  );
}

export default function Home() {
  return (
    <SmoothScroll>
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 z-[100] origin-left scale-x-0 will-change-transform"
      />
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<SectionSkeleton />}>
        <FooterSection />
      </Suspense>
    </SmoothScroll>
  );
}