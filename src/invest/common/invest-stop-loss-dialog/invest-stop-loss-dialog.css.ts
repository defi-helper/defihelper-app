import { style } from '@vanilla-extract/css'

import { theme } from '~/common/theme'

export const root = style({
  maxWidth: 460,
  height: 780,
  padding: '24px 32px 28px',
  display: 'flex',
  flexDirection: 'column',
})

export const title = style({
  color: theme.colors.textColorGrey,
  position: 'relative',
  marginBottom: 32,
  display: 'inline-block',
})

export const subtitle = style({
  marginBottom: 44,
})

export const confirm = style({
  marginTop: 16,
})

export const row = style({
  marginBottom: 32,
})

export const rowHeading = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

export const rowHeadingOpen = style({
  marginBottom: 16,
})

export const input = style({
  marginBottom: 16,
})

export const label = style({
  color: theme.colors.textColorGrey,
  marginBottom: 8,
})

export const inputRow = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 8,
})

export const numberInput = style({
  width: 100,
})

export const slider = style({
  maxWidth: 'calc(100% - 124px)',
  marginLeft: 'auto',
  marginRight: 8,
})

export const price = style({
  marginBottom: 8,
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

export const deleteButton = style({
  color: theme.colors.common.red1,
  marginTop: 'auto',
  position: 'relative',
})

export const deleteButtonLoader = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: 'auto',
  zIndex: -1,
})

export const deleteButtonText = style({
  opacity: 0,
})

export const loader = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  minHeight: 300,
})
