import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const title = style({
  marginBottom: 28,
  display: 'none',

  '@media': {
    [theme.mediaQueries.lg()]: {
      display: 'block',
    },
  },
})

export const share = style({
  fontSize: 48,
  lineHeight: '56px',
  marginBottom: 8,
})

export const grey = style({
  color: theme.colors.textColorGrey,
})

export const subtitle = style([
  grey,
  {
    marginBottom: 32,
  },
])

export const card = style({
  minHeight: 284,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '32px 32px 40px',
})

export const cardTitle = style({
  color: theme.colors.textColorGrey,
  marginBottom: 4,
})

export const cardSubtitle = style({
  marginBottom: 10,
})

export const cardButton = style({
  marginTop: 'auto',
})

export const section = style({
  marginBottom: 40,
  display: 'grid',
  gridRowGap: 40,

  '@media': {
    [theme.mediaQueries.lg()]: {
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: 24,
    },
  },
})

export const partnersTitle = style({
  maxWidth: 474,
  marginBottom: 8,
})

export const partersSubtitle = style([
  grey,
  {
    marginBottom: 16,

    '@media': {
      [theme.mediaQueries.lg()]: {
        marginBottom: 24,
      },
    },
  },
])

export const value = style({
  fontSize: 32,
  lineHeight: '40px',

  '@media': {
    [theme.mediaQueries.lg()]: {
      fontSize: 40,
      lineHeight: '48px',
    },
  },
})

export const green = style({
  color: theme.colors.textColorGreen,
})

export const calculator = style({
  display: 'grid',

  '@media': {
    [theme.mediaQueries.lg()]: {
      gridTemplateColumns: '1fr 1px 376px',
    },
  },
})

export const estimatedValue = style([value, green])

export const estimatedIncome = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridRowGap: 24,
  gridColumnGap: 46,
  padding: '24px 16px',

  '@media': {
    [theme.mediaQueries.lg()]: {
      gridRowGap: 28,
      padding: 32,
    },
  },
})

export const estimatedIncomeCol = style({
  '@media': {
    [theme.mediaQueries.lg()]: {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
  },
})

export const estimatedButton = style({
  gridColumnStart: 1,
  gridColumnEnd: 3,
  display: 'flex',
  flexDirection: 'column',

  '@media': {
    [theme.mediaQueries.lg()]: {
      display: 'block',
    },
  },
})

export const separator = style({
  background: theme.colors.border,
  height: 1,
  width: '100%',

  '@media': {
    [theme.mediaQueries.lg()]: {
      height: 'unset',
      width: 1,
    },
  },
})

export const schema = style({
  display: 'grid',
  gridTemplateColumns: '34px 1fr 60px',
  padding: '24px 16px',

  '@media': {
    [theme.mediaQueries.lg()]: {
      padding: '32px 32px 38px',
      gridTemplateColumns: '38px 1fr 75px',
    },
  },
})

export const schemaImg = style({
  margin: 'auto',
  maxWidth: 224,
  display: 'block',

  '@media': {
    [theme.mediaQueries.lg()]: {
      maxWidth: 444,
    },
  },
})

globalStyle(`${schemaImg} img`, {
  maxWidth: '100%',
})

export const schemaText = style([
  grey,
  {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    gridColumnStart: 1,
    gridColumnEnd: 4,
    marginTop: 'auto',
  },
])

export const schemaTextCol1 = style({
  maxWidth: 232,
})

export const schemaTextCol2 = style({
  maxWidth: 199,
})

export const inputWrap = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  justifyContent: 'center',
  paddingLeft: 31,
})

export const input = style({
  maxWidth: 144,
})

export const schemaValue = style([
  value,
  {
    selectors: {
      '&:not(:last-child)': {
        marginBottom: 24,

        '@media': {
          [theme.mediaQueries.md()]: {
            marginBottom: 16,
          },
        },
      },
    },
  },
])
