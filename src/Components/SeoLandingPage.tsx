import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    ExternalLink,
    FileText,
    Moon,
    Sigma,
    Sun,
    Users,
} from 'lucide-react';
import appIcon from '../assets/app-icon-real.png';
import { androidPlayStoreUrl, colorsDefinition, fonts, iosAppStoreUrl } from '../constants';
import { themeContext } from '../Context/context';
import Footer from './Main/Footer';

export type SeoPageSlug = 'pdf-to-quiz' | 'math-quiz-generator' | 'tutor-quiz-maker';

interface SeoPageConfig {
    slug: SeoPageSlug;
    badge: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    subtitle: string;
    steps: { title: string; detail: string }[];
    highlights: { title: string; detail: string }[];
    faqs: { question: string; answer: string }[];
}

const DEFAULT_TITLE = 'Skolarix - AI Powered Quiz & Learning Platform';
const DEFAULT_DESCRIPTION =
    'Skolarix is an AI-powered quiz and interactive learning platform designed to help students, creators, and learners master any subject fast.';
const DEFAULT_CANONICAL = 'https://www.skolarix.app/';

export const SEO_PAGES: Record<SeoPageSlug, SeoPageConfig> = {
    'pdf-to-quiz': {
        slug: 'pdf-to-quiz',
        badge: 'PDF & Notes to Quiz',
        title: 'Turn any PDF, DOCX, or lecture photo into a practice quiz',
        metaTitle: 'AI PDF to Quiz Generator | Skolarix',
        metaDescription:
            'Upload lecture PDFs, DOCX files, or textbook photos and generate custom Multiple Choice, True/False, and AI-graded Theory quizzes in seconds with Skolarix.',
        subtitle:
            'Stop passively rereading slides. Upload lecture PDFs, Word documents, or photos of handwritten notes and turn them into interactive active-recall quizzes in seconds.',
        steps: [
            {
                title: 'Upload your study material',
                detail: 'Select a PDF, DOCX document, image from your camera roll, or paste raw lecture notes.',
            },
            {
                title: 'Pick your quiz format & difficulty',
                detail: 'Choose Multiple Choice, True/False, or Theory questions, set difficulty, and enable Strict Mode if preparing for an exam.',
            },
            {
                title: 'Practice anywhere & export PDFs',
                detail: 'Review instant explanations, track weak topics, retake saved quizzes offline, and export quizzes or solutions to PDF.',
            },
        ],
        highlights: [
            {
                title: 'Works directly from PDFs, DOCX & photos',
                detail: 'Build quizzes grounded in your actual course handouts rather than generic textbook trivia.',
            },
            {
                title: 'AI grading for written theory answers',
                detail: 'Practice free-response answers and get clear, constructive feedback beyond simple multiple choice.',
            },
            {
                title: 'Strict Mode exam timer',
                detail: 'Hide feedback until submission and practice under real timed exam pressure.',
            },
            {
                title: 'Offline access & solution PDF export',
                detail: 'Saved quizzes stay cached on your device for offline retakes and printable PDF solution sheets.',
            },
        ],
        faqs: [
            {
                question: 'Which file types can I convert into quizzes?',
                answer: 'Skolarix supports PDF documents, DOCX files, images/photos of notes, pasted text, and topic prompts.',
            },
            {
                question: 'Can I study my generated quizzes offline?',
                answer: 'Yes. Generated and saved quizzes are cached locally on your phone so you can review solutions, retake quizzes, and export PDFs offline.',
            },
            {
                question: 'Does Skolarix support written theory questions?',
                answer: 'Yes. Along with Multiple Choice and True/False, you can generate open-ended Theory questions graded by AI with detailed feedback.',
            },
        ],
    },
    'math-quiz-generator': {
        slug: 'math-quiz-generator',
        badge: 'Math & STEM Practice',
        title: 'Generate math & STEM quizzes with clean LaTeX solutions',
        metaTitle: 'AI Math & STEM Quiz Generator with LaTeX | Skolarix',
        metaDescription:
            'Create algebra, calculus, physics, chemistry, and engineering practice quizzes with readable LaTeX equations, step-by-step explanations, and offline PDF export.',
        subtitle:
            'Practice calculus, physics, chemistry, and engineering problems with properly formatted equations, timed Strict Mode drills, and step-by-step explanations—even offline.',
        steps: [
            {
                title: 'Snap notes or upload STEM PDFs',
                detail: 'Upload problem sets, formula sheets, or lecture slides—or enter any STEM topic and difficulty level.',
            },
            {
                title: 'Solve formatted equations under pressure',
                detail: 'Equations render cleanly with full mathematical notation, optional countdown timers, and Strict Mode.',
            },
            {
                title: 'Review step-by-step solutions offline',
                detail: 'Inspect detailed explanations, check accuracy trends by topic, and export clean equation-formatted solution PDFs.',
            },
        ],
        highlights: [
            {
                title: 'Crisp mathematical notation (offline too)',
                detail: 'Fractions, integrals, matrices, and chemical formulas render cleanly using bundled KaTeX without broken symbols.',
            },
            {
                title: 'Adaptive & tiered difficulty',
                detail: 'Switch between Easy, Normal, Difficult, or Adaptive difficulty as your accuracy improves.',
            },
            {
                title: 'Theory & worked-step grading',
                detail: 'Test conceptual explanations alongside calculations with AI feedback on where your reasoning slipped.',
            },
            {
                title: 'Export printable problem & solution PDFs',
                detail: 'Save full quiz sheets and worked solutions as formatted PDFs for offline revision before exams.',
            },
        ],
        faqs: [
            {
                question: 'Do math formulas work when I have no internet connection?',
                answer: 'Yes. Skolarix bundles its math rendering engine locally so saved STEM quizzes and solutions display cleanly offline.',
            },
            {
                question: 'Which STEM subjects work well with Skolarix?',
                answer: 'Algebra, calculus, statistics, physics, chemistry, biology, computer science, and engineering courses.',
            },
            {
                question: 'Can I export math quizzes with equations to PDF?',
                answer: 'Yes. You can export both quiz questions and complete solution breakdowns to PDF directly from the app.',
            },
        ],
    },
    'tutor-quiz-maker': {
        slug: 'tutor-quiz-maker',
        badge: 'For Tutors & Study Groups',
        title: 'Create and share timed quizzes with students in seconds',
        metaTitle: 'Shared Quiz Maker for Tutors & Study Groups | Skolarix',
        metaDescription:
            'Turn your lesson notes or PDFs into a shareable quiz link and join code in one tap. Track participant submissions and export scores as CSV or PDF with Skolarix.',
        subtitle:
            'Generate a quiz from your lesson handout, share a quick join code or link with your class or study group, and inspect every submission in one place.',
        steps: [
            {
                title: 'Generate from your lesson material',
                detail: 'Upload your syllabus, PDF handout, or topic notes to build a tailored quiz in seconds.',
            },
            {
                title: 'Share a join link or code',
                detail: 'Publish as a Shared Quiz in one tap and send your class the join code or skolarix.app/join link.',
            },
            {
                title: 'Track attempts & export results',
                detail: 'View participant scores and submissions in real time and export attempt records to CSV or PDF.',
            },
        ],
        highlights: [
            {
                title: '1-tap join links & short codes',
                detail: 'Students join directly via a short quiz code or deep link with zero complex classroom setup.',
            },
            {
                title: 'CSV & PDF submission exports',
                detail: 'Download participant score reports for grading, tutoring records, or study group review.',
            },
            {
                title: 'Timed Strict Mode assessments',
                detail: 'Keep answers hidden until students complete the quiz under a fixed time limit.',
            },
            {
                title: 'AI-assisted Theory grading',
                detail: 'Combine quick Multiple Choice checks with open-ended Theory questions to test real comprehension.',
            },
        ],
        faqs: [
            {
                question: 'How do students or classmates join a shared quiz?',
                answer: 'Tap Share on any quiz to generate a short code and link. Participants open the code in the Skolarix mobile app to start immediately.',
            },
            {
                question: 'Can I export participant scores?',
                answer: 'Yes. You can review submissions in real time and export shared quiz results to CSV or PDF.',
            },
            {
                question: 'Is there a free plan to try Shared Quizzes?',
                answer: 'Yes. Free accounts include up to 3 active shared quizzes with up to 10 submissions per quiz, with unlimited sharing on Pro.',
            },
        ],
    },
};

