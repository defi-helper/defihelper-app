import { style } from '@vanilla-extract/css'

export const root = style({
  width: 500,
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 32,
})

export const apiHint = style({
  fontSize: 17,
  lineHeight: '21px',
  marginBottom: 10,
})

export const createApiInstructionLink = style({
  color: '#3773ff',
})

export const input = style({
  marginBottom: 24,
})

export const buttons = style({
  display: 'flex',
  gap: 8,
})
