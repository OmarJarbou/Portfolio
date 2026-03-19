import { motion } from 'framer-motion';
import { Code2, Cpu, Brain } from 'lucide-react';
import SectionWrapper, { AnimatedDiv } from '../components/SectionWrapper';
import { fadeInUp, scaleIn, staggerContainer, slideInLeft, slideInRight } from '../utils/animations';
import personal from '../data/personal.json';

const ICON_MAP = { Code2, Cpu, Brain };

export default function About() {
    return (
        <SectionWrapper id="about" className="py-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text */}
                    <motion.div variants={slideInLeft} className="space-y-6">
                        <div>
                            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-widest uppercase">About</span>
                            <h2 className="section-title mt-2">
                                Who <span className="gradient-text">I Am</span>
                            </h2>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                            {personal.about}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            {[
                                { value: '6+', label: 'Projects Built' },
                                { value: '3+', label: 'Years Experience' },
                                { value: '3', label: 'Disciplines' },
                            ].map((stat) => (
                                <div key={stat.label} className="glass rounded-xl p-4 text-center border border-slate-200 dark:border-white/5">
                                    <div className="text-2xl font-black gradient-text">{stat.value}</div>
                                    <div className="text-xs text-slate-600 dark:text-slate-500 mt-1 font-bold uppercase tracking-tighter opacity-80">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Highlight Cards */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="space-y-4"
                    >
                        {personal.highlights.map((item, i) => {
                            const Icon = ICON_MAP[item.icon] || Code2;
                            return (
                                <motion.div
                                    key={i}
                                    variants={scaleIn}
                                    className="flex gap-4 glass rounded-2xl p-5 border border-slate-200 dark:border-white/5 hover:border-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/5 transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 dark:from-primary-500/20 dark:to-accent-500/20 border border-primary-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
