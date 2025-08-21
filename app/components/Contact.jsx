"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, MotionConfig } from "framer-motion";
import { MdEmail, MdLocationPin, MdPhone, MdSend, MdCheckCircle, MdError } from "react-icons/md";
import { FaLinkedin, FaGithub, FaTelegram } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";

// --- CONFIG ---
const CONTACT_CONFIG = {
  email: "ayoubprograma@gmail.com",
  phone: "+212 781 913 306",
  location: "Sale, Morocco",
  socials: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ayoub-rachd-0b344a322/",
      icon: FaLinkedin,
      color: "hover:text-sky-400",
    },
    {
      name: "GitHub",
      url: "https://github.com/AYOU-pixel",
      icon: FaGithub,
      color: "hover:text-gray-400",
    },
    {
      name: "Telegram",
      url: "https://t.me/your-profile",
      icon: FaTelegram,
      color: "hover:text-blue-400",
    },
    {
      name: "Upwork",
      url: "https://www.upwork.com/freelancers/your-profile",
      icon: SiUpwork,
      color: "hover:text-green-400",
    },
  ],
};

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
};

// --- MODULAR SUB-COMPONENTS for cleaner code ---

const ContactInfoCard = ({ icon, title, value, href }) => (
  <div className="flex items-center gap-4">
    <div className="flex-shrink-0 p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {href ? (
        <a href={href} className="text-slate-300 hover:text-sky-400 transition-colors">
          {value}
        </a>
      ) : (
        <p className="text-slate-300">{value}</p>
      )}
    </div>
  </div>
);

const SocialLink = ({ icon: Icon, url, color, name }) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Visit my ${name} profile`}
    whileHover={{ y: -4, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 transition-colors ${color}`}
  >
    <Icon className="w-6 h-6" />
  </motion.a>
);

const FormInput = ({ id, name, type = "text", value, onChange, label, required = false, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-2 text-slate-300">
      {label}
    </label>
    <motion.input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      {...props}
      className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 outline-none"
    />
  </div>
);

const StatusMessage = ({ status }) => (
  <AnimatePresence>
    {status.message && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`flex items-center gap-3 p-3 rounded-lg text-sm font-semibold ${
          status.success
            ? "bg-green-500/10 text-green-400 border border-green-500/20"
            : "bg-red-500/10 text-red-400 border border-red-500/20"
        }`}
      >
        {status.success ? <MdCheckCircle className="w-5 h-5" /> : <MdError className="w-5 h-5" />}
        <span>{status.message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- MAIN COMPONENT ---
export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ sending: false, success: false, message: "" });
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Please enter a valid email.";
    if (!formData.message.trim() || formData.message.length < 10) return "Message must be at least 10 characters long.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setStatus({ sending: false, success: false, message: validationError });
      return;
    }

    setStatus({ sending: true, success: false, message: "" });
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, to: CONTACT_CONFIG.email }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "An unknown error occurred.");

      setStatus({ sending: false, success: true, message: "Message sent successfully! I'll be in touch soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ sending: false, success: false, message: error.message });
    }
  };
  
  // Clear status message after a delay
  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => setStatus(prev => ({ ...prev, message: "" })), 6000);
      return () => clearTimeout(timer);
    }
  }, [status.message]);


  return (
    <MotionConfig reducedMotion="user">
      <section id="contact" ref={sectionRef} className="py-24 sm:py-32 bg-slate-900 text-white">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-sky-400 font-semibold tracking-wider uppercase mb-2">Let's Connect</h2>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Get In Touch</h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-300">
              Have a project idea, a question, or just want to say hi? My inbox is always open.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Contact Info */}
            <motion.div variants={containerVariants} className="space-y-10">
              <div className="space-y-6">
                <ContactInfoCard icon={<MdEmail className="w-6 h-6 text-sky-400" />} title="Email" value={CONTACT_CONFIG.email} href={`mailto:${CONTACT_CONFIG.email}`} />
                <ContactInfoCard icon={<MdPhone className="w-6 h-6 text-sky-400" />} title="Phone" value={CONTACT_CONFIG.phone} href={`tel:${CONTACT_CONFIG.phone.replace(/\s|-/g, '')}`} />
                <ContactInfoCard icon={<MdLocationPin className="w-6 h-6 text-sky-400" />} title="Location" value={CONTACT_CONFIG.location} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
                <div className="flex gap-3">
                  {/* GitHub */}
                  <a
                    href="https://github.com/AYOU-pixel"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my GitHub profile"
                    className="relative"
                  >
                    <div
                      style={{ clipPath: "url(#squircleClip)" }}
                      className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-600/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/ayoub-rachd-0b344a322/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my LinkedIn profile"
                    className="relative"
                  >
                    <div
                      style={{ clipPath: "url(#squircleClip)" }}
                      className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                  </a>
                  {/* YouTube */}
                  <a
                    href="https://youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my YouTube channel"
                    className="relative"
                  >
                    <div
                      style={{ clipPath: "url(#squircleClip)" }}
                      className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg border border-red-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                  </a>
                  {/* Telegram */}
                  <a
                    href="https://t.me/your-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my Telegram"
                    className="relative"
                  >
                    <div
                      style={{ clipPath: "url(#squircleClip)" }}
                      className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg border border-indigo-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.form variants={itemVariants} onSubmit={handleSubmit} noValidate className="space-y-6 p-8 bg-slate-800/50 border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/20">
              <FormInput id="name" name="name" label="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <FormInput id="email" name="email" type="email" label="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-300">Your Message</label>
                <motion.textarea id="message" name="message" rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 outline-none" />
              </div>
              <StatusMessage status={status} />
              <motion.button type="submit" disabled={status.sending} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-lg shadow-sky-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {status.sending ? (
                  <>
                    <svg className="animate-spin h-5 w-5" /*...*/></svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <MdSend />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}