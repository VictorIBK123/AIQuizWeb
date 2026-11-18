import { useContext } from "react"
import { fonts } from "../../constants"
import { themeContext } from "../../Context/context"
import { Box, Text } from "../UI"

const Features = () => {
    const { colors } = useContext(themeContext)
    return (
        <Box className='mt-14 flex flex-col items-center justify-center px-4'>
            <div className='w-full max-w-4xl border-t' style={{ borderColor: colors.border }} />
            <Box className='py-8 w-full max-w-4xl grid grid-cols-3 gap-4 sm:gap-8'>
                <Box className='text-center'>
                    <Text className='text-2xl sm:text-3xl font-bold'>{`<10s`}</Text>
                    <Text className='mt-1.5 text-xs sm:text-sm' variant='soft' style={{ fontFamily: fonts.body }}>To generate a quiz</Text>
                </Box>
                <Box className='text-center border-x px-2' style={{ borderColor: colors.border }}>
                    <Text className='text-2xl sm:text-3xl font-bold'>5+</Text>
                    <Text className='mt-1.5 text-xs sm:text-sm' variant='soft' style={{ fontFamily: fonts.body }}>Study inputs &amp; formats</Text>
                </Box>
                <Box className='text-center'>
                    <Text className='text-2xl sm:text-3xl font-bold'>Offline</Text>
                    <Text className='mt-1.5 text-xs sm:text-sm' variant='soft' style={{ fontFamily: fonts.body }}>Ready &amp; PDF export</Text>
                </Box>
            </Box>
            <div className='w-full max-w-4xl border-t mb-24' style={{ borderColor: colors.border }} />
        </Box>
    )
}

export default Features