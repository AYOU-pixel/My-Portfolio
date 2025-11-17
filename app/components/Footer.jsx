//footer
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  FileText,
  Globe,
  ArrowUp,
  Heart,
  Code,
  Coffee,
  Star,
  Calendar,
  Users,
  Briefcase
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";

// --- CONFIGURATION ---
const FOOTER_CONFIG = {
  name: "Ayoub Rachd",
  title: "Full-Stack Developer",
  tagline: "Crafting digital experiences that matter",
  email: "ayoubprograma@gmail.com",
  phone: "+212 781 913 306",
  location: "Rabat, Morocco",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/AYOU-pixel",
      icon: Github,
      color: "text-gray-400",
      hoverColor: "hover:text-white",
      bgGradient: "from-gray-800 to-gray-900"
    },
    {
      name: "LinkedIn",
      url: "https:www.linkedin.com/in/ayoub-rchidi-0b344a322",
      icon: Linkedin,
      color: "text-blue-400",
      hoverColor: "hover:text-white",
      bgGradient: "from-blue-800 to-blue-900"
    }
  ],
  quickLinks: [
    { name: "About", href: "#about", internal: true },
    { name: "Projects", href: "#projects", internal: true },
    { name: "Skills", href: "#skills", internal: true },
    { name: "Contact", href: "#contact", internal: true }
  ],
  resources: [
    { 
      name: "Resume", 
      href: "/RACHIDI-AYOUB-FlowCV-Resume-20251030.pdf", 
      icon: FileText,
      external: true 
    },
    { 
      name: "Portfolio Code", 
      href: "https://github.com/AYOU-pixel/My-Portfolio", 
      icon: Code,
      external: true 
    }
  ]
};

// --- STATS DATA ---
const FOOTER_STATS = [
  { number: "15+", label: "Projects", icon: <Briefcase className="w-4 h-4 text-emerald-400" /> },
  { number: "10+", label: "Clients", icon: <Users className="w-4 h-4 text-emerald-400" /> },
  { number: "2+", label: "Years", icon: <Calendar className="w-4 h-4 text-emerald-400" /> },
  { number: "98%", label: "Satisfaction", icon: <Star className="w-4 h-4 text-emerald-400" /> },
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
    <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-emerald-600/10 to-sky-500/10 rounded-full blur-3xl animate-[aurora_25s_infinite_alternate] top-1/4 left-1/4"></div>
    <div className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-sky-500/8 to-indigo-500/8 rounded-full blur-3xl animate-[aurora_30s_infinite_alternate_reverse] bottom-1/4 right-1/4"></div>
    <style jsx>{`
      @keyframes aurora {
        0% { transform: translate(0, 0); }
        50% { transform: translate(80px, 60px); }
        100% { transform: translate(0, 0); }
      }
    `}</style>
  </div>
);

// --- MAIN COMPONENT ---
export default function FooterSection() {
  const sectionRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30]);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden"
    >
      <BackgroundAurora />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_70%)] opacity-20" aria-hidden="true" />
      
      <motion.div
        className="absolute inset-0 bg-grid-slate-700/[0.03] bg-[length:60px_60px]"
        style={{ x: bgX, y: bgY }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Stats Section */}
        <StatsSection animationProps={animationProps} />

        {/* Main Footer Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand Section */}
          <BrandSection animationProps={animationProps} />

          {/* Quick Links */}
          <QuickLinksSection animationProps={animationProps} />

          {/* Contact Info */}
          <ContactSection animationProps={animationProps} />

          {/* Resources */}
          <ResourcesSection animationProps={animationProps} />
        </motion.div>

        {/* Social Links */}
        <SocialSection animationProps={animationProps} />

        {/* Copyright Section */}
        <CopyrightSection animationProps={animationProps} scrollToTop={scrollToTop} />
      </div>
    </footer>
  );
}

