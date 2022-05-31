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
  justifyContent: 'flex-end',
  marginBottom: 20,
})

export const total = style({
  opacity: 0.6,
  fontFamily: 'monospace',
})

export const tokenLogo = style({
  height: 24,
  width: 24,
  borderRadius: 24,
})

export const liquiditySelect = style({
  width: 200,
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
    gridTemplateColumns: '40px 1fr 100px',
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
