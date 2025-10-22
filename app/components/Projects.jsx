// Projects.jsx - Modern Professional Design
"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import { Eye, Github, ArrowUpRight, ChevronDown, ExternalLink, Sparkles, Play, Lock, Globe } from "lucide-react";
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
    description: "Real-time weather app with location detection and 5-day forecasts. Features intuitive design with 98% user satisfaction rating.",
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
    description: "Full-featured booking platform with authentication, wishlists, and Stripe payments. Built from scratch in one month.",
    image: "/airbnb.png", 
    link: "https://airbnb-clone-eosin-sigma.vercel.app/", 
    github: "https://github.com/AYOU-pixel/Airbnb-Clone", 
    tech: ["Next.js", "Tailwind CSS", "MongoDB", "Prisma", "Stripe", "NextAuth"],
    featured: true,
    category: "Full Stack Platform",
    status: "Live",
    metrics: "Full-stack Implementation"
  },

  {
  id: 3,
  title: "Modern Fashion E-Commerce",
  description: "A sleek, scalable fashion e-commerce platform inspired by ZARA. Built with Next.js, MongoDB, Prisma, and Stripe, it delivers a minimalist shopping experience with robust backend functionality, secure authentication, and real-time order tracking.",
  image: "/AURA.png", // Replace with actual image path if needed
  link: "https://clothes-store-six-indol.vercel.app",
  github: "https://github.com/AYOU-pixel/Clothes-Store", // Replace with actual repo link
  tech: [
    "Next.js",
    "MongoDB",
    "Prisma",
    "Stripe",
    "Tailwind CSS",
    "ShadCN UI",
    "NextAuth.js",
    "Cloudinary"
  ],
  featured: true,
  category: "E-Commerce",
  status: "Live",
  metrics: "Built in 1 month • Real Stripe payments • OAuth login • Responsive media gallery • Webhook-powered order updates"
}
];

// --- MODERN ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      ease: "easeOut"
    },
  },
};

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
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
};

// --- MODERN BACKGROUND COMPONENTS ---
const BackgroundAurora = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
    <div className="absolute w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite] top-1/4 left-1/4"></div>
    <div className="absolute w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl animate-[pulse_12s_ease-in-out_infinite] bottom-1/4 right-1/4"></div>
  </div>
);

const GridPattern = () => (
  <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:64px_64px]" />
  </div>
);

// --- MAIN COMPONENT ---
export default function Projects() {
  const sectionRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

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
      className="relative min-h-screen py-24 bg-slate-950 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <BackgroundAurora />
      <GridPattern />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
            <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-sky-400 uppercase tracking-wider">Portfolio</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Projects</span>
          </h2>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Crafting digital experiences that merge innovative design with robust engineering
          </p>
        </motion.div>

        {/* Modern Projects Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
        >
          {PROJECTS.map((project, index) => (
            <ModernProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Have a project in mind?</p>
                <p className="text-slate-400 text-sm">Let's build something amazing together</p>
              </div>
            </div>
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Start a Project
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- MODERN PROJECT CARD COMPONENT ---
const ModernProjectCard = ({ project, index, reduceMotion }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageError, setIsImageError] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ 
        duration: 0.6, 
        delay: reduceMotion ? 0 : index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* Background Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <Card className="relative bg-slate-800/40 border border-slate-700/50 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:border-slate-600/70 group-hover:bg-slate-800/60">
        {/* Project Image with Overlay */}
        <div className="relative h-64 overflow-hidden">
          {isImageLoading && !isImageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          
          {isImageError ? (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 flex flex-col items-center justify-center text-slate-400">
              <Globe className="w-12 h-12 mb-3 opacity-50" />
              <span className="text-sm">Project preview</span>
            </div>
          ) : (
            <>
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                  setIsImageError(true);
                  setIsImageLoading(false);
                }}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                fill
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </>
          )}

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 backdrop-blur-sm">
              {project.category}
            </Badge>
            {project.featured && (
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 backdrop-blur-sm">
                Featured
              </Badge>
            )}
          </div>

          {/* Live Demo Button */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              {project.status}
            </div>
          </div>

          {/* Hover Action Buttons */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
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
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <Play className="w-5 h-5" />
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
                        asChild
                        className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300"
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View source code of ${project.title}`}
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Source Code</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-6 space-y-4">
          {/* Title and Metrics */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors duration-300">
              {project.title}
            </h3>
            {project.metrics && (
              <p className="text-sm text-sky-400 font-medium">{project.metrics}</p>
            )}
          </div>
          
          {/* Description */}
          <p className="text-slate-300 leading-relaxed text-sm">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, techIndex) => (
              <Badge 
                key={tech} 
                variant="secondary"
                className="px-3 py-1 text-xs bg-slate-700/50 border border-slate-600/50 text-slate-300 rounded-lg backdrop-blur-sm hover:bg-slate-600/50 hover:border-sky-500/30 hover:text-sky-300 transition-all duration-300"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              asChild
              className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600/50 text-white rounded-lg hover:bg-slate-600/50 hover:border-sky-500/30 hover:text-sky-300 transition-all duration-300 flex-1 justify-center text-sm font-medium backdrop-blur-sm"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Eye className="w-4 h-4" />
                View Project
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </Button>

            {project.github && (
              <Button
                variant="outline"
                asChild
                className="w-12 px-0 bg-slate-700/30 border border-slate-600/50 text-slate-300 rounded-lg hover:bg-slate-600/50 hover:border-sky-500/30 hover:text-sky-300 transition-all duration-300 backdrop-blur-sm"
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
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};