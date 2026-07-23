import { fonts } from "../../constants"
import { Reveal } from "../Motion"
import { Box, Text } from "../UI"
import Header from "./Header"
import QuoteComp from "./QuoteComp"
const steps = [
    { num: 1, title: 'Upload or paste', desc: 'Bring a PDF, DOCX, Image, Keyword or just paste the notes you already have.' },
    { num: 2, title: 'AI reads it', desc: "AIQuiz works through the material and picks out what's worth testing." },
    { num: 3, title: 'Practice', desc: "Take the quiz it builds, see what stuck, revisit what didn't." },
]

const HowItWorks = () => {
    return (
        <Box variant='bare' id='how-it-works' className='scroll-mt-24 flex flex-col items-center mt-32 px-3'>
            <Reveal><QuoteComp text='THREE STEPS' showIcon={false} /></Reveal>
            <Reveal delay={0.05}>
                <Box className='flex mt-3'>
                    <Header>How it works</Header>
                </Box>
            </Reveal>
            <Box variant='bare' className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl w-full mt-14'>
                {steps.map((s, i) => (
                    <Reveal key={s.num} delay={i * 0.1}>
                        <Box variant='bare' className='flex flex-col items-center text-center px-5'>
                            <Box variant='small' className='w-13 h-13 rounded-full flex items-center justify-center mb-5'>
                                <Text className='font-bold text-lg' variant='blue'>{s.num}</Text>
                            </Box>
                            <Text className='font-bold text-lg mb-2'>{s.title}</Text>
                            <Text variant='soft' className='text-sm max-w-60' style={{ fontFamily: fonts.body }}>{s.desc}</Text>
                        </Box>
                    </Reveal>
                ))}
            </Box>
        </Box>
    )
}

export default HowItWorks