import { Box, Text } from "../UI"
import Header from "./Header"
import { useContext } from "react"
import { themeContext } from "../../Context/context"
import { Reveal } from "../Motion"
import QuoteComp from "./QuoteComp"
import { fonts } from "../../constants"

// ---------- TESTIMONIALS ----------
const testimonials = [
    { quote: 'I uploaded my whole database management system slide deck and had a 20-question quiz before I finished my Sprite.', name: 'Titilope Balikis', role: 'Computer Science Student' },
    { quote: "It's an innovative app that makes learning easier and faster by answering knowledge gaps.", name: 'Akintoye Peterpaul', role: 'Computer Science Student' },
    { quote: "Really cool 🤭 \nMy favorite is the PDF upload feature. It’s just for me to be uploading my lecturers’ slides and keep practicing🙂‍↕️🙂‍↕️", name: 'Akinniyi Ayomide', role: 'Mathematics Student' },
]

const Testimonials = () => {
    const { colors } = useContext(themeContext)
    return (
        <Box variant='bare' className='flex flex-col items-center mt-32 px-3'>
            <Reveal><QuoteComp text='FROM PEOPLE USING IT' showIcon={false} /></Reveal>
            <Reveal delay={0.05}>
                <Box className='flex mt-3'>
                    <Header>What early users are saying</Header>
                </Box>
            </Reveal>
            <Box variant='bare' className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl w-full mt-14'>
                {testimonials.map((t, i) => (
                    <Reveal key={i} delay={i * 0.08}>
                        <Box variant='card' className='p-7 flex flex-col gap-4 h-full transition-all duration-200 hover:-translate-y-1'>
                            <Text style={{ color: '#FFB100', letterSpacing: '2px' }} className='text-sm'>★★★★★</Text>
                            <Text className='text-sm leading-relaxed' style={{ fontFamily: fonts.body }}>{t.quote}</Text>
                            <div className='flex items-center gap-3 mt-2'>
                                <div className='w-9 h-9 rounded-full flex-none' style={{ backgroundColor: colors.primary }} />
                                <div>
                                    <Text className='font-bold text-sm'>{t.name}</Text>
                                    <Text variant='soft' className='text-xs' style={{ fontFamily: fonts.body }}>{t.role}</Text>
                                </div>
                            </div>
                        </Box>
                    </Reveal>
                ))}
            </Box>
        </Box>
    )
}

export default Testimonials