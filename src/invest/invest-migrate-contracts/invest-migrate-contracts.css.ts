import { style } from '@vanilla-extract/css'

export const root = style({})

export const empty = style({
  padding: '24px 32px',
})

export const description = style({
  marginBottom: 16,
})

export const hiddenPaper = style({
  marginTop: 24,
  marginBottom: 16,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 32px',
  gap: 10,
})

export const hiddenPaperButton = style({
  minWidth: 100,
})

export const loader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
