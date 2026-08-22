import React, { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Apple, X } from 'lucide-react';
import { Box, Button, Text } from './UI';
import { fonts } from '../constants';
import { themeContext } from '../Context/context';
import appIcon from '../assets/app-icon-real.png';

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
    isOpen,
    onClose,
    title = 'iOS App Coming Soon',
    description = "We're putting the finishing touches on the iOS version of Skolarix. It will be available on the Apple App Store soon!",
}) => {
    const { colors } = useContext(themeContext);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className='fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className='w-full max-w-md'
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        <Box variant='card' className='relative w-full p-8 text-center overflow-hidden'>
                            <button
                                onClick={onClose}
                                className='absolute top-5 right-5 cursor-pointer p-1 rounded-lg hover:opacity-75 transition-opacity'
                                aria-label='Close'
                            >
                                <X size={20} color={colors.textSoft} />
                            </button>

                            <div className='flex justify-center mb-5'>
                                <div
                                    className='relative w-16 h-16 rounded-2xl flex items-center justify-center'
                                    style={{ backgroundColor: colors.primarySoft || 'rgba(59, 130, 246, 0.15)' }}
                                >
                                    <Apple size={32} color={colors.primary} />
                                    <img
                                        src={appIcon}
                                        alt='Skolarix'
                                        className='absolute -top-2 -right-2 w-6 h-6 rounded-md shadow-md border'
                                        style={{ borderColor: colors.border }}
                                    />
                                </div>
                            </div>

                            <Text className='font-bold text-2xl mb-2'>{title}</Text>
                            <Text
                                variant='soft'
                                className='text-sm leading-relaxed mb-6 max-w-sm mx-auto'
                                style={{ fontFamily: fonts.body }}
                            >
                                {description}
                            </Text>

                            <Button
                                variant='primary'
                                className='w-full py-3 text-sm font-semibold'
                                onClick={onClose}
                            >
                                <Text variant='fixedWhite'>Got it</Text>
                            </Button>
                        </Box>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ComingSoonModal;
