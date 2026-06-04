"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedText } from "./ui/AnimatedUnderline";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContactInfoItem {
  href: string | null;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  hoverColor: string;
  isLink: boolean;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CONTACT_INFO_ITEMS: ContactInfoItem[] = [
  {
    href: "mailto:ayoubprograma@gmail.com",
    icon: Mail,
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    label: "Email",
    value: "ayoubprograma@gmail.com",
    hoverColor: "group-hover:text-sky-300",
    isLink: true,
  },
  {
    href: "tel:+212781913306",
    icon: Phone,
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
    label: "Phone",
    value: "+212 781 913 306",
    hoverColor: "group-hover:text-indigo-300",
    isLink: true,
  },
  {
    href: null,
    icon: MapPin,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    label: "Location",
    value: "Rabat, Morocco",
    hoverColor: "",
    isLink: false,
  },
];

const INITIAL_FORM_STATE: FormState = { name: "", email: "", message: "" };

// ---------------------------------------------------------------------------
// Typed Framer Motion variants
// ---------------------------------------------------------------------------

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ---------------------------------------------------------------------------
// Sub-component: ContactInfoCard (avoids duplicated JSX between link/non-link)
// ---------------------------------------------------------------------------

interface ContactInfoCardProps {
  item: ContactInfoItem;
}

function ContactInfoCard({ item }: ContactInfoCardProps) {
  const Icon = item.icon;
  return (
    <Card className="glass border-white/[0.06] bg-transparent hover:bg-white/5 active:bg-white/[0.08] transition-all duration-200 group cursor-default">
      <CardContent className="flex items-center gap-3 md:gap-4 p-3.5 md:p-4">
        <div
          className={`w-9 h-9 md:w-10 md:h-10 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0`}
        >
          <Icon className={`w-4 h-4 md:w-5 md:h-5 ${item.iconColor}`} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="text-xs md:text-sm text-[#64748B] mb-0.5">{item.label}</div>
          <div
            className={`text-sm md:text-base text-white font-medium transition-colors truncate ${item.hoverColor}`}
          >
            {item.value}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  const [formState,   setFormState]   = useState<FormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted,  setIsSubmitted]  = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        // Replace with your real form submission (e.g. fetch to an API route)
        await new Promise<void>((resolve) => setTimeout(resolve, 1200));
        setIsSubmitted(true);
        setFormState(INITIAL_FORM_STATE);
        setTimeout(() => setIsSubmitted(false), 4000);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting],
  );

  // Single generic change handler keyed to FormState fields
  const handleChange = useCallback(
    (field: keyof FormState, value: string) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding bg-[#0B0F19] relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-sky-500/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-tight relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 lg:mb-24"
        >
          <AnimatedText
            text="Let's Collaborate"
            textClassName="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-white leading-[1.1] text-left"
            underlineClassName="text-sky-400"
            className="items-start mb-4 md:mb-6"
          />
          <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl leading-relaxed text-balance">
            Have a project in mind? I&apos;m currently available for freelance work
            and open to new opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

          {/* ── Left column: contact info + socials ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-5 space-y-6 md:space-y-8"
          >
            {/* Contact info cards */}
            <div className="space-y-3 md:space-y-4">
              {CONTACT_INFO_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {item.isLink ? (
                    <a href={item.href!} className="block">
                      <ContactInfoCard item={item} />
                    </a>
                  ) : (
                    <ContactInfoCard item={item} />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <motion.div
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <h3 className="text-xs md:text-sm font-medium text-[#64748B] uppercase tracking-[0.12em] mb-3 md:mb-4">
                Socials
              </h3>
              <div className="flex flex-wrap gap-2.5 md:gap-3">
                <motion.a
                  href="https://github.com/AYOU-pixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 450, damping: 18 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass border-white/[0.06] bg-transparent text-[#E2E8F0] hover:text-white hover:bg-white/5 gap-2"
                  >
                    <Github size={15} aria-hidden="true" />
                    GitHub
                  </Button>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/ayoub-rachidi-0b344a322/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 450, damping: 18 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass border-white/[0.06] bg-transparent text-[#E2E8F0] hover:text-white hover:bg-white/5 gap-2"
                  >
                    <Linkedin size={15} aria-hidden="true" />
                    LinkedIn
                  </Button>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right column: contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="lg:col-span-7"
          >
            <Card className="glass border-white/[0.06] bg-transparent shadow-2xl shadow-black/20">
              <CardContent className="p-6 md:p-8">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 md:space-y-6"
                  aria-label="Contact form"
                  noValidate
                >
                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-[#E2E8F0]">
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formState.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="John Doe"
                        className="bg-[#111827] border-white/[0.06] text-white placeholder-[#475569] focus-visible:ring-sky-500/30 focus-visible:border-sky-500/30 rounded-xl h-11 transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-[#E2E8F0]">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formState.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="bg-[#111827] border-white/[0.06] text-white placeholder-[#475569] focus-visible:ring-sky-500/30 focus-visible:border-sky-500/30 rounded-xl h-11 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-[#E2E8F0]">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell me about your project..."
                      className="bg-[#111827] border-white/[0.06] text-white placeholder-[#475569] focus-visible:ring-sky-500/30 focus-visible:border-sky-500/30 rounded-xl resize-none transition-all duration-200"
                    />
                  </div>

                  {/* Submit button */}
                  <motion.div
                    whileHover={!isSubmitting && !isSubmitted ? { scale: 1.02, y: -1 } : {}}
                    whileTap={!isSubmitting && !isSubmitted ? { scale: 0.97 } : {}}
                    transition={{ type: "spring", stiffness: 450, damping: 18 }}
                    className="w-full sm:w-auto inline-block relative overflow-hidden"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 md:px-8 py-3 md:py-3.5 rounded-full font-semibold text-sm transition-colors duration-200 ${
                        isSubmitted
                          ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                          : "bg-white text-[#0B0F19] hover:bg-[#E2E8F0]"
                      } disabled:opacity-60 disabled:cursor-not-allowed`}
                      aria-live="polite"
                    >
                      {/* Shimmer sweep — only shown in idle state */}
                      {!isSubmitting && !isSubmitted && (
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full pointer-events-none"
                          whileHover={{ translateX: "200%" }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          aria-hidden="true"
                        />
                      )}

                      {isSubmitting ? (
                        <span className="flex items-center gap-2 relative z-10">
                          <span
                            className="w-4 h-4 border-2 border-[#0B0F19]/30 border-t-[#0B0F19] rounded-full animate-spin"
                            aria-hidden="true"
                          />
                          Sending...
                        </span>
                      ) : isSubmitted ? (
                        <span className="flex items-center gap-2 relative z-10">
                          <CheckCircle size={16} aria-hidden="true" />
                          Message sent!
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 relative z-10">
                          Send Message
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}