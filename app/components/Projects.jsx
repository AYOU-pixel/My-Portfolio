"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Eye, Github, ArrowUpRight, ChevronDown, Briefcase, Star, Users, Code, ExternalLink, Loader2, Sparkles, TrendingUp, Award } from "lucide-react";
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
    category: "Web App",
    status: "Live"
  },
  {
    id: 3,
    title: "Airbnb Clone",
    description:
      "A full-featured booking platform inspired by Airbnb, built entirely from scratch in just one month. Includes secure authentication, wishlist functionality, instant booking, and Stripe-powered payments.",
    image: "/airbnb.png", 
    link: "https://airbnb-clone-eosin-sigma.vercel.app/", 
    github: "https://github.com/AYOU-pixel/Airbnb-Clone", 
    tech: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Shadcn UI" },
      { name: "MongoDB" },
      { name: "Prisma" },
      { name: "Stripe" },
      { name: "NextAuth" }
    ],
    featured: true,
    category: "Full Stack",
    status: "Live"
  }
];

// --- ENHANCED ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.08, 
      delayChildren: 0.15, 
      ease: [0.23, 1, 0.32, 1] // Custom cubic-bezier for smoother motion
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 24,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.23, 1, 0.32, 1]
    } 
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 32, 
    scale: 0.96 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.23, 1, 0.32, 1]
    }
  },
};

const statsCounterVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.6, 
      ease: "backOut",
      delay: 0.2 
    }
  }
};

// --- ENHANCED BACKGROUND COMPONENTS ---
const BackgroundAurora = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
    {/* Primary aurora effect */}
    <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-blue-500/8 via-indigo-500/12 to-purple-600/8 rounded-full blur-3xl animate-[aurora_20s_infinite_alternate] top-1/6 left-1/5 opacity-60"></div>
    <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-cyan-400/6 via-blue-500/10 to-indigo-600/8 rounded-full blur-3xl animate-[aurora_25s_infinite_alternate_reverse] bottom-1/5 right-1/6 opacity-70"></div>
    
    {/* Secondary subtle effects */}
    <div className="absolute w-[300px] h-[300px] bg-gradient-to-r from-indigo-400/4 to-purple-500/6 rounded-full blur-2xl animate-[float_15s_infinite_ease-in-out] top-2/3 left-2/3 opacity-50"></div>
    
    <style jsx>{`
      @keyframes aurora {
        0%, 100% { 
          transform: translate(0, 0) rotate(0deg) scale(1); 
          opacity: 0.6;
        }
        33% { 
          transform: translate(60px, -40px) rotate(2deg) scale(1.1); 
          opacity: 0.8;
        }
        66% { 
          transform: translate(-40px, 60px) rotate(-1deg) scale(0.9); 
          opacity: 0.7;
        }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
    `}</style>
  </div>
);

const GridPattern = () => (
  <div className="absolute inset-0 opacity-[0.015]" aria-hidden="true">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem]" />
  </div>
);

// --- ENHANCED SKELETON LOADER ---
const ImageSkeleton = () => (
  <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-750 to-slate-700 animate-pulse flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/20 to-transparent animate-[shimmer_2s_infinite] transform -skew-x-12" />
    <Loader2 className="w-6 h-6 text-slate-500 animate-spin relative z-10" />
    <style jsx>{`
      @keyframes shimmer {
        0% { transform: translateX(-100%) skewX(-12deg); }
        100% { transform: translateX(200%) skewX(-12deg); }
      }
    `}</style>
  </div>
);

