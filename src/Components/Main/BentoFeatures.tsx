import {
    Sparkles,
    FileText,
    File as FileIcon,
    ClipboardList,
    BarChart3,
    CheckCircle2,
    Smartphone,
    SunMoon,
    GraduationCap,
    ListChecks,
    TrendingUp
} from 'lucide-react';
import { Text, Box } from '../UI';
import { themeContext } from '../../Context/context';
import { fonts } from '../../constants';
import { Reveal } from '../Motion';
import { useContext } from 'react';

const bentoFeatures = [
    {
        icon: Sparkles,
        title: 'Generate AI quizzes',
        desc: 'Turn any study material into a full quiz in seconds, no manual question-writing required.',
        big: true
    },
    {
        icon: FileText,
        title: 'PDF support',
        desc: 'Upload slides or scanned notes as a PDF.'
    },
    {
        icon: FileIcon,
        title: 'Document support',
        desc: 'Word docs work just as well.'
    },
    {
        icon: ClipboardList,
        title: 'Paste text',
        desc: 'No file? Paste notes or enter keywords directly.'
    },
    {
        icon: BarChart3,
        title: 'Difficulty levels',
        desc: 'Choose easy, medium, or hard to match your learning goals.'
    },
    {
        icon: ListChecks,
        title: 'Theory, MCQ & True/False',
        desc: 'Answer detailed theory questions or test yourself with multiple-choice and true/false quizzes.',
        wide: true
    },
    {
        icon: GraduationCap,
        title: 'Matched to your level',
        desc: 'Every quiz is tailored to your academic level and learning needs.',
        wide: true
    },
    {
        icon: TrendingUp,
        title: 'Track your progress',
        desc: 'Monitor your scores, identify weak topics, and watch your performance improve over time.',
        wide: true
    },
    {
        icon: CheckCircle2,
        title: 'Instant feedback',
        desc: 'Get your score and AI explanations immediately after every quiz.',
        wide: true
    },
    {
        icon: Smartphone,
        title: 'Study anywhere',
        desc: 'Learn whenever you have a few spare minutes, wherever you are.',
        wide: true
    },
    {
        icon: SunMoon,
        title: 'Light & dark mode',
        desc: 'Switch themes anytime to match your style or reduce eye strain.',
        wide: true
    }
];

const BentoFeatures = () => {
    const { colors } = useContext(themeContext);

    return (
        <Box
            variant="bare"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 auto-rows-auto max-w-5xl w-full self-center mt-10 px-3"
        >
            {bentoFeatures.map((f, i) => (
                <Reveal
                    key={i}
                    delay={i * 0.06}
                    className={`min-w-0 overflow-hidden ${
                        f.big ? 'sm:col-span-2 sm:row-span-2' : ''
                    } ${f.wide ? 'sm:col-span-2' : ''}`}
                >
                    <Box
                        variant="card"
                        className={`p-6 h-full min-w-0 flex flex-col gap-3 justify-start transition-all duration-200 hover:-translate-y-1 hover:shadow-lg overflow-hidden ${f.big ? 'sm:min-h-[340px]' : ''}`}
                    >
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: colors.primarySoft }}
                        >
                            <f.icon size={20} color={colors.primary} />
                        </div>

                        <Text
                            className={`font-bold wrap-break-word ${
                                f.big ? 'text-xl' : 'text-base'
                            }`}
                        >
                            {f.title}
                        </Text>

                        <Text
                            variant="soft"
                            className="text-sm wrap-break-word leading-relaxed"
                            style={{ fontFamily: fonts.body }}
                        >
                            {f.desc}
                        </Text>
                    </Box>
                </Reveal>
            ))}
        </Box>
    );
};

export default BentoFeatures;