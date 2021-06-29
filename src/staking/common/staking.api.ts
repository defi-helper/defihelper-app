import { getAPIClient } from '~/api'
import {
  StakingContractCreateMutation,
  StakingContractCreateMutationVariables,
  StakingContractDeleteMutation,
  StakingContractDeleteMutationVariables,
  StakingContractListQuery,
  StakingContractListQueryVariables,
  StakingContractUpdateMutationVariables,
  StakingContractUpdateMutation
} from '~/graphql/_generated-types'
import {
  STAKING_CONTRACT_LIST,
  STAKING_CONTRACT_DELETE,
  STAKING_CONTRACT_CREATE,
  STAKING_CONTRACT_UPDATE
} from './graphql'

export const stakingApi = {
  contractList: (variables: StakingContractListQueryVariables) =>
    getAPIClient()
      .mutation<StakingContractListQuery, StakingContractListQueryVariables>(
        STAKING_CONTRACT_LIST,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.protocol?.contracts.list ?? []),

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
      .then(({ data }) => data?.contractUpdate.protocolId)
}
