import { useContext } from "react";
import { themeContext } from "../../Context/context";
import Screenshot9 from "../../assets/screenshot9.png";
import { Check } from "lucide-react";
import { fonts } from "../../constants";

const AppShot = () => {
    const { colors } = useContext(themeContext);

    return (
        <div
            className="relative w-full rounded-3xl border p-6 sm:p-8 flex flex-col items-center justify-center"
            style={{
                backgroundColor: colors.backgroundSunken,
                borderColor: colors.border,
            }}
        >
            <div
                className="rounded-3xl p-1.5 border shadow-lg"
                style={{
                    backgroundColor: colors.backgroundRaised,
                    borderColor: colors.border,
                }}
            >
                <img
                    src={Screenshot9}
                    alt="Skolarix App Interface"
                    className="rounded-[20px] object-cover w-[250px] sm:w-[290px]"
                />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium"
                    style={{
                        backgroundColor: colors.backgroundRaised,
                        borderColor: colors.border,
                        color: colors.text,
                        fontFamily: fonts.mono,
                    }}
                >
                    <Check size={13} color={colors.success} />
                    <span>PDF, DOCX &amp; Photos</span>
                </div>
                <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium"
                    style={{
                        backgroundColor: colors.backgroundRaised,
                        borderColor: colors.border,
                        color: colors.text,
                        fontFamily: fonts.mono,
                    }}
                >
                    <Check size={13} color={colors.success} />
                    <span>Strict Mode &amp; Quiz Codes</span>
                </div>
            </div>
        </div>
    );
};

export default AppShot;