import { useStore } from 'effector-react'
import { useState, useMemo, useCallback } from 'react'
import { ethers } from 'ethers'
import type { JsonFragment } from '@ethersproject/abi'
import { useAsync } from 'react-use'

import { AppLayout } from '~/layouts'
import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { ContractParametersDialog, ContractsDialog } from './common'
import { ButtonBase } from '~/common/button-base'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { bignumberUtils } from '~/common/bignumber-utils'
import { useQueryParams } from '~/common/hooks'
import { Input } from '~/common/input'
import * as model from './governance-multisig.model'
import { switchNetwork } from '~/wallets/common'
import { networksConfig } from '~/networks-config'

export type GovernanceMultisigProps = unknown

type Action = {
  name: string
  params: { name: string; type: string; value: string }[]
  contract: string
}

const safeJsonParse = (
  value: string
): Partial<{ network: string; actions: Action[] }> => {
  try {
    return JSON.parse(value)
  } catch {
    return {}
  }
}

export const GovernanceMultisig: React.VFC<GovernanceMultisigProps> = () => {
  const [openContractsDialog] = useDialog(ContractsDialog)
  const [openParametersDialog] = useDialog(ContractParametersDialog)
  const contracts = useStore(model.$contracts)
  const query = useQueryParams()

  const stateQuery = query.get('state')
  const queryObj = useMemo(
    () => (stateQuery ? safeJsonParse(atob(stateQuery)) : {}),
    [stateQuery]
  )
  const [actions, setActions] = useState<Action[]>(queryObj?.actions ?? [])
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

  const handleDelete = (index: number) => () => {
    setActions(actions.filter((_, ind) => ind !== index))
  }

  const getContract = useCallback(() => {
    if (!wallet?.chainId || !contracts.GovernorMultisig) return null

    const networkProvider = walletNetworkModel.getNetwork(
      wallet.provider,
      wallet.chainId
    )

    if (!networkProvider) return null

    const governor = new ethers.Contract(
      contracts.GovernorMultisig.address,
      contracts.GovernorMultisig.abi,
      networkProvider.getSigner()
    )

    return governor
  }, [contracts.GovernorMultisig, wallet])

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

    const governor = getContract()

    if (!governor) return

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
    if (!wallet?.chainId) return

    const objJsonStr = JSON.stringify({
      actions,
      network: wallet.chainId,
    })

    const objJsonB64 = btoa(objJsonStr)

    setUrl(`${window.location.href}?state=${objJsonB64}`)
  }

  const isOwner = useAsync(async () => {
    const contract = getContract()

    if (!contract || !wallet?.account) return

    return contract.isOwner(wallet.account)
  }, [getContract, wallet])

  const changeNetwork = useAsync(async () => {
    if (!wallet?.chainId) return

    if (!queryObj.network || queryObj.network === wallet.chainId) return

    try {
      return await switchNetwork(queryObj.network)
    } catch {
      throw new Error(
        `please change network to ${networksConfig[queryObj.network]?.title}`
      )
    }
  }, [queryObj.network, wallet])

  return (
    <AppLayout>
      {changeNetwork.error?.message}
      {isOwner.loading && 'loading...'}
      {isOwner.value === true && !changeNetwork.error?.message && (
        <>
          <Button onClick={createTransaction}>Create transaction</Button>
          <div>
            {actions.map((action, index) => (
              <div key={String(index)}>
                {action.contract}.{action.name}(
                {action.params.map((param) => param.value).join(', ')})
                <ButtonBase onClick={handleEdit(action, index)}>
                  Edit
                </ButtonBase>
                <ButtonBase onClick={handleDelete(index)}>Delete</ButtonBase>
              </div>
            ))}
          </div>
          <Button onClick={handleExecute}>Execute</Button>
          <Button onClick={handleShare}>Share</Button>
          {url && <Input type="textarea" defaultValue={url} key={url} />}
        </>
      )}
      {isOwner.value === false && <>you&apos;re not owner</>}
    </AppLayout>
  )
}
