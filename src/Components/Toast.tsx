import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, XCircle } from 'lucide-react';
import { Text } from './UI';

export interface ToastState {
    type: 'success' | 'error' | 'info';
    message: string;
}

interface ToastProps {
    toast: ToastState | null;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
    return (
        <AnimatePresence>
            {toast && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25 }}
                    className='fixed top-24 left-1/2 -translate-x-1/2 z-200 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg'
                    style={{
                        backgroundColor:
                            toast.type === 'success'
                                ? '#34C759'
                                : toast.type === 'info'
                                ? '#0A84FF'
                                : '#FF3B30'
                    }}
                >
                    {toast.type === 'success' ? (
                        <CheckCircle2 size={18} color='#fff' />
                    ) : toast.type === 'info' ? (
                        <Info size={18} color='#fff' />
                    ) : (
                        <XCircle size={18} color='#fff' />
                    )}
                    <Text style={{ color: '#fff' }} className='text-sm font-semibold'>{toast.message}</Text>
                </motion.div>
            )}
        </AnimatePresence>
    )
}