// --- MAIN COMPONENT ---
export default function Projects() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const isStatsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 40]);

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
        className="relative min-h-screen py-20 sm:py-28 lg:py-32 bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-800 overflow-hidden"
        aria-labelledby="projects-heading"
      >
        <BackgroundAurora />
        <GridPattern />
        
        <motion.div
          className="absolute inset-0"
          style={{ y: bgY }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 max-w-7xl">
          {/* Enhanced Header Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            style={{ y: headerY }}
            className="text-center mb-16 lg:mb-20 max-w-5xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Portfolio Showcase</span>
            </motion.div>
            
            <motion.h2
              id="projects-heading"
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
            >
              Featured{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                  Projects
                </span>
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg -z-10 rounded-lg"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </span>
            </motion.h2>
            
            <motion.p 
              variants={animationProps(0.1)} 
              className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-light"
            >
              Explore my latest work featuring{" "}
              <span className="text-blue-400 font-medium">scalable applications</span>,{" "}
              <span className="text-indigo-400 font-medium">modern architectures</span>, and{" "}
              <span className="text-purple-400 font-medium">exceptional user experiences</span>
            </motion.p>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto mb-16 lg:mb-24"
          >
            {[
              { number: "15+", label: "Projects Delivered", icon: <Briefcase className="w-5 h-5" />, color: "from-blue-500 to-cyan-500" },
              { number: "98%", label: "Client Satisfaction", icon: <Star className="w-5 h-5" />, color: "from-indigo-500 to-purple-500" },
              { number: "50K+", label: "Users Reached", icon: <TrendingUp className="w-5 h-5" />, color: "from-purple-500 to-pink-500" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statsCounterVariants}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-default"
              >
                <Card className="relative bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 border border-slate-700/50 rounded-xl backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <CardContent className="p-5 lg:p-6 relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                        {stat.icon}
                      </div>
                      <motion.span 
                        className="text-2xl lg:text-3xl font-bold text-white"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isStatsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.5, ease: "backOut" }}
                      >
                        {stat.number}
                      </motion.span>
                    </div>
                    <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Projects Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
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

          {/* Enhanced Show More Button */}
          {!showAll && PROJECTS.length > 6 && (
            <motion.div 
              className="text-center mt-16 lg:mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            >
              <Button
                onClick={() => setShowAll(true)}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-lg rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Eye className="w-5 h-5 stroke-2 relative z-10" />
                <span className="relative z-10">Explore All Projects</span>
                <ChevronDown className="w-5 h-5 stroke-2 group-hover:translate-y-0.5 transition-transform relative z-10" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}

// --- ENHANCED PROJECT CARD COMPONENT ---
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
        duration: 0.5, 
        delay: reduceMotion ? 0 : index * 0.08, 
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative h-full flex flex-col"
    >
      <Card className="relative h-full bg-gradient-to-br from-slate-800/70 via-slate-800/50 to-slate-900/70 border border-slate-700/50 rounded-2xl backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col overflow-hidden">
        {/* Enhanced Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-20">
            <Badge className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 font-medium px-3 py-1 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Award className="w-3 h-3 mr-1 inline" />
              Featured
            </Badge>
          </div>
        )}

        {/* Status Indicator */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            {project.status}
          </div>
        </div>

        {/* Enhanced Project Image */}
        <div className="relative h-52 lg:h-56 overflow-hidden bg-slate-800 rounded-t-2xl group">
          {isImageLoading && !isImageError && (
            <div className="absolute inset-0 z-10">
              <ImageSkeleton />
            </div>
          )}
          
          {isImageError ? (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 flex flex-col items-center justify-center text-slate-400">
              <Code className="w-8 h-8 mb-2" />
              <span className="text-xs">Preview unavailable</span>
            </div>
          ) : (
            <>
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-110"
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                  setIsImageError(true);
                  setIsImageLoading(false);
                }}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={85}
                fill
              />
              {/* Enhanced overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          )}
        </div>

        <CardContent className="p-6 lg:p-7 flex flex-col flex-grow space-y-5">
          {/* Category & Title */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              {project.category}
            </span>
            <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-400 transition-all duration-300 line-height-tight">
              {project.title}
            </h3>
          </div>
          
          {/* Enhanced Description */}
          <p className="text-slate-300 leading-relaxed text-sm lg:text-base flex-grow line-clamp-3 group-hover:text-slate-200 transition-colors duration-300">
            {project.description}
          </p>

          {/* Enhanced Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.slice(0, 4).map((tech, techIndex) => (
              <Badge 
                key={tech.name} 
                variant="secondary"
                className="px-3 py-1.5 text-xs font-medium bg-slate-800/60 border border-slate-700/40 text-slate-300 hover:bg-slate-700/60 hover:border-blue-500/40 hover:text-blue-400 transition-all duration-200 rounded-lg"
                style={{
                  transitionDelay: `${techIndex * 50}ms`
                }}
              >
                {tech.name}
              </Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge 
                variant="secondary"
                className="px-3 py-1.5 text-xs font-medium bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg"
              >
                +{project.tech.length - 4} more
              </Badge>
            )}
          </div>

          {/* Enhanced Action Buttons */}
          <TooltipProvider>
            <div className="flex gap-3 pt-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    className="group/btn relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex-1 justify-center overflow-hidden"
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <Eye className="w-4 h-4 stroke-2 relative z-10" />
                      <span className="relative z-10">Live Demo</span>
                      <ArrowUpRight className="w-3 h-3 opacity-70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200 relative z-10" />
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
                      className="group/btn relative flex items-center gap-2 px-5 py-2.5 bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:bg-slate-700/60 hover:border-blue-500/50 hover:text-white rounded-xl font-semibold text-sm transition-all duration-300 flex-1 justify-center overflow-hidden"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code of ${project.title}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        <Github className="w-4 h-4 stroke-2 relative z-10" />
                        <span className="relative z-10">Source</span>
                        <ExternalLink className="w-3 h-3 opacity-70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200 relative z-10" />
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