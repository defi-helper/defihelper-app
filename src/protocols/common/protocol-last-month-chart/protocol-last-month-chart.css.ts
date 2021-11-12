import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: '100%',
  height: 32,
})

export const flex = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const date = style({})

export const valueAxis = style({})

export const legend = style({
  fill: theme.colors.textColorGrey,
})

globalStyle(
  `${root} ${valueAxis} text, ${root} ${date} *, ${root} ${legend} text`,
  {
    fontFamily: theme.fonts.square,
    fill: theme.colors.textColorGrey,
  }
)
