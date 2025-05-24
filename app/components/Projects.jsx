"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Eye, Github, ExternalLink, Code, Sparkles, ArrowUpRight, ChevronDown } from "lucide-react";

const PROJECTS = [
	{
		id: 1,
		title: "Online Food Delivery Page",
		description:
			"Responsive food delivery website with user-friendly interface, real-time order tracking, and secure payment integration.",
		image: "/Delevry.png",
		link: "https://food-delivery-page-sandy.vercel.app/",
		github: "https://github.com/AYOU-pixel/Food-Delivery-Page",
		tech: ["Next.js", "TailwindCSS", "Stripe", "Vite"],
		featured: true,
	},
	{
		id: 2,
		title: "Sneaker Store",
		description:
			"Sleek e-commerce website for sneakers with smooth shopping experience, product filtering, and wishlist functionality.",
		image: "/eco.png",
		link: "https://ecomerc-wm.vercel.app/",
		github: "https://github.com/AYOU-pixel/ecomerc_wm",
		tech: ["React", "Redux", "Node.js"],
	},
	{
		id: 3,
		title: "Weather App",
		description:
			"Real-time weather application with location detection, 5-day forecast, and interactive weather maps using OpenWeather API.",
		image: "/weather.png",
		link: "https://weather-app-navy-sigma-78.vercel.app/",
		github: "https://github.com/AYOU-pixel/Weather-App",
		tech: ["React", "Next.js", "Weather API"],
	},
	{
		id: 4,
		title: "Coffee Bliss - Modern Café Website",
		description:
			"A professional and elegant café website designed for modern coffee shops. Features responsive layout, menu display.",
		image: "/Cafe.png",
		link: "https://cafe-web-six.vercel.app/",
		github: "https://github.com/AYOU-pixel/Cafe-web",
		tech: ["Next.js", "Vite", "TailwindCSS"],
	},
	{
		id: 5,
		title: "Apple Landing Page",
		description:
			"Modern product showcase page with sleek animations, product carousel, and responsive design for all devices.",
		image: "/Applepage.png",
		link: "https://apple-page-dusky.vercel.app/",
		github: "https://github.com/AYOU-pixel/Apple-page",
		tech: ["Framer Motion", "Next.js", "Vite"],
	},
	{
		id: 6,
		title: "Food Delivery Landing Page",
		description:
			"A modern food delivery landing page with responsive design, smooth animations, restaurant showcase, and intuitive UI for seamless ordering experience on all devices.",
		image: "/landingDelevry.png",
		link: "https://delivery-page-black.vercel.app/",
		github: "https://github.com/AYOU-pixel/Delivery-Page",
		tech: ["Next.js", "TailwindCSS", "Stripe", "Vite"],
	},
];

