// about.jsx - Professional Design Matching Projects & Hero
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  Download,
  ArrowRight,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Database,
  Wrench,
  Calendar,
  Trophy,
  MapPin,
  Mail,
  Sparkles,
  Target,
  Award,
  Zap,
} from "lucide-react";
import { FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiMongodb, 
  SiExpress, 
  SiTypescript, 
  SiJavascript,
  SiPostgresql,
  SiPrisma,
  SiFigma
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import { Progress } from "@/app/components/ui/progress";

// --- CONFIGURATION ---
const PORTFOLIO_CONFIG = {
  name: "AYOUB",
  title: "Full-Stack Developer",
  resumeUrl: "/RACHIDI-AYOUB-FlowCV-Resume-20251030.pdf",
  socials: {
    github: "https://github.com/AYOU-pixel",
    linkedin: "https://www.linkedin.com/in/ayoub-rchidi-0b344a322/",
  },
};

// --- SKILLS DATA ---
const SKILLS = {
  frontend: [
    { name: "React", icon: <FaReact />, level: 90, color: "text-cyan-400" },
    { name: "Next.js", icon: <SiNextdotjs />, level: 85, color: "text-white" },
    { name: "TypeScript", icon: <SiTypescript />, level: 80, color: "text-blue-400" },
    { name: "JavaScript", icon: <SiJavascript />, level: 90, color: "text-yellow-400" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 95, color: "text-cyan-400" },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs />, level: 75, color: "text-emerald-400" },
    { name: "Express", icon: <SiExpress />, level: 70, color: "text-gray-300" },
    { name: "MongoDB", icon: <SiMongodb />, level: 80, color: "text-emerald-400" },
    { name: "PostgreSQL", icon: <SiPostgresql />, level: 65, color: "text-blue-400" },
    { name: "Prisma", icon: <SiPrisma />, level: 80, color: "text-indigo-400" },
  ],
  tools: [
    { name: "Git", icon: <FaGitAlt />, level: 85, color: "text-orange-400" },
    { name: "VS Code", icon: <VscCode />, level: 95, color: "text-blue-300" },
    { name: "Figma", icon: <SiFigma />, level: 75, color: "text-purple-400" },
  ],
};

// --- EXPERIENCE DATA ---
const EXPERIENCE = [
  {
    year: "2024 – Present",
    title: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    location: "Morocco",
    description: "Developing modern full-stack applications using React, Next.js, Node.js, and MongoDB. Delivering high-performance solutions for clients worldwide.",
    achievements: ["Built 12+ production applications", "95% client satisfaction rate", "35% performance optimization"],
    tech: ["React", "Next.js", "MongoDB", "Prisma", "Tailwind CSS"],
  },
  {
    year: "2023 – 2024",
    title: "Full-Stack Learning Journey",
    company: "Self-Learning",
    location: "Remote",
    description: "Mastered full-stack development through intensive self-study and project building. Focused on modern web technologies and best practices.",
    achievements: ["20+ diverse projects completed", "Comprehensive portfolio development", "Database optimization expertise"],
    tech: ["JavaScript", "Node.js", "Express", "React", "MongoDB"],
  },
  {
    year: "2023",
    title: "Development Bootcamp",
    company: "Online Learning",
    location: "Remote",
    description: "Completed intensive full-stack bootcamp focusing on modern JavaScript frameworks, database management, and deployment strategies.",
    achievements: ["Full-stack certification earned", "First scalable application deployed", "Prisma ORM mastered"],
    tech: ["Next.js", "Prisma", "Vercel", "Stripe", "NextAuth"],
  },
];

// --- STATS DATA ---
const STATS = [
  { number: "12+", label: "Projects Completed", icon: <Briefcase className="w-5 h-5" /> },
  { number: "95%", label: "Client Satisfaction", icon: <Award className="w-5 h-5" /> },
  { number: "1+", label: "Years Experience", icon: <Calendar className="w-5 h-5" /> },
  { number: "20+", label: "Technologies Mastered", icon: <Zap className="w-5 h-5" /> },
];

// --- ANIMATION VARIANTS ---
const FADE_IN_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      ease: "easeOut"
    }
  }
};

// --- BACKGROUND COMPONENT ---
const AboutBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
    <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-[aurora_20s_infinite_alternate] top-1/4 left-1/4"></div>
    <div className="absolute w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-3xl animate-[aurora_25s_infinite_alternate_reverse] bottom-1/4 right-1/4"></div>
    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] opacity-10" />
    <style jsx>{`
      @keyframes aurora {
        0% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(60px, 40px) rotate(180deg); }
        100% { transform: translate(0, 0) rotate(360deg); }
      }
    `}</style>
  </div>
);

