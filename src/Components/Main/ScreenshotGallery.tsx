
import Screenshot1 from '../../assets/ios-screenshots/01-welcome.png'
import Screenshot2 from '../../assets/ios-screenshots/02-share-quiz.png'
import Screenshot3 from '../../assets/ios-screenshots/03-strict-mode.png'
import Screenshot4 from '../../assets/ios-screenshots/04-scores.png'
import Screenshot5 from '../../assets/ios-screenshots/05-explanations.png'
import Screenshot6 from '../../assets/ios-screenshots/06-manage-attempts.png'
import Screenshot7 from '../../assets/ios-screenshots/07-attempt-history.png'
import { Text } from '../UI'
import { themeContext } from '../../Context/context'
import { useContext } from 'react'
import { Reveal } from '../Motion'
import Header from './Header'
import { fonts } from '../../constants'

const screenshotDetails = [
    { name: 'Welcome', img: Screenshot1 },
    { name: 'Share Quizzes', img: Screenshot2 },
    { name: 'Strict Mode', img: Screenshot3 },
    { name: 'Score Breakdown', img: Screenshot4 },
    { name: 'Explanations', img: Screenshot5 },
    { name: 'Quiz Attempts', img: Screenshot6 },
    { name: 'Attempt History', img: Screenshot7 },
]

const ScreenshotGallery = () => {
    const { colors } = useContext(themeContext)
    return (
        <section id='screenshots' className='scroll-mt-24 max-w-6xl mx-auto px-5 md:px-8 pt-24 pb-8'>
            <Reveal>
                <div className='max-w-xl mb-10'>
                    <p
                        className='text-xs font-semibold uppercase tracking-widest mb-3'
                        style={{ color: colors.primary, fontFamily: fonts.mono }}
                    >
                        Inside the App
                    </p>
                    <Header>Designed for calm focus</Header>
                </div>
            </Reveal>

            <div
                className='rounded-2xl border py-8 px-4 sm:px-6'
                style={{
                    backgroundColor: colors.backgroundSunken,
                    borderColor: colors.border,
                }}
            >
                <div className='flex flex-nowrap gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                    {screenshotDetails.map((item, i) => (
                        <div key={item.name} className='flex-none snap-center flex flex-col items-center'>
                            <div
                                className='rounded-2xl p-1 border shadow-sm transition-transform duration-200 hover:-translate-y-1'
                                style={{
                                    backgroundColor: colors.backgroundRaised,
                                    borderColor: colors.border,
                                }}
                            >
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className='rounded-xl object-contain aspect-[480/990] w-44 sm:w-48'
                                />
                            </div>
                            <Text
                                variant='soft'
                                className='text-xs mt-3 tracking-wide'
                                style={{ fontFamily: fonts.mono }}
                            >
                                {String(i + 1).padStart(2, '0')} · {item.name}
                            </Text>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ScreenshotGallery