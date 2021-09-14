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

const isThemeModes = (themeMode: string): themeMode is ThemeModes => {
  return ['light', 'dark'].includes(themeMode)
}

export const ThemeProvider: React.FC = (props) => {
  const isLight = useMedia('(prefers-color-scheme: light)')
  const [themeMode, setThemeMode] = useState<ThemeModes>(
    isLight ? 'light' : 'dark'
  )
  const [persistedThemeMode, persistThemeMode, remove] =
    useLocalStorage<ThemeModes>(THEME_KEY)

  const handlePersistTheme = useCallback(
    (theme: string) => {
      if (!isThemeModes(theme)) return

      persistThemeMode(theme)
    },
    [persistThemeMode]
  )

  useEffect(() => {
    if (isLight) {
      setThemeMode('light')
    } else {
      setThemeMode('dark')
    }
  }, [isLight])

  const currentThemeMode = persistedThemeMode ?? themeMode

  const themeValue = useMemo(
    (): ThemeContext => [currentThemeMode, handlePersistTheme, remove],
    [handlePersistTheme, currentThemeMode, remove]
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
}