// --- STATS SECTION ---
const StatsSection = ({ animationProps }) => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={statsRef}
      className="mb-16"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {FOOTER_STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={animationProps(index * 0.1)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/30 border border-slate-700/30 rounded-lg backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 text-center">
              <CardContent className="flex flex-col items-center gap-2 p-4">
                {stat.icon}
                <p className="text-xl font-bold text-white">{stat.number}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// --- BRAND SECTION ---
const BrandSection = ({ animationProps }) => (
  <motion.div variants={animationProps()} className="space-y-6">
    <div className="flex items-center gap-4">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 shadow-lg shadow-emerald-500/10"
      >
        <Image
          src="/logo.png"
          alt={`${FOOTER_CONFIG.name} - Professional photo`}
          fill
          sizes="64px"
          className="object-cover"
          quality={95}
        />
      </motion.div>
      <div>
        <h3 className="text-xl font-bold text-white">{FOOTER_CONFIG.name}</h3>
        <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 font-medium">
          {FOOTER_CONFIG.title}
        </p>
      </div>
    </div>

    <p className="text-sm text-slate-300 leading-relaxed">
      {FOOTER_CONFIG.tagline}. Specializing in React, Next.js, and modern web technologies.
    </p>

    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 rounded-lg">
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
      <span className="text-xs font-medium text-emerald-300">
        Available for new projects
      </span>
    </div>
  </motion.div>
);

// --- QUICK LINKS SECTION ---
const QuickLinksSection = ({ animationProps }) => (
  <motion.div variants={animationProps(0.1)} className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="h-1 w-8 rounded bg-gradient-to-r from-emerald-400 to-sky-500"></div>
      <h4 className="text-lg font-bold text-white">Quick Links</h4>
    </div>
    
    <div className="space-y-3">
      {FOOTER_CONFIG.quickLinks.map((link, index) => (
        <motion.div
          key={link.name}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          {link.internal ? (
            <Link
              href={link.href}
              className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors duration-300 group"
            >
              <div className="w-1 h-1 bg-slate-500 rounded-full group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300"></div>
              <span className="text-sm font-medium">{link.name}</span>
            </Link>
          ) : (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors duration-300 group"
            >
              <div className="w-1 h-1 bg-slate-500 rounded-full group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300"></div>
              <span className="text-sm font-medium">{link.name}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// --- CONTACT SECTION ---
const ContactSection = ({ animationProps }) => (
  <motion.div variants={animationProps(0.2)} className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="h-1 w-8 rounded bg-gradient-to-r from-emerald-400 to-sky-500"></div>
      <h4 className="text-lg font-bold text-white">Get In Touch</h4>
    </div>
    
    <div className="space-y-4">
      <motion.a
        href={`mailto:${FOOTER_CONFIG.email}`}
        className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-all duration-300 group"
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-lg group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300">
          <Mail className="w-4 h-4" />
        </div>
        <div>
          <span className="text-sm font-medium block">Email</span>
          <span className="text-xs text-slate-500">{FOOTER_CONFIG.email}</span>
        </div>
      </motion.a>

      <motion.a
        href={`tel:${FOOTER_CONFIG.phone.replace(/\s|-/g, '')}`}
        className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-all duration-300 group"
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-lg group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300">
          <Phone className="w-4 h-4" />
        </div>
        <div>
          <span className="text-sm font-medium block">Phone</span>
          <span className="text-xs text-slate-500">{FOOTER_CONFIG.phone}</span>
        </div>
      </motion.a>

      <motion.div
        className="flex items-center gap-3 text-slate-300"
        whileHover={{ x: 5 }}
      >
        <div className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <MapPin className="w-4 h-4" />
        </div>
        <div>
          <span className="text-sm font-medium block">Location</span>
          <span className="text-xs text-slate-500">{FOOTER_CONFIG.location}</span>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// --- RESOURCES SECTION ---
const ResourcesSection = ({ animationProps }) => (
  <motion.div variants={animationProps(0.3)} className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="h-1 w-8 rounded bg-gradient-to-r from-emerald-400 to-sky-500"></div>
      <h4 className="text-lg font-bold text-white">Resources</h4>
    </div>
    
    <div className="space-y-3">
      {FOOTER_CONFIG.resources.map((resource, index) => (
        <motion.a
          key={resource.name}
          href={resource.href}
          target={resource.external ? "_blank" : undefined}
          rel={resource.external ? "noopener noreferrer" : undefined}
          className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-all duration-300 group"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <div className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-lg group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300">
            <resource.icon className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">{resource.name}</span>
          {resource.external && (
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </motion.a>
      ))}
    </div>
  </motion.div>
);

// --- SOCIAL SECTION ---
const SocialSection = ({ animationProps }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={containerVariants}
    className="mb-12"
  >
    <motion.div variants={animationProps()} className="text-center space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Let's Connect</h3>
        <p className="text-slate-300">Follow me on social media for updates and insights</p>
      </div>
      
      <TooltipProvider>
        <div className="flex justify-center gap-4">
          {FOOTER_CONFIG.socials.map((social, index) => (
            <Tooltip key={social.name}>
              <TooltipTrigger asChild>
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${social.name} profile`}
                  className="group relative overflow-hidden"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className={`relative flex items-center justify-center w-12 h-12 bg-gradient-to-r ${social.bgGradient} rounded-xl border border-slate-700/50 hover:border-slate-600/70 shadow-lg transition-all duration-300`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    <social.icon className={`w-5 h-5 ${social.color} ${social.hoverColor} transition-colors duration-300 relative z-10`} />
                  </div>
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Follow me on {social.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </motion.div>
  </motion.section>
);

// --- COPYRIGHT SECTION ---
const CopyrightSection = ({ animationProps, scrollToTop }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={containerVariants}
    className="border-t border-slate-700/30 pt-8"
  >
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <motion.div variants={animationProps()} className="text-center sm:text-left">
        <p className="text-sm text-slate-300 mb-1">
          Made with{" "}
          <Heart className="w-4 h-4 text-red-500 inline-block mx-1 animate-pulse" />{" "}
          and{" "}
          <Coffee className="w-4 h-4 text-yellow-500 inline-block mx-1" />{" "}
          by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 font-semibold">
            {FOOTER_CONFIG.name}
          </span>
        </p>
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </motion.div>

      <motion.div variants={animationProps(0.1)}>
        <Button
          onClick={scrollToTop}
          variant="outline"
          size="sm"
          className="group bg-slate-800/50 border-slate-700/50 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-slate-300 hover:text-emerald-400 transition-all duration-300"
        >
          <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform duration-300" />
          Back to Top
        </Button>
      </motion.div>
    </div>
  </motion.div>
);