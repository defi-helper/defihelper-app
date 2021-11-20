import { composeStyles, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({})

export const hide = style({
  display: 'none',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const header = composeStyles(
  hide,
  style({
    marginBottom: 28,
    alignItems: 'center',
  })
)

export const tabs = style({
  marginLeft: 'auto',
})

export const search = style({
  width: 211,
  marginLeft: 24,
})

export const create = style({
  marginLeft: 24,
})

export const protocols = style({
  padding: 0,
  margin: 0,
  listStyle: 'none',
})

export const proposalsHeader = style({
  alignItems: 'center',
  gridTemplateColumns: '1fr 21% 16% 15% 18% 21%',
  color: theme.colors.textColorGrey,
  marginBottom: 8,
  display: 'none',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'grid',
    },
  },
})

export const name = style({
  gridColumnStart: 2,
})

export const item = style({
  width: '100%',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 8,
    },
  },
})

export const action = style({
  display: 'flex',
  gap: 8,
})

export const searchButton = style({
  backgroundColor: theme.colors.paper,
  padding: 4,
  borderRadius: 6,
})

export const select = composeStyles(
  searchButton,
  style({
    fontSize: 12,
    lineHeight: '16px',
  })
)

export const createMobile = style({
  width: 24,
  height: 24,
  padding: 6,
  borderRadius: 6,
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
