"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Cloud, Sparkles } from "lucide-react";
import { FaReact, FaHtml5, FaStripeS } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiPrisma } from "react-icons/si";

const TECH_ICONS: Record<string, { icon: React.ElementType; color: string; glow: string }> = {
  React: { icon: FaReact, color: "#61DAFB", glow: "rgba(97,218,251,0.35)" },
  "Next.js": { icon: SiNextdotjs, color: "#ffffff", glow: "rgba(255,255,255,0.2)" },
  "API Integration": { icon: Cloud, color: "#60A5FA", glow: "rgba(96,165,250,0.35)" },
  Prisma: { icon: SiPrisma, color: "#5A67D8", glow: "rgba(90,103,216,0.35)" },
  Stripe: { icon: FaStripeS, color: "#635BFF", glow: "rgba(99,91,255,0.35)" },
  MongoDB: { icon: SiMongodb, color: "#47A248", glow: "rgba(71,162,72,0.35)" },
  Tailwind: { icon: SiTailwindcss, color: "#38BDF8", glow: "rgba(56,189,248,0.35)" },
  HTML: { icon: FaHtml5, color: "#E34F26", glow: "rgba(227,79,38,0.35)" },
  AOS: { icon: Sparkles, color: "#FF6B6B", glow: "rgba(255,107,107,0.35)" },
};

const tagContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.3 },
  },
};

const tagItemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 22 },
  },
};

const PROJECTS = [
  {
    id: 1,
    title: "Weather Application",
    description: "Real-time weather forecasting with location detection and intuitive data visualization.",
    image: "/weather.webp",
    link: "https://weather-app-navy-sigma-78.vercel.app/",
    github: "https://github.com/AYOU-pixel/Weather-App",
    tags: ["React", "Next.js", "API Integration"],
  },
  {
    id: 2,
    title: "Airbnb Clone",
    description: "Full-featured booking platform with authentication, payments, and responsive design.",
    image: "/airbnb.png",
    link: "https://airbnb-clone-eosin-sigma.vercel.app/",
    github: "https://github.com/AYOU-pixel/Airbnb-Clone",
    tags: ["Next.js", "Prisma", "Stripe"],
  },
  {
    id: 3,
    title: "Fashion E-Commerce",
    description: "Modern e-commerce platform with real-time tracking, secure payments, and OAuth.",
    image: "/AURA.png",
    link: "https://clothes-store-six-indol.vercel.app",
    github: "https://github.com/AYOU-pixel/Clothes-Store",
    tags: ["Next.js", "MongoDB", "Tailwind"],
  },
  {
    id: 4,
    title: "Gym Landing Page",
    description: "Conversion-optimized landing page with WhatsApp integration and modern animations.",
    image: "/gym.png",
    link: "https://landing-page-gym-blush.vercel.app",
    github: "https://github.com/AYOU-pixel/LandingPageGym",
    tags: ["HTML", "Tailwind", "AOS"],
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-white/[0.06] bg-[#111827]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#0B0F19]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        <div className="absolute inset-0 flex items-end p-6">
          <div className="w-full">
            <div className="flex items-center justify-between mb-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex gap-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Live demo"
                >
                  <ExternalLink size={16} className="text-white" />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Source code"
                >
                  <Github size={16} className="text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-sky-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        
        <motion.div
          variants={tagContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap gap-2"
        >
          {project.tags.map((tag) => {
            const tech = TECH_ICONS[tag] ?? { icon: Sparkles, color: "#94A3B8", glow: "rgba(148,163,184,0.2)" };
            const Icon = tech.icon;

            return (
              <motion.div
                key={tag}
                variants={tagItemVariants}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                className="group/tag relative"
              >
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#94A3B8] bg-white/5 rounded-md ring-1 ring-white/[0.06] transition-all duration-300 hover:bg-white/[0.05]"
                  style={{ "--tag-glow": tech.glow } as React.CSSProperties}
                >
                  <div className="absolute inset-0 rounded-md opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300 bg-[var(--tag-glow)] blur-md" />
                  <Icon
                    className="relative z-10 w-3 h-3"
                    style={{ color: tech.color }}
                  />
                  <span className="relative z-10">{tag}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding bg-[#0B0F19]">
      <div className="container-tight">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Selected <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
            A curated collection of projects that demonstrate my expertise in building modern, performant web applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}