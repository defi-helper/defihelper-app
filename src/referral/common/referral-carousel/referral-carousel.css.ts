import { style, globalStyle } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const socialText = style({
  marginBottom: 24,
})

export const socialActions = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 10,
  marginTop: 'auto',
})

export const socailLinksWrap = style({
  display: 'flex',
  gap: 20,
  alignItems: 'center',
})

export const dots = style({
  listStyle: 'none',
  margin: '16px 0 0',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const dot = style({
  width: 8,
  height: 8,
  borderRadius: '50%',
  border: `1px solid ${theme.colors.textColorGrey}`,
  margin: '0 4px',
})

globalStyle(`${dots} .slick-active ${dot}`, {
  background: theme.colors.textColorGrey,
})

export const socialLabel = style({
  display: 'none',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'block',
    },
  },
})

export const socialLinks = style({
  display: 'flex',
  gap: 8,
})

export const grey = style({
  color: theme.colors.textColorGrey,
})

export const socialButton = style({
  padding: 12,
})

export const socialMedia = style({
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflow: 'hidden',

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '32px 32px 40px',
    },
  },
})

export const socialCarousel = style({
  maxWidth: '100%',
})

export const socialMediaDesktopRow = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginBottom: 8,

  '@media': {
    [theme.mediaQueries.md()]: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: 12,
    },
  },
})

export const title = style([
  grey,
  {
    marginBottom: 4,
  },
])
