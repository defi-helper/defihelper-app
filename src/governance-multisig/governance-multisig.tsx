/* eslint-disable no-unused-vars */
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import type { JsonFragment } from '@ethersproject/abi'

import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { AppLayout } from '~/layouts'
import { ContractParametersDialog, ContractsDialog } from './common'
import * as model from './governance-multisig.model'
import { ButtonBase } from '~/common/button-base'

export type GovernanceMultisigProps = unknown

type Action = {
  name: string
  params: { name: string; type: string; value: string }[]
  contract: string
}

export const GovernanceMultisig: React.VFC<GovernanceMultisigProps> = () => {
  const [openContractsDialog] = useDialog(ContractsDialog)
  const [openParametersDialog] = useDialog(ContractParametersDialog)
  const contracts = useStore(model.$contracts)
  const [actions, setActions] = useState<Action[]>([])

  const createTransaction = async () => {
    try {
      const contract = await openContractsDialog({
        contracts: Object.keys(contracts),
      })

      const currentContract = contracts[contract] as JsonFragment[]

      const { functions } = new ethers.utils.Interface(currentContract)

      const normalizedFunctions = Object.values(functions).reduce(
        (acc, { name: nameFn, inputs }, fnId) => {
          acc[nameFn] = {
            name: nameFn,
            id: String(fnId),
            inputs: inputs.map(({ type, name: nameArg }, argId) => ({
              type,
              name: nameArg,
              id: String(argId),
            })),
          }

          return acc
        },
        {} as Record<
          string,
          {
            name: string
            id: string
            inputs: {
              type: string
              name: string
              id: string
            }[]
          }
        >
      )

      const method = await openContractsDialog({
        contracts: Object.keys(normalizedFunctions),
      })

      const params = await openParametersDialog({
        method: normalizedFunctions[method],
      })

      setActions([...actions, { ...params, contract }])
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleEdit = (action: Action, index: number) => async () => {
    try {
      const params = await openParametersDialog({
        method: {
          name: action.name,
          id: String(index),
          inputs: action.params.map((param, ind) => ({
            ...param,
            id: String(ind),
          })),
        },
      })

      setActions(
        actions.map((ac, ind) =>
          ind === index ? { ...params, contract: action.contract } : ac
        )
      )
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  useEffect(() => {
    model.fetchAbiFx()
  }, [])

  return (
    <AppLayout>
      <Button onClick={createTransaction}>Create transaction</Button>
      {actions.map((action, index) => (
        <div key={String(index)}>
          {action.contract}.{action.name}(
          {action.params.map((param) => param.value).join(', ')})
          <ButtonBase onClick={handleEdit(action, index)}>Edit</ButtonBase>
        </div>
      ))}
    </AppLayout>
  )
}
