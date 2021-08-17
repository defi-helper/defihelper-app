import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
})

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

export const buttonCreateProposal = style({
  display: 'block',
  marginBottom: 16,
  width: '100%',
  padding: 32,
})

export const proposalContent = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 32,
})

export const status = style({
  textTransform: 'capitalize',
})

export const delegate = style({
  margin: '0 auto 20px',
})
