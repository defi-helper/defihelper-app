import { style, styleVariants } from '@vanilla-extract/css'

import { TokenRiskScoringEnum } from '~/api'
import { theme } from '~/common/theme'

export const header = style({
  alignItems: 'center',
  marginBottom: 28,
  display: 'none',
  width: '100%',

  '@media': {
    [theme.mediaQueries.md()]: {
      display: 'flex',
    },
  },
})

export const noAuthColumns = style({
  display: 'grid',
  gridColumnGap: 24,
  gridRowGap: 26,
  gridTemplateColumns: '1fr',

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
})

export const noAuthTitle = style({
  fontSize: 48,
  lineHeight: '56px',

  '@media': {
    [theme.mediaQueries.md()]: {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
  },
})

export const icon = style({
  verticalAlign: 'middle',
  marginRight: 12,
  width: 24,
  height: 24,

  '@media': {
    [theme.mediaQueries.md()]: {
      width: 36,
      height: 36,
    },
  },
})

export const protocolLink = style({
  padding: 4,
  marginLeft: 'auto',
  color: theme.colors.textColorGrey,

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '8px 16px',
    },
  },
})

export const mb120 = style({
  marginBottom: 120,
})

export const grid = style({
  display: 'grid',

  '@media': {
    [theme.mediaQueries.md()]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 24,
    },
  },
})

export const carousel = style({
  marginLeft: -16,
  marginRight: -16,
})

export const grey = style({
  color: theme.colors.textColorGrey,
  marginBottom: 'auto',
})

export const lightGreen = style({
  color: theme.colors.common.green1,
})

export const green = style({
  color: theme.colors.common.green2,
})

export const red = style({
  color: theme.colors.common.red1,
})

export const card = style({
  padding: 16,

  '@media': {
    [theme.mediaQueries.md()]: {
      padding: '24px 32px',
    },
  },
})

export const subtitle = style({
  marginBottom: 24,
})

export const flex = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const tabs = style({
  marginBottom: 32,

  '@media': {
    [theme.mediaQueries.md()]: {
      marginBottom: 40,
    },
  },
})

export const tab = style({
  borderRadius: 8,
  padding: '8px 16px',
  fontSize: 20,
  lineHeight: '28px',
  opacity: 0.64,
})

export const tabActive = style({
  backgroundColor: theme.colors.paper,
  opacity: 1,
})

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const automates = style({
  marginBottom: 53,
})

export const edit = style({
  marginLeft: 10,
})

export const charts = style({})

export const staking = style({})

export const totalRiskBadge = style({
  padding: '2px 32.5px',
  borderRadius: '22px',
  marginLeft: '16px',
  fontSize: '14px',
  lineHeight: '20px',
})

export const riskOverview = style({
  marginBottom: 64,
})

export const riskPanel = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr 1fr 1fr',
  fontFamily: theme.fonts.mono,
  padding: '13px 32px',
  marginBottom: 16,
})

export const riskColumnTotal = style({
  padding: '10px 32px 10px 0px',
  marginRight: '32px',
  display: 'flex',
  fontSize: '20px',
  lineHeight: '24px',
  borderRight: `1px solid ${theme.colors.border}`,
})

export const riskLevelStatuses = styleVariants({
  [TokenRiskScoringEnum.High]: {
    background: theme.colors.common.red1,
  },
  [TokenRiskScoringEnum.Moderate]: {
    background: theme.colors.common.yellow,
  },
  [TokenRiskScoringEnum.Low]: {
    background: theme.colors.common.green2,
  },
  [TokenRiskScoringEnum.NotCalculated]: {
    background: theme.colors.textColorGrey,
    color: theme.colors.textColorSecondary,
  },
})

export const riskColumnFactor = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const riskColumnFactorLabel = style({
  marginRight: 8,
})

export const riskFactorsDescription = style({
  fontFamily: theme.fonts.square,
  fontSize: '14px',
})

export const riskFactorsDescriptionFactor = style({
  fontFamily: theme.fonts.square,
  fontSize: '14px',
})

export const riskFactorsDescriptionFactorModerate = style({
  color: theme.colors.common.yellow,
  fontSize: '14px',
  lineHeight: '20px',
})

export const riskFactorTooltipBodyDivider = style({
  borderBottom: `1px solid ${theme.colors.border}`,
  margin: '16px 0px',
})

export const riskFactorsDescriptionHeadline = style({
  color: theme.colors.textColorGrey,
})

export const riskFactorTooltipBody = style({
  fontSize: '14px',
  lineHeight: '20px',
})

export const riskFactorTooltipRiskFactorsHeadline = style({
  fontSize: '14px',
  lineHeight: '20px',
  color: '#8A8F8F',
})

export const riskFactorTooltipRiskingFaqLink = style({
  fontFamily: theme.fonts.mono,
  fontSize: '12px',
  textDecoration: 'underline',
})

export const riskFactorTooltipFactorsDescribe = style({
  marginBottom: '16px',
})

export const investmentsTitle = style({
  marginBottom: 32,
})
