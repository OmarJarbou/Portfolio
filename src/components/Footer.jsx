import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Code2, Heart } from 'lucide-react';
import personal from '../data/personal.json';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 py-12 mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                            <Code2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold gradient-text">{personal.name}</span>
                    </Link>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        <a
                            href={personal.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a
                            href={personal.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                            href={`mailto:${personal.email}`}
                            aria-label="Email"
                            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Copyright */}
                    <p className="text-slate-500 text-sm flex items-center gap-1.5">
                        © {year} {personal.name} &nbsp;·&nbsp; Built with{' '}
                        <Heart className="w-3.5 h-3.5 text-accent-500 inline fill-current" />
                    </p>
                </div>
            </div>
        </footer>
    );
}
