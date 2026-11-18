
import Screenshot1 from '../../assets/screenshot1.png'
import Screenshot2 from '../../assets/screenshot2.png'
import Screenshot3 from '../../assets/screenshot3.png'
import Screenshot4 from '../../assets/screenshot4.png'
import Screenshot5 from '../../assets/screenshot5.png'
import Screenshot6 from '../../assets/screenshot6.png'
import Screenshot7 from '../../assets/screenshot7.png'
import Screenshot8 from '../../assets/screenshot8.png'
import { Text } from '../UI'
import { themeContext } from '../../Context/context'
import { useContext } from 'react'
import { Reveal } from '../Motion'
import Header from './Header'
import { fonts } from '../../constants'

const screenshotDetails = [
    { name: 'Sign In', img: Screenshot1 },
    { name: 'Home', img: Screenshot2 },
    { name: 'Upload', img: Screenshot3 },
    { name: 'Quiz', img: Screenshot4 },
    { name: 'Result', img: Screenshot5 },
    { name: 'Quiz Review', img: Screenshot6 },
    { name: 'History', img: Screenshot7 },
    { name: 'Attempt History', img: Screenshot8 },
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
                                    className='rounded-xl object-cover h-84 w-42'
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