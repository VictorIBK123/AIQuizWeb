import { useState, useRef, useEffect, useContext } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Text } from './UI';
import { themeContext } from '../Context/context';

interface AccountMenuProps {
    email: string;
    onSignOut: () => void;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({ email, onSignOut }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { colors } = useContext(themeContext);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const initial = email.charAt(0).toUpperCase();

    return (
        <div className='relative ml-4' ref={menuRef}>
            <button onClick={() => setOpen((o) => !o)} className='flex items-center gap-2 cursor-pointer'>
                <motion.div
                    className='w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm'
                    style={{ backgroundColor: colors.primary, color: '#fff' }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                >
                    {initial}
                </motion.div>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} color={colors.textSoft} />
                </motion.div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className='absolute right-0 top-12 w-56 origin-top-right'
                    >
                        <Box variant='card' className='overflow-hidden'>
                            <div className='px-4 py-3 border-b' style={{ borderColor: colors.border }}>
                                <Text className='text-sm truncate'>{email}</Text>
                            </div>


                            <button
                                onClick={onSignOut}
                                className='w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer text-left'
                            >
                                <LogOut size={16} color='#FF3B30' />
                                <Text className='text-sm' style={{ color: '#FF3B30' }}>Sign out</Text>
                            </button>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}