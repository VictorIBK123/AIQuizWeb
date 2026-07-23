import { useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { Text } from './UI';
import { fonts } from '../constants';
import { themeContext } from '../Context/context';

interface SignInSuccessToastProps {
    visible: boolean;
    email: string;
    onDismiss: () => void;
    /** Duration in ms before auto-dismissing. Default 4500. */
    duration?: number;
}

export const SignInSuccessToast: React.FC<SignInSuccessToastProps> = ({
    visible,
    email,
    onDismiss,
    duration = 4500,
}) => {
    const { colors } = useContext(themeContext);

    // Auto-dismiss after `duration` ms
    useEffect(() => {
        if (!visible) return;
        const t = setTimeout(onDismiss, duration);
        return () => clearTimeout(t);
    }, [visible]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key='signin-success-toast'
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    className='fixed bottom-6 right-6 z-[9999] w-80 max-w-[calc(100vw-3rem)]'
                >
                    <div
                        className='relative flex items-start gap-4 rounded-2xl px-5 py-4 shadow-2xl overflow-hidden'
                        style={{
                            backgroundColor: colors.glowA,
                            border: `1px solid ${colors.border}`,
                        }}
                    >
                        {/* Glowing green left accent bar */}
                        <div
                            className='absolute left-0 top-0 h-full w-1 rounded-l-2xl'
                            style={{ background: 'linear-gradient(180deg, #34C759, #28a745)' }}
                        />

                        {/* Animated check icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                            className='shrink-0 mt-0.5'
                        >
                            <div
                                className='flex items-center justify-center w-9 h-9 rounded-full'
                                style={{ backgroundColor: 'rgba(52, 199, 89, 0.15)' }}
                            >
                                <CheckCircle2 size={20} color='#34C759' strokeWidth={2.5} />
                            </div>
                        </motion.div>

                        {/* Text */}
                        <div className='flex-1 min-w-0'>
                            <Text className='font-semibold text-sm leading-tight'>
                                Signed in successfully!
                            </Text>
                            <Text
                                variant='soft'
                                className='text-xs mt-1 truncate'
                                style={{ fontFamily: fonts.body }}
                            >
                                Welcome back, {email}
                            </Text>
                        </div>

                        {/* Dismiss button */}
                        <button
                            onClick={onDismiss}
                            className='shrink-0 cursor-pointer mt-0.5 opacity-50 hover:opacity-100 transition-opacity'
                            aria-label='Dismiss'
                        >
                            <X size={15} color={colors.textSoft} />
                        </button>

                        {/* Progress bar sweeping left to right */}
                        <motion.div
                            className='absolute bottom-0 left-0 h-0.5 rounded-full'
                            style={{ background: 'linear-gradient(90deg, #34C759, #28a745)' }}
                            initial={{ width: '100%' }}
                            animate={{ width: '0%' }}
                            transition={{ duration: duration / 1000, ease: 'linear' }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
