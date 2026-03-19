import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Github, ExternalLink, ChevronLeft, ChevronRight, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import projects from '../data/projects.json';
import { pageTransition } from '../utils/animations';

const CATEGORY_COLORS = {
    web: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20',
    ai: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    hardware: 'text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20',
    mobile: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
};

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find((p) => p.id === id);
    const [activeImage, setActiveImage] = useState(0);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-slate-400">
                <p className="text-xl">Project not found.</p>
                <Link to="/" className="btn-primary">Go Home</Link>
            </div>
        );
    }

    const allImages = project.images?.length ? project.images : [project.image];
    const catClass = CATEGORY_COLORS[project.category] || 'text-slate-400 bg-slate-500/10 border-slate-500/20';

    return (
        <motion.div {...pageTransition} className="min-h-screen pt-20 pb-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-white transition-colors duration-200 mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    <span className="text-sm font-medium">Back to Projects</span>
                </button>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${catClass}`}>
                            {project.category}
                        </span>
                        {project.featured && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/15 text-primary-600 dark:text-primary-300 border border-primary-500/25">
                                Featured
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3 leading-tight">
                        {project.title}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Image Gallery */}
                <div className="mb-10 glass rounded-2xl overflow-hidden border border-white/5">
                    <div className="relative aspect-video overflow-hidden">
                        <motion.img
                            key={activeImage}
                            src={allImages[activeImage]}
                            alt={`${project.title} screenshot ${activeImage + 1}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                        {allImages.length > 1 && (
                            <>
                                <button
                                    onClick={() => setActiveImage((activeImage - 1 + allImages.length) % allImages.length)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-700 dark:text-white hover:bg-white/20 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setActiveImage((activeImage + 1) % allImages.length)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-700 dark:text-white hover:bg-white/20 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </div>
                    {/* Thumbnails */}
                    {allImages.length > 1 && (
                        <div className="flex gap-2 p-3 overflow-x-auto">
                            {allImages.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === activeImage ? 'border-primary-500' : 'border-white/5 opacity-50 hover:opacity-80'
                                        }`}
                                >
                                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
                            <Github className="w-4 h-4" />
                            View on GitHub
                        </a>
                    )}
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                        </a>
                    )}
                </div>

                {/* Long Description */}
                <div className="glass rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 mb-8">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                        Project Overview
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{project.longDescription}</p>
                </div>

                {/* Tech Stack */}
                <div className="glass rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 mb-8">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <span key={tech} className="tag text-sm py-1 px-3">{tech}</span>
                        ))}
                    </div>
                </div>

                {/* Challenges & Solutions */}
                {project.challenges?.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="glass rounded-2xl p-6 border border-red-500/20 dark:border-red-500/10 bg-gradient-to-br from-red-500/5 to-transparent">
                            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400" />
                                Challenges
                            </h2>
                            <ul className="space-y-3">
                                {project.challenges.map((c, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 dark:bg-red-500/15 text-red-600 dark:text-red-400 text-xs flex items-center justify-center font-bold mt-0.5">{i + 1}</span>
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="glass rounded-2xl p-6 border border-emerald-500/20 dark:border-emerald-500/10 bg-gradient-to-br from-emerald-500/5 to-transparent">
                            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                                Solutions
                            </h2>
                            <ul className="space-y-3">
                                {project.solutions.map((s, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-center font-bold mt-0.5">✓</span>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Back to Projects */}
                <div className="mt-16 text-center">
                    <Link to="/#projects" className="btn-outline">
                        <ArrowLeft className="w-4 h-4" />
                        All Projects
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
