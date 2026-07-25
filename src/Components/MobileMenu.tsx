import { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Button, Text } from './UI';
import { themeContext } from '../Context/context';

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
    links: { text: string; slug: string }[];
    onSignInClick: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, links, onSignInClick }) => {
    const { colors } = useContext(themeContext);

    const handleLinkClick = (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        onClose();
        // Let the close animation (0.2s) finish before scrolling, so the
        // overlay isn't fighting the page scroll for attention.
        setTimeout(() => {
            document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState(null, '', `#${slug}`);
        }, 200);
    };

    return (
        <AnimatePresence>
            {open && (
                <div className='fixed inset-0 z-40 md:hidden'>
                    <motion.div
                        className='absolute inset-0 bg-black/70'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className='absolute top-19 left-0 w-full'
                    >
                        <Box
                            variant='bare'
                            className='px-8 py-8 flex flex-col gap-6 border-t'
                            style={{ borderColor: colors.border, backgroundColor: colors.background }}
                        >
                            {links.map((link, i) => (
                                <motion.a
                                    key={link.slug}
                                    href={`#${link.slug}`}
                                    onClick={(e) => handleLinkClick(e, link.slug)}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * i, duration: 0.2 }}
                                >
                                    <Text className='text-lg'>{link.text}</Text>
                                </motion.a>
                            ))}
                            <Button
                                variant='ghost'
                                className='w-full justify-center mt-2'
                                onClick={() => {
                                    onClose();
                                    onSignInClick();
                                }}
                            >
                                <Text>Sign in</Text>
                            </Button>
                        </Box>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}