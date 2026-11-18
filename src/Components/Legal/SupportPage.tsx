import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    FileText,
    HelpCircle,
    Lock,
    Mail,
    MessageCircle,
    Moon,
    ShieldCheck,
    Sun,
    Trash2,
} from 'lucide-react';
import appIcon from '../../assets/app-icon-real.png';
import { colorsDefinition, fonts } from '../../constants';
import { themeContext } from '../../Context/context';
import Footer from '../Main/Footer';

const SUPPORT_TOPICS = [
    {
        q: 'How do I verify my email or reset my password?',
        a: 'During sign-up or password reset, a 6-digit verification code is sent to your email address from Skolarix. Please check your inbox and spam/junk folder, or request a new code after 60 seconds.',
    },
    {
        q: 'What if Sign in with Apple hides my email?',
        a: 'If you select Hide My Email, Apple provides a Private Relay address. If Apple does not return an email on a retry, Skolarix prompts you once to enter your email so your account and security emails remain reachable.',
    },
    {
        q: 'How do Shared Quizzes work?',
        a: 'Tap Shared Quizzes in the app to host a quiz and generate a unique join code or link. Classmates or friends can enter the code in Enter Quiz Code (or open the link) to take the quiz while responses are open.',
    },
    {
        q: 'How does offline access work?',
        a: 'Previously loaded quizzes, quiz history, and saved quizzes are stored locally on your device for offline review and retakes. Your updates automatically sync once your internet connection returns.',
    },
    {
        q: 'How do I delete my account or manage subscriptions?',
        a: 'Subscriptions on iOS or Android are managed directly in your Apple ID or Google Play settings. You can request permanent account deletion anytime from Account -> Delete Account in the app or on our deletion page.',
    },
];

