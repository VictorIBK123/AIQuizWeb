import { useContext } from "react";
import { themeContext } from "../../Context/context";
import { Box, Text } from "../UI";
import Screenshot9 from "../../assets/screenshot9.png";
import { SquareCheck } from "lucide-react";

const AppShot = () => {
    const { colors } = useContext(themeContext);

    return (
        <Box className="relative flex justify-center items-center w-full mt-12 px-4">
            <div className="relative w-fit">
                <img
                    src={Screenshot9}
                    alt="App Screenshot"
                    className="rounded-2xl object-cover w-[280px] sm:w-[320px] md:w-[340px]"
                />

                <Box
                    variant="small"
                    className="animate-bounce absolute top-8 -left-4 sm:-left-10 md:-left-16 h-10 px-3 rounded-lg flex items-center justify-center whitespace-nowrap"
                >
                    <SquareCheck color={colors.success} size={18} />
                    <Text className="ml-2" variant="white">
                        PDF uploaded
                    </Text>
                </Box>

                <Box
                    variant="small"
                    className="animate-bounce absolute bottom-8 -right-4 sm:-right-10 md:-right-16 h-10 px-3 rounded-lg flex items-center justify-center whitespace-nowrap"
                >
                    <SquareCheck color={colors.success} size={18} />
                    <Text className="ml-2" variant="white">
                        10 questions ready
                    </Text>
                </Box>
            </div>
        </Box>
    );
};

export default AppShot;