import { gql } from 'urql'

export const ME_PORTFOLIO_NAME = gql`
  query MePortfolioName {
    me {
      name
    }
  }
`
