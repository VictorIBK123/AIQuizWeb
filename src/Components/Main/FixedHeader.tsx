import { Menu, Moon, Sun, X } from "lucide-react";
import { AuthModal } from "../AuthModal";
import { MobileMenu } from "../MobileMenu";
import appIcon from '../../assets/app-icon-real.png'
import { SignInSuccessToast } from "../SignInSuccessToast";
import { Box, Button, Text } from "../UI";
import { useContext, useEffect, useState } from "react";
import { authContext, themeContext } from "../../Context/context";
import { colorsDefinition, } from "../../constants";
import { AccountMenu } from "../AccountMenu";
import { scrollToSection } from "../../utils/Scrolltosection";

const FixedHeader = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [successEmail, setSuccessEmail] = useState('');
    const { setUser, user, setAccessToken } = useContext(authContext);
    const { setColors } = useContext(themeContext);
    const { colors } = useContext(themeContext);
    useEffect(() => {
        setColors(darkMode ? colorsDefinition.dark : colorsDefinition.light);
    }, [darkMode])

    const handleSignOut = () => {
        localStorage.clear();
        setUser(null);
        setAccessToken(null);
    };

    const centerLinks = [
        { text: 'Features', slug: 'features' },
        { text: 'How it works', slug: 'how-it-works' },
        { text: 'Screenshots', slug: 'screenshots' },
        { text: 'Pricing', slug: 'pricing' },
        { text: 'FAQ', slug: 'faq' },
    ]

    return (
        <>
            <Box variant='fixed-header' className='z-50 fixed top-0 left-0 w-screen h-19 text-white flex items-center justify-between px-10'>
                <div className='flex items-center flex-row'>
                    <img src={appIcon} alt="Logo" className="h-8 rounded-lg" />
                    <Text className='ml-4 font-bold'>Skolarix</Text>
                </div>
                <div className='hidden md:flex items-center flex-row'>
                    {centerLinks.map((link) => (
                        <Text key={link.slug} className='ml-4'>
                            <a href={`#${link.slug}`} onClick={scrollToSection(link.slug)}>{link.text}</a>
                        </Text>
                    ))}
                </div>
                <div className='flex items-center flex-row'>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        className='relative flex items-center w-14 h-8 rounded-full px-1 transition-colors duration-300 cursor-pointer'
                        style={{ backgroundColor: darkMode ? '#334155' : colors.primary }}
                    >
                        <span
                            className='flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300'
                            style={{ transform: darkMode ? 'translateX(24px)' : 'translateX(0px)' }}
                        >
                            {darkMode ? <Moon size={14} color='#334155' /> : <Sun size={14} color={colors.success} />}
                        </span>
                    </button>

                    {user ? (
                        <AccountMenu email={user.email} onSignOut={handleSignOut} />
                    ) : (
                        <>
                            <Button variant='ghost' className='ml-4 max-md:hidden' onClick={() => setShowAuth(true)}>
                                <Text>Sign in</Text>
                            </Button>
                        </>
                    )}

                    <button onClick={() => setMobileOpen((o) => !o)} className='md:hidden ml-4 cursor-pointer'>
                        {mobileOpen ? <X color={colors.text} /> : <Menu color={colors.text} />}
                    </button>
                </div>
                <hr className='absolute bottom-0 left-0 w-full border-t border-gray-700' />
            </Box>

            <MobileMenu
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                links={centerLinks}
                onSignInClick={() => setShowAuth(true)}
            />
            <AuthModal
                isOpen={showAuth}
                onClose={() => setShowAuth(false)}
                onAuthSuccess={(email) => setSuccessEmail(email)}
            />
            <SignInSuccessToast
                visible={!!successEmail}
                email={successEmail}
                onDismiss={() => setSuccessEmail('')}
            />
        </>
    )
}

export default FixedHeader