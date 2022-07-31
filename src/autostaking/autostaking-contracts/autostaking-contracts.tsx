import clsx from 'clsx'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import { useEffect, useRef, useState } from 'react'
import { useThrottle, useLocalStorage } from 'react-use'
import { Link as ReactRouterLink } from 'react-router-dom'

import {
  AutomateActionTypeEnum,
  AutomateConditionTypeEnum,
  AutomateTriggerTypeEnum,
  ContractListSortInputTypeColumnEnum,
  SortOrderEnum,
} from '~/api'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { useDialog, UserRejectionError } from '~/common/dialog'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { Loader } from '~/common/loader'
import { Paper } from '~/common/paper'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { StakingAdapterDialog, StakingApyDialog } from '~/staking/common'
import { AutostakingVideoDialog } from '~/autostaking/common/autostaking-video-dialog'
import { AutostakingBalanceDialog } from '~/autostaking/common/autostaking-balance-dialog'
import { AutostakingDeployDialog } from '~/autostaking/common/autostaking-deploy-dialog'
import { AutostakingTabsDialog } from '../common/autostaking-tabs-dialog'
import { toastsService } from '~/toasts'
import { analytics } from '~/analytics'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { WalletConnect } from '~/wallets/wallet-connect'
import { paths } from '~/paths'
import { StakeRewardTokens } from '~/common/stake-reward-tokens'
import * as automationUpdateModel from '~/automations/automation-update/automation-update.model'
import * as styles from './autostaking-contracts.css'
import * as model from './autostaking-contracts.model'
import * as walletsModel from '~/settings/settings-wallets/settings-wallets.model'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'

