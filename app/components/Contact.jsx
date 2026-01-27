
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";

// --- CONFIGURATION ---
const CONTACT_CONFIG = {
  name: "AYOUB",
  email: "ayoubprograma@gmail.com",
  phone: "+212 781 913 306",
  location: "Rabat, Morocco",
  socials: {
    github: "https://github.com/AYOU-pixel",
    linkedin: "https://www.linkedin.com/in/ayoub-rchidi-0b344a322/",
  },
};

// --- ANIMATION VARIANTS ---
const FADE_IN_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

// --- BACKGROUND COMPONENT ---
const ContactBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
    <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-[aurora_20s_infinite_alternate] top-1/4 left-1/4"></div>
    <div className="absolute w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-3xl animate-[aurora_25s_infinite_alternate_reverse] bottom-1/4 right-1/4"></div>
    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] opacity-10" />
    <style jsx>{`
      @keyframes aurora {
        0% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(60px, 40px) rotate(180deg); }
        100% { transform: translate(0, 0) rotate(360deg); }
      }
    `}</style>
  </div>
);

// --- MAIN COMPONENT ---
export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState({
    sending: false,
    success: false,
  });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus({ sending: false, success: true });
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setStatus({ sending: false, success: false });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      <ContactBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={FADE_IN_UP}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 mb-6 py-2 px-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm shadow-lg shadow-cyan-500/5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-lg shadow-cyan-500/50"></span>
            </span>
            <span className="text-sm text-cyan-300 font-semibold tracking-wide">Get In Touch</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Let's <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          
          <p className="text-xl text-slate-300 leading-relaxed">
            Have a project in mind? Feel free to reach out.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Contact Cards */}
              <ContactCard
                icon={<Mail className="w-5 h-5" />}
                title="Email"
                value={CONTACT_CONFIG.email}
                href={`mailto:${CONTACT_CONFIG.email}`}
              />
              
              <ContactCard
                icon={<Phone className="w-5 h-5" />}
                title="Phone"
                value={CONTACT_CONFIG.phone}
                href={`tel:${CONTACT_CONFIG.phone.replace(/\s|-/g, '')}`}
              />
              
              <ContactCard
                icon={<MapPin className="w-5 h-5" />}
                title="Location"
                value={CONTACT_CONFIG.location}
              />

              {/* Social Links */}
              <div className="pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Connect Online</h3>
                <div className="flex gap-4">
                  <SocialButton
                    href={CONTACT_CONFIG.socials.github}
                    icon={<Github className="w-5 h-5" />}
                    label="GitHub"
                  />
                  <SocialButton
                    href={CONTACT_CONFIG.socials.linkedin}
                    icon={<Linkedin className="w-5 h-5" />}
                    label="LinkedIn"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-300">Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your name"
                          className="bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          className="bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                          required
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-300">Message</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell me about your project..."
                        className="bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 resize-none"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={status.sending}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
                    >
                      {status.sending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : status.success ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>

                    {status.success && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-sm text-cyan-400"
                      >
                        Thanks for your message! I'll get back to you soon.
                      </motion.p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Availability Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <p className="text-slate-400 text-sm">
            I typically respond within 24 hours. Looking forward to hearing from you!
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// --- CONTACT CARD COMPONENT ---
const ContactCard = ({ icon, title, value, href }) => (
  <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
    <CardContent className="p-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-lg flex items-center justify-center">
          <div className="text-cyan-400">{icon}</div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-400">{title}</p>
          {href ? (
            <a
              href={href}
              className="text-white hover:text-cyan-300 transition-colors duration-300 flex items-center gap-1 group"
            >
              <span className="font-medium">{value}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ) : (
            <p className="text-white font-medium">{value}</p>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

// --- SOCIAL BUTTON COMPONENT ---
const SocialButton = ({ href, icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="flex-1"
  >
    <Button
      variant="outline"
      className="w-full bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300 backdrop-blur-sm"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  </motion.a>
);