// --- MAIN COMPONENT ---
export default function About() {
  const sectionRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const animationProps = (delay = 0) => ({
    ...FADE_IN_UP,
    transition: { ...FADE_IN_UP.transition, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <AboutBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={animationProps()}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 mb-6 py-2 px-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm shadow-lg shadow-cyan-500/5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-lg shadow-cyan-500/50"></span>
            </span>
            <span className="text-sm text-cyan-300 font-semibold tracking-wide">My Journey</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Me</span>
          </h2>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            A self-taught full-stack developer passionate about building modern web applications
            that combine innovative design with robust engineering.
          </p>
        </motion.div>

        {/* Profile Section */}
        <ProfileSection animationProps={animationProps} />

        {/* Stats Section */}
        <StatsSection animationProps={animationProps} />

        {/* Skills Section */}
        <SkillsSection animationProps={animationProps} />

        {/* Experience Section */}
        <ExperienceSection animationProps={animationProps} />
      </div>
    </section>
  );
}

// --- PROFILE SECTION ---
const ProfileSection = ({ animationProps }) => {
  const profileRef = useRef(null);
  const isInView = useInView(profileRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={profileRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={STAGGER_CONTAINER}
      className="mb-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
        {/* Left Column: Image */}
        <motion.div
          variants={FADE_IN_UP}
          className="lg:col-span-5 relative"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Image Container */}
            <Card className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-md overflow-hidden">
              <CardContent className="p-4">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="/ayoub.png"
                    alt={`${PORTFOLIO_CONFIG.name} - Professional headshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover scale-105"
                    quality={95}
                    priority
                  />
                </div>
              </CardContent>
            </Card>

            {/* Status Badge */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Available for Projects
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Content */}
        <motion.div
          variants={FADE_IN_UP}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 space-y-6"
        >
          <div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {PORTFOLIO_CONFIG.name}
            </h3>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
              <p className="text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-medium">
                {PORTFOLIO_CONFIG.title}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed">
              Hello! I'm a passionate self-taught developer from Morocco, specializing in building modern, 
              responsive web applications. My journey started with curiosity about how things work on the web, 
              and has evolved into expertise in full-stack development.
            </p>
            <p className="text-slate-300 leading-relaxed">
              I focus on creating clean, efficient applications using technologies like React, Next.js, 
              Node.js, MongoDB, and Prisma. Every project is an opportunity to solve problems creatively 
              and deliver exceptional user experiences.
            </p>
          </div>

          {/* Location & Contact */}
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Morocco</span>
            </div>
            <div className="w-1 h-1 bg-slate-600 rounded-full" />
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">Available for remote work</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300 backdrop-blur-sm"
                  >
                    <a
                      href={PORTFOLIO_CONFIG.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="w-5 h-5" />
                      <span className="hidden sm:inline">GitHub</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 border-slate-700">
                  <p>View my GitHub profile</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:border-blue-500/50 hover:text-blue-300 transition-all duration-300 backdrop-blur-sm"
                  >
                    <a
                      href={PORTFOLIO_CONFIG.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="hidden sm:inline">LinkedIn</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 border-slate-700">
                  <p>Connect on LinkedIn</p>
                </TooltipContent>
              </Tooltip>

              <Button
                asChild
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25"
              >
                <a
                  href={PORTFOLIO_CONFIG.resumeUrl}
                  download
                  className="flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span className="hidden sm:inline">Resume</span>
                </a>
              </Button>
            </TooltipProvider>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- STATS SECTION ---
const StatsSection = ({ animationProps }) => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={statsRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={STAGGER_CONTAINER}
      className="mb-24"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={FADE_IN_UP}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl mb-4">
                  <div className="text-cyan-400">{stat.icon}</div>
                </div>
                <h4 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </h4>
                <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// --- SKILLS SECTION ---
const SkillsSection = ({ animationProps }) => {
  const skillsRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={skillsRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={STAGGER_CONTAINER}
      className="mb-24"
    >
      <motion.div
        variants={FADE_IN_UP}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold text-white mb-4">
          Technical <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Expertise</span>
        </h3>
        <p className="text-slate-300 max-w-2xl mx-auto">
          A comprehensive skill set focused on modern web development technologies
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <SkillCategory
          title="Frontend Development"
          icon={<Code className="w-5 h-5" />}
          skills={SKILLS.frontend}
          delay={0.1}
        />

        <SkillCategory
          title="Backend Development"
          icon={<Database className="w-5 h-5" />}
          skills={SKILLS.backend}
          delay={0.2}
        />

        <SkillCategory
          title="Development Tools"
          icon={<Wrench className="w-5 h-5" />}
          skills={SKILLS.tools}
          delay={0.3}
        />
      </div>
    </motion.div>
  );
};

// --- SKILL CATEGORY COMPONENT ---
const SkillCategory = ({ title, icon, skills, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay, duration: 0.6 }}
    whileHover={{ y: -8 }}
  >
    <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg flex items-center justify-center">
            <div className="text-cyan-400">{icon}</div>
          </div>
          <h4 className="text-xl font-bold text-white">{title}</h4>
        </div>

        <div className="space-y-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + (index * 0.05) }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`text-lg ${skill.color} transition-transform duration-200`}>
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </div>
                <span className="text-xs text-slate-500">{skill.level}%</span>
              </div>
              
              <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + (index * 0.1), duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    skill.level >= 80 ? 'bg-gradient-to-r from-cyan-500 to-blue-500' :
                    skill.level >= 60 ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' :
                    'bg-gradient-to-r from-blue-500 to-indigo-500'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// --- EXPERIENCE SECTION ---
const ExperienceSection = ({ animationProps }) => {
  const experienceRef = useRef(null);
  const isInView = useInView(experienceRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={experienceRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={STAGGER_CONTAINER}
      className="max-w-4xl mx-auto"
    >
      <motion.div
        variants={FADE_IN_UP}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold text-white mb-4">
          Professional <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Journey</span>
        </h3>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Key milestones in my development career and continuous learning path
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/30 via-blue-500/30 to-purple-500/30" />

        <div className="space-y-8">
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={index}
              variants={FADE_IN_UP}
              transition={{ delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-3 md:left-1/2 transform md:-translate-x-1/2 top-6 z-10">
                <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full border-4 border-slate-900 shadow-lg shadow-cyan-500/25" />
              </div>

              {/* Year Badge */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm px-4 py-2">
                  {exp.year}
                </Badge>
              </div>

              {/* Experience Card */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-white mb-1">{exp.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="text-cyan-400">{exp.company}</span>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs bg-slate-700/50 border border-slate-600/50 text-slate-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Achievements */}
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Trophy className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                          <span className="text-xs text-slate-400">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};