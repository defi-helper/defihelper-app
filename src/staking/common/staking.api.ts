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
  StakingTokensQueryVariables,
  StakingContractMetricQueryVariables,
  StakingContractMetricQuery,
  StakingAutomatesContractsQueryVariables,
  StakingAutomatesContractsQuery,
  StakingUpdateMetricsMutationVariables,
  StakingUpdateMetricsMutation,
  AutomationContractCreateMutation,
  AutomationContractCreateMutationVariables,
  AutomationContractUpdateMutation,
  AutomationContractUpdateMutationVariables,
  AutomationContractDeleteMutation,
  AutomationContractDeleteMutationVariables,
  ContractScannerRegisterMutationVariables,
  ContractScannerRegisterMutation,
  StakingContractDebankListQuery,
  RestakeCalculatorQueryVariables,
  RestakeCalculatorQuery,
  InvestStopLossEnableMutationVariables,
  InvestStopLossEnableMutation,
} from '~/api/_generated-types'
import {
  STAKING_CONTRACT_LIST,
  STAKING_CONTRACT_DELETE,
  STAKING_CONTRACT_CREATE,
  STAKING_CONTRACT_UPDATE,
  STAKING_CONNECT_WALLET,
  STAKING_DISCONNECT_WALLET,
  STAKING_TOKENS,
  STAKING_CONTRACT_METRIC,
  STAKING_AUTOMATES_CONTRACTS,
  STAKING_CONNECTED_CONTRACTS,
  AUTOMATION_CONTRACT_CREATE,
  AUTOMATION_CONTRACT_UPDATE,
  AUTOMATION_CONTRACT_DELETE,
  STAKING_UPDATE_METRICS,
  STAKING_APY_RESTAKE_CALCULATOR,
  INVEST_STOP_LOSS_ENABLE,
} from './graphql'
import { config } from '~/config'
import { CONTRACT_SCANNER_REGISTER } from '~/protocols/common/graphql/contract-scanner-register.graphql'
import { STAKING_CONTRACT_DEBANK_LIST } from './graphql/staking-contract-debank-list.graphql'

export interface WatcherEventListener {
  id: string
  sync: {
    currentBlock: number
    syncHeight: number
  }
  contract: string
}

