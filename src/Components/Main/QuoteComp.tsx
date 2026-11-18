import { useContext } from 'react'
import { Box, Text } from '../UI'
import { themeContext } from '../../Context/context'
import { fonts } from '../../constants'

// ---------- SHARED PIECES ----------
const QuoteComp = ({ showIcon, text }: { showIcon: boolean, text: string }) => {
    const { colors } = useContext(themeContext);
    return (
        <Box className='w-full flex justify-center'>
            <div
                className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full border'
                style={{
                    backgroundColor: colors.primarySoft,
                    borderColor: colors.border,
                }}
            >
                {showIcon && (
                    <span
                        className='w-2 h-2 rounded-full shrink-0'
                        style={{ backgroundColor: colors.success }}
                    />
                )}
                <Text
                    className='text-center text-xs font-semibold tracking-wider'
                    style={{ color: colors.primary, fontFamily: fonts.mono }}
                >
                    {text}
                </Text>
            </div>
        </Box>
    )
}

export default QuoteComp