import { Text } from "../UI"
import Header from "./Header"
import { useContext } from "react"
import { themeContext } from "../../Context/context"
import { Reveal } from "../Motion"
import { fonts } from "../../constants"

// ---------- TESTIMONIALS ----------
const testimonials = [
    { quote: 'I uploaded my whole database management system slide deck and had a 20-question quiz before I finished my Sprite.', name: 'Titilope Balikis', role: 'Computer Science Student' },
    { quote: "It's an innovative app that makes learning easier and faster by answering knowledge gaps.", name: 'Akintoye Peterpaul', role: 'Computer Science Student' },
    { quote: "Really cool 🤭 \nMy favorite is the PDF upload feature. It’s just for me to be uploading my lecturers’ slides and keep practicing🙂‍↕️🙂‍↕️", name: 'Akinniyi Ayomide', role: 'Mathematics Student' },
]

const getInitials = (name: string) =>
    name
        .split(/\s+/)
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

const Testimonials = () => {
    const { colors } = useContext(themeContext)
    return (
        <section className='max-w-6xl mx-auto px-5 md:px-8 pt-24 pb-8'>
            <Reveal>
                <div className='max-w-xl mb-12'>
                    <p
                        className='text-xs font-semibold uppercase tracking-widest mb-3'
                        style={{ color: colors.primary, fontFamily: fonts.mono }}
                    >
                        Testimonials
                    </p>
                    <Header>What learners are saying</Header>
                </div>
            </Reveal>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {testimonials.map((t, i) => (
                    <Reveal key={i} delay={i * 0.06}>
                        <div
                            className='rounded-2xl border p-7 flex flex-col justify-between gap-6 h-full'
                            style={{
                                backgroundColor: colors.backgroundRaised,
                                borderColor: colors.border,
                            }}
                        >
                            <div>
                                <Text style={{ color: '#D97706', letterSpacing: '2px' }} className='text-xs mb-3'>★★★★★</Text>
                                <Text className='text-sm leading-relaxed'>{t.quote}</Text>
                            </div>
                            <div className='flex items-center gap-3 pt-4 border-t' style={{ borderColor: colors.border }}>
                                <div
                                    className='w-9 h-9 rounded-full flex-none flex items-center justify-center text-xs font-semibold border'
                                    style={{
                                        backgroundColor: colors.backgroundSunken,
                                        borderColor: colors.border,
                                        color: colors.text,
                                        fontFamily: fonts.mono,
                                    }}
                                >
                                    {getInitials(t.name)}
                                </div>
                                <div>
                                    <Text className='font-semibold text-sm'>{t.name}</Text>
                                    <Text variant='soft' className='text-xs'>{t.role}</Text>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}

export default Testimonials