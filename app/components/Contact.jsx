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
export default function ContactSection() {
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
                <div className="flex gap-4">
                  {CONTACT_CONFIG.socials.map(social => <SocialLink key={social.name} {...social} />)}
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