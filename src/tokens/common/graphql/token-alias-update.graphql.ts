import { gql } from 'urql'
import { TOKEN_ALIAS_FRAGMENT } from './token-alias.fragment.graphql'

export const TOKEN_ALIAS_UPDATE = gql`
  mutation TokenAliasUpdate(
    $id: UuidType!
    $input: TokenAliasUpdateInputType!
  ) {
    tokenAliasUpdate(id: $id, input: $input) {
      ...tokenAlias
    }
  }
  ${TOKEN_ALIAS_FRAGMENT}
`
