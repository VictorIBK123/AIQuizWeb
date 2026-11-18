import { Text } from "../UI"
import { themeContext } from "../../Context/context"
import { fonts } from "../../constants"
import { Reveal } from "../Motion"

import Header from "./Header"
import { useContext } from "react"
import { Link } from "react-router-dom"

// ---------- FAQ ----------
const faqs = [
    { q: 'What file formats are supported?', a: 'PDF, Word (DOCX), images/camera photos, pasted notes, and topic keywords.' },
    { q: 'Is Skolarix free?', a: 'Yes! You can generate quizzes from notes and topics, host up to 3 active shared quizzes, run 2 Strict Mode sessions a day, export PDFs, and study offline for free. Pro unlocks file/image uploads and higher limits.' },
    { q: 'What is Strict Mode?', a: 'Strict Mode creates distraction-free, exam-style conditions with timers and withheld answer feedback until you finish submitting.' },
    { q: 'Can I share quizzes with friends or students?', a: 'Yes. Host any quiz as a Shared Quiz to get a join code and link. Anyone with the code can take it while responses are open, and you can review and export results.' },
    { q: 'How accurate are the AI-generated questions?', a: 'Questions and theory grading feedback are generated directly from the material and educational level you set.' },
    { q: 'Does Skolarix work offline?', a: 'Generating a new quiz requires an internet connection, while saved quizzes and past quiz history can be reviewed, retaken, and exported offline with automatic sync.' },
]

const FAQ = () => {
    const { colors } = useContext(themeContext)
    return (
        <section id='faq' className='scroll-mt-24 max-w-6xl mx-auto px-5 md:px-8 pt-24 pb-8'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-10'>
                <div className='md:col-span-4'>
                    <Reveal>
                        <p
                            className='text-xs font-semibold uppercase tracking-widest mb-3'
                            style={{ color: colors.primary, fontFamily: fonts.mono }}
                        >
                            Questions
                        </p>
                        <Header>Frequently asked</Header>
                        <Text variant='soft' className='text-sm mt-4 leading-relaxed'>
                            Still need help?{' '}
                            <a href='mailto:app.skolarix@gmail.com' className='underline underline-offset-2 font-medium' style={{ color: colors.primary }}>
                                app.skolarix@gmail.com
                            </a>{' '}
                            or visit our{' '}
                            <Link to='/support' className='underline underline-offset-2 font-medium' style={{ color: colors.primary }}>
                                Support Center
                            </Link>
                            .
                        </Text>
                    </Reveal>
                </div>

                <div
                    className='md:col-span-8 rounded-2xl border px-6'
                    style={{
                        backgroundColor: colors.backgroundRaised,
                        borderColor: colors.border,
                    }}
                >
                    {faqs.map((f, i) => (
                        <details
                            key={f.q}
                            className={`group py-5 ${i < faqs.length - 1 ? 'border-b' : ''}`}
                            style={{ borderColor: colors.border }}
                        >
                            <summary className='flex justify-between items-center gap-4 cursor-pointer list-none'>
                                <Text className='font-semibold text-sm sm:text-base'>{f.q}</Text>
                                <span
                                    className='transition-transform duration-200 group-open:rotate-45 text-xl shrink-0'
                                    style={{ color: colors.textSoft }}
                                >
                                    +
                                </span>
                            </summary>
                            <Text variant='soft' className='text-sm mt-3 leading-relaxed'>{f.a}</Text>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQