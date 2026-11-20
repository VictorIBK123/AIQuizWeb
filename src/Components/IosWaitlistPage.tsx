import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Apple, ArrowLeft, Moon, Sun } from 'lucide-react';
import appIcon from '../assets/app-icon-real.png';
import { colorsDefinition, fonts } from '../constants';
import { themeContext } from '../Context/context';
import Footer from './Main/Footer';
import IosWaitlistForm from './IosWaitlistForm';

export const IosWaitlistPage: React.FC = () => {
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
            <header
                style={{
                    borderBottom: `1px solid ${colors.border}`,
                    backgroundColor: colors.backgroundRaised,
                }}
                className="sticky top-0 z-20 px-4 sm:px-8 py-3.5 backdrop-blur-md"
            >
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="p-2 rounded-lg transition-colors hover:opacity-80"
                            style={{ backgroundColor: colors.backgroundSunken, color: colors.text }}
                            aria-label="Back to home"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <Link to="/" className="flex items-center gap-2.5">
                            <img src={appIcon} alt="Skolarix" className="w-8 h-8 rounded-lg object-cover" />
                            <span className="font-bold text-lg tracking-tight" style={{ fontFamily: fonts.display }}>
                                Skolarix
                            </span>
                        </Link>
                    </div>

                    <button
                        onClick={() => setDarkMode((prev) => !prev)}
                        className="p-2 rounded-lg transition-colors hover:opacity-80 cursor-pointer"
                        style={{ backgroundColor: colors.backgroundSunken, color: colors.text }}
                        aria-label="Toggle theme"
                    >
                        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                </div>
            </header>

            <main className="max-w-lg w-full mx-auto px-4 sm:px-6 py-10 sm:py-16">
                <div
                    className="rounded-2xl border p-6 sm:p-8 shadow-sm"
                    style={{
                        backgroundColor: colors.backgroundRaised,
                        borderColor: colors.border,
                    }}
                >
                    <div className="flex justify-center mb-5">
                        <div
                            className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: colors.primarySoft }}
                        >
                            <Apple size={32} color={colors.primary} />
                            <img
                                src={appIcon}
                                alt="Skolarix"
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-md shadow-md border"
                                style={{ borderColor: colors.border }}
                            />
                        </div>
                    </div>

                    <h1
                        className="text-2xl sm:text-3xl font-bold text-center tracking-tight"
                        style={{ fontFamily: fonts.display }}
                    >
                        Skolarix for iOS
                    </h1>
                    <p
                        className="text-sm text-center mt-2 mb-6 leading-relaxed"
                        style={{ color: colors.textSoft }}
                    >
                        Our iPhone app is currently in App Store review. Drop your email below and we&apos;ll notify you the moment it goes live.
                    </p>

                    <IosWaitlistForm source="ios-page" />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default IosWaitlistPage;
