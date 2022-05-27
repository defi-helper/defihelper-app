import { createDomain } from 'effector-logger/macro'
import {
  TokenAliasFragment,
  TokenFragment,
  TokenPriceFeedCoingeckoAddressType,
  TokenPriceFeedCoingeckoIdType,
  TokensAliasQueryVariables,
  TokensQueryVariables,
  TokenUpdateMutationVariables,
} from '~/api'
import { tokensApi } from './common/graphql/tokens.api'

export type PriceFeedCoingeckoId = {
  __typename?: 'TokenPriceFeedCoingeckoIdType'
} & Pick<TokenPriceFeedCoingeckoIdType, 'id' | 'type'>

export type PriceFeedCoingeckoAddress = {
  __typename?: 'TokenPriceFeedCoingeckoAddressType'
} & Pick<TokenPriceFeedCoingeckoAddressType, 'type' | 'platform' | 'address'>

const tokensDomain = createDomain()

export const fetchTokensFx = tokensDomain.createEffect(
  (input: TokensQueryVariables) => tokensApi.tokenList(input)
)

export const fetchTokensAliasFx = tokensDomain.createEffect(
  (input: TokensAliasQueryVariables) => tokensApi.tokenAliasList(input)
)

export const tokenUpdateFx = tokensDomain.createEffect(
  (variables: TokenUpdateMutationVariables) => tokensApi.tokenUpdate(variables)
)

export const $tokens = tokensDomain
  .createStore<TokenFragment[]>([])
  .on(fetchTokensFx.doneData, (_, payload) => payload.list)
  .on(tokenUpdateFx.doneData, (state, payload) =>
    state.map((item) => {
      return item.id === payload?.id ? payload : item
    })
  )

export const $tokensAlias = tokensDomain
  .createStore<TokenAliasFragment[]>([])
  .on(fetchTokensAliasFx.doneData, (_, payload) => payload.list)
