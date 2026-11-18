import { Sparkles, Smartphone, Clock } from 'lucide-react';
import { themeContext } from '../../Context/context';
import { useContext } from 'react';
import { Text } from '../UI';
import { Reveal } from '../Motion';
import Header from './Header';
import { fonts } from '../../constants';

const benefits = [
    {
        icon: Clock,
        title: 'Save hours writing practice questions',
        desc: 'What used to take an entire evening of outlining and quizzing yourself now happens seconds after uploading.',
    },
    {
        icon: Sparkles,
        title: 'Built strictly from your own notes',
        desc: 'Not a generic trivia bank — questions, terminology, and AI theory feedback come straight from your course material.',
    },
    {
        icon: Smartphone,
        title: 'Study offline & test in Strict Mode',
        desc: 'Practice on the bus with offline saved quizzes, run Strict Mode timers, or share a quiz code with your study group.',
    },
];

const WhyChoose = () => {
    const { colors } = useContext(themeContext);
    return (
        <section className='max-w-6xl mx-auto px-5 md:px-8 pt-24 pb-8'>
            <Reveal>
                <div className='max-w-xl mb-12'>
                    <p
                        className='text-xs font-semibold uppercase tracking-widest mb-3'
                        style={{ color: colors.primary, fontFamily: fonts.mono }}
                    >
                        Why Skolarix
                    </p>
                    <Header>Built around active recall, not passive rereading</Header>
                </div>
            </Reveal>

            <div className='grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch'>
                <Reveal className='md:col-span-5'>
                    <div
                        className='rounded-2xl border p-8 sm:p-10 h-full flex flex-col justify-between gap-8'
                        style={{
                            backgroundColor: colors.backgroundSunken,
                            borderColor: colors.border,
                        }}
                    >
                        <span
                            className='self-start text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border'
                            style={{
                                backgroundColor: colors.backgroundRaised,
                                borderColor: colors.border,
                                color: colors.textSoft,
                                fontFamily: fonts.mono,
                            }}
                        >
                            Active Recall
                        </span>

                        <div>
                            <Text className='text-2xl sm:text-3xl font-bold leading-snug tracking-tight'>
                                Stop skimming highlights. Start proving what stuck.
                            </Text>
                            <Text variant='soft' className='mt-3 text-sm leading-relaxed'>
                                Every session adapts to your educational level and surfaces the exact concepts you need to review before exam day.
                            </Text>
                        </div>
                    </div>
                </Reveal>

                <div
                    className='md:col-span-7 rounded-2xl border divide-y flex flex-col justify-center'
                    style={{
                        backgroundColor: colors.backgroundRaised,
                        borderColor: colors.border,
                    }}
                >
                    {benefits.map((b, i) => (
                        <div
                            key={b.title}
                            className={`p-6 sm:p-7 flex gap-4 items-start ${i < benefits.length - 1 ? 'border-b' : ''}`}
                            style={{ borderColor: colors.border }}
                        >
                            <div
                                className='w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 mt-0.5'
                                style={{
                                    backgroundColor: colors.backgroundSunken,
                                    borderColor: colors.border,
                                }}
                            >
                                <b.icon size={17} color={colors.primary} />
                            </div>
                            <div>
                                <Text className='font-semibold text-base'>{b.title}</Text>
                                <Text variant='soft' className='text-sm mt-1 leading-relaxed'>
                                    {b.desc}
                                </Text>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;