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

export enum BlockchainEnum {
  Ethereum = 'ethereum',
  Waves = 'waves'
}

export type BlockchainFilterInputType = {
  protocol: BlockchainEnum
  network?: Maybe<Scalars['String']>
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
  /** Name */
  name: Scalars['String']
  /** Description */
  description?: Maybe<Scalars['String']>
  /** Website URL */
  link?: Maybe<Scalars['String']>
  /** Is hidden */
  hidden?: Maybe<Scalars['Boolean']>
}

export type ContractListFilterInputType = {
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
  CreatedAt = 'createdAt'
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
  Value = 'value'
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
  /** Name */
  name: Scalars['String']
  /** Description */
  description: Scalars['String']
  /** View URL */
  link?: Maybe<Scalars['String']>
  /** Is hidden */
  hidden: Scalars['Boolean']
  metricChart: Array<MetricChartType>
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
  /** Name */
  name?: Maybe<Scalars['String']>
  /** Description */
  description?: Maybe<Scalars['String']>
  /** Website URL */
  link?: Maybe<Scalars['String']>
  /** Is hidden */
  hidden?: Maybe<Scalars['Boolean']>
}

export enum LocaleEnum {
  EnUs = 'enUS',
  RuRu = 'ruRU'
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
  Year = 'year'
}

export type Mutation = {
  __typename?: 'Mutation'
  authEth?: Maybe<AuthType>
  protocolCreate: ProtocolType
  protocolUpdate: ProtocolType
  protocolDelete: Scalars['Boolean']
  contractCreate: ContractType
  contractUpdate: ContractType
  contractDelete: Scalars['Boolean']
  contractWalletLink: Scalars['Boolean']
  contractWalletUnlink: Scalars['Boolean']
  proposalCreate: ProposalType
  proposalUpdate: ProposalType
  proposalDelete: Scalars['Boolean']
  vote: VoteType
  unvote: Scalars['Boolean']
  userContactCreate: UserContactType
  userContactEmailConfirm: UserContactType
  userContactDelete: Scalars['Boolean']
}

export type MutationAuthEthArgs = {
  input: AuthEthereumInputType
}

export type MutationProtocolCreateArgs = {
  input: ProtocolCreateInputType
}

export type MutationProtocolUpdateArgs = {
  id: Scalars['UuidType']
  input: ProtocolUpdateInputType
}

