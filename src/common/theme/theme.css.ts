import { createThemeContract } from '@vanilla-extract/css'

import { palette } from './theme.pallete'

export type ThemeModes = 'light' | 'dark'

type Theme = {
  colors: {
    common: typeof palette
    background: string
    textColorPrimary: string
    textColorSecondary: string
    attention: string
    primary: string
    secondary: string
    paper: string
    separator: string
  }
  fonts: {
    square: string
    mono: string
    circle: string
  }
}

export const themeContract = createThemeContract<Theme>({
  colors: {
    common: palette,
    background: '',
    textColorPrimary: '',
    textColorSecondary: '',
    attention: '',
    primary: '',
    secondary: '',
    paper: '',
    separator: '',
  },

  fonts: {
    square: '',
    mono: '',
    circle: '',
  },
})

const dark: Theme = {
  colors: {
    common: palette,
    background: palette.black4,
    textColorPrimary: palette.white1,
    textColorSecondary: palette.black1,
    attention: palette.white1,
    primary: palette.white1,
    secondary: palette.green1,
    paper: palette.black2,
    separator: palette.black2,
  },
  fonts: {
    square: "'Basier Square', sans-serif",
    mono: "'Basier Square Mono', sans-serif",
    circle: "'Basier Circle Mono', sans-serif",
  },
}

const light: Theme = {
  colors: {
    common: palette,
    background: palette.white1,
    textColorPrimary: palette.black1,
    textColorSecondary: palette.white1,
    attention: palette.white1,
    primary: palette.black1,
    secondary: palette.green1,
    paper: palette.grey4,
    separator: palette.grey4,
  },
  fonts: {
    square: "'Basier Square', sans-serif",
    mono: "'Basier Square Mono', sans-serif",
    circle: "'Basier Circle Mono', sans-serif",
  },
}

export const themes = {
  light,
  dark,
}
