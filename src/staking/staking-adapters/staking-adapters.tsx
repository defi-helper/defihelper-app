import React from 'react'
import { useGate, useStore } from 'effector-react'

import { StakingAdapterForm } from '~/staking/common'
import * as model from './staking-adapters.model'

export type StakingAdaptersProps = {
  className?: string
  contractAddress: string
  contractAdapter: string
  protocolAdapter: string
  contractLayout: string
}

const FORM_LAYOUTS: Record<string, React.ElementType | undefined> = {
  staking: StakingAdapterForm,
}

const createAdapterAction =
  (
    contractAddress: string,
    adapter?: model.StakingAdapter,
    action?: model.ContractAction['action']
  ) =>
  (amount: string) => {
    model.contractAction({
      action,
      amount,
      contractAddress,
      actions: adapter?.actions ?? undefined,
      decimals: adapter?.staking.decimals,
    })
  }

export const StakingAdapters: React.FC<StakingAdaptersProps> = (props) => {
  const adapters = useStore(model.$contracts)
  const loading = useStore(model.fetchContractAdaptersFx.pending)

  const adapter = adapters.get(props.contractAddress)

  const FormLayout = FORM_LAYOUTS[props.contractLayout]

  const handleClaim = createAdapterAction(
    props.contractAddress,
    adapter,
    'claim'
  )
  const handleStake = createAdapterAction(
    props.contractAddress,
    adapter,
    'stake'
  )
  const handleUnStake = createAdapterAction(
    props.contractAddress,
    adapter,
    'unstake'
  )
  const handleExit = createAdapterAction(props.contractAddress, adapter, 'exit')

  const actions = useStore(model.$actions)
  const action = actions[props.contractAddress]

  const tokens = useStore(model.$tokens)

  useGate(model.StakingAdaptersGate, {
    protocolAdapter: props.protocolAdapter,
    contracts: [
      { address: props.contractAddress, adapter: props.contractAdapter },
    ],
  })

  return (
    <div>
      {loading && 'loading...'}
      {!loading && !adapter && 'empty adapter'}
      {!loading &&
        adapter &&
        FormLayout &&
        React.createElement(FormLayout, {
          ...adapter,
          disabled: action?.disabled,
          claim: action?.claim,
          exit: action?.exit,
          stake: action?.stake,
          unstake: action?.unstake,
          onClaim: handleClaim,
          onStake: handleStake,
          onUnStake: handleUnStake,
          onExit: handleExit,
          tokens,
        })}
    </div>
  )
}
