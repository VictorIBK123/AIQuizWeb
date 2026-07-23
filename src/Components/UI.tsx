import type React from "react"
import { fonts } from "../constants";
import { twMerge } from "tailwind-merge";
import { useContext } from "react";
import { themeContext } from "../Context/context";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'ghost';
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: 'white' | 'blue' | 'soft' | 'fixedWhite';
}

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'bare' | 'small' | 'card';
}

export const Input: React.FC<InputProps> = ({ className, style, ...props }) => {
    const { colors } = useContext(themeContext);
    return (
        <input
            style={{
                '--input-bg': colors.backgroundSunken,
                '--input-border': colors.border,
                '--input-text': colors.text,
                '--input-focus': colors.primary,
                ...style,
            } as React.CSSProperties}
            className={twMerge(
                'bg-(--input-bg) text-(--input-text) border border-(--input-border) rounded-lg px-4 py-2.5 outline-none w-full text-sm focus:border-(--input-focus) transition-all duration-200 focus:scale-[1.01]',
                className || ''
            )}
            {...props}
        />
    )
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, style, ...props }) => {
    const { colors } = useContext(themeContext);
    const styles = {
        ghost: {
            '--bg-border-color': colors.textSoft,
            '--bg-border-width': '1px',
            '--bg-color': colors.backgroundSunken,
            '--bg-hover-color': colors.backgroundRaised,
        },
        primary: {
            '--bg-color': colors.primary,
            '--bg-hover-color': colors.secondary,
            '--bg-border-color': 'transparent',
            '--bg-border-width': '0px',
        },
    };

    return (
        <button
            style={{ ...(styles[variant] as React.CSSProperties), ...style }}
            className={twMerge(
                'border-(length:--bg-border-width) border-(--bg-border-color) bg-(--bg-color) px-4 py-2 rounded-lg hover:bg-(--bg-hover-color) cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-95',
                className || ''
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export const Text: React.FC<TextProps> = ({ children, variant = 'white', className, style, ...props }) => {
    const { colors } = useContext(themeContext);
    const styles = {
        fixedWhite: {
            '--text-color': colors.white,
            '--font-family': fonts.body,
        },
        white: {
            '--text-color': colors.text,
            '--font-family': fonts.body,
        },
        blue: {
            '--text-color': colors.primary,
            '--font-family': fonts.body,
        },
        soft: {
            '--text-color': colors.textSoft,
            '--font-family': fonts.mono,
        },
    };

    return (
        <p
            style={{ ...(styles[variant] as React.CSSProperties), ...style }}
            className={twMerge('text-(--text-color) font-(--font-family) text-base transition-colors duration-300', className || '')}
            {...props}
        >
            {children}
        </p>
    )
}

export const Box: React.FC<BoxProps> = ({ children, variant, className, style, ...props }) => {
    const { colors } = useContext(themeContext);
    const styles = {
        bare: {
            '--bg-color': 'transparent',
            '--border-color': 'transparent',
            '--border-radius': '0px',
            '--border-width': '0px',
        },
        small: {
            '--bg-color': colors.backgroundRaised,
            '--border-color': colors.textSoft,
            '--border-radius': '50px',
            '--border-width': '1px',
        },
        card: {
            '--bg-color': colors.backgroundRaised,
            '--border-color': colors.border,
            '--border-radius': '20px',
            '--border-width': '1.5px',
        },
    };

    return (
        <div
            style={{ ...(styles[variant || 'bare'] as React.CSSProperties), ...style }}
            className={twMerge(
                'border-(length:--border-width) border-(--border-color) bg-(--bg-color) rounded-(--border-radius) transition-colors duration-300',
                className || ''
            )}
            {...props}
        >
            {children}
        </div>
    )
}