import { useContext } from "react";
import { Box, Button, Text } from "../UI";
import { authContext, themeContext } from "../../Context/context";
import { scrollToSection } from "../../utils/Scrolltosection";

const AppActions = ({ onCreateAccount, isPremium }: { onCreateAccount: () => void; isPremium: boolean }) => {
    const { user } = useContext(authContext);
    const { colors } = useContext(themeContext);
    return (
        <Box variant='bare' className='flex flex-wrap items-center gap-3 mt-7'>
            <Button
                variant='primary'
                className='px-6 py-3 rounded-xl font-semibold text-sm'
                onClick={scrollToSection('download')}
            >
                <Text variant='fixedWhite' className='text-sm font-semibold whitespace-nowrap'>
                    Download the app
                </Text>
            </Button>
            {(!isPremium && !user) && (
                <Button
                    variant='ghost'
                    className='px-6 py-3 rounded-xl border text-sm font-semibold'
                    style={{
                        backgroundColor: colors.backgroundRaised,
                        borderColor: colors.border,
                    }}
                    onClick={onCreateAccount}
                >
                    <Text variant='white' className='text-sm font-semibold whitespace-nowrap'>
                        Create free account
                    </Text>
                </Button>
            )}
        </Box>
    )
}

export default AppActions