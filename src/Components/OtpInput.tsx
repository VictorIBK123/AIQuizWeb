import { useRef, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { themeContext } from '../Context/context';

interface OtpInputProps {
    length?: number;
    value: string[];
    onChange: (value: string[]) => void;
    onComplete?: (code: string) => void;
    disabled?: boolean;
    shake?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({ length = 6, value, onChange, onComplete, disabled, shake }) => {
    const { colors } = useContext(themeContext);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    // Whenever the code is cleared externally (e.g. after a failed attempt), refocus the first box
    useEffect(() => {
        if (value.every((d) => d === '')) {
            inputsRef.current[0]?.focus();
        }
    }, [value]);

    const handleChange = (index: number, digit: string) => {
        if (!/^[0-9]?$/.test(digit)) return; // digits only
        const next = [...value];
        next[index] = digit;
        onChange(next);

        if (digit && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        if (next.every((d) => d !== '')) {
            onComplete?.(next.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
        if (!pasted) return;
        const next = Array(length).fill('');
        pasted.split('').forEach((d, i) => { next[i] = d; });
        onChange(next);
        inputsRef.current[Math.min(pasted.length, length) - 1]?.focus();
        if (pasted.length === length) onComplete?.(pasted);
    };

    return (
        <motion.div
            className='flex gap-2 justify-center'
            animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
        >
            {Array.from({ length }).map((_, i) => (
                <motion.input
                    key={i}
                    ref={(el) => { inputsRef.current[i] = el; }}
                    type='text'
                    inputMode='numeric'
                    autoComplete='one-time-code'
                    maxLength={1}
                    value={value[i] || ''}
                    disabled={disabled}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    className='w-11 h-13 text-center text-lg font-bold rounded-lg border outline-none transition-all duration-150 focus:scale-105'
                    style={{
                        backgroundColor: colors.backgroundSunken,
                        borderColor: colors.border,
                        color: colors.text,
                    }}
                />
            ))}
        </motion.div>
    )
}