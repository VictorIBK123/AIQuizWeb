import { Box, Text } from "../UI"
import { themeContext } from "../../Context/context"
import { fonts } from "../../constants"
import { Reveal } from "../Motion"

import Header from "./Header"
import { useContext } from "react"
import QuoteComp from "./QuoteComp"

// ---------- FAQ ----------
const faqs = [
    { q: 'What file formats are supported?', a: 'PDF, Images and common document formats like Word, plus plain pasted text.' },
    { q: 'Is Skolarix free?', a: 'Yes, you can generate and take quizzes for free. Premium options are available for heavier use.' },
    { q: 'How accurate are the AI-generated questions?', a: 'Questions are generated directly from the material you provide.' },
    { q: 'Can I use my own notes?', a: "That's the main use case, paste your own notes or upload your own files." },
    { q: 'Does Skolarix work offline?', a: 'Generating a new quiz needs a connection, but quizzes already generated can be taken offline.' },
    { q: 'How many quizzes can I generate?', a: 'Free accounts get a generous daily amount; Pro accounts get more quiz generations.' },
]

const FAQ = () => {
    const { colors } = useContext(themeContext)
    return (
        <Box variant='bare' id='faq' className='scroll-mt-24 flex flex-col items-center mt-32 px-3'>
            <Reveal><QuoteComp text='QUESTIONS' showIcon={false} /></Reveal>
            <Reveal delay={0.05}>
                <Box className='flex mt-3'>
                    <Header>Frequently asked</Header>
                </Box>
            </Reveal>
            <Box variant='bare' className='max-w-2xl w-full mt-14'>
                {faqs.map((f, i) => (
                    <Reveal key={i} delay={i * 0.04}>
                        <details className='group py-5 border-b' style={{ borderColor: colors.border }}>
                            <summary className='flex justify-between items-center cursor-pointer list-none'>
                                <Text className='font-bold'>{f.q}</Text>
                                <span className='transition-transform duration-200 group-open:rotate-45 text-xl' style={{ color: colors.primary }}>+</span>
                            </summary>
                            <Text variant='soft' className='text-sm mt-3' style={{ fontFamily: fonts.body }}>{f.a}</Text>
                        </details>
                    </Reveal>
                ))}
            </Box>
        </Box>
    )
}

export default FAQ