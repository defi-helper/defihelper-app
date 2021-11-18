import AggregatorV3Interface from '@defihelper/networks/abi/AggregatorV3Interface.json'
import Automate from '@defihelper/networks/abi/Automate.json'
import AutomateMock from '@defihelper/networks/abi/AutomateMock.json'
import Balance from '@defihelper/networks/abi/Balance.json'
import BalanceConsumerMock from '@defihelper/networks/abi/BalanceConsumerMock.json'
import Budget from '@defihelper/networks/abi/Budget.json'
import Context from '@defihelper/networks/abi/Context.json'
import ERC20 from '@defihelper/networks/abi/ERC20.json'
import ERC20Mock from '@defihelper/networks/abi/ERC20Mock.json'
import EnumerableSet from '@defihelper/networks/abi/EnumerableSet.json'
import GovernanceToken from '@defihelper/networks/abi/GovernanceToken.json'
import GovernanceTokenInterface from '@defihelper/networks/abi/GovernanceTokenInterface.json'
import GovernorBravoDelegateStorageV1 from '@defihelper/networks/abi/GovernorBravoDelegateStorageV1.json'
import GovernorBravoDelegatorStorage from '@defihelper/networks/abi/GovernorBravoDelegatorStorage.json'
import GovernorBravoEvents from '@defihelper/networks/abi/GovernorBravoEvents.json'
import IERC20 from '@defihelper/networks/abi/IERC20.json'
import IERC20Metadata from '@defihelper/networks/abi/IERC20Metadata.json'
import Ownable from '@defihelper/networks/abi/Ownable.json'
import Pausable from '@defihelper/networks/abi/Pausable.json'
import PriceFeedMock from '@defihelper/networks/abi/PriceFeedMock.json'
import GovernorBravo from '@defihelper/networks/abi/GovernorBravo.json'
import Timelock from '@defihelper/networks/abi/Timelock.json'
import TimelockInterface from '@defihelper/networks/abi/TimelockInterface.json'
import Treasury from '@defihelper/networks/abi/Treasury.json'
import Store from '@defihelper/networks/abi/Store.json'

export const abi = {
  AggregatorV3Interface,
  Automate,
  AutomateMock,
  Balance,
  BalanceConsumerMock,
  Budget,
  Context,
  ERC20,
  ERC20Mock,
  EnumerableSet,
  GovernanceToken,
  GovernanceTokenInterface,
  GovernorBravoDelegateStorageV1,
  GovernorBravoDelegatorStorage,
  GovernorBravoEvents,
  IERC20,
  IERC20Metadata,
  Ownable,
  Pausable,
  PriceFeedMock,
  GovernorBravo,
  Timelock,
  TimelockInterface,
  Treasury,
  Store,
} as const

export type AbiKeys = keyof typeof abi

export const isContract = (contract: string): contract is AbiKeys => {
  return contract in abi
}
