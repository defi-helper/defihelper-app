import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { useLocalStorage, useMedia } from 'react-use'
import { setElementTheme } from '@vanilla-extract/dynamic'

import { ThemeModes, themeContract, themes } from './theme.css'
import { ThemeContext, themeContext } from './theme.context'

const THEME_KEY = 'dfh:theme'

export const ThemeProvider: React.FC = React.memo((props) => {
  const isLight = useMedia('(prefers-color-scheme: light)')
  const [themeMode, setThemeMode] = useState<ThemeModes>(
    isLight ? 'light' : 'dark'
  )
  const [persistedThemeMode, persistThemeMode] =
    useLocalStorage<ThemeModes>(THEME_KEY)

  const handlePersistTheme = useCallback(() => {
    const light =
      persistedThemeMode === 'light' || (!persistedThemeMode && isLight)

    persistThemeMode(light ? 'dark' : 'light')
  }, [persistThemeMode, isLight, persistedThemeMode])

  useEffect(() => {
    if (isLight) {
      setThemeMode('light')
    } else {
      setThemeMode('dark')
    }
  }, [isLight])

  const currentThemeMode = persistedThemeMode ?? themeMode

  const themeValue = useMemo(
    (): ThemeContext => [handlePersistTheme, currentThemeMode],
    [handlePersistTheme, currentThemeMode]
  )

  useLayoutEffect(() => {
    const element = document.querySelector('html')

    if (!element || !(element instanceof HTMLElement)) return

    setElementTheme(element, themeContract, themes[currentThemeMode])
  }, [currentThemeMode])

  return (
    <themeContext.Provider value={themeValue}>
      {props.children}
    </themeContext.Provider>
  )
})
