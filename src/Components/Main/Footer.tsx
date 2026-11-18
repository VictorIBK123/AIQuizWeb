import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { themeContext } from "../../Context/context"
import { Box, Text } from "../UI"
import appIcon from '../../assets/app-icon-real.png'
import { scrollToSection } from "../../utils/Scrolltosection"
import { fonts } from "../../constants"

// ---------- FOOTER ----------
const footerColumns: {
    title: string;
    links: { text: string; href: string; slug: string | null; isRoute?: boolean }[];
}[] = [
    {
        title: 'NAVIGATE', links: [
            { text: 'Features', href: '/#features', slug: 'features' },
            { text: 'FAQ', href: '/#faq', slug: 'faq' },
            { text: 'Support', href: '/support', slug: null, isRoute: true },
            { text: 'Email Support', href: 'mailto:app.skolarix@gmail.com', slug: null },
            { text: 'WhatsApp', href: 'https://wa.me/2349079172441', slug: null },
        ]
    },
    {
        title: 'LEGAL', links: [
            { text: 'Privacy policy', href: '/legal/privacy-policy', slug: null, isRoute: true },
            { text: 'Terms of use', href: '/legal/terms-of-use', slug: null, isRoute: true },
            { text: 'Subscription policy', href: '/legal/subscription-policy', slug: null, isRoute: true },
            { text: 'Delete account', href: '/del-acct', slug: null, isRoute: true },
        ]
    },
    {
        title: 'FOLLOW', links: [
            { text: 'Instagram', href: '#', slug: null },
        ]
    },
]

const Footer = () => {
    const { colors } = useContext(themeContext)
    const location = useLocation()
    const isHome = location.pathname === '/'

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
                            {col.links.map((l) =>
                                l.isRoute ? (
                                    <Link to={l.href} key={l.text}>
                                        <Text className='text-sm'>{l.text}</Text>
                                    </Link>
                                ) : l.slug ? (
                                    isHome ? (
                                        <a
                                            href={`#${l.slug}`}
                                            key={l.text}
                                            onClick={scrollToSection(l.slug)}
                                        >
                                            <Text className='text-sm'>{l.text}</Text>
                                        </a>
                                    ) : (
                                        <Link to={l.href} key={l.text}>
                                            <Text className='text-sm'>{l.text}</Text>
                                        </Link>
                                    )
                                ) : (
                                    <a
                                        href={l.href}
                                        key={l.text}
                                        target={l.href.startsWith('http') ? '_blank' : undefined}
                                        rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    >
                                        <Text className='text-sm'>{l.text}</Text>
                                    </a>
                                )
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box variant='bare' className='flex justify-between flex-wrap gap-3 max-w-6xl mx-auto mt-12 pt-6 border-t' style={{ borderColor: colors.border }}>
                <Text variant='soft' className='text-xs'>© 2026 VictorIbk Labs. All rights reserved.</Text>
                <a href='mailto:app.skolarix@gmail.com' className='text-xs underline underline-offset-2' style={{ color: colors.textSoft }}>
                    Support: app.skolarix@gmail.com
                </a>
            </Box>
        </Box>
    )
}

export default Footer
