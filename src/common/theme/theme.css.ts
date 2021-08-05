import { createThemeContract } from '@vanilla-extract/css'

import { palette } from './theme.pallete'

export type ThemeModes = 'light' | 'dark'

type Theme = {
  palette: typeof palette
  color: {
    background: string
    textColor: string
    attention: string
    primary: string
    secondary: string
    paper: string
  }
  fonts: {
    square: string
    mono: string
    circle: string
  }
}

export const themeContract = createThemeContract({
  palette,

  color: {
    background: '',
    textColor: '',
    attention: '',
    primary: '',
    secondary: '',
    paper: '',
  },

  fonts: {
    square: '',
    mono: '',
    circle: '',
  },
})

const light: Theme = {
  palette,
  color: {
    background: palette.black4,
    textColor: palette.white,
    attention: palette.white,
    primary: palette.white,
    secondary: palette.green1,
    paper: palette.black2,
  },
  fonts: {
    square: "'Basier Square', sans-serif",
    mono: "'Basier Square Mono', sans-serif",
    circle: "'Basier Circle Mono', sans-serif",
  },
}

export const themes = {
  light,
  dark: light,
}
