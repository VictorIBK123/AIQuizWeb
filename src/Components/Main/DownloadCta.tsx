import { Text } from "../UI"
import { themeContext } from "../../Context/context"
import { Reveal } from "../Motion"
import { useContext, useState } from "react"
import { ComingSoonModal } from "../ComingSoonModal"

// ---------- DOWNLOAD CTA ----------
const DownloadCta = () => {
    const { colors } = useContext(themeContext)
    const [showIosModal, setShowIosModal] = useState(false)

    return (
        <section id='download' className='scroll-mt-24 max-w-6xl mx-auto px-5 md:px-8 pt-24 pb-8'>
            <Reveal>
                <div
                    className='rounded-3xl border px-8 py-14 sm:p-16 text-center'
                    style={{
                        backgroundColor: colors.backgroundRaised,
                        borderColor: colors.border,
                    }}
                >
                    <Text className='text-3xl sm:text-4xl font-bold tracking-tight'>
                        Start studying smarter today.
                    </Text>
                    <Text variant='soft' className='mt-3 text-base max-w-md mx-auto'>
                        Your next quiz is one upload away — available on Android and coming to iPhone.
                    </Text>
                    <div className='flex justify-center gap-3.5 flex-wrap mt-8'>
                        <a
                            href='https://play.google.com/store/apps/details?id=com.victoribk.AIQuizApp'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='px-6 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 inline-flex items-center justify-center min-w-52'
                            style={{ backgroundColor: colors.primary }}
                        >
                            Download for Android
                        </a>
                        <button
                            onClick={() => setShowIosModal(true)}
                            className='px-6 py-3 rounded-xl font-semibold text-sm border transition-opacity hover:opacity-80 inline-flex items-center justify-center min-w-52 cursor-pointer'
                            style={{
                                backgroundColor: colors.backgroundSunken,
                                borderColor: colors.border,
                                color: colors.text,
                            }}
                        >
                            Download for iPhone
                        </button>
                    </div>
                </div>
            </Reveal>

            <ComingSoonModal
                isOpen={showIosModal}
                onClose={() => setShowIosModal(false)}
            />
        </section>
    )
}

export default DownloadCta