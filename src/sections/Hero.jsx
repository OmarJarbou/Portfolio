import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Github, Download, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import personal from '../data/personal.json';
import { fadeInUp, staggerContainer, scaleIn } from '../utils/animations';

const FloatingOrb = ({ className }) => (
    <div className={`absolute rounded-full blur-3xl opacity-20 animate-pulse-slow pointer-events-none ${className}`} />
);

const HeroVisual = () => {
    return (
        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-3xl" />

            {/* Pulsing Outer Ring */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-2 border-dashed border-primary-500/20"
            />

            {/* Rotating Decorative Rings */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-primary-500/10"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-accent-500/10"
            />

            {/* Main Image Container */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-4/5 h-4/5 rounded-full p-2 glass border-2 border-primary-500/30 shadow-2xl overflow-hidden"
            >
                <div className="w-full h-full rounded-full overflow-hidden relative group">
                    <img
                        src={personal.imageUrl}
                        alt={personal.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-14 right-0 glass px-4 py-2 rounded-xl border border-primary-500/30 shadow-xl z-20"
            >
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tighter">{personal.tags[0]}</span>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 -left-5 glass px-4 py-2 rounded-xl border border-accent-500/30 shadow-xl z-20"
            >
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent-500 dark:text-accent-400" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tighter">{personal.tags[1]}</span>
                </div>
            </motion.div>

            {/* Decorative Tech Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        x: [0, Math.random() * 40 - 20, 0],
                        y: [0, Math.random() * 40 - 20, 0],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                    }}
                    className="absolute w-1.5 h-1.5 rounded-full bg-primary-400/30 blur-[1px]"
                    style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                    }}
                />
            ))}
        </div>
    );
};

export default function Hero() {
    const [showScrollHint, setShowScrollHint] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollHint(window.scrollY < window.innerHeight * 0.8);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg">
            {/* Floating orbs */}
            <FloatingOrb className="w-96 h-96 bg-primary-500 -top-20 -left-20" />
            <FloatingOrb className="w-80 h-80 bg-accent-500 top-1/3 right-0" />
            <FloatingOrb className="w-64 h-64 bg-primary-700 bottom-0 left-1/3" />

            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Text Column */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 order-2 lg:order-1"
                    >
                        {/* Badge */}
                        <motion.div variants={scaleIn}>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/30 text-sm font-medium text-primary-600 dark:text-primary-300">
                                <Sparkles className="w-3.5 h-3.5" />
                                Available for Work
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.08] tracking-tight text-balance">
                            Hi, I'm{' '}
                            <span className="gradient-text">{personal.name}</span>
                        </motion.h1>

                        {/* Title */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl sm:text-2xl font-semibold text-slate-600 dark:text-slate-300"
                        >
                            {personal.subtitle}
                        </motion.p>

                        {/* Tagline */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl lg:max-w-none leading-relaxed text-balance"
                        >
                            {personal.tagline}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                            <button
                                onClick={() => scrollTo('projects')}
                                className="btn-primary text-base"
                            >
                                View Projects <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => scrollTo('contact')}
                                className="btn-outline text-base"
                            >
                                <Mail className="w-4 h-4" />
                                Contact Me
                            </button>
                            <a
                                href={personal.cvUrl}
                                download
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 font-semibold transition-all duration-300 hover:-translate-y-0.5 text-base"
                            >
                                <Download className="w-4 h-4" />
                                Download CV
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-2">
                            <a
                                href={personal.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-white transition-colors duration-200"
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                            </a>
                            <span className="w-px h-4 bg-slate-300 dark:bg-white/10" />
                            <span className="text-sm text-slate-500 dark:text-slate-400">{personal.location}</span>
                        </motion.div>
                    </motion.div>

                    {/* Image Column */}
                    <div className="flex justify-center items-center order-1 lg:order-2">
                        <HeroVisual />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showScrollHint && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                            opacity: [0, 0.4, 1, 0.4, 0],
                            x: 0
                        }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{
                            opacity: { repeat: Infinity, duration: 4, times: [0, 0.25, 0.5, 0.75, 1] },
                            x: { duration: 1 }
                        }}
                        style={{
                            position: 'fixed',
                            left: '2rem',
                            bottom: '15%',
                            zIndex: 40,
                        }}
                        className="hidden md:flex flex-col items-center gap-6"
                    >
                        <div className="h-24 w-px bg-gradient-to-t from-primary-500 to-transparent" />
                        <motion.button
                            onClick={() => scrollTo('projects')}
                            className="group flex flex-col items-center gap-4 cursor-pointer focus:outline-none"
                        >
                            <span
                                className="text-[10px] text-slate-600 dark:text-slate-400 font-black tracking-[0.4em] uppercase transition-all group-hover:text-primary-500 group-hover:tracking-[0.6em]"
                                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                            >
                                Explore
                            </span>
                            <div className="w-6 h-10 rounded-full border-2 border-slate-500/30 flex justify-center p-1.5 transition-colors group-hover:border-primary-500/50 bg-white/5 backdrop-blur-sm">
                                <motion.div
                                    animate={{ y: [0, 12, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                                    className="w-1 h-1.5 rounded-full bg-primary-500"
                                />
                            </div>
                        </motion.button>
                        <div className="h-24 w-px bg-gradient-to-b from-primary-500 to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Scroll Hint - bottom center but safe */}
            <AnimatePresence>
                {showScrollHint && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: [0, 0.4, 1, 0.4, 0],
                            y: 0
                        }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{
                            opacity: { repeat: Infinity, duration: 4, times: [0, 0.25, 0.5, 0.75, 1] },
                            y: { duration: 0.5 }
                        }}
                        onClick={() => scrollTo('projects')}
                        className="md:hidden fixed bottom-6 -translate-x-1/2 flex flex-col items-center gap-2 z-40 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                    >
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1 h-1.5 rounded-full bg-primary-500"
                        />
                        <span className="text-[8px] font-black tracking-widest text-white uppercase">Explore</span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Transition masks */}

            {/* Transition masks */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent dark:block hidden pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent dark:hidden block pointer-events-none" />
            <div className="section-divider absolute bottom-0 left-0 right-0" />
        </section>
    );
}

// Helper for scroll opacity if needed, but simple CSS or framer scroll works better.
// Added section-divider logic in index.css
