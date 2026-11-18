import {
    FileText,
    ShieldCheck,
    Users,
    GraduationCap,
    ListChecks,
    Download,
    BarChart3,
    Smartphone,
    SunMoon,
} from 'lucide-react';
import { Text } from '../UI';
import { themeContext } from '../../Context/context';
import { fonts } from '../../constants';
import { Reveal } from '../Motion';
import { useContext } from 'react';
import Header from './Header';

const inputFormats = ['PDF slides', 'Word (DOCX)', 'Camera & Photos', 'Pasted Notes', 'Keywords'];
const questionModes = ['Multiple Choice', 'True / False', 'AI-Graded Theory', 'Adaptive Difficulty'];

const corePillars = [
    {
        icon: ShieldCheck,
        title: 'Strict Mode for Exam Conditions',
        desc: 'Practice under real exam focus with countdown timers and answers withheld until you finish submitting.',
    },
    {
        icon: Users,
        title: 'Shared Quizzes by Code',
        desc: 'Host live quizzes in seconds, share a join code or link with classmates, and track scores with PDF & CSV exports.',
    },
    {
        icon: GraduationCap,
        title: 'Matched to Your Level',
        desc: 'Question depth and terminology adapt to your academic status — from Primary & High School to University & Pro.',
    },
];

const compactUtilities = [
    {
        icon: Download,
        title: 'Offline Study & PDF Export',
        desc: 'Retake saved and past quizzes offline anytime or export questions and solutions.',
    },
    {
        icon: BarChart3,
        title: 'Analytics & Streaks',
        desc: 'Track weak subjects, score trends, daily study streaks, and milestones.',
    },
    {
        icon: Smartphone,
        title: 'Apple, Google & Email Sync',
        desc: 'Your library stays synced across iOS, Android, and Web automatically.',
    },
    {
        icon: SunMoon,
        title: 'Light & Dark Themes',
        desc: 'Switch effortlessly between crisp paper light and low-glare dark mode.',
    },
];

const BentoFeatures = () => {
    const { colors } = useContext(themeContext);

    return (
        <section id="features" className="scroll-mt-24 max-w-6xl mx-auto px-5 md:px-8 pt-24 pb-8">
            <Reveal>
                <div className="max-w-2xl mb-12">
                    <p
                        className="text-xs font-semibold uppercase tracking-widest mb-3"
                        style={{ color: colors.primary, fontFamily: fonts.mono }}
                    >
                        Capabilities
                    </p>
                    <Header>Everything you need from material to mastery</Header>
                    <Text variant="soft" className="mt-3 text-base leading-relaxed">
                        Built for active recall — ingest your notes in any format, test yourself seriously, and keep every session ready offline.
                    </Text>
                </div>
            </Reveal>

            {/* Primary 2-Column Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <Reveal>
                    <div
                        className="rounded-2xl border p-7 h-full flex flex-col justify-between gap-6"
                        style={{
                            backgroundColor: colors.backgroundRaised,
                            borderColor: colors.border,
                        }}
                    >
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <FileText size={18} color={colors.primary} />
                                <Text className="font-semibold text-lg">Any study material goes in</Text>
                            </div>
                            <Text variant="soft" className="text-sm leading-relaxed">
                                Turn lecture slides, textbook photos, handwritten pages, pasted notes, or plain keywords into structured quizzes in seconds.
                            </Text>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {inputFormats.map((item) => (
                                <span
                                    key={item}
                                    className="px-3 py-1.5 rounded-lg border text-xs font-medium"
                                    style={{
                                        backgroundColor: colors.backgroundSunken,
                                        borderColor: colors.border,
                                        color: colors.text,
                                        fontFamily: fonts.mono,
                                    }}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.05}>
                    <div
                        className="rounded-2xl border p-7 h-full flex flex-col justify-between gap-6"
                        style={{
                            backgroundColor: colors.backgroundRaised,
                            borderColor: colors.border,
                        }}
                    >
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <ListChecks size={18} color={colors.primary} />
                                <Text className="font-semibold text-lg">Modes built for real retention</Text>
                            </div>
                            <Text variant="soft" className="text-sm leading-relaxed">
                                Choose your question format, difficulty curve, custom timer, and per-question or end-of-quiz answer validation.
                            </Text>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {questionModes.map((item) => (
                                <span
                                    key={item}
                                    className="px-3 py-1.5 rounded-lg border text-xs font-medium"
                                    style={{
                                        backgroundColor: colors.backgroundSunken,
                                        borderColor: colors.border,
                                        color: colors.text,
                                        fontFamily: fonts.mono,
                                    }}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Secondary 3-Column Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {corePillars.map((pillar, i) => (
                    <Reveal key={pillar.title} delay={0.05 * i}>
                        <div
                            className="rounded-2xl border p-6 h-full flex flex-col gap-3"
                            style={{
                                backgroundColor: colors.backgroundRaised,
                                borderColor: colors.border,
                            }}
                        >
                            <pillar.icon size={19} color={colors.primary} />
                            <Text className="font-semibold text-base mt-1">{pillar.title}</Text>
                            <Text variant="soft" className="text-sm leading-relaxed">
                                {pillar.desc}
                            </Text>
                        </div>
                    </Reveal>
                ))}
            </div>

            {/* Compact Bottom Utilities Strip */}
            <div
                className="rounded-2xl border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x"
                style={{
                    backgroundColor: colors.backgroundRaised,
                    borderColor: colors.border,
                }}
            >
                {compactUtilities.map((util) => (
                    <div
                        key={util.title}
                        className="p-6 flex flex-col gap-2"
                        style={{ borderColor: colors.border }}
                    >
                        <util.icon size={17} color={colors.textSoft} />
                        <Text className="font-semibold text-sm mt-1">{util.title}</Text>
                        <Text variant="soft" className="text-xs leading-relaxed">
                            {util.desc}
                        </Text>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BentoFeatures;