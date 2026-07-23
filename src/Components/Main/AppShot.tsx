import { useContext } from "react"
import { themeContext } from "../../Context/context"
import { Box, Text } from "../UI"
import Screenshot9 from '../../assets/screenshot9.png'
import { SquareCheck } from "lucide-react"


const AppShot = () => {
    const { colors } = useContext(themeContext)
    return (
        <Box className='relative h-200 w-90 flex mx-auto mt-12'>
            <img src={Screenshot9} alt="App Screenshot" className='rounded-2xl object-cover h-200 w-90' />
            <Box variant='small' className='animate-bounce absolute w-40 rounded-lg -left-15 h-10 top-9 flex items-center justify-center'>
                <SquareCheck color={colors.success} />
                <Text className='ml-2.5' variant='white'>PDF uploaded</Text>
            </Box>
            <Box variant='small' className='animate-bounce absolute w-50 rounded-lg -right-15 h-10 bottom-9 flex items-center justify-center'>
                <SquareCheck color={colors.success} />
                <Text className='ml-2.5' variant='white'>10 questions ready</Text>
            </Box>
        </Box>
    )
}


export default AppShot