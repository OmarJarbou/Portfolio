import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import SectionWrapper, { AnimatedDiv } from '../components/SectionWrapper';
import { fadeInUp } from '../utils/animations';
import projects from '../data/projects.json';

const CATEGORIES = ['All', 'Web', 'AI', 'Hardware', 'Mobile'];
const PROJECTS_PER_PAGE = 6;

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter projects based on category and search
    const filtered = useMemo(() => {
        const query = search.toLowerCase().trim();
        return projects.filter((p) => {
            const matchCat =
                activeCategory === 'All' ||
                p.category.toLowerCase() === activeCategory.toLowerCase();
            const matchSearch =
                !query ||
                p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.techStack.some((t) => t.toLowerCase().includes(query));
            return matchCat && matchSearch;
        });
    }, [activeCategory, search]);

    // Reset pagination when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, search]);

    // Pagination logic
    const totalPages = Math.ceil(filtered.length / PROJECTS_PER_PAGE);
    const paginatedProjects = useMemo(() => {
        const start = (currentPage - 1) * PROJECTS_PER_PAGE;
        return filtered.slice(start, start + PROJECTS_PER_PAGE);
    }, [filtered, currentPage]);

    const scrollToProjects = () => {
        const element = document.getElementById('projects');
        if (element) {
            const offset = 10;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const lastPageRef = useRef(currentPage);
    // Scroll to projects when page changes
    useEffect(() => {
        if (lastPageRef.current !== currentPage) {
            scrollToProjects();
            lastPageRef.current = currentPage;
        }
    }, [currentPage]);

    return (
        <SectionWrapper id="projects" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
            {/* Header */}
            <AnimatedDiv className="text-center mb-12">
                <motion.div variants={fadeInUp}>
                    <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase">Portfolio</span>
                    <h2 className="section-title mt-2">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="section-subtitle max-w-xl mx-auto">
                        Real-world products spanning web, AI, and hardware engineering.
                    </p>
                </motion.div>
            </AnimatedDiv>

            {/* Filter + Search Row */}
            <AnimatedDiv variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
                {/* Category Pills */}
                <LayoutGroup>
                    <div className="flex items-center gap-1.5 p-1 glass rounded-xl flex-wrap justify-center">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                id={`filter-${cat.toLowerCase()}`}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${activeCategory === cat
                                    ? 'text-white'
                                    : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeCategoryBg"
                                        className="absolute inset-0 bg-primary-600 rounded-lg"
                                        style={{ zIndex: -1 }}
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                                    />
                                )}
                                {cat}
                            </button>
                        ))}
                    </div>
                </LayoutGroup>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-10 py-2 rounded-xl glass text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    )}
                </div>
            </AnimatedDiv>

            {/* Project Grid */}
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedProjects.length > 0 ? (
                        paginatedProjects.map((project) => (
                            <ProjectCard key={`${project.id}-${currentPage}`} project={project} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-slate-500">
                            <p className="text-lg font-medium">No projects match your filter.</p>
                            <button
                                onClick={() => { setActiveCategory('All'); setSearch(''); }}
                                className="mt-4 text-primary-600 dark:text-primary-400 hover:underline text-sm font-semibold transition-all"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2 mt-12"
                >
                    <button
                        onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); }}
                        disabled={currentPage === 1}
                        className="p-2 rounded-xl glass disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-300" />
                    </button>

                    <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { setCurrentPage(i + 1); }}
                                className={`w-10 h-10 rounded-xl font-medium transition-all duration-200 ${currentPage === i + 1
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                    : 'glass text-slate-400 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); }}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-xl glass disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                    </button>
                </motion.div>
            )}
        </SectionWrapper>
    );
}
