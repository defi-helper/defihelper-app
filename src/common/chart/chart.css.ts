import { globalStyle, style } from '@vanilla-extract/css'
import { theme } from '../theme'

export const root = style({
  width: '100%',
  height: '300px',
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
