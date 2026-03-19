import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send } from 'lucide-react';
import SectionWrapper, { AnimatedDiv } from '../components/SectionWrapper';
import { fadeInUp, scaleIn, staggerContainer } from '../utils/animations';
import personal from '../data/personal.json';

const CONTACT_CARDS = [
    {
        icon: Mail,
        label: 'Email',
        key: 'email',
        href: (p) => `mailto:${p.email}`,
        display: (p) => p.email,
        color: 'from-red-500/10 to-red-600/5 dark:from-red-500/20 dark:to-red-600/5 border-red-500/20',
        iconColor: 'text-red-500 dark:text-red-400',
    },
    {
        icon: Github,
        label: 'GitHub',
        key: 'github',
        href: (p) => p.github,
        display: (p) => p.github.replace('https://github.com/', '@'),
        color: 'from-slate-500/10 to-slate-600/5 dark:from-slate-500/20 dark:to-slate-600/5 border-slate-500/20',
        iconColor: 'text-slate-600 dark:text-slate-400',
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        key: 'linkedin',
        href: (p) => p.linkedin,
        display: (p) => p.name,
        color: 'from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/5 border-blue-500/20',
        iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
        icon: MapPin,
        label: 'Location',
        key: 'location',
        href: null,
        display: (p) => p.location,
        color: 'from-emerald-500/10 to-emerald-600/5 dark:from-emerald-500/20 dark:to-emerald-600/5 border-emerald-500/20',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
];

export default function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Netlify Forms handles submission automatically
    };

    return (
        <SectionWrapper id="contact" className="py-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <AnimatedDiv className="text-center mb-14">
                    <motion.div variants={fadeInUp}>
                        <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase">Get in Touch</span>
                        <h2 className="section-title mt-2">
                            Let's <span className="gradient-text">Connect</span>
                        </h2>
                        <p className="section-subtitle max-w-xl mx-auto">
                            Have a project in mind or want to collaborate? I'd love to hear from you.
                        </p>
                    </motion.div>
                </AnimatedDiv>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Contact Cards */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid sm:grid-cols-2 gap-4"
                    >
                        {CONTACT_CARDS.map((card) => {
                            const Icon = card.icon;
                            const content = (
                                <motion.div
                                    key={card.key}
                                    variants={scaleIn}
                                    className={`glass rounded-2xl p-5 bg-gradient-to-br ${card.color} border border-slate-200 dark:border-white/5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group ${card.href ? 'cursor-pointer' : 'cursor-default'}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl glass border border-slate-200 dark:border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`w-5 h-5 ${card.iconColor}`} />
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">{card.label}</div>
                                    <div className="text-sm font-bold text-slate-800 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-white transition-colors">{card.display(personal)}</div>
                                </motion.div>
                            );

                            return card.href ? (
                                <a key={card.key} href={card.href(personal)} target="_blank" rel="noopener noreferrer">
                                    {content}
                                </a>
                            ) : (
                                <div key={card.key}>{content}</div>
                            );
                        })}
                    </motion.div>

                    {/* Right: Contact Form */}
                    <AnimatedDiv variants={fadeInUp}>
                        <form
                            name="contact"
                            method="POST"
                            data-netlify="true"
                            onSubmit={handleSubmit}
                            className="glass rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 space-y-6 shadow-xl"
                        >
                            <input type="hidden" name="form-name" value="contact" />

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl glass text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200 border border-slate-200 dark:border-white/5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-xl glass text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200 border border-slate-200 dark:border-white/5"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    placeholder="Project inquiry..."
                                    className="w-full px-4 py-3 rounded-xl glass text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200 border border-slate-200 dark:border-white/5"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                    className="w-full px-4 py-3 rounded-xl glass text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200 border border-slate-200 dark:border-white/5 resize-none"
                                />
                            </div>

                            <button type="submit" className="btn-primary w-full justify-center">
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                        </form>
                    </AnimatedDiv>
                </div>
            </div>
        </SectionWrapper>
    );
}
