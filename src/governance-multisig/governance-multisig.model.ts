import { createDomain, UnitValue, guard, sample } from 'effector'
import contractsConfig from '@defihelper/networks/contracts.json'
import { createGate } from 'effector-react'
import type { ContractInterface } from 'ethers'

import { walletNetworkModel } from '~/wallets/wallet-networks'
import { Wallet } from '~/wallets/common'
import { toastsService } from '~/toasts'

export const governanceMultisig = createDomain()

type NonNullable<T> = Exclude<T, null | undefined>

// eslint-disable-next-line @typescript-eslint/ban-types
type RequiredNonNullableObject<T extends object> = {
  [P in keyof Required<T>]: NonNullable<T[P]>
}

export const fetchAbiFx = governanceMultisig.createEffect(
  async (wallet: RequiredNonNullableObject<Wallet>) => {
    const networks = Object.fromEntries(
      Object.entries(contractsConfig).filter(([, contracts]) =>
        Object.keys(contracts).some(
          (contract) => contract === 'GovernorMultisig'
        )
      )
    ) as Record<
      string,
      { [key: string]: { address: string; deployBlockNumber: number } }
    >

    const currentNetwork = networks[wallet.chainId]

    if (!currentNetwork)
      throw new Error(
        'current network does not have a GovernorMulisig contract'
      )

    return Object.entries(currentNetwork).reduce<
      Promise<Record<string, { abi: ContractInterface; address: string }>>
    >(async (acc, [contractName, { address }]) => {
      const previousAcc = await acc

      previousAcc[contractName] = {
        abi: (await import(`@defihelper/networks/abi/${contractName}.json`))
          .abi,
        address,
      }

      return acc
    }, Promise.resolve({}))
  }
)

export const $contracts = governanceMultisig
  .createStore<UnitValue<typeof fetchAbiFx.doneData>>({})
  .on(fetchAbiFx.doneData, (_, payload) => payload)

export const GovernanceMultisigGate = createGate('GovernanceMultisigGate')

sample({
  clock: guard({
    source: [walletNetworkModel.$wallet, GovernanceMultisigGate.status],
    clock: [walletNetworkModel.$wallet.updates, GovernanceMultisigGate.open],
    filter: (
      source
    ): source is [RequiredNonNullableObject<Wallet>, boolean] => {
      const [wallet, isOpen] = source

      return (
        Boolean(wallet?.chainId && wallet.account && wallet.connector) && isOpen
      )
    },
  }),
  fn: ([wallet]) => wallet,
  target: fetchAbiFx,
})

$contracts.reset(GovernanceMultisigGate.close)
toastsService.forwardErrors(fetchAbiFx.failData)
