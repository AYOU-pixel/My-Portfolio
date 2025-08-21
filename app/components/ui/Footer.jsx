"use client";

import { Linkedin, Github, Twitter, Mail, Phone, FileText, Globe } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FooterSection() {
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Memoize transforms for better performance
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [20, 0]);

  // Handle mobile detection with resize listener
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    setIsMounted(true);
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoized scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Memoized social links data
  const socialLinks = useMemo(() => [
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/ayoub-rachd-0b344a322/", 
      color: "hover:text-blue-500", 
      bgColor: "group-hover:bg-blue-500/10",
      name: "LinkedIn" 
    },
    { 
      icon: Github, 
      href: "https://github.com/AYOU-pixel", 
      color: "hover:text-slate-300", 
      bgColor: "group-hover:bg-slate-300/10",
      name: "GitHub" 
    },
    { 
      icon: Twitter, 
      href: "#", 
      color: "hover:text-sky-400", 
      bgColor: "group-hover:bg-sky-400/10",
      name: "Twitter" 
    }
  ], []);

  // Memoized quick links data
  const quickLinks = useMemo(() => [
    { 
      icon: Globe, 
      href: "https://github.com/AYOU-pixel/My-Portfolio", 
      text: "Portfolio",
      external: true 
    },
    { 
      icon: FileText, 
      href: "/front-end-developer-resume-ayoub-pdf.pdf", 
      text: "Resume",
      external: false 
    },
    { 
      icon: Globe, 
      href: "https://app.netlify.com/teams/ayou-pixel/sites", 
      text: "Netlify",
      external: true 
    }
  ], []);

  // Animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (!isMounted) return null;

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-slate-900/95 backdrop-blur-md border-t border-slate-700/30 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-800/30 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center sm:items-start space-y-4"
          >
            <motion.div
              whileHover={!isMobile ? { scale: 1.05, rotate: 2 } : undefined}
              className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-slate-700/50 hover:border-cyan-400/70 transition-all duration-300 shadow-lg hover:shadow-cyan-400/20"
            >
              <Image
                src="/logos.webp"
                alt="Ayoub's Professional Logo"
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
                quality={90}
                priority={false}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xg"
              />
            </motion.div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Ayoub Rachd</h3>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                Crafting high-performance web experiences with modern technologies
              </p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center sm:items-start"
          >
            <h3 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
              Connect
            </h3>
            <div className="flex gap-4 sm:flex-col sm:gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 text-slate-400 transition-all duration-300 ${social.color}`}
                  whileHover={!isMobile ? { x: 5 } : undefined}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm transition-all duration-300 ${social.bgColor} group-hover:shadow-lg`}>
                    <social.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium hidden sm:block group-hover:text-current">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center sm:items-start"
          >
            <h3 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
              Contact
            </h3>
            <div className="space-y-4">
              <motion.a
                href="mailto:ayoubprograma@gmail.com"
                className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-all duration-300 group"
                whileHover={!isMobile ? { x: 5 } : undefined}
              >
                <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-cyan-400/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm break-all">ayoubprograma@gmail.com</span>
              </motion.a>
              <motion.a
                href="tel:+212781913306"
                className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-all duration-300 group"
                whileHover={!isMobile ? { x: 5 } : undefined}
              >
                <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-cyan-400/10 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">+212 781 913 306</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center sm:items-start"
          >
            <h3 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
              Links
            </h3>
            <div className="space-y-4">
              {quickLinks.map((link, i) => {
                const LinkComponent = link.external ? 'a' : Link;
                const linkProps = link.external 
                  ? { href: link.href, target: "_blank", rel: "noopener noreferrer" }
                  : { href: link.href };

                return (
                  <motion.div key={i}>
                    <LinkComponent
                      {...linkProps}
                      className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-all duration-300 group"
                    >
                      <motion.div 
                        className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-cyan-400/10 transition-colors"
                        whileHover={!isMobile ? { x: 5 } : undefined}
                      >
                        <link.icon className="w-4 h-4" />
                      </motion.div>
                      <span className="text-sm font-medium">{link.text}</span>
                    </LinkComponent>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          variants={itemVariants}
          className="text-center border-t border-slate-700/30 pt-8"
        >
          <p className="text-sm text-slate-300 mb-2">
            Crafted by{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
              Ayoub Rachidi
            </span>
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}