"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, ArrowUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Animate in only when the user hasn't requested reduced motion
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(footer, {
          opacity: 0,
          y: 16,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      });

      // Immediately show footer without animation for reduced-motion users
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(footer, { opacity: 1, y: 0, clearProps: "transform" });
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="py-8 md:py-12 border-t border-white/[0.06] bg-[#0B0F19]"
    >
      <div className="container-tight">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">

          {/* Brand */}
          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-white font-semibold text-sm md:text-base">
              Ayoub Rachidi
            </span>
            <span className="text-[#475569] text-xs md:text-sm">
              © {currentYear}
            </span>
          </div>

          {/* Links + back-to-top */}
          <div className="flex items-center gap-5 md:gap-6">
            <a
              href="https://github.com/AYOU-pixel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-[#64748B] hover:text-white hover:scale-110 transition-all duration-200 p-1.5 -m-1.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/ayoub-rchidi-0b344a322/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-[#64748B] hover:text-white hover:scale-110 transition-all duration-200 p-1.5 -m-1.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>

            <div className="h-4 w-px bg-white/10" aria-hidden="true" />

            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-[#64748B] hover:text-white transition-colors duration-200 p-1.5 -m-1.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
              aria-label="Scroll back to top"
            >
              Back to top
              <ArrowUp
                className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}