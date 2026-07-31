import { useContext } from "react"
import { themeContext } from "../../Context/context"
import { Box, Text } from "../UI"
import appIcon from '../../assets/app-icon.png'
import { scrollToSection } from "../../utils/Scrolltosection"
import { fonts } from "../../constants"

// ---------- FOOTER ----------
const footerColumns = [
    {
        title: 'NAVIGATE', links: [
            { text: 'Features', href: '#features', slug: 'features' },
            { text: 'FAQ', href: '#faq', slug: 'faq' },
            { text: 'Contact', href: '#', slug: null }, // no dedicated contact section yet
        ]
    },
    {
        title: 'LEGAL', links: [
            { text: 'Privacy policy', href: '#', slug: null },
            { text: 'Terms of service', href: '#', slug: null },
        ]
    },
    {
        title: 'FOLLOW', links: [
            { text: 'X', href: '#', slug: null },
            { text: 'Instagram', href: '#', slug: null },
        ]
    },
]

const Footer = () => {
    const { colors } = useContext(themeContext)
    return (
        <Box variant='bare' className='mt-32 px-6 md:px-16 pb-10'>
            <hr className='w-full border-t mb-14' style={{ borderColor: colors.border }} />
            <Box variant='bare' className='grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto'>
                <Box variant='bare'>
                    <Box className='flex items-center flex-row'>
                        <img src={appIcon} alt='Logo' className='h-7 rounded-lg' />
                        <Text className='ml-3 font-bold'>Skolarix</Text>
                    </Box>
                    <Text variant='soft' className='text-sm mt-3 max-w-60' style={{ fontFamily: fonts.body }}>
                        Turn any PDF, Image, document, or block of notes into a quiz built from your material.
                    </Text>
                </Box>
                {footerColumns.map((col) => (
                    <Box variant='bare' key={col.title}>
                        <Text variant='soft' className='text-xs mb-4'>{col.title}</Text>
                        <Box variant='bare' className='flex flex-col gap-3'>
                            {col.links.map((l) => (
                                <a
                                    href={l.href}
                                    key={l.text}
                                    onClick={l.slug ? scrollToSection(l.slug) : undefined}
                                >
                                    <Text className='text-sm'>{l.text}</Text>
                                </a>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box variant='bare' className='flex justify-between flex-wrap gap-3 max-w-6xl mx-auto mt-12 pt-6 border-t' style={{ borderColor: colors.border }}>
                <Text variant='soft' className='text-xs'>© 2026 Skolarix. All rights reserved.</Text>
            </Box>
        </Box>
    )
}

export default Footer