export type MutationProtocolDeleteArgs = {
  id: Scalars['UuidType']
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

export type MutationUserContactEmailConfirmArgs = {
  input: UserContactConfirmEmailInputType
}

export type MutationUserContactDeleteArgs = {
  id: Scalars['UuidType']
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
  CreatedAt = 'createdAt'
}

export enum ProposalStatusEnum {
  /** Proposal is open for vote */
  Open = 'open',
  /** Proposal is executed */
  Executed = 'executed',
  /** Proposal is defeated */
  Defeated = 'defeated'
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
  /** Is hidden */
  hidden?: Maybe<Scalars['Boolean']>
}

export type ProtocolFilterInputType = {
  id: Scalars['String']
}

export type ProtocolListFilterInputType = {
  blockchain?: Maybe<BlockchainFilterInputType>
  /** Target user ID */
  linked?: Maybe<Scalars['UuidType']>
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
  CreatedAt = 'createdAt'
}

export type ProtocolMetricChartFilterInputType = {
  blockchain?: Maybe<BlockchainFilterInputType>
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
  Value = 'value'
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
  /** Is hidden */
  hidden: Scalars['Boolean']
  contracts: ContractListType
  metricChart: Array<MetricChartType>
  /** Date of created account */
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
  /** Is hidden */
  hidden?: Maybe<Scalars['Boolean']>
}

export type Query = {
  __typename?: 'Query'
  ping: Scalars['String']
  me?: Maybe<UserType>
  protocol?: Maybe<ProtocolType>
  protocols: ProtocolListQuery
  proposal?: Maybe<ProposalType>
  proposals: ProposalListQuery
  userContact?: Maybe<UserContactType>
  userContacts: UserContactListQuery
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

export enum SortOrderEnum {
  /** Ascending */
  Asc = 'asc',
  /** Descending */
  Desc = 'desc'
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
  CreatedAt = 'createdAt'
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
  Value = 'value'
}

export enum UserContactBrokerEnum {
  /** Email */
  Email = 'email',
  /** Telegram */
  Telegram = 'telegram'
}

export type UserContactConfirmEmailInputType = {
  /** address */
  address: Scalars['String']
  /** code */
  confirmationCode: Scalars['String']
}

export type UserContactCreateInputType = {
  /** Type */
  type: UserContactBrokerEnum
  /** Address */
  address: Scalars['String']
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
  /** User ID */
  user?: Maybe<Scalars['UuidType']>
  /** Type */
  type?: Maybe<UserContactBrokerEnum>
  /** Status */
  status?: Maybe<UserContactStatusEnum>
}

export type UserContactListSortInputType = {
  column: UserContactListSortInputTypeColumnEnum
  order?: Maybe<SortOrderEnum>
}

export enum UserContactListSortInputTypeColumnEnum {
  Id = 'id',
  CreatedAt = 'createdAt'
}

export enum UserContactStatusEnum {
  /** Has been activated */
  Active = 'active',
  /** Has not been activated yet */
  Inactive = 'inactive'
}

export type UserContactType = {
  __typename?: 'UserContactType'
  /** Identificator */
  id: Scalars['UuidType']
  /** User */
  user: UserType
  /** Type of the contact */
  type: UserContactBrokerEnum
  /** Address */
  address: Scalars['String']
  /** Status */
  status: UserContactStatusEnum
  /** Confirmation Code */
  confirmationCode: Scalars['String']
  /** Date of crate */
  createdAt: Scalars['DateTimeType']
  /** Date of activated */
  activatedAt?: Maybe<Scalars['DateTimeType']>
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
  Value = 'value'
}

export type UserMetricsTokenAliasFilterInputType = {
  id?: Maybe<Array<Scalars['UuidType']>>
  /** Is stable token */
  stable?: Maybe<Scalars['Boolean']>
}

export enum UserRoleEnum {
  /** User */
  User = 'user',
  /** Administrator */
  Admin = 'admin'
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
  Value = 'value'
}

export type UserType = {
  __typename?: 'UserType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Access role */
  role: UserRoleEnum
  /** Current user locale */
  locale: LocaleEnum
  wallets: WalletListType
  blockchains: Array<UserBlockchainType>
  metricChart: Array<MetricChartType>
  tokenMetricChart: Array<MetricChartType>
  /** Date of created account */
  createdAt: Scalars['DateTimeType']
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
  CreatedAt = 'createdAt'
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
  CreatedAt = 'createdAt'
}

export type WalletContractListType = {
  __typename?: 'WalletContractListType'
  /** Elements */
  list?: Maybe<Array<ContractType>>
  pagination: Pagination
}

export type WalletListFilterInputType = {
  blockchain?: Maybe<BlockchainFilterInputType>
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
  CreatedAt = 'createdAt'
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
  Value = 'value'
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
  Value = 'value'
}

export type WalletType = {
  __typename?: 'WalletType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Blockchain type */
  blockchain: BlockchainEnum
  /** Blockchain network id */
  network: Scalars['String']
  /** Address */
  address: Scalars['String']
  /** Public key */
  publicKey: Scalars['String']
  contracts: WalletContractListType
  metricChart: Array<MetricChartType>
  tokenMetricChart: Array<MetricChartType>
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

export type TokenMetricChartQueryVariables = Exact<{
  metric: Scalars['MetricColumnType']
  group: MetricGroupEnum
  filter?: Maybe<UserTokenMetricChartFilterInputType>
  pagination?: Maybe<UserTokenMetricChartPaginationInputType>
  sort?: Maybe<
    Array<UserTokenMetricChartSortInputType> | UserTokenMetricChartSortInputType
  >
}>

export type TokenMetricChartQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      tokenMetricChart: Array<
        { __typename?: 'MetricChartType' } & Pick<
          MetricChartType,
          'sum' | 'date'
        >
      >
    }
  >
}

export type ProposalCreateMutationVariables = Exact<{
  input: ProposalCreateInputType
}>

export type ProposalCreateMutation = { __typename?: 'Mutation' } & {
  proposalCreate: { __typename?: 'ProposalType' } & Pick<ProposalType, 'id'>
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
  'id' | 'title' | 'description' | 'status' | 'updatedAt' | 'createdAt'
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
  metricFilter?: Maybe<ProtocolMetricChartFilterInputType>
  metricSort?: Maybe<
    Array<ProtocolMetricChartSortInputType> | ProtocolMetricChartSortInputType
  >
  metricPagination?: Maybe<ProtocolMetricChartPaginationInputType>
}>

export type ProtocolMetricQuery = { __typename?: 'Query' } & {
  protocol?: Maybe<
    { __typename?: 'ProtocolType' } & {
      metricChart: Array<
        { __typename?: 'MetricChartType' } & ProtocolMetricChartFragment
      >
    }
  >
}

export type ProtocolQueryVariables = Exact<{
  filter: ProtocolFilterInputType
}>

export type ProtocolQuery = { __typename?: 'Query' } & {
  protocol?: Maybe<{ __typename?: 'ProtocolType' } & ProtocolFragmentFragment>
}

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
}

export type ProtocolMetricChartFragment = {
  __typename?: 'MetricChartType'
} & Pick<MetricChartType, 'date' | 'min' | 'max' | 'avg' | 'sum' | 'count'>

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
>

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
    { __typename?: 'ProtocolType' } & {
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
>

export type StakingDisconnectWalletMutationVariables = Exact<{
  contract: Scalars['UuidType']
  wallet: Scalars['UuidType']
}>

export type StakingDisconnectWalletMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'contractWalletUnlink'>

export type MeQueryVariables = Exact<{
  filter?: Maybe<WalletListFilterInputType>
  sort?: Maybe<Array<WalletListSortInputType> | WalletListSortInputType>
  pagination?: Maybe<WalletListPaginationInputType>
}>

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & Pick<
      UserType,
      'id' | 'role' | 'createdAt'
    > & {
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
          pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
        }
      }
  >
}

export type AuthEthMutationVariables = Exact<{
  input: AuthEthereumInputType
  filter?: Maybe<WalletListFilterInputType>
  sort?: Maybe<Array<WalletListSortInputType> | WalletListSortInputType>
  pagination?: Maybe<WalletListPaginationInputType>
}>

export type AuthEthMutation = { __typename?: 'Mutation' } & {
  authEth?: Maybe<
    { __typename?: 'AuthType' } & Pick<AuthType, 'sid'> & {
        user: { __typename?: 'UserType' } & Pick<
          UserType,
          'id' | 'role' | 'createdAt'
        > & {
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
              pagination: { __typename?: 'Pagination' } & Pick<
                Pagination,
                'count'
              >
            }
          }
      }
  >
}
