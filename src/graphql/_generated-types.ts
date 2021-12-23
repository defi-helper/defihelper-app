/* eslint-disable */
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date and time */
  DateTimeType: string
  /** Metric column */
  MetricColumnType: string
  /** Identificator */
  UuidType: string
}

export type AddWalletInputType = {
  /** Blockchain */
  blockchain: BlockchainEnum
  /** Blockchain network id */
  network: Scalars['String']
  /** Wallet address */
  address: Scalars['String']
}

export type AuthEthereumInputType = {
  /** Blockchain network id */
  network: Scalars['String']
  /** Wallet address */
  address: Scalars['String']
  /** Message */
  message: Scalars['String']
  /** Signed message */
  signature: Scalars['String']
}

export type AuthType = {
  __typename?: 'AuthType'
  /** Authenticated user account */
  user: UserType
  /** Session ID */
  sid: Scalars['String']
}

export type AuthWavesInputType = {
  /** Blockchain network id */
  network: Scalars['String']
  /** Wallet public key */
  publicKey: Scalars['String']
  /** Wallet address */
  address: Scalars['String']
  /** Message */
  message: Scalars['String']
  /** Signed message */
  signature: Scalars['String']
}

export type AutomateActionCreateInputType = {
  /** Trigger */
  trigger: Scalars['UuidType']
  /** Type */
  type: AutomateActionTypeEnum
  /** Parameters */
  params: Scalars['String']
  /** Execution priority (ascending) */
  priority?: Maybe<Scalars['Int']>
}

export type AutomateActionListFilterInputType = {
  id?: Maybe<Scalars['UuidType']>
  type?: Maybe<AutomateConditionTypeEnum>
}

