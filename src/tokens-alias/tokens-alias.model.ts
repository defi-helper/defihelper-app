import { createDomain } from 'effector-logger/macro'
import {
  TokenAliasFragment,
  TokenAliasUpdateMutationVariables,
  TokenPriceFeedCoingeckoAddressType,
  TokenPriceFeedCoingeckoIdType,
  TokensAliasQueryVariables,
} from '~/api'
import { tokensApi } from '~/tokens/common/graphql/tokens.api'

export type PriceFeedCoingeckoId = {
  __typename?: 'TokenPriceFeedCoingeckoIdType'
} & Pick<TokenPriceFeedCoingeckoIdType, 'id' | 'type'>

export type PriceFeedCoingeckoAddress = {
  __typename?: 'TokenPriceFeedCoingeckoAddressType'
} & Pick<TokenPriceFeedCoingeckoAddressType, 'type' | 'platform' | 'address'>

const tokensAliasDomain = createDomain()

export const fetchTokensAliasFx = tokensAliasDomain.createEffect(
  (input: TokensAliasQueryVariables) => tokensApi.tokenAliasList(input)
)

export const tokenAliasUpdateFx = tokensAliasDomain.createEffect(
  (variables: TokenAliasUpdateMutationVariables) =>
    tokensApi.tokenAliasUpdate(variables)
)

export const $tokensAlias = tokensAliasDomain
  .createStore<TokenAliasFragment[]>([])
  .on(fetchTokensAliasFx.doneData, (_, payload) => payload.list)
  .on(tokenAliasUpdateFx.doneData, (state, payload) =>
    state.map((token) => (token.id === payload?.id ? payload : token))
  )
