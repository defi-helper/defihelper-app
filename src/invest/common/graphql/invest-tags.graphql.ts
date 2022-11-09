import { gql } from 'urql'

export const INVEST_TAGS = gql`
  query InvestTags {
    tags {
      name
      type
      id
    }
  }
`
