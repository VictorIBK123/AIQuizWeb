import { motion } from 'framer-motion';

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

// Fades + slides up when scrolled into view. Use for anything below the fold.
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        className={className}
    >
        {children}
    </motion.div>
)

// Fades + slides up immediately on mount. Use for above-the-fold hero content only
// (never wrap anything that is itself position:fixed — see note above).
export const FadeIn: React.FC<RevealProps> = ({ children, className, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        className={className}
    >
        {children}
    </motion.div>
)