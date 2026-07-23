import { Text } from "../UI"

const Header = ({ children }: { children: React.ReactNode }) => {
    return (
        <Text variant='white' className='mx-auto max-w-lg text-center font-bold text-5xl'>
            {children}
        </Text>
    )
}

export default Header