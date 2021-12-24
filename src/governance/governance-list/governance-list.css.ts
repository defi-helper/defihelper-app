import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
})

export const proposal = style({
  textDecoration: 'none',
  color: 'currentcolor',
  display: 'flex',
  alignItems: 'center',
  padding: '21px 32px',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const header = style({
  marginBottom: 28,
  display: 'flex',
  alignItems: 'center',
})

export const status = style({
  marginLeft: 'auto',
})

export const votes = style({
  padding: '8px 20px 8px 15px',
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: 24,
})

export const delegate = style({
  color: theme.colors.textColorGreen,
  marginLeft: 20,
})

export const dotsButton = style({
  width: 32,
  height: 32,
  marginLeft: 20,
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
})
