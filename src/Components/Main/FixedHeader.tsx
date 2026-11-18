import { Menu, Moon, Sun, X } from "lucide-react";
import { AuthModal } from "../AuthModal";
import { MobileMenu } from "../MobileMenu";
import appIcon from '../../assets/app-icon-real.png'
import { SignInSuccessToast } from "../SignInSuccessToast";
import { Button, Text } from "../UI";
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
            <header
                className='z-50 fixed top-0 left-0 w-full h-16 backdrop-blur-md border-b transition-colors duration-200'
                style={{
                    backgroundColor: darkMode ? 'rgba(9, 9, 11, 0.85)' : 'rgba(251, 251, 253, 0.88)',
                    borderColor: colors.border,
                }}
            >
                <div className='max-w-6xl mx-auto h-full px-5 md:px-8 flex items-center justify-between gap-4'>
                    <a href='#' className='flex items-center gap-2.5'>
                        <img src={appIcon} alt="Skolarix Logo" className="h-7 w-7 rounded-md" />
                        <Text className='font-semibold text-base tracking-tight'>Skolarix</Text>
                    </a>

                    <nav aria-label="Main navigation" className='hidden md:flex items-center gap-7'>
                        {centerLinks.map((link) => (
                            <a
                                key={link.slug}
                                href={`#${link.slug}`}
                                onClick={scrollToSection(link.slug)}
                                className='text-sm font-medium transition-opacity hover:opacity-75'
                                style={{ color: colors.textSoft }}
                            >
                                {link.text}
                            </a>
                        ))}
                    </nav>

                    <div className='flex items-center gap-3'>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            className='relative flex items-center w-12 h-7 rounded-full px-1 transition-colors duration-200 cursor-pointer border'
                            style={{
                                backgroundColor: colors.backgroundSunken,
                                borderColor: colors.border,
                            }}
                        >
                            <span
                                className='flex items-center justify-center w-5 h-5 rounded-full shadow-xs transition-transform duration-200'
                                style={{
                                    backgroundColor: colors.backgroundRaised,
                                    transform: darkMode ? 'translateX(19px)' : 'translateX(0px)',
                                }}
                            >
                                {darkMode ? <Moon size={11} color={colors.textSoft} /> : <Sun size={11} color={colors.text} />}
                            </span>
                        </button>

                        {user ? (
                            <AccountMenu email={user.email} onSignOut={handleSignOut} />
                        ) : (
                            <Button
                                variant='ghost'
                                className='max-md:hidden text-sm font-medium px-3.5 py-1.5 rounded-lg border'
                                style={{
                                    backgroundColor: colors.backgroundRaised,
                                    borderColor: colors.border,
                                    color: colors.text,
                                }}
                                onClick={() => setShowAuth(true)}
                            >
                                Sign in
                            </Button>
                        )}

                        <button
                            onClick={() => setMobileOpen((o) => !o)}
                            className='md:hidden p-1.5 rounded-md cursor-pointer'
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        >
                            {mobileOpen ? <X size={20} color={colors.text} /> : <Menu size={20} color={colors.text} />}
                        </button>
                    </div>
                </div>
            </header>

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