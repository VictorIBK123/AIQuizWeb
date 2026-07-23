
import Screenshot1 from '../../assets/screenshot1.png'
import Screenshot2 from '../../assets/screenshot2.png'
import Screenshot3 from '../../assets/screenshot3.png'
import Screenshot4 from '../../assets/screenshot4.png'
import Screenshot5 from '../../assets/screenshot5.png'
import Screenshot6 from '../../assets/screenshot6.png'
import Screenshot7 from '../../assets/screenshot7.png'
import Screenshot8 from '../../assets/screenshot8.png'
import { Box, Text } from '../UI'
import { themeContext } from '../../Context/context'
import { useContext } from 'react'
import { Reveal } from '../Motion'
import QuoteComp from './QuoteComp'
import Header from './Header'

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
        <Box variant='bare' id='screenshots' className='scroll-mt-24 flex flex-col items-center mt-32 px-3'>
            <Reveal><QuoteComp text='INSIDE THE APP' showIcon={false} /></Reveal>
            <Reveal delay={0.05}>
                <Box className='flex mt-3'>
                    <Header>A look at AIQuiz</Header>
                </Box>
            </Reveal>
            <Box
                variant='bare'
                className='flex flex-nowrap gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory mt-14 px-4 max-w-5xl w-full pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            >
                {screenshotDetails.map((item, i) => (
                    <Reveal key={i} delay={i * 0.08} className='flex-none snap-center'>
                        <Box variant='bare' className='flex flex-col items-center'>
                            <img
                                src={item.img}
                                alt={item.name}
                                className='rounded-2xl object-cover h-90 w-45 border transition-transform duration-200 hover:scale-105'
                                style={{ borderColor: colors.border }}
                            />
                            <Text variant='soft' className='text-xs mt-3'>{item.name.toUpperCase()}</Text>
                        </Box>
                    </Reveal>
                ))}
            </Box>
        </Box>
    )
}

export default ScreenshotGallery