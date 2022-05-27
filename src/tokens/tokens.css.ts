import { composeStyles, style } from '@vanilla-extract/css'
import { theme } from '~/common/theme'

export const root = style({
  padding: 15,
})

export const title = style({
  marginBottom: 10,
})

export const searchBox = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 20,
})

export const total = style({
  opacity: 0.6,
  fontFamily: 'monospace',
})

export const titleWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 10,
})

export const label = style({
  color: theme.colors.textColorGrey,
  marginBottom: 4,
})

export const row = style({
  marginBottom: 16,
})

export const editButton = style({
  color: '#fff',
})

export const grid = style({
  display: 'grid',
  gridGap: 20,
  gridTemplateColumns: '70%',
  justifyContent: 'center',
})

export const mb = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: 16,
    },
  },
})

export const tableRow = composeStyles(
  mb,
  style({
    display: 'grid',
    gridTemplateColumns: 'minmax(20%, 1fr) 90px 90px 90px 1fr 35px',
    gridGap: 15,
    overflowWrap: 'break-word',
  })
)

export const tableHeader = style({
  color: theme.colors.textColorGrey,
})

export const formInputSearch = style({
  marginRight: 15,
  width: 300,
})
