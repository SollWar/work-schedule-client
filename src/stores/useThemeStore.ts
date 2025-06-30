import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeConst {
  text: string
  secondText: string
  background: string
  secondBackground: string
  button: string
  acceptButton: string
  cancelButton: string
}

interface ThemeState {
  theme: Theme
  themeConst: ThemeConst
  setTheme: (t: Theme) => void
}

const themes: Record<Theme, ThemeConst> = {
  light: {
    text: '#ffffff',
    secondText: '#747475',
    background: '#FFE082',
    secondBackground: '#ffffff',
    button: '#2B7FFF',
    acceptButton: '#12C739',
    cancelButton: '#EF4444',
  },
  dark: {
    text: '#ffffff',
    secondText: '#747475',
    background: '#FFE082',
    secondBackground: '#ffffff',
    button: '#2B7FFF',
    acceptButton: '#12C739',
    cancelButton: '#EF4444',
  },
}

// Получение схемы от Telegram (если доступно)
//const detectedColorScheme = WebApp?.colorScheme === 'dark' ? 'dark' : 'light'

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  themeConst: themes['light'],
  setTheme: (t: Theme) =>
    set({
      theme: t,
      themeConst: themes[t],
    }),
}))
