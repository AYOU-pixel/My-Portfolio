//about
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
  Users,
  Trophy,
  Clock,
  Star,
  MapPin,
  Mail,
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
  SiFirebase,
  SiVercel,
  SiFigma,
  SiPrisma
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import { Progress } from "@/app/components/ui/progress";

// --- CONFIGURATION ---
const PORTFOLIO_CONFIG = {
  name: "Ayoub Rachd",
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
    { name: "React", icon: <FaReact />, level: 90, color: "text-sky-400" },
    { name: "Next.js", icon: <SiNextdotjs />, level: 85, color: "text-indigo-400" },
    { name: "TypeScript", icon: <SiTypescript />, level: 80, color: "text-blue-400" },
    { name: "JavaScript", icon: <SiJavascript />, level: 90, color: "text-yellow-400" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 95, color: "text-teal-400" },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs />, level: 75, color: "text-green-400" },
    { name: "Express", icon: <SiExpress />, level: 70, color: "text-gray-400" },
    { name: "MongoDB", icon: <SiMongodb />, level: 80, color: "text-emerald-500" },
    { name: "PostgreSQL", icon: <SiPostgresql />, level: 65, color: "text-blue-500" },
    { name: "Prisma", icon: <SiPrisma />, level: 80, color: "text-purple-500" },
  ],
  tools: [
    { name: "Git", icon: <FaGitAlt />, level: 85, color: "text-orange-500" },
    { name: "VS Code", icon: <VscCode />, level: 95, color: "text-blue-400" },
    { name: "Vercel", icon: <SiVercel />, level: 90, color: "text-gray-400" },
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
    description: "Developing scalable full-stack applications using React, Next.js, Node.js, and Prisma, delivering high-performance solutions for global clients.",
    achievements: ["Completed 12+ full-stack projects", "Achieved 95% client satisfaction", "Optimized backend performance by 35%"],
  },
  {
    year: "2023 – 2024",
    title: "Full-Stack Learning Path",
    company: "Self-Learning",
    location: "Remote",
    description: "Dedicated self-study in full-stack development, mastering React, Next.js, Tailwind CSS, Node.js, Express, MongoDB, and Prisma.",
    achievements: ["Built 20+ diverse projects", "Developed robust portfolio", "Integrated Prisma for efficient database management"],
  },
  {
    year: "2023",
    title: "Full-Stack Development Bootcamp",
    company: "Online Learning",
    location: "Remote",
    description: "Completed an intensive bootcamp focused on full-stack JavaScript, covering modern frameworks, databases, and deployment practices.",
    achievements: ["Earned full-stack certification", "Deployed first scalable application", "Mastered Prisma ORM"],
  },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- BACKGROUND COMPONENT ---
const BackgroundAurora = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
    <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-emerald-600/15 to-sky-500/15 rounded-full blur-3xl animate-[aurora_25s_infinite_alternate] top-1/4 left-1/4"></div>
    <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-sky-500/10 to-indigo-500/10 rounded-full blur-3xl animate-[aurora_30s_infinite_alternate_reverse] bottom-1/4 right-1/4"></div>
    <style jsx>{`
      @keyframes aurora {
        0% { transform: translate(0, 0); }
        50% { transform: translate(100px, 80px); }
        100% { transform: translate(0, 0); }
      }
    `}</style>
  </div>
);

// --- MAIN COMPONENT ---
export default function About() {
  const sectionRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);

    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const animationProps = (delay = 0) => ({
    ...itemVariants,
    transition: { ...itemVariants.transition, delay: reduceMotion ? 0 : delay },
  });

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden"
    >
      <BackgroundAurora />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_70%)] opacity-20" aria-hidden="true" />
      
      <motion.div
        className="absolute inset-0 bg-grid-slate-700/[0.03] bg-[length:60px_60px]"
        style={{ x: bgX, y: bgY }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* Header Section */}
        <HeaderSection animationProps={animationProps} />

        {/* Profile Section */}
        <ProfileSection animationProps={animationProps} />

        {/* Skills Section */}
        <SkillsSection animationProps={animationProps} />

        {/* Experience Timeline */}
        <ExperienceSection animationProps={animationProps} />
      </div>
    </div>
  );
}