export default function ProjectsSection() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({ target: ref });
	const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
	const [isMounted, setIsMounted] = useState(false);
	const [hoveredProject, setHoveredProject] = useState(null);
	const [showAll, setShowAll] = useState(false);

	const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
	const [reduceMotionPref, setReduceMotionPref] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduceMotionPref(mediaQuery.matches);
		const handler = (e) => setReduceMotionPref(e.matches);
		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}, []);

	useEffect(() => {
		if (!isMounted) setIsMounted(true);
	}, [isMounted]);

	const displayedProjects = useMemo(
		() => (showAll ? PROJECTS : PROJECTS.slice(0, 6)),
		[showAll]
	);

	const floatingAnimation = useMemo(
		() =>
			isMobile || reduceMotionPref
				? {}
				: {
						y: [0, -10, 0],
						transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
				  },
		[isMobile, reduceMotionPref]
	);

	const handleViewMore = () => {
		setShowAll(!showAll);
	};

	if (!isMounted) return null;

	return (
		<section
			ref={ref}
			id="projects"
			className="relative min-h-screen py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden"
			role="main"
			aria-label="Projects Portfolio Section"
		>
			{/* Enhanced Background Elements - Matching Hero Section */}
			{!isMobile && !reduceMotionPref && (
				<>
					<motion.div
						className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[length:50px_50px]"
						style={{ x }}
						aria-hidden="true"
					/>
					<motion.div
						className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl"
						animate={{
							scale: [1, 1.2, 1],
							opacity: [0.3, 0.5, 0.3],
						}}
						transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
					/>
					<motion.div
						className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-500/10 to-purple-600/10 rounded-full blur-3xl"
						animate={{
							scale: [1, 1.15, 1],
							opacity: [0.3, 0.4, 0.3],
						}}
						transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
					/>
					<motion.div
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-2xl"
						animate={floatingAnimation}
					/>
				</>
			)}

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<motion.h2
						className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						Featured{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
							Projects
						</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-8"
					>
						A collection of impactful projects that solve real-world problems with modern web technologies,
						showcasing my expertise in creating scalable and user-friendly applications.
					</motion.p>

					{/* Stats Row */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
						className="flex flex-wrap gap-8 justify-center mb-12"
					>
						{[
							{ number: "20+", label: "Projects Completed" },
							{ number: "95%", label: "Client Satisfaction" },
							{ number: "50K+", label: "Lines of Code" },
						].map((stat, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.7 + index * 0.1 }}
								className="text-center"
							>
								<div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
									{stat.number}
								</div>
								<div className="text-sm text-slate-400 mt-1">{stat.label}</div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>

				{/* Projects Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					{displayedProjects.map((project, index) => (
						<ProjectCard
							key={project.id}
							project={project}
							index={index}
							hoveredProject={hoveredProject}
							setHoveredProject={setHoveredProject}
							isMobile={isMobile}
							reduceMotionPref={reduceMotionPref}
						/>
					))}
				</div>

				{/* View More Section */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
					className="text-center"
				>
					<motion.button
						onClick={handleViewMore}
						className="group flex items-center justify-center gap-3 px-8 py-4 mx-auto border-2 border-cyan-500 rounded-full text-cyan-500 font-semibold text-lg hover:bg-cyan-500 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
						whileHover={{
							scale: 1.05,
							boxShadow: "0 12px 24px rgba(6, 182, 212, 0.4)",
						}}
						whileTap={{ scale: 0.95 }}
					>
						<span className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
						<Eye className="w-5 h-5" />
						<span>{showAll ? "Show Less" : "View All Projects"}</span>
						<ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
					</motion.button>
				</motion.div>

				{/* Scroll Indicator */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.2 }}
					className="flex flex-col items-center mt-16"
				>
					<motion.p
						className="text-sm text-slate-500 mb-3"
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ repeat: Infinity, duration: 2 }}
					>
						Explore more sections
					</motion.p>
					<motion.button
						onClick={() => {
							const aboutSection = document.getElementById("about"); // Ensure the About section has this ID
							if (aboutSection) {
								aboutSection.scrollIntoView({ behavior: "smooth" });
							}
						}}
						animate={{
							y: [0, 8, 0],
							opacity: [0.7, 1, 0.7],
						}}
						transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
						className="p-2 rounded-full border border-slate-700/50 hover:border-cyan-400/50 transition-colors duration-300"
					>
						<ChevronDown className="w-6 h-6 text-cyan-400" />
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
}

const ProjectCard = ({
	project,
	index,
	hoveredProject,
	setHoveredProject,
	isMobile,
	reduceMotionPref,
}) => {
	const [imageError, setImageError] = useState(false);

	const cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				delay: index * 0.1,
				ease: "easeOut",
			},
		},
	};

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<motion.div
			variants={cardVariants}
			initial="hidden"
			animate="visible"
			className="group relative"
			onHoverStart={() => setHoveredProject(project.id)}
			onHoverEnd={() => setHoveredProject(null)}
		>
			{/* Card Container with Glassmorphism */}
			<div className="relative h-full bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
				{/* Floating Icons - Matching Hero Section */}
				{!isMobile && !reduceMotionPref && hoveredProject === project.id && (
					<>
						<motion.div
							className="absolute top-4 right-4 p-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg z-10"
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							transition={{ delay: 0.1 }}
						>
							<Code className="w-4 h-4 text-cyan-400" />
						</motion.div>
						<motion.div
							className="absolute top-4 left-4 p-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg z-10"
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							transition={{ delay: 0.2 }}
						>
							<Sparkles className="w-4 h-4 text-blue-400" />
						</motion.div>
					</>
				)}

				{/* Image Container */}
				<div className="relative h-48 sm:h-56 overflow-hidden">
					{!imageError ? (
						<motion.img
							src={project.image}
							alt={`${project.title} project screenshot`}
							className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
							onError={handleImageError}
							loading="lazy"
						/>
					) : (
						<div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
							<div className="text-slate-400 text-center">
								<Code className="w-12 h-12 mx-auto mb-2" />
								<p className="text-sm">{project.title}</p>
							</div>
						</div>
					)}

					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				</div>

				{/* Content */}
				<div className="p-6 space-y-4">
					{/* Title */}
					<motion.h3
						className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300"
						layoutId={`title-${project.id}`}
					>
						{project.title}
					</motion.h3>

					{/* Description */}
					<p className="text-slate-400 leading-relaxed text-sm line-clamp-3 group-hover:text-slate-300 transition-colors duration-300">
						{project.description}
					</p>

					{/* Tech Stack */}
					<div className="flex flex-wrap gap-2">
						{project.tech.map((tech, techIndex) => (
							<motion.span
								key={tech}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.1 * techIndex }}
								className="px-3 py-1 text-xs font-medium bg-slate-800/50 border border-slate-700/30 text-cyan-400 rounded-full hover:border-cyan-400/50 transition-colors duration-300"
							>
								{tech}
							</motion.span>
						))}
					</div>

					{/* Action Buttons */}
					<div className="flex gap-3 pt-4">
						<motion.a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex-1 justify-center"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<Eye className="w-4 h-4" />
							<span>Live Demo</span>
						</motion.a>

						{project.github && (
							<motion.a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-4 py-2 border border-slate-600 rounded-lg text-slate-300 font-medium text-sm hover:border-slate-500 hover:bg-slate-800/50 transition-all duration-300 flex-1 justify-center"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Github className="w-4 h-4" />
								<span>Code</span>
							</motion.a>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

<section id="about" className="min-h-screen py-20 bg-slate-900">
  {/* About section content */}
</section>