import { gql } from 'urql'

export const IS_PORTFOLIO_COLLECTED = gql`
  query IsPorfolioCollected {
    me {
      isPorfolioCollected
    }
  }
`
