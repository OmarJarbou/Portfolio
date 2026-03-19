import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Code2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const NAV_LINKS = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href) => {
        setMenuOpen(false);
        if (!isHome) return;
        setTimeout(() => {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'glass dark:bg-dark-950/80 bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200 dark:border-white/10'
                : 'bg-transparent'
                }`}
        >
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform duration-200">
                        <Code2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-sm sm:text-base gradient-text">OmarJarbou</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {NAV_LINKS.map((link) =>
                        isHome ? (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                className="nav-link"
                            >
                                {link.label}
                            </a>
                        ) : (
                            <Link key={link.label} to={`/${link.href}`} className="nav-link">
                                {link.label}
                            </Link>
                        )
                    )}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors duration-200"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={theme}
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-4 h-4 text-amber-400" />
                                ) : (
                                    <Moon className="w-4 h-4 text-primary-500" />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>

                {/* Mobile Controls */}
                <div className="flex md:hidden items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="w-9 h-9 rounded-lg glass flex items-center justify-center"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-4 h-4 text-amber-400" />
                        ) : (
                            <Moon className="w-4 h-4 text-primary-500" />
                        )}
                    </button>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        className="w-9 h-9 rounded-lg glass flex items-center justify-center"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={menuOpen ? 'close' : 'open'}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                {menuOpen ? (
                                    <X className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                ) : (
                                    <Menu className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="md:hidden glass border-t border-slate-200 dark:border-white/5 overflow-hidden"
                    >
                        <div className="px-4 py-4 flex flex-col gap-1">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={isHome ? link.href : '/'}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                    className="px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors duration-200 text-sm font-medium"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
