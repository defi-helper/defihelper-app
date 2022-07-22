import { createThemeContract } from '@vanilla-extract/css'

import { palette } from './theme.pallete'

export type ThemeModes = 'light' | 'dark'

type Theme = {
  colors: {
    common: typeof palette
    background: string
    textColorPrimary: string
    textColorSecondary: string
    textColorGrey: string
    textColorGreen: string
    textColorBrown: string
    attention: string
    danger: string
    primary: string
    secondary: string
    paper: string
    separator: string
    border: string
    primaryButtonBorder: string
    switchTrack: string
    assetsPlatformActive: string
  }
  fonts: {
    square: string
    mono: string
  }
}

export const themeContract = createThemeContract<Theme>({
  colors: {
    common: palette,
    background: '',
    textColorPrimary: '',
    textColorSecondary: '',
    textColorGrey: '',
    textColorGreen: '',
    textColorBrown: '',
    attention: '',
    danger: '',
    primary: '',
    secondary: '',
    paper: '',
    separator: '',
    border: '',
    primaryButtonBorder: '',
    switchTrack: '',
    assetsPlatformActive: '',
  },

  fonts: {
    square: '',
    mono: '',
  },
})

const dark: Theme = {
  colors: {
    common: palette,
    background: palette.black4,
    textColorPrimary: palette.white1,
    textColorSecondary: palette.black1,
    textColorGrey: palette.grey1,
    textColorGreen: palette.green1,
    textColorBrown: palette.brown2,
    attention: palette.white1,
    primary: palette.white1,
    danger: palette.red1,
    secondary: palette.black1,
    paper: palette.black2,
    separator: palette.black2,
    border: palette.black7,
    primaryButtonBorder: palette.grey2,
    switchTrack: palette.white3,
    assetsPlatformActive: palette.black2Darken,
  },
  fonts: {
    square: "'Basier Square', sans-serif",
    mono: "'Basier Square Mono', sans-serif",
  },
}

const light: Theme = {
  colors: {
    common: palette,
    background: palette.white1,
    textColorPrimary: palette.black1,
    textColorSecondary: palette.white1,
    textColorGrey: palette.black8,
    textColorGreen: palette.green2,
    textColorBrown: palette.brown1,
    attention: palette.white1,
    primary: palette.black1,
    secondary: palette.white1,
    paper: palette.grey4,
    danger: palette.red1,
    separator: palette.grey4,
    border: palette.black10,
    primaryButtonBorder: palette.black9,
    switchTrack: palette.black11,
    assetsPlatformActive: palette.grey4Darken,
  },
  fonts: {
    square: "'Basier Square', sans-serif",
    mono: "'Basier Square Mono', sans-serif",
  },
}

export const themes = {
  light,
  dark,
}
