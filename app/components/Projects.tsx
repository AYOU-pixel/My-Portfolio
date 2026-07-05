"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  ExternalLink,
  Github,
  Cloud,
  Sparkles,
  Target,
  Lightbulb,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { FaReact, FaHtml5, FaStripeS } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiPrisma } from "react-icons/si";
import type { IconType } from "react-icons";
import { AnimatedText } from "./ui/AnimatedUnderline";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TechConfig {
  icon: IconType;
  color: string;
  glow: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
  tags: string[];
  caseStudy: {
    businessGoal: string;
    problem: string;
    solution: string;
    features: string[];
  };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TECH_ICONS: Record<string, TechConfig> = {
  React:            { icon: FaReact,       color: "#61DAFB", glow: "rgba(97,218,251,0.35)"  },
  "Next.js":        { icon: SiNextdotjs,   color: "#ffffff", glow: "rgba(255,255,255,0.2)"  },
  "API Integration":{ icon: Cloud,         color: "#60A5FA", glow: "rgba(96,165,250,0.35)"  },
  Prisma:           { icon: SiPrisma,      color: "#5A67D8", glow: "rgba(90,103,216,0.35)"  },
  Stripe:           { icon: FaStripeS,     color: "#635BFF", glow: "rgba(99,91,255,0.35)"   },
  MongoDB:          { icon: SiMongodb,     color: "#47A248", glow: "rgba(71,162,72,0.35)"   },
  Tailwind:         { icon: SiTailwindcss, color: "#38BDF8", glow: "rgba(56,189,248,0.35)"  },
  HTML:             { icon: FaHtml5,       color: "#E34F26", glow: "rgba(227,79,38,0.35)"   },
  AOS:              { icon: Sparkles,      color: "#FF6B6B", glow: "rgba(255,107,107,0.35)" },
  "framer-motion":  { icon: Sparkles,      color: "#FF6B6B", glow: "rgba(255,107,107,0.35)" },
  stripe:           { icon: FaStripeS,     color: "#635BFF", glow: "rgba(99,91,255,0.35)"   },
} as const;

const FALLBACK_TECH: TechConfig = {
  icon: Sparkles,
  color: "#94A3B8",
  glow: "rgba(148,163,184,0.2)",
};

// Subtle per-project accent used for the low-opacity background glow.
const GLOW_COLORS = ["#38BDF8", "#A78BFA", "#818CF8"];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Olympic Jafy Gym",
    description: `Built a conversion-focused fitness landing page designed to generate qualified leads through WhatsApp.
Focused on mobile-first UX, CTA visibility, and friction reduction to improve engagement and customer acquisition.
Engineered a fast and responsive experience optimized for performance and user interaction.`,
    image: "/p1.png",
    link: "https://www.olympicjafygym.com",
    github: "https://github.com/AYOU-pixel/Jafy_gym",
    tags: ["React", "Next.js", "Tailwind CSS"],
    caseStudy: {
      businessGoal: "Increase WhatsApp inquiries and walk-in visits for a local gym in Salé, Morocco.",
      problem: "The gym had no online presence. Potential members couldn't find class info, pricing, or contact details — losing leads to competitors with websites.",
      solution: "Built a mobile-first landing page with prominent WhatsApp CTAs, a sticky navbar, and a clean program breakdown to eliminate friction between discovery and contact.",
      features: [
        "One-tap WhatsApp inquiry buttons",
        "Animated program & pricing sections",
        "Mobile-first layout (80%+ users on mobile)",
        "Optimized Core Web Vitals for fast load",
      ],
    },
  },
  {
    id: 2,
    title: "FitFood",
    description: `Designed and developed a high-performance landing experience for a healthy meal service with integrated WhatsApp ordering.
Structured the interface around conversion flow, mobile usability, and clear content hierarchy to simplify the ordering experience.
Focused on smooth interactions, responsive layouts, and scalable UI architecture.`,
    image: "/r1.png",
    link: "https://healthy-food-six-lilac.vercel.app",
    github: "https://github.com/AYOU-pixel/Healthy-Meals",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    caseStudy: {
      businessGoal: "Drive direct meal orders through WhatsApp for a healthy food delivery service.",
      problem: "Customers had no clear way to browse the menu or place orders online, causing the business to lose sales to delivery apps taking 30% commissions.",
      solution: "Designed a conversion-first landing page with a scannable menu layout, trust signals, and a frictionless WhatsApp ordering flow — no third-party app needed.",
      features: [
        "WhatsApp-integrated order flow",
        "Menu grid with category filters",
        "Smooth Framer Motion scroll transitions",
        "Responsive layout optimized for mobile ordering",
      ],
    },
  },
  {
    id: 3,
    title: "Aura Store",
    description: `Developed a scalable fashion e-commerce platform inspired by modern minimalist shopping experiences.
Integrated secure payments, OAuth authentication, and optimized product flows to create a seamless purchasing experience.
Focused on clean UX, responsive design, and scalable frontend architecture using modern web technologies.`,
    image: "/AURA.png",
    link: "https://clothes-store-six-indol.vercel.app",
    github: "https://github.com/AYOU-pixel/Clothes-Store",
    tags: ["Next.js", "MongoDB", "Tailwind CSS", "Stripe"],
    caseStudy: {
      businessGoal: "Demonstrate a full-stack e-commerce capability to attract fashion or retail clients.",
      problem: "Small fashion brands lack affordable, custom storefronts — they rely on Shopify templates that look generic and charge high monthly fees.",
      solution: "Built a full-stack e-commerce platform with a minimalist aesthetic, secure Stripe payments, and OAuth login — giving brands a fully custom, owned storefront.",
      features: [
        "Stripe secure checkout integration",
        "OAuth authentication (Google)",
        "MongoDB product & order management",
        "Minimalist UI with dark/light product displays",
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Shared presentational sub-components (used by both the cinematic pinned
// experience and the reduced-motion static fallback)
// ---------------------------------------------------------------------------

interface CaseStudyRefs {
  goal?: (el: HTMLDivElement | null) => void;
  problem?: (el: HTMLDivElement | null) => void;
  solution?: (el: HTMLDivElement | null) => void;
}

function CaseStudyContent({
  caseStudy,
  refs = {},
}: {
  caseStudy: Project["caseStudy"];
  refs?: CaseStudyRefs;
}) {
  return (
    <div className="mb-6 space-y-3">
      <div ref={refs.goal} className="flex gap-2.5">
        <Target className="w-3.5 h-3.5 text-sky-400 mt-[3px] flex-shrink-0" aria-hidden="true" />
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-sky-400/80 block mb-0.5">
            Goal
          </span>
          <p className="text-xs text-[#94A3B8] leading-relaxed">{caseStudy.businessGoal}</p>
        </div>
      </div>

      <div ref={refs.problem} className="flex gap-2.5">
        <Lightbulb className="w-3.5 h-3.5 text-[#94A3B8] mt-[3px] flex-shrink-0" aria-hidden="true" />
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]/60 block mb-0.5">
            Problem
          </span>
          <p className="text-xs text-[#94A3B8] leading-relaxed">{caseStudy.problem}</p>
        </div>
      </div>

      <div ref={refs.solution} className="flex gap-2.5">
        <Wrench className="w-3.5 h-3.5 text-[#94A3B8] mt-[3px] flex-shrink-0" aria-hidden="true" />
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]/60 block mb-0.5">
            Solution
          </span>
          <p className="text-xs text-[#94A3B8] leading-relaxed">{caseStudy.solution}</p>
        </div>
      </div>

      <div className="flex gap-2.5">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#94A3B8] mt-[3px] flex-shrink-0" aria-hidden="true" />
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]/60 block mb-1">
            Features
          </span>
          <ul className="space-y-0.5">
            {caseStudy.features.map((f) => (
              <li key={f} className="feature-item text-xs text-[#94A3B8] leading-relaxed flex gap-1.5 items-start">
                <span className="text-sky-400/60 mt-[3px] leading-none select-none" aria-hidden="true">
                  ›
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function TechPills({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tags.map((tag) => {
        const tech = TECH_ICONS[tag] ?? FALLBACK_TECH;
        const Icon = tech.icon;

        return (
          <div
            key={tag}
            className="tech-pill group/tag relative transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#94A3B8] bg-white/5 rounded-lg ring-1 ring-white/[0.06] transition-all duration-300 hover:bg-white/[0.05] hover:ring-white/[0.1]"
              style={{ ["--tag-glow" as string]: tech.glow }}
            >
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300 bg-[var(--tag-glow)] blur-md pointer-events-none"
                aria-hidden="true"
              />
              <Icon className="relative z-10 w-3 h-3" style={{ color: tech.color }} aria-hidden="true" />
              <span className="relative z-10">{tag}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProjectCTAs({
  project,
  ctaRef,
}: {
  project: Project;
  ctaRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={ctaRef} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View live demo of ${project.title} (opens in new tab)`}
        className="group/cta inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-[#0B0F19] rounded-full font-medium text-sm hover:bg-[#E2E8F0] active:scale-95 transition-all duration-300 focus-ring"
      >
        <ExternalLink
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
        />
        Live Demo
      </a>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View source code of ${project.title} on GitHub (opens in new tab)`}
        className="group/gh inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 text-white rounded-full font-medium text-sm hover:bg-white/10 active:scale-95 transition-all duration-300 ring-1 ring-white/[0.06] focus-ring"
      >
        <Github
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover/gh:rotate-12 group-hover/gh:-translate-y-0.5"
        />
        Source Code
      </a>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Projects() {
  const N = PROJECTS.length;

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect (and react live to) prefers-reduced-motion so the scroll-jacked
  // cinematic version never runs for people who've asked for less motion.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Per-project refs — every project is mounted simultaneously (stacked),
  // GSAP crossfades/transitions between them as the user scrolls.
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const goalRefs = useRef<(HTMLDivElement | null)[]>([]);
  const problemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const solutionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionProgressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  const stRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const progressMotionValue = useMotionValue(0);

  // Cheap, non-React DOM writes driven directly from ScrollTrigger's
  // onUpdate — avoids re-rendering React on every scroll frame.
  const updateNav = useCallback(
    (progress: number) => {
      if (N <= 1) return;
      const raw = progress * (N - 1);
      const newActive = Math.min(N - 1, Math.max(0, Math.round(raw)));

      if (activeIndexRef.current !== newActive) {
        activeIndexRef.current = newActive;
      }

      if (sectionProgressRef.current) {
        sectionProgressRef.current.style.transform = `scaleX(${progress})`;
      }

      if (percentRef.current) {
        percentRef.current.textContent = `${Math.round(progress * 100)}%`;
      }

      progressMotionValue.set(progress);
    },
    [N, progressMotionValue]
  );

  // Click / keyboard navigation jumps the real scroll position to the
  // point in the pinned range that corresponds to a given project.
  const goToIndex = useCallback(
    (i: number) => {
      const clamped = Math.min(N - 1, Math.max(0, i));
      const st = stRef.current;
      if (!st || N <= 1) return;
      const target = st.start + (clamped / (N - 1)) * (st.end - st.start);
      gsap.to(window, { duration: 1, ease: "power2.inOut", scrollTo: { y: target, autoKill: true } });
    },
    [N]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToIndex(activeIndexRef.current - 1);
      if (e.key === "ArrowRight") goToIndex(activeIndexRef.current + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToIndex, prefersReducedMotion]);

  useGSAP(
    () => {
      if (prefersReducedMotion || N <= 1 || !pinRef.current) return;

      // ---- Initial states -------------------------------------------------
      imageRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, i === 0 ? { y: "0%", scale: 1, opacity: 1 } : { y: "100%", scale: 1, opacity: 1 });
      });

      glowRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: i === 0 ? 1 : 0 });
      });

      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: i === 0 ? 1 : 0, pointerEvents: i === 0 ? "auto" : "none" });
      });

      titleRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(
          el,
          i === 0
            ? { clipPath: "inset(0% 0% 0% 0%)", y: 0, opacity: 1 }
            : { clipPath: "inset(0% 0% 100% 0%)", y: 24, opacity: 0 }
        );
      });

      [goalRefs, problemRefs, solutionRefs].forEach((refArr) => {
        refArr.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, i === 0 ? { y: 0, opacity: 1 } : { y: 18, opacity: 0 });
        });
      });

      ctaRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, i === 0 ? { y: 0, opacity: 1 } : { y: 14, opacity: 0 });
      });

      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        const features = panel.querySelectorAll(".feature-item");
        const pills = panel.querySelectorAll(".tech-pill");
        gsap.set(features, i === 0 ? { x: 0, opacity: 1 } : { x: -12, opacity: 0 });
        gsap.set(pills, i === 0 ? { scale: 1, y: 0, opacity: 1 } : { scale: 0.85, y: 6, opacity: 0 });
      });

      // ---- Master scrubbed timeline ---------------------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${(N - 1) * window.innerHeight * 1.25}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateNav(self.progress),
        },
      });
      stRef.current = tl.scrollTrigger as ScrollTrigger;

      for (let i = 0; i < N - 1; i++) {
        const panelOut = panelRefs.current[i];
        const panelIn = panelRefs.current[i + 1];
        const featuresIn = panelIn?.querySelectorAll(".feature-item");
        const pillsIn = panelIn?.querySelectorAll(".tech-pill");

        // Screenshot stack: outgoing shrinks, fades slightly, recedes;
        // incoming slides up from below to become the active card.
        tl.to(imageRefs.current[i], { scale: 0.82, opacity: 0.4, y: "-4%", duration: 1, ease: "none" }, i);
        tl.to(imageRefs.current[i + 1], { y: "0%", duration: 1, ease: "none" }, i);

        // Ambient background glow crossfades to the next project&apos;s accent.
        tl.to(glowRefs.current[i], { opacity: 0, duration: 0.5, ease: "none" }, i);
        tl.to(glowRefs.current[i + 1], { opacity: 1, duration: 0.6, ease: "none" }, i + 0.2);

        // Outgoing text recedes as a whole.
        if (panelOut) {
          tl.to(panelOut, { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" }, i);
          tl.set(panelOut, { pointerEvents: "none" }, i + 0.3);
        }

        // Incoming text reveals in sequence, synced to the same window.
        if (panelIn) {
          tl.set(panelIn, { pointerEvents: "auto" }, i + 0.05);
          tl.to(panelIn, { opacity: 1, duration: 0.01, ease: "none" }, i + 0.05);

          tl.to(
            titleRefs.current[i + 1],
            { clipPath: "inset(0% 0% 0% 0%)", y: 0, opacity: 1, duration: 0.28, ease: "power3.out" },
            i + 0.08
          );
          tl.to(goalRefs.current[i + 1], { y: 0, opacity: 1, duration: 0.22, ease: "power2.out" }, i + 0.22);
          tl.to(problemRefs.current[i + 1], { y: 0, opacity: 1, duration: 0.22, ease: "power2.out" }, i + 0.32);
          tl.to(solutionRefs.current[i + 1], { y: 0, opacity: 1, duration: 0.22, ease: "power2.out" }, i + 0.42);

          if (featuresIn && featuresIn.length) {
            tl.to(
              featuresIn,
              { x: 0, opacity: 1, stagger: 0.05, duration: 0.2, ease: "power2.out" },
              i + 0.55
            );
          }
          if (pillsIn && pillsIn.length) {
            tl.to(
              pillsIn,
              { scale: 1, y: 0, opacity: 1, stagger: 0.03, duration: 0.2, ease: "back.out(1.6)" },
              i + 0.68
            );
          }

          tl.to(ctaRefs.current[i + 1], { y: 0, opacity: 1, duration: 0.22, ease: "power2.out" }, i + 0.8);
        }
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding bg-[#0B0F19] relative"
      aria-label="Selected projects showcase"
    >
      <div className="container-tight">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 lg:mb-24"
        >
          <AnimatedText
            text="Selected Projects"
            textClassName="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-white leading-[1.1] text-left"
            underlineClassName="text-sky-400"
            className="items-start mb-4 md:mb-6"
          />
          <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl leading-relaxed text-balance">
            A curated collection of projects that demonstrate my expertise in
            building modern, performant web applications.
          </p>
        </motion.div>
      </div>

      {prefersReducedMotion ? (
        // -------------------------------------------------------------
        // Reduced-motion fallback: plain stacked layout, no scroll-jacking,
        // no scale/opacity choreography — fully accessible and motion-free.
        // -------------------------------------------------------------
        <div className="container-tight">
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className="project-static-item flex flex-col lg:flex-row gap-6 lg:gap-10 items-start mb-16 last:mb-0"
            >
              <div className="relative w-full lg:w-1/2 h-[240px] sm:h-[320px] lg:h-[380px] rounded-2xl lg:rounded-3xl overflow-hidden ring-1 ring-white/[0.06] bg-[#0d1525]">
                <Image
                  src={p.image}
                  alt={`${p.title} project preview`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
              <div className="glass-strong rounded-2xl lg:rounded-3xl shadow-2xl p-6 lg:p-8 w-full lg:w-1/2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 lg:mb-4">
                  {p.title}
                </h2>
                <CaseStudyContent caseStudy={p.caseStudy} />
                <TechPills tags={p.tags} />
                <ProjectCTAs project={p} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        // -------------------------------------------------------------
        // Cinematic pinned scroll-storytelling experience
        // -------------------------------------------------------------
        <div ref={pinRef} className="relative h-screen w-full overflow-hidden mt-6 lg:mt-2">
          {/* Section scroll progress */}
          <div
            ref={sectionProgressRef}
            className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 origin-left scale-x-0 z-20 will-change-transform"
            aria-hidden="true"
          />

          {/* Ambient background glow layers, crossfaded per project */}
          {PROJECTS.map((p, i) => (
            <div
              key={`glow-${p.id}`}
              ref={(el) => {
                glowRefs.current[i] = el;
              }}
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none will-change-opacity"
              style={{
                background: `radial-gradient(60% 50% at 50% 35%, ${GLOW_COLORS[i % GLOW_COLORS.length]}22 0%, transparent 70%)`,
                filter: "blur(90px)",
              }}
            />
          ))}

          <div className="relative h-full container-tight flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 w-full items-center">
              {/* Screenshot stack */}
              <div className="relative h-[32vh] sm:h-[40vh] lg:h-[60vh] xl:h-[64vh] rounded-2xl lg:rounded-3xl overflow-hidden ring-1 ring-white/[0.06] bg-[#0d1525]">
                {PROJECTS.map((p, i) => (
                  <div
                    key={p.id}
                    ref={(el) => {
                      imageRefs.current[i] = el;
                    }}
                    className="absolute inset-0 gpu will-change-transform"
                  >
                    <Image
                      src={p.image}
                      alt={`${p.title} project preview`}
                      fill
                      className="object-cover"
                      draggable={false}
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>

              {/* Text stack */}
              <div
                className="relative h-[46vh] lg:h-[60vh] xl:h-[64vh]"
                aria-live="polite"
                aria-atomic="true"
              >
                {PROJECTS.map((p, i) => (
                  <div
                    key={p.id}
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                    className="absolute inset-0 glass-strong rounded-2xl lg:rounded-3xl shadow-2xl p-5 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto will-change-opacity"
                  >
                    <h2
                      ref={(el) => {
                        titleRefs.current[i] = el;
                      }}
                      className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 lg:mb-4"
                    >
                      {p.title}
                    </h2>
                    <CaseStudyContent
                      caseStudy={p.caseStudy}
                      refs={{
                        goal: (el) => {
                          goalRefs.current[i] = el;
                        },
                        problem: (el) => {
                          problemRefs.current[i] = el;
                        },
                        solution: (el) => {
                          solutionRefs.current[i] = el;
                        },
                      }}
                    />
                    <TechPills tags={p.tags} />
                    <ProjectCTAs
                      project={p}
                      ctaRef={(el) => {
                        ctaRefs.current[i] = el;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Circular scroll progress */}
          <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 z-20">
            <div className="group bg-white/5 flex size-12 items-center justify-center rounded-2xl border border-white/10 backdrop-blur-md ring-1 ring-white/[0.06]">
              <span
                ref={percentRef}
                className="absolute -top-1 flex h-8 -translate-y-full items-center justify-center px-4 text-xs font-medium tabular-nums text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                0%
              </span>
              <svg className="size-10" viewBox="0 0 48 48" role="presentation">
                <circle
                  cx="24"
                  cy="24"
                  r={18}
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-white/20"
                  fill="none"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r={18}
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  style={{
                    pathLength: progressMotionValue,
                    rotate: -90,
                    transformOrigin: "50% 50%",
                  }}
                  className="text-sky-400"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}