//contact
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertTriangle,
  Github,
  Linkedin,
  ExternalLink,
  ArrowRight,
  Clock,
  MessageSquare,
  User,
  Calendar,
  Star,
  Globe,
  Loader2
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";

// --- CONFIGURATION ---
const CONTACT_CONFIG = {
  name: "Ayoub Rachd",
  title: "Full-Stack Developer",
  email: "ayoubprograma@gmail.com",
  phone: "+212 781 913 306",
  location: "Rabat, Morocco",
  timezone: "GMT+1 (Casablanca)",
  responseTime: "Within 24 hours",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/AYOU-pixel",
      icon: Github,
      color: "text-gray-400",
      hoverColor: "hover:text-white",
      bgColor: "from-gray-800 to-gray-900"
    },
    {
      name: "LinkedIn", 
      url: "https://www.linkedin.com/in/ayoub-rchidi-0b344a322/",
      icon: Linkedin,
      color: "text-blue-400",
      hoverColor: "hover:text-white",
      bgColor: "from-blue-800 to-blue-900"
    }
  ],
};

// --- STATS DATA ---
const RESPONSE_STATS = [
  { number: "< 24h", label: "Response Time", icon: <Clock className="w-5 h-5 text-emerald-400" /> },
  { number: "98%", label: "Response Rate", icon: <MessageSquare className="w-5 h-5 text-emerald-400" /> },
  { number: "50+", label: "Conversations", icon: <User className="w-5 h-5 text-emerald-400" /> },
  { number: "5★", label: "Average Rating", icon: <Star className="w-5 h-5 text-emerald-400" /> },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- BACKGROUND COMPONENT ---
const BackgroundAurora = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
    <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-emerald-600/15 to-sky-500/15 rounded-full blur-3xl animate-[aurora_25s_infinite_alternate] top-1/4 left-1/4"></div>
    <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-sky-500/10 to-indigo-500/10 rounded-full blur-3xl animate-[aurora_30s_infinite_alternate_reverse] bottom-1/4 right-1/4"></div>
    <style jsx>{`
      @keyframes aurora {
        0% { transform: translate(0, 0); }
        50% { transform: translate(100px, 80px); }
        100% { transform: translate(0, 0); }
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
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState({
    sending: false,
    success: false,
    message: ""
  });
  const [reduceMotion, setReduceMotion] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);

    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus(prev => ({ ...prev, message: "" }));
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [status.message]);

  const animationProps = (delay = 0) => ({
    ...itemVariants,
    transition: { ...itemVariants.transition, delay: reduceMotion ? 0 : delay },
  });

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Please enter a valid email address.";
    if (!formData.subject.trim()) return "Subject is required.";
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setStatus({ 
        sending: false, 
        success: true, 
        message: "Message sent successfully! I'll get back to you within 24 hours." 
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({ 
        sending: false, 
        success: false, 
        message: "Something went wrong. Please try again or contact me directly via email." 
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden"
    >
      <BackgroundAurora />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_70%)] opacity-20" aria-hidden="true" />
      
      <motion.div
        className="absolute inset-0 bg-grid-slate-700/[0.03] bg-[length:60px_60px]"
        style={{ x: bgX, y: bgY }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* Header Section */}
        <HeaderSection animationProps={animationProps} />

        {/* Response Stats */}
        <ResponseStats animationProps={animationProps} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          {/* Contact Info */}
          <ContactInfo animationProps={animationProps} />

          {/* Contact Form */}
          <ContactForm
            formData={formData}
            status={status}
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
            animationProps={animationProps}
          />
        </div>

        {/* CTA Section */}
        <CTASection animationProps={animationProps} />
      </div>
    </div>
  );
}

// --- HEADER SECTION ---
const HeaderSection = ({ animationProps }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={containerVariants}
    className="text-center mb-20 max-w-4xl mx-auto"
  >
    <motion.h1
      variants={animationProps()}
      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
    >
      Get In{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500">
        Touch
      </span>
    </motion.h1>
    <motion.p
      variants={animationProps(0.1)}
      className="text-lg text-slate-300 leading-relaxed"
    >
      Have a project in mind? Let's discuss how we can bring your ideas to life. I'm always excited to work on challenging projects.
    </motion.p>
  </motion.section>
);

// --- RESPONSE STATS ---
const ResponseStats = ({ animationProps }) => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={statsRef}
      className="mb-20 max-w-6xl mx-auto"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {RESPONSE_STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={animationProps(index * 0.1)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/70 to-slate-900/50 border border-slate-700/50 rounded-lg backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300">
              <CardContent className="flex items-center gap-4 p-6">
                {stat.icon}
                <div>
                  <p className="text-2xl font-bold text-white">{stat.number}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// --- CONTACT INFO ---
const ContactInfo = ({ animationProps }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={containerVariants}
    className="space-y-8"
  >
    <motion.div variants={animationProps()}>
      <div className="flex items-center mb-6">
        <div className="h-1 w-12 rounded bg-gradient-to-r from-emerald-400 to-sky-500 mr-4" />
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-400">
          Contact Information
        </h2>
      </div>
    </motion.div>

    {/* Contact Cards */}
    <div className="space-y-6">
      <ContactInfoCard
        icon={<Mail className="w-6 h-6 text-emerald-400" />}
        title="Email"
        value={CONTACT_CONFIG.email}
        href={`mailto:${CONTACT_CONFIG.email}`}
        animationProps={animationProps}
        delay={0.1}
      />
      
      <ContactInfoCard
        icon={<Phone className="w-6 h-6 text-emerald-400" />}
        title="Phone"
        value={CONTACT_CONFIG.phone}
        href={`tel:${CONTACT_CONFIG.phone.replace(/\s|-/g, '')}`}
        animationProps={animationProps}
        delay={0.2}
      />
      
      <ContactInfoCard
        icon={<MapPin className="w-6 h-6 text-emerald-400" />}
        title="Location"
        value={CONTACT_CONFIG.location}
        animationProps={animationProps}
        delay={0.3}
      />

      <ContactInfoCard
        icon={<Globe className="w-6 h-6 text-emerald-400" />}
        title="Timezone"
        value={CONTACT_CONFIG.timezone}
        animationProps={animationProps}
        delay={0.4}
      />
    </div>

    {/* Social Links */}
    <motion.div variants={animationProps(0.5)} className="pt-8">
      <h3 className="text-xl font-bold text-white mb-6">Connect With Me</h3>
      <TooltipProvider>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
          {CONTACT_CONFIG.socials.map((social, index) => (
            <SocialLink
              key={social.name}
              social={social}
              index={index}
            />
          ))}
        </div>
      </TooltipProvider>
    </motion.div>

    {/* Availability Badge */}
    <motion.div variants={animationProps(0.6)} className="pt-6">
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 rounded-lg">
        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-emerald-300">
          Available for new projects
        </span>
      </div>
    </motion.div>
  </motion.div>
);

// --- CONTACT INFO CARD ---
const ContactInfoCard = ({ icon, title, value, href, animationProps, delay }) => (
  <motion.div variants={animationProps(delay)}>
    <Card className="bg-gradient-to-br from-slate-800/70 to-slate-900/50 border border-slate-700/50 rounded-lg backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 group">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex-shrink-0 p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl group-hover:border-emerald-500/30 transition-all duration-300">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          {href ? (
            <a
              href={href}
              className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group"
            >
              <span>{value}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ) : (
            <p className="text-slate-300">{value}</p>
          )}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// --- SOCIAL LINK ---
const SocialLink = ({ social, index }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <motion.a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit my ${social.name} profile`}
        className="group relative overflow-hidden"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <div className={`relative flex items-center justify-center gap-3 p-4 bg-gradient-to-r ${social.bgColor} rounded-xl border border-slate-700/50 hover:border-slate-600/70 shadow-lg transition-all duration-300`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
          <social.icon className={`w-6 h-6 ${social.color} ${social.hoverColor} transition-colors duration-300 relative z-10`} />
          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300 relative z-10 hidden sm:block lg:hidden xl:block">
            {social.name}
          </span>
          <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-all duration-300 relative z-10 opacity-0 group-hover:opacity-100 transform translate-x-[-5px] group-hover:translate-x-0" />
        </div>
      </motion.a>
    </TooltipTrigger>
    <TooltipContent>
      <p>Connect on {social.name}</p>
    </TooltipContent>
  </Tooltip>
);

// --- CONTACT FORM ---
const ContactForm = ({ formData, status, onSubmit, onInputChange, animationProps }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={containerVariants}
  >
    <motion.div variants={animationProps()}>
      <Card className="bg-gradient-to-br from-slate-800/70 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm shadow-2xl shadow-black/20">
        <CardContent className="p-8">
          <div className="flex items-center mb-8">
            <div className="h-1 w-12 rounded bg-gradient-to-r from-emerald-400 to-sky-500 mr-4" />
            <h2 className="text-2xl font-bold text-white">Send Message</h2>
          </div>

          <form onSubmit={onSubmit} noValidate className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div variants={animationProps(0.1)}>
                <Label htmlFor="name" className="text-slate-300 mb-2">Your Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => onInputChange('name', e.target.value)}
                  placeholder="John Doe"
                  required
                  className="bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={animationProps(0.2)}>
                <Label htmlFor="email" className="text-slate-300 mb-2">Your Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => onInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300"
                />
              </motion.div>
            </div>

            {/* Subject */}
            <motion.div variants={animationProps(0.3)}>
              <Label htmlFor="subject" className="text-slate-300 mb-2">Subject *</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => onInputChange('subject', e.target.value)}
                placeholder="Project Discussion"
                required
                className="bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300"
              />
            </motion.div>

            {/* Message */}
            <motion.div variants={animationProps(0.4)}>
              <Label htmlFor="message" className="text-slate-300 mb-2">Your Message *</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={(e) => onInputChange('message', e.target.value)}
                placeholder="Tell me about your project..."
                required
                className="bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
              />
            </motion.div>

            {/* Status Message */}
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex items-center gap-3 p-4 rounded-lg text-sm font-medium border ${
                  status.success
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}
              >
                {status.success ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                )}
                <span>{status.message}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div variants={animationProps(0.5)}>
              <Button
                type="submit"
                disabled={status.sending}
                className="w-full relative overflow-hidden group"
                size="lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-sky-600 group-hover:from-transparent group-hover:to-transparent transition-all duration-300">
                  {status.sending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="font-semibold">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="font-semibold">Send Message</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </div>
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  </motion.div>
);

