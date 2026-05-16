import { Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SmoothScroll from "./components/SmoothScroll";

// Lazy-load below-the-fold sections to reduce initial JS payload
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

/**
 * Lightweight placeholder shown while a lazy section is loading.
 * Uses `aria-hidden` so screen-readers skip over it.
 */
function SectionSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="w-full min-h-[50vh] animate-pulse bg-white/[0.02]"
    />
  );
}

export default function Home() {
  return (
    <SmoothScroll>
      {/* Scroll-progress indicator — driven by SmoothScroll via GSAP */}
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 z-[100] origin-left scale-x-0 will-change-transform"
        aria-hidden="true"
      />

      <Navbar />

      <main>
        {/* HeroSection is eagerly loaded — it's above the fold */}
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