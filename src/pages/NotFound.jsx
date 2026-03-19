import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center"
        >
            <div className="text-8xl font-black gradient-text">404</div>
            <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
            <p className="text-slate-400 max-w-md">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn-primary mt-4">
                <Home className="w-4 h-4" />
                Back to Home
            </Link>
        </motion.div>
    );
}
