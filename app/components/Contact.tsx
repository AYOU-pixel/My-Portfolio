"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const handleChange = useCallback((field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <section id="contact" className="section-padding bg-[#0B0F19] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-sky-500/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />
      
      <div className="container-tight relative z-10" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 lg:mb-24"
        >
          <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-white mb-4 md:mb-6 leading-[1.1]">
            Let&apos;s <span className="text-gradient">Collaborate</span>
          </h2>
          <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl leading-relaxed text-balance">
            Have a project in mind? I&apos;m currently available for freelance work and open to new opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-5 space-y-6 md:space-y-8"
          >
            <div className="space-y-3 md:space-y-4">
              <a
                href="mailto:ayoubprograma@gmail.com"
                className="group flex items-center gap-3 md:gap-4 p-3.5 md:p-4 glass rounded-xl hover:bg-white/5 active:bg-white/[0.08] transition-all duration-200"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-sky-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs md:text-sm text-[#64748B] mb-0.5">Email</div>
                  <div className="text-sm md:text-base text-white font-medium group-hover:text-sky-300 transition-colors truncate">
                    ayoubprograma@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+212781913306"
                className="group flex items-center gap-3 md:gap-4 p-3.5 md:p-4 glass rounded-xl hover:bg-white/5 active:bg-white/[0.08] transition-all duration-200"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-xs md:text-sm text-[#64748B] mb-0.5">Phone</div>
                  <div className="text-sm md:text-base text-white font-medium group-hover:text-indigo-300 transition-colors">
                    +212 781 913 306
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3 md:gap-4 p-3.5 md:p-4 glass rounded-xl">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xs md:text-sm text-[#64748B] mb-0.5">Location</div>
                  <div className="text-sm md:text-base text-white font-medium">Rabat, Morocco</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs md:text-sm font-medium text-[#64748B] uppercase tracking-[0.12em] mb-3 md:mb-4">
                Socials
              </h3>
              <div className="flex flex-wrap gap-2.5 md:gap-3">
                <a
                  href="https://github.com/AYOU-pixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 md:px-4 py-2.5 glass rounded-lg text-sm text-[#E2E8F0] hover:text-white hover:bg-white/5 active:bg-white/[0.08] active:scale-95 transition-all duration-200"
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/ayoub-rchidi-0b344a322/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 md:px-4 py-2.5 glass rounded-lg text-sm text-[#E2E8F0] hover:text-white hover:bg-white/5 active:bg-white/[0.08] active:scale-95 transition-all duration-200"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[#E2E8F0]">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 bg-[#111827] border rounded-xl text-white text-sm md:text-base placeholder-[#475569] focus:outline-none focus:ring-2 transition-all duration-200 ${focusedField === "name" ? "border-sky-500/30 ring-sky-500/20" : "border-white/[0.06]"}`}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#E2E8F0]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 bg-[#111827] border rounded-xl text-white text-sm md:text-base placeholder-[#475569] focus:outline-none focus:ring-2 transition-all duration-200 ${focusedField === "email" ? "border-sky-500/30 ring-sky-500/20" : "border-white/[0.06]"}`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-[#E2E8F0]">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-[#111827] border rounded-xl text-white text-sm md:text-base placeholder-[#475569] focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${focusedField === "message" ? "border-sky-500/30 ring-sky-500/20" : "border-white/[0.06]"}`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 md:px-8 py-3 md:py-3.5 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 ${isSubmitted ? "bg-emerald-500 text-white" : "bg-white text-[#0B0F19] hover:bg-[#E2E8F0]"} disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#0B0F19]/30 border-t-[#0B0F19] rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle size={16} />
                    Message sent!
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}