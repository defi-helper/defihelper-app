import { style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const topNotificaionWrapper = style({
  width: '100%',
  background: theme.colors.common.blue1,
})

export const notificationContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto 0px',
  padding: '16px',
  alignItems: 'center',
  '@media': {
    [theme.mediaQueries.sm()]: {
      padding: '7px 72px',
    },
  },
})

export const notificaionText = style({
  color: theme.colors.common.white1,
  fontSize: 14,
  lineHeight: '20px',
  display: 'flex',
  alignItems: 'center',
})

export const notificationContainerButtonWrapper = style({
  display: 'flex',
  alignItems: 'center',
})

export const mobileActions = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: 16,
  padding: '0px 16px 16px 16px',
})

export const learnMoreButton = style({
  background: theme.colors.common.black1,
  color: theme.colors.common.white1,
  padding: '6px 34.5px',
  borderRadius: 6,
  fontSize: 12,
  lineHeight: '20px',

  '@media': {
    [theme.mediaQueries.sm()]: {
      marginLeft: 24,
    },
  },
})
export const notNowButton = style({
  color: theme.colors.common.black1,
  border: '1px solid',
  borderColor: theme.colors.common.black1,
  borderRadius: 6,
  fontSize: 12,
  lineHeight: '20px',
})

export const closeButton = style({
  position: 'absolute',
  right: 17.5,
  top: 'auto',
})

export const closeIcon = style({
  height: 32,
  width: 32,
})
