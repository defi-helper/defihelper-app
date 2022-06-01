import clsx from 'clsx'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import React, { useEffect, useRef, useState } from 'react'
import { useThrottle, useLocalStorage } from 'react-use'

import { BlockchainEnum } from '~/api'
import { bignumberUtils } from '~/common/bignumber-utils'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { useDialog } from '~/common/dialog'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { Link } from '~/common/link'
import { Loader } from '~/common/loader'
import { Paper } from '~/common/paper'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { StakingApyDialog } from '~/staking/common'
import { AutostakingVideoDialog } from '~/autostaking/common/autostaking-video-dialog'
import { AutostakingBalanceDialog } from '~/autostaking/common/autostaking-balance-dialog'
import { AutostakingDeployDialog } from '~/autostaking/common/autostaking-deploy-dialog'
import * as styles from './autostaking-contracts.css'
import * as model from './autostaking-contracts.model'
import { AutostakingTabsDialog } from '../common/autostaking-tabs-dialog'

export type AutostakingContractsProps = {
  className?: string
}

export const AutostakingContracts: React.VFC<AutostakingContractsProps> = (
  props
) => {
  const [openApyDialog] = useDialog(StakingApyDialog)
  const [openAutostakingVideoDialog] = useDialog(AutostakingVideoDialog)
  const [openAutostakingBalanceDialog] = useDialog(AutostakingBalanceDialog)
  const [openAutostakingDeployDialog] = useDialog(AutostakingDeployDialog)
  const [openAutostakingTabsDialog] = useDialog(AutostakingTabsDialog)

  const [enableAutostakingVideo, setEnableAutostakingVideo] = useLocalStorage(
    'enableAutostakingVideo',
    false
  )

  const contractsLoading = useStore(model.fetchContractsFx.pending)
  const contracts = useStore(model.$contracts)

  const protocolSelectLoading = useStore(model.fetchProtocolsSelectFx.pending)
  const protocolsSelect = useStore(model.$protocolsSelect)

  const [protocolIds, setProtocolIds] = useState<string[]>([])
  const protocolIdsRef = useRef<string[]>([])
  const [protocolSelectSearch, setProtocolSelectSearch] = useState('')
  const [search, setSearch] = useState('')

  const protocolSelectSearchThrottled = useThrottle(protocolSelectSearch, 500)
  const searchThrottled = useThrottle(search, 500)

  const contractsOffset = useStore(model.useInfiniteScrollContracts.offset)

  useEffect(() => {
    const abortController = new AbortController()

    const filter = {
      search: searchThrottled || undefined,
      protocol: !isEmpty(protocolIds) ? protocolIds : undefined,
    }

    model.fetchContractsFx({
      signal: abortController.signal,
      filter,
      pagination: {
        offset: contractsOffset,
      },
    })

    return () => {
      abortController.abort()
    }
  }, [protocolIds, searchThrottled, contractsOffset])

  useEffect(() => {
    model.resetContracts()
    model.useInfiniteScrollContracts.reset()
  }, [searchThrottled])

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

  const handleAutoStake = (contract: typeof contracts[number]) => async () => {
    try {
      if (!enableAutostakingVideo) {
        await openAutostakingVideoDialog({
          dontShowAgain: enableAutostakingVideo,
          onDontShowAgain: setEnableAutostakingVideo,
        }).catch(console.error)
      }

      await openAutostakingBalanceDialog()

      await openAutostakingDeployDialog()

      await openAutostakingTabsDialog()

      console.log(contract)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
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
          >
            {Object.entries(BlockchainEnum).map(([title, value]) => (
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
              TVL
            </Typography>
            <Typography variant="body2" align="right" as="div">
              APY
            </Typography>
            <Typography variant="body2" align="right" as="div">
              Real APR (7d)
            </Typography>
            <Typography variant="body2" as="div">
              APY Boost
            </Typography>
          </div>
          {isEmpty(contracts) && !contractsLoading && (
            <div className={styles.padding}>No data</div>
          )}
          {contracts.map((contract, ind) => (
            <div className={styles.row} key={String(contract.id + ind)}>
              <Typography
                as="div"
                variant="body2"
                className={styles.contractCardName}
              >
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
                  {isEmpty(contract.tokens.stake) ? (
                    <Paper className={styles.contractCardIcon} />
                  ) : (
                    contract.tokens.stake.map((token, index) => {
                      const icon = token.alias?.logoUrl ? (
                        <img
                          src={token.alias?.logoUrl}
                          alt=""
                          className={styles.contractCardIcon}
                        />
                      ) : (
                        <Paper className={styles.contractCardIcon}>
                          <Icon icon="unknownNetwork" width="16" height="16" />
                        </Paper>
                      )

                      return (
                        <Dropdown
                          key={String(index)}
                          control={
                            <ButtonBase
                              className={styles.contractCardButtonIcon}
                            >
                              {icon}
                            </ButtonBase>
                          }
                          className={styles.contractTokenInfo}
                        >
                          {(close) => (
                            <>
                              <ButtonBase
                                onClick={close}
                                className={styles.contractTokenInfoClose}
                              >
                                <Icon icon="close" width={34} height={34} />
                              </ButtonBase>
                              {icon}
                              <div>
                                <Typography variant="body2" family="mono">
                                  {token.name}
                                </Typography>
                                <Typography variant="body2" family="mono">
                                  <Link
                                    target="_blank"
                                    color="blue"
                                    className={styles.contractCardLink}
                                    href={buildExplorerUrl({
                                      address: token.address,
                                      network: token.network,
                                    })}
                                  >
                                    Explorer{' '}
                                    <Icon
                                      icon="link"
                                      width="1em"
                                      height="1em"
                                    />
                                  </Link>
                                </Typography>
                              </div>
                            </>
                          )}
                        </Dropdown>
                      )
                    })
                  )}
                </span>
                <Typography variant="inherit">{contract.name}</Typography>
              </Typography>
              <Typography
                variant="body2"
                as="div"
                className={styles.contractProtocol}
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
              </Typography>
              <Typography variant="body2" align="right" as="div">
                {bignumberUtils.formatMax(
                  bignumberUtils.mul(contract.metric.aprWeekReal, 100),
                  10000,
                  true
                )}
                %
                <ButtonBase
                  onClick={handleOpenApy(contract.metric)}
                  className={styles.apyButton}
                >
                  <Icon icon="calculator" width="20" height="20" />
                </ButtonBase>
              </Typography>
              <div className={styles.apyBoost}>
                <Typography variant="body2" align="right" as="span">
                  {bignumberUtils.formatMax(
                    bignumberUtils.mul(contract.metric.myAPYBoost, 100),
                    10000,
                    true
                  )}
                  %
                </Typography>
                <Button
                  color="green"
                  size="small"
                  className={styles.autostakeButton}
                  onClick={handleAutoStake(contract)}
                >
                  auto-stake
                </Button>
              </div>
            </div>
          ))}
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
