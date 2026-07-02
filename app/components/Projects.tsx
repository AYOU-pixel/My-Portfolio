"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import { ExternalLink, Github, Cloud, Sparkles, ChevronLeft, ChevronRight, Target, Lightbulb, Wrench, CheckCircle2 } from "lucide-react";
import { FaReact, FaHtml5, FaStripeS } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiPrisma } from "react-icons/si";
import type { IconType } from "react-icons";
import { AnimatedText } from "./ui/AnimatedUnderline";

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
// Framer Motion variants
// ---------------------------------------------------------------------------

const tagContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const tagItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 24 },
  },
};

const imageVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    scale: 1.04,
    x: direction > 0 ? 30 : -30,
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction: number) => ({
    opacity: 0,
    scale: 0.97,
    x: direction > 0 ? -30 : 30,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

const contentVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 20 : -20,
  }),
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -20 : 20,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface ProjectTechTagsProps {
  tags: string[];
  isInView: boolean;
  className?: string;
}

function ProjectTechTags({ tags, isInView, className = "mb-8" }: ProjectTechTagsProps) {
  return (
    <motion.div
      variants={tagContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {tags.map((tag) => {
        const tech = TECH_ICONS[tag] ?? FALLBACK_TECH;
        const Icon = tech.icon;

        return (
          <motion.div
            key={tag}
            variants={tagItemVariants}
            whileHover={{
              scale: 1.06,
              y: -2,
              transition: { type: "spring", stiffness: 400, damping: 18 },
            }}
            whileTap={{ scale: 0.95 }}
            className="group/tag relative"
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
          </motion.div>
        );
      })}
    </motion.div>
  );
}

const caseStudyVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

interface CaseStudyBlockProps {
  caseStudy: Project["caseStudy"];
  isInView: boolean;
}

function CaseStudyBlock({ caseStudy, isInView }: CaseStudyBlockProps) {
  return (
    <motion.div
      variants={caseStudyVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-6 space-y-3"
    >
      <div className="flex gap-2.5">
        <Target className="w-3.5 h-3.5 text-sky-400 mt-[3px] flex-shrink-0" aria-hidden="true" />
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-sky-400/80 block mb-0.5">
            Goal
          </span>
          <p className="text-xs text-[#94A3B8] leading-relaxed">{caseStudy.businessGoal}</p>
        </div>
      </div>

      <div className="flex gap-2.5">
        <Lightbulb className="w-3.5 h-3.5 text-[#94A3B8] mt-[3px] flex-shrink-0" aria-hidden="true" />
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]/60 block mb-0.5">
            Problem
          </span>
          <p className="text-xs text-[#94A3B8] leading-relaxed">{caseStudy.problem}</p>
        </div>
      </div>

      <div className="flex gap-2.5">
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
              <li key={f} className="text-xs text-[#94A3B8] leading-relaxed flex gap-1.5 items-start">
                <span className="text-sky-400/60 mt-[3px] leading-none select-none" aria-hidden="true">›</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const isContentInView = useInView(contentRef, { once: true, margin: "-80px" });

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % PROJECTS.length);
  }, []);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length);
  }, []);

  const goToProject = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrevious]);

  const currentProject = PROJECTS[currentIndex];

  return (
    <section 
      id="projects" 
      className="section-padding bg-[#0B0F19]"
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

        {/* Project display */}
        <div ref={contentRef} aria-live="polite" aria-atomic="true" aria-label={`Project ${currentIndex + 1} of ${PROJECTS.length}: ${currentProject.title}`}>

          {/* Unified responsive layout */}
          <div className="flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-8 xl:gap-8 px-0 lg:px-4">
            
            {/* Project Image */}
            <motion.div
              className="w-full lg:w-[450px] xl:w-[500px] h-[240px] sm:h-[280px] lg:h-[380px] xl:h-[400px] rounded-2xl lg:rounded-3xl overflow-hidden bg-[#0d1525] ring-1 ring-white/[0.06] flex-shrink-0"
              initial={{ opacity: 0, x: -30 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentProject.image}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentProject.image}
                    alt={`${currentProject.title} project preview`}
                    fill
                    className="object-cover"
                    draggable={false}
                    priority={currentIndex === 0}
                    loading={currentIndex === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Project Card */}
            <motion.div
              className="glass-strong rounded-2xl lg:rounded-3xl shadow-2xl p-5 sm:p-6 lg:p-8 xl:p-10 w-full lg:w-[420px] xl:w-[480px] z-10 lg:-ml-12 xl:-ml-20 relative flex-shrink-0"
              initial={{ opacity: 0, x: 30 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentProject.title}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className="mb-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 lg:mb-4">
                      {currentProject.title}
                    </h2>
                    <CaseStudyBlock caseStudy={currentProject.caseStudy} isInView={isContentInView} />
                  </div>

                  <ProjectTechTags tags={currentProject.tags} isInView={isContentInView} />

                  <motion.div
                    className="flex flex-col sm:flex-row gap-2.5 sm:gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <motion.a
                      href={currentProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${currentProject.title} (opens in new tab)`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-[#0B0F19] rounded-full font-medium text-sm hover:bg-[#E2E8F0] transition-colors focus-ring"
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    >
                      <ExternalLink size={16} aria-hidden="true" />
                      Live Demo
                    </motion.a>
                    <motion.a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code of ${currentProject.title} on GitHub (opens in new tab)`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 text-white rounded-full font-medium text-sm hover:bg-white/10 transition-colors ring-1 ring-white/[0.06] focus-ring"
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    >
                      <Github size={16} aria-hidden="true" />
                      Source Code
                    </motion.a>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Pagination Controls */}
        <motion.div
          className="flex justify-center items-center gap-4 md:gap-6 mt-10 md:mt-12 lg:mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.button
            onClick={handlePrevious}
            aria-label="Previous project"
            className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] shadow-md flex items-center justify-center hover:bg-white/[0.06] transition-colors focus-ring"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            <ChevronLeft className="w-6 h-6 text-[#94A3B8]" aria-hidden="true" />
          </motion.button>

          <div className="flex gap-2" role="tablist" aria-label="Project navigation">
            {PROJECTS.map((project, projectIndex) => (
              <motion.button
                key={project.id}
                onClick={() => goToProject(projectIndex)}
                role="tab"
                aria-selected={projectIndex === currentIndex}
                aria-controls="project-content"
                aria-label={`Project ${projectIndex + 1}: ${project.title}`}
                className={`rounded-full transition-all duration-300 focus-ring ${
                  projectIndex === currentIndex
                    ? "bg-sky-400 w-6 h-3"
                    : "bg-white/20 hover:bg-white/40 w-3 h-3"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <motion.button
            onClick={handleNext}
            aria-label="Next project"
            className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] shadow-md flex items-center justify-center hover:bg-white/[0.06] transition-colors focus-ring"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            <ChevronRight className="w-6 h-6 text-[#94A3B8]" aria-hidden="true" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}