import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const title = style({
  marginBottom: 28,
  display: 'none',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'block',
    },
  },
})

export const share = style({
  fontSize: 48,
  lineHeight: '56px',
  marginBottom: 8,
})

export const subtitle = style({
  color: theme.colors.textColorGrey,
  marginBottom: 32,
})

export const card = style({
  padding: '32px 32px 24px',
})

export const cardTitle = style({
  color: theme.colors.textColorGrey,
  marginBottom: 4,
})

export const cardRow = style({
  marginBottom: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
})

export const cardSubtitle = style({})

export const copyButton = style({})

export const cardFooter = style({
  marginTop: 45,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

export const price = style({
  fontSize: 40,
  lineHeight: '48px',
  color: theme.colors.textColorGreen,
})

export const cardFooterText = style({
  color: theme.colors.textColorGrey,
  maxWidth: 198,
})

export const section = style({
  marginBottom: 40,
})

export const sectionTitle = style({
  marginBottom: 16,
})

export const incomeInner = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  padding: '32px 32px 40px',
  columnGap: 33,
  rowGap: 24,
})

export const income7Days = style({
  gridColumnStart: 2,
})

export const incomeTitle = style({
  color: theme.colors.textColorGrey,
  marginBottom: 4,
})

export const border = style({
  borderTop: `1px solid ${theme.colors.border}`,
})

export const tableWrap = style({})

export const table = style([
  border,
  {
    width: '100%',
  },
])

export const tableRow = style({
  padding: '18px 32px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
})
