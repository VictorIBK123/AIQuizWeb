
export const colorsDefinition = {
  "light": {
    "white": "#FFFFFF",
    "background": "#F2F2F7",
    "backgroundRaised": "#FFFFFF",
    "backgroundSunken": "#E6E6EE",
    "text": "#1C1C1E",
    "textSoft": "#6E6E73",
    "primary": "#007AFF",
    "primarySoft": "rgba(0, 122, 255, 0.12)",
    "secondary": "#5E5CE6",
    "success": "#34C759",
    "border": "rgba(0, 0, 0, 0.09)",
    "glowA": "rgba(0, 122, 255, 0.28)",
    "glowB": "rgba(94, 92, 230, 0.22)"
  },
  "dark": {
    "white": "#FFFFFF",
    "background": "#08080B",
    "backgroundRaised": "#18181C",
    "backgroundSunken": "#0F0F13",
    "text": "#F5F5F7",
    "textSoft": "#98989D",
    "primary": "#0A84FF",
    "primarySoft": "rgba(10, 132, 255, 0.16)",
    "secondary": "#7D7AFF",
    "success": "#30D158",
    "border": "rgba(255, 255, 255, 0.11)",
    "glowA": "rgba(10, 132, 255, 0.35)",
    "glowB": "rgba(125, 122, 255, 0.28)"
  }
}
export const theme = {
  colors: colorsDefinition.dark,
}
export const fonts = {
  "display": "'Plus Jakarta Sans', sans-serif",
  "body": "'Plus Jakarta Sans', sans-serif",
  "mono": "'JetBrains Mono', monospace"
}


export const timeout = 60000;

export const baseUrl = import.meta.env.DEV ? '' : (import.meta.env.VITE_BASE_URL || 'http://10.199.184.233:3001');