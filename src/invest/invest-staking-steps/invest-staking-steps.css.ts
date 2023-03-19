import { globalStyle, style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
})

export const content = style({
  position: 'relative',
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
})

export const title = style({
  marginBottom: 32,
})

export const successContent = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: 60,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginLeft: -30,
      marginRight: -30,
    },
  },
})

globalStyle(`${successContent} br`, {
  display: 'none',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'block',
    },
  },
})

export const checked = style({
  color: theme.colors.textColorGreen,
  margin: '0 auto 29px',
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
  marginBottom: 32,
})

globalStyle(`${row} > *:first-child`, {
  color: theme.colors.textColorGrey,
})

export const pool = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  verticalAlign: 'middle',
})

export const poolRight = style([
  pool,
  {
    justifyContent: 'flex-end',
  },
])

export const deployContent = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 12,
  marginBottom: 8,
})

export const deployHint = style({
  padding: 16,
})

export const contractInfo = style({
  marginBottom: 36,
})

export const stakeHint = style({
  marginBottom: 16,
})

export const stakeActions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const connnectTelegramHint1 = style({
  marginBottom: 16,
})

export const connnectTelegramHint2 = style({
  marginBottom: 8,
})

export const connectTelegramActions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
})

export const connectTelegramText = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 24,
  marginBottom: 76,
})

export const mt = style({
  marginTop: 'auto',

  '@media': {
    [theme.mediaQueries.sm()]: {
      marginTop: 0,
    },
  },
})

export const gotoUni = style([mt, {}])

globalStyle(`${mt}${gotoUni}`, {
  color: theme.colors.common.black1,
})

export const img = style({
  width: 24,
  height: 24,
  marginRight: 5,
  verticalAlign: 'middle',
})

export const imgPlaceHolder = style([
  img,
  {
    background: theme.colors.border,
    borderRadius: '50%',
  },
])

export const inputs = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  marginBottom: 56,
})

export const input = style({})

globalStyle(`${input} * input, ${input} > div > div, ${input} svg`, {
  background: theme.colors.background,
})

export const loader = style([
  contractInfo,
  {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
])

export const justifyContentStart = style({
  justifyContent: 'flex-start',
  textAlign: 'left',
})

export const depositSelect = style({
  marginBottom: 48,
})

export const tokenIcon = style({
  width: 24,
  height: 24,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',

  selectors: {
    '&:not(:last-child)': {
      marginRight: -4,
    },
  },
})

export const rewardTokens = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})
