import { globalStyle, style } from '@vanilla-extract/css'

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
  display: 'grid',
  gridRowGap: 40,

  '@media': {
    [theme.mediaQueries.lg()]: {
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: 24,
    },
  },
})

export const sectionTitle = style({
  marginBottom: 16,
})

export const income = style({
  gridRowStart: 1,
  gridRowEnd: 3,
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

export const incomeValue = style({
  fontSize: 40,
  lineHeight: '48px',
})

export const incomeForecastTitle = style([
  sectionTitle,
  {
    padding: '16px 32px 0',
  },
])

export const border = style({
  borderTop: `1px solid ${theme.colors.border}`,
})

export const tableWrap = style({})

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
})

export const tableRow = style({
  padding: '18px 32px',
  display: 'grid',
})

export const incomeTableRow = style([
  tableRow,
  {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
])

export const incomeTableHeader = style([
  incomeTableRow,
  {
    color: theme.colors.textColorGrey,
  },
])

export const results = style({})

export const resultsPaper = style({
  minHeight: 'calc(100% - 56px)',
})

export const resultsAllTransactions = style({
  gridColumnStart: 1,
  gridColumnEnd: 3,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridColumnStart: 'unset',
      gridColumnEnd: 'unset',
    },
  },
})

globalStyle(`${resultsAllTransactions} button`, {
  width: '100%',
})

export const resultsActiveReferrals = style({
  gridRowStart: 3,

  '@media': {
    [theme.mediaQueries.md()]: {
      gridRowStart: 'unset',
    },
  },
})

export const levels = style({})

export const competition = style({})

export const competitionPaper = style({
  background: theme.colors.common.yellow,
  padding: '32px 32px 40px',
  color: theme.colors.common.black1,
})

export const competitionInner = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 10,
  marginBottom: 32,
})

export const competitionText = style({
  width: 'calc(100% - 120px)',
})

export const competitionButton = style({})

globalStyle(`${competitionPaper} ${competitionButton}`, {
  color: theme.colors.common.black1,
  borderColor: theme.colors.common.black9,
})

export const cup = style({
  width: 120,
  height: 120,
})

export const levelsTableWrap = style({})

export const levelsTableRow = style([{}])

export const levelsYellow = style({
  background: theme.colors.common.yellow,
  color: theme.colors.common.black1,
})

export const levelsTableHeader = style({
  color: theme.colors.textColorGrey,
})

export const levelsTableHeaderCell = style({
  padding: '16px 12px',
})

export const levelsTableRowCell = style({
  padding: '18px 20px 21px',

  selectors: {
    '&:first-child': {
      paddingLeft: 32,
    },

    '&:last-child': {
      paddingRight: 32,
    },
  },
})
