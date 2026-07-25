import React, { createContext, useState } from "react"
import { colorsDefinition } from "../constants"

export const themeContext = createContext({
    colors: colorsDefinition.light,
    setColors: (_colors: typeof colorsDefinition.light) => { }
})
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [colorsLocal, setColorsLocal] = useState(colorsDefinition.light)

    return (
        <themeContext.Provider value={{ colors: colorsLocal, setColors: setColorsLocal }}>
            {children}
        </themeContext.Provider>
    )
}


export const authContext = createContext({
    user: null as { email: string } | null,
    setUser: (_user: { email: string } | null) => { },
    accessToken: null as string | null,
    setAccessToken: (_token: string | null) => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ email: string } | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    return (
        <authContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
            {children}
        </authContext.Provider>
    )
}

// ----- UI context (global actions like opening signup / starting checkout) -----
export const uiContext = createContext({
    openSignup: () => { },
    requestUpgrade: () => { },
    isSubscribing: false,
    isPremium: false,
    subscription: null as any,
})