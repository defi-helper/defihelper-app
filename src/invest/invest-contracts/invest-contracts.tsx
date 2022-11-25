import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useThrottle } from 'react-use'

import { ContractListSortInputTypeColumnEnum, SortOrderEnum } from '~/api'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { useDialog } from '~/common/dialog'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { Loader } from '~/common/loader'
import { Paper } from '~/common/paper'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { StakingApyDialog } from '~/staking/staking-apy-dialog'
import { Link } from '~/common/link'
import { InvestContractCard } from '~/invest/common/invest-contract-card'
import * as model from './invest-contracts.model'
import * as styles from './invest-contracts.css'
import { paths } from '~/paths'

export type InvestContractsProps = {
  className?: string
}

const sortIcon = (
  sort: {
    column: ContractListSortInputTypeColumnEnum
    order: SortOrderEnum
  },
  column: ContractListSortInputTypeColumnEnum
) => {
  let icon: 'arrowDown' | 'arrowUp' = 'arrowUp'

  if (sort.column === column && column && sort.order === SortOrderEnum.Desc) {
    icon = 'arrowDown'
  }

  return <Icon icon={icon} width="18" />
}

const text = (
  <>
    Based on last 7 days&apos; pool performance. Does not account for
    impermanent loss
  </>
)

const dropdown = (
  <Dropdown
    control={
      <ButtonBase className={styles.apyboostQuestion}>
        <Icon icon="question" width={16} height={16} />
      </ButtonBase>
    }
    className={styles.dropdown}
    offset={[0, 8]}
  >
    {text}
  </Dropdown>
)

const apyBoostDropdown = (
  <Dropdown
    control={
      <ButtonBase className={styles.apyboostQuestion}>
        <Icon icon="question" width={16} height={16} />
      </ButtonBase>
    }
    className={styles.dropdown}
    offset={[0, 8]}
  >
    <Typography
      variant="body2"
      weight="semibold"
      className={styles.autostakingTooltipTitle}
    >
      Auto-staking
    </Typography>
    <Typography variant="body2" className={styles.autostakingTooltipText}>
      Auto-staking is a built-in automation. It helps you earn more by
      automatically adding your profits to the deposit, effectively auto-
      compounding your interest.
    </Typography>
    <Link
      href="https://defihelper.medium.com/auto-staking-explained-da5fbab082e0"
      target="_blank"
      color="blue"
    >
      How auto-staking works?
    </Link>
  </Dropdown>
)

