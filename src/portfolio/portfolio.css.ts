import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const title = style({
  marginBottom: 28,
  display: 'none',
  cursor: 'pointer',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'block',
    },
  },
})

export const generatingBody = style({
  display: 'flex',
  flexDirection: 'column',
})

export const generatingTitle = style({
  marginBottom: 24,

  '@media': {
    [theme.mediaQueries.lg()]: {
      fontSize: 40,
    },
  },
})

export const cards = style({
  marginBottom: 24,
})

export const grid = style({
  display: 'grid',
  gap: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gap: 24,
      gridTemplateColumns: '1fr 1fr',
    },
  },
})

export const mainChart = style({
  '@media': {
    [theme.mediaQueries.md()]: {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
  },
})

export const section = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 64,
    },
  },
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const instructions = style({
  display: 'grid',
  gap: 16,
  marginBottom: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      gap: 24,
      gridTemplateColumns: '1fr 1fr 1fr',
      marginBottom: 24,
    },
  },
})

export const instructionCard = style({
  padding: 16,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  zIndex: 0,

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: 24,
    },
  },
})

export const green = style({
  color: theme.colors.textColorGreen,
})

export const instructionCardTitle = style([
  green,
  {
    marginBottom: 8,
  },
])

export const instructionCardText = style({
  marginBottom: 'auto',
})

export const instructionCardButton = style({
  marginTop: 16,
})

export const nameInput = style({
  maxWidth: 200,
  marginBottom: 26,
})

export const nameInputSaveButton = style({
  marginLeft: 32,
})

export const nameInputCancelButton = style({
  marginLeft: 16,
})

export const instructionCardIcon = style({
  position: 'absolute',
  right: 0,
  bottom: 0,
  opacity: 0.18,
  width: 147,
  height: 147,
  zIndex: -1,
})

export const contacts = style({
  display: 'flex',
  padding: 16,
  marginBottom: 16,
  gap: 16,
  flexDirection: 'column',
  alignItems: 'flex-start',

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: 24,
      marginBottom: 32,
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
})

export const contactsText = style({
  maxWidth: 652,
  marginRight: 'auto',
})

export const contactsButton = style({})

globalStyle(`${contactsButton} span`, {
  gap: 8,
})

export const videoWrap = style({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  paddingTop: '56.25%',
  borderRadius: 16,
  zIndex: 0,
  margin: '0 auto',
  marginBottom: 16,
  order: -1,

  '@media': {
    [theme.mediaQueries.md()]: {
      order: 'unset',
      marginBottom: 0,
    },
  },
})

export const video = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
})

export const generatingMobile = style({
  order: -2,
  marginBottom: 24,
})

export const generatingMobileText = style({
  marginBottom: 16,
})

export const generatingMobileTitle = style({
  marginBottom: 16,
  color: theme.colors.textColorGrey,
})
