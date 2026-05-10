"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Briefcase, Award, Calendar, Zap } from "lucide-react";
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

const STATS = [
  { icon: Briefcase, label: "Projects", value: "12+" },
  { icon: Award, label: "Satisfaction", value: "95%" },
  { icon: Calendar, label: "Experience", value: "1+" },
  { icon: Zap, label: "Technologies", value: "20+" },
];

const SKILLS = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#ffffff" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Prisma", icon: SiPrisma, color: "#5A67D8" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
];

const EXPERIENCE = [
  {
    period: "2024 — Present",
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    description:
      "Delivering production-ready applications for clients worldwide using modern JavaScript ecosystems.",
  },
  {
    period: "2023 — 2024",
    role: "Full-Stack Learning Journey",
    company: "Self-Directed",
    description:
      "Mastered modern web development through intensive project-based learning and open source contributions.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 20 },
  },
};

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="section-padding bg-[#0B0F19] relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />

      <div className="container-tight relative z-10" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
            Frontend Engineer based in Morocco, crafting digital experiences with
            precision and passion.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden ring-1 ring-white/[0.06] bg-[#111827]"
            >
              <Image
                src="/ayoub.png"
                alt="Ayoub Rachidi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </motion.div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <stat.icon className="w-5 h-5 text-sky-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#64748B] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                Background
              </h3>
              <div className="space-y-4 text-[#94A3B8] leading-relaxed">
                <p>
                  I'm a self-taught developer with a strong foundation in computer
                  science and a passion for creating intuitive user interfaces. My
                  journey began with a curiosity for how things work on the web,
                  which evolved into a career building production-ready
                  applications.
                </p>
                <p>
                  I specialize in the React ecosystem, with deep expertise in
                  Next.js, TypeScript, and modern CSS architectures. My approach
                  combines technical excellence with design sensibility, ensuring
                  every project is both performant and visually polished.
                </p>
              </div>

              <div className="flex items-center gap-6 mt-6 text-sm text-[#64748B]">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Morocco</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>Open to remote</span>
                </div>
              </div>
            </motion.div>

            {/* Animated Skills with Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6">
                Technical Expertise
              </h3>
              <div className="space-y-8">
                {SKILLS.map((group) => (
                  <div key={group.category}>
                    <h4 className="text-sm font-medium text-[#64748B] uppercase tracking-wider mb-4">
                      {group.category}
                    </h4>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      className="flex flex-wrap gap-3"
                    >
                      {group.items.map((skill) => (
                        <motion.div
                          key={skill.name}
                          variants={itemVariants}
                          whileHover={{
                            scale: 1.08,
                            y: -2,
                            transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 15,
                            },
                          }}
                          className="group relative"
                        >
                          <div
                            className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/[0.05]"
                            style={
                              {
                                "--icon-color": skill.color,
                                "--glow-color": `${skill.color}40`,
                              } as React.CSSProperties
                            }
                          >
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--glow-color)] blur-md" />
                            <skill.icon
                              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                              style={{ color: skill.color }}
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6">
                Experience
              </h3>
              <div className="space-y-8 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                {EXPERIENCE.map((exp, i) => (
                  <div key={i} className="pl-6 relative">
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-sky-400 -translate-x-[3px]" />
                    <div className="text-sm text-sky-400 font-medium mb-1">
                      {exp.period}
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {exp.role}
                    </h4>
                    <div className="text-sm text-[#64748B] mb-2">
                      {exp.company}
                    </div>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}