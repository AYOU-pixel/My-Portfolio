"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? "glass-strong" : "bg-transparent"
        }`}
      >
        <div className="container-tight">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="#home"
              onClick={(e) => handleScroll(e, "#home")}
              className="relative z-10 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="relative px-4 py-2 text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="ml-4 px-5 py-2.5 text-sm font-medium bg-white text-[#0B0F19] rounded-full hover:bg-[#E2E8F0] active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
              >
                Let&apos;s Talk
              </Link>
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-10 p-2.5 -mr-2 text-[#94A3B8] hover:text-white transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

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
              className="absolute inset-0 bg-[#0B0F19]/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-20 left-4 right-4 glass rounded-2xl p-3 flex flex-col gap-1 shadow-2xl"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="block px-4 py-3.5 text-base font-medium text-[#E2E8F0] hover:text-white hover:bg-white/5 rounded-xl transition-colors active:bg-white/10"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-1 pt-3 pb-1 px-1 border-t border-white/10">
                <Link
                  href="#contact"
                  onClick={(e) => handleScroll(e, "#contact")}
                  className="block w-full text-center px-5 py-3.5 text-sm font-semibold bg-white text-[#0B0F19] rounded-full active:scale-[0.98] transition-transform"
                >
                  Let&apos;s Talk
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