export type AutostakingContractsProps = {
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
    If there are no funds on the contract, we calculate an Boosted APY of
    $10,000.
    <br />
    <br />
    You&apos;ll see the real data after you transfer money to this contract.
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

export const AutostakingContracts: React.VFC<AutostakingContractsProps> = (
  props
) => {
  const [openApyDialog] = useDialog(StakingApyDialog)
  const [openAutostakingVideoDialog] = useDialog(AutostakingVideoDialog)
  const [openAutostakingBalanceDialog] = useDialog(AutostakingBalanceDialog)
  const [openAutostakingDeployDialog] = useDialog(AutostakingDeployDialog)
  const [openAutostakingTabsDialog] = useDialog(AutostakingTabsDialog)
  const [openAdapter] = useDialog(StakingAdapterDialog)

  const [enableAutostakingVideo, setEnableAutostakingVideo] = useLocalStorage(
    'enableAutostakingVideo',
    false
  )

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
  const currentWallet = walletNetworkModel.useWalletNetwork()
  const wallets = useStore(walletsModel.$wallets)
  const [blockchain, setBlockChain] = useState<string | null>(null)
  const [sortBy, setSort] = useState({
    column: ContractListSortInputTypeColumnEnum.AprBoosted,
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
  }, [protocolIds, sortBy, searchThrottled, contractsOffset, blockchain])

  useEffect(() => {
    model.resetContracts()
    model.useInfiniteScrollContracts.reset()
  }, [searchThrottled, blockchain, protocolIds, sortBy])

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

  const handleSwitchNetwork = (contract: typeof contracts[number]) => () =>
    switchNetwork(contract.network).catch(console.error)

  const handleAutostake = (contract: typeof contracts[number]) => async () => {
    analytics.log('auto_staking_auto_stake')
    model.autostakingStart(contract.id)

    try {
      const addresses = await model.fetchContractAddressesFx({
        contracts: [contract],
        protocolAdapter: contract.protocol.adapter,
      })
      const { prototypeAddress = undefined } = addresses[contract.id]

      if (!contract.automate.autorestake || !prototypeAddress || !currentWallet)
        return

      if (!enableAutostakingVideo) {
        await openAutostakingVideoDialog({
          dontShowAgain: enableAutostakingVideo,
          onDontShowAgain: setEnableAutostakingVideo,
        }).catch(console.error)
      }

      const findedWallet = wallets.find((wallet) => {
        const sameAddreses =
          String(currentWallet.chainId) === 'main'
            ? currentWallet.account === wallet.address
            : currentWallet.account?.toLowerCase() === wallet.address

        return sameAddreses && String(currentWallet.chainId) === wallet.network
      })

      if (!findedWallet) throw new Error('wallet is not connected')

      const metrics = await walletsModel.fetchWalletListMetricsFx()

      const metric = metrics[findedWallet.id]

      if (!metric || typeof metric?.billing.balance.netBalance === 'undefined')
        throw Error('wallet is not connected')

      const billingBalance = await model.fetchBillingBalanceFx({
        blockchain: contract.blockchain,
        network: contract.network,
      })

      if (
        bignumberUtils.lte(
          metric.billing.balance.netBalance,
          billingBalance.recomendedIncome
        )
      ) {
        await openAutostakingBalanceDialog({
          balance: String(metric.billing.balance.netBalance),
          network: findedWallet.network,
          wallet: findedWallet.address,
          ...billingBalance,
          onSubmit: (result) =>
            walletsModel.depositFx({
              blockchain: findedWallet.blockchain,
              amount: result.amount,
              walletAddress: findedWallet.address,
              chainId: String(currentWallet.chainId),
              provider: currentWallet.provider,
            }),
        })
      }

      const deployAdapter = await deployModel.fetchDeployAdapterFx({
        address: prototypeAddress,
        protocol: contract.protocol.adapter,
        contract: contract.automate.autorestake,
        chainId: String(currentWallet.chainId),
        provider: currentWallet.provider,
        contractAddress: contract.address,
      })

      const stepsResult = await openAutostakingDeployDialog({
        steps: deployAdapter.deploy,
      })

      props.onChangeTab()

      const deployedContract = await deployModel.deployFx({
        proxyAddress: stepsResult.address,
        inputs: stepsResult.inputs,
        protocol: contract.protocol.id,
        adapter: contract.automate.autorestake,
        contract: contract.id,
        account: findedWallet.address,
        chainId: String(currentWallet.chainId),
        provider: currentWallet.provider,
      })

      const createdTrigger = await automationUpdateModel.createTriggerFx({
        wallet: findedWallet.id,
        params: JSON.stringify({}),
        type: AutomateTriggerTypeEnum.EveryHour,
        name: `Autostaking ${contract.name}`,
        active: true,
      })

      const action = await automationUpdateModel.createActionFx({
        trigger: createdTrigger.id,
        type: AutomateActionTypeEnum.EthereumAutomateRun,
        params: JSON.stringify({
          id: deployedContract.id,
        }),
        priority: 0,
      })

      await automationUpdateModel.createConditionFx({
        trigger: createdTrigger.id,
        type: AutomateConditionTypeEnum.EthereumOptimalAutomateRun,
        params: JSON.stringify({
          id: action.id,
        }),
        priority: 0,
      })

      const stakingAutomatesAdapter =
        await stakingAutomatesModel.fetchAdapterFx({
          protocolAdapter: contract.protocol.adapter,
          contractAdapter: contract.automate.autorestake,
          contractId: contract.id,
          contractAddress: deployedContract.address,
          provider: currentWallet.provider,
          chainId: String(currentWallet.chainId),
          action: 'migrate',
        })

      if (!stakingAutomatesAdapter) throw new Error('something went wrong')

      const cb = () => {
        stakingAutomatesModel
          .scanWalletMetricFx({
            wallet: createdTrigger.wallet.id,
            contract: contract.id,
          })
          .catch(console.error)
      }

      if ('methods' in stakingAutomatesAdapter.migrate) {
        await openAutostakingTabsDialog({
          methods: stakingAutomatesAdapter.migrate.methods,
          onLastStep: cb,
        })
      } else {
        await openAdapter({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          steps: stakingAutomatesAdapter.migrate,
        })
          .catch(cb)
          .then(cb)
      }

      analytics.onAutoStakingEnabled()
      toastsService.success('success!')
    } catch (error) {
      if (error instanceof Error && !(error instanceof UserRejectionError)) {
        toastsService.error(error.message)
      }
    } finally {
      model.autostakingEnd(contract.id)
    }
  }

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
                Real APR (7d){' '}
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
                Boosted APY{' '}
                {sortBy.column ===
                  ContractListSortInputTypeColumnEnum.AprBoosted &&
                  sortIcon(
                    sortBy,
                    ContractListSortInputTypeColumnEnum.AprBoosted
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
                      [styles.negative]:
                        !bignumberUtils.eq(
                          bignumberUtils.format(realApy),
                          '0'
                        ) && bignumberUtils.lt(realApy, '0'),
                    })}
                  >
                    {!bignumberUtils.eq(bignumberUtils.format(realApy), '0') &&
                      bignumberUtils.lt(realApy, '0') &&
                      '- '}
                    {bignumberUtils.formatMax(realApy, 10000, true)}%
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
                  <WalletConnect
                    network={contract.network}
                    fallback={
                      <Button
                        color="green"
                        size="small"
                        className={styles.autostakeButton}
                      >
                        invest
                      </Button>
                    }
                  >
                    <Button
                      color="green"
                      size="small"
                      className={styles.autostakeButton}
                      onClick={
                        contract.network !== currentWallet?.chainId
                          ? handleSwitchNetwork(contract)
                          : handleAutostake(contract)
                      }
                      loading={contract.autostakingLoading}
                    >
                      invest
                    </Button>
                  </WalletConnect>
                </div>
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
