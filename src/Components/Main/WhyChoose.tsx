import {
    Sparkles, Smartphone, Clock
} from 'lucide-react';
import { themeContext } from '../../Context/context';
import { useContext } from 'react';
import { Box, Text } from '../UI';
import { Reveal } from '../Motion';
import QuoteComp from './QuoteComp';
import Header from './Header';
import { fonts } from '../../constants';

const benefits = [
    { icon: Clock, title: 'Save hours writing questions', desc: 'The part that used to take an evening now takes as long as an upload.' },
    { icon: Sparkles, title: 'Learn what matters', desc: 'Questions come from your material, not a generic bank.' },
    { icon: Smartphone, title: 'Practice anywhere', desc: 'Five minutes between classes is enough for a quick round.' },
]

const WhyChoose = () => {
    const { colors } = useContext(themeContext)
    return (
        <Box variant='bare' className='flex flex-col items-center mt-32 px-3'>
            <Reveal><QuoteComp text='WHY SKOLARIX' showIcon={false} /></Reveal>
            <Reveal delay={0.05}>
                <Box className='flex mt-3 max-w-lg'>
                    <Header>Built around the parts of studying that cost the most time</Header>
                </Box>
            </Reveal>
            <Box variant='bare' className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full mt-14 items-center'>
                <Reveal>
                    <Box className='rounded-3xl p-10 min-h-70 flex flex-col justify-end' style={{ backgroundColor: colors.primary }}>
                        <Text className='text-2xl font-bold' style={{ color: '#fff' }}>Every quiz, built from your own material</Text>
                        <Text className='mt-2' style={{ color: 'rgba(255,255,255,0.85)', fontFamily: fonts.body }}>
                            Not a generic question bank — questions pulled straight from what you uploaded.
                        </Text>
                    </Box>
                </Reveal>
                <Box variant='bare' className='flex flex-col gap-7'>
                    {benefits.map((b, i) => (
                        <Reveal key={i} delay={i * 0.08}>
                            <Box variant='bare' className='flex gap-4 items-start'>
                                <div className='w-10 h-10 rounded-xl flex items-center justify-center flex-none' style={{ backgroundColor: colors.primarySoft }}>
                                    <b.icon size={18} color={colors.primary} />
                                </div>
                                <div>
                                    <Text className='font-bold'>{b.title}</Text>
                                    <Text variant='soft' className='text-sm mt-1' style={{ fontFamily: fonts.body }}>{b.desc}</Text>
                                </div>
                            </Box>
                        </Reveal>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default WhyChoose