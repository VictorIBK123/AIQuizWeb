import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, FileText, Moon, ShieldCheck, Sun } from 'lucide-react';
import appIcon from '../../assets/app-icon-real.png';
import { colorsDefinition, fonts } from '../../constants';
import { themeContext } from '../../Context/context';
import Footer from '../Main/Footer';
import {
    type LegalDocument,
    SUBSCRIPTION_POLICY_DOC,
    TERMS_OF_USE_DOC,
} from './legalContent';

interface LegalPageProps {
    docType: LegalDocument['slug'];
}

const DOCUMENTS: Record<LegalDocument['slug'], LegalDocument> = {
    'terms-of-use': TERMS_OF_USE_DOC,
    'subscription-policy': SUBSCRIPTION_POLICY_DOC,
};

export const LegalPage: React.FC<LegalPageProps> = ({ docType }) => {
    const { colors, setColors } = useContext(themeContext);
    const [darkMode, setDarkMode] = useState(
        () => colors.background === colorsDefinition.dark.background
    );

    const doc = DOCUMENTS[docType];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [docType]);

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

            {/* Legal Navigation Tabs + Main Document */}
            <main className="flex-1 w-full max-w-4xl mx-auto px-5 md:px-8 pt-10 pb-6">
                {/* Quick Switcher */}
                <nav aria-label="Legal documents" className="flex flex-wrap items-center gap-2.5 mb-8">
                    <Link
                        to="/legal/terms-of-use"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                        style={
                            docType === 'terms-of-use'
                                ? {
                                      backgroundColor: colors.primary,
                                      borderColor: colors.primary,
                                      color: '#FFFFFF',
                                  }
                                : {
                                      backgroundColor: colors.backgroundRaised,
                                      borderColor: colors.border,
                                      color: colors.text,
                                  }
                        }
                    >
                        <FileText size={15} />
                        Terms of Use
                    </Link>

                    <Link
                        to="/legal/subscription-policy"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                        style={
                            docType === 'subscription-policy'
                                ? {
                                      backgroundColor: colors.primary,
                                      borderColor: colors.primary,
                                      color: '#FFFFFF',
                                  }
                                : {
                                      backgroundColor: colors.backgroundRaised,
                                      borderColor: colors.border,
                                      color: colors.text,
                                  }
                        }
                    >
                        <ShieldCheck size={15} />
                        Subscription Policy
                    </Link>

                    <a
                        href="https://privacy-policy.skolarix.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-opacity hover:opacity-80"
                        style={{
                            backgroundColor: colors.backgroundRaised,
                            borderColor: colors.border,
                            color: colors.textSoft,
                        }}
                    >
                        Privacy Policy
                        <ExternalLink size={14} />
                    </a>
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
                        {doc.badge}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: colors.text }}>
                        {doc.title}
                    </h1>
                    <p className="mt-3 text-base leading-relaxed" style={{ color: colors.textSoft }}>
                        {doc.subtitle}
                    </p>
                    <p className="mt-4 text-xs font-medium" style={{ color: colors.textSoft, fontFamily: fonts.mono }}>
                        Last updated: {doc.lastUpdated}
                    </p>

                    {doc.summaryNote && (
                        <div
                            className="mt-6 rounded-2xl p-4 border text-sm leading-relaxed"
                            style={{
                                backgroundColor: colors.primarySoft,
                                borderColor: colors.border,
                                color: colors.text,
                            }}
                        >
                            {doc.summaryNote}
                        </div>
                    )}
                </div>

                {/* Sections */}
                <div className="space-y-6">
                    {doc.sections.map((section) => (
                        <section
                            key={section.id}
                            id={section.id}
                            className="rounded-2xl p-6 md:p-8 border"
                            style={{
                                backgroundColor: colors.backgroundRaised,
                                borderColor: colors.border,
                            }}
                        >
                            <h2 className="text-lg md:text-xl font-bold mb-3" style={{ color: colors.text }}>
                                {section.title}
                            </h2>

                            {section.intro && (
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: colors.textSoft }}>
                                    {section.intro}
                                </p>
                            )}

                            {section.bullets && section.bullets.length > 0 && (
                                <ul className="space-y-2.5 mt-2">
                                    {section.bullets.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-2.5 text-sm md:text-base leading-relaxed"
                                            style={{ color: colors.textSoft }}
                                        >
                                            <span
                                                className="mt-2 h-1.5 w-1.5 rounded-full flex-none"
                                                style={{ backgroundColor: colors.primary }}
                                            />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {section.outro && (
                                <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: colors.textSoft }}>
                                    {section.outro}
                                </p>
                            )}
                        </section>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LegalPage;