export const stakingApi = {
  contractList: (variables: StakingContractListQueryVariables) =>
    getAPIClient()
      .request<
        StakingContractListQuery,
        unknown,
        StakingContractListQueryVariables
      >({
        query: STAKING_CONTRACT_LIST.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        adapter: data?.protocol?.adapter,
        contracts: data?.protocol?.contracts.list ?? [],
        pagination: data?.protocol?.contracts.pagination.count ?? 0,
      })),

  contractDebankList: (variables: StakingContractListQueryVariables) =>
    getAPIClient()
      .request<
        StakingContractDebankListQuery,
        unknown,
        StakingContractListQueryVariables
      >({
        query: STAKING_CONTRACT_DEBANK_LIST.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        contracts: data?.protocol?.contractsDebank.list ?? [],
        pagination: data?.protocol?.contractsDebank.pagination.count ?? 0,
      })),

  contractDelete: (id: string) =>
    getAPIClient()
      .request<
        StakingContractDeleteMutation,
        unknown,
        StakingContractDeleteMutationVariables
      >({
        query: STAKING_CONTRACT_DELETE.loc?.source.body ?? '',
        variables: { id },
      })
      .then(({ data }) => data?.contractDelete),

  contractCreate: (variables: StakingContractCreateMutationVariables) =>
    getAPIClient()
      .request<
        StakingContractCreateMutation,
        unknown,
        StakingContractCreateMutationVariables
      >({
        query: STAKING_CONTRACT_CREATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.contractCreate.protocol.id),

  contractUpdate: (variables: StakingContractUpdateMutationVariables) =>
    getAPIClient()
      .request<
        StakingContractUpdateMutation,
        unknown,
        StakingContractUpdateMutationVariables
      >({
        query: STAKING_CONTRACT_UPDATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.contractUpdate),

  connectWallet: (variables: StakingConnectWalletMutationVariables) =>
    getAPIClient()
      .request<
        StakingConnectWalletMutation,
        unknown,
        StakingConnectWalletMutationVariables
      >({
        query: STAKING_CONNECT_WALLET.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.contractWalletLink),

  updateMetrics: (contract: string) =>
    getAPIClient()
      .request<
        StakingUpdateMetricsMutation,
        unknown,
        StakingUpdateMetricsMutationVariables
      >({
        query: STAKING_UPDATE_METRICS.loc?.source.body ?? '',
        variables: { contract },
      })
      .then(({ data }) => data?.contractMetricScan),

  disconnectWallet: (variables: StakingDisconnectWalletMutationVariables) =>
    getAPIClient()
      .request<
        StakingDisconnectWalletMutation,
        unknown,
        StakingDisconnectWalletMutationVariables
      >({
        query: STAKING_DISCONNECT_WALLET.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.contractWalletUnlink),

  connectedContracts: (protocolId: string) =>
    getAPIClient()
      .request<
        StakingConnectedContractsQuery,
        unknown,
        StakingConnectedContractsQueryVariables
      >({
        query: STAKING_CONNECTED_CONTRACTS.loc?.source.body ?? '',
        variables: {
          filter: {
            protocol: [protocolId],
          },
        },
      })
      .then(({ data }) =>
        data?.me?.wallets.list?.flatMap(({ contracts }) => contracts.list)
      ),

  tokens: (variables: StakingTokensQueryVariables) =>
    getAPIClient()
      .request<StakingTokensQuery, unknown, StakingTokensQueryVariables>({
        query: STAKING_TOKENS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) =>
        (data?.tokens.list ?? []).map((token) => ({
          id: token.id,
          logoUrl: token.alias?.logoUrl ?? '',
          symbol: token.symbol,
          address: token.address,
        }))
      ),

  contractMetric: (variables: StakingContractMetricQueryVariables) =>
    getAPIClient()
      .request<
        StakingContractMetricQuery,
        unknown,
        StakingContractMetricQueryVariables
      >({
        query: STAKING_CONTRACT_METRIC.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.me),

  contractScannerRegister: (
    variables: ContractScannerRegisterMutationVariables
  ) =>
    getAPIClient()
      .request<
        ContractScannerRegisterMutation,
        unknown,
        ContractScannerRegisterMutationVariables
      >({
        query: CONTRACT_SCANNER_REGISTER.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.contractScannerRegister),

  automatesContractList: (
    variables?: StakingAutomatesContractsQueryVariables
  ) =>
    getAPIClient()
      .request<
        StakingAutomatesContractsQuery,
        unknown,
        StakingAutomatesContractsQueryVariables
      >({
        query: STAKING_AUTOMATES_CONTRACTS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        list: data?.automateContracts.list ?? [],
        count: data?.automateContracts.pagination.count ?? 0,
      })),

  createAutomatesContract: (
    variables: AutomationContractCreateMutationVariables
  ) =>
    getAPIClient()
      .request<
        AutomationContractCreateMutation,
        unknown,
        AutomationContractCreateMutationVariables
      >({
        query: AUTOMATION_CONTRACT_CREATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateContractCreate),

  updateAutomatesContract: (
    variables: AutomationContractUpdateMutationVariables
  ) =>
    getAPIClient()
      .request<
        AutomationContractUpdateMutation,
        unknown,
        AutomationContractUpdateMutationVariables
      >({
        query: AUTOMATION_CONTRACT_UPDATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateContractUpdate),

  deleteAutomatesContract: (
    variables: AutomationContractDeleteMutationVariables
  ) =>
    getAPIClient()
      .request<
        AutomationContractDeleteMutation,
        unknown,
        AutomationContractDeleteMutationVariables
      >({
        query: AUTOMATION_CONTRACT_DELETE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateContractDelete),

  restakeCalculator: (variables: RestakeCalculatorQueryVariables) =>
    getAPIClient()
      .request<
        RestakeCalculatorQuery,
        unknown,
        RestakeCalculatorQueryVariables
      >({
        query: STAKING_APY_RESTAKE_CALCULATOR.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.restakeCalculator),

  scannerGetEventListener: (variables: {
    id: string
  }): Promise<WatcherEventListener[]> =>
    fetch(
      `${config.SCANNER_HOST}/contract/${variables.id}/event-listener`
    ).then((res) => res.json()),

  scannerGetContract: (
    watcherId: string
  ): Promise<{ startHeight: number; id: string } | null> =>
    fetch(`${config.SCANNER_HOST}/contract/${watcherId}`).then(async (res) =>
      res.json()
    ),

  enableStopLoss: (variables: InvestStopLossEnableMutationVariables) =>
    getAPIClient()
      .request<
        InvestStopLossEnableMutation,
        unknown,
        InvestStopLossEnableMutationVariables
      >({
        query: INVEST_STOP_LOSS_ENABLE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateContractStopLossEnable),
}
