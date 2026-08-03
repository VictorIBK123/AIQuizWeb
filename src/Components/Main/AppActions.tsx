import { useContext } from "react";
import { Box, Button, Text } from "../UI";
import { authContext } from "../../Context/context";

const AppActions = ({ onCreateAccount, isPremium }: { onCreateAccount: () => void; isPremium: boolean }) => {
    const { user } = useContext(authContext);
    return (
        <Box variant='bare' className='justify-center flex mt-6'>
            <Button variant='primary' className='w-50'>
                <Text variant='fixedWhite' className='whitespace-nowrap'>Download the app</Text>
            </Button>
            {(!isPremium && !user) && (
                <Button variant='ghost' className='h-13 w-50 ml-5' onClick={onCreateAccount}>
                    <Text variant='white' className='whitespace-nowrap'>Create account</Text>
                </Button>
            )}
        </Box>
    )
}

export default AppActions