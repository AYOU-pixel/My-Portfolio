"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, ArrowUp } from "lucide-react";

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-40px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      ref={footerRef}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-8 md:py-12 border-t border-white/[0.06] bg-[#0B0F19]"
    >
      <div className="container-tight">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">

          {/* Brand */}
          <div className="flex items-center gap-3 md:gap-4" role="group" aria-label="Brand information">
            <span className="text-white font-semibold text-sm md:text-base">
              Ayoub Rachidi
            </span>
            <span className="text-[#475569] text-xs md:text-sm" aria-label={`Copyright ${currentYear}`}>
              © {currentYear}
            </span>
          </div>

          {/* Links + back-to-top */}
          <div className="flex items-center gap-5 md:gap-6" role="group" aria-label="Social links and navigation">
            <motion.a
              href="https://github.com/AYOU-pixel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in new tab)"
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="text-[#64748B] hover:text-white transition-colors duration-200 p-1.5 -m-1.5 rounded-lg focus-ring"
            >
              <Github size={18} aria-hidden="true" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/ayoub-rachidi-0b344a322/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in new tab)"
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="text-[#64748B] hover:text-white transition-colors duration-200 p-1.5 -m-1.5 rounded-lg focus-ring"
            >
              <Linkedin size={18} aria-hidden="true" />
            </motion.a>

            <div className="h-4 w-px bg-white/10" aria-hidden="true" />

            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="group flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-[#64748B] hover:text-white transition-colors duration-200 p-1.5 -m-1.5 rounded-lg focus-ring"
              aria-label="Scroll back to top"
            >
              Back to top
              <ArrowUp
                className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            </motion.button>
          </div>

        </div>
      </div>
    </motion.footer>
  );
}