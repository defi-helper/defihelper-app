import { useState } from 'react'

import { abi, AbiKeys } from '~/abi'
import { GovernanceActionsParams } from '../governance-actions-params/governance-actions-params'
import { GovernanceActionsSelect } from '../governance-actions-select'
import { GovernanceActionsStepper } from '../governance-actions-stepper'
import { parseContract, AbiItem } from '../parse-contract'
import {
  GovernanceAction,
  GovernanceActionArguments,
} from '../governance.types'

export type GovernanceActionsManuallyProps = {
  onBack: () => void
  onSubmit: (action: GovernanceAction) => void
  initialAction?: GovernanceAction
}

const contractNames = Object.keys(abi) as AbiKeys[]

const isContracts = (contract: string): contract is AbiKeys => {
  return contract in abi
}

export const GovernanceActionsManually: React.VFC<GovernanceActionsManuallyProps> =
  (props) => {
    const [contract, setContract] = useState<string>(
      props.initialAction?.contract ?? ''
    )
    const [method, setMethod] = useState(props.initialAction?.method ?? '')

    const handleOnSubmit = (args: GovernanceActionArguments) => {
      if (!contract) {
        throw new Error('contract is null')
      }

      props.onSubmit({
        contract,
        method,
        arguments: args,
      })
    }

    const methods = isContracts(contract)
      ? parseContract(abi[contract] as { abi: AbiItem[] })
      : {}

    const methodNames = Object.values(methods).map(
      ({ methodName }) => methodName
    )

    const inputs = methods[method]?.inputs
      .map((input) => ({
        ...input,
        value: props.initialAction?.arguments[input.name]?.value ?? input.value,
        type: props.initialAction?.arguments[input.name]?.type ?? input.type,
      }))
      .reduce<GovernanceActionArguments>((acc, { name, value, type }) => {
        acc[name] = { value, type }

        return acc
      }, {})

    const steps = [
      <GovernanceActionsSelect
        key={1}
        onSubmit={setContract}
        options={contractNames}
      >
        Select target
      </GovernanceActionsSelect>,
      <GovernanceActionsSelect
        key={2}
        onSubmit={setMethod}
        options={methodNames}
      >
        {contract}
      </GovernanceActionsSelect>,
      <GovernanceActionsParams
        key={3}
        onSubmit={handleOnSubmit}
        methodName={method}
        contract={contract ?? ''}
        inputs={inputs ?? {}}
      >
        {contract} <br />
        {method}
      </GovernanceActionsParams>,
    ]

    return (
      <GovernanceActionsStepper
        onBack={props.onBack}
        initialStep={props.initialAction ? steps.length - 1 : undefined}
      >
        {steps}
      </GovernanceActionsStepper>
    )
  }
