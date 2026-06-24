"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.25 },
  }),
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const headerRef = useRef<HTMLElement>(null);
  const yTo = useRef<((value: number) => void) | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // GSAP scroll-hide / background-blur / active section effect
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    yTo.current = gsap.quickTo(header, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const bgTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "80px top",
      onEnter: () => {
        gsap.to(header, {
          backgroundColor: "rgba(11, 15, 25, 0.92)",
          duration: 0.3,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(header, {
          backgroundColor: "rgba(11, 15, 25, 0)",
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });

    const handleWindowScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Navbar hide/show
        if (currentY < 80) {
          yTo.current?.(0);
        } else if (currentY > lastScrollY.current && currentY > 150) {
          yTo.current?.(-100);
          setIsMobileMenuOpen(false);
        } else if (currentY < lastScrollY.current) {
          yTo.current?.(0);
        }
        lastScrollY.current = currentY;

        // Active section detection
        let currentSection = "#home";
        for (const link of NAV_LINKS) {
          const id = link.href.slice(1);
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= viewportHeight * 0.4) {
              currentSection = link.href;
            }
          }
        }
        setActiveSection(currentSection);

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    handleWindowScroll();

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      bgTrigger.kill();
    };
  }, []);

  // Lock body scroll, handle Escape, and trap focus when mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    lastFocusedElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }

      if (e.key === "Tab" && mobileMenuRef.current) {
        const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!first || !last) return;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      const firstLink = mobileMenuRef.current?.querySelector<HTMLElement>("a");
      firstLink?.focus();
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      lastFocusedElement.current?.focus();
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    },
    [],
  );

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 will-change-transform"
        style={{ transform: "translateY(0)" }}
      >
        <div className="container-tight">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="relative z-10 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: 3 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <Image
                  src="/logo.png"
                  alt="Ayoub Rachidi"
                  width={44}
                  height={44}
                  className="rounded-full object-cover ring-1 ring-white/10"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={activeSection === link.href ? "page" : undefined}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 group inline-block transition-colors duration-200 ${
                      activeSection === link.href
                        ? "text-white"
                        : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {activeSection === link.href && (
                      <span className="absolute bottom-1 left-4 right-4 h-px bg-sky-400" />
                    )}
                    {activeSection !== link.href && (
                      <motion.span
                        className="absolute bottom-1 left-4 right-4 h-px bg-white/30 origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    )}
                    <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-200" />
                  </Link>
                </motion.div>
              ))}

              {/* Let's Talk CTA */}
              <motion.div
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96, y: 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
                className="ml-4 relative"
              >
                <Link
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-white text-[#0B0F19] rounded-full hover:bg-[#E2E8F0] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                    whileHover={{ translateX: "200%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                  <span className="relative z-10">Let&apos;s Talk</span>
                </Link>
              </motion.div>
            </nav>

            {/* Mobile menu toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 450, damping: 18 }}
              className="md:hidden relative z-10 p-2.5 -mr-2 text-[#94A3B8] hover:text-white transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={24} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            aria-hidden={!isMobileMenuOpen}
          >
            <div
              className="absolute inset-0 bg-[#0B0F19]/98"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.nav
              id="mobile-menu"
              ref={mobileMenuRef}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-20 left-4 right-4 bg-[#0B0F19] border border-white/[0.06] rounded-2xl p-3 flex flex-col gap-1 shadow-2xl"
              aria-label="Mobile navigation"
              aria-modal="true"
              role="dialog"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={activeSection === link.href ? "page" : undefined}
                    className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-colors active:bg-white/10 ${
                      activeSection === link.href
                        ? "text-white bg-white/5"
                        : "text-[#E2E8F0] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-1 pt-3 pb-1 px-1 border-t border-white/10">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 450, damping: 18 }}
                >
                  <Link
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className="block w-full text-center px-5 py-3.5 text-sm font-semibold bg-white text-[#0B0F19] rounded-full transition-transform overflow-hidden relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                      whileHover={{ translateX: "200%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                    <span className="relative z-10">Let&apos;s Talk</span>
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}