const SLUG_ICONS: Record<SeoPageSlug, React.ReactNode> = {
    'pdf-to-quiz': <FileText size={14} />,
    'math-quiz-generator': <Sigma size={14} />,
    'tutor-quiz-maker': <Users size={14} />,
};

export const SeoLandingPage: React.FC<{ slug: SeoPageSlug }> = ({ slug }) => {
    const { colors, setColors } = useContext(themeContext);
    const [darkMode, setDarkMode] = useState(
        () => colors.background === colorsDefinition.dark.background
    );
    const page = SEO_PAGES[slug];
    const otherPages = (Object.keys(SEO_PAGES) as SeoPageSlug[])
        .filter((key) => key !== slug)
        .map((key) => SEO_PAGES[key]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [slug]);

    useEffect(() => {
        setColors(darkMode ? colorsDefinition.dark : colorsDefinition.light);
    }, [darkMode, setColors]);

    useEffect(() => {
        document.title = page.metaTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        metaDesc?.setAttribute('content', page.metaDescription);
        const canonical = document.querySelector('link[rel="canonical"]');
        canonical?.setAttribute('href', `https://www.skolarix.app/${page.slug}`);

        return () => {
            document.title = DEFAULT_TITLE;
            metaDesc?.setAttribute('content', DEFAULT_DESCRIPTION);
            canonical?.setAttribute('href', DEFAULT_CANONICAL);
        };
    }, [page]);

    return (
        <div
            style={{ backgroundColor: colors.background, color: colors.text, fontFamily: fonts.body }}
            className="min-h-screen w-full flex flex-col justify-between transition-colors duration-300"
        >
            <header
                className="sticky top-0 z-40 w-full backdrop-blur-md border-b"
                style={{
                    backgroundColor: darkMode ? 'rgba(9, 9, 11, 0.85)' : 'rgba(251, 251, 253, 0.85)',
                    borderColor: colors.border,
                }}
            >
                <div className="max-w-5xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
                    <Link to="/" className="flex items-center gap-3 no-underline">
                        <img src={appIcon} alt="Skolarix Logo" className="h-8 w-8 rounded-lg" />
                        <span className="font-bold text-lg tracking-tight" style={{ color: colors.text, fontFamily: fonts.display }}>
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

            <main className="flex-1 w-full max-w-5xl mx-auto px-5 md:px-8 pt-12 pb-6">
                {/* Hero */}
                <section className="max-w-3xl">
                    <span
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border mb-5"
                        style={{
                            backgroundColor: colors.primarySoft,
                            borderColor: `${colors.primary}33`,
                            color: colors.primary,
                            fontFamily: fonts.mono,
                        }}
                    >
                        {SLUG_ICONS[slug]}
                        {page.badge}
                    </span>

                    <h1
                        className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight"
                        style={{ fontFamily: fonts.display }}
                    >
                        {page.title}
                    </h1>

                    <p
                        className="mt-5 text-base sm:text-lg leading-relaxed"
                        style={{ color: colors.textSoft }}
                    >
                        {page.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-8">
                        <a
                            href={iosAppStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 inline-flex items-center gap-2"
                            style={{ backgroundColor: colors.primary }}
                        >
                            <span>Download for iPhone</span>
                            <ExternalLink size={15} />
                        </a>
                        <a
                            href={androidPlayStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-xl font-semibold text-sm border transition-opacity hover:opacity-80 inline-flex items-center gap-2"
                            style={{
                                backgroundColor: colors.backgroundRaised,
                                borderColor: colors.border,
                                color: colors.text,
                            }}
                        >
                            <span>Download for Android</span>
                            <ExternalLink size={15} />
                        </a>
                        <Link
                            to="/#pricing"
                            className="px-5 py-3 rounded-xl font-semibold text-sm border transition-opacity hover:opacity-80 inline-flex items-center gap-1.5"
                            style={{
                                backgroundColor: colors.backgroundSunken,
                                borderColor: colors.border,
                                color: colors.textSoft,
                            }}
                        >
                            <span>View plans</span>
                            <ArrowRight size={15} />
                        </Link>
                    </div>
                </section>

                {/* 3-Step Workflow */}
                <section className="mt-16">
                    <p
                        className="text-xs font-semibold uppercase tracking-widest mb-4"
                        style={{ color: colors.primary, fontFamily: fonts.mono }}
                    >
                        How it works
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {page.steps.map((step, index) => (
                            <div
                                key={step.title}
                                className="rounded-2xl border p-6"
                                style={{
                                    backgroundColor: colors.backgroundRaised,
                                    borderColor: colors.border,
                                }}
                            >
                                <span
                                    className="text-xs font-semibold"
                                    style={{ color: colors.primary, fontFamily: fonts.mono }}
                                >
                                    0{index + 1}
                                </span>
                                <h2 className="font-bold text-lg mt-2" style={{ fontFamily: fonts.display }}>
                                    {step.title}
                                </h2>
                                <p className="text-sm mt-2 leading-relaxed" style={{ color: colors.textSoft }}>
                                    {step.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Highlights */}
                <section className="mt-16">
                    <p
                        className="text-xs font-semibold uppercase tracking-widest mb-4"
                        style={{ color: colors.primary, fontFamily: fonts.mono }}
                    >
                        Built for real study
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {page.highlights.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border p-6 flex items-start gap-3.5"
                                style={{
                                    backgroundColor: colors.backgroundRaised,
                                    borderColor: colors.border,
                                }}
                            >
                                <CheckCircle2 size={18} color={colors.primary} className="mt-0.5 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-base">{item.title}</h3>
                                    <p className="text-sm mt-1.5 leading-relaxed" style={{ color: colors.textSoft }}>
                                        {item.detail}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section className="mt-16">
                    <p
                        className="text-xs font-semibold uppercase tracking-widest mb-4"
                        style={{ color: colors.primary, fontFamily: fonts.mono }}
                    >
                        Frequently asked questions
                    </p>
                    <div className="flex flex-col gap-3">
                        {page.faqs.map((item) => (
                            <div
                                key={item.question}
                                className="rounded-2xl border p-5"
                                style={{
                                    backgroundColor: colors.backgroundRaised,
                                    borderColor: colors.border,
                                }}
                            >
                                <h3 className="font-semibold text-base">{item.question}</h3>
                                <p className="text-sm mt-2 leading-relaxed" style={{ color: colors.textSoft }}>
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Cross-links */}
                <section className="mt-16">
                    <p
                        className="text-xs font-semibold uppercase tracking-widest mb-4"
                        style={{ color: colors.textSoft, fontFamily: fonts.mono }}
                    >
                        More ways to use Skolarix
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {otherPages.map((other) => (
                            <Link
                                key={other.slug}
                                to={`/${other.slug}`}
                                className="rounded-2xl border p-5 flex items-center justify-between gap-4 transition-opacity hover:opacity-85 no-underline"
                                style={{
                                    backgroundColor: colors.backgroundSunken,
                                    borderColor: colors.border,
                                    color: colors.text,
                                }}
                            >
                                <div>
                                    <p className="text-xs font-semibold" style={{ color: colors.primary }}>
                                        {other.badge}
                                    </p>
                                    <p className="font-semibold text-sm mt-1">{other.title}</p>
                                </div>
                                <ArrowRight size={16} color={colors.textSoft} className="shrink-0" />
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SeoLandingPage;
