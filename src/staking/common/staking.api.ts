import { getAPIClient } from '~/api'
import {
  StakingContractCreateMutation,
  StakingContractCreateMutationVariables,
  StakingContractDeleteMutation,
  StakingContractDeleteMutationVariables,
  StakingContractListQuery,
  StakingContractListQueryVariables,
  StakingContractUpdateMutationVariables,
  StakingContractUpdateMutation,
  StakingConnectWalletMutation,
  StakingConnectWalletMutationVariables,
  StakingDisconnectWalletMutation,
  StakingDisconnectWalletMutationVariables,
  StakingConnectedContractsQuery,
  StakingConnectedContractsQueryVariables,
  StakingTokensQuery,
  StakingTokensQueryVariables
} from '~/graphql/_generated-types'
import {
  STAKING_CONTRACT_LIST,
  STAKING_CONTRACT_DELETE,
  STAKING_CONTRACT_CREATE,
  STAKING_CONTRACT_UPDATE,
  STAKING_CONNECT_WALLET,
  STAKING_DISCONNECT_WALLET,
  STAKING_TOKENS
} from './graphql'
import { STAKING_CONNECTED_CONTRACTS } from './graphql/staking-connected-contracts.graphql'

export const stakingApi = {
  contractList: (variables: StakingContractListQueryVariables) =>
    getAPIClient()
      .mutation<StakingContractListQuery, StakingContractListQueryVariables>(
        STAKING_CONTRACT_LIST,
        variables
      )
      .toPromise()
      .then(({ data }) => ({
        adapter: data?.protocol?.adapter,
        contracts: data?.protocol?.contracts.list ?? []
      })),

  contractDelete: (id: string) =>
    getAPIClient()
      .mutation<
        StakingContractDeleteMutation,
        StakingContractDeleteMutationVariables
      >(STAKING_CONTRACT_DELETE, { id })
      .toPromise()
      .then(({ data }) => data?.contractDelete),

  contractCreate: (variables: StakingContractCreateMutationVariables) =>
    getAPIClient()
      .mutation<
        StakingContractCreateMutation,
        StakingContractCreateMutationVariables
      >(STAKING_CONTRACT_CREATE, variables)
      .toPromise()
      .then(({ data }) => data?.contractCreate.protocolId),

  contractUpdate: (variables: StakingContractUpdateMutationVariables) =>
    getAPIClient()
      .mutation<
        StakingContractUpdateMutation,
        StakingContractUpdateMutationVariables
      >(STAKING_CONTRACT_UPDATE, variables)
      .toPromise()
      .then(({ data }) => data?.contractUpdate.protocolId),

  connectWallet: (variables: StakingConnectWalletMutationVariables) =>
    getAPIClient()
      .mutation<
        StakingConnectWalletMutation,
        StakingConnectWalletMutationVariables
      >(STAKING_CONNECT_WALLET, variables)
      .toPromise()
      .then(({ data }) => data?.contractWalletLink),

  disconnectWallet: (variables: StakingDisconnectWalletMutationVariables) =>
    getAPIClient()
      .mutation<
        StakingDisconnectWalletMutation,
        StakingDisconnectWalletMutationVariables
      >(STAKING_DISCONNECT_WALLET, variables)
      .toPromise()
      .then(({ data }) => data?.contractWalletUnlink),

  connectedContracts: (protocolId: string) =>
    getAPIClient()
      .query<
        StakingConnectedContractsQuery,
        StakingConnectedContractsQueryVariables
      >(STAKING_CONNECTED_CONTRACTS, {
        filter: {
          protocol: [protocolId]
        }
      })
      .toPromise()
      .then(({ data }) =>
        data?.me?.wallets.list?.flatMap(({ contracts }) => contracts.list)
      ),

  tokens: (variables: StakingTokensQueryVariables) =>
    getAPIClient()
      .query<StakingTokensQuery, StakingTokensQueryVariables>(
        STAKING_TOKENS,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.tokens.list ?? [])
}
