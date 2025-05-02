"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { MdEmail, MdLocationPin, MdPhone, MdSend, MdCheckCircle, MdError } from "react-icons/md";
import { FaLinkedin, FaGithub, FaTelegram } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";

export default function ContactSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState({ sending: false, success: false, error: "" });
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  // Dark mode detection
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);
    
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener("change", handleChange);
    
    return () => darkModeQuery.removeEventListener("change", handleChange);
  }, []);

  // Animation triggers
  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: "" });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          to: "ayoubprograma@gmail.com"
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus({ sending: false, success: true, error: "" });
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      setStatus({ sending: false, success: false, error: error.message });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const socialVariants = {
    hidden: { scale: 0 },
    visible: (i) => ({
      scale: 1,
      transition: { delay: i * 0.1, type: "spring", stiffness: 300 }
    })
  };

  const socialLinks = [
    { icon: <FaLinkedin />, name: "LinkedIn", color: "text-[#0A66C2]", url: "https://www.linkedin.com/in/ayoub-rachd-0b344a322/" },
    { icon: <FaGithub />, name: "GitHub", color: "text-gray-800 dark:text-gray-100", url: "https://github.com/AYOU-pixel" },
    { icon: <FaTelegram />, name: "Telegram", color: "text-[#26A5E4]", url: "#" }
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Section Heading */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="flex items-center justify-center mb-2">
              <div className={`h-1 w-12 rounded ${
                isDarkMode ? "bg-indigo-500" : "bg-blue-500"
              } mr-4`} />
              <h2 className="text-sm uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                Let's Connect
              </h2>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className={`text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } max-w-xl mx-auto`}>
              Have a project in mind or just want to connect? My inbox is always open.
            </p>
          </motion.div>

          <div className="w-full grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Methods */}
            <motion.div
              className="space-y-8"
              variants={containerVariants}
            >
              {/* Contact Cards */}
              <motion.div
                variants={itemVariants}
                className={`p-6 rounded-2xl ${
                  isDarkMode ? "bg-slate-800" : "bg-gray-50"
                } shadow-lg`}
              >
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      isDarkMode ? "bg-indigo-500/20" : "bg-blue-500/20"
                    }`}>
                      <MdEmail className="text-2xl text-blue-500 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email Me</h3>
                      <a
                        href="mailto:ayoubprograma@gmail.com"
                        className={`hover:text-blue-500 dark:hover:text-indigo-400 transition-colors ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        ayoubprograma@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      isDarkMode ? "bg-indigo-500/20" : "bg-blue-500/20"
                    }`}>
                      <MdPhone className="text-2xl text-blue-500 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Call Me</h3>
                      <a
                        href="tel:+1234567890"
                        className={`hover:text-blue-500 dark:hover:text-indigo-400 transition-colors ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      isDarkMode ? "bg-indigo-500/20" : "bg-blue-500/20"
                    }`}>
                      <MdLocationPin className="text-2xl text-blue-500 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Location</h3>
                      <p className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}>
                        Casablanca, Morocco
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-lg font-semibold">Follow Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      custom={i}
                      variants={socialVariants}
                      whileHover={{ y: -5 }}
                      className={`p-3 rounded-xl ${
                        isDarkMode ? "bg-slate-800" : "bg-gray-100"
                      } hover:shadow-lg transition-shadow ${link.color}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-2xl">{link.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className={`p-6 rounded-2xl ${
                isDarkMode ? "bg-slate-800" : "bg-gray-50"
              } shadow-lg space-y-6`}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <motion.input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-slate-700 border-slate-600 focus:border-indigo-500"
                        : "bg-white border-gray-300 focus:border-blue-500"
                    } border focus:ring-0`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <motion.input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-slate-700 border-slate-600 focus:border-indigo-500"
                        : "bg-white border-gray-300 focus:border-blue-500"
                    } border focus:ring-0`}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <motion.textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDarkMode
                        ? "bg-slate-700 border-slate-600 focus:border-indigo-500"
                        : "bg-white border-gray-300 focus:border-blue-500"
                    } border focus:ring-0`}
                  />
                </div>
              </div>

              {/* Status Messages */}
              {status.error && (
                <div className="flex items-center gap-2 text-red-500">
                  <MdError className="text-xl" />
                  <span>Error: {status.error}</span>
                </div>
              )}
              
              {status.success && (
                <div className="flex items-center gap-2 text-green-500">
                  <MdCheckCircle className="text-xl" />
                  <span>Message sent successfully!</span>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status.sending}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg font-medium text-white ${
                  isDarkMode
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                    : "bg-gradient-to-r from-blue-500 to-purple-600"
                } shadow-md relative overflow-hidden group flex items-center justify-center gap-2`}
              >
                <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
                {status.sending ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <MdSend className="text-xl" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}