import { Box, Text } from "../UI"
import { themeContext } from "../../Context/context"
import { fonts } from "../../constants"
import { Reveal } from "../Motion"
import { useContext, useState } from "react"
import { ComingSoonModal } from "../ComingSoonModal"

// ---------- DOWNLOAD CTA ----------
const DownloadCta = () => {
    const { colors } = useContext(themeContext)
    const [showIosModal, setShowIosModal] = useState(false)

    return (
        <Reveal className='px-3 mt-32'>
            <Box id='download' className='max-w-4xl w-full mx-auto rounded-3xl p-14 md:p-20 text-center' style={{ backgroundColor: colors.primary }}>
                <Text className='text-3xl md:text-4xl font-bold' style={{ color: '#fff' }}>Start studying smarter today.</Text>
                <Text className='mt-3' style={{ color: 'rgba(255,255,255,0.85)', fontFamily: fonts.body }}>Your next quiz is one upload away.</Text>
                <Box variant='bare' className='flex justify-center gap-4 flex-wrap mt-8'>
                    <a href='https://play.google.com/store/apps/details?id=com.victoribk.AIQuizApp' target='_blank' rel='noopener noreferrer' className='px-6 py-3 rounded-lg font-bold text-center w-56 bg-white transition-transform duration-200 hover:scale-105 inline-block' style={{ color: colors.primary }}>
                        Download for Android
                    </a>
                    <button
                        onClick={() => setShowIosModal(true)}
                        className='px-6 py-3 rounded-lg font-bold text-center w-56 border transition-transform duration-200 hover:scale-105 inline-block cursor-pointer'
                        style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.15)' }}
                    >
                        Download for iPhone
                    </button>
                </Box>
            </Box>

            <ComingSoonModal
                isOpen={showIosModal}
                onClose={() => setShowIosModal(false)}
            />
        </Reveal>
    )
}

export default DownloadCta