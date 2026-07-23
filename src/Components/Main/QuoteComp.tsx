import { useContext } from 'react'
import { Dot } from 'lucide-react'
import { Box, Text } from '../UI'
import { themeContext } from '../../Context/context'

// ---------- SHARED PIECES ----------
const QuoteComp = ({ showIcon, text }: { showIcon: boolean, text: string }) => {
    const { colors } = useContext(themeContext);
    return (
        <Box className='w-full flex justify-center'>
            <Box variant='small' className='px-4 flex pr-4 items-center flex-row'>
                {showIcon && <Dot size={50} color={colors.success} />}
                <Text className='text-center text-sm' variant='soft'>
                    {text}
                </Text>
            </Box>
        </Box>
    )
}

export default QuoteComp