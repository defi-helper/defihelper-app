import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
})

export const status = style({
  margin: '0 auto',
})

export const voteInfo = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gridGap: 32,
})

export const voteButtons = style({
  margin: '0 auto',
  display: 'flex',
})

export const voteButton = style({
  margin: '0 16px',
})

export const actions = style({
  padding: 32,
})

export const action = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 16,
    },
  },
})

export const mb32 = style({
  marginBottom: 32,
})