export const InvestContracts: React.VFC<InvestContractsProps> = (props) => {
  const [openApyDialog] = useDialog(StakingApyDialog)

  const history = useHistory()

  const contractsLoading = useStore(model.fetchContractsFx.pending)
  const contracts = useStore(model.$contractsWithAutostakingLoading)

  const protocolSelectLoading = useStore(model.fetchProtocolsSelectFx.pending)
  const blockchainSelectLoading = useStore(
    model.fetchBlockchainsSelectFx.pending
  )
  const protocolsSelect = useStore(model.$protocolsSelect)
  const blockchainsSelect = useStore(model.$blockchainsSelect)
  const tags = useStore(model.$tags)

  const [protocolIds, setProtocolIds] = useState<string[]>([])
  const protocolIdsRef = useRef<string[]>([])
  const [protocolSelectSearch, setProtocolSelectSearch] = useState('')
  const [search, setSearch] = useState('')
  const [currentTag, setTag] = useState<string | null>(null)

  const protocolSelectSearchThrottled = useThrottle(protocolSelectSearch, 500)
  const searchThrottled = useThrottle(search, 500)

  const contractsOffset = useStore(model.useInfiniteScrollContracts.offset)

  const [blockchain, setBlockChain] = useState<string | null>(null)
  const [sortBy, setSort] = useState({
    column: ContractListSortInputTypeColumnEnum.Tvl,
    order: SortOrderEnum.Desc,
  })

  useEffect(() => {
    const abortController = new AbortController()

    const filter = {
      search: searchThrottled || undefined,
      protocol: !isEmpty(protocolIds) ? protocolIds : undefined,
      blockchain: blockchain
        ? {
            network: blockchain,
            protocol: networksConfig[blockchain].blockchain,
          }
        : undefined,
      tag: currentTag ? currentTag.split(',') : null,
      automate: {
        lpTokensManager: true,
        autorestake: true,
      },
    }

    model.fetchContractsFx({
      signal: abortController.signal,
      filter,
      pagination: {
        offset: contractsOffset,
      },
      sort: {
        column: sortBy.column,
        order: sortBy.order,
      },
    })

    return () => {
      abortController.abort()
    }
  }, [
    protocolIds,
    sortBy,
    searchThrottled,
    contractsOffset,
    blockchain,
    currentTag,
  ])

  useEffect(() => {
    model.resetContracts()
    model.useInfiniteScrollContracts.reset()
  }, [searchThrottled, blockchain, protocolIds, sortBy, currentTag])

  useEffect(() => {
    const abortController = new AbortController()

    model.fetchProtocolsSelectFx({
      signal: abortController.signal,
      search: protocolSelectSearchThrottled || undefined,
    })

    return () => {
      abortController.abort()
    }
  }, [protocolSelectSearchThrottled])
  useEffect(() => {
    const abortController = new AbortController()

    model.fetchBlockchainsSelectFx(abortController.signal)

    return () => {
      abortController.abort()
    }
  }, [protocolSelectSearchThrottled])

  useEffect(() => {
    return () => model.resetSelects()
  }, [])

  const handleProtocolSelectSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProtocolSelectSearch(event.target.value)
  }

  const handleFilterByProtocolId = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.split(',').filter(Boolean)

    protocolIdsRef.current = value

    if (isEmpty(value)) {
      setProtocolIds(value)
    }
  }

  const handleApplyFilterByProtocolId = () => {
    setProtocolIds(protocolIdsRef.current)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleChooseBlockchain = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBlockChain(event.target.value)
  }

  const handleChooseTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value)
  }

  const handleOpenApy = (contract: typeof contracts[number]) => async () => {
    try {
      await openApyDialog({
        contractId: contract.id,
        contractName: contract.name,
        tokens: contract.tokens,
        staked: contract.metric.myStaked,
      })

      history.push(paths.invest.detail(contract.id))
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const [contractsSentryRef] = model.useInfiniteScrollContracts()
  const contractsHasNextPage =
    useStore(model.useInfiniteScrollContracts.hasNextPage) || contractsLoading

  useEffect(() => {
    return () => {
      model.resetContracts()
      model.useInfiniteScrollContracts.reset()
    }
  }, [])

  const handleSort = (sort: typeof sortBy) => () => {
    setSort(sort)
  }

  useEffect(() => {
    model.fetchTagsFx()
  }, [])

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Staking Contracts
        </Typography>
        <div className={styles.selects}>
          <Select
            placeholder="Choose blockchain"
            className={styles.select}
            clearable
            onChange={handleChooseBlockchain}
          >
            {blockchainSelectLoading && isEmpty(blockchainsSelect) && (
              <SelectOption disabled>Loading...</SelectOption>
            )}
            {!blockchainSelectLoading && isEmpty(blockchainsSelect) && (
              <SelectOption disabled>No blockchain found</SelectOption>
            )}
            {blockchainsSelect.map(({ id, title }) => (
              <SelectOption value={id} key={title}>
                {title}
              </SelectOption>
            ))}
          </Select>
          <Select
            placeholder="Choose protocol"
            clearable
            multiple
            className={styles.select}
            onChange={handleFilterByProtocolId}
            header={
              <Input
                placeholder="Search"
                onChange={handleProtocolSelectSearch}
                value={protocolSelectSearch}
              />
            }
            footer={
              <Button
                color="green"
                size="medium"
                className={styles.apply}
                onClick={handleApplyFilterByProtocolId}
              >
                Apply
              </Button>
            }
          >
            {protocolSelectLoading && isEmpty(protocolsSelect) && (
              <SelectOption disabled>Loading...</SelectOption>
            )}
            {!protocolSelectLoading && isEmpty(protocolsSelect) && (
              <SelectOption disabled>No protocols found</SelectOption>
            )}
            {protocolsSelect.map((protocol) => (
              <SelectOption
                value={protocol.id}
                renderValue={protocol.name}
                key={protocol.id}
              >
                {protocol.icon ? (
                  <img
                    src={protocol.icon}
                    alt=""
                    className={styles.protocolIcon}
                  />
                ) : (
                  <Paper className={styles.protocolIcon} />
                )}
                {protocol.name}
              </SelectOption>
            ))}
          </Select>
          <Select
            placeholder="Choose options"
            className={styles.select}
            onChange={handleChooseTag}
            clearable
            grouped
          >
            {tags.map((tag) =>
              typeof tag === 'string' ? (
                <Typography key={tag} variant="body3" transform="uppercase">
                  {tag}
                </Typography>
              ) : (
                <SelectOption value={tag.id} key={tag.id}>
                  {tag.name}
                </SelectOption>
              )
            )}
          </Select>
          <Input
            placeholder="Search"
            className={styles.search}
            onChange={handleSearch}
            value={search}
          />
        </div>
      </div>
      <div className={styles.tableWrap}>
        <Paper radius={8} className={styles.table}>
          <div className={styles.tableHeader}>
            <Typography variant="body2" as="div" className={styles.tableName}>
              Pool
            </Typography>
            <Typography variant="body2">Protocol</Typography>
            <Typography variant="body2" align="right" as="div">
              <ButtonBase
                onClick={handleSort({
                  column: ContractListSortInputTypeColumnEnum.Tvl,
                  order:
                    sortBy.column === ContractListSortInputTypeColumnEnum.Tvl &&
                    sortBy.order === SortOrderEnum.Desc
                      ? SortOrderEnum.Asc
                      : SortOrderEnum.Desc,
                })}
              >
                TVL{' '}
                {sortBy.column === ContractListSortInputTypeColumnEnum.Tvl &&
                  sortIcon(sortBy, ContractListSortInputTypeColumnEnum.Tvl)}
              </ButtonBase>
            </Typography>
            <Typography variant="body2" align="right" as="div">
              <ButtonBase
                onClick={handleSort({
                  column: ContractListSortInputTypeColumnEnum.AprYear,
                  order:
                    sortBy.column ===
                      ContractListSortInputTypeColumnEnum.AprYear &&
                    sortBy.order === SortOrderEnum.Desc
                      ? SortOrderEnum.Asc
                      : SortOrderEnum.Desc,
                })}
              >
                APY{' '}
                {sortBy.column ===
                  ContractListSortInputTypeColumnEnum.AprYear &&
                  sortIcon(sortBy, ContractListSortInputTypeColumnEnum.AprYear)}
              </ButtonBase>
            </Typography>
            <Typography variant="body2" align="right" as="div">
              <ButtonBase
                onClick={handleSort({
                  column: ContractListSortInputTypeColumnEnum.AprWeekReal,
                  order:
                    sortBy.column ===
                      ContractListSortInputTypeColumnEnum.AprWeekReal &&
                    sortBy.order === SortOrderEnum.Desc
                      ? SortOrderEnum.Asc
                      : SortOrderEnum.Desc,
                })}
                className="real_apy"
              >
                7D Performance{' '}
                {sortBy.column ===
                  ContractListSortInputTypeColumnEnum.AprWeekReal &&
                  sortIcon(
                    sortBy,
                    ContractListSortInputTypeColumnEnum.AprWeekReal
                  )}
              </ButtonBase>{' '}
              {dropdown}
            </Typography>
            <Typography variant="body2" as="div" align="right">
              {apyBoostDropdown}{' '}
              <ButtonBase
                onClick={handleSort({
                  column: ContractListSortInputTypeColumnEnum.AprBoosted,
                  order:
                    sortBy.column ===
                      ContractListSortInputTypeColumnEnum.AprBoosted &&
                    sortBy.order === SortOrderEnum.Desc
                      ? SortOrderEnum.Asc
                      : SortOrderEnum.Desc,
                })}
                className={styles.apyBoost}
              >
                APY Boost{' '}
                {sortBy.column ===
                  ContractListSortInputTypeColumnEnum.AprBoosted &&
                  sortIcon(
                    sortBy,
                    ContractListSortInputTypeColumnEnum.AprBoosted
                  )}
              </ButtonBase>
            </Typography>
            <Typography variant="body2" as="div">
              <ButtonBase
                onClick={handleSort({
                  column: ContractListSortInputTypeColumnEnum.RiskFactor,
                  order:
                    sortBy.column ===
                      ContractListSortInputTypeColumnEnum.RiskFactor &&
                    sortBy.order === SortOrderEnum.Desc
                      ? SortOrderEnum.Asc
                      : SortOrderEnum.Desc,
                })}
              >
                Risk{' '}
                {sortBy.column ===
                  ContractListSortInputTypeColumnEnum.RiskFactor &&
                  sortIcon(
                    sortBy,
                    ContractListSortInputTypeColumnEnum.RiskFactor
                  )}
              </ButtonBase>
            </Typography>
          </div>
          {isEmpty(contracts) && !contractsLoading && (
            <div className={styles.padding}>No data</div>
          )}
          {contracts.map((contract, ind) => {
            return (
              <InvestContractCard
                contract={contract}
                onOpenApy={handleOpenApy(contract)}
                key={String(contract.id + ind)}
              />
            )
          })}
          {contractsHasNextPage && (
            <div className={styles.loader} ref={contractsSentryRef}>
              <Loader height="36" />
            </div>
          )}
        </Paper>
      </div>
    </div>
  )
}
