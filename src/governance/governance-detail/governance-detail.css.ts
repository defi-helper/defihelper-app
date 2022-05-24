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
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: 32,
})

export const voteButton = style({
  fontSize: 32,
  lineHeight: '40px',
  height: 116,
  width: '100%',
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

export const loader = style({
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
})

export const author = style({
  marginBottom: 20,
})
