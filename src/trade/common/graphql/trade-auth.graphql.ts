import { gql } from 'urql'

export const TRADE_AUTH = gql`
  mutation TradeAuth {
    tradingAuth {
      accessToken
      tokenExpired
    }
  }
`
