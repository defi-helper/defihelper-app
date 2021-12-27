import { gql } from 'urql'

export const PROTOCOL_FAVORITE = gql`
  mutation ProtocolFavorite($input: ProtocolFavoriteInputType!) {
    protocolFavorite(input: $input)
  }
`
