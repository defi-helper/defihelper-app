import { combine, createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { StakingContractFragmentFragment } from '~/graphql/_generated-types'
import { userModel } from '~/users'
import { networkModel } from '~/wallets/networks'
import { stakingApi } from '../common'

export const stakingListDomain = createDomain('stakingList')

export const fetchStakingListFx = stakingListDomain.createEffect({
  name: 'fetchStakingList',
  handler: (id: string) => stakingApi.contractList({ filter: { id } })
})

const NOT_DELETED = 'Not deleted'

export const deleteStakingFx = stakingListDomain.createEffect({
  name: 'deleteStakingFx',
  handler: async (id: string) => {
    const isDeleted = await stakingApi.contractDelete(id)

    if (isDeleted) {
      return id
    }

    throw new Error(NOT_DELETED)
  }
})

const NOT_CONNECTED = 'Not connected'

type ConnectParams = { contract: string; wallet: string }

export const connectWalletFx = stakingListDomain.createEffect({
  name: 'connectWalletFx',
  handler: async (params: ConnectParams) => {
    const isConnected = await stakingApi.connectWallet(params)

    if (isConnected) return

    throw new Error(NOT_CONNECTED)
  }
})

const NOT_DISCONNECTED = 'Not disconnected'

export const disconnectWalletFx = stakingListDomain.createEffect({
  name: 'disconnectWalletFx',
  handler: async (params: ConnectParams) => {
    const isDisconnected = await stakingApi.disconnectWallet(params)

    if (isDisconnected) return

    throw new Error(NOT_DISCONNECTED)
  }
})

export const fetchConnectedContractsFx = stakingListDomain.createEffect({
  name: 'fetchConnectedContractsFx',
  handler: (protocolId: string) => stakingApi.connectedContracts(protocolId)
})

const $contractList = stakingListDomain
  .createStore<StakingContractFragmentFragment[]>([], {
    name: '$contractList'
  })
  .on(fetchStakingListFx.doneData, (_, payload) => payload)
  .on(deleteStakingFx.doneData, (state, payload) => {
    return state.filter(({ id }) => id !== payload)
  })

const $connectedContracts = stakingListDomain
  .createStore<Record<string, boolean>>(
    {},
    {
      name: '$connectedContracts'
    }
  )
  .on(fetchConnectedContractsFx.doneData, (_, payload) => {
    return payload?.reduce<Record<string, boolean>>((acc, contract) => {
      if (!contract) return acc

      acc[contract.id] = true

      return acc
    }, {})
  })
  .on(connectWalletFx.done, (state, { params }) => ({
    ...state,
    [params.contract]: true
  }))

const $wallets = userModel.$user.map(
  (user) =>
    user?.wallets.list?.reduce<
      Record<string, { id: string; blockchain: string; network: string }>
    >((acc, { address, id, blockchain, network }) => {
      acc[address] = {
        id,
        blockchain,
        network
      }

      return acc
    }, {}) ?? {}
)

export const $contracts = combine(
  $contractList,
  $connectedContracts,
  $wallets,
  networkModel.$wallet,
  (contractList, connectedContracts, wallets, wallet) => {
    return contractList.map((contract) => ({
      ...contract,
      connected: Boolean(connectedContracts[contract.id]),
      wallet: wallet.account ? wallets[wallet.account] : null
    }))
  }
)

export const Gate = createGate<string>({
  domain: stakingListDomain
})

sample({
  clock: Gate.open,
  target: [fetchStakingListFx, fetchConnectedContractsFx]
})
