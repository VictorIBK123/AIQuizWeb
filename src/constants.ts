
export const colorsDefinition = {
  "light": {
    "white": "#FFFFFF",
    "background": "#FBFBFD",
    "backgroundRaised": "#FFFFFF",
    "backgroundSunken": "#F2F3F7",
    "text": "#111827",
    "textSoft": "#5B6475",
    "primary": "#0066CC",
    "primarySoft": "rgba(0, 102, 204, 0.08)",
    "secondary": "#0052A3",
    "success": "#16A34A",
    "border": "rgba(17, 24, 39, 0.09)",
    "glowA": "rgba(0, 102, 204, 0.06)",
    "glowB": "rgba(0, 102, 204, 0.03)"
  },
  "dark": {
    "white": "#FFFFFF",
    "background": "#09090B",
    "backgroundRaised": "#121215",
    "backgroundSunken": "#18181C",
    "text": "#F4F4F5",
    "textSoft": "#A1A1AA",
    "primary": "#2F81F7",
    "primarySoft": "rgba(47, 129, 247, 0.12)",
    "secondary": "#1F6FEB",
    "success": "#22C55E",
    "border": "rgba(255, 255, 255, 0.10)",
    "glowA": "rgba(47, 129, 247, 0.08)",
    "glowB": "rgba(47, 129, 247, 0.04)"
  }
}
export const theme = {
  colors: colorsDefinition.dark,
}
export const fonts = {
  "display": "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  "body": "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  "mono": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
}


export const timeout = 60000;

export const baseUrl = import.meta.env.DEV ? '' : import.meta.env.VITE_BASE_URL;