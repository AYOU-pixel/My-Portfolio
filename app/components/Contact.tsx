"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, type Variants, useReducedMotion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedText } from "./ui/AnimatedUnderline";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

// ---------------------------------------------------------------------------
// Spring configs (Framer Motion best practices)
// ---------------------------------------------------------------------------
const springMicro = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  mass: 0.8,
};

const springGentle = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

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
  ariaLabel: string;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
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
    ariaLabel: "Send email to ayoubprograma@gmail.com",
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
    ariaLabel: "Call +212 781 913 306",
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
    ariaLabel: "Location: Rabat, Morocco",
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
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 22, 
      mass: 0.8,
      delay: i * 0.07 
    },
  }),
};

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(state: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!state.name.trim()) errors.name = "Name is required";
  else if (state.name.trim().length < 2) errors.name = "Name must be at least 2 characters";
  
  if (!state.email.trim()) errors.email = "Email is required";
  else if (!validateEmail(state.email)) errors.email = "Please enter a valid email address";
  
  if (!state.message.trim()) errors.message = "Message is required";
  else if (state.message.trim().length < 10) errors.message = "Message must be at least 10 characters";
  
  return errors;
}

// ---------------------------------------------------------------------------
// Sub-component: ContactInfoCard
// ---------------------------------------------------------------------------

interface ContactInfoCardProps {
  item: ContactInfoItem;
}

