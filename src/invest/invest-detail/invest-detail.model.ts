import { createStore, createEvent, createEffect, UnitValue } from 'effector'

import { AutostakingStakingContractsQueryVariables } from '~/api'
import { automationApi } from '~/automations/common/automation.api'
import { investApi } from '~/invest/common/invest.api'

export const fetchContractFx = createEffect(
  async ({
    signal,
    ...variables
  }: AutostakingStakingContractsQueryVariables & {
    signal: AbortSignal
  }) => {
    const { list } = await investApi.contracts(
      {
        ...variables,
        filter: {
          ...variables.filter,
        },
      },
      signal
    )

    const [contract] = list

    if (!contract) throw new Error('contract did not find')

    return contract
  }
)

export const resetContract = createEvent()

export const $contract = createStore<UnitValue<
  typeof fetchContractFx.doneData
> | null>(null)
  .on(fetchContractFx.doneData, (_, payload) => payload)
  .reset(resetContract)

export const fetchContractAddressesFx = createEffect(
  async (params: {
    contracts: UnitValue<typeof fetchContractFx.doneData>[]
    protocolAdapter?: string
  }) => {
    const contracts = params.contracts.map(({ id, network, automate }) => ({
      id,
      network,
      autorestake: automate.autorestake,
    }))

    return automationApi.getContractsAddresses(
      contracts,
      params.protocolAdapter
    )
  }
)

export const automateInvestCreateFx = createEffect(
  investApi.automateInvestCreate
)

export const automateInvestRefundFx = createEffect(
  investApi.automateInvestRefund
)
