import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Copy, ExternalLink, Smartphone, Sparkles, ArrowRight } from 'lucide-react';
import { themeContext } from '../Context/context';
import { fonts } from '../constants';
import appIcon from '../assets/app-icon-real.png';
import { ComingSoonModal } from './ComingSoonModal';

export const JoinQuizPage: React.FC = () => {
    const { code: rawCode } = useParams<{ code?: string }>();
    const { colors } = useContext(themeContext);
    const [inputCode, setInputCode] = useState(rawCode?.toUpperCase() || '');
    const [copied, setCopied] = useState(false);
    const [showIosModal, setShowIosModal] = useState(false);

    const activeCode = rawCode ? rawCode.toUpperCase() : inputCode.trim().toUpperCase();

    // Deep link attempt when code is present in URL
    useEffect(() => {
        if (rawCode) {
            const cleanCode = rawCode.trim().toUpperCase();
            const timer = setTimeout(() => {
                window.location.href = `myaiquiz-app://join/${cleanCode}`;
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [rawCode]);

    const handleCopy = async () => {
        if (!activeCode) return;
        try {
            await navigator.clipboard.writeText(activeCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = activeCode;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const handleOpenInApp = () => {
        if (!activeCode) return;
        window.location.href = `myaiquiz-app://join/${activeCode}`;
    };

    return (
        <div
            style={{ backgroundColor: colors.background }}
            className="min-h-screen w-full flex flex-col justify-between text-white transition-colors duration-300"
        >
            {/* Header / Brand */}
            <header className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 no-underline">
                    <img src={appIcon} alt="Skolarix Logo" className="h-9 w-9 rounded-xl shadow-md" />
                    <span className="font-bold text-xl tracking-tight" style={{ color: colors.text }}>
                        Skolarix
                    </span>
                </Link>
                <Link
                    to="/"
                    className="text-sm font-medium hover:opacity-80 transition-opacity"
                    style={{ color: colors.primary }}
                >
                    Learn More &rarr;
                </Link>
            </header>

            {/* Main Center Card */}
            <main className="flex-1 flex items-center justify-center px-4 py-8">
                <div
                    className="w-full max-w-lg rounded-3xl p-8 md:p-10 border shadow-2xl relative overflow-hidden backdrop-blur-md"
                    style={{
                        backgroundColor: colors.backgroundRaised,
                        borderColor: colors.border,
                    }}
                >
                    {/* Top ambient glow */}
                    <div
                        className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
                        style={{ backgroundColor: colors.primary }}
                    />

                    {/* Badge */}
                    <div className="flex justify-center mb-5">
                        <span
                            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide"
                            style={{
                                backgroundColor: colors.primary + '1A',
                                color: colors.primary,
                                border: `1px solid ${colors.primary}33`,
                            }}
                        >
                            <Sparkles size={13} />
                            QUIZ INVITATION
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="text-2xl md:text-3xl font-extrabold text-center tracking-tight"
                        style={{ color: colors.text }}
                    >
                        You're Invited to Take a Quiz
                    </h1>
                    <p
                        className="text-center text-sm md:text-base mt-2.5 max-w-sm mx-auto"
                        style={{ color: colors.textSoft, fontFamily: fonts.body }}
                    >
                        Open the quiz in the Skolarix mobile app to test your knowledge and see instant results.
                    </p>

                    {/* Quiz Code Display / Input */}
                    {rawCode ? (
                        <div className="mt-7">
                            <div
                                className="flex items-center justify-between p-4 rounded-2xl border transition-all"
                                style={{
                                    backgroundColor: colors.backgroundSunken,
                                    borderColor: colors.border,
                                }}
                            >
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                        Quiz Code
                                    </span>
                                    <span
                                        className="text-2xl md:text-3xl font-black tracking-widest font-mono select-all mt-0.5"
                                        style={{ color: colors.primary }}
                                    >
                                        {activeCode}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
                                    style={{
                                        backgroundColor: copied ? '#10B981' : colors.backgroundRaised,
                                        color: copied ? '#FFFFFF' : colors.text,
                                        border: `1px solid ${copied ? '#10B981' : colors.border}`,
                                    }}
                                >
                                    {copied ? (
                                        <>
                                            <Check size={14} />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={14} />
                                            <span>Copy Code</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-7">
                            <label className="block text-xs font-semibold mb-2" style={{ color: colors.textSoft }}>
                                Enter Quiz Code
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="e.g. 8A3F9X"
                                    value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value.toUpperCase().slice(0, 10))}
                                    className="flex-1 px-4 py-3 rounded-xl uppercase font-mono font-bold tracking-wider text-lg border outline-none transition-all"
                                    style={{
                                        backgroundColor: colors.backgroundSunken,
                                        borderColor: colors.border,
                                        color: colors.text,
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Primary Button: Open in App */}
                    <div className="mt-6 flex flex-col gap-3">
                        <button
                            onClick={handleOpenInApp}
                            disabled={!activeCode}
                            className="w-full py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                backgroundColor: colors.primary,
                                boxShadow: `0 8px 24px ${colors.primary}40`,
                            }}
                        >
                            <Smartphone size={18} />
                            <span>Open in Skolarix App</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative my-7 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t" style={{ borderColor: colors.border }} />
                        </div>
                        <span
                            className="relative px-3 text-xs uppercase tracking-wider font-semibold"
                            style={{ backgroundColor: colors.backgroundRaised, color: colors.textSoft }}
                        >
                            Don't have the app?
                        </span>
                    </div>

                    {/* Download Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.victoribk.AIQuizApp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 px-4 rounded-xl border text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.02] no-underline"
                            style={{
                                backgroundColor: colors.backgroundSunken,
                                borderColor: colors.border,
                                color: colors.text,
                            }}
                        >
                            <ExternalLink size={15} />
                            <span>Download for Android</span>
                        </a>

                        <button
                            onClick={() => setShowIosModal(true)}
                            className="flex-1 py-3 px-4 rounded-xl border text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
                            style={{
                                backgroundColor: colors.backgroundSunken,
                                borderColor: colors.border,
                                color: colors.textSoft,
                            }}
                        >
                            <span>Download for iOS</span>
                        </button>
                    </div>

                    {/* Quick Steps */}
                    <div
                        className="mt-8 p-4 rounded-2xl border"
                        style={{
                            backgroundColor: colors.backgroundSunken + '80',
                            borderColor: colors.border,
                        }}
                    >
                        <p className="text-xs font-semibold mb-2" style={{ color: colors.text }}>
                            How to take this quiz:
                        </p>
                        <ol className="text-xs space-y-1.5 list-decimal list-inside" style={{ color: colors.textSoft }}>
                            <li>Open or install the <strong className="text-white">Skolarix</strong> mobile app.</li>
                            <li>The quiz code will automatically load on your screen.</li>
                            <li>Answer questions, beat the timer, and view your score!</li>
                        </ol>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full max-w-5xl mx-auto px-6 py-6 text-center text-xs" style={{ color: colors.textSoft }}>
                &copy; {new Date().getFullYear()} Skolarix. All rights reserved.
            </footer>

            <ComingSoonModal
                isOpen={showIosModal}
                onClose={() => setShowIosModal(false)}
            />
        </div>
    );
};

export default JoinQuizPage;