function ContactInfoCard({ item }: ContactInfoCardProps) {
  const Icon = item.icon;
  const CardWrapper = item.isLink ? "a" : "div";
  const linkProps = item.isLink
    ? { href: item.href!, target: "_blank", rel: "noopener noreferrer", "aria-label": item.ariaLabel }
    : {};

  return (
    <CardWrapper
      {...linkProps}
      className={`block ${item.isLink ? "cursor-pointer" : "cursor-default"} focus-ring rounded-xl`}
    >
      <Card className="glass border-white/[0.06] bg-transparent hover:bg-white/5 active:bg-white/[0.08] transition-all duration-200 group">
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
    </CardWrapper>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Clear success state on unmount
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  const validateField = useCallback((field: keyof FormState, value: string) => {
    const fieldErrors = validateForm({ ...formState, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  }, [formState]);

  const handleChange = useCallback(
    (field: keyof FormState, value: string) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
      if (touched[field]) {
        validateField(field, value);
      }
    },
    [touched, validateField],
  );

  const handleBlur = useCallback(
    (field: keyof FormState) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateField(field, formState[field]);
    },
    [formState, validateField],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      // Validate all fields
      const formErrors = validateForm(formState);
      setErrors(formErrors);
      setTouched({ name: true, email: true, message: true });
      
      if (Object.keys(formErrors).length > 0) {
        // Focus first invalid field
        const firstErrorField = Object.keys(formErrors)[0] as keyof FormState;
        document.getElementById(firstErrorField)?.focus();
        return;
      }

      if (isSubmitting) return;
      setIsSubmitting(true);

      try {
        await new Promise<void>((resolve) => setTimeout(resolve, 1200));
        setIsSubmitted(true);
        setFormState(INITIAL_FORM_STATE);
        setTouched({});
        setErrors({});
        
        // Auto-dismiss after 5s with cleanup
        successTimeoutRef.current = setTimeout(() => setIsSubmitted(false), 5000);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, isSubmitting],
  );

  const getFieldErrorId = (field: string) => `${field}-error`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding bg-[#0B0F19] relative overflow-hidden"
    >
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-sky-500/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-tight relative z-10">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 lg:mb-24"
        >
          <AnimatedText
            text="Let's Collaborate"
            textClassName="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-white leading-[1.1] text-left"
            underlineClassName="text-sky-400"
            className="items-start mb-4 md:mb-6"
          />
          <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl leading-relaxed text-balance text-pretty">
            Have a project in mind? I&apos;m currently available for freelance work
            and open to new opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Left column */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            animate={isInView || shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.15 }}
            className="lg:col-span-5 space-y-6 md:space-y-8"
          >
            <div className="space-y-3 md:space-y-4">
              {CONTACT_INFO_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate={isInView || shouldReduceMotion ? "visible" : "hidden"}
                >
                  <ContactInfoCard item={item} />
                </motion.div>
              ))}
            </div>

            <motion.div
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate={isInView || shouldReduceMotion ? "visible" : "hidden"}
            >
              <h3 className="text-xs md:text-sm font-medium text-[#64748B] uppercase tracking-[0.12em] mb-3 md:mb-4">
                Socials
              </h3>
              <div className="flex flex-wrap gap-2.5 md:gap-3">
                <motion.a
                  href="https://github.com/AYOU-pixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in new tab)"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  transition={springMicro}
                  className="inline-flex items-center gap-2 px-4 py-2.5 glass border border-white/[0.06] bg-transparent text-[#E2E8F0] hover:text-white hover:bg-white/5 rounded-full text-sm font-medium transition-colors focus-ring touch-target"
                >
                  <Github size={15} aria-hidden="true" />
                  GitHub
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/ayoub-rachidi-0b344a322/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in new tab)"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  transition={springMicro}
                  className="inline-flex items-center gap-2 px-4 py-2.5 glass border border-white/[0.06] bg-transparent text-[#E2E8F0] hover:text-white hover:bg-white/5 rounded-full text-sm font-medium transition-colors focus-ring touch-target"
                >
                  <Linkedin size={15} aria-hidden="true" />
                  LinkedIn
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: contact form */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            animate={isInView || shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.25 }}
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
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-[#E2E8F0]">
                        Name <span className="text-sky-400" aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formState.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        placeholder="John Doe"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? getFieldErrorId("name") : undefined}
                        className={`bg-[#111827] border-white/[0.06] text-white placeholder-[#475569] focus-visible:ring-sky-500/30 focus-visible:border-sky-500/30 rounded-xl h-11 transition-all duration-200 ${
                          errors.name && touched.name ? "border-red-500/50 focus-visible:border-red-500/50 focus-visible:ring-red-500/20" : ""
                        }`}
                      />
                      {errors.name && touched.name && (
                        <p id={getFieldErrorId("name")} className="text-xs text-red-400 flex items-center gap-1" role="alert">
                          <AlertCircle size={12} aria-hidden="true" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-[#E2E8F0]">
                        Email <span className="text-sky-400" aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formState.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        placeholder="john@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? getFieldErrorId("email") : undefined}
                        className={`bg-[#111827] border-white/[0.06] text-white placeholder-[#475569] focus-visible:ring-sky-500/30 focus-visible:border-sky-500/30 rounded-xl h-11 transition-all duration-200 ${
                          errors.email && touched.email ? "border-red-500/50 focus-visible:border-red-500/50 focus-visible:ring-red-500/20" : ""
                        }`}
                      />
                      {errors.email && touched.email && (
                        <p id={getFieldErrorId("email")} className="text-xs text-red-400 flex items-center gap-1" role="alert">
                          <AlertCircle size={12} aria-hidden="true" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-[#E2E8F0]">
                      Message <span className="text-sky-400" aria-hidden="true">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      placeholder="Tell me about your project..."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? getFieldErrorId("message") : undefined}
                      className={`bg-[#111827] border-white/[0.06] text-white placeholder-[#475569] focus-visible:ring-sky-500/30 focus-visible:border-sky-500/30 rounded-xl resize-none transition-all duration-200 ${
                        errors.message && touched.message ? "border-red-500/50 focus-visible:border-red-500/50 focus-visible:ring-red-500/20" : ""
                      }`}
                    />
                    {errors.message && touched.message && (
                      <p id={getFieldErrorId("message")} className="text-xs text-red-400 flex items-center gap-1" role="alert">
                        <AlertCircle size={12} aria-hidden="true" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <motion.div
                    whileHover={!isSubmitting && !isSubmitted && !shouldReduceMotion ? { scale: 1.02, y: -1 } : {}}
                    whileTap={!isSubmitting && !isSubmitted ? { scale: 0.97 } : {}}
                    transition={springMicro}
                    className="w-full sm:w-auto inline-block relative overflow-hidden"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 md:px-8 py-3 md:py-3.5 rounded-full font-semibold text-sm transition-colors duration-200 touch-target ${
                        isSubmitted
                          ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                          : "bg-white text-[#0B0F19] hover:bg-[#E2E8F0]"
                      } disabled:opacity-60 disabled:cursor-not-allowed`}
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {!isSubmitting && !isSubmitted && (
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full pointer-events-none"
                          whileHover={shouldReduceMotion ? {} : { translateX: "200%" }}
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
                          Message sent successfully!
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