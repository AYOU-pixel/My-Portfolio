"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-padding bg-[#0B0F19] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[120px]" />
      
      <div className="container-tight relative z-10" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Let's <span className="text-gradient">Collaborate</span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
            Have a project in mind? I'm currently available for freelance work and open to new opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-6">
              <a
                href="mailto:ayoubprograma@gmail.com"
                className="group flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <div className="text-sm text-[#64748B] mb-0.5">Email</div>
                  <div className="text-white font-medium group-hover:text-sky-300 transition-colors">
                    ayoubprograma@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+212781913306"
                className="group flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm text-[#64748B] mb-0.5">Phone</div>
                  <div className="text-white font-medium group-hover:text-indigo-300 transition-colors">
                    +212 781 913 306
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 glass rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-[#64748B] mb-0.5">Location</div>
                  <div className="text-white font-medium">Rabat, Morocco</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#64748B] uppercase tracking-wider mb-4">
                Socials
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://github.com/AYOU-pixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 glass rounded-lg text-sm text-[#E2E8F0] hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/ayoub-rchidi-0b344a322/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 glass rounded-lg text-sm text-[#E2E8F0] hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[#E2E8F0]">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#111827] border border-white/[0.06] rounded-xl text-white placeholder-[#475569] focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500/30 transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#E2E8F0]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#111827] border border-white/[0.06] rounded-xl text-white placeholder-[#475569] focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500/30 transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-[#E2E8F0]">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#111827] border border-white/[0.06] rounded-xl text-white placeholder-[#475569] focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500/30 transition-all duration-200 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#0B0F19] rounded-full font-medium hover:bg-[#E2E8F0] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : isSubmitted ? (
                  "Message sent!"
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