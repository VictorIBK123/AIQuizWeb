import { Sparkles, FileText, File as FileIcon, ClipboardList, BarChart3, CheckCircle2, Smartphone } from 'lucide-react';
import { Text, Box } from '../UI';
import { themeContext } from '../../Context/context';
import { fonts } from '../../constants';
import { Reveal } from '../Motion';
import { useContext } from 'react';
const bentoFeatures = [
    { icon: Sparkles, title: 'Generate AI quizzes', desc: 'Turn any study material into a full quiz in seconds — no manual question-writing required.', big: true },
    { icon: FileText, title: 'PDF support', desc: 'Upload slides or scanned notes as a PDF.' },
    { icon: FileIcon, title: 'Document support', desc: 'Word docs work just as well.' },
    { icon: ClipboardList, title: 'Paste text', desc: 'No file? Paste notes or enter keyword directly.' },
    { icon: BarChart3, title: 'Difficulty levels', desc: 'Easy, medium, or hard — your call.' },
    { icon: CheckCircle2, title: 'Instant feedback', desc: 'Score and explanation the moment you finish.', wide: true },
    { icon: Smartphone, title: 'Study anywhere', desc: 'A spare five minutes is enough to review.', wide: true },
]

const BentoFeatures = () => {
    const { colors } = useContext(themeContext)
    return (
        <Box variant='bare' className='grid grid-cols-2 md:grid-cols-4 gap-5 auto-rows-[170px] max-w-5xl w-full self-center mt-10 px-3'>
            {bentoFeatures.map((f, i) => (
                <Reveal
                    key={i}
                    delay={i * 0.06}
                    className={`${f.big ? 'col-span-2 row-span-2' : ''} ${f.wide ? 'col-span-2' : ''}`}
                >
                    <Box
                        variant='card'
                        className={`p-6 flex flex-col gap-2 h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${f.big ? 'justify-start' : ''}`}
                    >
                        <div className='w-10 h-10 rounded-xl flex items-center justify-center' style={{ backgroundColor: colors.primarySoft }}>
                            <f.icon size={20} color={colors.primary} />
                        </div>
                        <Text className={`font-bold mt-2 ${f.big ? 'text-xl' : 'text-base'}`}>{f.title}</Text>
                        <Text variant='soft' className='text-sm' style={{ fontFamily: fonts.body }}>{f.desc}</Text>
                    </Box>
                </Reveal>
            ))}
        </Box>
    )
}

export default BentoFeatures