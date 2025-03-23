import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import constant from "../../public/projects.json";
import ModalProject from "@/components/ModalPage";
import MarkdownContent from "@/components/MarkdownContent";

function Projects() {
	const projectsData = constant.projects;

	return (
		<div className="projects" id="projects">
			<motion.div
				className="title"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				variants={{
					visible: { opacity: 1, y: -100 },
					hidden: { opacity: 0, y: 0 },
				}}
			>
				<h2>SELECTED PROJECTS</h2>
			</motion.div>

			<div className="projects-container">
				{projectsData.map(
					({ image, title, link, skills, md, github, desc }) => {
						return (
							<motion.div
								className="project"
								key={title}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
								variants={{
									visible: { opacity: 1, y: -50 },
									hidden: { opacity: 0, y: 0 },
								}}
							>
								<div className="project-image">
									<div className="project-image-overlay"></div>
									<div className="project-image-container">
										<Image src={image} fill alt={title} quality={100} />
									</div>
								</div>

								<div className="project-info">
									<p className="project-info-overline"></p>
									<h3 className="project-info-title">{title}</h3>
									<div className="project-info-description">
										<p>{desc}</p>
									</div>
									<ul className="project-info-tech-list">
										{skills.map((skill) => (
											<li className="project-info-tech-list-item" key={skill}>
												{skill}
											</li>
										))}
									</ul>
									<ul className="project-info-links">
										<li className="project-info-links-item">
											<Link
												href={github}
												className="project-info-links-item-link"
											>
												<FiGithub />
											</Link>
										</li>
										<li className="project-info-links-item">
											<Link
												href={link}
												className="project-info-links-item-link"
											>
												<FiExternalLink />
											</Link>
										</li>
									</ul>
									<ModalProject>
										<MarkdownContent url={md} />
									</ModalProject>
								</div>
							</motion.div>
						);
					},
				)}
			</div>
		</div>
	);
}

export default Projects;
