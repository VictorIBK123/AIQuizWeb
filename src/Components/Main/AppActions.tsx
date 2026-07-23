import { Box, Button, Text } from "../UI";

const AppActions = ({ onCreateAccount, isPremium }: { onCreateAccount: () => void; isPremium: boolean }) => {
    return (
        <Box variant='bare' className='justify-center flex mt-6'>
            <Button variant='primary' className='w-50'>
                <Text variant='fixedWhite'>Download the app</Text>
            </Button>
            {!isPremium && (
                <Button variant='ghost' className='h-13 w-50 ml-5' onClick={onCreateAccount}>
                    <Text variant='white'>Create account</Text>
                </Button>
            )}
        </Box>
    )
}

export default AppActions