import Balance from '@defihelper/networks/abi/Balance.json'
import Budget from '@defihelper/networks/abi/Budget.json'
import GovernanceToken from '@defihelper/networks/abi/GovernanceToken.json'
import GovernanceTokenInterface from '@defihelper/networks/abi/GovernanceTokenInterface.json'
import GovernorBravoDelegateStorageV1 from '@defihelper/networks/abi/GovernorBravoDelegateStorageV1.json'
import GovernorBravoDelegatorStorage from '@defihelper/networks/abi/GovernorBravoDelegatorStorage.json'
import GovernorBravoEvents from '@defihelper/networks/abi/GovernorBravoEvents.json'
import GovernorBravo from '@defihelper/networks/abi/GovernorBravo.json'
import Timelock from '@defihelper/networks/abi/Timelock.json'
import TimelockInterface from '@defihelper/networks/abi/TimelockInterface.json'
import Treasury from '@defihelper/networks/abi/Treasury.json'
import Store from '@defihelper/networks/abi/Store.json'
import Delegator from '@defihelper/networks/abi/Delegator.json'

export const abi = {
  Balance,
  Budget,
  GovernanceToken,
  GovernanceTokenInterface,
  GovernorBravoDelegateStorageV1,
  GovernorBravoDelegatorStorage,
  GovernorBravoEvents,
  GovernorBravo,
  Timelock,
  TimelockInterface,
  Treasury,
  Store,
  DelegatorAdvisors: Delegator,
  DelegatorDevelopment: Delegator,
  DelegatorEarlyEcosystem: Delegator,
  DelegatorLiquidity: Delegator,
  DelegatorMarketing: Delegator,
  DelegatorTeam: Delegator,
} as const

export type AbiKeys = keyof typeof abi

export const isContract = (contract: string): contract is AbiKeys => {
  return contract in abi
}
