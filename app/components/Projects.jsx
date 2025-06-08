"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import {
  Eye,
  Github,
  ArrowUpRight,
  ChevronDown,
  Sun,
  Moon,
  Linkedin,
  Briefcase,
  Star,
  Users,
  Code,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useScroll, motion, useTransform, useInView, AnimatePresence } from "framer-motion";

// PROJECTS array without tech.desc
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

// Animation variants
const ANIMATION_VARIANTS = {
  floating: {
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
  glowPulse: {
    scale: [1, 1.02, 1],
    opacity: [0.8, 1, 0.8],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  backgroundFloat: {
    scale: [1, 1.1, 1],
    opacity: [0.4, 0.6, 0.4],
    rotate: [0, 180, 360],
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -60, y: 20 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ProjectsSection() {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [state, setState] = useState({
    isMounted: false,
    activeTech: null,
    hoveredProject: null,
    showAll: false,
    isMobile: false,
    reduceMotionPref: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth <= 768;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setState((prev) => ({
      ...prev,
      isMounted: true,
      isMobile,
      reduceMotionPref: mediaQuery.matches,
    }));
    const handler = (e) => setState((prev) => ({ ...prev, reduceMotionPref: e.matches }));
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Animation props
  const animationProps = useMemo(() => {
    const shouldAnimate = !state.isMobile && !state.reduceMotionPref;
    return {
      floating: shouldAnimate ? ANIMATION_VARIANTS.floating : {},
      glowPulse: shouldAnimate ? ANIMATION_VARIANTS.glowPulse : {},
      backgroundFloat: shouldAnimate ? ANIMATION_VARIANTS.backgroundFloat : {},
      showFloatingElements: shouldAnimate,
    };
  }, [state.isMobile, state.reduceMotionPref]);

  // Simplified displayedProjects
  const displayedProjects = state.showAll ? PROJECTS : PROJECTS.slice(0, 6);

  if (!state.isMounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-16 bg-slate-800 rounded mb-4 w-3/4 mx-auto"></div>
              <div className="h-8 bg-slate-800 rounded mb-6 w-1/2 mx-auto"></div>
              <div className="h-6 bg-slate-800 rounded w-2/3 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {Array(6)
                .fill()
                .map((_, i) => (
                  <div key={i} className="h-96 bg-slate-800 rounded-2xl animate-pulse"></div>
                ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="projects"
      className="relative min-h-screen py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden"
      role="main"
      aria-label="Projects Portfolio Section"
    >
      {animationProps.showFloatingElements && (
        <>
          <motion.div
            className="absolute inset-0 bg-grid-slate-700/[0.05] bg-[length:60px_60px]"
            style={{ x, y }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-sky-500/30 to-indigo-600/30 rounded-full blur-3xl"
            animate={animationProps.backgroundFloat}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-500/30 to-blue-600/30 rounded-full blur-3xl"
            animate={{
              scale: state.reduceMotionPref ? 1 : [1, 1.2, 1],
              opacity: state.reduceMotionPref ? 0.4 : [0.4, 0.6, 0.4],
              rotate: state.reduceMotionPref ? 0 : [0, -180, -360],
              transition: { duration: 25, repeat: Infinity, ease: "linear" },
            }}
            aria-hidden="true"
          />
        </>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div {...ANIMATION_VARIANTS.slideInLeft} className="text-center mb-16">
          <motion.h2
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 font-poppins"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
              Projects
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8 font-poppins"
          >
            A curated selection of projects showcasing my expertise in building scalable, high-performance web applications with modern technologies like React, Next.js, and Tailwind CSS.
          </motion.p>
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-4 justify-center mb-12"
          >
            {[
              { number: "15+", label: "Projects Completed", icon: <Briefcase className="w-5 h-5" /> },
              { number: "98%", label: "Client Satisfaction", icon: <Star className="w-5 h-5" /> },
              { number: "50K+", label: "Users Impacted", icon: <Users className="w-5 h-5" /> },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                className="group p-4 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:border-sky-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-sky-400 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isStatsInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                    className="text-2xl font-bold text-white"
                  >
                    {stat.number}
                  </motion.span>
                </div>
                <p className="text-sm text-slate-400 font-medium font-poppins">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              hoveredProject={state.hoveredProject}
              setHoveredProject={(id) => setState((prev) => ({ ...prev, hoveredProject: id }))}
              activeTech={state.activeTech}
              setActiveTech={(tech) => setState((prev) => ({ ...prev, activeTech: tech }))}
              isMobile={state.isMobile}
              reduceMotionPref={state.reduceMotionPref}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Link href="/morproject">
            <motion.button
              className="group flex items-center justify-center gap-3 px-8 py-4 mx-auto bg-sky-500 hover:bg-sky-600 rounded-xl text-white font-semibold text-lg shadow-2xl shadow-sky-500/25 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-300 font-poppins"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View all projects"
            >
              <Eye className="w-5 h-5 stroke-2" />
              <span>View All Projects</span>
              <ArrowUpRight className="w-5 h-5 stroke-2 group-hover:rotate-45 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex justify-center gap-4 mt-12"
        >
          <motion.a
            href="https://github.com/AYOU-pixel" // Replace with actual GitHub profile
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-full hover:bg-sky-500/20 hover:border-sky-500 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            aria-label="Visit GitHub profile"
          >
            <Github className="w-5 h-5 text-slate-300" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/ayoub-rachd-0b344a322/" // Replace with actual LinkedIn profile
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-full hover:bg-indigo-500/20 hover:border-indigo-500 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            aria-label="Visit LinkedIn profile"
          >
            <Linkedin className="w-5 h-5 text-slate-300" />
          </motion.a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center mt-16"
        >
          <motion.p
            className="text-sm text-slate-400 mb-3 font-poppins"
            animate={state.reduceMotionPref ? {} : { opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Explore more sections
          </motion.p>
          <motion.button
            onClick={() => {
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            animate={state.reduceMotionPref ? {} : { y: [0, 8, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="p-2 rounded-full border border-slate-700/50 hover:border-sky-500/50 transition-colors duration-300"
            aria-label="Scroll to About section"
          >
            <ChevronDown className="w-6 h-6 text-sky-500" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

const ProjectCard = ({
  project,
  index,
  hoveredProject,
  setHoveredProject,
  activeTech,
  setActiveTech,
  isMobile,
  reduceMotionPref,
}) => {
  const [imageError, setImageError] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group relative"
      onMouseEnter={() => !isMobile && setHoveredProject(project.id)}
      onMouseLeave={() => !isMobile && setHoveredProject(null)}
    >
      <div className="relative h-full bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-sky-500/20">
        <div className="relative h-48 sm:h-56 overflow-hidden">
          {!imageError ? (
            <Image
              src={project.image}
              alt={`${project.title} project screenshot`}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              onError={handleImageError}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
              fill
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
              <div className="text-slate-400 text-center">
                <Code className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm font-poppins">{project.title}</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6 space-y-4">
          <motion.h3
            className="text-xl sm:text-2xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-indigo-500 transition-all duration-300 font-poppins"
            layoutId={`title-${project.id}`}
          >
            {project.title}
          </motion.h3>
          <p className="text-base text-slate-300 leading-relaxed line-clamp-3 group-hover:text-slate-200 transition-colors duration-300 font-poppins">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, techIndex) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * techIndex }}
                className="relative group/tech"
                onMouseEnter={() => !isMobile && setActiveTech(tech.name)}
                onMouseLeave={() => !isMobile && setActiveTech(null)}
              >
                <span
                  className="px-3 py-1 text-xs font-medium bg-slate-800/50 border border-slate-700/30 text-sky-400 rounded-full hover:border-sky-500/50 transition-colors duration-300 font-poppins"
                  tabIndex={0}
                >
                  {tech.name}
                </span>
                <AnimatePresence>
                  {activeTech === tech.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 left-0 right-0 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-lg p-3 shadow-2xl z-20"
                    >
                      <div className="text-xs text-sky-400 font-semibold font-poppins">
                        {tech.name}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-xl text-white font-medium text-sm shadow-lg shadow-sky-500/25 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all duration-300 flex-1 justify-center font-poppins"
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
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-medium text-sm shadow-lg shadow-indigo-500/25 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 flex-1 justify-center font-poppins"
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