// --- HEADER SECTION ---
const HeaderSection = ({ animationProps }) => (
  <motion.section
    id="about"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={containerVariants}
    className="text-center mb-20 max-w-4xl mx-auto"
  >
    <motion.h1
      variants={animationProps()}
      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
    >
      About{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500">
        Me
      </span>
    </motion.h1>
    <motion.p
      variants={animationProps(0.1)}
      className="text-lg text-slate-300 leading-relaxed"
    >
      A passionate self-taught web developer specializing in building full-stack applications that are clean, responsive, and efficient.
    </motion.p>
  </motion.section>
);

// --- PROFILE SECTION ---
const ProfileSection = ({ animationProps }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={containerVariants}
    className="mb-20"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
      {/* Profile Image */}
      <motion.div variants={animationProps()} className="relative">
        <Card className="bg-gradient-to-br from-slate-800/70 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm overflow-hidden shadow-2xl shadow-emerald-500/10">
          <CardContent className="p-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 to-sky-500/30 rounded-full blur-xl opacity-70"></div>
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/ayoub.png"
                  alt={`${PORTFOLIO_CONFIG.name} - Professional headshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  quality={95}
                  priority
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-700/50">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-sm text-slate-300">Available for projects</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profile Content */}
      <motion.div variants={animationProps(0.2)} className="space-y-6">
        <div>
          <div className="flex items-center mb-4">
            <div className="h-1 w-12 rounded bg-gradient-to-r from-emerald-400 to-sky-500 mr-4" />
            <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-400">
              Who I Am
            </h2>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{PORTFOLIO_CONFIG.name}</h3>
          <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 font-medium">
            {PORTFOLIO_CONFIG.title}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-base text-slate-300 leading-relaxed">
            I'm a dedicated self-taught developer from Morocco, specializing in full-stack development with a focus on creating clean, responsive, and efficient applications. My journey started with a passion for problem-solving and has grown into expertise in modern web technologies.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            Skilled in React, Next.js, Tailwind CSS, Node.js, Express, MongoDB, and Prisma, I thrive on building scalable solutions that deliver seamless user experiences and robust backend performance.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <MapPin className="w-4 h-4" />
          <span>Morocco</span>
          <span className="mx-2">•</span>
          <Mail className="w-4 h-4" />
          <span>Available for remote work</span>
        </div>

        <TooltipProvider>
          <div className="flex flex-wrap gap-4 pt-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href={PORTFOLIO_CONFIG.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="group relative overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-xl border border-gray-700 hover:border-gray-500 shadow-lg shadow-gray-900/25 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    <Github className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300 relative z-10" />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300 relative z-10 hidden sm:inline">
                      GitHub
                    </span>
                    <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-gray-300 transition-all duration-300 relative z-10 opacity-0 group-hover:opacity-100 transform translate-x-[-5px] group-hover:translate-x-0" />
                  </div>
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>
                <p>View my GitHub profile</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href={PORTFOLIO_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="group relative overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 rounded-xl border border-blue-700 hover:border-blue-500 shadow-lg shadow-blue-900/25 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    <Linkedin className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors duration-300 relative z-10" />
                    <span className="text-sm font-medium text-blue-300 group-hover:text-white transition-colors duration-300 relative z-10 hidden sm:inline">
                      LinkedIn
                    </span>
                    <ExternalLink className="w-3 h-3 text-blue-500 group-hover:text-blue-300 transition-all duration-300 relative z-10 opacity-0 group-hover:opacity-100 transform translate-x-[-5px] group-hover:translate-x-0" />
                  </div>
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Connect with me on LinkedIn</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href={PORTFOLIO_CONFIG.resumeUrl}
                  download
                  aria-label="Download Resume"
                  className="group relative overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-xl border border-emerald-500 hover:border-emerald-400 shadow-lg shadow-emerald-900/25 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    <Download className="w-5 h-5 text-emerald-100 group-hover:text-white transition-all duration-300 relative z-10 group-hover:animate-bounce" />
                    <span className="text-sm font-medium text-emerald-100 group-hover:text-white transition-colors duration-300 relative z-10 hidden sm:inline">
                      Resume
                    </span>
                    <motion.div
                      className="w-2 h-2 bg-emerald-300 rounded-full relative z-10"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                  </div>
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download my resume (PDF)</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </motion.div>
    </div>
  </motion.section>
);

// --- SKILLS SECTION ---
const SkillsSection = ({ animationProps }) => {
  const skillsRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={skillsRef}
      className="mb-20 max-w-6xl mx-auto"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div variants={animationProps()} className="text-center mb-12">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 mb-4">
          Skills & Technologies
        </h2>
        <p className="text-base text-slate-300 leading-relaxed">
          My toolkit for creating impactful and efficient web applications
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SkillCategory
          title="Frontend"
          icon={<Code className="w-5 h-5" />}
          skills={SKILLS.frontend}
          animationProps={animationProps}
          delay={0.1}
        />

        <SkillCategory
          title="Backend"
          icon={<Database className="w-5 h-5" />}
          skills={SKILLS.backend}
          animationProps={animationProps}
          delay={0.2}
        />

        <SkillCategory
          title="Tools"
          icon={<Wrench className="w-5 h-5" />}
          skills={SKILLS.tools}
          animationProps={animationProps}
          delay={0.3}
        />
      </div>
    </motion.section>
  );
};

// --- SKILL CATEGORY COMPONENT ---
const SkillCategory = ({ title, icon, skills, animationProps, delay }) => (
  <motion.div variants={animationProps(delay)}>
    <Card className="h-full bg-gradient-to-br from-slate-800/70 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-emerald-400">{icon}</div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <TooltipProvider key={skill.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    className="group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: delay + (index * 0.1), duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`text-lg ${skill.color} group-hover:scale-110 transition-transform duration-200`}>
                          {skill.icon}
                        </span>
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-200">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-slate-700/50"
                    />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{skill.name} - {skill.level}% proficiency</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// --- EXPERIENCE SECTION ---
const ExperienceSection = ({ animationProps }) => {
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={timelineRef}
      className="mb-20 max-w-4xl mx-auto"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div variants={animationProps()} className="text-center mb-12">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 mb-4">
          My Journey
        </h2>
        <p className="text-base text-slate-300 leading-relaxed">
          Milestones in my full-stack development career
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/50 to-sky-500/50"></div>

        <div className="space-y-8">
          {EXPERIENCE.map((item, index) => (
            <motion.div
              key={index}
              variants={animationProps(index * 0.2)}
              className="relative flex gap-6"
            >
              <div className="flex-shrink-0 relative">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
              </div>

              <Card className="flex-1 bg-gradient-to-br from-slate-800/70 to-slate-900/50 border border-slate-700/50 rounded-lg backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                        <span className="text-emerald-400 font-medium">{item.company}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs whitespace-nowrap">
                      {item.year}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-2">
                    {item.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Trophy className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span className="text-xs text-slate-400">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};