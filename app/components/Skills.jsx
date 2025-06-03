"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaFigma } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript, SiMongodb, SiExpress, SiGraphql, SiFirebase } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const skills = [
	{
		category: "Frontend",
		items: [
			{ name: "React", icon: <FaReact className="w-6 h-6 text-sky-500" />, level: 90 },
			{ name: "Next.js", icon: <SiNextdotjs className="w-6 h-6 text-black dark:text-white" />, level: 85 },
			{ name: "TypeScript", icon: <SiTypescript className="w-6 h-6 text-blue-600" />, level: 80 },
			{ name: "JavaScript", icon: <SiJavascript className="w-6 h-6 text-yellow-400" />, level: 90 },
			{ name: "Tailwind", icon: <SiTailwindcss className="w-6 h-6 text-cyan-400" />, level: 95 },
			{ name: "React Native", icon: <TbBrandReactNative className="w-6 h-6 text-sky-600" />, level: 75 },
		]
	},
	{
		category: "Backend",
		items: [
			{ name: "Node.js", icon: <FaNodeJs className="w-6 h-6 text-green-500" />, level: 85 },
			{ name: "Express", icon: <SiExpress className="w-6 h-6 text-gray-400" />, level: 80 },
			{ name: "MongoDB", icon: <SiMongodb className="w-6 h-6 text-green-600" />, level: 75 },
			{ name: "GraphQL", icon: <SiGraphql className="w-6 h-6 text-pink-600" />, level: 70 },
			{ name: "Firebase", icon: <SiFirebase className="w-6 h-6 text-amber-500" />, level: 75 },
		]
	},
	{
		category: "Tools",
		items: [
			{ name: "Git", icon: <FaGitAlt className="w-6 h-6 text-orange-600" />, level: 85 },
			{ name: "Figma", icon: <FaFigma className="w-6 h-6 text-purple-500" />, level: 80 },
		]
	}
];

const SkillBar = ({ level }) => {
	return (
		<div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
			<motion.div
				initial={{ width: 0 }}
				whileInView={{ width: `${level}%` }}
				viewport={{ once: true }}
				transition={{ duration: 1, ease: "easeOut" }}
				className={`h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full`}
			/>
		</div>
	);
};

export default function SkillsSection() {
	return (
		<section id="skills" className="relative py-20 bg-slate-900 overflow-hidden">
			<div className="absolute inset-0 bg-grid-slate-800/[0.05] bg-[length:60px_60px]" aria-hidden="true" />
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
						My <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">Skills</span>
					</h2>
					<p className="text-lg text-slate-400 max-w-2xl mx-auto">
						Technologies I've worked with and my proficiency level in each
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{skills.map((category, catIndex) => (
						<motion.div
							key={category.category}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: catIndex * 0.1 }}
							className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 hover:border-sky-500/50 transition-all duration-300"
						>
							<h3 className="text-xl font-bold text-white mb-6 flex items-center">
								<span className="w-3 h-3 rounded-full bg-sky-500 mr-3"></span>
								{category.category}
							</h3>
							<div className="space-y-6">
								{category.items.map((skill, skillIndex) => (
									<motion.div
										key={skill.name}
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.6, delay: catIndex * 0.1 + skillIndex * 0.05 }}
										className="space-y-2"
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<div className="p-2 rounded-lg bg-slate-700/50">
													{skill.icon}
												</div>
												<span className="font-medium text-slate-300">{skill.name}</span>
											</div>
											<span className="text-sm text-slate-400">{skill.level}%</span>
										</div>
										<SkillBar level={skill.level} />
									</motion.div>
								))}
							</div>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="mt-16 text-center"
				>
					<h3 className="text-lg font-semibold text-slate-400 mb-4">And also experienced with</h3>
					<div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
						{['Redux', 'Jest', 'Cypress', 'Docker', 'AWS', 'PostgreSQL', 'SASS', 'Styled Components', 'Three.js'].map((tech, index) => (
							<span
								key={tech}
								className="px-4 py-2 bg-slate-800/50 border border-slate-700/30 rounded-full text-sm text-slate-300 hover:bg-sky-500/10 hover:border-sky-500/50 hover:text-sky-400 transition-all duration-300"
							>
								{tech}
							</span>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}