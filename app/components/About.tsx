"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPrisma,
  SiExpress,
  SiMongodb,
  SiGit,
  SiFigma,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { AnimatedText } from "./ui/AnimatedUnderline";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SkillItem {
  name: string;
  icon: IconType;
  color: string;
}

interface SkillGroup {
  category: string;
  items: SkillItem[];
}

interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SKILLS: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React",       icon: FaReact,       color: "#61DAFB" },
      { name: "Next.js",     icon: SiNextdotjs,   color: "#ffffff" },
      { name: "TypeScript",  icon: SiTypescript,  color: "#3178C6" },
      { name: "Tailwind CSS",icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: FaNodeJs,  color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#ffffff"  },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248"  },
      { name: "Prisma",  icon: SiPrisma,  color: "#5A67D8"  },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git",   icon: SiGit,   color: "#F05032" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
];

const EXPERIENCE: ExperienceEntry[] = [
  {
    period: "2024 — Present",
    role: "Frontend Engineer | Freelance & Independent Projects",
    company: "Self-Employed",
    description:
      "Designing and developing high-performance web experiences focused on frontend performance, user engagement, and conversion-oriented UX. Specialized in building landing pages optimized for lead generation, scalable React/Next.js applications, modern UI systems, and responsive digital experiences. Worked on projects including fitness brands, healthy meal platforms, and fashion e-commerce applications.",
  },
];

// ---------------------------------------------------------------------------
// Typed Framer Motion variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 24 },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-[#0B0F19] relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] md:w-[800px] md:h-[400px] bg-indigo-500/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-tight relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 lg:mb-24"
        >
          <AnimatedText
            text="About Me"
            textClassName="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-white leading-[1.1] text-left"
            underlineClassName="text-sky-400"
            className="items-start mb-4 md:mb-6"
          />
          <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl leading-relaxed text-balance">
           Frontend Engineer based in Morocco, specialized in building high-performance web experiences that combine modern UI engineering with business-focused thinking.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

          {/* ── Left column: photo + stats ── */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="relative aspect-square max-w-sm md:max-w-md mx-auto lg:mx-0"
            >
              <Image
                src="/ayoub.png"
                alt="Ayoub Rachidi — Frontend Engineer"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </motion.div>
          </div>

          {/* ── Right column: bio, skills, experience ── */}
          <div className="lg:col-span-7 space-y-10 md:space-y-12">

            {/* Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.55, delay: 0.25 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4">
                Background
              </h3>
              <div className="space-y-3.5 md:space-y-4 text-[#94A3B8] leading-relaxed text-[15px] md:text-base">
                <p className="text-balance">
                  My work goes beyond creating visually polished interfaces. I focus on building fast, scalable, and conversion-oriented digital products designed to improve engagement, usability, and overall user experience.
                </p>
                <p className="text-balance">
                  Over the past few years, I&apos;ve worked extensively with the React ecosystem — particularly Next.js, TypeScript, and modern frontend architectures — developing production-ready applications ranging from conversion-focused landing pages to scalable e-commerce platforms.
                </p>
                <p className="text-balance">
                  I&apos;m especially interested in the intersection of frontend performance, UX optimization, conversion-focused design, and scalable UI systems.
                </p>
                <p className="text-balance">
                  My approach combines technical execution with product thinking, ensuring that every interface is not only aesthetically refined, but also strategically designed to support business goals and user behavior.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 md:mt-6 text-sm text-[#64748B]">
                <div className="flex items-center gap-2">
                  <MapPin size={15} aria-hidden="true" />
                  <span>Morocco</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={15} aria-hidden="true" />
                  <span>Open to remote</span>
                </div>
              </div>
            </motion.div>

            {/* Technical Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.55, delay: 0.35 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">
                Technical Expertise
              </h3>
              <div className="space-y-6 md:space-y-8">
                {SKILLS.map((group) => (
                  <div key={group.category}>
                    <h4 className="text-xs md:text-sm font-medium text-[#64748B] uppercase tracking-[0.12em] mb-3 md:mb-4">
                      {group.category}
                    </h4>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      className="flex flex-wrap gap-2 md:gap-3"
                      role="list"
                      aria-label={`${group.category} skills`}
                    >
                      {group.items.map((skill) => (
                        <motion.div
                          key={skill.name}
                          variants={itemVariants}
                          whileHover={{
                            scale: 1.06,
                            y: -2,
                            transition: { type: "spring", stiffness: 450, damping: 16 },
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="group relative"
                          role="listitem"
                        >
                          <div
                            className="flex items-center gap-2 md:gap-2.5 px-3 md:px-4 py-2 md:py-2.5 glass rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/[0.05] hover:ring-white/[0.08] ring-1 ring-transparent"
                            style={
                              {
                                "--icon-color": skill.color,
                                "--glow-color": `${skill.color}40`,
                              } as React.CSSProperties
                            }
                          >
                            <div
                              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--glow-color)] blur-md pointer-events-none"
                              aria-hidden="true"
                            />
                            <skill.icon
                              className="relative z-10 w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:scale-110"
                              style={{ color: skill.color }}
                              aria-hidden="true"
                            />
                            <span className="relative z-10 text-sm font-medium text-[#E2E8F0] group-hover:text-white transition-colors">
                              {skill.name}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Experience timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.55, delay: 0.45 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-5 md:mb-6">
                Experience
              </h3>
              <ol className="space-y-8 md:space-y-10 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-white/[0.08]">
                {EXPERIENCE.map((exp) => (
                  <li key={exp.role} className="pl-5 md:pl-6 relative">
                    <div
                      className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 -translate-x-[2.5px] md:-translate-x-[3px]"
                      aria-hidden="true"
                    />
                    <div className="text-xs md:text-sm text-sky-400 font-medium mb-1">
                      {exp.period}
                    </div>
                    <h4 className="text-base md:text-lg font-semibold text-white mb-0.5 md:mb-1">
                      {exp.role}
                    </h4>
                    <div className="text-xs md:text-sm text-[#64748B] mb-1.5 md:mb-2">
                      {exp.company}
                    </div>
                    <p className="text-sm text-[#94A3B8] leading-relaxed text-balance">
                      {exp.description}
                    </p>
                  </li>
                ))}
              </ol>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}