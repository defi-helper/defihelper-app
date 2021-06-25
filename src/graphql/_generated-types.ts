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
  /** Identificator */
  UuidType: any
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

export type ContractType = {
  __typename?: 'ContractType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Blockchain type */
  blockchain: BlockchainEnum
  /** Blockchain network id */
  network: Scalars['String']
  /** Address */
  address: Scalars['String']
  /** Name */
  name: Scalars['String']
  /** Description */
  description: Scalars['String']
  /** View URL */
  link?: Maybe<Scalars['String']>
  /** Is hidden */
  hidden: Scalars['Boolean']
  /** Date of created account */
  createdAt: Scalars['DateTimeType']
}

export type ContractUpdateInputType = {
  /** Blockchain protocol */
  blockchain?: Maybe<BlockchainEnum>
  /** Blockchain network */
  network?: Maybe<Scalars['String']>
  /** Address */
  address?: Maybe<Scalars['String']>
  /** Name */
  name?: Maybe<Scalars['String']>
  /** Description */
  description?: Maybe<Scalars['String']>
  /** Website URL */
  link?: Maybe<Scalars['String']>
  /** Is hidden */
  hidden?: Maybe<Scalars['Boolean']>
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

export type Pagination = {
  __typename?: 'Pagination'
  /** Count of list elements */
  count: Scalars['Int']
}

export type ProtocolCreateInputType = {
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
  /** Date of created account */
  createdAt: Scalars['DateTimeType']
}

export type ProtocolTypeContractsArgs = {
  filter?: Maybe<ContractListFilterInputType>
  sort?: Maybe<Array<ContractListSortInputType>>
  pagination?: Maybe<ContractListPaginationInputType>
}

export type ProtocolUpdateInputType = {
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
}

export type QueryProtocolArgs = {
  filter: ProtocolFilterInputType
}

export type QueryProtocolsArgs = {
  filter?: Maybe<ProtocolListFilterInputType>
  sort?: Maybe<Array<ProtocolListSortInputType>>
  pagination?: Maybe<ProtocolListPaginationInputType>
}

export enum SortOrderEnum {
  /** Ascending */
  Asc = 'asc',
  /** Descending */
  Desc = 'desc'
}

export enum UserRoleEnum {
  /** User */
  User = 'user',
  /** Administrator */
  Admin = 'admin'
}

export type UserType = {
  __typename?: 'UserType'
  /** Identificator */
  id: Scalars['UuidType']
  /** Access role */
  role: UserRoleEnum
  wallets: WalletListType
  /** Date of created account */
  createdAt: Scalars['DateTimeType']
}

export type UserTypeWalletsArgs = {
  filter?: Maybe<WalletListFilterInputType>
  sort?: Maybe<Array<WalletListSortInputType>>
  pagination?: Maybe<WalletListPaginationInputType>
}

export type WalletListFilterInputType = {
  blockchain?: Maybe<BlockchainEnum>
  network?: Maybe<Scalars['String']>
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
  /** Date of created account */
  createdAt: Scalars['DateTimeType']
}

export type ProtocolContractFragmentFragment = {
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
>

export type ProtocolCreateMutationVariables = Exact<{
  input: ProtocolCreateInputType
  contractFilter?: Maybe<ContractListFilterInputType>
  contractSort?: Maybe<
    Array<ContractListSortInputType> | ContractListSortInputType
  >
  contractPagination?: Maybe<ContractListPaginationInputType>
}>

export type ProtocolCreateMutation = { __typename?: 'Mutation' } & {
  protocolCreate: { __typename?: 'ProtocolType' } & ProtocolFragmentFragment
}

export type ProtocolQueryVariables = Exact<{
  filter: ProtocolFilterInputType
  contractFilter?: Maybe<ContractListFilterInputType>
  contractSort?: Maybe<
    Array<ContractListSortInputType> | ContractListSortInputType
  >
  contractPagination?: Maybe<ContractListPaginationInputType>
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
  contractFilter?: Maybe<ContractListFilterInputType>
  contractSort?: Maybe<
    Array<ContractListSortInputType> | ContractListSortInputType
  >
  contractPagination?: Maybe<ContractListPaginationInputType>
}>

export type ProtocolsQuery = { __typename?: 'Query' } & {
  protocols: { __typename?: 'ProtocolListQuery' } & {
    list?: Maybe<
      Array<{ __typename?: 'ProtocolType' } & ProtocolFragmentFragment>
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'count'>
  }
}

export type ProtocolUpdateMutationVariables = Exact<{
  id: Scalars['UuidType']
  input: ProtocolUpdateInputType
  contractFilter?: Maybe<ContractListFilterInputType>
  contractSort?: Maybe<
    Array<ContractListSortInputType> | ContractListSortInputType
  >
  contractPagination?: Maybe<ContractListPaginationInputType>
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
> & {
    contracts: { __typename?: 'ContractListType' } & {
      list?: Maybe<
        Array<
          { __typename?: 'ContractType' } & ProtocolContractFragmentFragment
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
