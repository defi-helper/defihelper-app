import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const overview = style({
  display: 'grid',
  gap: 63,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: '560px 1fr',
    },
  },
})

export const overviewItem = style({
  marginBottom: 24,
})

export const grey = style({
  color: theme.colors.textColorGrey,
  marginBottom: 'auto',
})

export const description = style({
  whiteSpace: 'break-spaces',
})

export const overviewTitles = style({
  marginBottom: 8,
})

export const tag = style({
  background: theme.colors.common.black6,
  borderRadius: 6,
  padding: '6px 12px',
  textTransform: 'uppercase',
  fontFamily: theme.fonts.mono,
  marginBottom: 8,
  fontSize: 14,
  lineHeight: '20px',
  color: theme.colors.textColorGrey,

  selectors: {
    '&:not(:last-child)': {
      marginRight: 8,
    },
  },
})
