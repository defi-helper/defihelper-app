import { createDomain, UnitValue } from 'effector-logger/macro'
import contractsConfig from '@defihelper/networks/contracts.json'
import type { ContractInterface } from 'ethers'

export const governanceMultisig = createDomain()

export const fetchAbiFx = governanceMultisig.createEffect(async () => {
  const networks = Object.fromEntries(
    Object.entries(contractsConfig).filter(([, contracts]) =>
      Object.keys(contracts).some((contract) => contract === 'GovernorMultisig')
    )
  ) as Record<
    string,
    { [key: string]: { address: string; deployBlockNumber: number } }
  >

  const currentChainId = '56'

  const currentNetwork = networks[currentChainId]

  return Object.keys(currentNetwork).reduce<
    Promise<Record<string, ContractInterface>>
  >(async (acc, contractName) => {
    const previousAcc = await acc

    previousAcc[contractName] = (
      await import(`@defihelper/networks/abi/${contractName}.json`)
    ).abi

    return acc
  }, Promise.resolve({}))
})

export const $contracts = governanceMultisig
  .createStore<UnitValue<typeof fetchAbiFx.doneData>>({})
  .on(fetchAbiFx.doneData, (_, payload) => payload)
