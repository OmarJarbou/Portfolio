import { motion } from 'framer-motion';
import SectionWrapper, { AnimatedDiv } from '../components/SectionWrapper';
import { fadeInUp, scaleIn, staggerContainer } from '../utils/animations';
import skills from '../data/skills.json';

const CATEGORY_META = {
    frontend: { label: 'Frontend', color: 'from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/5', accent: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/20' },
    backend: { label: 'Backend', color: 'from-green-500/10 to-green-600/5 dark:from-green-500/20 dark:to-green-600/5', accent: 'text-green-600 dark:text-green-400', border: 'border-green-500/20' },
    database: { label: 'Database', color: 'from-yellow-500/10 to-yellow-600/5 dark:from-yellow-500/20 dark:to-yellow-600/5', accent: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-500/20' },
    ai: { label: 'AI & ML', color: 'from-purple-500/10 to-purple-600/5 dark:from-purple-500/20 dark:to-purple-600/5', accent: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/20' },
    hardware: { label: 'Hardware', color: 'from-orange-500/10 to-orange-600/5 dark:from-orange-500/20 dark:to-orange-600/5', accent: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/20' },
    tools: { label: 'Tools', color: 'from-slate-500/10 to-slate-600/5 dark:from-slate-500/20 dark:to-slate-600/5', accent: 'text-slate-600 dark:text-slate-400', border: 'border-slate-500/20' },
};

export default function Skills() {
    return (
        <SectionWrapper id="skills" className="py-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <AnimatedDiv className="text-center mb-14">
                    <motion.div variants={fadeInUp}>
                        <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase">Expertise</span>
                        <h2 className="section-title mt-2">
                            Skills &amp; <span className="gradient-text">Technologies</span>
                        </h2>
                        <p className="section-subtitle max-w-xl mx-auto">
                            A versatile toolkit spanning the full development stack and beyond.
                        </p>
                    </motion.div>
                </AnimatedDiv>

                {/* Skills Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {Object.entries(skills).map(([key, items]) => {
                        const meta = CATEGORY_META[key] || { label: key, color: '', accent: 'text-slate-400', border: 'border-white/10' };
                        return (
                            <motion.div
                                key={key}
                                variants={scaleIn}
                                className={`relative glass rounded-3xl p-6 bg-gradient-to-br ${meta.color} border border-slate-200 dark:${meta.border} hover:border-primary-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30`}
                            >
                                <h3 className={`font-black text-xs mb-5 ${meta.accent} uppercase tracking-[0.2em]`}>
                                    {meta.label}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill) => (
                                        <motion.span
                                            key={skill.name}
                                            whileHover={{ scale: 1.05 }}
                                            className="px-3 py-1.5 rounded-xl glass text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/8 hover:border-primary-500/30 hover:text-primary-600 dark:hover:text-white transition-all duration-200 cursor-default"
                                        >
                                            {skill.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
