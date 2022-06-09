import { style } from '@vanilla-extract/css'

export const root = style({
  width: 450,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '24px 32px',
})

export const title = style({
  marginBottom: 20,
})

export const firstStepHelper = style({
  padding: '10px 10px',
  textAlign: 'center',
  width: '100%',
})

export const contractPlatformSelect = style({
  width: '100%',
  marginBottom: 15,
})

export const contractEventSelect = style({
  width: '100%',
})

export const buttonWrapper = style({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  marginTop: 15,
})
