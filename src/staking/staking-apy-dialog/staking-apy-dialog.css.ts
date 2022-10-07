import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  width: 352,
  padding: 32,
  display: 'flex',
  flexDirection: 'column',
})

export const title = style({
  color: theme.colors.textColorGreen,
  marginBottom: 16,
})

export const tabs = style({})

export const label = style({
  display: 'flex',
  alignItems: 'center',
  gap: 7,
  marginBottom: 4,
  color: theme.colors.textColorGrey,
})

export const tabsPaper = style({
  background: theme.colors.tertiary,
  borderRadius: 8,
  padding: 2,
  display: 'grid',
  gap: 4,
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
})

export const tabsItem = style({
  padding: '6px 0',
  borderRadius: 6,
})

export const tabsItemActive = style({
  background: theme.colors.common.green2,
  color: theme.colors.common.white1,
})

export const mb16 = style({
  marginBottom: 16,
})

export const mb4 = style({
  marginBottom: 4,

  selectors: {
    '&:last-child': {
      marginBottom: 0,
    },
  },
})

export const fs12 = style({
  fontSize: 12,
  lineHeight: '16px',
})

export const fs18 = style({
  fontSize: 18,
  lineHeight: '18px',
})

export const howItWorks = style([
  fs12,
  {
    display: 'block',
    marginBottom: 16,

    selectors: {
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
])

export const mb8 = style({
  marginBottom: 8,
})

export const paper = style([
  mb8,
  {
    background: theme.colors.common.blue1,
    color: theme.colors.common.white1,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
])

export const attention = style([
  fs12,
  {
    marginBottom: 24,
  },
])

export const button = style({
  margin: '0 auto',
})

export const versus = style([
  mb8,
  {
    background: 'none',
    border: `1px solid ${theme.colors.border}`,
    padding: '16px 24px',
    display: 'grid',
    gridTemplateColumns: '1fr 13px 1fr',
    alignItems: 'center',
    gap: 28,
  },
])