export const SupportPage: React.FC = () => {
    const { colors, setColors } = useContext(themeContext);
    const [darkMode, setDarkMode] = useState(
        () => colors.background === colorsDefinition.dark.background
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    useEffect(() => {
        setColors(darkMode ? colorsDefinition.dark : colorsDefinition.light);
    }, [darkMode, setColors]);

    return (
        <div
            style={{ backgroundColor: colors.background, color: colors.text, fontFamily: fonts.body }}
            className="min-h-screen w-full flex flex-col justify-between transition-colors duration-300"
        >
            {/* Top Bar */}
            <header
                className="sticky top-0 z-40 w-full backdrop-blur-md border-b"
                style={{
                    backgroundColor: darkMode ? 'rgba(8, 8, 11, 0.85)' : 'rgba(242, 242, 247, 0.85)',
                    borderColor: colors.border,
                }}
            >
                <div className="max-w-5xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
                    <Link to="/" className="flex items-center gap-3 no-underline">
                        <img src={appIcon} alt="Skolarix Logo" className="h-8 w-8 rounded-lg" />
                        <span className="font-bold text-lg tracking-tight" style={{ color: colors.text }}>
                            Skolarix
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-opacity"
                            style={{ color: colors.primary }}
                        >
                            <ArrowLeft size={16} />
                            Back to Home
                        </Link>

                        <button
                            onClick={() => setDarkMode((prev) => !prev)}
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            className="relative flex items-center w-12 h-7 rounded-full px-1 transition-colors duration-300 cursor-pointer"
                            style={{ backgroundColor: darkMode ? '#334155' : colors.primary }}
                        >
                            <span
                                className="flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"
                                style={{ transform: darkMode ? 'translateX(20px)' : 'translateX(0px)' }}
                            >
                                {darkMode ? (
                                    <Moon size={12} color="#334155" />
                                ) : (
                                    <Sun size={12} color={colors.success} />
                                )}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-4xl mx-auto px-5 md:px-8 pt-10 pb-6">
                {/* Quick Navigation */}
                <nav aria-label="Support and Legal" className="flex flex-wrap items-center gap-2.5 mb-8">
                    <Link
                        to="/support"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                        style={{
                            backgroundColor: colors.primary,
                            borderColor: colors.primary,
                            color: '#FFFFFF',
                        }}
                    >
                        <HelpCircle size={15} />
                        Support
                    </Link>

                    <Link
                        to="/legal/terms-of-use"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                        style={{
                            backgroundColor: colors.backgroundRaised,
                            borderColor: colors.border,
                            color: colors.text,
                        }}
                    >
                        <FileText size={15} />
                        Terms of Use
                    </Link>

                    <Link
                        to="/legal/subscription-policy"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                        style={{
                            backgroundColor: colors.backgroundRaised,
                            borderColor: colors.border,
                            color: colors.text,
                        }}
                    >
                        <ShieldCheck size={15} />
                        Subscription Policy
                    </Link>

                    <Link
                        to="/legal/privacy-policy"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                        style={{
                            backgroundColor: colors.backgroundRaised,
                            borderColor: colors.border,
                            color: colors.text,
                        }}
                    >
                        <Lock size={15} />
                        Privacy Policy
                    </Link>

                    <Link
                        to="/del-acct"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-opacity hover:opacity-80"
                        style={{
                            backgroundColor: colors.backgroundRaised,
                            borderColor: colors.border,
                            color: '#EF4444',
                        }}
                    >
                        <Trash2 size={15} />
                        Delete Account
                    </Link>
                </nav>

                {/* Header Card */}
                <div
                    className="rounded-3xl p-7 md:p-10 border mb-8"
                    style={{
                        backgroundColor: colors.backgroundRaised,
                        borderColor: colors.border,
                    }}
                >
                    <span
                        className="inline-block text-xs font-semibold tracking-wider px-3 py-1 rounded-full mb-4"
                        style={{
                            backgroundColor: colors.primarySoft,
                            color: colors.primary,
                            fontFamily: fonts.mono,
                        }}
                    >
                        SKOLARIX · SUPPORT
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: colors.text }}>
                        How can we help?
                    </h1>
                    <p className="mt-3 text-base leading-relaxed" style={{ color: colors.textSoft }}>
                        Need help with your Skolarix account, quizzes, billing, or bug reports on iOS, Android, or Web? Reach out anytime and we will respond as quickly as possible.
                    </p>
                </div>

                {/* Contact Methods */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div
                        className="rounded-2xl p-6 border flex flex-col justify-between gap-4"
                        style={{
                            backgroundColor: colors.backgroundRaised,
                            borderColor: colors.border,
                        }}
                    >
                        <div>
                            <div className="flex items-center gap-2.5 mb-2">
                                <Mail size={20} style={{ color: colors.primary }} />
                                <h2 className="text-lg font-bold" style={{ color: colors.text }}>
                                    Email Support
                                </h2>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: colors.textSoft }}>
                                For account help, billing inquiries, feedback, or bug reports. Typically answered within 24–48 hours.
                            </p>
                        </div>

                        <a
                            href="mailto:app.skolarix@gmail.com?subject=Skolarix%20Support%20Request"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                            style={{ backgroundColor: colors.primary }}
                        >
                            <Mail size={16} />
                            app.skolarix@gmail.com
                        </a>
                    </div>

                    <div
                        className="rounded-2xl p-6 border flex flex-col justify-between gap-4"
                        style={{
                            backgroundColor: colors.backgroundRaised,
                            borderColor: colors.border,
                        }}
                    >
                        <div>
                            <div className="flex items-center gap-2.5 mb-2">
                                <MessageCircle size={20} style={{ color: colors.primary }} />
                                <h2 className="text-lg font-bold" style={{ color: colors.text }}>
                                    Quick Chat (WhatsApp)
                                </h2>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: colors.textSoft }}>
                                Prefer instant messaging for quick questions or troubleshooting while using the app? Message us directly.
                            </p>
                        </div>

                        <a
                            href="https://wa.me/2349079172441"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition-opacity hover:opacity-85"
                            style={{
                                backgroundColor: colors.background,
                                borderColor: colors.border,
                                color: colors.text,
                            }}
                        >
                            <MessageCircle size={16} />
                            Message on WhatsApp
                        </a>
                    </div>
                </div>

                {/* Common Questions */}
                <section
                    className="rounded-2xl p-6 md:p-8 border"
                    style={{
                        backgroundColor: colors.backgroundRaised,
                        borderColor: colors.border,
                    }}
                >
                    <h2 className="text-lg md:text-xl font-bold mb-4" style={{ color: colors.text }}>
                        Common Support Topics
                    </h2>
                    <div className="space-y-5">
                        {SUPPORT_TOPICS.map((item) => (
                            <div
                                key={item.q}
                                className="pb-4 last:pb-0 border-b last:border-b-0"
                                style={{ borderColor: colors.border }}
                            >
                                <h3 className="text-base font-semibold mb-1.5" style={{ color: colors.text }}>
                                    {item.q}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: colors.textSoft }}>
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SupportPage;
