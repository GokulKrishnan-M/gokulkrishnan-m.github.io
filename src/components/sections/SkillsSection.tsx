import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
	{
		title: 'Frontend',
		color: 'primary',
		skills: [
			{ name: 'HTML', level: 92 },
			{ name: 'CSS', level: 78 },
			{ name: 'JavaScript', level: 81 },
			{ name: 'Flutter', level: 84 },
			{ name: 'React.js', level: 58 },
		],
	},
	{
		title: 'Backend',
		color: 'primary', // changed from "secondary" to "primary" for blue theme
		skills: [
			{ name: 'PHP', level: 87 },
			{ name: 'Java', level: 82 },
			{ name: 'Python', level: 77 },
			{ name: 'SQL', level: 85 },
			{ name: 'MongoDB', level: 78 },
		],
	},
	{
		title: 'Tools & Others',
		color: 'accent',
		skills: [
			{ name: 'Canva', level: 90 },
			{ name: 'Adobe Tools', level: 82 },
			{ name: 'Git', level: 90 },
			{ name: 'Webflow', level: 65 },
			{ name: 'Firebase', level: 78 },
		],
	},
];

interface SkillBarProps {
	skill: { name: string; level: number };
	index: number;
	isInView: boolean;
	color: string;
}

const SkillBar = ({ skill, index, isInView, color }: SkillBarProps) => {
	const percent = skill.level / 100;
	return (
		<motion.div
			initial={{ opacity: 0, x: -50 }}
			animate={isInView ? { opacity: 1, x: 0 } : {}}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			className="mb-4"
		>
			<div className="flex justify-between items-center mb-2">
				<span className="text-sm font-medium">{skill.name}</span>
				<span className={`text-sm text-${color}`}>{skill.level}%</span>
			</div>
			<div className="h-2 bg-background-secondary rounded-full overflow-hidden">
				<motion.div
					initial={{ scaleX: 0 }}
					animate={isInView ? { scaleX: percent } : { scaleX: 0 }}
					transition={{
						duration: 1,
						delay: index * 0.1 + 0.5,
						ease: 'easeOut',
					}}
					style={{
						width: '100%',
						originX: 0,
					}}
					className={`h-full bg-gradient-${
						color === 'primary'
							? 'primary'
							: color === 'secondary'
							? 'secondary'
							: 'primary'
					} rounded-full shadow-glow`}
				/>
			</div>
		</motion.div>
	);
};

export const SkillsSection = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	return (
		<section ref={ref} className="py-20 px-6 relative">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-5xl font-bold mb-6 text-gradient-primary">
						Skills & Expertise
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						A comprehensive overview of my technical skills and proficiency levels
						across different technologies.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-8">
					{skillCategories.map((category, categoryIndex) => (
						<motion.div
							key={category.title}
							initial={{ opacity: 0, y: 50 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
							className="glass p-8 rounded-2xl hover-glow transition-all duration-300"
						>
							<h3
								className={`text-2xl font-bold mb-6 text-${category.color} text-center`}
							>
								{category.title}
							</h3>
							<div className="space-y-4">
								{category.skills.map((skill, skillIndex) => (
									<SkillBar
										key={skill.name}
										skill={skill}
										index={skillIndex}
										isInView={isInView}
										color={category.color}
									/>
								))}
							</div>
						</motion.div>
					))}
				</div>

				{/* Floating Skill Icons */}
				<div className="relative mt-16 h-32 overflow-hidden">
					{['⚛️', '💻', '🚀', '🎨', '⚡', '🔧'].map((icon, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0 }}
							animate={isInView ? { opacity: 1, scale: 1 } : {}}
							transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
							className="absolute text-4xl animate-float"
							style={{
								left: `${15 + index * 15}%`,
								top: `${Math.random() * 50}%`,
								animationDelay: `${index * 0.5}s`,
							}}
						>
							{icon}
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};