import {
  getAPIClient,
  TokensAliasQuery,
  TokensAliasQueryVariables,
  TokensQuery,
  TokensQueryVariables,
  TokenUpdateMutation,
  TokenUpdateMutationVariables,
} from '~/api'
import { TOKENS_ALIAS } from './token-alias-list.graphql'
import { TOKENS } from './token-list.graphql'
import { TOKEN_UPDATE } from './token-update.graphql'

export const tokensApi = {
  tokenList: (variables: TokensQueryVariables) =>
    getAPIClient()
      .request<TokensQuery, unknown, TokensQueryVariables>({
        query: TOKENS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        list: data?.tokens.list ?? [],
        count: data?.tokens.pagination.count ?? 0,
      })),

  tokenAliasList: (variables: TokensAliasQueryVariables) =>
    getAPIClient()
      .request<TokensAliasQuery, unknown, TokensAliasQueryVariables>({
        query: TOKENS_ALIAS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        list: data?.tokensAlias.list ?? [],
        count: data?.tokensAlias.pagination.count ?? 0,
      })),

  tokenUpdate: (variables: TokenUpdateMutationVariables) =>
    getAPIClient()
      .request<TokenUpdateMutation, unknown, TokenUpdateMutationVariables>({
        query: TOKEN_UPDATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.tokenUpdate),
}
