import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

export default function SectionWrapper({ children, className = '', id = '' }) {
    return (
        <motion.section
            id={id}
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
        >
            {children}
        </motion.section>
    );
}

export function AnimatedDiv({ children, className = '', variants = fadeInUp, delay = 0 }) {
    return (
        <motion.div
            className={className}
            variants={variants}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
}
