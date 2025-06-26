import { create } from 'zustand'

interface ThemeConst {
  text: string
  secondText: string
  background: string
  secondBackground: string
  button: string
  acceptButton: string
  cancelButton: string
}
type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  themeConst: ThemeConst
  setTheme: (t: Theme) => void
}

const darkThemeConst: ThemeConst = {
  text: '#ffffff',
  secondText: '#747475',
  background: '#FFE082',
  secondBackground: '#ffffff',
  button: '#2B7FFF',
  acceptButton: '#12C739',
  cancelButton: '#EF4444',
}
const lightThemeConst: ThemeConst = {
  text: '#ffffff',
  secondText: '#747475',
  background: '#FFE082',
  secondBackground: '#ffffff',
  button: '#2B7FFF',
  acceptButton: '#12C739',
  cancelButton: '#EF4444',
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  themeConst: lightThemeConst,
  setTheme: (t: Theme) => {
    if (t === 'light') {
      set({
        themeConst: lightThemeConst,
        theme: t,
      })
    } else {
      set({
        themeConst: darkThemeConst,
        theme: t,
      })
    }
  },
}))
