import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Lock, Moon, ShieldCheck, Sun, Trash2 } from 'lucide-react';
import appIcon from '../../assets/app-icon-real.png';
import { colorsDefinition, fonts } from '../../constants';
import { themeContext } from '../../Context/context';
import Footer from '../Main/Footer';

const STEPS = [
    {
        num: '01',
        title: 'Fill out the request form',
        description:
            'Click the button below and complete the form with your full name and the email address linked to your Skolarix account.',
    },
    {
        num: '02',
        title: 'We verify your identity',
        description:
            'We may send a confirmation email to verify that the request is coming from the account owner.',
    },
    {
        num: '03',
        title: 'Your account is deleted',
        description:
            'Within 14 days of your verified request, your account and personal data will be permanently removed from our systems.',
    },
];

const PERMANENTLY_DELETED = [
    'Your name & email address (including Apple Private Relay / Google link)',
    'Account profile (education status, age range, gender, bio) & topic interests',
    'Shared quizzes you hosted & participant submissions',
    'Saved quizzes, preferences & known device/session records',
    'Subscription metadata stored on our servers',
];

const RETAINED_ANONYMIZED = [
    'Aggregated usage & anonymized quiz metrics',
    'No personal identifiers or emails kept',
];

export const DeleteAccountPage: React.FC = () => {
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
                {/* Quick Switcher */}
                <nav aria-label="Legal documents" className="flex flex-wrap items-center gap-2.5 mb-8">
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                        style={{
                            backgroundColor: colors.primary,
                            borderColor: colors.primary,
                            color: '#FFFFFF',
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
                        ACCOUNT · DELETION
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: colors.text }}>
                        Request to delete your account
                    </h1>
                    <p className="mt-3 text-base leading-relaxed" style={{ color: colors.textSoft }}>
                        We're sorry to see you go. Follow the steps below to submit a deletion request — we'll process it within 14 days.
                    </p>
                </div>

                {/* How it works */}
                <section
                    className="rounded-2xl p-6 md:p-8 border mb-6"
                    style={{
                        backgroundColor: colors.backgroundRaised,
                        borderColor: colors.border,
                    }}
                >
                    <h2 className="text-lg md:text-xl font-bold mb-4" style={{ color: colors.text }}>
                        How it works
                    </h2>
                    <div className="divide-y" style={{ borderColor: colors.border }}>
                        {STEPS.map((step) => (
                            <div
                                key={step.num}
                                className="py-4 first:pt-0 last:pb-0 flex gap-4 items-start"
                                style={{ borderColor: colors.border }}
                            >
                                <span
                                    className="text-xs font-bold px-2.5 py-1 rounded-md shrink-0 mt-0.5"
                                    style={{
                                        backgroundColor: colors.primarySoft,
                                        color: colors.primary,
                                        fontFamily: fonts.mono,
                                    }}
                                >
                                    {step.num}
                                </span>
                                <div>
                                    <h3 className="font-semibold text-base mb-1" style={{ color: colors.text }}>
                                        {step.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed" style={{ color: colors.textSoft }}>
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Data breakdown */}
                <section
                    className="rounded-2xl p-6 md:p-8 border mb-6"
                    style={{
                        backgroundColor: colors.backgroundRaised,
                        borderColor: colors.border,
                    }}
                >
                    <h2 className="text-lg md:text-xl font-bold mb-4" style={{ color: colors.text }}>
                        What happens to your data
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                            className="rounded-xl p-5 border"
                            style={{
                                backgroundColor: colors.background,
                                borderColor: colors.border,
                            }}
                        >
                            <p
                                className="text-xs font-semibold uppercase tracking-wider mb-3"
                                style={{ color: colors.primary, fontFamily: fonts.mono }}
                            >
                                Permanently deleted
                            </p>
                            <ul className="space-y-2">
                                {PERMANENTLY_DELETED.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2.5 text-sm leading-relaxed"
                                        style={{ color: colors.textSoft }}
                                    >
                                        <span
                                            className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                                            style={{ backgroundColor: colors.primary }}
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div
                            className="rounded-xl p-5 border"
                            style={{
                                backgroundColor: colors.background,
                                borderColor: colors.border,
                            }}
                        >
                            <p
                                className="text-xs font-semibold uppercase tracking-wider mb-3"
                                style={{ color: colors.primary, fontFamily: fonts.mono }}
                            >
                                Retained (anonymized)
                            </p>
                            <ul className="space-y-2">
                                {RETAINED_ANONYMIZED.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2.5 text-sm leading-relaxed"
                                        style={{ color: colors.textSoft }}
                                    >
                                        <span
                                            className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                                            style={{ backgroundColor: colors.primary }}
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div
                        className="mt-5 rounded-xl p-4 border text-sm leading-relaxed"
                        style={{
                            backgroundColor: colors.primarySoft,
                            borderColor: colors.border,
                            color: colors.text,
                        }}
                    >
                        <strong>Important notes:</strong> Anonymized usage metrics may be retained for product improvement and cannot be linked back to you once deleted. If you have an active subscription through the <strong>Apple App Store</strong> or <strong>Google Play</strong>, please cancel it in your Apple ID or Google Play subscription settings as deleting your Skolarix account does not automatically cancel store-managed billing. If you use Sign in with Apple, you can also revoke app access in iOS Settings &rarr; Apple ID &rarr; Sign-In &amp; Security.
                    </div>
                </section>

                {/* CTA Card */}
                <section
                    className="rounded-2xl p-6 md:p-8 border"
                    style={{
                        backgroundColor: colors.backgroundRaised,
                        borderColor: colors.border,
                    }}
                >
                    <p className="text-sm md:text-base mb-5" style={{ color: colors.textSoft }}>
                        Ready to proceed? Submit your deletion request using the button below.
                    </p>
                    <a
                        href="https://forms.gle/vTsrZ5h8r5b6Nf16A"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base text-white transition-opacity hover:opacity-90"
                        style={{ backgroundColor: colors.primary }}
                    >
                        <Trash2 size={18} />
                        Submit Deletion Request
                    </a>
                    <p className="mt-5 text-xs md:text-sm" style={{ color: colors.textSoft }}>
                        Questions? Email us at{' '}
                        <a
                            href="mailto:app.skolarix@gmail.com"
                            className="underline underline-offset-2 font-medium"
                            style={{ color: colors.text }}
                        >
                            app.skolarix@gmail.com
                        </a>
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default DeleteAccountPage;
