
"use client";
import { useState, useEffect, useRef } from "react";
import { Eye, Github, ExternalLink, ArrowUpRight, Sparkles, Globe, Lock } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";

// --- PROJECTS DATA ---
const PROJECTS = [
  {
    id: 1,
    title: "Weather Application",
    description: "Real-time weather app with location detection, 5-day forecasts, and intuitive design. Achieved 98% user satisfaction rating through responsive design and accurate data visualization.",
    image: "/weather.webp",
    link: "https://weather-app-navy-sigma-78.vercel.app/",
    github: "https://github.com/AYOU-pixel/Weather-App",
    tech: ["React", "Next.js", "Weather API", "Tailwind CSS"],
    featured: true,
    category: "Web Application",
    status: "Live",
    metrics: "98% User Satisfaction"
  },
  {
    id: 2,
    title: "Airbnb Clone",
    description: "Full-featured booking platform with authentication, wishlists, and Stripe payments. Built from scratch in one month with full CRUD functionality and responsive design.",
    image: "/airbnb.png", 
    link: "https://airbnb-clone-eosin-sigma.vercel.app/", 
    github: "https://github.com/AYOU-pixel/Airbnb-Clone", 
    tech: ["Next.js", "Tailwind CSS", "MongoDB", "Prisma", "Stripe", "NextAuth"],
    featured: true,
    category: "Full Stack Platform",
    status: "Live",
    metrics: "Complete Full-Stack"
  },
  {
    id: 3,
    title: "Modern Fashion E-Commerce",
    description: "A sleek, scalable fashion e-commerce platform with real-time order tracking, secure payments, and OAuth authentication. Built with modern technologies for optimal performance.",
    image: "/AURA.png",
    link: "https://clothes-store-six-indol.vercel.app",
    github: "https://github.com/AYOU-pixel/Clothes-Store",
    tech: ["Next.js", "MongoDB", "Prisma", "Stripe", "Tailwind CSS", "NextAuth.js", "Cloudinary"],
    featured: true,
    category: "E-Commerce",
    status: "Live",
    metrics: "Built in 1 Month • Real Payments"
  }
];

// --- ANIMATION VARIANTS (Matching HeroSection) ---
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

// --- MODERN BACKGROUND COMPONENTS (Matching HeroSection) ---
const ProjectsBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
    <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-[aurora_20s_infinite_alternate] top-1/4 right-1/4"></div>
    <div className="absolute w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-3xl animate-[aurora_25s_infinite_alternate_reverse] bottom-1/4 left-1/4"></div>
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
export default function Projects() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <ProjectsBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={FADE_IN_UP}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 mb-6 py-2 px-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm shadow-lg shadow-cyan-500/5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-lg shadow-cyan-500/50"></span>
            </span>
            <span className="text-sm text-cyan-300 font-semibold tracking-wide">Portfolio Showcase</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Featured <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            A collection of modern web applications built with cutting-edge technologies, 
            demonstrating full-stack development expertise and attention to detail.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={STAGGER_CONTAINER}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 text-center"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-md overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">Ready to Build Something Amazing?</h3>
                    <p className="text-slate-400">Let's discuss your next project</p>
                  </div>
                </div>
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                >
                  <Sparkles className="w-5 h-5" />
                  Start a Project
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// --- PROJECT CARD COMPONENT ---
const ProjectCard = ({ project, index, reduceMotion }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: reduceMotion ? 0.3 : 0.6, 
        delay: reduceMotion ? 0 : index * 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="group relative h-full"
    >
      {/* Card Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <Card className="relative h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-md overflow-hidden transition-all duration-300 group-hover:border-cyan-500/30 group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
        
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-105`}
            onLoad={() => setIsImageLoaded(true)}
            quality={90}
            priority={index < 2}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="relative flex h-1.5 w-1.5 mr-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              {project.status}
            </Badge>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm px-3 py-1 rounded-full">
              {project.category}
            </Badge>
          </div>

          {/* Hover Action Buttons */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300"
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo of ${project.title}`}
                      >
                        <Eye className="w-5 h-5" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 border-slate-700 text-white">
                    View Live Demo
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-6 space-y-4">
          {/* Title and Featured Badge */}
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
              {project.title}
            </h3>
            {project.featured && (
              <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
                Featured
              </Badge>
            )}
          </div>

          {/* Metrics */}
          {project.metrics && (
            <p className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {project.metrics}
            </p>
          )}

          {/* Description */}
          <p className="text-slate-300 leading-relaxed text-sm">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary"
                className="px-3 py-1 text-xs bg-slate-700/50 border border-slate-600/50 text-slate-300 rounded-lg hover:bg-slate-600/50 hover:border-cyan-500/30 hover:text-cyan-300 transition-all duration-300"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-slate-700/50 to-slate-800/50 border border-slate-600/50 text-white hover:from-slate-600/50 hover:to-slate-700/50 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Live Demo
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="w-12 bg-slate-700/30 border border-slate-600/50 text-slate-300 hover:bg-slate-600/50 hover:border-cyan-500/30 hover:text-cyan-300 transition-all duration-300"
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View source code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 border-slate-700 text-white">
                  <p>View Source Code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};