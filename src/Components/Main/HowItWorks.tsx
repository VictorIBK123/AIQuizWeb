import { useContext } from "react"
import { fonts } from "../../constants"
import { themeContext } from "../../Context/context"
import { Reveal } from "../Motion"
import { Text } from "../UI"
import Header from "./Header"

const steps = [
    {
        num: '01',
        title: 'Add your material',
        desc: 'Upload a PDF or DOCX file, snap a photo of your notes, paste text, or enter a topic.',
    },
    {
        num: '02',
        title: 'Customize & generate',
        desc: 'Pick Multiple Choice, True/False, or Theory, adjust difficulty and Strict Mode timers, and generate in seconds.',
    },
    {
        num: '03',
        title: 'Practice, share & review',
        desc: 'Get detailed AI grading, share a quiz code with classmates, or retake past quizzes offline anytime.',
    },
]

const HowItWorks = () => {
    const { colors } = useContext(themeContext)
    return (
        <section id='how-it-works' className='scroll-mt-24 max-w-6xl mx-auto px-5 md:px-8 pt-24 pb-8'>
            <Reveal>
                <div className='max-w-xl mb-12'>
                    <p
                        className='text-xs font-semibold uppercase tracking-widest mb-3'
                        style={{ color: colors.primary, fontFamily: fonts.mono }}
                    >
                        Workflow
                    </p>
                    <Header>Three steps from notes to mastery</Header>
                </div>
            </Reveal>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {steps.map((s, i) => (
                    <Reveal key={s.num} delay={i * 0.08}>
                        <div
                            className='pt-6 border-t flex flex-col gap-2.5'
                            style={{ borderColor: colors.border }}
                        >
                            <span
                                className='text-xs font-bold tracking-wider'
                                style={{ color: colors.primary, fontFamily: fonts.mono }}
                            >
                                {s.num}
                            </span>
                            <Text className='font-semibold text-lg'>{s.title}</Text>
                            <Text variant='soft' className='text-sm leading-relaxed'>
                                {s.desc}
                            </Text>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}

export default HowItWorks