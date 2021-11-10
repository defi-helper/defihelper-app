import { gql } from '@urql/core'

export const PROTOCOL_FAVORITE = gql`
  mutation ProtocolFavorite($input: ProtocolFavoriteInputType!) {
    protocolFavorite(input: $input)
  }
`
