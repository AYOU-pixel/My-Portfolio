"use client";

import { Linkedin, Github, Twitter, Mail, Phone, FileText, ArrowUp, Globe } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FooterSection() {
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);
  
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [20, 0]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isMounted) return null;

  // Detect mobile device
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

  // Define social links with names explicitly
  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/ayoub-rachd-0b344a322/", color: "text-blue-500", name: "LinkedIn" },
    { icon: Github, href: "https://github.com/AYOU-pixel", color: "text-slate-300", name: "GitHub" },
    { icon: Twitter, href: "#", color: "text-sky-400", name: "Twitter" }
  ];

  const quickLinks = [
    { icon: Globe, href: "https://github.com/AYOU-pixel/Portfolio-2", text: "Portfolio" },
    { icon: FileText, href: "/front-end-developer-resume-ayoub-pdf.pdf", text: "Resume" },
    { icon: Globe, href: "https://app.netlify.com/teams/ayou-pixel/sites", text: "Netlify" }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700/30"
    >
      <div className="container mx-auto px-2 sm:px-4 py-10 md:py-16">
        <div className={isMobile ? "grid grid-cols-1 gap-6 mb-10" : "grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-16"}>
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={isMobile ? "flex flex-col items-center space-y-4" : "flex flex-col items-center md:items-start space-y-6"}
          >
            <motion.div
              whileHover={isMobile ? undefined : { scale: 1.05 }}
              className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-slate-700/50 hover:border-cyan-400 transition-all"
            >
              <Image
                src="/logos.jpg"
                alt="Ayoub's Logo"
                fill
                className="object-cover"
                sizes={isMobile ? "80px" : "120px"}
                quality={isMobile ? 60 : 100}
              />
            </motion.div>
            <p className="text-slate-400 text-xs md:text-sm text-center md:text-left max-w-xs leading-relaxed">
              Crafting high-performance web experiences with modern technologies
            </p>
          </motion.div>
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={isMobile ? "flex flex-col items-center" : "flex flex-col items-center md:items-start"}
          >
            <h3 className="text-base md:text-lg font-semibold text-slate-100 mb-4 md:mb-6">Connect</h3>
            <div className={isMobile ? "grid grid-cols-3 gap-2" : "grid grid-cols-3 gap-4"}>
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center"
                  whileHover={isMobile ? undefined : { y: -5 }}
                >
                  <div className={`p-2 md:p-3 rounded-full bg-slate-800/50 backdrop-blur-sm transition-all group-hover:bg-opacity-100 ${social.color}`}>
                    <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <span className="text-[10px] md:text-xs text-slate-400 mt-1 md:mt-2">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={isMobile ? "flex flex-col items-center" : "flex flex-col items-center md:items-start"}
          >
            <h3 className="text-base md:text-lg font-semibold text-slate-100 mb-4 md:mb-6">Contact</h3>
            <div className="space-y-2 md:space-y-4">
              <motion.a
                href="mailto:ayoubprograma@gmail.com"
                className="flex items-center gap-2 md:gap-3 text-slate-400 hover:text-cyan-400 transition-colors"
                whileHover={isMobile ? undefined : { x: 5 }}
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">ayoubprograma@gmail.com</span>
              </motion.a>
              <motion.a
                href="tel:+212781913306"
                className="flex items-center gap-2 md:gap-3 text-slate-400 hover:text-cyan-400 transition-colors"
                whileHover={isMobile ? undefined : { x: 5 }}
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">+212 781913306</span>
              </motion.a>
            </div>
          </motion.div>
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={isMobile ? "flex flex-col items-center" : "flex flex-col items-center md:items-start"}
          >
            <h3 className="text-base md:text-lg font-semibold text-slate-100 mb-4 md:mb-6">Links</h3>
            <div className="space-y-2 md:space-y-4">
              {quickLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className="flex items-center gap-2 md:gap-3 text-slate-400 hover:text-cyan-400 transition-colors"
                  whileHover={isMobile ? undefined : { x: 5 }}
                >
                  <link.icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm">{link.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center border-t border-slate-700/30 pt-6 md:pt-8"
        >
          <p className="text-xs md:text-sm text-slate-500">
            Crafted by{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold">
              Ayoub
            </span>{" "}
            © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed right-4 md:right-6 bottom-4 md:bottom-6 p-2 md:p-3 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700/30 hover:border-cyan-400/50 transition-all"
        style={{ opacity, y }}
        aria-label="Scroll to top"
        whileHover={isMobile ? undefined : { scale: 1.1 }}
        whileTap={isMobile ? undefined : { scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
      </motion.button>
    </motion.footer>
  );
}