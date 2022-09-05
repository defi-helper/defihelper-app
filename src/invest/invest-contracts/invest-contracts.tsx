import clsx from 'clsx'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import { useEffect, useRef, useState } from 'react'
import { useThrottle } from 'react-use'
import { Link as ReactRouterLink } from 'react-router-dom'

import {
  ContractListSortInputTypeColumnEnum,
  ContractRiskFactorEnum,
  SortOrderEnum,
} from '~/api'
import { bignumberUtils } from '~/common/bignumber-utils'
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
import { StakingApyDialog } from '~/staking/common'
import { paths } from '~/paths'
import { StakeRewardTokens } from '~/common/stake-reward-tokens'
import * as model from './invest-contracts.model'
import * as styles from './invest-contracts.css'

export type InvestContractsProps = {
  className?: string
  onChangeTab: () => void
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

const riskStatuses = {
  [ContractRiskFactorEnum.High]: 'High',
  [ContractRiskFactorEnum.Low]: 'Low',
  [ContractRiskFactorEnum.Moderate]: 'Moderate',
  [ContractRiskFactorEnum.NotCalculated]: '-',
}

const riskIcons: Record<string, 'redRisk' | 'greenRisk' | 'yellowRisk'> = {
  [ContractRiskFactorEnum.High]: 'redRisk',
  [ContractRiskFactorEnum.Low]: 'greenRisk',
  [ContractRiskFactorEnum.Moderate]: 'yellowRisk',
}

export const InvestContracts: React.VFC<InvestContractsProps> = (props) => {
  const [openApyDialog] = useDialog(StakingApyDialog)

  const contractsLoading = useStore(model.fetchContractsFx.pending)
  const contracts = useStore(model.$contractsWithAutostakingLoading)

  const protocolSelectLoading = useStore(model.fetchProtocolsSelectFx.pending)
  const protocolsSelect = useStore(model.$protocolsSelect)

  const [protocolIds, setProtocolIds] = useState<string[]>([])
  const protocolIdsRef = useRef<string[]>([])
  const [protocolSelectSearch, setProtocolSelectSearch] = useState('')
  const [search, setSearch] = useState('')

  const protocolSelectSearchThrottled = useThrottle(protocolSelectSearch, 500)
  const searchThrottled = useThrottle(search, 500)

  const contractsOffset = useStore(model.useInfiniteScrollContracts.offset)
  const [blockchain, setBlockChain] = useState<string | null>(null)
  const [riskLevel, setRiskLevel] = useState(
    ContractRiskFactorEnum.NotCalculated
  )
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
      risk: isEmpty(riskLevel) ? null : riskLevel,
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
    riskLevel,
    contractsOffset,
    blockchain,
  ])

  useEffect(() => {
    model.resetContracts()
    model.useInfiniteScrollContracts.reset()
  }, [searchThrottled, blockchain, protocolIds, riskLevel, sortBy])

  useEffect(() => {
    const abortController = new AbortController()

    model.fetchProtocolsSelectFx({
      signal: abortController.signal,
      search: protocolSelectSearchThrottled || undefined,
    })

    return () => {
      model.resetProtocolsSelect()
      abortController.abort()
    }
  }, [protocolSelectSearchThrottled])

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

  const handleChooseRiskLevel = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRiskLevel(event.target.value as ContractRiskFactorEnum)
  }

  const handleOpenApy =
    (metric: typeof contracts[number]['metric']) => async () => {
      const apr = {
        '1d': metric.aprDay,
        '7d': metric.aprWeek,
        '30d': metric.aprMonth,
        '365d(APY)': metric.aprYear,
      }

      try {
        await openApyDialog({
          apr,
          staked: metric.myStaked,
        })
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
            {Object.entries(networksConfig).map(([value, { title }]) => (
              <SelectOption value={value} key={title}>
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
            placeholder="Risk level"
            className={styles.select}
            onChange={handleChooseRiskLevel}
          >
            {Object.entries(ContractRiskFactorEnum)
              .filter(
                ([, value]) => ContractRiskFactorEnum.NotCalculated !== value
              )
              .map(([key, value]) => (
                <SelectOption value={value} key={key}>
                  {riskStatuses[value]}
                </SelectOption>
              ))}
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
            <Typography variant="body2" as="div">
              {dropdown}{' '}
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
            const apyboost = bignumberUtils.mul(contract.metric.myAPYBoost, 100)
            const realApy = bignumberUtils.mul(contract.metric.aprWeekReal, 100)

            return (
              <div className={styles.row} key={String(contract.id + ind)}>
                <Typography
                  as="div"
                  variant="body2"
                  className={styles.contractCardName}
                >
                  <Typography variant="inherit">{contract.name}</Typography>
                  <span className={styles.contractCardIcons}>
                    {networksConfig[contract.network]?.icon ? (
                      <Icon
                        icon={networksConfig[contract.network].icon}
                        width="20"
                        height="20"
                        className={styles.contractNetworkIcon}
                      />
                    ) : (
                      <Paper className={styles.contractUnknownNetworkIcon}>
                        <Icon icon="unknownNetwork" width="16" height="16" />
                      </Paper>
                    )}
                    <StakeRewardTokens
                      stakeTokens={contract.tokens.stake}
                      rewardTokens={contract.tokens.reward}
                      tokenClassName={styles.contractIconBg}
                    />
                  </span>
                </Typography>
                <Typography
                  variant="body2"
                  className={styles.contractProtocol}
                  as={ReactRouterLink}
                  to={paths.protocols.detail(contract.protocol.id)}
                >
                  {contract.protocol.icon ? (
                    <img
                      alt=""
                      src={contract.protocol.icon}
                      className={styles.contractProtocolIcon}
                    />
                  ) : (
                    <Paper className={styles.contractProtocolIcon}>
                      <Icon icon="unknownNetwork" width="16" height="16" />
                    </Paper>
                  )}{' '}
                  {contract.protocol.name}
                </Typography>
                <Typography variant="body2" align="right" as="div">
                  ${bignumberUtils.format(contract.metric.tvl)}
                </Typography>
                <Typography variant="body2" align="right" as="div">
                  {bignumberUtils.formatMax(
                    bignumberUtils.mul(contract.metric.aprYear, 100),
                    10000
                  )}
                  %
                  <ButtonBase
                    onClick={handleOpenApy(contract.metric)}
                    className={styles.apyButton}
                  >
                    <Icon icon="calculator" width="20" height="20" />
                  </ButtonBase>
                </Typography>
                <Typography variant="body2" align="right" as="div">
                  <Typography
                    variant="inherit"
                    className={clsx({
                      [styles.positive]: bignumberUtils.gt(realApy, '0'),
                      [styles.negative]: bignumberUtils.lt(realApy, '0'),
                    })}
                  >
                    {bignumberUtils.formatMax(realApy, 10000, false)}%
                  </Typography>
                </Typography>
                <div className={styles.apyBoost}>
                  {dropdown}
                  <Typography
                    variant="body2"
                    align="right"
                    as="span"
                    className={clsx({
                      [styles.positive]: bignumberUtils.gt(apyboost, '0'),
                      [styles.negative]:
                        !bignumberUtils.eq(
                          bignumberUtils.format(apyboost),
                          '0'
                        ) && bignumberUtils.lt(apyboost, '0'),
                    })}
                  >
                    {!bignumberUtils.eq(bignumberUtils.format(apyboost), '0') &&
                      bignumberUtils.lt(apyboost, '0') &&
                      '- '}
                    {bignumberUtils.formatMax(apyboost, 10000, true)}%
                  </Typography>
                </div>
                <Typography variant="inherit">
                  {riskIcons[contract.metric.risk] && (
                    <Icon
                      icon={riskIcons[contract.metric.risk]}
                      width={22}
                      height={24}
                    />
                  )}
                  {false && (
                    <Dropdown
                      className={styles.riskLevel}
                      control={
                        <ButtonBase>
                          {riskIcons[contract.metric.risk] && (
                            <Icon
                              icon={riskIcons[contract.metric.risk]}
                              width={22}
                              height={24}
                            />
                          )}
                        </ButtonBase>
                      }
                      offset={[0, 4]}
                      placement="left-start"
                    >
                      <Typography
                        family="mono"
                        as="div"
                        className={styles.riskLevelRow}
                      >
                        <Typography variant="inherit">Risk</Typography>
                        <Typography
                          as="div"
                          variant="body2"
                          className={styles.riskLevelStatus}
                        >
                          {riskStatuses[contract.metric.risk]}
                        </Typography>
                      </Typography>
                      <span className={styles.riskLevelSpacing} />
                      <Typography
                        family="mono"
                        as="div"
                        variant="body2"
                        className={styles.riskLevelRow}
                      >
                        <Typography variant="inherit">Reliability</Typography>
                        <Icon icon="greenRisk" width={19} height={20} />
                      </Typography>
                      <Typography
                        family="mono"
                        as="div"
                        variant="body2"
                        className={styles.riskLevelRow}
                      >
                        <Typography variant="inherit">Profitability</Typography>
                        <Icon icon="yellowRisk" width={19} height={20} />
                      </Typography>
                      <Typography
                        family="mono"
                        as="div"
                        variant="body2"
                        className={styles.riskLevelRow}
                      >
                        <Typography variant="inherit">Volatility</Typography>
                        <Icon icon="greenRisk" width={19} height={20} />
                      </Typography>
                    </Dropdown>
                  )}
                </Typography>
                <Button
                  color="green"
                  size="small"
                  className={styles.autostakeButton}
                  as={ReactRouterLink}
                  to={paths.invest.detail(contract.id)}
                >
                  invest
                </Button>
              </div>
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