// --- CTA SECTION ---
const CTASection = ({ animationProps }) => (
  <motion.section
    className="text-center max-w-4xl mx-auto"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={containerVariants}
  >
    <motion.div variants={animationProps()} className="space-y-8">
      <Card className="bg-gradient-to-br from-slate-800/70 to-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
        <CardContent className="p-12">
          <div className="space-y-6">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2">
              Quick Response Guaranteed
            </Badge>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Prefer a different approach?
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                You can also reach out to me directly via email or schedule a call to discuss your project requirements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={`mailto:${CONTACT_CONFIG.email}`}
                className="group relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-xl border border-emerald-500 hover:border-emerald-400 shadow-lg shadow-emerald-900/25 transition-all duration-300">
                  <Mail className="w-5 h-5 text-emerald-100" />
                  <span className="text-sm font-medium text-emerald-100">Email Directly</span>
                  <ExternalLink className="w-4 h-4 text-emerald-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.a>

              <motion.a
                href={`tel:${CONTACT_CONFIG.phone.replace(/\s|-/g, '')}`}
                className="group relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-700/90 to-slate-600/90 hover:from-slate-600/90 hover:to-slate-500/90 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-xl transition-all duration-300">
                  <Phone className="w-5 h-5 text-slate-300" />
                  <span className="text-sm font-medium text-slate-300">Schedule Call</span>
                  <Calendar className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  </motion.section>
);