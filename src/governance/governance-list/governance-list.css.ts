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
  alignItems: 'center',
  gap: 24,
  display: 'none',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const subtitle = style({
  marginBottom: 24,
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

export const mobileTabs = style({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
})

export const inacitveTab = style({
  color: theme.colors.textColorGrey,
  opacity: 0.5,
  transition: 'color .3s ease-in-out, opacity .3s ease-in-out',

  '@media': {
    [theme.mediaQueries.hover()]: {
      ':hover': {
        opacity: 1,
        color: theme.colors.textColorPrimary,
      },
    },
  },
})
