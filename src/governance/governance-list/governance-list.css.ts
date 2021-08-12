import { style } from '@vanilla-extract/css'

export const root = style({})

export const proposal = style({
  textDecoration: 'none',
  color: 'currentcolor',
  display: 'block',

  selectors: {
    '&:not(:last-child)': {
      marginBottom: 16,
    },
  },
})

export const proposalContent = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 32,
})
