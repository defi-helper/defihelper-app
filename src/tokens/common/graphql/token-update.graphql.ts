import { gql } from 'urql'
import { TOKEN_FRAGMENT } from './token.fragment.graphql'

export const TOKEN_UPDATE = gql`
  mutation TokenUpdate($id: UuidType!, $input: TokenUpdateInputType!) {
    tokenUpdate(id: $id, input: $input) {
      ...token
    }
  }
  ${TOKEN_FRAGMENT}
`
