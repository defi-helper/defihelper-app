import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import type { JsonFragment } from '@ethersproject/abi'

import { AppLayout } from '~/layouts'
import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { ContractParametersDialog, ContractsDialog } from './common'
import { ButtonBase } from '~/common/button-base'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { bignumberUtils } from '~/common/bignumber-utils'
import * as model from './governance-multisig.model'
import { useQueryParams } from '~/common/hooks'
import { Input } from '~/common/input'

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
  const query = useQueryParams()

  const actionsQuery = query.get('actions')

  const strJsonObj = actionsQuery ? JSON.parse(atob(actionsQuery)) : []
  const [actions, setActions] = useState<Action[]>(strJsonObj)
  const [url, setUrl] = useState('')

  const wallet = walletNetworkModel.useWalletNetwork()

  const createTransaction = async () => {
    try {
      const contract = await openContractsDialog({
        contracts: Object.keys(contracts),
      })

      const currentContract = contracts[contract].abi as JsonFragment[]

      const { functions } = new ethers.utils.Interface(currentContract)

      const normalizedFunctions = Object.values(functions).reduce(
        (acc, { name: nameFn, inputs, stateMutability }, fnId) => {
          acc[nameFn] = {
            name: nameFn,
            id: String(fnId),
            inputs: [
              ...inputs.map(({ type, name: nameArg }, argId) => ({
                type,
                name: nameArg,
                id: String(argId),
              })),
              ...(stateMutability === 'payable'
                ? [
                    {
                      type: 'ether',
                      name: stateMutability,
                      id: String(inputs.length + 1),
                    },
                  ]
                : []),
            ],
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

  const handleExecute = async () => {
    if (!wallet?.chainId || !wallet?.provider) return

    const callDatas = actions.flatMap((action) => {
      const [types, paramValues] = Object.values(action.params)
        .filter(({ type }) => type !== 'ether')
        .reduce<[string[], string[]]>(
          ([params, values], { type, value }) => [
            [...params, type],
            [...values, value],
          ],
          [[], []]
        )
      return ethers.utils.defaultAbiCoder.encode(types, paramValues)
    })
    const signatures = actions.map(
      (action) =>
        `${action.name}(${Object.values(action.params)
          .filter(({ type }) => type !== 'ether')
          .map(({ type }) => type)
          .join()})`
    )
    const values = actions.flatMap(
      ({ params }) =>
        params.find(({ name }) => name === 'payable')?.value ?? '0'
    )

    const targets = actions
      .map((action) => contracts[action.contract]?.address)
      .filter(Boolean)

    const networkProvider = walletNetworkModel.getNetwork(
      wallet.provider,
      wallet.chainId
    )

    if (!networkProvider) return

    const governor = new ethers.Contract(
      contracts.GovernorMultisig.address,
      contracts.GovernorMultisig.abi,
      networkProvider.getSigner()
    )

    try {
      const gasLimit = bignumberUtils.estimateGas(
        await governor.estimateGas.executeTransaction(
          targets,
          values,
          signatures,
          callDatas
        )
      )

      const transactionReceipt = await governor.executeTransaction(
        targets,
        values,
        signatures,
        callDatas,
        {
          gasLimit,
        }
      )

      await transactionReceipt.wait()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleShare = async () => {
    const objJsonStr = JSON.stringify(actions)
    const objJsonB64 = btoa(objJsonStr)

    setUrl(`${window.location.href}?actions=${objJsonB64}`)
  }

  useEffect(() => {
    model.fetchAbiFx()
  }, [])

  return (
    <AppLayout>
      <Button onClick={createTransaction}>Create transaction</Button>
      <div>
        {actions.map((action, index) => (
          <div key={String(index)}>
            {action.contract}.{action.name}(
            {action.params.map((param) => param.value).join(', ')})
            <ButtonBase onClick={handleEdit(action, index)}>Edit</ButtonBase>
          </div>
        ))}
      </div>
      <Button onClick={handleExecute}>Execute</Button>
      <Button onClick={handleShare}>Share</Button>
      {url && <Input type="textarea" defaultValue={url} />}
    </AppLayout>
  )
}
