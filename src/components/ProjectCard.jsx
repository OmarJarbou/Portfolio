import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { scaleIn } from '../utils/animations';

const CATEGORY_COLORS = {
    web: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    ai: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    hardware: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    mobile: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
};

export default function ProjectCard({ project }) {
    const navigate = useNavigate();
    const catClass = CATEGORY_COLORS[project.category] || 'text-slate-400 bg-slate-500/10 border-slate-500/20';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="group relative"
        >
            <div className="card h-full flex flex-col cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
                {/* Image — clicking navigates to detail */}
                <div className="relative overflow-hidden aspect-video">
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="inline-flex items-center gap-1.5 text-white text-sm font-semibold">
                            View Project <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${catClass}`}>
                            {project.category}
                        </span>
                    </div>
                    {/* Featured badge */}
                    {project.featured && (
                        <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-300 border border-primary-500/30">
                                Featured
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors duration-200 leading-snug">
                        {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 flex-1">
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.slice(0, 4).map((tech) => (
                            <span key={tech} className="tag">
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 4 && (
                            <span className="tag">+{project.techStack.length - 4}</span>
                        )}
                    </div>

                    {/* Links — stop propagation so card click doesn't fire */}
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-white/5">
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label="GitHub repo"
                                className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
                            >
                                <Github className="w-3.5 h-3.5" />
                                GitHub
                            </a>
                        )}
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label="Live demo"
                                className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
