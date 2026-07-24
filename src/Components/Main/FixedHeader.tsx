import { Menu, X } from "lucide-react";
import { AuthModal } from "../AuthModal";
import { MobileMenu } from "../MobileMenu";
import appIcon from '../../assets/app-icon.png'
import { SignInSuccessToast } from "../SignInSuccessToast";
import { Box, Button, Text } from "../UI";
import Switch from '@mui/material/Switch';
import { useContext, useEffect, useState } from "react";
import { authContext, themeContext } from "../../Context/context";
import { colorsDefinition } from "../../constants";
import { AccountMenu } from "../AccountMenu";
import { scrollToSection } from "../../utils/Scrolltosection";

const FixedHeader = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [successEmail, setSuccessEmail] = useState('');
    const { setUser, user, setAccessToken } = useContext(authContext);
    const { setColors } = useContext(themeContext);

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
            <Box variant='card' className='z-50 fixed top-0 left-0 w-screen h-19 text-white flex items-center justify-between px-10'>
                <div className='flex items-center flex-row'>
                    <img src={appIcon} alt="Logo" className="h-8 rounded-lg" />
                    <Text className='ml-4 font-bold'>AIQuiz</Text>
                </div>
                <div className='hidden md:flex items-center flex-row'>
                    {centerLinks.map((link) => (
                        <Text key={link.slug} className='ml-4'>
                            <a href={`#${link.slug}`} onClick={scrollToSection(link.slug)}>{link.text}</a>
                        </Text>
                    ))}
                </div>
                <div className='flex items-center flex-row'>
                    <Switch onChange={(_e, checked) => setDarkMode(checked)} defaultChecked color='primary' />

                    {user ? (
                        <AccountMenu email={user.email} onSignOut={handleSignOut} />
                    ) : (
                        <>
                            <Button variant='ghost' className='ml-4 max-md:hidden' onClick={() => setShowAuth(true)}>
                                <Text>Sign in</Text>
                            </Button>
                            <Button variant='primary' className='ml-4'>
                                <Text>Download</Text>
                            </Button>
                        </>
                    )}

                    <button onClick={() => setMobileOpen((o) => !o)} className='md:hidden ml-4 cursor-pointer'>
                        {mobileOpen ? <X color='white' /> : <Menu color='white' />}
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