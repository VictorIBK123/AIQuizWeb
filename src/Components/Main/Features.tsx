import { fonts } from "../../constants"
import { Box, Text } from "../UI"

const Features = () => {
    return (
        <Box className='mt-8 flex flex-col justify-center'>
            <hr className='w-full border-t border-gray-700' />
            <Box className='py-7 flex self-center justify-between'>
                <Box>
                    <Text className='text-3xl text-center font-bold'>{`<10s`}</Text>
                    <Text className='mt-2 text-center' variant='soft' style={{ fontFamily: fonts.body }}>To generate a quiz</Text>
                </Box>
                <Box variant='bare'>
                    <Text className='text-3xl text-center font-bold'>5</Text>
                    <Text className='mt-2 text-center' variant='soft' style={{ fontFamily: fonts.body }}>Supported input types</Text>
                </Box>
                <Box>
                    <Text className='text-3xl text-center font-bold'>Free</Text>
                    <Text className='mt-2 text-center' variant='soft' style={{ fontFamily: fonts.body }}>To get started</Text>
                </Box>
            </Box>
            <hr className='w-full border-t mb-32 border-gray-700' />
        </Box>
    )
}

export default Features