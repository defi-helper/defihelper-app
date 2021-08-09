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

export type BillingBalanceType = {
  __typename?: 'BillingBalanceType'
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
  Year = 'year',
}

export type Mutation = {
  __typename?: 'Mutation'
  authEth?: Maybe<AuthType>
  authWaves?: Maybe<AuthType>
  addWallet?: Maybe<AuthType>
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
  userContactEmailConfirm: Scalars['Boolean']
  userContactDelete: Scalars['Boolean']
  userEventSubscriptionCreate: UserEventSubscriptionType
  userEventSubscriptionDelete: Scalars['Boolean']
  productCreate: StoreProductType
  productUpdate: StoreProductType
  productDelete: Scalars['Boolean']
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
  CreatedAt = 'createdAt',
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
  Value = 'value',
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
  userEventSubscription?: Maybe<UserEventSubscriptionType>
  userEventSubscriptions: UserEventSubscriptionListQuery
  tokens: TokenListQuery
  tokenAlias?: Maybe<TokenAlias>
  tokensAlias: TokenAliasListQuery
  products: StoreProductListQuery
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

export type TokenAlias = {
  __typename?: 'TokenAlias'
  /** Identificator */
  id: Scalars['UuidType']
  /** Name */
  name: Scalars['String']
  /** Symbol */
  symbol: Scalars['String']
  /** Is stable price */
  stable: Scalars['Boolean']
  tokens: TokenListType
}

export type TokenAliasTokensArgs = {
  filter?: Maybe<TokenListFilterInputType>
  sort?: Maybe<Array<TokenListSortInputType>>
  pagination?: Maybe<TokenListPaginationInputType>
}

export type TokenAliasFilterInputType = {
  id: Scalars['String']
}

export type TokenAliasListFilterInputType = {
  blockchain?: Maybe<BlockchainFilterInputType>
  stable?: Maybe<Scalars['Boolean']>
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
  broker?: Maybe<UserContactBrokerEnum>
  /** Status */
  status?: Maybe<UserContactStatusEnum>
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
  /** Status */
  status: UserContactStatusEnum
  /** Confirmation Code */
  confirmationCode: Scalars['String']
  /** Date of create */
  createdAt: Scalars['DateTimeType']
  /** Date of activated */
  activatedAt?: Maybe<Scalars['DateTimeType']>
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

export type UserMetricsTokenAliasFilterInputType = {
  id?: Maybe<Array<Scalars['UuidType']>>
  /** Is stable token */
  stable?: Maybe<Scalars['Boolean']>
}

export enum UserRoleEnum {
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
  wallets: WalletListType
  blockchains: Array<UserBlockchainType>
  metricChart: Array<MetricChartType>
  tokenMetricChart: Array<MetricChartType>
  billing: UserBillingType
  store: UserStoreType
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
  /** Address */
  address: Scalars['String']
  /** Public key */
  publicKey: Scalars['String']
  contracts: WalletContractListType
  metricChart: Array<MetricChartType>
  tokenMetricChart: Array<MetricChartType>
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

export type BillingBillsQueryVariables = Exact<{
  filter?: Maybe<UserBillingBillListFilterInputType>
  sort?: Maybe<
    Array<UserBillingBillListSortInputType> | UserBillingBillListSortInputType
  >
  pagination?: Maybe<UserBillingBillListPaginationInputType>
}>

export type BillingBillsQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      billing: { __typename?: 'UserBillingType' } & {
        bills: { __typename?: 'UserBillingBillListType' } & {
          list?: Maybe<
            Array<
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
          >
          pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
        }
      }
    }
  >
}

export type BillingQueryVariables = Exact<{ [key: string]: never }>

export type BillingQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'UserType' } & {
      billing: { __typename?: 'UserBillingType' } & {
        balance: { __typename?: 'BillingBalanceType' } & Pick<
          BillingBalanceType,
          'balance' | 'claim' | 'netBalance'
        >
      }
    }
  >
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
>

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

export type UserContactFragmentFragment = {
  __typename?: 'UserContactType'
} & Pick<
  UserContactType,
  | 'id'
  | 'broker'
  | 'address'
  | 'status'
  | 'confirmationCode'
  | 'createdAt'
  | 'activatedAt'
>

export type UserEventSubscriptionCreateMutationVariables = Exact<{
  input: UserEventSubscriptionCreateInputType
}>

export type UserEventSubscriptionCreateMutation = {
  __typename?: 'Mutation'
} & {
  userEventSubscriptionCreate: {
    __typename?: 'UserEventSubscriptionType'
  } & UserEventSubscriptionFragmentFragment
}

export type UserEventSubscriptionDeleteMutationVariables = Exact<{
  id: Scalars['UuidType']
}>

export type UserEventSubscriptionDeleteMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'userEventSubscriptionDelete'>

export type UserEventSubscriptionFragmentFragment = {
  __typename?: 'UserEventSubscriptionType'
} & Pick<UserEventSubscriptionType, 'id' | 'event'> & {
    contact: { __typename?: 'UserContactType' } & Pick<
      UserContactType,
      'address' | 'broker'
    >
    contract: { __typename?: 'ContractType' } & Pick<
      ContractType,
      'id' | 'name' | 'blockchain' | 'network'
    >
  }

export type UserEventSubscriptionsQueryVariables = Exact<{
  userEventSubscriptionFilter?: Maybe<UserEventSubscriptionListQueryFilterInputType>
  userEventSubscriptionSort?: Maybe<
    | Array<UserEventSubscriptionListSortInputType>
    | UserEventSubscriptionListSortInputType
  >
  userEventSubscriptionPagination?: Maybe<UserEventSubscriptionListPaginationInputType>
}>

export type UserEventSubscriptionsQuery = { __typename?: 'Query' } & {
  userEventSubscriptions: { __typename?: 'UserEventSubscriptionListQuery' } & {
    list?: Maybe<
      Array<
        {
          __typename?: 'UserEventSubscriptionType'
        } & UserEventSubscriptionFragmentFragment
      >
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
}

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
        user: { __typename?: 'UserType' } & UserFragmentFragment
      }
  >
}

export type AuthWavesMutationVariables = Exact<{
  input: AuthWavesInputType
  filter?: Maybe<WalletListFilterInputType>
  sort?: Maybe<Array<WalletListSortInputType> | WalletListSortInputType>
  pagination?: Maybe<WalletListPaginationInputType>
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
