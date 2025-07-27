import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, X } from 'lucide-react';
import Image from 'next/image';

const projects = [
	{
		id: 1,
		title: 'MCCMS - Municipal Complaint Management System',
		description: 'Complaint reporting and managing website.',
		popupDescription:
			'A centralized web portal to report and track municipal issues. Citizens can raise complaints, monitor progress, and receive timely updates while enabling authorities to streamline response management.',
		image: '/images/COM.jpg',
		popupVideos: ['/videos/MCCMS_vid.mp4'],
		tech: ['PHP', 'HTML', 'CSS', 'Mysql'],
		liveUrl: '#',
		githubUrl: '#',
		color: 'primary',
	},
	{
		id: 2,
		title: 'PWD4U',
		description: 'Managing PWD contractor data and complaints.',
		popupDescription:
			'A Python-based application designed to automate core functions of the Public Works Department. It handles project tracking, contractor management, and public complaints efficiently. By reducing manual tasks and improving transparency, the system ensures faster execution of infrastructure projects and better public service delivery.',
		image: '/images/CMS.webp',
		popupVideos: ['/videos/PWD_vid.mp4'],
		tech: ['Python', 'HTML', 'Javascript', 'CSS', 'Mysql'],
		liveUrl: '#',
		githubUrl: '#',
		color: 'secondary',
	},
	{
		id: 3,
		title: 'Rhythm Music Player App',
		description: 'Mobile app for smooth music playback and playlists.',
		popupDescription:
			'A Flutter-based mobile application designed to provide a smooth and responsive audio playback experience. It supports key features such as play, pause, skip and playlist creation. With an intuitive user interface and fast performance across platforms.',
		image: '/images/music.jpg',
		popupimage: ['/images/Muz.jpg'],
		tech: ['Flutter', 'Dart', 'Javascript', 'C/C++'],
		liveUrl: '#',
		githubUrl: '#',
		color: 'accent',
	},
];

interface ProjectCardProps {
	project: typeof projects[0];
	index: number;
	isInView: boolean;
	onOpen: (project: typeof projects[0]) => void;
}

const ProjectCard = ({ project, index, isInView, onOpen }: ProjectCardProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 50, rotateX: 10 }}
			animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
			transition={{ duration: 0.8, delay: index * 0.2 }}
			className="group relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="glass rounded-2xl overflow-hidden hover-glow transition-all duration-500 transform hover:scale-105">
				<div className="relative h-72 md:h-80 lg:h-96 bg-background-secondary overflow-hidden">
					<motion.img
						src={project.image}
						alt={project.title}
						className="object-cover w-full h-full"
						animate={{ scale: isHovered ? 1.1 : 1 }}
						transition={{ duration: 0.4 }}
					/>

					<div className="absolute inset-0 p-4 flex flex-col justify-end bg-black/50 text-white">
						<h3 className="text-lg font-semibold mb-1">{project.title}</h3>
						<p className="text-xs mb-2">{project.description}</p>
						<Button
							size="sm"
							className="w-fit bg-gradient-primary text-white mt-2 hover:scale-105 transition-all duration-300"
							onClick={() => onOpen(project)}
						>
							<ExternalLink className="w-4 h-4 mr-2" />
						</Button>
					</div>
				</div>

				<div className="p-6">
					<div className="flex gap-3"></div>
				</div>
			</div>
		</motion.div>
	);
};

