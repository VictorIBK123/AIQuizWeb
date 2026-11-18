import { fonts } from "../../constants"
import { Text } from "../UI"

const Header = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <Text
            variant='white'
            className={`font-bold text-3xl sm:text-4xl tracking-tight leading-tight ${className}`}
            style={{ fontFamily: fonts.display }}
        >
            {children}
        </Text>
    )
}

export default Header