import { useEffect } from 'react'
import { useThemeStore } from '../stores/useThemeStore'

export function useSystemTheme() {
  const setTheme = useThemeStore((state) => state.setTheme)

  useEffect(() => {
    // Функция, определяющая текущую системную тему
    const getPreference = () =>
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

    // Один раз при инициализации:
    setTheme(getPreference())

    // Подписываемся на изменения системной темы:
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    // В старых браузерах может быть deprecated, поэтому добавляем оба слушателя:
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      // fallback для Safari или старых версий
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [setTheme])
}
