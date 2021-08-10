import { createContext, useContext } from 'react'

import { ThemeModes } from './theme.css'

export type ThemeContext = [
  ThemeModes | undefined,
  (value: string) => void,
  () => void
]

export const themeContext = createContext<ThemeContext | null>(null)

themeContext.displayName = 'themeContext'

export const useTheme = () => {
  const context = useContext(themeContext)

  if (!context) {
    throw new Error('theme context is null')
  }

  return context
}