const ProjectPopup = ({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) => {
	useEffect(() => {
		// Spacebar play/pause for PWD4U and MCCMS
		if (project.title === 'PWD4U' || project.title === 'MCCMS - Municipal Complaint Management System') {
			const handleSpace = (e: KeyboardEvent) => {
				if (e.code === 'Space') {
					e.preventDefault();
					const video = document.querySelector('.project-popup-video') as HTMLVideoElement | null;
					if (video) {
						if (video.paused) video.play();
						else video.pause();
					}
				}
			};
			window.addEventListener('keydown', handleSpace);
			return () => window.removeEventListener('keydown', handleSpace);
		}
	}, [project]);

	// Escape closes any project popup
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [onClose]);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
			>
				<motion.div
					initial={{ scale: 0.8, y: 30 }}
					animate={{ scale: 1, y: 0 }}
					exit={{ scale: 0.8, y: 30 }}
					className="bg-zinc-900 text-white rounded-xl shadow-lg max-w-2xl w-full overflow-hidden"
				>
					<div className="flex justify-between items-center p-4 border-b border-white/10">
						<h2 className="text-xl font-bold">{project.title}</h2>
						<button onClick={onClose}>
							<X className="w-6 h-6" />
						</button>
					</div>
					<div className="p-4">
						<div className="grid gap-4 mb-4">
							{/* Show video for all except Music Player App, show image for Music Player App */}
							{project.title === 'Rhythm Music Player App' && project.popupimage ? (
								<img
									src={project.popupimage[0]}
									alt="Rhythm Music Player App"
									className="rounded-lg w-full object-cover"
								/>
							) : (
								project.popupVideos &&
								project.popupVideos.map((video, i) => (
									<video
										key={i}
										controls
										className="rounded-lg w-full object-cover project-popup-video"
									>
										<source src={video} type="video/mp4" />
										Your browser does not support the video tag.
									</video>
								))
							)}
						</div>
						<p className="mb-4 text-sm text-gray-300">{project.popupDescription}</p>
						<div className="flex flex-wrap gap-2">
							{project.tech.map((tech, idx) => (
								<span
									key={idx}
									className={`text-xs px-3 py-1 rounded-full bg-${project.color}/10 text-${project.color} border border-${project.color}/20`}
								>
									{tech}
								</span>
							))}
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export const ProjectsSection = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });
	const [popupProject, setPopupProject] = useState<null | typeof projects[0]>(null);
	const [showAllProjects, setShowAllProjects] = useState(false);

	// Fullscreen detection
	const [isFullscreen, setIsFullscreen] = useState(false);

	useEffect(() => {
		const handleFullscreenChange = () => {
			const fsElement =
				document.fullscreenElement ||
				// @ts-ignore
				document.webkitFullscreenElement ||
				// @ts-ignore
				document.mozFullScreenElement ||
				// @ts-ignore
				document.msFullscreenElement;
			setIsFullscreen(!!fsElement);
		};

		document.addEventListener('fullscreenchange', handleFullscreenChange);
		document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
		document.addEventListener('mozfullscreenchange', handleFullscreenChange);
		document.addEventListener('MSFullscreenChange', handleFullscreenChange);

		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
			document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
			document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
			document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
		};
	}, []);

	// Add this useEffect to close "View All Projects" modal with Escape
	useEffect(() => {
		if (!showAllProjects) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setShowAllProjects(false);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [showAllProjects]);

	// Add this useEffect after your showAllProjects useEffect:
	useEffect(() => {
		if (!showAllProjects) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			const container = document.getElementById('all-projects-scroll');
			if (!container) return;
			if (e.key === 'ArrowDown') {
				container.scrollBy({ top: 100, behavior: 'smooth' });
			} else if (e.key === 'ArrowUp') {
				container.scrollBy({ top: -100, behavior: 'smooth' });
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [showAllProjects]);

	// Ensure the scrollable container does not scroll outside the modal when using arrow keys
	useEffect(() => {
		if (!showAllProjects) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			const container = document.getElementById('all-projects-scroll');
			if (!container) return;
			if (e.key === 'ArrowDown') {
				// Prevent page scroll
				e.preventDefault();
				container.scrollBy({ top: 100, behavior: 'smooth' });
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				container.scrollBy({ top: -100, behavior: 'smooth' });
			}
		};
		window.addEventListener('keydown', handleKeyDown, { passive: false });
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [showAllProjects]);

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
						Featured Projects
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						A showcase of my recent work, featuring modern web applications built with
						cutting-edge technologies.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project, index) => (
						<div
							key={project.id}
							className={`glass p-4 rounded-lg flex flex-col gap-2 bg-[#181826] border border-white/10 ${
								project.title === 'PWD4U' || project.title === 'Music Player App' ? 'justify-between h-full' : ''
							}`}
							style={project.title === 'PWD4U' || project.title === 'Music Player App' ? { minHeight: '340px' } : {}}
						>
							<img
								src={project.image}
								alt={project.title}
								className="rounded-lg h-32 object-cover mb-2"
							/>
							{/* Description and label outside the image */}
							<div>
								<h4 className="font-semibold text-lg">{project.title}</h4>
								<p className="text-sm text-gray-300 mt-2">{project.description}</p>
								<span className="inline-block mt-1 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
									{project.title === 'Rhythm Music Player App' ? 'Application' : 'WEB Design'}
								</span>
								{/* Single tech tag for each card */}
								<div className="mt-2">
									<span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
										{project.tech[0]}
									</span>
								</div>
							</div>
							{/* Popup button */}
							{project.title === 'Rhythm Music Player App' ? (
								<div className="mt-auto flex justify-start">
									<Button
										size="sm"
										className="w-fit rounded bg-[#141a2a] text-white mt-2 hover:bg-[#223a5f] transition-all duration-300 self-start border border-[#60a5fa]"
										onClick={() => setPopupProject(project)}
									>
										<ExternalLink className="w-4 h-4 mr-2" style={{ color: '#60a5fa' }} />
									</Button>
								</div>
							) : (
								<Button
									size="sm"
									className={`w-fit rounded bg-[#141a2a] text-white mt-2 hover:bg-[#223a5f] transition-all duration-300 self-start border border-[#60a5fa]
          ${project.title === 'PWD4U' || project.title === 'Music Player App' ? 'mt-auto' : ''}`}
									onClick={() => setPopupProject(project)}
								>
									<ExternalLink className="w-4 h-4 mr-2" style={{ color: '#60a5fa' }} />
								</Button>
							)}
						</div>
					))}
				</div>

				{popupProject && (
					<ProjectPopup project={popupProject} onClose={() => setPopupProject(null)} />
				)}

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8, delay: 0.8 }}
					className="text-center mt-12"
				>
					<Button
						size="lg"
						variant="outline"
						className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground hover:scale-105 transition-all duration-300 px-8 py-4"
						onClick={() => setShowAllProjects(true)}
					>
						View All Projects
					</Button>
				</motion.div>

				{/* New Interface: All Projects Modal */}
				{showAllProjects && (
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-[#0a0a23] bg-opacity-95 z-50 flex items-center justify-center"
						>
							<motion.div
								initial={{ scale: 0.9, y: 40 }}
								animate={{ scale: 1, y: 0 }}
								exit={{ scale: 0.9, y: 40 }}
								className="bg-gradient-to-br from-[#0a0a23] via-[#181826] to-[#23233b] text-white rounded-xl shadow-2xl max-w-4xl w-full p-8 relative border border-white/10"
							>
								<button
									className="absolute top-4 right-4 text-xl"
									onClick={() => setShowAllProjects(false)}
								>
									<X className="w-6 h-6" />
								</button>
								{/* Back Button */}
								<button
									className="absolute top-4 left-4 text-md px-4 py-2 rounded transition
      bg-[#181826] text-white
      hover:bg-[#23233b]"
									onClick={() => setShowAllProjects(false)}
								>
									← Back
								</button>
								<h3 className="text-2xl font-bold mb-6 text-center text-primary">
									All Projects
								</h3>
								{/* Scroll buttons are now outside the scrollable grid */}
								<div className="flex justify-center gap-4 mb-6">
									<button
										className="p-2 rounded-full bg-[#23233b] hover:bg-primary/80 transition text-white"
										onClick={() => {
											const container = document.getElementById('all-projects-scroll');
											if (container) container.scrollBy({ top: -300, behavior: 'smooth' });
										}}
										aria-label="Scroll Up"
									>
										↑
									</button>
									<button
										className="p-2 rounded-full bg-[#23233b] hover:bg-primary/80 transition text-white"
										onClick={() => {
											const container = document.getElementById('all-projects-scroll');
											if (container) container.scrollBy({ top: 300, behavior: 'smooth' });
										}}
										aria-label="Scroll Down"
									>
										↓
									</button>
								</div>
								<div
									id="all-projects-scroll"
									className="grid md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto scroll-smooth"
								>
									{projects.map((project) => (
										<div
											key={project.id}
											className="glass p-4 rounded-lg flex flex-col gap-2 bg-[#181826] border border-white/10"
										>
											<img
												src={project.image}
												alt={project.title}
												className="rounded-lg h-32 object-cover mb-2"
											/>
											<div>
												<h4 className="font-semibold text-lg">{project.title}</h4>
												<p className="text-sm text-gray-300">
													{project.description}
												</p>
											</div>
											<div className="flex gap-2 mt-2">
												{project.tech.map((tech, idx) => (
													<span
														key={idx}
														className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
													>
														{tech}
													</span>
												))}
											</div>
										</div>
									))}
									{/* Extra Card 1 */}
									<div className="glass p-4 rounded-lg flex flex-col gap-2 bg-[#181826] border border-white/10">
										<img
											src="/images/cloth.jpg"
											alt=""
											className="rounded-lg h-32 object-cover mb-2"
										/>
										<div>
											<h4 className="font-semibold text-lg">Online Clothing Store</h4>
											<p className="text-sm text-gray-300">
												Online website for purchasing clothing items.
											</p>
										</div>
										<div className="flex gap-2 mt-2">
											<span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
												PHP
											</span>
											<span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
												HTML
											</span>
                      <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
												CSS
											</span>
                      	<span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
												Mysql
											</span>
										</div>
									</div>
									{/* Extra Card 2 */}
									<div className="glass p-4 rounded-lg flex flex-col gap-2 bg-[#181826] border border-white/10">
										<img
											src="/images/art.jpg"
											alt=""
											className="rounded-lg h-32 object-cover mb-2"
										/>
										<div>
											<h4 className="font-semibold text-lg">Art gallery</h4>
											<p className="text-sm text-gray-300">
												A website to showcase and sell artwork.
											</p>
										</div>
										<div className="flex gap-2 mt-2">
											<span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
												PHP
											</span>
											<span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
												HTML
                        </span>
                      <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
												CSS
											</span>
                      		<span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
												Mysql
											</span>
										</div>
									</div>
								</div>
							</motion.div>
						</motion.div>
					</AnimatePresence>
				)}
			</div>
		</section>
	);
};
