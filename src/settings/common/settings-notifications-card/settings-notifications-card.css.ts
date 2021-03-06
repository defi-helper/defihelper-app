import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  padding: '24px 32px',
  minHeight: 148,
  display: 'flex',
  flexDirection: 'column',

  '@media': {
    [theme.mediaQueries.md()]: {
      minHeight: 168,
    },
  },
})

export const title = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const subtitle = style({
  opacity: 0.64,
  marginBottom: 10,
})

export const icon = style({
  width: 20,
  height: 20,
  verticalAlign: 'middle',
  marginRight: 4,
})

export const buttons = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 12,
  marginTop: 'auto',
})
