import { useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Button, Input, Text } from './UI';
import { OtpInput } from './OtpInput';
import { fonts } from '../constants';
import { confirmVerificationCodeService, loginWithEmailService, registerWithEmailService, resetPasswordService, sendEmailVerificationCode } from '../services/auth';
import { authContext, themeContext } from '../Context/context';

type Mode = 'signin' | 'signup' | 'verifySignup' | 'forgot' | 'resetPassword';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAuthSuccess?: (email: string) => void;
    initialMode?: Mode;
}

const emptyOtp = () => Array(6).fill('');

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess, initialMode }) => {
    const [mode, setMode] = useState<Mode>(initialMode ?? 'signin');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [otp, setOtp] = useState<string[]>(emptyOtp());
    const [otpError, setOtpError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { setUser, setAccessToken } = useContext(authContext);
    const { colors } = useContext(themeContext);

    // resend cooldown ticker
    useEffect(() => {
        if (resendCooldown <= 0) return;
        const timer = setInterval(() => setResendCooldown((c) => c - 1), 1000);
        return () => clearInterval(timer);
    }, [resendCooldown]);

    // reset to the requested mode every time the modal opens
    useEffect(() => {
        if (isOpen) setMode(initialMode ?? 'signin');
    }, [isOpen]);

    const switchMode = (m: Mode) => {
        setError('');
        setOtp(emptyOtp());
        setMode(m);
    };

    const handleClose = () => {
        setError('');
        setSuccessMessage('');
        setOtp(emptyOtp());
        setName('');
        setPassword('');
        setConfirmPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setMode(initialMode ?? 'signin');
        onClose();
    };

    const handleVerifySignupOtp = async (code: string) => {
        setError('');
        setLoading(true);
        try {
            await confirmVerificationCodeService(email, code);
            setSuccessMessage('Your account is verified — please sign in.');
            setOtp(emptyOtp());
            setMode('signin');
        } catch (err: any) {
            setError(err.response?.message || 'Invalid or expired code.');
            setOtpError(true);
            setOtp(emptyOtp());
            setTimeout(() => setOtpError(false), 400);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async (purpose: 'signup' | 'reset') => {
        setResending(true);
        setError('');
        try {
            await sendEmailVerificationCode(email)
            setResendCooldown(30);
            if (purpose === 'signup') {
                setSuccessMessage('Verification code resent. Please check your email.')
                setMode('verifySignup')
            } else {
                setSuccessMessage('Verification code resent. Please check your email.')
                setMode('resetPassword')
            }
        } catch (error: any) {
            setError(error?.response?.data?.message || 'Could not resend code. Try again.');
        } finally {
            setResending(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (mode === 'signup' && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (mode === 'resetPassword' && newPassword !== confirmNewPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            if (mode === 'signin') {
                const response = await loginWithEmailService(email, password);
                setAccessToken(response.accessToken);
                setUser({ email });
                onAuthSuccess?.(email);
                handleClose();
                return;
            }

            if (mode === 'signup') {
                try {
                    await registerWithEmailService(name, email, password);
                    setOtp(emptyOtp());
                    setMode('verifySignup');
                    return;
                } catch (error: any) {
                    const response = error?.response?.data?.message
                    if (response === 'User is not verified.') {

                        try {
                            await sendEmailVerificationCode(email)
                            setError('Verification code resent. Please check your email.')
                            setMode('verifySignup')
                        } catch (error: any) {
                            setError(error?.response?.data?.message || 'Something went wrong. Try again.');
                            return
                        }
                    }
                    setError(response || 'Something went wrong. Try again.');
                }

            }

            if (mode === 'forgot') {
                await sendEmailVerificationCode(email);
                setOtp(emptyOtp());
                setMode('resetPassword');
                return;

            }

            if (mode === 'resetPassword') {
                await resetPasswordService(email, otp.join(''), newPassword);
                setSuccessMessage('Your password has been reset — please sign in.');
                setNewPassword('');
                setConfirmNewPassword('');
                setOtp(emptyOtp());
                setMode('signin');
                return
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const titles: Record<Mode, string> = {
        signin: 'Welcome back',
        signup: 'Create your account',
        verifySignup: 'Verify your email',
        forgot: 'Reset your password',
        resetPassword: 'Set a new password',
    };

    const subtitle = (() => {
        switch (mode) {
            case 'signin': return 'Sign in to sync your quiz history across devices.';
            case 'signup': return 'A free account is enough to get started.';
            case 'verifySignup': return `Enter six (6) digit code sent to ${email}`;
            case 'forgot': return "Enter your email and we'll send you a reset code.";
            case 'resetPassword': return `Enter six (6) digit code sent to ${email}`;
        }
    })();

    const otpComplete = otp.every((d) => d !== '');

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className='fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className='w-full max-w-sm'
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        <Box variant='card' className='relative w-full p-8 overflow-hidden'>
                            <button onClick={handleClose} className='absolute top-5 right-5 cursor-pointer' aria-label='Close'>
                                <X size={20} color={colors.textSoft} />
                            </button>

                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={mode}
                                    initial={{ opacity: 0, x: 12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -12 }}
                                    transition={{ duration: 0.18, ease: 'easeOut' }}
                                >
                                    <Text className='font-bold text-xl mb-1'>{titles[mode]}</Text>
                                    <Text variant='soft' className='mb-6' style={{ fontFamily: fonts.body }}>
                                        {subtitle}
                                    </Text>

                                    {mode === 'signin' && successMessage && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            transition={{ duration: 0.25 }}
                                            className='mb-4 px-3 py-2.5 rounded-lg'
                                            style={{ backgroundColor: 'rgba(52,199,89,0.12)' }}
                                        >
                                            <Text className='text-sm' style={{ color: '#34C759', fontFamily: fonts.body }}>
                                                {successMessage}
                                            </Text>
                                        </motion.div>
                                    )}

                                    {/* ---------- VERIFY SIGNUP OTP ---------- */}
                                    {mode === 'verifySignup' && (
                                        <Box variant='bare' className='flex flex-col gap-5 items-center'>
                                            <OtpInput
                                                value={otp}
                                                onChange={setOtp}
                                                onComplete={handleVerifySignupOtp}
                                                disabled={loading}
                                                shake={otpError}
                                            />
                                            {loading && (
                                                <Text variant='soft' className='text-xs' style={{ fontFamily: fonts.body }}>Verifying…</Text>
                                            )}
                                            {error && (
                                                <Text className='text-sm text-center' style={{ color: '#FF3B30', fontFamily: fonts.body }}>
                                                    {error}
                                                </Text>
                                            )}
                                            <button
                                                type='button'
                                                onClick={() => handleResend('signup')}
                                                disabled={resending || resendCooldown > 0}
                                                className='text-sm font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                                                style={{ color: colors.primary }}
                                            >
                                                {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : resending ? 'Resending…' : 'Resend code'}
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() => switchMode('signup')}
                                                className='text-xs cursor-pointer'
                                                style={{ color: colors.textSoft }}
                                            >
                                                ← Use a different email
                                            </button>
                                        </Box>
                                    )}

                                    {/* ---------- RESET PASSWORD (OTP + new password) ---------- */}
                                    {mode === 'resetPassword' && (
                                        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                                            <OtpInput value={otp} onChange={setOtp} disabled={loading} shake={otpError} />

                                            <div className='flex flex-col gap-4'>
                                                <Input
                                                    type='password'
                                                    required
                                                    minLength={8}
                                                    placeholder='New password'
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                />
                                                <Input
                                                    type='password'
                                                    required
                                                    minLength={8}
                                                    placeholder='Confirm new password'
                                                    value={confirmNewPassword}
                                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                />
                                            </div>

                                            {error && (
                                                <Text className='text-sm' style={{ color: '#FF3B30', fontFamily: fonts.body }}>
                                                    {error}
                                                </Text>
                                            )}

                                            <Button variant='primary' type='submit' className='justify-center' disabled={loading || !otpComplete}>
                                                <Text variant='white'>{loading ? 'Please wait…' : 'Reset password'}</Text>
                                            </Button>

                                            <button
                                                type='button'
                                                onClick={() => handleResend('reset')}
                                                disabled={resending || resendCooldown > 0}
                                                className='text-sm font-semibold cursor-pointer self-center disabled:opacity-50 disabled:cursor-not-allowed'
                                                style={{ color: colors.primary }}
                                            >
                                                {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : resending ? 'Resending…' : 'Resend code'}
                                            </button>
                                        </form>
                                    )}

                                    {/* ---------- SIGN IN / SIGN UP / FORGOT (email-based forms) ---------- */}
                                    {(mode === 'signin' || mode === 'signup' || mode === 'forgot') && (
                                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                                            {mode === 'signup' && (
                                                <Input
                                                    type='text'
                                                    required
                                                    placeholder='Full name'
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            )}

                                            <Input
                                                type='email'
                                                required
                                                placeholder='Email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />

                                            {mode !== 'forgot' && (
                                                <Input
                                                    type='password'
                                                    required
                                                    minLength={8}
                                                    placeholder='Password'
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            )}

                                            {mode === 'signup' && (
                                                <Input
                                                    type='password'
                                                    required
                                                    minLength={8}
                                                    placeholder='Confirm password'
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            )}

                                            {mode === 'signin' && (
                                                <button
                                                    type='button'
                                                    onClick={() => switchMode('forgot')}
                                                    className='text-sm text-right cursor-pointer -mt-2'
                                                    style={{ color: colors.textSoft, fontFamily: fonts.body }}
                                                >
                                                    Forgot password?
                                                </button>
                                            )}

                                            <AnimatePresence>
                                                {error && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <Text className='text-sm' style={{ color: '#FF3B30', fontFamily: fonts.body }}>
                                                            {error}
                                                        </Text>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <Button variant='primary' type='submit' className='mt-2 justify-center' disabled={loading}>
                                                <Text variant='white'>
                                                    {loading
                                                        ? 'Please wait…'
                                                        : mode === 'signin'
                                                            ? 'Sign in'
                                                            : mode === 'signup'
                                                                ? 'Sign up'
                                                                : 'Send reset code'}
                                                </Text>
                                            </Button>

                                            {mode === 'forgot' && (
                                                <button
                                                    type='button'
                                                    onClick={() => switchMode('signin')}
                                                    className='text-sm text-center cursor-pointer'
                                                    style={{ color: colors.textSoft, fontFamily: fonts.body }}
                                                >
                                                    Back to sign in
                                                </button>
                                            )}
                                        </form>
                                    )}

                                    {(mode === 'signin' || mode === 'signup') && (
                                        <Text variant='soft' className='text-center mt-6 text-sm' style={{ fontFamily: fonts.body }}>
                                            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                                            <button
                                                onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                                                className='font-semibold cursor-pointer'
                                                style={{ color: colors.primary }}
                                            >
                                                {mode === 'signin' ? 'Sign up' : 'Sign in'}
                                            </button>
                                        </Text>
                                    )}

                                    {mode === 'signup' && (
                                        <Text variant='soft' className='text-center mt-4 text-xs' style={{ fontFamily: fonts.body }}>
                                            By creating an account, you agree to our{' '}
                                            <a href='https://privacy-policy.skolarix.app/' target='_blank' rel='noopener noreferrer' className='underline' style={{ color: colors.textSoft }}>Privacy Policy</a>.
                                        </Text>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </Box>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}