"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Eye, Github, ArrowUpRight, ChevronDown, Linkedin, Briefcase, Star, Users, Code } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useScroll, motion, useTransform, useInView, MotionConfig } from "framer-motion";

// --- PROJECTS DATA ---
const PROJECTS = [
  {
    id: 1,
    title: "Online Food Delivery Platform",
    description:
      "A responsive food delivery platform with real-time order tracking and secure Stripe payment integration. Improved checkout conversion by 20% and reduced load times by 30%.",
    image: "/Delevry.webp",
    link: "https://food-delivery-page-sandy.vercel.app/",
    github: "https://github.com/AYOU-pixel/Food-Delivery-Page",
    tech: [{ name: "Next.js" }, { name: "TailwindCSS" }, { name: "Stripe" }, { name: "Vite" }],
    featured: true,
  },
  {
    id: 2,
    title: "Sneaker Store E-Commerce",
    description:
      "A sleek e-commerce platform for sneakers with product filtering and wishlist functionality. Served 10K+ monthly users with a 25% increase in user engagement.",
    image: "/eco.webp",
    link: "https://ecomerc-wm.vercel.app/",
    github: "https://github.com/AYOU-pixel/ecomerc_wm",
    tech: [{ name: "React" }, { name: "Redux" }, { name: "Node.js" }],
  },
  {
    id: 3,
    title: "Weather Application",
    description:
      "A real-time weather app with location detection and 5-day forecasts using OpenWeather API. Achieved 98% user satisfaction with intuitive design.",
    image: "/weather.webp",
    link: "https://weather-app-navy-sigma-78.vercel.app/",
    github: "https://github.com/AYOU-pixel/Weather-App",
    tech: [{ name: "React" }, { name: "Next.js" }, { name: "Weather API" }],
  },
  {
    id: 4,
    title: "Coffee Bliss Café Website",
    description:
      "A professional café website with a responsive layout and menu display. Enhanced user retention by 15% with modern design.",
    image: "/Cafe.webp",
    link: "https://cafe-web-six.vercel.app/",
    github: "https://github.com/AYOU-pixel/Cafe-web",
    tech: [{ name: "Next.js" }, { name: "Vite" }, { name: "TailwindCSS" }],
  },
  {
    id: 5,
    title: "Apple Product Landing Page",
    description:
      "A modern product showcase with sleek animations and a responsive carousel. Improved user interaction time by 30%.",
    image: "/Applepage.webp",
    link: "https://apple-page-dusky.vercel.app/",
    github: "https://github.com/AYOU-pixel/Apple-page",
    tech: [{ name: "Framer Motion" }, { name: "Next.js" }, { name: "Vite" }],
  },
  {
    id: 6,
    title: "Food Delivery Landing Page",
    description:
      "A modern landing page for food delivery with intuitive UI and smooth animations. Reduced bounce rate by 20% with optimized design.",
    image: "/landingDelevry.webp",
    link: "https://delivery-page-black.vercel.app/",
    github: "https://github.com/AYOU-pixel/Delivery-Page",
    tech: [{ name: "Next.js" }, { name: "TailwindCSS" }, { name: "Stripe" }, { name: "Vite" }],
  },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- MAIN COMPONENT ---
export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  const [showAll, setShowAll] = useState(false);

  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const displayedProjects = useMemo(() => {
    return showAll ? PROJECTS : PROJECTS.slice(0, 6);
  }, [showAll]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="projects"
        className="relative min-h-screen py-24 sm:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden"
        aria-labelledby="projects-heading"
      >
        <motion.div
          className="absolute inset-0 bg-grid-slate-700/[0.05] bg-[length:60px_60px]"
          style={{ x: bgX, y: bgY }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="text-center mb-16 max-w-4xl mx-auto"
          >
            <motion.h2
              id="projects-heading"
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Projects</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-slate-300 leading-relaxed">
              A curated selection of projects showcasing my expertise in building scalable, high-performance web applications.
            </motion.p>
          </motion.div>

          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20"
          >
            {[
              { number: "15+", label: "Projects Completed", icon: <Briefcase className="w-5 h-5" /> },
              { number: "98%", label: "Client Satisfaction", icon: <Star className="w-5 h-5" /> },
              { number: "50K+", label: "Users Impacted", icon: <Users className="w-5 h-5" /> },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="group p-4 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:border-sky-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-sky-400 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <span className="text-2xl font-bold text-white">{stat.number}</span>
                </div>
                <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>

          {!showAll && PROJECTS.length > 6 && (
            <div className="text-center mt-16">
              <motion.button
                onClick={() => setShowAll(true)}
                className="group flex items-center justify-center gap-3 px-8 py-4 mx-auto bg-sky-500 hover:bg-sky-600 rounded-xl text-white font-semibold text-lg shadow-2xl shadow-sky-500/25 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Show all projects"
              >
                <Eye className="w-5 h-5 stroke-2" />
                <span>Show More</span>
                <ChevronDown className="w-5 h-5 stroke-2 group-hover:mt-1 transition-all" />
              </motion.button>
            </div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}

// --- PROJECT CARD COMPONENT ---
const ProjectCard = ({ project }) => {
  const [isImageError, setIsImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative h-full flex flex-col"
    >
      <div className="relative h-full bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-sky-500/10 flex flex-col">
        <div className="relative h-48 sm:h-56 overflow-hidden">
          {isImageError ? (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-slate-400">
              <Code className="w-12 h-12" />
            </div>
          ) : (
            <Image
              src={project.image}
              alt={`${project.title} project screenshot`}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onError={() => setIsImageError(true)}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
              fill
            />
          )}
        </div>

        <div className="p-6 flex flex-col flex-grow space-y-4">
          <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-sky-400">
            {project.title}
          </h3>
          <p className="text-slate-300 leading-relaxed text-sm flex-grow line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((tech) => (
              <span key={tech.name} className="px-3 py-1 text-xs font-medium bg-slate-800/50 border border-slate-700/30 text-sky-400 rounded-full">
                {tech.name}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-xl text-white font-medium text-sm shadow-lg shadow-sky-500/25 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all duration-300 flex-1 justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`View live demo of ${project.title}`}
            >
              <Eye className="w-4 h-4 stroke-2" />
              <span>Live Demo</span>
            </motion.a>
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-medium text-sm shadow-lg shadow-indigo-500/25 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 flex-1 justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`View source code of ${project.title}`}
              >
                <Github className="w-4 h-4 stroke-2" />
                <span>Code</span>
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};