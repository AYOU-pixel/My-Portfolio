"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Eye, Github, ArrowUpRight, ChevronDown, Linkedin, Briefcase, Star, Users, Code, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useScroll, motion, useTransform, useInView, MotionConfig } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";

// --- PROJECTS DATA ---
const PROJECTS = [
  {
    id: 1,
    title: "Weather Application",
    description:
      "A real-time weather app with location detection and 5-day forecasts using OpenWeather API. Achieved 98% user satisfaction with intuitive design and seamless user experience.",
    image: "/weather.webp",
    link: "https://weather-app-navy-sigma-78.vercel.app/",
    github: "https://github.com/AYOU-pixel/Weather-App",
    tech: [{ name: "React" }, { name: "Next.js" }, { name: "Weather API" }, { name: "Tailwind CSS" }],
    featured: true,
  }
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

// --- BACKGROUND COMPONENTS ---
const BackgroundAurora = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
    <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-indigo-600/10 to-sky-500/10 rounded-full blur-3xl animate-[aurora_25s_infinite_alternate] top-1/4 left-1/4"></div>
    <div className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-sky-500/5 to-indigo-500/5 rounded-full blur-3xl animate-[aurora_30s_infinite_alternate_reverse] bottom-1/4 right-1/4"></div>
    <style jsx>{`
      @keyframes aurora {
        0% { transform: translate(0, 0); }
        50% { transform: translate(80px, 60px); }
        100% { transform: translate(0, 0); }
      }
    `}</style>
  </div>
);

// --- SKELETON LOADER COMPONENT ---
const ImageSkeleton = () => (
  <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-700 animate-pulse flex items-center justify-center">
    <Loader2 className="w-8 h-8 text-slate-500 animate-spin" />
  </div>
);

// --- MAIN COMPONENT ---
export default function Projects() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

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

  const displayedProjects = useMemo(() => {
    return showAll ? PROJECTS : PROJECTS.slice(0, 6);
  }, [showAll]);

  const animationProps = (delay = 0) => ({
    ...itemVariants,
    transition: { ...itemVariants.transition, delay: reduceMotion ? 0 : delay },
  });

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="projects"
        className="relative min-h-screen py-24 sm:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden"
        aria-labelledby="projects-heading"
      >
        <BackgroundAurora />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_70%)] opacity-20" aria-hidden="true" />
        
        <motion.div
          className="absolute inset-0 bg-grid-slate-700/[0.03] bg-[length:60px_60px]"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
                Projects
              </span>
            </motion.h2>
            <motion.p 
              variants={animationProps(0.1)} 
              className="text-lg text-slate-300 leading-relaxed"
            >
              A curated selection of projects showcasing my expertise in building scalable, 
              high-performance web applications with modern technologies and best practices.
            </motion.p>
          </motion.div>

          {/* Stats Section */}
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
                variants={animationProps(index * 0.1)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/70 to-slate-900/50 border border-slate-700/50 rounded-lg backdrop-blur-sm hover:border-sky-500/50 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-sky-400 group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <span className="text-2xl font-bold text-white">{stat.number}</span>
                    </div>
                    <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </motion.div>

          {/* Show More Button */}
          {!showAll && PROJECTS.length > 6 && (
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            >
              <Button
                onClick={() => setShowAll(true)}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-lg rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-[1.03]"
              >
                <Eye className="w-5 h-5 stroke-2" />
                <span>Show All Projects</span>
                <ChevronDown className="w-5 h-5 stroke-2 group-hover:translate-y-0.5 transition-transform" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}

// --- PROJECT CARD COMPONENT ---
const ProjectCard = ({ project, index, reduceMotion }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageError, setIsImageError] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      transition={{ 
        duration: 0.6, 
        delay: reduceMotion ? 0 : index * 0.1, 
        ease: "easeOut" 
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative h-full flex flex-col"
    >
      <Card className="relative h-full bg-gradient-to-br from-slate-800/70 to-slate-900/50 border border-slate-700/50 rounded-lg backdrop-blur-sm hover:border-sky-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col overflow-hidden">
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-0 font-medium">
              Featured
            </Badge>
          </div>
        )}

        {/* Project Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-800 rounded-t-lg border-b border-slate-700/50">
          {isImageLoading && !isImageError && (
            <div className="absolute inset-0 z-10">
              <ImageSkeleton />
            </div>
          )}
          
          {isImageError ? (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-slate-400">
              <Code className="w-12 h-12" />
            </div>
          ) : (
            <Image
              src={project.image}
              alt={`${project.title} project screenshot`}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onLoad={() => setIsImageLoading(false)}
              onError={() => {
                setIsImageError(true);
                setIsImageLoading(false);
              }}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
              fill
            />
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="p-6 flex flex-col flex-grow space-y-4">
          {/* Project Title */}
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200 group-hover:from-sky-400 group-hover:to-indigo-400 transition-all duration-300">
            {project.title}
          </h3>
          
          {/* Project Description */}
          <p className="text-slate-300 leading-relaxed text-sm flex-grow line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((tech) => (
              <Badge 
                key={tech.name} 
                variant="secondary"
                className="px-3 py-1 text-xs font-medium bg-slate-800/50 border border-slate-700/30 text-sky-400 hover:bg-slate-700/50 hover:border-sky-500/30 transition-colors duration-200"
              >
                {tech.name}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <TooltipProvider>
            <div className="flex gap-3 pt-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 rounded-lg text-white font-medium text-sm shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300 flex-1 justify-center"
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <Eye className="w-4 h-4 stroke-2" />
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Live Demo</p>
                </TooltipContent>
              </Tooltip>

              {project.github && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      asChild
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:border-sky-500/50 hover:text-white rounded-lg font-medium text-sm transition-all duration-300 flex-1 justify-center"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code of ${project.title}`}
                      >
                        <Github className="w-4 h-4 stroke-2" />
                        <span>Code</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Source Code</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </motion.div>
  );
};