export type AutomateActionListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type AutomateActionListSortInputType = {
  column: AutomateActionListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum AutomateActionListSortInputTypeColumnEnum {
  Priority = 'priority',
}

export type AutomateActionListType = {
  __typename?: 'AutomateActionListType'
  /** Elements */
  list?: Maybe<Array<AutomateActionType>>
  pagination: Pagination
}

export type AutomateActionType = {
  __typename?: 'AutomateActionType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Type */
  type: AutomateActionTypeEnum
  /** Action parameters */
  params: Scalars['String']
  /** Stringify parameters */
  paramsDescription: Scalars['String']
  /** Execution priority (ascending) */
  priority: Scalars['Int']
  /** Created at date */
  createdAt: Scalars['DateTimeType']
}

export enum AutomateActionTypeEnum {
  Notification = 'notification',
  EthereumAutomateRun = 'ethereumAutomateRun',
}

export type AutomateActionUpdateInputType = {
  /** Action identifier */
  id: Scalars['UuidType']
  /** Parameters */
  params?: Maybe<Scalars['String']>
  /** Execution priority (ascending) */
  priority?: Maybe<Scalars['Int']>
}

export type AutomateActionsDescriptionType = {
  __typename?: 'AutomateActionsDescriptionType'
  notification: AutomateDescriptionType
  ethereumAutomateRun: AutomateDescriptionType
}

export type AutomateConditionCreateInputType = {
  /** Trigger */
  trigger: Scalars['UuidType']
  /** Type */
  type: AutomateConditionTypeEnum
  /** Parameters */
  params: Scalars['String']
  /** Execution priority (ascending) */
  priority?: Maybe<Scalars['Int']>
}

export type AutomateConditionListFilterInputType = {
  id?: Maybe<Scalars['UuidType']>
  type?: Maybe<AutomateConditionTypeEnum>
}

export type AutomateConditionListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type AutomateConditionListSortInputType = {
  column: AutomateConditionListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum AutomateConditionListSortInputTypeColumnEnum {
  Priority = 'priority',
}

export type AutomateConditionListType = {
  __typename?: 'AutomateConditionListType'
  /** Elements */
  list?: Maybe<Array<AutomateConditionType>>
  pagination: Pagination
}

export type AutomateConditionType = {
  __typename?: 'AutomateConditionType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Type */
  type: AutomateConditionTypeEnum
  /** Condition parameters */
  params: Scalars['String']
  /** Stringify parameters */
  paramsDescription: Scalars['String']
  /** Execution priority (ascending) */
  priority: Scalars['Int']
  /** Created at date */
  createdAt: Scalars['DateTimeType']
}

export enum AutomateConditionTypeEnum {
  Schedule = 'schedule',
  EthereumAvgGasPrice = 'ethereumAvgGasPrice',
  EthereumBalance = 'ethereumBalance',
  EthereumOptimalAutomateRun = 'ethereumOptimalAutomateRun',
}

export type AutomateConditionUpdateInputType = {
  /** Condition identifier */
  id: Scalars['UuidType']
  /** Parameters */
  params?: Maybe<Scalars['String']>
  /** Execution priority (ascending) */
  priority?: Maybe<Scalars['Int']>
}

export type AutomateConditionsDescriptionType = {
  __typename?: 'AutomateConditionsDescriptionType'
  schedule: AutomateDescriptionType
  ethereumAvgGasPrice: AutomateDescriptionType
  ethereumBalance: AutomateDescriptionType
  ethereumOptimalAutomateRun: AutomateDescriptionType
}

export type AutomateContractCreateInputType = {
  /** Wallet owner */
  wallet: Scalars['UuidType']
  /** Protocol */
  protocol: Scalars['UuidType']
  /** Protocol contract */
  contract?: Maybe<Scalars['UuidType']>
  /** Address */
  address: Scalars['String']
  /** Adapter name */
  adapter: Scalars['String']
  /** Init method parameters */
  initParams: Scalars['String']
}

export type AutomateContractListFilterInputType = {
  user?: Maybe<Scalars['UuidType']>
  /** Owner wallet */
  wallet?: Maybe<Scalars['UuidType']>
  protocol?: Maybe<Scalars['UuidType']>
  contract?: Maybe<Array<Scalars['UuidType']>>
  address?: Maybe<Array<Scalars['String']>>
  archived?: Maybe<Scalars['Boolean']>
}

export type AutomateContractListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type AutomateContractListQuery = {
  __typename?: 'AutomateContractListQuery'
  /** Elements */
  list?: Maybe<Array<AutomateContractType>>
  pagination: Pagination
}

export type AutomateContractListSortInputType = {
  column: AutomateContractListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum AutomateContractListSortInputTypeColumnEnum {
  CreatedAt = 'createdAt',
}

export type AutomateContractMetricType = {
  __typename?: 'AutomateContractMetricType'
  staked: Scalars['String']
  earned: Scalars['String']
  apyBoost: Scalars['String']
}

export type AutomateContractType = {
  __typename?: 'AutomateContractType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Owner wallet */
  wallet: WalletType
  /** Protocol */
  protocol: ProtocolType
  /** Protocol contract */
  contract?: Maybe<ContractType>
  /** Address in blockchain */
  address: Scalars['String']
  /** Automate contract wallet */
  contractWallet?: Maybe<WalletType>
  /** Adapter name */
  adapter: Scalars['String']
  /** Init method parameters */
  initParams: Scalars['String']
  /** Verification status */
  verification: AutomateContractVerificationStatusEnum
  rejectReason: Scalars['String']
  metric: AutomateContractMetricType
  /** Date at archived contract */
  archivedAt?: Maybe<Scalars['DateTimeType']>
}

export type AutomateContractUpdateInputType = {
  /** Contract identifier */
  id: Scalars['UuidType']
  /** Init method parameters */
  initParams?: Maybe<Scalars['String']>
}

export enum AutomateContractVerificationStatusEnum {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Rejected = 'rejected',
}

export type AutomateDescriptionType = {
  __typename?: 'AutomateDescriptionType'
  name: Scalars['String']
  description: Scalars['String']
}

export type AutomateTriggerCallHistoryListFilterInputType = {
  hasError?: Maybe<Scalars['Boolean']>
}

export type AutomateTriggerCallHistoryListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type AutomateTriggerCallHistoryListQuery = {
  __typename?: 'AutomateTriggerCallHistoryListQuery'
  /** Elements */
  list?: Maybe<Array<AutomateTriggerCallHistoryType>>
  pagination: Pagination
}

export type AutomateTriggerCallHistoryListSortInputType = {
  column: AutomateTriggerCallHistoryListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum AutomateTriggerCallHistoryListSortInputTypeColumnEnum {
  CreatedAt = 'createdAt',
}

export type AutomateTriggerCallHistoryType = {
  __typename?: 'AutomateTriggerCallHistoryType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Call error */
  error?: Maybe<Scalars['String']>
  /** Created at date */
  createdAt: Scalars['DateTimeType']
}

export type AutomateTriggerCreateInputType = {
  /** Wallet owner */
  wallet: Scalars['UuidType']
  /** Type */
  type: AutomateTriggerTypeEnum
  /** Parameters */
  params: Scalars['String']
  /** Name */
  name: Scalars['String']
  /** Is active */
  active?: Maybe<Scalars['Boolean']>
}

export type AutomateTriggerFilterInputType = {
  id: Scalars['UuidType']
}

export type AutomateTriggerListFilterInputType = {
  user?: Maybe<Scalars['UuidType']>
  wallet?: Maybe<Scalars['UuidType']>
  active?: Maybe<Scalars['Boolean']>
  search?: Maybe<Scalars['String']>
}

export type AutomateTriggerListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type AutomateTriggerListQuery = {
  __typename?: 'AutomateTriggerListQuery'
  /** Elements */
  list?: Maybe<Array<AutomateTriggerType>>
  pagination: Pagination
}

export type AutomateTriggerListSortInputType = {
  column: AutomateTriggerListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum AutomateTriggerListSortInputTypeColumnEnum {
  Id = 'id',
  Name = 'name',
  CreatedAt = 'createdAt',
}

export type AutomateTriggerType = {
  __typename?: 'AutomateTriggerType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Type */
  type: AutomateTriggerTypeEnum
  /** Trigger parameters */
  params: Scalars['String']
  /** Wallet of owner */
  wallet: WalletType
  /** Name */
  name: Scalars['String']
  /** Is trigger active */
  active: Scalars['Boolean']
  /** Date of last call */
  lastCallAt?: Maybe<Scalars['DateTimeType']>
  /** Created at date */
  createdAt: Scalars['DateTimeType']
  conditions: AutomateConditionListType
  actions: AutomateActionListType
  callHistory: AutomateTriggerCallHistoryListQuery
}

export type AutomateTriggerTypeConditionsArgs = {
  filter?: Maybe<AutomateConditionListFilterInputType>
  sort?: Maybe<Array<AutomateConditionListSortInputType>>
  pagination?: Maybe<AutomateConditionListPaginationInputType>
}

export type AutomateTriggerTypeActionsArgs = {
  filter?: Maybe<AutomateActionListFilterInputType>
  sort?: Maybe<Array<AutomateActionListSortInputType>>
  pagination?: Maybe<AutomateActionListPaginationInputType>
}

export type AutomateTriggerTypeCallHistoryArgs = {
  filter?: Maybe<AutomateTriggerCallHistoryListFilterInputType>
  sort?: Maybe<Array<AutomateTriggerCallHistoryListSortInputType>>
  pagination?: Maybe<AutomateTriggerCallHistoryListPaginationInputType>
}

export enum AutomateTriggerTypeEnum {
  EveryMonth = 'everyMonth',
  EveryWeek = 'everyWeek',
  EveryDay = 'everyDay',
  EveryHour = 'everyHour',
  ContractEvent = 'contractEvent',
}

export type AutomateTriggerUpdateInputType = {
  /** Trigger identifier */
  id: Scalars['UuidType']
  /** Name */
  name?: Maybe<Scalars['String']>
  /** Is active */
  active?: Maybe<Scalars['Boolean']>
}

export type AutomateTriggersDescriptionType = {
  __typename?: 'AutomateTriggersDescriptionType'
  everyMonth: AutomateDescriptionType
  everyWeek: AutomateDescriptionType
  everyDay: AutomateDescriptionType
  everyHour: AutomateDescriptionType
  contractEvent: AutomateDescriptionType
}

export type AutomatesDescriptionType = {
  __typename?: 'AutomatesDescriptionType'
  triggers: AutomateTriggersDescriptionType
  conditions: AutomateConditionsDescriptionType
  actions: AutomateActionsDescriptionType
}

export type BillingBalanceType = {
  __typename?: 'BillingBalanceType'
  lowFeeFunds: Scalars['Boolean']
  balance: Scalars['Float']
  claim: Scalars['Float']
  netBalance: Scalars['Float']
}

export enum BillingBillStatusEnum {
  /** Bill awaiting confirmation */
  Pending = 'pending',
  /** Bill accepted */
  Accepted = 'accepted',
  /** Bill rejected */
  Rejected = 'rejected',
}

export type BillingBillType = {
  __typename?: 'BillingBillType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Blockchain type */
  blockchain: BlockchainEnum
  /** Blockchain network id */
  network: Scalars['String']
  /** Account */
  account: Scalars['String']
  /** Claimant */
  claimant: Scalars['String']
  /** Declarate gas fee */
  claimGasFee: Scalars['Float']
  /** Declarate protocol fee */
  claimProtocolFee: Scalars['Float']
  /** Confirmed gas fee */
  gasFee?: Maybe<Scalars['Float']>
  /** Confirmed protocol fee */
  protocolFee?: Maybe<Scalars['Float']>
  /** Balance of claim after make the bill */
  claim: Scalars['Float']
  /** Current status */
  status: BillingBillStatusEnum
  /** Transaction id */
  tx: Scalars['String']
  /** Date of created */
  createdAt: Scalars['DateTimeType']
  /** Date of last updated */
  updatedAt: Scalars['DateTimeType']
}

export type BillingTransferType = {
  __typename?: 'BillingTransferType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Blockchain type */
  blockchain: BlockchainEnum
  /** Blockchain network id */
  network: Scalars['String']
  /** Account */
  account: Scalars['String']
  /** Transfer amount (must be negative) */
  amount: Scalars['Float']
  /** Transaction id */
  tx: Scalars['String']
  /** Bill */
  bill?: Maybe<BillingBillType>
  /** Date of created */
  createdAt: Scalars['DateTimeType']
}

export enum BlockchainEnum {
  Ethereum = 'ethereum',
  Waves = 'waves',
}

export type BlockchainFilterInputType = {
  protocol: BlockchainEnum
  network?: Maybe<Scalars['String']>
}

export type ContractAutomatesType = {
  __typename?: 'ContractAutomatesType'
  /** Usable automate adapters */
  adapters: Array<Scalars['String']>
  /** Autorestake adapter name */
  autorestake?: Maybe<Scalars['String']>
}

export type ContractCreateInputType = {
  /** Blockchain protocol */
  blockchain: BlockchainEnum
  /** Blockchain network */
  network: Scalars['String']
  /** Address */
  address: Scalars['String']
  /** Adapter name */
  adapter: Scalars['String']
  /** Contract deployment block number */
  deployBlockNumber?: Maybe<Scalars['String']>
  /** Layout name */
  layout: Scalars['String']
  /** Usable automates */
  automates?: Maybe<Array<Scalars['String']>>
  /** Usable autorestake contract adapter */
  autorestakeAdapter?: Maybe<Scalars['String']>
  /** Name */
  name: Scalars['String']
  /** Description */
  description?: Maybe<Scalars['String']>
  /** Website URL */
  link?: Maybe<Scalars['String']>
  /** Is hidden */
  hidden?: Maybe<Scalars['Boolean']>
  /** Events to subscribe in scanner */
  eventsToSubscribe?: Maybe<Array<Scalars['String']>>
}

export type ContractListFilterInputType = {
  id?: Maybe<Scalars['UuidType']>
  blockchain?: Maybe<BlockchainFilterInputType>
  hidden?: Maybe<Scalars['Boolean']>
  search?: Maybe<Scalars['String']>
}

export type ContractListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type ContractListSortInputType = {
  column: ContractListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum ContractListSortInputTypeColumnEnum {
  Id = 'id',
  Name = 'name',
  Address = 'address',
  CreatedAt = 'createdAt',
  MyStaked = 'myStaked',
}

export type ContractListType = {
  __typename?: 'ContractListType'
  /** Elements */
  list?: Maybe<Array<ContractType>>
  pagination: Pagination
}

export type ContractMetricChartFilterInputType = {
  /** Created at equals or greater */
  dateAfter?: Maybe<Scalars['DateTimeType']>
  /** Created at less */
  dateBefore?: Maybe<Scalars['DateTimeType']>
}

export type ContractMetricChartPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type ContractMetricChartSortInputType = {
  column: ContractMetricChartSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum ContractMetricChartSortInputTypeColumnEnum {
  Date = 'date',
  Value = 'value',
}

export type ContractMetricFilterInputType = {
  wallet?: Maybe<ContractMetricWalletFilterInputType>
}

export type ContractMetricType = {
  __typename?: 'ContractMetricType'
  tvl: Scalars['String']
  aprYear: Scalars['String']
  myStaked: Scalars['String']
  myEarned: Scalars['String']
  myAPYBoost: Scalars['String']
}

export type ContractMetricWalletFilterInputType = {
  type?: Maybe<Array<WalletTypeEnum>>
}

export type ContractType = {
  __typename?: 'ContractType'
  /** Identificator */
  id: Scalars['UuidType']
  protocolId: Scalars['UuidType']
  /** Adapter name */
  adapter: Scalars['String']
  /** Layout name */
  layout: Scalars['String']
  /** Blockchain type */
  blockchain: BlockchainEnum
  /** Blockchain network id */
  network: Scalars['String']
  /** Address */
  address: Scalars['String']
  /** Contract deployment block number */
  deployBlockNumber?: Maybe<Scalars['String']>
  /** Usable automates */
  automate: ContractAutomatesType
  /** Name */
  name: Scalars['String']
  /** Description */
  description: Scalars['String']
  /** View URL */
  link?: Maybe<Scalars['String']>
  /** Is hidden */
  hidden: Scalars['Boolean']
  metricChart: Array<MetricChartType>
  metric: ContractMetricType
  events: Array<Scalars['String']>
  /** Date of created account */
  createdAt: Scalars['DateTimeType']
}

export type ContractTypeMetricChartArgs = {
  metric: Scalars['MetricColumnType']
  group: MetricGroupEnum
  filter?: Maybe<ContractMetricChartFilterInputType>
  sort?: Maybe<Array<ContractMetricChartSortInputType>>
  pagination?: Maybe<ContractMetricChartPaginationInputType>
}

export type ContractTypeMetricArgs = {
  filter?: Maybe<ContractMetricFilterInputType>
}

export type ContractUpdateInputType = {
  /** Blockchain protocol */
  blockchain?: Maybe<BlockchainEnum>
  /** Blockchain network */
  network?: Maybe<Scalars['String']>
  /** Address */
  address?: Maybe<Scalars['String']>
  /** Contract deployment block number */
  deployBlockNumber?: Maybe<Scalars['String']>
  /** Adapter name */
  adapter?: Maybe<Scalars['String']>
  /** Layout name */
  layout?: Maybe<Scalars['String']>
  /** Usable automates */
  automates?: Maybe<Array<Scalars['String']>>
  /** Usable autorestake contract adapter */
  autorestakeAdapter?: Maybe<Scalars['String']>
  /** Name */
  name?: Maybe<Scalars['String']>
  /** Description */
  description?: Maybe<Scalars['String']>
  /** Website URL */
  link?: Maybe<Scalars['String']>
  /** Is hidden */
  hidden?: Maybe<Scalars['Boolean']>
}

export type GovProposalFilterInputType = {
  network: Scalars['String']
  contract: Scalars['String']
  proposalId: Scalars['Int']
  cache: Scalars['Boolean']
}

export type GovProposalListFilterInputType = {
  network: Scalars['String']
  contract: Scalars['String']
  cache: Scalars['Boolean']
}

export type GovProposalListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type GovProposalListQuery = {
  __typename?: 'GovProposalListQuery'
  /** Elements */
  list?: Maybe<Array<GovProposalType>>
  pagination: Pagination
}

export type GovProposalListSortInputType = {
  column: GovProposalListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum GovProposalListSortInputTypeColumnEnum {
  Id = 'id',
}

export enum GovProposalStateEnum {
  Pending = 'pending',
  Active = 'active',
  Canceled = 'canceled',
  Defeated = 'defeated',
  Succeeded = 'succeeded',
  Queued = 'queued',
  Expired = 'expired',
  Executed = 'executed',
}

export type GovProposalType = {
  __typename?: 'GovProposalType'
  /** Identificator */
  id: Scalars['Int']
  /** Proposer */
  proposer: Scalars['String']
  /** The timesamp that the protposal will be available for execution, set once the vote succeeds */
  eta: Scalars['Int']
  /** Target addresses for calls */
  targets: Array<Scalars['String']>
  /** List of values to be passed to the calls */
  values: Array<Scalars['String']>
  /** List of function signatures to be calls */
  signatures: Array<Scalars['String']>
  /** List of calldata to be passed to each call */
  calldatas: Array<Array<Scalars['String']>>
  /** Start block of vote */
  startBlock: Scalars['Int']
  /** End block of vote */
  endBlock: Scalars['Int']
  /** End vote datetime */
  endVoteDate: Scalars['DateTimeType']
  /** For votes */
  forVotes: Scalars['String']
  /** Against votes */
  againstVotes: Scalars['String']
  /** Abstain votes */
  abstainVotes: Scalars['String']
  /** Is canceled */
  canceled: Scalars['Boolean']
  /** Is executed */
  executed: Scalars['Boolean']
  /** Current state */
  state: GovProposalStateEnum
  /** Description */
  description: Scalars['String']
}

export type GovReceiptFilterInputType = {
  network: Scalars['Int']
  contract: Scalars['String']
  proposalId: Scalars['Int']
  wallet: Scalars['String']
  cache: Scalars['Boolean']
}

export enum GovReceiptSupportEnum {
  Against = 'against',
  For = 'for',
  Abstain = 'Abstain',
}

export type GovReceiptType = {
  __typename?: 'GovReceiptType'
  /** Whether or not a vote has been cast */
  hasVoted: Scalars['Boolean']
  /** Whether or not the voter supports the proposal or abstains */
  support: GovReceiptSupportEnum
  /** The number of votes the voter had, which were cast */
  votes: Scalars['String']
  /** The reason given for the vote by the voter */
  reason: Scalars['String']
}

export type GovTokenCirculationType = {
  __typename?: 'GovTokenCirculationType'
  total: Scalars['String']
  market: GovTokenCirculationValueType
  rewards: GovTokenCirculationValueType
  developers: GovTokenCirculationValueType
  community: GovTokenCirculationValueType
  earlyEcosistem: GovTokenCirculationValueType
}

export type GovTokenCirculationValueType = {
  __typename?: 'GovTokenCirculationValueType'
  timeLeft: Scalars['String']
  timeTotal: Scalars['String']
  tokenLeft: Scalars['String']
  tokenTotal: Scalars['String']
}

export type GovTokenFilterInputType = {
  network: Scalars['Int']
  contract: Scalars['String']
}

export type GovTokenType = {
  __typename?: 'GovTokenType'
  price: Scalars['String']
  totalSupply: Scalars['String']
  marketCap: Scalars['String']
  circulation: GovTokenCirculationType
}

export type GovVoteType = {
  __typename?: 'GovVoteType'
  votes: Scalars['String']
  delegates: Scalars['String']
}

export type GovVotesFilterInputType = {
  network: Scalars['Int']
  contract: Scalars['String']
  wallet: Scalars['String']
}

export enum LocaleEnum {
  EnUs = 'enUS',
  RuRu = 'ruRU',
}

export type MetricChartType = {
  __typename?: 'MetricChartType'
  date: Scalars['DateTimeType']
  min: Scalars['String']
  max: Scalars['String']
  avg: Scalars['String']
  sum: Scalars['String']
  count: Scalars['String']
}

export enum MetricGroupEnum {
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export type Mutation = {
  __typename?: 'Mutation'
  authEth?: Maybe<AuthType>
  authWaves?: Maybe<AuthType>
  addWallet?: Maybe<AuthType>
  walletUpdate: WalletType
  walletDelete: Scalars['Boolean']
  userUpdate: UserType
  protocolCreate: ProtocolType
  protocolUpdate: ProtocolType
  protocolResolveContracts: Scalars['Boolean']
  protocolDelete: Scalars['Boolean']
  protocolFavorite: Scalars['Boolean']
  contractCreate: ContractType
  contractUpdate: ContractType
  contractDelete: Scalars['Boolean']
  contractWalletLink: Scalars['Boolean']
  contractWalletUnlink: Scalars['Boolean']
  userNotificationToggle: Scalars['Boolean']
  tokenUpdate: TokenType
  tokenAliasCreate: TokenAlias
  tokenAliasUpdate: TokenAlias
  tokenAliasDelete: Scalars['Boolean']
  proposalCreate: ProposalType
  proposalUpdate: ProposalType
  proposalDelete: Scalars['Boolean']
  vote: VoteType
  unvote: Scalars['Boolean']
  userContactCreate: UserContactType
  userContactUpdate: UserContactType
  userContactEmailConfirm: Scalars['Boolean']
  userContactDelete: Scalars['Boolean']
  userEventSubscriptionCreate: UserEventSubscriptionType
  userEventSubscriptionDelete: Scalars['Boolean']
  productCreate: StoreProductType
  productUpdate: StoreProductType
  productDelete: Scalars['Boolean']
  automateTriggerCreate: AutomateTriggerType
  automateTriggerUpdate: AutomateTriggerType
  automateTriggerDelete: Scalars['Boolean']
  automateConditionCreate: AutomateConditionType
  automateConditionUpdate: AutomateConditionType
  automateConditionDelete: Scalars['Boolean']
  automateActionCreate: AutomateActionType
  automateActionUpdate: AutomateActionType
  automateActionDelete: Scalars['Boolean']
  automateContractCreate: AutomateContractType
  automateContractUpdate: AutomateContractType
  automateContractDelete: Scalars['Boolean']
}

export type MutationAuthEthArgs = {
  input: AuthEthereumInputType
}

export type MutationAuthWavesArgs = {
  input: AuthWavesInputType
}

export type MutationAddWalletArgs = {
  input: AddWalletInputType
}

export type MutationWalletUpdateArgs = {
  id: Scalars['UuidType']
  input: WalletUpdateInputType
}

export type MutationWalletDeleteArgs = {
  id: Scalars['UuidType']
}

export type MutationUserUpdateArgs = {
  id: Scalars['UuidType']
  input: UserUpdateInputType
}

export type MutationProtocolCreateArgs = {
  input: ProtocolCreateInputType
}

export type MutationProtocolUpdateArgs = {
  id: Scalars['UuidType']
  input: ProtocolUpdateInputType
}

export type MutationProtocolResolveContractsArgs = {
  id: Scalars['UuidType']
  input: ProtocolResolveContractsInputType
}

export type MutationProtocolDeleteArgs = {
  id: Scalars['UuidType']
}

export type MutationProtocolFavoriteArgs = {
  input: ProtocolFavoriteInputType
}

export type MutationContractCreateArgs = {
  protocol: Scalars['UuidType']
  input: ContractCreateInputType
}

export type MutationContractUpdateArgs = {
  id: Scalars['UuidType']
  input: ContractUpdateInputType
}

export type MutationContractDeleteArgs = {
  id: Scalars['UuidType']
}

export type MutationContractWalletLinkArgs = {
  contract: Scalars['UuidType']
  wallet: Scalars['UuidType']
}

export type MutationContractWalletUnlinkArgs = {
  contract: Scalars['UuidType']
  wallet: Scalars['UuidType']
}

export type MutationUserNotificationToggleArgs = {
  type: UserNotificationTypeEnum
  state: Scalars['Boolean']
}

export type MutationTokenUpdateArgs = {
  id: Scalars['UuidType']
  input: TokenUpdateInputType
}

export type MutationTokenAliasCreateArgs = {
  input: TokenAliasCreateInputType
}

export type MutationTokenAliasUpdateArgs = {
  id: Scalars['UuidType']
  input: TokenAliasUpdateInputType
}

export type MutationTokenAliasDeleteArgs = {
  id: Scalars['UuidType']
}

export type MutationProposalCreateArgs = {
  input: ProposalCreateInputType
}

export type MutationProposalUpdateArgs = {
  id: Scalars['UuidType']
  input: ProposalUpdateInputType
}

export type MutationProposalDeleteArgs = {
  id: Scalars['UuidType']
}

export type MutationVoteArgs = {
  proposal: Scalars['UuidType']
}

export type MutationUnvoteArgs = {
  proposal: Scalars['UuidType']
}

export type MutationUserContactCreateArgs = {
  input: UserContactCreateInputType
}

export type MutationUserContactUpdateArgs = {
  id: Scalars['UuidType']
  input: UserContactUpdateInputType
}

export type MutationUserContactEmailConfirmArgs = {
  input: UserContactConfirmEmailInputType
}

export type MutationUserContactDeleteArgs = {
  id: Scalars['UuidType']
}

export type MutationUserEventSubscriptionCreateArgs = {
  input: UserEventSubscriptionCreateInputType
}

export type MutationUserEventSubscriptionDeleteArgs = {
  id: Scalars['UuidType']
}

export type MutationProductCreateArgs = {
  input: StoreProductCreateInputType
}

export type MutationProductUpdateArgs = {
  id: Scalars['UuidType']
  input: StoreProductUpdateInputType
}

export type MutationProductDeleteArgs = {
  id: Scalars['UuidType']
}

export type MutationAutomateTriggerCreateArgs = {
  input: AutomateTriggerCreateInputType
}

export type MutationAutomateTriggerUpdateArgs = {
  input: AutomateTriggerUpdateInputType
}

export type MutationAutomateTriggerDeleteArgs = {
  id: Scalars['UuidType']
}

export type MutationAutomateConditionCreateArgs = {
  input: AutomateConditionCreateInputType
}

export type MutationAutomateConditionUpdateArgs = {
  input: AutomateConditionUpdateInputType
}

export type MutationAutomateConditionDeleteArgs = {
  id: Scalars['UuidType']
}

export type MutationAutomateActionCreateArgs = {
  input: AutomateActionCreateInputType
}

export type MutationAutomateActionUpdateArgs = {
  input: AutomateActionUpdateInputType
}

export type MutationAutomateActionDeleteArgs = {
  id: Scalars['UuidType']
}

export type MutationAutomateContractCreateArgs = {
  input: AutomateContractCreateInputType
}

export type MutationAutomateContractUpdateArgs = {
  input: AutomateContractUpdateInputType
}

export type MutationAutomateContractDeleteArgs = {
  id: Scalars['UuidType']
}

export type OnTransferCreatedFilterInputType = {
  wallet?: Maybe<Array<Scalars['UuidType']>>
}

export type OnWalletMetricUpdatedFilterInputType = {
  contract?: Maybe<Array<Scalars['UuidType']>>
  wallet?: Maybe<Array<Scalars['UuidType']>>
}

export type Pagination = {
  __typename?: 'Pagination'
  /** Count of list elements */
  count: Scalars['Int']
}

export type ProposalCreateInputType = {
  /** Title */
  title: Scalars['String']
  /** Description */
  description: Scalars['String']
}

export type ProposalFilterInputType = {
  id: Scalars['String']
}

export type ProposalListFilterInputType = {
  author?: Maybe<Scalars['UuidType']>
  status?: Maybe<ProposalStatusEnum>
  search?: Maybe<Scalars['String']>
}

export type ProposalListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type ProposalListQuery = {
  __typename?: 'ProposalListQuery'
  /** Elements */
  list?: Maybe<Array<ProposalType>>
  pagination: Pagination
}

export type ProposalListSortInputType = {
  column: ProposalListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum ProposalListSortInputTypeColumnEnum {
  Id = 'id',
  Title = 'title',
  CreatedAt = 'createdAt',
}

export enum ProposalStatusEnum {
  /** Proposal is open for vote */
  Open = 'open',
  /** Proposal in process */
  InProcess = 'in_process',
  /** Proposal is executed */
  Executed = 'executed',
  /** Proposal is defeated */
  Defeated = 'defeated',
}

export type ProposalType = {
  __typename?: 'ProposalType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Title */
  title: Scalars['String']
  /** Description */
  description: Scalars['String']
  /** Current status */
  status: ProposalStatusEnum
  /** Author */
  author?: Maybe<UserType>
  votes: VoteListType
  /** Planned date */
  plannedAt?: Maybe<Scalars['DateTimeType']>
  /** Released date */
  releasedAt?: Maybe<Scalars['DateTimeType']>
  /** Date of updated */
  updatedAt: Scalars['DateTimeType']
  /** Date of created */
  createdAt: Scalars['DateTimeType']
}

export type ProposalTypeVotesArgs = {
  filter?: Maybe<VoteListFilterInputType>
  sort?: Maybe<Array<VoteListSortInputType>>
  pagination?: Maybe<VoteListPaginationInputType>
}

export type ProposalUpdateInputType = {
  /** Title */
  title?: Maybe<Scalars['String']>
  /** Description */
  description?: Maybe<Scalars['String']>
  /** Current status */
  status?: Maybe<ProposalStatusEnum>
  /** Planned date */
  plannedAt?: Maybe<Scalars['DateTimeType']>
  /** Released date */
  releasedAt?: Maybe<Scalars['DateTimeType']>
}

export type ProtocolCreateInputType = {
  /** Adapter name */
  adapter: Scalars['String']
  /** Name */
  name: Scalars['String']
  /** Description */
  description?: Maybe<Scalars['String']>
  /** Icon image URL */
  icon?: Maybe<Scalars['String']>
  /** Website URL */
  link?: Maybe<Scalars['String']>
  /** Links */
  links?: Maybe<ProtocolLinkMapInputType>
  /** Is hidden */
  hidden?: Maybe<Scalars['Boolean']>
}

export type ProtocolFavoriteInputType = {
  /** Target protocol */
  protocol: Scalars['UuidType']
  /** Is favorite */
  favorite: Scalars['Boolean']
}

export type ProtocolFilterInputType = {
  id?: Maybe<Scalars['UuidType']>
  adapter?: Maybe<Scalars['String']>
}

export type ProtocolLinkInputType = {
  /** Identificator */
  id: Scalars['UuidType']
  /** Name */
  name: Scalars['String']
  /** Value */
  value: Scalars['String']
}

export type ProtocolLinkMapInputType = {
  social?: Maybe<Array<ProtocolLinkInputType>>
  listing?: Maybe<Array<ProtocolLinkInputType>>
  audit?: Maybe<Array<ProtocolLinkInputType>>
  other?: Maybe<Array<ProtocolLinkInputType>>
}

export type ProtocolLinkMapType = {
  __typename?: 'ProtocolLinkMapType'
  social: Array<ProtocolLinkType>
  listing: Array<ProtocolLinkType>
  audit: Array<ProtocolLinkType>
  other: Array<ProtocolLinkType>
}

export type ProtocolLinkType = {
  __typename?: 'ProtocolLinkType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Name */
  name: Scalars['String']
  /** Value */
  value: Scalars['String']
}

export type ProtocolListFilterInputType = {
  blockchain?: Maybe<BlockchainFilterInputType>
  /** Target user ID */
  linked?: Maybe<Scalars['UuidType']>
  /** Is favorite */
  favorite?: Maybe<Scalars['Boolean']>
  hidden?: Maybe<Scalars['Boolean']>
  search?: Maybe<Scalars['String']>
}

export type ProtocolListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type ProtocolListQuery = {
  __typename?: 'ProtocolListQuery'
  /** Elements */
  list?: Maybe<Array<ProtocolType>>
  pagination: Pagination
}

export type ProtocolListSortInputType = {
  column: ProtocolListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum ProtocolListSortInputTypeColumnEnum {
  Id = 'id',
  Name = 'name',
  Address = 'address',
  CreatedAt = 'createdAt',
}

export type ProtocolMetricChartContractsFilterInputType = {
  blockchain?: Maybe<BlockchainFilterInputType>
  /** Created at equals or greater */
  dateAfter?: Maybe<Scalars['DateTimeType']>
  /** Created at less */
  dateBefore?: Maybe<Scalars['DateTimeType']>
}

export type ProtocolMetricChartContractsPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type ProtocolMetricChartContractsSortInputType = {
  column: ProtocolMetricChartContractsSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum ProtocolMetricChartContractsSortInputTypeColumnEnum {
  Date = 'date',
  Value = 'value',
}

export type ProtocolMetricChartFilterInputType = {
  /** Created at equals or greater */
  dateAfter?: Maybe<Scalars['DateTimeType']>
  /** Created at less */
  dateBefore?: Maybe<Scalars['DateTimeType']>
}

export type ProtocolMetricChartPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type ProtocolMetricChartSortInputType = {
  column: ProtocolMetricChartSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum ProtocolMetricChartSortInputTypeColumnEnum {
  Date = 'date',
  Value = 'value',
}

export type ProtocolMetricChartUsersFilterInputType = {
  /** Target users id */
  user: Array<Maybe<Scalars['UuidType']>>
  blockchain?: Maybe<BlockchainFilterInputType>
  /** Created at equals or greater */
  dateAfter?: Maybe<Scalars['DateTimeType']>
  /** Created at less */
  dateBefore?: Maybe<Scalars['DateTimeType']>
}

export type ProtocolMetricChartUsersPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type ProtocolMetricChartUsersSortInputType = {
  column: ProtocolMetricChartUsersSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum ProtocolMetricChartUsersSortInputTypeColumnEnum {
  Date = 'date',
  Value = 'value',
}

export type ProtocolMetricType = {
  __typename?: 'ProtocolMetricType'
  tvl: Scalars['String']
  uniqueWalletsCount: Scalars['String']
  myAPY: Scalars['String']
  myStaked: Scalars['String']
  myEarned: Scalars['String']
  myAPYBoost: Scalars['String']
  myMinUpdatedAt?: Maybe<Scalars['DateTimeType']>
}

export type ProtocolResolveContractsInputType = {
  /** Blockchain type */
  blockchain: BlockchainEnum
  /** Blockchain network id */
  network: Scalars['String']
  /** Blockchain network id */
  events: Array<Scalars['String']>
}

export type ProtocolSocialPostListFilterInputType = {
  provider?: Maybe<ProtocolSocialPostProviderEnum>
}

export type ProtocolSocialPostListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type ProtocolSocialPostListSortInputType = {
  column: ProtocolSocialPostListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum ProtocolSocialPostListSortInputTypeColumnEnum {
  Id = 'id',
  Title = 'title',
  CreatedAt = 'createdAt',
}

export type ProtocolSocialPostListType = {
  __typename?: 'ProtocolSocialPostListType'
  /** Elements */
  list?: Maybe<Array<ProtocolSocialPostType>>
  pagination: Pagination
}

export enum ProtocolSocialPostProviderEnum {
  Medium = 'medium',
  Twitter = 'twitter',
}

export type ProtocolSocialPostType = {
  __typename?: 'ProtocolSocialPostType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Provider */
  provider: ProtocolSocialPostProviderEnum
  /** Title */
  title: Scalars['String']
  /** Content (maybe HTML) */
  content: Scalars['String']
  /** URL */
  link: Scalars['String']
  /** Date of created */
  createdAt: Scalars['DateTimeType']
}

export type ProtocolType = {
  __typename?: 'ProtocolType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Adapter name */
  adapter: Scalars['String']
  /** Name */
  name: Scalars['String']
  /** Description */
  description: Scalars['String']
  /** Icon image URL */
  icon?: Maybe<Scalars['String']>
  /** Website URL */
  link?: Maybe<Scalars['String']>
  /** Links */
  links: ProtocolLinkMapType
  /** Is hidden */
  hidden: Scalars['Boolean']
  favorite: Scalars['Boolean']
  contracts: ContractListType
  metricChart: Array<MetricChartType>
  metricChartContracts: Array<MetricChartType>
  metricChartUsers: Array<MetricChartType>
  metric: ProtocolMetricType
  socialPosts: ProtocolSocialPostListType
  /** Date of created */
  createdAt: Scalars['DateTimeType']
}

export type ProtocolTypeContractsArgs = {
  filter?: Maybe<ContractListFilterInputType>
  sort?: Maybe<Array<ContractListSortInputType>>
  pagination?: Maybe<ContractListPaginationInputType>
}

export type ProtocolTypeMetricChartArgs = {
  metric: Scalars['MetricColumnType']
  group: MetricGroupEnum
  filter?: Maybe<ProtocolMetricChartFilterInputType>
  sort?: Maybe<Array<ProtocolMetricChartSortInputType>>
  pagination?: Maybe<ProtocolMetricChartPaginationInputType>
}

export type ProtocolTypeMetricChartContractsArgs = {
  metric: Scalars['MetricColumnType']
  group: MetricGroupEnum
  filter?: Maybe<ProtocolMetricChartContractsFilterInputType>
  sort?: Maybe<Array<ProtocolMetricChartContractsSortInputType>>
  pagination?: Maybe<ProtocolMetricChartContractsPaginationInputType>
}

export type ProtocolTypeMetricChartUsersArgs = {
  metric: Scalars['MetricColumnType']
  group: MetricGroupEnum
  filter?: Maybe<ProtocolMetricChartUsersFilterInputType>
  sort?: Maybe<Array<ProtocolMetricChartUsersSortInputType>>
  pagination?: Maybe<ProtocolMetricChartUsersPaginationInputType>
}

export type ProtocolTypeSocialPostsArgs = {
  filter?: Maybe<ProtocolSocialPostListFilterInputType>
  sort?: Maybe<Array<ProtocolSocialPostListSortInputType>>
  pagination?: Maybe<ProtocolSocialPostListPaginationInputType>
}

export type ProtocolUpdateInputType = {
  /** Adapter name */
  adapter?: Maybe<Scalars['String']>
  /** Name */
  name?: Maybe<Scalars['String']>
  /** Description */
  description?: Maybe<Scalars['String']>
  /** Icon image URL */
  icon?: Maybe<Scalars['String']>
  /** Website URL */
  link?: Maybe<Scalars['String']>
  /** Links */
  links?: Maybe<ProtocolLinkMapInputType>
  /** Is hidden */
  hidden?: Maybe<Scalars['Boolean']>
}

export type Query = {
  __typename?: 'Query'
  ping: Scalars['String']
  me?: Maybe<UserType>
  users: UserListQuery
  protocol?: Maybe<ProtocolType>
  protocols: ProtocolListQuery
  proposal?: Maybe<ProposalType>
  proposals: ProposalListQuery
  userContact?: Maybe<UserContactType>
  userContacts: UserContactListQuery
  userNotifications: Array<UserNotificationType>
  userEventSubscription?: Maybe<UserEventSubscriptionType>
  userEventSubscriptions: UserEventSubscriptionListQuery
  tokens: TokenListQuery
  tokenAlias?: Maybe<TokenAlias>
  tokensAlias: TokenAliasListQuery
  products: StoreProductListQuery
  govProposal?: Maybe<GovProposalType>
  govProposals: GovProposalListQuery
  govReceipt?: Maybe<GovReceiptType>
  govVotes: GovVoteType
  automateDescription: AutomatesDescriptionType
  automateTrigger?: Maybe<AutomateTriggerType>
  automateTriggers: AutomateTriggerListQuery
  automateContracts: AutomateContractListQuery
  govToken: GovTokenType
  restakeStrategy: RestakeStrategyType
  treasury: TreasuryType
}

export type QueryUsersArgs = {
  filter?: Maybe<UserListFilterInputType>
  sort?: Maybe<Array<UserListSortInputType>>
  pagination?: Maybe<UserListPaginationInputType>
}

export type QueryProtocolArgs = {
  filter: ProtocolFilterInputType
}

export type QueryProtocolsArgs = {
  filter?: Maybe<ProtocolListFilterInputType>
  sort?: Maybe<Array<ProtocolListSortInputType>>
  pagination?: Maybe<ProtocolListPaginationInputType>
}

export type QueryProposalArgs = {
  filter: ProposalFilterInputType
}

export type QueryProposalsArgs = {
  filter?: Maybe<ProposalListFilterInputType>
  sort?: Maybe<Array<ProposalListSortInputType>>
  pagination?: Maybe<ProposalListPaginationInputType>
}

export type QueryUserContactArgs = {
  filter: UserContactFilterInputType
}

export type QueryUserContactsArgs = {
  filter?: Maybe<UserContactListQueryFilterInputType>
  sort?: Maybe<Array<UserContactListSortInputType>>
  pagination?: Maybe<UserContactListPaginationInputType>
}

export type QueryUserEventSubscriptionArgs = {
  filter: UserEventSubscriptionInputType
}

export type QueryUserEventSubscriptionsArgs = {
  filter?: Maybe<UserEventSubscriptionListQueryFilterInputType>
  sort?: Maybe<Array<UserEventSubscriptionListSortInputType>>
  pagination?: Maybe<UserEventSubscriptionListPaginationInputType>
}

export type QueryTokensArgs = {
  filter?: Maybe<TokenListQueryFilterInputType>
  sort?: Maybe<Array<TokenListQuerySortInputType>>
  pagination?: Maybe<TokenListQueryPaginationInputType>
}

export type QueryTokenAliasArgs = {
  filter: TokenAliasFilterInputType
}

export type QueryTokensAliasArgs = {
  filter?: Maybe<TokenAliasListFilterInputType>
  sort?: Maybe<Array<TokenAliasListSortInputType>>
  pagination?: Maybe<TokenAliasListPaginationInputType>
}

export type QueryProductsArgs = {
  filter?: Maybe<StoreProductListQueryFilterInputType>
  sort?: Maybe<Array<StoreProductListQuerySortInputType>>
  pagination?: Maybe<StoreProductListQueryPaginationInputType>
}

export type QueryGovProposalArgs = {
  filter: GovProposalFilterInputType
}

export type QueryGovProposalsArgs = {
  filter: GovProposalListFilterInputType
  sort?: Maybe<Array<GovProposalListSortInputType>>
  pagination?: Maybe<GovProposalListPaginationInputType>
}

export type QueryGovReceiptArgs = {
  filter: GovReceiptFilterInputType
}

export type QueryGovVotesArgs = {
  filter: GovVotesFilterInputType
}

export type QueryAutomateTriggerArgs = {
  filter: AutomateTriggerFilterInputType
}

export type QueryAutomateTriggersArgs = {
  filter?: Maybe<AutomateTriggerListFilterInputType>
  sort?: Maybe<Array<AutomateTriggerListSortInputType>>
  pagination?: Maybe<AutomateTriggerListPaginationInputType>
}

export type QueryAutomateContractsArgs = {
  filter?: Maybe<AutomateContractListFilterInputType>
  sort?: Maybe<Array<AutomateContractListSortInputType>>
  pagination?: Maybe<AutomateContractListPaginationInputType>
}

export type QueryGovTokenArgs = {
  filter: GovTokenFilterInputType
}

export type QueryRestakeStrategyArgs = {
  blockchain?: Maybe<BlockchainEnum>
  network?: Maybe<Scalars['String']>
  balance: Scalars['Float']
  apy: Scalars['Float']
}

export type RestakeStrategyPointType = {
  __typename?: 'RestakeStrategyPointType'
  v: Scalars['Float']
  t: Scalars['Float']
}

export type RestakeStrategyType = {
  __typename?: 'RestakeStrategyType'
  hold: Array<RestakeStrategyPointType>
  everyDay: Array<RestakeStrategyPointType>
  optimal: Array<RestakeStrategyPointType>
}

export enum SortOrderEnum {
  /** Ascending */
  Asc = 'asc',
  /** Descending */
  Desc = 'desc',
}

export enum StoreProductCodeEnum {
  /** Notification */
  Notification = 'notification',
}

export type StoreProductCreateInputType = {
  /** Number of blockchain */
  number: Scalars['Int']
  /** System code */
  code: StoreProductCodeEnum
  /** Name */
  name: Scalars['String']
  /** Description */
  description: Scalars['String']
  /** Price in USD */
  priceUSD: Scalars['Float']
  /** Amount of product */
  amount: Scalars['Int']
}

export type StoreProductListQuery = {
  __typename?: 'StoreProductListQuery'
  /** Elements */
  list?: Maybe<Array<StoreProductType>>
  pagination: Pagination
}

export type StoreProductListQueryFilterInputType = {
  code?: Maybe<Array<StoreProductCodeEnum>>
  search?: Maybe<Scalars['String']>
}

export type StoreProductListQueryPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type StoreProductListQuerySortInputType = {
  column: StoreProductListQuerySortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum StoreProductListQuerySortInputTypeColumnEnum {
  Id = 'id',
  Name = 'name',
  CreatedAt = 'createdAt',
}

export type StoreProductType = {
  __typename?: 'StoreProductType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Number of blockchain */
  number: Scalars['Int']
  /** System code */
  code: StoreProductCodeEnum
  /** Name */
  name: Scalars['String']
  /** Description */
  description: Scalars['String']
  /** Price in USD */
  priceUSD: Scalars['Float']
  /** Amount product */
  amount: Scalars['Int']
  purchases: StorePurchaseListType
  /** Date of updated */
  updatedAt: Scalars['DateTimeType']
  /** Date of created */
  createdAt: Scalars['DateTimeType']
}

export type StoreProductTypePurchasesArgs = {
  filter?: Maybe<StorePurchaseListFilterInputType>
  sort?: Maybe<Array<StorePurchaseListSortInputType>>
  pagination?: Maybe<StorePurchaseListPaginationInputType>
}

export type StoreProductUpdateInputType = {
  /** Number of blockchain */
  number: Scalars['Int']
  /** System code */
  code: StoreProductCodeEnum
  /** Name */
  name: Scalars['String']
  /** Description */
  description: Scalars['String']
  /** Price in USD */
  priceUSD: Scalars['Float']
  /** Amount of product */
  amount: Scalars['Int']
}

export type StorePurchaseListFilterInputType = {
  user?: Maybe<Scalars['UuidType']>
}

export type StorePurchaseListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type StorePurchaseListSortInputType = {
  column: StorePurchaseListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum StorePurchaseListSortInputTypeColumnEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
}

export type StorePurchaseListType = {
  __typename?: 'StorePurchaseListType'
  /** Elements */
  list?: Maybe<Array<StorePurchaseType>>
  pagination: Pagination
}

export type StorePurchaseType = {
  __typename?: 'StorePurchaseType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Blockchain type */
  blockchain: BlockchainEnum
  /** Blockchain network id */
  network: Scalars['String']
  /** Account */
  account: Scalars['String']
  /** Amount product */
  amount: Scalars['Int']
  /** Transaction id */
  tx: Scalars['String']
  /** Date of created */
  createdAt: Scalars['DateTimeType']
}

export type Subscription = {
  __typename?: 'Subscription'
  onWalletMetricUpdated: WalletMetricUpdatedEvent
  onBillingTransferCreated: BillingTransferType
}

export type SubscriptionOnWalletMetricUpdatedArgs = {
  filter?: Maybe<OnWalletMetricUpdatedFilterInputType>
}

export type SubscriptionOnBillingTransferCreatedArgs = {
  filter?: Maybe<OnTransferCreatedFilterInputType>
}

export type TokenAlias = {
  __typename?: 'TokenAlias'
  /** Identificator */
  id: Scalars['UuidType']
  /** Name */
  name: Scalars['String']
  /** Symbol */
  symbol: Scalars['String']
  /** Logo url */
  logoUrl?: Maybe<Scalars['String']>
  /** Token liquidity */
  liquidity: TokenAliasLiquidityEnum
  metric: TokenAliasMetricType
  tokens: TokenListType
}

export type TokenAliasTokensArgs = {
  filter?: Maybe<TokenListFilterInputType>
  sort?: Maybe<Array<TokenListSortInputType>>
  pagination?: Maybe<TokenListPaginationInputType>
}

export type TokenAliasCreateInputType = {
  /** Name */
  name?: Maybe<Scalars['String']>
  /** Symbol */
  symbol?: Maybe<Scalars['String']>
  /** Token liquidity */
  liquidity?: Maybe<TokenAliasLiquidityEnum>
}

export type TokenAliasFilterInputType = {
  id: Scalars['String']
}

export enum TokenAliasLiquidityEnum {
  Stable = 'stable',
  Unstable = 'unstable',
  Trash = 'trash',
  Unknown = 'unknown',
}

export type TokenAliasListFilterInputType = {
  blockchain?: Maybe<BlockchainFilterInputType>
  liquidity?: Maybe<TokenAliasLiquidityEnum>
  symbol?: Maybe<Scalars['String']>
  search?: Maybe<Scalars['String']>
}

export type TokenAliasListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type TokenAliasListQuery = {
  __typename?: 'TokenAliasListQuery'
  /** Elements */
  list?: Maybe<Array<TokenAlias>>
  pagination: Pagination
}

export type TokenAliasListSortInputType = {
  column: TokenAliasListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum TokenAliasListSortInputTypeColumnEnum {
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  CreatedAt = 'createdAt',
}

export type TokenAliasMetricType = {
  __typename?: 'TokenAliasMetricType'
  myBalance: Scalars['String']
  myUSD: Scalars['String']
  myPortfolioPercent: Scalars['String']
}

export type TokenAliasUpdateInputType = {
  /** Name */
  name?: Maybe<Scalars['String']>
  /** Symbol */
  symbol?: Maybe<Scalars['String']>
  /** Token liquidity */
  liquidity?: Maybe<TokenAliasLiquidityEnum>
}

export type TokenListFilterInputType = {
  blockchain?: Maybe<BlockchainFilterInputType>
  address?: Maybe<Array<Scalars['String']>>
  search?: Maybe<Scalars['String']>
}

export type TokenListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type TokenListQuery = {
  __typename?: 'TokenListQuery'
  /** Elements */
  list?: Maybe<Array<TokenType>>
  pagination: Pagination
}

export type TokenListQueryFilterInputType = {
  blockchain?: Maybe<BlockchainFilterInputType>
  address?: Maybe<Array<Scalars['String']>>
  search?: Maybe<Scalars['String']>
}

export type TokenListQueryPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type TokenListQuerySortInputType = {
  column: TokenListQuerySortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum TokenListQuerySortInputTypeColumnEnum {
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  CreatedAt = 'createdAt',
}

export type TokenListSortInputType = {
  column: TokenListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum TokenListSortInputTypeColumnEnum {
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  Address = 'address',
  CreatedAt = 'createdAt',
}

export type TokenListType = {
  __typename?: 'TokenListType'
  /** Elements */
  list?: Maybe<Array<TokenType>>
  pagination: Pagination
}

export type TokenType = {
  __typename?: 'TokenType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Token alias id */
  alias: Scalars['String']
  /** Blockchain type */
  blockchain: BlockchainEnum
  /** Blockchain network id */
  network: Scalars['String']
  /** Address */
  address: Scalars['String']
  /** Name */
  name: Scalars['String']
  /** Symbol */
  symbol: Scalars['String']
  /** Decimals */
  decimals: Scalars['Int']
}

export type TokenUpdateInputType = {
  /** Token alias ID */
  alias?: Maybe<Scalars['UuidType']>
  /** Name */
  name?: Maybe<Scalars['String']>
  /** Symbol */
  symbol?: Maybe<Scalars['String']>
  /** Decimals */
  decimals?: Maybe<Scalars['Int']>
}

export type TreasuryType = {
  __typename?: 'TreasuryType'
  balanceUSD: Scalars['Float']
  portfoliosCount: Scalars['Int']
  protocolsCount: Scalars['Int']
  trackedUSD: Scalars['Float']
}

export type UserBillingBillListFilterInputType = {
  blockchain?: Maybe<BlockchainFilterInputType>
  status?: Maybe<BillingBillStatusEnum>
}

export type UserBillingBillListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type UserBillingBillListSortInputType = {
  column: UserBillingBillListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum UserBillingBillListSortInputTypeColumnEnum {
  Id = 'id',
  UpdatedAt = 'updatedAt',
  CreatedAt = 'createdAt',
}

export type UserBillingBillListType = {
  __typename?: 'UserBillingBillListType'
  /** Elements */
  list?: Maybe<Array<BillingBillType>>
  pagination: Pagination
}

export type UserBillingTransferListFilterInputType = {
  blockchain?: Maybe<BlockchainFilterInputType>
  deposit?: Maybe<Scalars['Boolean']>
  claim?: Maybe<Scalars['Boolean']>
  wallet?: Maybe<Array<Scalars['UuidType']>>
}

export type UserBillingTransferListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type UserBillingTransferListSortInputType = {
  column: UserBillingTransferListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum UserBillingTransferListSortInputTypeColumnEnum {
  Id = 'id',
  Amount = 'amount',
  CreatedAt = 'createdAt',
}

export type UserBillingTransferListType = {
  __typename?: 'UserBillingTransferListType'
  /** Elements */
  list?: Maybe<Array<BillingTransferType>>
  pagination: Pagination
}

export type UserBillingType = {
  __typename?: 'UserBillingType'
  transfers: UserBillingTransferListType
  bills: UserBillingBillListType
  balance: BillingBalanceType
}

export type UserBillingTypeTransfersArgs = {
  filter?: Maybe<UserBillingTransferListFilterInputType>
  sort?: Maybe<Array<UserBillingTransferListSortInputType>>
  pagination?: Maybe<UserBillingTransferListPaginationInputType>
}

export type UserBillingTypeBillsArgs = {
  filter?: Maybe<UserBillingBillListFilterInputType>
  sort?: Maybe<Array<UserBillingBillListSortInputType>>
  pagination?: Maybe<UserBillingBillListPaginationInputType>
}

export type UserBlockchainType = {
  __typename?: 'UserBlockchainType'
  name: Scalars['String']
  /** Blockchain type */
  blockchain: BlockchainEnum
  /** Blockchain network id */
  network: Scalars['String']
  wallets: UserBlockchainWalletListType
  tokenMetricChart: Array<MetricChartType>
}

export type UserBlockchainTypeWalletsArgs = {
  filter?: Maybe<UserBlockchainWalletListFilterInputType>
  sort?: Maybe<Array<UserBlockchainWalletListSortInputType>>
  pagination?: Maybe<UserBlockchainWalletListPaginationInputType>
}

export type UserBlockchainTypeTokenMetricChartArgs = {
  metric: Scalars['MetricColumnType']
  group: MetricGroupEnum
  filter?: Maybe<UserBlockchainWalletTokenMetricChartFilterInputType>
  sort?: Maybe<Array<UserBlockchainWalletTokenMetricChartSortInputType>>
  pagination?: Maybe<UserBlockchainWalletTokenMetricChartPaginationInputType>
}

export type UserBlockchainWalletListFilterInputType = {
  search?: Maybe<Scalars['String']>
}

export type UserBlockchainWalletListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type UserBlockchainWalletListSortInputType = {
  column: UserBlockchainWalletListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum UserBlockchainWalletListSortInputTypeColumnEnum {
  Id = 'id',
  Address = 'address',
  CreatedAt = 'createdAt',
}

export type UserBlockchainWalletListType = {
  __typename?: 'UserBlockchainWalletListType'
  /** Elements */
  list?: Maybe<Array<WalletType>>
  pagination: Pagination
}

export type UserBlockchainWalletTokenMetricChartFilterInputType = {
  /** Created at equals or greater */
  dateAfter?: Maybe<Scalars['DateTimeType']>
  /** Created at less */
  dateBefore?: Maybe<Scalars['DateTimeType']>
}

export type UserBlockchainWalletTokenMetricChartPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type UserBlockchainWalletTokenMetricChartSortInputType = {
  column: UserBlockchainWalletTokenMetricChartSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum UserBlockchainWalletTokenMetricChartSortInputTypeColumnEnum {
  Date = 'date',
  Value = 'value',
}

export enum UserContactBrokerEnum {
  /** Email */
  Email = 'email',
  /** Telegram */
  Telegram = 'telegram',
}

export type UserContactConfirmEmailInputType = {
  /** code */
  confirmationCode: Scalars['String']
}

export type UserContactCreateInputType = {
  /** Type */
  broker: UserContactBrokerEnum
  /** Address */
  address: Scalars['String']
  /** Name */
  name: Scalars['String']
}

export type UserContactFilterInputType = {
  id: Scalars['String']
}

export type UserContactListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type UserContactListQuery = {
  __typename?: 'UserContactListQuery'
  /** Elements */
  list?: Maybe<Array<UserContactType>>
  pagination: Pagination
}

export type UserContactListQueryFilterInputType = {
  user?: Maybe<Scalars['UuidType']>
  /** Type */
  broker?: Maybe<UserContactBrokerEnum>
  /** Status */
  status?: Maybe<UserContactStatusEnum>
  search?: Maybe<Scalars['String']>
}

export type UserContactListSortInputType = {
  column: UserContactListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum UserContactListSortInputTypeColumnEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
}

export enum UserContactStatusEnum {
  /** Has been activated */
  Active = 'active',
  /** Has not been activated yet */
  Inactive = 'inactive',
}

export type UserContactType = {
  __typename?: 'UserContactType'
  /** Identificator */
  id: Scalars['UuidType']
  /** User */
  user: UserType
  /** Type of the contact */
  broker: UserContactBrokerEnum
  /** Address */
  address: Scalars['String']
  /** Name */
  name: Scalars['String']
  /** Status */
  status: UserContactStatusEnum
  /** Confirmation Code */
  confirmationCode: Scalars['String']
  /** Date of create */
  createdAt: Scalars['DateTimeType']
  /** Date of activated */
  activatedAt?: Maybe<Scalars['DateTimeType']>
}

export type UserContactUpdateInputType = {
  /** Name */
  name?: Maybe<Scalars['String']>
}

export type UserEventSubscriptionCreateInputType = {
  /** User contact id */
  contact: Scalars['String']
  /** Contract id */
  contract: Scalars['String']
  /** Event name */
  event: Scalars['String']
}

export type UserEventSubscriptionInputType = {
  id: Scalars['UuidType']
}

export type UserEventSubscriptionListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type UserEventSubscriptionListQuery = {
  __typename?: 'UserEventSubscriptionListQuery'
  /** Elements */
  list?: Maybe<Array<UserEventSubscriptionType>>
  pagination: Pagination
}

export type UserEventSubscriptionListQueryFilterInputType = {
  /** User ID */
  user?: Maybe<Scalars['UuidType']>
  /** Contract Id */
  contract?: Maybe<Scalars['UuidType']>
  /** Event */
  event?: Maybe<Scalars['String']>
  /** User contact type */
  contactType?: Maybe<UserContactBrokerEnum>
}

export type UserEventSubscriptionListSortInputType = {
  column: UserEventSubscriptionListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum UserEventSubscriptionListSortInputTypeColumnEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
}

export type UserEventSubscriptionType = {
  __typename?: 'UserEventSubscriptionType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Contact */
  contact: UserContactType
  /** Contract */
  contract: ContractType
  /** Event */
  event: Scalars['String']
  /** Date of create */
  createdAt: Scalars['DateTimeType']
}

export type UserListFilterInputType = {
  role?: Maybe<UserRoleEnum>
}

export type UserListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type UserListQuery = {
  __typename?: 'UserListQuery'
  /** Elements */
  list?: Maybe<Array<UserType>>
  pagination: Pagination
}

export type UserListSortInputType = {
  column: UserListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum UserListSortInputTypeColumnEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
}

export type UserMetricChartFilterInputType = {
  /** Target contracts */
  contract?: Maybe<Array<Scalars['UuidType']>>
  /** Target wallets */
  wallet?: Maybe<Array<Scalars['UuidType']>>
  blockchain?: Maybe<BlockchainFilterInputType>
  /** Created at equals or greater */
  dateAfter?: Maybe<Scalars['DateTimeType']>
  /** Created at less */
  dateBefore?: Maybe<Scalars['DateTimeType']>
}

export type UserMetricChartPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type UserMetricChartSortInputType = {
  column: UserMetricChartSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum UserMetricChartSortInputTypeColumnEnum {
  Date = 'date',
  Value = 'value',
}

export type UserMetricType = {
  __typename?: 'UserMetricType'
  stakedUSD: Scalars['String']
  earnedUSD: Scalars['String']
  worth: Scalars['String']
  apy: Scalars['String']
}

export type UserMetricsTokenAliasFilterInputType = {
  id?: Maybe<Array<Scalars['UuidType']>>
  /** Liquidity token */
  liquidity?: Maybe<Array<TokenAliasLiquidityEnum>>
}

export type UserNotificationType = {
  __typename?: 'UserNotificationType'
  /** Type */
  type: UserNotificationTypeEnum
}

export enum UserNotificationTypeEnum {
  PortfolioMetrics = 'portfolioMetrics',
  AutomateCallNotEnoughFunds = 'automateCallNotEnoughFunds',
}

export enum UserRoleEnum {
  /** Candidate */
  Candidate = 'candidate',
  /** User */
  User = 'user',
  /** Administrator */
  Admin = 'admin',
}

export type UserStoreBalanceType = {
  __typename?: 'UserStoreBalanceType'
  /** Available nofications count */
  notifications: Scalars['Int']
}

export type UserStoreProductListFilterInputType = {
  code?: Maybe<Array<StoreProductCodeEnum>>
}

export type UserStoreProductListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type UserStoreProductListSortInputType = {
  column: UserStoreProductListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum UserStoreProductListSortInputTypeColumnEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
}

export type UserStoreProductListType = {
  __typename?: 'UserStoreProductListType'
  /** Elements */
  list?: Maybe<Array<StoreProductType>>
  pagination: Pagination
}

export type UserStorePurchaseListFilterInputType = {
  product?: Maybe<Array<Scalars['UuidType']>>
}

export type UserStorePurchaseListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type UserStorePurchaseListSortInputType = {
  column: UserStorePurchaseListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum UserStorePurchaseListSortInputTypeColumnEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
}

export type UserStorePurchaseListType = {
  __typename?: 'UserStorePurchaseListType'
  /** Elements */
  list?: Maybe<Array<StorePurchaseType>>
  pagination: Pagination
}

export type UserStoreType = {
  __typename?: 'UserStoreType'
  purchases: UserStorePurchaseListType
  products: UserStoreProductListType
  balance: UserStoreBalanceType
}

export type UserStoreTypePurchasesArgs = {
  filter?: Maybe<UserStorePurchaseListFilterInputType>
  sort?: Maybe<Array<UserStorePurchaseListSortInputType>>
  pagination?: Maybe<UserStorePurchaseListPaginationInputType>
}

export type UserStoreTypeProductsArgs = {
  filter?: Maybe<UserStoreProductListFilterInputType>
  sort?: Maybe<Array<UserStoreProductListSortInputType>>
  pagination?: Maybe<UserStoreProductListPaginationInputType>
}

export type UserTokenAliasListFilterInputType = {
  /** Liquidity token */
  liquidity?: Maybe<Array<TokenAliasLiquidityEnum>>
}

export type UserTokenAliasListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type UserTokenAliasListType = {
  __typename?: 'UserTokenAliasListType'
  /** Elements */
  list?: Maybe<Array<TokenAlias>>
  pagination: Pagination
}

export type UserTokenMetricChartFilterInputType = {
  /** Target token alias */
  tokenAlias?: Maybe<UserMetricsTokenAliasFilterInputType>
  /** Target token address */
  tokenAddress?: Maybe<Array<Scalars['String']>>
  /** Target contracts */
  contract?: Maybe<Array<Scalars['UuidType']>>
  blockchain?: Maybe<BlockchainFilterInputType>
  /** Target wallets */
  wallet?: Maybe<Array<Scalars['UuidType']>>
  /** Created at equals or greater */
  dateAfter?: Maybe<Scalars['DateTimeType']>
  /** Created at less */
  dateBefore?: Maybe<Scalars['DateTimeType']>
}

export type UserTokenMetricChartPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type UserTokenMetricChartSortInputType = {
  column: UserTokenMetricChartSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum UserTokenMetricChartSortInputTypeColumnEnum {
  Date = 'date',
  Value = 'value',
}

export type UserType = {
  __typename?: 'UserType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Access role */
  role: UserRoleEnum
  /** Current user locale */
  locale: LocaleEnum
  tokenAliases: UserTokenAliasListType
  wallets: WalletListType
  blockchains: Array<UserBlockchainType>
  metricChart: Array<MetricChartType>
  tokenMetricChart: Array<MetricChartType>
  metric: UserMetricType
  billing: UserBillingType
  store: UserStoreType
  /** Date of created account */
  createdAt: Scalars['DateTimeType']
}

export type UserTypeTokenAliasesArgs = {
  filter?: Maybe<UserTokenAliasListFilterInputType>
  pagination?: Maybe<UserTokenAliasListPaginationInputType>
}

export type UserTypeWalletsArgs = {
  filter?: Maybe<WalletListFilterInputType>
  sort?: Maybe<Array<WalletListSortInputType>>
  pagination?: Maybe<WalletListPaginationInputType>
}

export type UserTypeMetricChartArgs = {
  metric: Scalars['MetricColumnType']
  group: MetricGroupEnum
  filter?: Maybe<UserMetricChartFilterInputType>
  sort?: Maybe<Array<UserMetricChartSortInputType>>
  pagination?: Maybe<UserMetricChartPaginationInputType>
}

export type UserTypeTokenMetricChartArgs = {
  metric: Scalars['MetricColumnType']
  group: MetricGroupEnum
  filter?: Maybe<UserTokenMetricChartFilterInputType>
  sort?: Maybe<Array<UserTokenMetricChartSortInputType>>
  pagination?: Maybe<UserTokenMetricChartPaginationInputType>
}

export type UserUpdateInputType = {
  role?: Maybe<UserRoleEnum>
  locale?: Maybe<LocaleEnum>
}

export type VoteListFilterInputType = {
  user?: Maybe<Scalars['UuidType']>
}

export type VoteListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type VoteListSortInputType = {
  column: VoteListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum VoteListSortInputTypeColumnEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
}

export type VoteListType = {
  __typename?: 'VoteListType'
  /** Elements */
  list?: Maybe<Array<VoteType>>
  pagination: Pagination
}

export type VoteType = {
  __typename?: 'VoteType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Voting user */
  user: UserType
  /** Date of updated */
  updatedAt: Scalars['DateTimeType']
  /** Date of created */
  createdAt: Scalars['DateTimeType']
}

export type WalletBillingBillListFilterInputType = {
  status?: Maybe<BillingBillStatusEnum>
}

export type WalletBillingBillListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type WalletBillingBillListSortInputType = {
  column: WalletBillingBillListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum WalletBillingBillListSortInputTypeColumnEnum {
  Id = 'id',
  UpdatedAt = 'updatedAt',
  CreatedAt = 'createdAt',
}

export type WalletBillingBillListType = {
  __typename?: 'WalletBillingBillListType'
  /** Elements */
  list?: Maybe<Array<BillingBillType>>
  pagination: Pagination
}

export type WalletBillingTransferListFilterInputType = {
  deposit?: Maybe<Scalars['Boolean']>
  claim?: Maybe<Scalars['Boolean']>
}

export type WalletBillingTransferListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type WalletBillingTransferListSortInputType = {
  column: WalletBillingTransferListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum WalletBillingTransferListSortInputTypeColumnEnum {
  Id = 'id',
  Amount = 'amount',
  CreatedAt = 'createdAt',
}

export type WalletBillingTransferListType = {
  __typename?: 'WalletBillingTransferListType'
  /** Elements */
  list?: Maybe<Array<BillingTransferType>>
  pagination: Pagination
}

export type WalletBillingType = {
  __typename?: 'WalletBillingType'
  transfers: WalletBillingTransferListType
  bills: WalletBillingBillListType
  balance: BillingBalanceType
}

export type WalletBillingTypeTransfersArgs = {
  filter?: Maybe<WalletBillingTransferListFilterInputType>
  sort?: Maybe<Array<WalletBillingTransferListSortInputType>>
  pagination?: Maybe<WalletBillingTransferListPaginationInputType>
}

export type WalletBillingTypeBillsArgs = {
  filter?: Maybe<WalletBillingBillListFilterInputType>
  sort?: Maybe<Array<WalletBillingBillListSortInputType>>
  pagination?: Maybe<WalletBillingBillListPaginationInputType>
}

export type WalletContractListFilterInputType = {
  blockchain?: Maybe<BlockchainFilterInputType>
  protocol?: Maybe<Array<Scalars['UuidType']>>
  hidden?: Maybe<Scalars['Boolean']>
  search?: Maybe<Scalars['String']>
}

export type WalletContractListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type WalletContractListSortInputType = {
  column: WalletContractListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum WalletContractListSortInputTypeColumnEnum {
  Id = 'id',
  Name = 'name',
  Address = 'address',
  CreatedAt = 'createdAt',
}

export type WalletContractListType = {
  __typename?: 'WalletContractListType'
  /** Elements */
  list?: Maybe<Array<ContractType>>
  pagination: Pagination
}

export type WalletListFilterInputType = {
  blockchain?: Maybe<BlockchainFilterInputType>
  type?: Maybe<WalletTypeEnum>
  search?: Maybe<Scalars['String']>
}

export type WalletListPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type WalletListSortInputType = {
  column: WalletListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum WalletListSortInputTypeColumnEnum {
  Id = 'id',
  Address = 'address',
  CreatedAt = 'createdAt',
}

export type WalletListType = {
  __typename?: 'WalletListType'
  /** Elements */
  list?: Maybe<Array<WalletType>>
  pagination: Pagination
}

export type WalletMetricChartFilterInputType = {
  /** Target contracts */
  contract?: Maybe<Array<Scalars['UuidType']>>
  /** Created at equals or greater */
  dateAfter?: Maybe<Scalars['DateTimeType']>
  /** Created at less */
  dateBefore?: Maybe<Scalars['DateTimeType']>
}

export type WalletMetricChartPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type WalletMetricChartSortInputType = {
  column: WalletMetricChartSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum WalletMetricChartSortInputTypeColumnEnum {
  Date = 'date',
  Value = 'value',
}

export type WalletMetricFilterInputType = {
  /** Target token alias */
  tokenAlias?: Maybe<UserMetricsTokenAliasFilterInputType>
}

export type WalletMetricType = {
  __typename?: 'WalletMetricType'
  stakedUSD: Scalars['String']
  earnedUSD: Scalars['String']
  balance: Scalars['String']
  usd: Scalars['String']
}

export type WalletMetricUpdatedEvent = {
  __typename?: 'WalletMetricUpdatedEvent'
  id: Scalars['UuidType']
  wallet: WalletType
  contract: ContractType
}

export type WalletTokenMetricChartFilterInputType = {
  /** Target token alias */
  tokenAlias?: Maybe<UserMetricsTokenAliasFilterInputType>
  /** Target token address */
  tokenAddress?: Maybe<Array<Scalars['String']>>
  /** Target contracts */
  contract?: Maybe<Array<Scalars['UuidType']>>
  /** Created at equals or greater */
  dateAfter?: Maybe<Scalars['DateTimeType']>
  /** Created at less */
  dateBefore?: Maybe<Scalars['DateTimeType']>
}

export type WalletTokenMetricChartPaginationInputType = {
  /** Limit */
  limit?: Maybe<Scalars['Int']>
  /** Offset */
  offset?: Maybe<Scalars['Int']>
}

export type WalletTokenMetricChartSortInputType = {
  column: WalletTokenMetricChartSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum WalletTokenMetricChartSortInputTypeColumnEnum {
  Date = 'date',
  Value = 'value',
}

export type WalletType = {
  __typename?: 'WalletType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Blockchain type */
  blockchain: BlockchainEnum
  /** Blockchain network id */
  network: Scalars['String']
  /** Type */
  type: WalletTypeEnum
  /** Address */
  address: Scalars['String']
  /** Public key */
  publicKey: Scalars['String']
  /** Name */
  name: Scalars['String']
  contracts: WalletContractListType
  triggersCount: Scalars['Int']
  metricChart: Array<MetricChartType>
  tokenMetricChart: Array<MetricChartType>
  metric: WalletMetricType
  billing: WalletBillingType
  /** Date of created account */
  createdAt: Scalars['DateTimeType']
}

export type WalletTypeContractsArgs = {
  filter?: Maybe<WalletContractListFilterInputType>
  sort?: Maybe<Array<WalletContractListSortInputType>>
  pagination?: Maybe<WalletContractListPaginationInputType>
}

export type WalletTypeMetricChartArgs = {
  metric: Scalars['MetricColumnType']
  group: MetricGroupEnum
  filter?: Maybe<WalletMetricChartFilterInputType>
  sort?: Maybe<Array<WalletMetricChartSortInputType>>
  pagination?: Maybe<WalletMetricChartPaginationInputType>
}

export type WalletTypeTokenMetricChartArgs = {
  metric: Scalars['MetricColumnType']
  group: MetricGroupEnum
  filter?: Maybe<WalletTokenMetricChartFilterInputType>
  sort?: Maybe<Array<WalletTokenMetricChartSortInputType>>
  pagination?: Maybe<WalletTokenMetricChartPaginationInputType>
}

export type WalletTypeMetricArgs = {
  filter?: Maybe<WalletMetricFilterInputType>
}

export enum WalletTypeEnum {
  Wallet = 'wallet',
  Contract = 'contract',
}

export type WalletUpdateInputType = {
  /** Name */
  name?: Maybe<Scalars['String']>
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & Pick<
      UserType,
      'id' | 'role' | 'createdAt'
    > & {
        tokenAliases: { __typename?: 'UserTokenAliasListType' } & {
          pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
        }
      }
  >
}

export type AutomationActionCreateMutationVariables = Exact<{
  input: AutomateActionCreateInputType
}>

export type AutomationActionCreateMutation = { __typename?: 'Mutation' } & {
  automateActionCreate: {
    __typename?: 'AutomateActionType'
  } & AutomationActionFragmentFragment
}

export type AutomationActionDeleteMutationVariables = Exact<{
  id: Scalars['UuidType']
}>

export type AutomationActionDeleteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'automateActionDelete'
>

export type AutomationActionUpdateMutationVariables = Exact<{
  input: AutomateActionUpdateInputType
}>

export type AutomationActionUpdateMutation = { __typename?: 'Mutation' } & {
  automateActionUpdate: {
    __typename?: 'AutomateActionType'
  } & AutomationActionFragmentFragment
}

export type AutomationActionFragmentFragment = {
  __typename?: 'AutomateActionType'
} & Pick<
  AutomateActionType,
  'id' | 'type' | 'params' | 'paramsDescription' | 'priority' | 'createdAt'
>

export type AutomationConditionCreateMutationVariables = Exact<{
  input: AutomateConditionCreateInputType
}>

export type AutomationConditionCreateMutation = { __typename?: 'Mutation' } & {
  automateConditionCreate: {
    __typename?: 'AutomateConditionType'
  } & AutomationConditionFragmentFragment
}

export type AutomationConditionDeleteMutationVariables = Exact<{
  id: Scalars['UuidType']
}>

export type AutomationConditionDeleteMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'automateConditionDelete'>

export type AutomationConditionUpdateMutationVariables = Exact<{
  input: AutomateConditionUpdateInputType
}>

export type AutomationConditionUpdateMutation = { __typename?: 'Mutation' } & {
  automateConditionUpdate: {
    __typename?: 'AutomateConditionType'
  } & AutomationConditionFragmentFragment
}

export type AutomationConditionFragmentFragment = {
  __typename?: 'AutomateConditionType'
} & Pick<
  AutomateConditionType,
  'id' | 'type' | 'params' | 'paramsDescription' | 'priority' | 'createdAt'
>

export type AutomationContractCreateMutationVariables = Exact<{
  input: AutomateContractCreateInputType
}>

export type AutomationContractCreateMutation = { __typename?: 'Mutation' } & {
  automateContractCreate: {
    __typename?: 'AutomateContractType'
  } & AutomationContractFragmentFragment
}

export type AutomationContractDeleteMutationVariables = Exact<{
  id: Scalars['UuidType']
}>

export type AutomationContractDeleteMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'automateContractDelete'>

export type AutomationContractUpdateMutationVariables = Exact<{
  input: AutomateContractUpdateInputType
}>

export type AutomationContractUpdateMutation = { __typename?: 'Mutation' } & {
  automateContractUpdate: {
    __typename?: 'AutomateContractType'
  } & AutomationContractFragmentFragment
}

export type AutomationContractFragmentFragment = {
  __typename?: 'AutomateContractType'
} & Pick<
  AutomateContractType,
  'id' | 'address' | 'adapter' | 'initParams' | 'verification' | 'rejectReason'
> & {
    wallet: { __typename?: 'WalletType' } & Pick<
      WalletType,
      'id' | 'blockchain' | 'network' | 'address' | 'publicKey' | 'createdAt'
    >
    protocol: { __typename?: 'ProtocolType' } & Pick<
      ProtocolType,
      | 'id'
      | 'adapter'
      | 'name'
      | 'description'
      | 'icon'
      | 'link'
      | 'hidden'
      | 'createdAt'
    >
    contract?: Maybe<{ __typename?: 'ContractType' } & Pick<ContractType, 'id'>>
  }

export type AutomationContractsQueryVariables = Exact<{
  filter?: Maybe<AutomateContractListFilterInputType>
  sort?: Maybe<
    Array<AutomateContractListSortInputType> | AutomateContractListSortInputType
  >
  pagination?: Maybe<AutomateContractListPaginationInputType>
}>

export type AutomationContractsQuery = { __typename?: 'Query' } & {
  automateContracts: { __typename?: 'AutomateContractListQuery' } & {
    list?: Maybe<
      Array<
        {
          __typename?: 'AutomateContractType'
        } & AutomationContractFragmentFragment
      >
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
}

export type AutomationDescriptionFragmentFragment = {
  __typename?: 'AutomateDescriptionType'
} & Pick<AutomateDescriptionType, 'name' | 'description'>

export type AutomationDescriptionQueryVariables = Exact<{
  [key: string]: never
}>

export type AutomationDescriptionQuery = { __typename?: 'Query' } & {
  automateDescription: { __typename?: 'AutomatesDescriptionType' } & {
    triggers: { __typename?: 'AutomateTriggersDescriptionType' } & {
      everyMonth: {
        __typename?: 'AutomateDescriptionType'
      } & AutomationDescriptionFragmentFragment
      everyWeek: {
        __typename?: 'AutomateDescriptionType'
      } & AutomationDescriptionFragmentFragment
      everyDay: {
        __typename?: 'AutomateDescriptionType'
      } & AutomationDescriptionFragmentFragment
      everyHour: {
        __typename?: 'AutomateDescriptionType'
      } & AutomationDescriptionFragmentFragment
      contractEvent: {
        __typename?: 'AutomateDescriptionType'
      } & AutomationDescriptionFragmentFragment
    }
    conditions: { __typename?: 'AutomateConditionsDescriptionType' } & {
      schedule: {
        __typename?: 'AutomateDescriptionType'
      } & AutomationDescriptionFragmentFragment
      ethereumAvgGasPrice: {
        __typename?: 'AutomateDescriptionType'
      } & AutomationDescriptionFragmentFragment
      ethereumBalance: {
        __typename?: 'AutomateDescriptionType'
      } & AutomationDescriptionFragmentFragment
      ethereumOptimalAutomateRun: {
        __typename?: 'AutomateDescriptionType'
      } & AutomationDescriptionFragmentFragment
    }
    actions: { __typename?: 'AutomateActionsDescriptionType' } & {
      notification: {
        __typename?: 'AutomateDescriptionType'
      } & AutomationDescriptionFragmentFragment
      ethereumAutomateRun: {
        __typename?: 'AutomateDescriptionType'
      } & AutomationDescriptionFragmentFragment
    }
  }
}

export type AutomationHistoryQueryVariables = Exact<{
  filter: AutomateTriggerFilterInputType
  callHistoryFilter?: Maybe<AutomateTriggerCallHistoryListFilterInputType>
  callHistorySort?: Maybe<
    | Array<AutomateTriggerCallHistoryListSortInputType>
    | AutomateTriggerCallHistoryListSortInputType
  >
  callHistoryPagination?: Maybe<AutomateTriggerCallHistoryListPaginationInputType>
}>

export type AutomationHistoryQuery = { __typename?: 'Query' } & {
  automateTrigger?: Maybe<
    { __typename?: 'AutomateTriggerType' } & {
      callHistory: { __typename?: 'AutomateTriggerCallHistoryListQuery' } & {
        list?: Maybe<
          Array<
            { __typename?: 'AutomateTriggerCallHistoryType' } & Pick<
              AutomateTriggerCallHistoryType,
              'id' | 'error' | 'createdAt'
            >
          >
        >
        pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
      }
    }
  >
}

export type AutomationProductsBalanceQueryVariables = Exact<{
  [key: string]: never
}>

export type AutomationProductsBalanceQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      store: { __typename?: 'UserStoreType' } & {
        balance: { __typename?: 'UserStoreBalanceType' } & Pick<
          UserStoreBalanceType,
          'notifications'
        >
      }
    }
  >
}

export type AutomationProductsQueryVariables = Exact<{
  filter?: Maybe<StoreProductListQueryFilterInputType>
  sort?: Maybe<
    | Array<StoreProductListQuerySortInputType>
    | StoreProductListQuerySortInputType
  >
  pagination?: Maybe<StoreProductListQueryPaginationInputType>
}>

export type AutomationProductsQuery = { __typename?: 'Query' } & {
  products: { __typename?: 'StoreProductListQuery' } & {
    list?: Maybe<
      Array<
        { __typename?: 'StoreProductType' } & Pick<
          StoreProductType,
          | 'id'
          | 'number'
          | 'code'
          | 'name'
          | 'description'
          | 'priceUSD'
          | 'amount'
          | 'updatedAt'
          | 'createdAt'
        >
      >
    >
  }
}

export type AutomationProtocolsQueryVariables = Exact<{
  pagination?: Maybe<ProtocolListPaginationInputType>
  contractPagination?: Maybe<ContractListPaginationInputType>
}>

export type AutomationProtocolsQuery = { __typename?: 'Query' } & {
  protocols: { __typename?: 'ProtocolListQuery' } & {
    list?: Maybe<
      Array<
        { __typename?: 'ProtocolType' } & Pick<
          ProtocolType,
          'name' | 'id' | 'icon'
        > & {
            contracts: { __typename?: 'ContractListType' } & {
              list?: Maybe<
                Array<
                  { __typename?: 'ContractType' } & Pick<
                    ContractType,
                    | 'id'
                    | 'blockchain'
                    | 'network'
                    | 'address'
                    | 'name'
                    | 'events'
                  >
                >
              >
            }
          }
      >
    >
  }
}

export type AutomationTriggerCreateMutationVariables = Exact<{
  input: AutomateTriggerCreateInputType
  conditionsFilter?: Maybe<AutomateConditionListFilterInputType>
  conditionsSort?: Maybe<
    | Array<AutomateConditionListSortInputType>
    | AutomateConditionListSortInputType
  >
  conditionsPagination?: Maybe<AutomateConditionListPaginationInputType>
  actionsFilter?: Maybe<AutomateActionListFilterInputType>
  actionsSort?: Maybe<
    Array<AutomateActionListSortInputType> | AutomateActionListSortInputType
  >
  actionsPagination?: Maybe<AutomateActionListPaginationInputType>
}>

export type AutomationTriggerCreateMutation = { __typename?: 'Mutation' } & {
  automateTriggerCreate: {
    __typename?: 'AutomateTriggerType'
  } & AutomationTriggerFragmentFragment
}

export type AutomationTriggerDeleteMutationVariables = Exact<{
  id: Scalars['UuidType']
}>

export type AutomationTriggerDeleteMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'automateTriggerDelete'>

export type AutomationTriggerUpdateMutationVariables = Exact<{
  input: AutomateTriggerUpdateInputType
  conditionsFilter?: Maybe<AutomateConditionListFilterInputType>
  conditionsSort?: Maybe<
    | Array<AutomateConditionListSortInputType>
    | AutomateConditionListSortInputType
  >
  conditionsPagination?: Maybe<AutomateConditionListPaginationInputType>
  actionsFilter?: Maybe<AutomateActionListFilterInputType>
  actionsSort?: Maybe<
    Array<AutomateActionListSortInputType> | AutomateActionListSortInputType
  >
  actionsPagination?: Maybe<AutomateActionListPaginationInputType>
}>

export type AutomationTriggerUpdateMutation = { __typename?: 'Mutation' } & {
  automateTriggerUpdate: {
    __typename?: 'AutomateTriggerType'
  } & AutomationTriggerFragmentFragment
}

export type AutomationTriggerFragmentFragment = {
  __typename?: 'AutomateTriggerType'
} & Pick<
  AutomateTriggerType,
  'id' | 'type' | 'params' | 'name' | 'active' | 'lastCallAt' | 'createdAt'
> & {
    wallet: { __typename?: 'WalletType' } & Pick<
      WalletType,
      | 'id'
      | 'blockchain'
      | 'network'
      | 'address'
      | 'publicKey'
      | 'createdAt'
      | 'name'
    >
    conditions: { __typename?: 'AutomateConditionListType' } & {
      list?: Maybe<
        Array<
          {
            __typename?: 'AutomateConditionType'
          } & AutomationConditionFragmentFragment
        >
      >
      pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
    }
    actions: { __typename?: 'AutomateActionListType' } & {
      list?: Maybe<
        Array<
          {
            __typename?: 'AutomateActionType'
          } & AutomationActionFragmentFragment
        >
      >
      pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
    }
  }

export type AutomationTriggerQueryVariables = Exact<{
  filter: AutomateTriggerFilterInputType
  conditionsFilter?: Maybe<AutomateConditionListFilterInputType>
  conditionsSort?: Maybe<
    | Array<AutomateConditionListSortInputType>
    | AutomateConditionListSortInputType
  >
  conditionsPagination?: Maybe<AutomateConditionListPaginationInputType>
  actionsFilter?: Maybe<AutomateActionListFilterInputType>
  actionsSort?: Maybe<
    Array<AutomateActionListSortInputType> | AutomateActionListSortInputType
  >
  actionsPagination?: Maybe<AutomateActionListPaginationInputType>
}>

export type AutomationTriggerQuery = { __typename?: 'Query' } & {
  automateTrigger?: Maybe<
    { __typename?: 'AutomateTriggerType' } & AutomationTriggerFragmentFragment
  >
}

export type AutomationTriggersQueryVariables = Exact<{
  filter?: Maybe<AutomateTriggerListFilterInputType>
  sort?: Maybe<
    Array<AutomateTriggerListSortInputType> | AutomateTriggerListSortInputType
  >
  pagination?: Maybe<AutomateTriggerListPaginationInputType>
  conditionsFilter?: Maybe<AutomateConditionListFilterInputType>
  conditionsSort?: Maybe<
    | Array<AutomateConditionListSortInputType>
    | AutomateConditionListSortInputType
  >
  conditionsPagination?: Maybe<AutomateConditionListPaginationInputType>
  actionsFilter?: Maybe<AutomateActionListFilterInputType>
  actionsSort?: Maybe<
    Array<AutomateActionListSortInputType> | AutomateActionListSortInputType
  >
  actionsPagination?: Maybe<AutomateActionListPaginationInputType>
}>

export type AutomationTriggersQuery = { __typename?: 'Query' } & {
  automateTriggers: { __typename?: 'AutomateTriggerListQuery' } & {
    list?: Maybe<
      Array<
        {
          __typename?: 'AutomateTriggerType'
        } & AutomationTriggerFragmentFragment
      >
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
}

export type GovernanceProposalFragmentFragment = {
  __typename?: 'GovProposalType'
} & Pick<
  GovProposalType,
  | 'id'
  | 'proposer'
  | 'eta'
  | 'targets'
  | 'values'
  | 'signatures'
  | 'calldatas'
  | 'startBlock'
  | 'endBlock'
  | 'forVotes'
  | 'againstVotes'
  | 'abstainVotes'
  | 'canceled'
  | 'executed'
  | 'state'
  | 'description'
  | 'endVoteDate'
>

export type GovernanceProposalQueryVariables = Exact<{
  filter: GovProposalFilterInputType
}>

export type GovernanceProposalQuery = { __typename?: 'Query' } & {
  govProposal?: Maybe<
    { __typename?: 'GovProposalType' } & GovernanceProposalFragmentFragment
  >
}

export type GovernanceProposalsQueryVariables = Exact<{
  filter: GovProposalListFilterInputType
  sort?: Maybe<
    Array<GovProposalListSortInputType> | GovProposalListSortInputType
  >
  pagination?: Maybe<GovProposalListPaginationInputType>
}>

export type GovernanceProposalsQuery = { __typename?: 'Query' } & {
  govProposals: { __typename?: 'GovProposalListQuery' } & {
    list?: Maybe<
      Array<
        { __typename?: 'GovProposalType' } & GovernanceProposalFragmentFragment
      >
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
}

export type GovernanceReceiptQueryVariables = Exact<{
  filter: GovReceiptFilterInputType
}>

export type GovernanceReceiptQuery = { __typename?: 'Query' } & {
  govReceipt?: Maybe<
    { __typename?: 'GovReceiptType' } & Pick<
      GovReceiptType,
      'hasVoted' | 'support' | 'votes' | 'reason'
    >
  >
}

export type GovernanceVotesQueryVariables = Exact<{
  filter: GovVotesFilterInputType
}>

export type GovernanceVotesQuery = { __typename?: 'Query' } & {
  govVotes: { __typename?: 'GovVoteType' } & Pick<
    GovVoteType,
    'votes' | 'delegates'
  >
}

export type AddWalletMutationVariables = Exact<{
  input: AddWalletInputType
}>

export type AddWalletMutation = { __typename?: 'Mutation' } & {
  addWallet?: Maybe<
    { __typename?: 'AuthType' } & Pick<AuthType, 'sid'> & {
        user: { __typename?: 'UserType' } & Pick<UserType, 'id'>
      }
  >
}

export type AssetListQueryVariables = Exact<{ [key: string]: never }>

export type AssetListQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      tokenAliases: { __typename?: 'UserTokenAliasListType' } & {
        list?: Maybe<
          Array<{ __typename?: 'TokenAlias' } & PortfolioAssetFragment>
        >
      }
    }
  >
}

export type BlockChainsQueryVariables = Exact<{
  blockchainMetric: Scalars['MetricColumnType']
  blockchainGroup: MetricGroupEnum
  blockchainPagination?: Maybe<UserBlockchainWalletTokenMetricChartPaginationInputType>
  blockchainSort?: Maybe<
    | Array<UserBlockchainWalletTokenMetricChartSortInputType>
    | UserBlockchainWalletTokenMetricChartSortInputType
  >
  blockchainWalletMetric: Scalars['MetricColumnType']
  blockchainWalletGroup: MetricGroupEnum
  blockchainWalletSort?: Maybe<
    | Array<WalletTokenMetricChartSortInputType>
    | WalletTokenMetricChartSortInputType
  >
  blockchainWalletPagination?: Maybe<WalletTokenMetricChartPaginationInputType>
}>

export type BlockChainsQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      blockchains: Array<
        { __typename?: 'UserBlockchainType' } & Pick<
          UserBlockchainType,
          'name' | 'blockchain' | 'network'
        > & {
            tokenMetricChart: Array<
              { __typename?: 'MetricChartType' } & Pick<
                MetricChartType,
                'date' | 'sum'
              >
            >
            wallets: { __typename?: 'UserBlockchainWalletListType' } & {
              list?: Maybe<
                Array<
                  { __typename?: 'WalletType' } & Pick<
                    WalletType,
                    'id' | 'network' | 'blockchain' | 'address'
                  > & {
                      tokenMetricChart: Array<
                        { __typename?: 'MetricChartType' } & Pick<
                          MetricChartType,
                          'date' | 'sum'
                        >
                      >
                    }
                >
              >
            }
          }
      >
    }
  >
}

export type MyMetricQueryVariables = Exact<{ [key: string]: never }>

export type MyMetricQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      metric: { __typename?: 'UserMetricType' } & Pick<
        UserMetricType,
        'stakedUSD' | 'earnedUSD' | 'worth' | 'apy'
      >
    }
  >
}

export type OnWalletMetricUpdatedSubscriptionVariables = Exact<{
  wallet?: Maybe<Array<Scalars['UuidType']> | Scalars['UuidType']>
}>

export type OnWalletMetricUpdatedSubscription = {
  __typename?: 'Subscription'
} & {
  onWalletMetricUpdated: { __typename?: 'WalletMetricUpdatedEvent' } & Pick<
    WalletMetricUpdatedEvent,
    'id'
  >
}

export type PortfolioAssetFragment = { __typename?: 'TokenAlias' } & Pick<
  TokenAlias,
  'symbol' | 'name' | 'logoUrl'
> & {
    metric: { __typename?: 'TokenAliasMetricType' } & Pick<
      TokenAliasMetricType,
      'myPortfolioPercent' | 'myUSD' | 'myBalance'
    >
  }

export type TokenMetricChartQueryVariables = Exact<{
  group: MetricGroupEnum
  dateAfter?: Maybe<Scalars['DateTimeType']>
  dateBefore?: Maybe<Scalars['DateTimeType']>
  pagination?: Maybe<UserTokenMetricChartPaginationInputType>
  sort?: Maybe<
    Array<UserTokenMetricChartSortInputType> | UserTokenMetricChartSortInputType
  >
}>

export type TokenMetricChartQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      altCoins: Array<
        { __typename?: 'MetricChartType' } & Pick<
          MetricChartType,
          'sum' | 'date'
        >
      >
      stableCoins: Array<
        { __typename?: 'MetricChartType' } & Pick<
          MetricChartType,
          'sum' | 'date'
        >
      >
    }
  >
}

export type TokenMetricQueryVariables = Exact<{
  group?: MetricGroupEnum
  filter?: Maybe<UserMetricChartFilterInputType>
  sort?: Maybe<
    Array<UserMetricChartSortInputType> | UserMetricChartSortInputType
  >
  pagination?: Maybe<UserMetricChartPaginationInputType>
}>

export type TokenMetricQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      totalNetWorth: Array<
        { __typename?: 'MetricChartType' } & Pick<
          MetricChartType,
          'date' | 'sum'
        >
      >
      onWallets: Array<
        { __typename?: 'MetricChartType' } & Pick<
          MetricChartType,
          'date' | 'sum'
        >
      >
    }
  >
}

export type ProtocolCreateMutationVariables = Exact<{
  input: ProtocolCreateInputType
}>

export type ProtocolCreateMutation = { __typename?: 'Mutation' } & {
  protocolCreate: { __typename?: 'ProtocolType' } & ProtocolFragmentFragment
}

export type ProtocolDeleteMutationVariables = Exact<{
  id: Scalars['UuidType']
}>

export type ProtocolDeleteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'protocolDelete'
>

export type ProtocolMetricQueryVariables = Exact<{
  filter: ProtocolFilterInputType
  metric: Scalars['MetricColumnType']
  metricGroup: MetricGroupEnum
  metricFilter?: Maybe<ProtocolMetricChartContractsFilterInputType>
  metricSort?: Maybe<
    | Array<ProtocolMetricChartContractsSortInputType>
    | ProtocolMetricChartContractsSortInputType
  >
  metricPagination?: Maybe<ProtocolMetricChartContractsPaginationInputType>
}>

export type ProtocolMetricQuery = { __typename?: 'Query' } & {
  protocol?: Maybe<
    { __typename?: 'ProtocolType' } & {
      metricChartContracts: Array<
        { __typename?: 'MetricChartType' } & ProtocolMetricChartFragment
      >
    }
  >
}

export type ProtocolQueryVariables = Exact<{
  filter: ProtocolFilterInputType
}>

export type ProtocolQuery = { __typename?: 'Query' } & {
  protocol?: Maybe<
    { __typename?: 'ProtocolType' } & {
      socialPosts: { __typename?: 'ProtocolSocialPostListType' } & {
        list?: Maybe<
          Array<
            { __typename?: 'ProtocolSocialPostType' } & Pick<
              ProtocolSocialPostType,
              'id' | 'provider' | 'title' | 'content' | 'link' | 'createdAt'
            >
          >
        >
      }
      telegram: Array<
        { __typename?: 'MetricChartType' } & Pick<
          MetricChartType,
          'date' | 'sum'
        >
      >
      coingecko: Array<
        { __typename?: 'MetricChartType' } & Pick<
          MetricChartType,
          'date' | 'sum'
        >
      >
      coinmarketcap: Array<
        { __typename?: 'MetricChartType' } & Pick<
          MetricChartType,
          'date' | 'sum'
        >
      >
    } & ProtocolFragmentFragment
  >
}

export type ProtocolEstimatedQueryVariables = Exact<{
  balance: Scalars['Float']
  apy: Scalars['Float']
  blockchain?: Maybe<BlockchainEnum>
  network?: Maybe<Scalars['String']>
}>

export type ProtocolEstimatedQuery = { __typename?: 'Query' } & {
  restakeStrategy: { __typename?: 'RestakeStrategyType' } & {
    hold: Array<
      { __typename?: 'RestakeStrategyPointType' } & Pick<
        RestakeStrategyPointType,
        'v' | 't'
      >
    >
    everyDay: Array<
      { __typename?: 'RestakeStrategyPointType' } & Pick<
        RestakeStrategyPointType,
        'v' | 't'
      >
    >
    optimal: Array<
      { __typename?: 'RestakeStrategyPointType' } & Pick<
        RestakeStrategyPointType,
        'v' | 't'
      >
    >
  }
}

export type ProtocolFavoriteMutationVariables = Exact<{
  input: ProtocolFavoriteInputType
}>

export type ProtocolFavoriteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'protocolFavorite'
>

export type ProtocolsQueryVariables = Exact<{
  protocolFilter?: Maybe<ProtocolListFilterInputType>
  protocolSort?: Maybe<
    Array<ProtocolListSortInputType> | ProtocolListSortInputType
  >
  protocolPagination?: Maybe<ProtocolListPaginationInputType>
}>

export type ProtocolsQuery = { __typename?: 'Query' } & {
  protocols: { __typename?: 'ProtocolListQuery' } & {
    list?: Maybe<
      Array<{ __typename?: 'ProtocolType' } & ProtocolFragmentFragment>
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
  favorites: { __typename?: 'ProtocolListQuery' } & {
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
  all: { __typename?: 'ProtocolListQuery' } & {
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
}

export type ProtocolMetricChartFragment = {
  __typename?: 'MetricChartType'
} & Pick<MetricChartType, 'date' | 'min' | 'max' | 'avg' | 'sum' | 'count'>

export type ProtocolOverviewMetricQueryVariables = Exact<{
  filter: ProtocolFilterInputType
  metricGroup: MetricGroupEnum
  metricFilter?: Maybe<ProtocolMetricChartContractsFilterInputType>
  metricSort?: Maybe<
    | Array<ProtocolMetricChartContractsSortInputType>
    | ProtocolMetricChartContractsSortInputType
  >
  metricPagination?: Maybe<ProtocolMetricChartContractsPaginationInputType>
}>

export type ProtocolOverviewMetricQuery = { __typename?: 'Query' } & {
  protocol?: Maybe<
    { __typename?: 'ProtocolType' } & {
      tvl: Array<
        { __typename?: 'MetricChartType' } & ProtocolMetricChartFragment
      >
      uniqueWalletsCount: Array<
        { __typename?: 'MetricChartType' } & ProtocolMetricChartFragment
      >
    }
  >
}

export type ProtocolResolveContractsMutationVariables = Exact<{
  id: Scalars['UuidType']
  input: ProtocolResolveContractsInputType
}>

export type ProtocolResolveContractsMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'protocolResolveContracts'>

export type ProtocolStakedBalanceQueryVariables = Exact<{
  group: MetricGroupEnum
  contract?: Maybe<Array<Scalars['UuidType']> | Scalars['UuidType']>
  dateAfter?: Maybe<Scalars['DateTimeType']>
  dateBefore?: Maybe<Scalars['DateTimeType']>
  pagination?: Maybe<UserTokenMetricChartPaginationInputType>
  sort?: Maybe<
    Array<UserTokenMetricChartSortInputType> | UserTokenMetricChartSortInputType
  >
}>

export type ProtocolStakedBalanceQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      altCoins: Array<
        { __typename?: 'MetricChartType' } & Pick<
          MetricChartType,
          'sum' | 'date'
        >
      >
      stableCoins: Array<
        { __typename?: 'MetricChartType' } & Pick<
          MetricChartType,
          'sum' | 'date'
        >
      >
    }
  >
}

export type ProtocolUpdateMutationVariables = Exact<{
  id: Scalars['UuidType']
  input: ProtocolUpdateInputType
}>

export type ProtocolUpdateMutation = { __typename?: 'Mutation' } & {
  protocolUpdate: { __typename?: 'ProtocolType' } & ProtocolFragmentFragment
}

export type ProtocolFragmentFragment = { __typename?: 'ProtocolType' } & Pick<
  ProtocolType,
  | 'id'
  | 'adapter'
  | 'name'
  | 'description'
  | 'icon'
  | 'link'
  | 'hidden'
  | 'createdAt'
  | 'favorite'
> & {
    metric: { __typename?: 'ProtocolMetricType' } & Pick<
      ProtocolMetricType,
      | 'tvl'
      | 'myAPY'
      | 'myStaked'
      | 'myEarned'
      | 'myMinUpdatedAt'
      | 'myAPYBoost'
    >
    links: { __typename?: 'ProtocolLinkMapType' } & {
      social: Array<
        { __typename?: 'ProtocolLinkType' } & Pick<
          ProtocolLinkType,
          'id' | 'name' | 'value'
        >
      >
      listing: Array<
        { __typename?: 'ProtocolLinkType' } & Pick<
          ProtocolLinkType,
          'id' | 'name' | 'value'
        >
      >
      audit: Array<
        { __typename?: 'ProtocolLinkType' } & Pick<
          ProtocolLinkType,
          'id' | 'name' | 'value'
        >
      >
      other: Array<
        { __typename?: 'ProtocolLinkType' } & Pick<
          ProtocolLinkType,
          'id' | 'name' | 'value'
        >
      >
    }
  }

export type ProposalCreateMutationVariables = Exact<{
  input: ProposalCreateInputType
}>

export type ProposalCreateMutation = { __typename?: 'Mutation' } & {
  proposalCreate: { __typename?: 'ProposalType' } & ProposalFragmentFragment
}

export type ProposalDeleteMutationVariables = Exact<{
  id: Scalars['UuidType']
}>

export type ProposalDeleteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'proposalDelete'
>

export type ProposalQueryVariables = Exact<{
  filter: ProposalFilterInputType
}>

export type ProposalQuery = { __typename?: 'Query' } & {
  proposal?: Maybe<{ __typename?: 'ProposalType' } & ProposalFragmentFragment>
}

export type ProposalsByStatusQueryVariables = Exact<{
  sort?: Maybe<Array<ProposalListSortInputType> | ProposalListSortInputType>
  pagination?: Maybe<ProposalListPaginationInputType>
}>

export type ProposalsByStatusQuery = { __typename?: 'Query' } & {
  open: { __typename?: 'ProposalListQuery' } & {
    list?: Maybe<
      Array<{ __typename?: 'ProposalType' } & ProposalFragmentFragment>
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
  in_process: { __typename?: 'ProposalListQuery' } & {
    list?: Maybe<
      Array<{ __typename?: 'ProposalType' } & ProposalFragmentFragment>
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
  executed: { __typename?: 'ProposalListQuery' } & {
    list?: Maybe<
      Array<{ __typename?: 'ProposalType' } & ProposalFragmentFragment>
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
  defeated: { __typename?: 'ProposalListQuery' } & {
    list?: Maybe<
      Array<{ __typename?: 'ProposalType' } & ProposalFragmentFragment>
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
}

export type ProposalsQueryVariables = Exact<{
  filter?: Maybe<ProposalListFilterInputType>
  sort?: Maybe<Array<ProposalListSortInputType> | ProposalListSortInputType>
  pagination?: Maybe<ProposalListPaginationInputType>
}>

export type ProposalsQuery = { __typename?: 'Query' } & {
  proposals: { __typename?: 'ProposalListQuery' } & {
    list?: Maybe<
      Array<{ __typename?: 'ProposalType' } & ProposalFragmentFragment>
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
}

export type ProposalUnvoteMutationVariables = Exact<{
  proposal: Scalars['UuidType']
}>

export type ProposalUnvoteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'unvote'
>

export type ProposalUpdateMutationVariables = Exact<{
  id: Scalars['UuidType']
  input: ProposalUpdateInputType
}>

export type ProposalUpdateMutation = { __typename?: 'Mutation' } & {
  proposalUpdate: { __typename?: 'ProposalType' } & ProposalFragmentFragment
}

export type ProposalVoteFragmentFragment = { __typename?: 'VoteType' } & Pick<
  VoteType,
  'id' | 'updatedAt' | 'createdAt'
> & {
    user: { __typename?: 'UserType' } & Pick<UserType, 'id' | 'createdAt'> & {
        wallets: { __typename?: 'WalletListType' } & {
          list?: Maybe<
            Array<
              { __typename?: 'WalletType' } & Pick<
                WalletType,
                | 'id'
                | 'blockchain'
                | 'network'
                | 'address'
                | 'publicKey'
                | 'createdAt'
              >
            >
          >
        }
      }
  }

export type ProposalVoteMutationVariables = Exact<{
  proposal: Scalars['UuidType']
}>

export type ProposalVoteMutation = { __typename?: 'Mutation' } & {
  vote: { __typename?: 'VoteType' } & ProposalVoteFragmentFragment
}

export type ProposalFragmentFragment = { __typename?: 'ProposalType' } & Pick<
  ProposalType,
  | 'id'
  | 'title'
  | 'description'
  | 'status'
  | 'releasedAt'
  | 'plannedAt'
  | 'updatedAt'
  | 'createdAt'
> & {
    author?: Maybe<
      { __typename?: 'UserType' } & Pick<UserType, 'id' | 'createdAt'>
    >
    votes: { __typename?: 'VoteListType' } & {
      list?: Maybe<
        Array<{ __typename?: 'VoteType' } & ProposalVoteFragmentFragment>
      >
    }
  }

export type BillingHistoryQueryVariables = Exact<{
  filter?: Maybe<UserBillingTransferListFilterInputType>
  sort?: Maybe<
    | Array<UserBillingTransferListSortInputType>
    | UserBillingTransferListSortInputType
  >
  pagination?: Maybe<UserBillingTransferListPaginationInputType>
}>

export type BillingHistoryQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      billing: { __typename?: 'UserBillingType' } & {
        transfers: { __typename?: 'UserBillingTransferListType' } & {
          list?: Maybe<
            Array<
              { __typename?: 'BillingTransferType' } & Pick<
                BillingTransferType,
                | 'id'
                | 'blockchain'
                | 'network'
                | 'account'
                | 'amount'
                | 'tx'
                | 'createdAt'
              > & {
                  bill?: Maybe<
                    { __typename?: 'BillingBillType' } & Pick<
                      BillingBillType,
                      | 'id'
                      | 'blockchain'
                      | 'network'
                      | 'account'
                      | 'claimant'
                      | 'claimGasFee'
                      | 'claimProtocolFee'
                      | 'gasFee'
                      | 'protocolFee'
                      | 'claim'
                      | 'status'
                      | 'tx'
                      | 'createdAt'
                      | 'updatedAt'
                    >
                  >
                }
            >
          >
          pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
        }
      }
    }
  >
}

export type UserContactEmailConfirmMutationVariables = Exact<{
  input: UserContactConfirmEmailInputType
}>

export type UserContactEmailConfirmMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'userContactEmailConfirm'>

export type UserContactCreateMutationVariables = Exact<{
  input: UserContactCreateInputType
}>

export type UserContactCreateMutation = { __typename?: 'Mutation' } & {
  userContactCreate: {
    __typename?: 'UserContactType'
  } & UserContactFragmentFragment
}

export type UserContactDeleteMutationVariables = Exact<{
  id: Scalars['UuidType']
}>

export type UserContactDeleteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'userContactDelete'
>

export type UserContactsQueryVariables = Exact<{
  userContactFilter?: Maybe<UserContactListQueryFilterInputType>
  userContactSort?: Maybe<
    Array<UserContactListSortInputType> | UserContactListSortInputType
  >
  userContactPagination?: Maybe<UserContactListPaginationInputType>
}>

export type UserContactsQuery = { __typename?: 'Query' } & {
  userContacts: { __typename?: 'UserContactListQuery' } & {
    list?: Maybe<
      Array<{ __typename?: 'UserContactType' } & UserContactFragmentFragment>
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
}

export type UserContactUpdateMutationVariables = Exact<{
  id: Scalars['UuidType']
  input: UserContactUpdateInputType
}>

export type UserContactUpdateMutation = { __typename?: 'Mutation' } & {
  userContactUpdate: {
    __typename?: 'UserContactType'
  } & UserContactFragmentFragment
}

export type UserContactFragmentFragment = {
  __typename?: 'UserContactType'
} & Pick<
  UserContactType,
  | 'id'
  | 'broker'
  | 'name'
  | 'address'
  | 'status'
  | 'confirmationCode'
  | 'createdAt'
  | 'activatedAt'
>

export type UserNotificationsListQueryVariables = Exact<{
  [key: string]: never
}>

export type UserNotificationsListQuery = { __typename?: 'Query' } & {
  userNotifications: Array<
    { __typename?: 'UserNotificationType' } & UserNotificationTypeFragment
  >
}

export type UserNotificationToggleMutationVariables = Exact<{
  type: UserNotificationTypeEnum
  state: Scalars['Boolean']
}>

export type UserNotificationToggleMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'userNotificationToggle'
>

export type UserNotificationTypeFragment = {
  __typename?: 'UserNotificationType'
} & Pick<UserNotificationType, 'type'>

export type WalletDeleteMutationVariables = Exact<{
  id: Scalars['UuidType']
}>

export type WalletDeleteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'walletDelete'
>

export type WalletListQueryVariables = Exact<{
  sort?: Maybe<Array<WalletListSortInputType> | WalletListSortInputType>
  pagination?: Maybe<WalletListPaginationInputType>
}>

export type WalletListQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      wallets: { __typename?: 'WalletListType' } & {
        list?: Maybe<
          Array<{ __typename?: 'WalletType' } & WalletFragmentFragment>
        >
        pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
      }
    }
  >
}

export type WalletUpdateMutationVariables = Exact<{
  id: Scalars['UuidType']
  input: WalletUpdateInputType
}>

export type WalletUpdateMutation = { __typename?: 'Mutation' } & {
  walletUpdate: { __typename?: 'WalletType' } & WalletFragmentFragment
}

export type WalletFragmentFragment = { __typename?: 'WalletType' } & Pick<
  WalletType,
  | 'id'
  | 'blockchain'
  | 'network'
  | 'address'
  | 'publicKey'
  | 'name'
  | 'createdAt'
  | 'triggersCount'
> & {
    metric: { __typename?: 'WalletMetricType' } & Pick<
      WalletMetricType,
      'stakedUSD' | 'earnedUSD' | 'usd'
    >
    billing: { __typename?: 'WalletBillingType' } & {
      balance: { __typename?: 'BillingBalanceType' } & Pick<
        BillingBalanceType,
        'lowFeeFunds' | 'balance' | 'netBalance' | 'claim'
      >
    }
  }

export type StakingAutomatesContractsQueryVariables = Exact<{
  filter?: Maybe<AutomateContractListFilterInputType>
  sort?: Maybe<
    Array<AutomateContractListSortInputType> | AutomateContractListSortInputType
  >
  pagination?: Maybe<AutomateContractListPaginationInputType>
}>

export type StakingAutomatesContractsQuery = { __typename?: 'Query' } & {
  automateContracts: { __typename?: 'AutomateContractListQuery' } & {
    list?: Maybe<
      Array<
        { __typename?: 'AutomateContractType' } & Pick<
          AutomateContractType,
          | 'id'
          | 'address'
          | 'adapter'
          | 'initParams'
          | 'verification'
          | 'rejectReason'
        > & {
            protocol: { __typename?: 'ProtocolType' } & Pick<
              ProtocolType,
              'adapter'
            >
            contract?: Maybe<
              { __typename?: 'ContractType' } & Pick<
                ContractType,
                | 'id'
                | 'protocolId'
                | 'adapter'
                | 'layout'
                | 'blockchain'
                | 'network'
                | 'address'
                | 'deployBlockNumber'
                | 'name'
                | 'description'
                | 'link'
                | 'hidden'
                | 'events'
                | 'createdAt'
              > & {
                  automate: { __typename?: 'ContractAutomatesType' } & Pick<
                    ContractAutomatesType,
                    'adapters' | 'autorestake'
                  >
                  metric: { __typename?: 'ContractMetricType' } & Pick<
                    ContractMetricType,
                    'tvl' | 'aprYear' | 'myStaked' | 'myEarned' | 'myAPYBoost'
                  >
                }
            >
            contractWallet?: Maybe<
              { __typename?: 'WalletType' } & Pick<
                WalletType,
                'id' | 'network' | 'address'
              > & {
                  metric: { __typename?: 'WalletMetricType' } & Pick<
                    WalletMetricType,
                    'stakedUSD'
                  >
                }
            >
            wallet: { __typename?: 'WalletType' } & Pick<
              WalletType,
              'id' | 'network' | 'address' | 'blockchain'
            >
          }
      >
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
}

export type StakingConnectWalletMutationVariables = Exact<{
  contract: Scalars['UuidType']
  wallet: Scalars['UuidType']
}>

export type StakingConnectWalletMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'contractWalletLink'
>

export type StakingConnectedContractsQueryVariables = Exact<{
  filter?: Maybe<WalletContractListFilterInputType>
}>

export type StakingConnectedContractsQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      wallets: { __typename?: 'WalletListType' } & {
        list?: Maybe<
          Array<
            { __typename?: 'WalletType' } & {
              contracts: { __typename?: 'WalletContractListType' } & {
                list?: Maybe<
                  Array<
                    { __typename?: 'ContractType' } & Pick<
                      ContractType,
                      'id' | 'address'
                    >
                  >
                >
              }
            }
          >
        >
      }
    }
  >
}

export type StakingContractCreateMutationVariables = Exact<{
  protocol: Scalars['UuidType']
  input: ContractCreateInputType
}>

export type StakingContractCreateMutation = { __typename?: 'Mutation' } & {
  contractCreate: {
    __typename?: 'ContractType'
  } & StakingContractFragmentFragment
}

export type StakingContractDeleteMutationVariables = Exact<{
  id: Scalars['UuidType']
}>

export type StakingContractDeleteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'contractDelete'
>

export type StakingContractEventsQueryVariables = Exact<{
  filter: ProtocolFilterInputType
  contractFilter?: Maybe<ContractListFilterInputType>
  contractSort?: Maybe<
    Array<ContractListSortInputType> | ContractListSortInputType
  >
  contractPagination?: Maybe<ContractListPaginationInputType>
}>

export type StakingContractEventsQuery = { __typename?: 'Query' } & {
  protocol?: Maybe<
    { __typename?: 'ProtocolType' } & {
      contracts: { __typename?: 'ContractListType' } & {
        list?: Maybe<
          Array<
            { __typename?: 'ContractType' } & Pick<
              ContractType,
              'id' | 'protocolId' | 'events'
            >
          >
        >
      }
    }
  >
}

export type StakingContractListQueryVariables = Exact<{
  filter: ProtocolFilterInputType
  contractFilter?: Maybe<ContractListFilterInputType>
  contractSort?: Maybe<
    Array<ContractListSortInputType> | ContractListSortInputType
  >
  contractPagination?: Maybe<ContractListPaginationInputType>
}>

export type StakingContractListQuery = { __typename?: 'Query' } & {
  protocol?: Maybe<
    { __typename?: 'ProtocolType' } & Pick<ProtocolType, 'adapter'> & {
        contracts: { __typename?: 'ContractListType' } & {
          list?: Maybe<
            Array<
              { __typename?: 'ContractType' } & StakingContractFragmentFragment
            >
          >
          pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
        }
      }
  >
}

export type StakingContractMetricQueryVariables = Exact<{
  metricTvl?: Scalars['MetricColumnType']
  metricApr?: Scalars['MetricColumnType']
  metricStakingUSD?: Scalars['MetricColumnType']
  metricEarnedUSD?: Scalars['MetricColumnType']
  metricGroup?: MetricGroupEnum
  metricFilter?: Maybe<UserMetricChartFilterInputType>
  metricSort?: Maybe<
    Array<UserMetricChartSortInputType> | UserMetricChartSortInputType
  >
  metricPagination?: Maybe<UserMetricChartPaginationInputType>
}>

export type StakingContractMetricQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      tvl: Array<
        { __typename?: 'MetricChartType' } & Pick<MetricChartType, 'avg'>
      >
      apr: Array<
        { __typename?: 'MetricChartType' } & Pick<MetricChartType, 'avg'>
      >
      stakingUSD: Array<
        { __typename?: 'MetricChartType' } & Pick<MetricChartType, 'avg'>
      >
      earnedUSD: Array<
        { __typename?: 'MetricChartType' } & Pick<MetricChartType, 'avg'>
      >
    }
  >
}

export type StakingContractUpdateMutationVariables = Exact<{
  id: Scalars['UuidType']
  input: ContractUpdateInputType
}>

export type StakingContractUpdateMutation = { __typename?: 'Mutation' } & {
  contractUpdate: {
    __typename?: 'ContractType'
  } & StakingContractFragmentFragment
}

export type StakingContractFragmentFragment = {
  __typename?: 'ContractType'
} & Pick<
  ContractType,
  | 'id'
  | 'blockchain'
  | 'network'
  | 'address'
  | 'name'
  | 'description'
  | 'link'
  | 'hidden'
  | 'createdAt'
  | 'adapter'
  | 'protocolId'
  | 'layout'
> & {
    automate: { __typename?: 'ContractAutomatesType' } & Pick<
      ContractAutomatesType,
      'adapters' | 'autorestake'
    >
    metric: { __typename?: 'ContractMetricType' } & Pick<
      ContractMetricType,
      'tvl' | 'aprYear' | 'myStaked' | 'myEarned' | 'myAPYBoost'
    >
  }

export type StakingDisconnectWalletMutationVariables = Exact<{
  contract: Scalars['UuidType']
  wallet: Scalars['UuidType']
}>

export type StakingDisconnectWalletMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'contractWalletUnlink'>

export type StakingTokensQueryVariables = Exact<{
  filter?: Maybe<TokenListQueryFilterInputType>
}>

export type StakingTokensQuery = { __typename?: 'Query' } & {
  tokens: { __typename?: 'TokenListQuery' } & {
    list?: Maybe<
      Array<
        { __typename?: 'TokenType' } & Pick<
          TokenType,
          | 'id'
          | 'alias'
          | 'blockchain'
          | 'network'
          | 'address'
          | 'name'
          | 'symbol'
          | 'decimals'
        >
      >
    >
  }
}

export type UsersQueryVariables = Exact<{
  filter?: Maybe<UserListFilterInputType>
  sort?: Maybe<Array<UserListSortInputType> | UserListSortInputType>
  pagination?: Maybe<UserListPaginationInputType>
}>

export type UsersQuery = { __typename?: 'Query' } & {
  users: { __typename?: 'UserListQuery' } & {
    list?: Maybe<Array<{ __typename?: 'UserType' } & UserFragment>>
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
}

export type UserUpdateMutationVariables = Exact<{
  id: Scalars['UuidType']
  input: UserUpdateInputType
}>

export type UserUpdateMutation = { __typename?: 'Mutation' } & {
  userUpdate: { __typename?: 'UserType' } & Pick<
    UserType,
    'id' | 'role' | 'createdAt'
  >
}

export type UserFragment = { __typename?: 'UserType' } & Pick<
  UserType,
  'id' | 'role' | 'createdAt'
> & {
    wallets: { __typename?: 'WalletListType' } & {
      list?: Maybe<
        Array<
          { __typename?: 'WalletType' } & Pick<
            WalletType,
            'id' | 'blockchain' | 'network' | 'address'
          >
        >
      >
    }
  }

export type AuthEthMutationVariables = Exact<{
  input: AuthEthereumInputType
}>

export type AuthEthMutation = { __typename?: 'Mutation' } & {
  authEth?: Maybe<
    { __typename?: 'AuthType' } & Pick<AuthType, 'sid'> & {
        user: { __typename?: 'UserType' } & UserFragmentFragment
      }
  >
}

export type AuthWavesMutationVariables = Exact<{
  input: AuthWavesInputType
}>

export type AuthWavesMutation = { __typename?: 'Mutation' } & {
  authWaves?: Maybe<
    { __typename?: 'AuthType' } & Pick<AuthType, 'sid'> & {
        user: { __typename?: 'UserType' } & UserFragmentFragment
      }
  >
}

export type UserFragmentFragment = { __typename?: 'UserType' } & Pick<
  UserType,
  'id' | 'role' | 'createdAt'
> & {
    tokenAliases: { __typename?: 'UserTokenAliasListType' } & {
      pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
    }
  }
