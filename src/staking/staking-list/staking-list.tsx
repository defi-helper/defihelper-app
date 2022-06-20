import { useCallback, useEffect, useState } from 'react'
import { useLocalStorage, useInterval, useMedia } from 'react-use'
import { useGate, useStore } from 'effector-react'
import { Link as ReactRouterLink } from 'react-router-dom'
import clsx from 'clsx'
import { StickyContainer, Sticky } from 'react-sticky'
import Joyride, { CallBackProps, STATUS, Step } from '@defihelper/react-joyride'

import * as automationUpdateModel from '~/automations/automation-update/automation-update.model'
import { Can, useAbility } from '~/auth'
import { paths } from '~/paths'
import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import {
  StakingAdapterDialog,
  StakingContractCard,
  StakingTabs,
} from '../common'
import { Paper } from '~/common/paper'
import { useDialog, UserRejectionError } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { StakingAdapters } from '~/staking/staking-adapters'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import { Dropdown } from '~/common/dropdown'
import { Loader } from '~/common/loader'
import {
  AutomateActionTypeEnum,
  AutomateConditionTypeEnum,
  AutomateTriggerTypeEnum,
  ContractListSortInputTypeColumnEnum,
  SortOrderEnum,
} from '~/api/_generated-types'
import { StakingApyDialog } from '~/staking/common'
import { toastsService } from '~/toasts'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { switchNetwork } from '~/wallets/common'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import * as walletsModel from '~/settings/settings-wallets/settings-wallets.model'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'
import { Input } from '~/common/input'
import { useDebounce } from '~/common/hooks'
import { OnboardTooltip } from '~/common/onboard-tooltip'
import { theme } from '~/common/theme'
import { WalletConnect } from '~/wallets/wallet-connect'
import { analytics } from '~/analytics'
import { AutostakingVideoDialog } from '~/autostaking/common/autostaking-video-dialog'
import { AutostakingBalanceDialog } from '~/autostaking/common/autostaking-balance-dialog'
import { AutostakingDeployDialog } from '~/autostaking/common/autostaking-deploy-dialog'
import { AutostakingTabsDialog } from '~/autostaking/common/autostaking-tabs-dialog'
import { bignumberUtils } from '~/common/bignumber-utils'
import * as autostakingContractsModel from '~/autostaking/autostaking-contracts/autostaking-contracts.model'
import * as model from './staking-list.model'
import * as styles from './staking-list.css'

export type StakingListProps = {
  protocolId: string
  protocolAdapter: string
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

const STEPS: (Step & { action?: () => JSX.Element; closeButton?: string })[] = [
  {
    target: '.real_apy',
    content: 'Here you can see your actual 7-day annualized percentage rate',
    placement: 'top',
    disableBeacon: true,
  },
  {
    target: `.auto_staking`,
    content:
      'Auto-staking is a built-in automation that helps increase the profitability (APY) of staking contracts across other DeFi protocols',
    placement: 'top',
    action: () => (
      <WalletConnect
        fallback={
          <Button size="small" className={styles.connectButton}>
            CONNECT WALLET
          </Button>
        }
      />
    ),
  },
  {
    target: `.buy_lp`,
    content: 'You can buy liquidity pool tokens right here',
    placement: 'bottom',
    closeButton: 'start earning',
  },
]

export const StakingList: React.VFC<StakingListProps> = (props) => {
  const ability = useAbility()

  const [search, setSearch] = useState('')
  const [sortBy, setSort] = useState({
    column: ContractListSortInputTypeColumnEnum.MyStaked,
    order: SortOrderEnum.Desc,
  })

  const [runLocalStorage, setLocalStorage] = useLocalStorage(
    'stakingOnBoarding',
    true
  )
  const [run, setRun] = useState(false)
  const isDesktop = useMedia('(min-width: 960px)')

  const [dontShow, setDontShow] = useLocalStorage('dontShowAutostaking', false)

  const currentWallet = walletNetworkModel.useWalletNetwork()

  const stakingList = useStore(model.$contractsListCopies)
  const autostaking = useStore(model.$autostaking)
  const { metrics: freshMetrics, errors: freshMetricsError } = useStore(
    model.$freshMetrics
  )
  const wallets = useStore(walletsModel.$wallets)
  const loading = useStore(model.fetchStakingListFx.pending)
  const scanner = useStore(model.$scanner)
  const contractPrototypeAddresses = useStore(model.$contractAddresses)

  const openedContract = useStore(model.$openedContract)

  const [openConfirmDialog] = useDialog(ConfirmDialog)
  const [openAdapter] = useDialog(StakingAdapterDialog)
  const [openApyDialog] = useDialog(StakingApyDialog)
  const [openAutostakingVideoDialog] = useDialog(AutostakingVideoDialog)
  const [openAutostakingBalanceDialog] = useDialog(AutostakingBalanceDialog)
  const [openAutostakingDeployDialog] = useDialog(AutostakingDeployDialog)
  const [openAutostakingTabsDialog] = useDialog(AutostakingTabsDialog)

  const searchDebounced = useDebounce(search, 1000)

  useGate(model.StakingListGate, {
    ...props,
    hidden: ability.can('update', 'Contract') ? null : false,
    sortColumn: sortBy.column,
    sortOrder: sortBy.order,
    search: searchDebounced,
  })

  const handleOpenConfirmDialog = (id: string) => async () => {
    try {
      await openConfirmDialog()

      await model.deleteStakingFx(id)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleOpenContract = (contractAddress: string) => () => {
    const address = openedContract === contractAddress ? null : contractAddress

    model.openContract(address)
  }

  const handleUpdateMetrics = (contract: string) => () => {
    model.updateMetricsFx(contract)
  }

  const handleScannerRegister = (contractId: string) => async () => {
    // eslint-disable-next-line no-alert
    const events = prompt(
      'events list comma separated, ex.: Deposit,Approval,Withdraw',
      'Deposit'
    )
    if (!events) return

    await model.scannerRegisterContractFx({
      id: contractId,
      events: events.split(',').map((e) => e.trim()),
    })
    // eslint-disable-next-line no-alert
    alert('task pushed! wait little bit')
  }

  const handleSwitchNetwork = (contract: typeof stakingList[number]) => () =>
    switchNetwork(contract.network).catch(console.error)

  const handleAutostake =
    (contract: typeof stakingList[number]) => async () => {
      try {
        model.autostakingStart(contract.id)

        const prototypeAddress =
          contractPrototypeAddresses[contract.id]?.prototypeAddress

        if (
          !contract.automate.autorestake ||
          !prototypeAddress ||
          !currentWallet
        )
          return

        if (!dontShow) {
          await openAutostakingVideoDialog({
            dontShowAgain: dontShow,
            onDontShowAgain: setDontShow,
          }).catch(console.error)
        }

        const findedWallet = wallets.find((wallet) => {
          const sameAddreses =
            String(currentWallet.chainId) === 'main'
              ? currentWallet.account === wallet.address
              : currentWallet.account?.toLowerCase() === wallet.address

          return (
            sameAddreses && String(currentWallet.chainId) === wallet.network
          )
        })

        if (!findedWallet) throw new Error('wallet is not connected')

        const metrics = await walletsModel.fetchWalletListMetricsFx()

        const metric = metrics[findedWallet.id]

        if (
          !metric ||
          typeof metric?.billing.balance.netBalance === 'undefined'
        )
          throw Error('wallet is not connected')

        const billingBalance =
          await autostakingContractsModel.fetchBillingBalanceFx({
            blockchain: contract.blockchain,
            network: contract.network,
          })

        if (
          bignumberUtils.lt(
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
          protocol: props.protocolAdapter,
          contract: contract.automate.autorestake,
          chainId: String(currentWallet.chainId),
          provider: currentWallet.provider,
          contractAddress: contract.address,
        })

        const stepsResult = await openAutostakingDeployDialog({
          steps: deployAdapter.deploy,
        })

        const deployedContract = await deployModel.deployFx({
          proxyAddress: stepsResult.address,
          inputs: stepsResult.inputs,
          protocol: props.protocolId,
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
            protocolAdapter: props.protocolAdapter,
            contractAdapter: contract.automate.autorestake,
            contractId: contract.id,
            contractAddress: contract.address,
            provider: currentWallet.provider,
            chainId: String(currentWallet.chainId),
            action: 'migrate',
          })

        if (!stakingAutomatesAdapter) throw new Error('something went wrong')

        const cb = () => {
          stakingAutomatesModel
            .scanWalletMetricFx({
              walletId: createdTrigger.wallet.id,
              contractId: contract.id,
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

  const handleToggleHideShowContract =
    (contract: typeof stakingList[number]) => () => {
      model.stakingUpdateFx({
        id: contract.id,
        input: {
          blockchain: contract.blockchain,
          network: contract.network,
          address: contract.address,
          adapter: contract.adapter,
          name: contract.name,
          description: contract.description,
          link: contract.link,
          hidden: !contract.hidden,
          layout: contract.layout,
          automates: contract.automate.adapters,
          deprecated: contract.deprecated,
          autorestakeAdapter: contract.automate.autorestake ?? undefined,
        },
      })
    }

  const handleToggleDeprecatedContract =
    (contract: typeof stakingList[number]) => () => {
      model.stakingUpdateFx({
        id: contract.id,
        input: {
          blockchain: contract.blockchain,
          network: contract.network,
          address: contract.address,
          adapter: contract.adapter,
          name: contract.name,
          description: contract.description,
          link: contract.link,
          hidden: contract.hidden,
          layout: contract.layout,
          automates: contract.automate.adapters,
          deprecated: !contract.deprecated,
          autorestakeAdapter: contract.automate.autorestake ?? undefined,
        },
      })
    }

  const handleOpenApy =
    (metric: typeof stakingList[number]['metric']) => async () => {
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

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  useInterval(
    () => {
      if (currentWallet) {
        model.fetchMetrics({
          wallet: currentWallet,
          protocolAdapter: props.protocolAdapter,
        })
      }
    },
    currentWallet ? 15000 : null
  )

  const [sentryRef] = model.useInfiniteScroll()
  const hasNetPage = useStore(model.useInfiniteScroll.hasNextPage)

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status } = data

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setLocalStorage(false)
      setRun(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!stakingList.length || !runLocalStorage || !isDesktop) return

    setRun(Boolean(stakingList.length))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakingList, runLocalStorage, isDesktop])

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Staking contracts
        </Typography>
        <Input
          placeholder="Search"
          className={styles.search}
          value={search}
          onChange={handleSearch}
        />
        {false && <StakingTabs className={styles.tabs} />}
        {false && (
          <Paper radius={8} className={styles.select}>
            Daily
            <Icon icon="arrowUp" className={styles.selectArrow} />
          </Paper>
        )}
        <Can I="create" a="Contract">
          <Button
            as={ReactRouterLink}
            variant="contained"
            color="blue"
            to={`${paths.staking.create(props.protocolId)}?protocol-adapter=${
              props.protocolAdapter
            }`}
            className={styles.create}
          >
            <Icon icon="plus" className={styles.createIcon} />
          </Button>
        </Can>
      </div>
      <div className={clsx(styles.table, props.className)}>
        <Paper radius={8} className={styles.tableInner}>
          <StickyContainer>
            {loading && !stakingList.length && (
              <div className={clsx(styles.loader, styles.listItem)}>
                <Loader height="24" />
              </div>
            )}
            {Boolean(stakingList.length) && (
              <>
                <Joyride
                  run={run}
                  steps={STEPS}
                  continuous
                  scrollToFirstStep
                  callback={handleJoyrideCallback}
                  disableCloseOnEsc
                  disableOverlayClose
                  disableOverlay
                  floaterProps={{
                    styles: {
                      arrow: {
                        color: theme.colors.common.green1,
                      },
                    },
                  }}
                  tooltipComponent={OnboardTooltip}
                />
                <Sticky>
                  {({ style }) => (
                    <div
                      className={clsx(styles.tableHeader, styles.row)}
                      style={style}
                    >
                      <Typography variant="body2">Pool</Typography>
                      <Typography variant="body2" align="right">
                        <ButtonBase
                          onClick={handleSort({
                            column: ContractListSortInputTypeColumnEnum.Tvl,
                            order:
                              sortBy.column ===
                                ContractListSortInputTypeColumnEnum.Tvl &&
                              sortBy.order === SortOrderEnum.Desc
                                ? SortOrderEnum.Asc
                                : SortOrderEnum.Desc,
                          })}
                        >
                          TVL{' '}
                          {sortBy.column ===
                            ContractListSortInputTypeColumnEnum.Tvl &&
                            sortIcon(
                              sortBy,
                              ContractListSortInputTypeColumnEnum.Tvl
                            )}
                        </ButtonBase>
                      </Typography>
                      <Typography variant="body2" align="right">
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
                            sortIcon(
                              sortBy,
                              ContractListSortInputTypeColumnEnum.AprYear
                            )}
                        </ButtonBase>
                      </Typography>
                      <Typography
                        variant="body2"
                        align="right"
                        className={styles.realApr}
                      >
                        <ButtonBase
                          onClick={handleSort({
                            column:
                              ContractListSortInputTypeColumnEnum.AprWeekReal,
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
                        </ButtonBase>
                        <Dropdown
                          control={
                            <ButtonBase>
                              <Icon icon="question" width="16" height="16" />
                            </ButtonBase>
                          }
                          trigger="hover"
                          placement="top"
                          offset={[0, 8]}
                        >
                          <Typography variant="body3">
                            Actual 7-day annualized percentage rate
                          </Typography>
                        </Dropdown>
                      </Typography>
                      <Typography variant="body2" align="right">
                        <ButtonBase
                          onClick={handleSort({
                            column:
                              ContractListSortInputTypeColumnEnum.MyStaked,
                            order:
                              sortBy.column ===
                                ContractListSortInputTypeColumnEnum.MyStaked &&
                              sortBy.order === SortOrderEnum.Desc
                                ? SortOrderEnum.Asc
                                : SortOrderEnum.Desc,
                          })}
                        >
                          Position{' '}
                          {sortBy.column ===
                            ContractListSortInputTypeColumnEnum.MyStaked &&
                            sortIcon(
                              sortBy,
                              ContractListSortInputTypeColumnEnum.MyStaked
                            )}
                        </ButtonBase>
                      </Typography>
                      <Typography variant="body2" align="right">
                        Unclaimed
                      </Typography>
                      <Typography
                        variant="body2"
                        className={`${styles.boostTooltipTHead} auto_staking`}
                      >
                        <Dropdown
                          control={
                            <ButtonBase>
                              <Icon icon="question" width="16" height="16" />
                            </ButtonBase>
                          }
                          trigger="hover"
                          placement="top"
                          offset={[0, 8]}
                        >
                          <Typography variant="body3">
                            Activate auto-staking to boost your yield
                          </Typography>
                        </Dropdown>
                        Auto-Staking Boost
                      </Typography>
                    </div>
                  )}
                </Sticky>
              </>
            )}
            <ul className={styles.list}>
              {!loading && !stakingList.length && (
                <li className={clsx(styles.listItem)}>
                  <div className={styles.empty}>no data</div>
                </li>
              )}
              {stakingList.map((stakingListItem) => {
                const opened = stakingListItem.address === openedContract

                return (
                  <li
                    key={stakingListItem.id}
                    className={clsx(
                      styles.listItem,
                      (stakingListItem.hidden || stakingListItem.deprecated) &&
                        styles.hiddenListItem
                    )}
                  >
                    <StakingContractCard
                      className={styles.row}
                      {...stakingListItem}
                      onOpenContract={handleOpenContract(
                        stakingListItem.address
                      )}
                      opened={opened}
                      freshMetrics={freshMetrics}
                      protocolAdapter={props.protocolAdapter}
                      protocolId={props.protocolId}
                      onToggleHideShowContract={handleToggleHideShowContract(
                        stakingListItem
                      )}
                      onToggleDeprecatedContract={handleToggleDeprecatedContract(
                        stakingListItem
                      )}
                      onDelete={handleOpenConfirmDialog(stakingListItem.id)}
                      onOpenApy={handleOpenApy(stakingListItem.metric)}
                      scannerData={scanner[stakingListItem.id]}
                      onUpdate={handleUpdateMetrics(stakingListItem.id)}
                      hideAutostakingBoost={
                        !(
                          stakingListItem.automate.autorestake &&
                          contractPrototypeAddresses[stakingListItem.id]
                            ?.prototypeAddress
                        )
                      }
                      onScannerRegister={handleScannerRegister(
                        stakingListItem.id
                      )}
                      error={
                        <>
                          {freshMetricsError[stakingListItem.id] && (
                            <Can I="create" a="Contract">
                              <div>{freshMetricsError[stakingListItem.id]}</div>
                            </Can>
                          )}
                        </>
                      }
                    />
                    {opened && (
                      <StakingAdapters
                        protocolId={props.protocolId}
                        protocolAdapter={props.protocolAdapter}
                        contractAdapter={stakingListItem.adapter}
                        contractAddress={stakingListItem.address}
                        contractId={stakingListItem.id}
                        blockchain={stakingListItem.blockchain}
                        network={stakingListItem.network}
                        onTurnOn={
                          stakingListItem.network !== currentWallet?.chainId
                            ? handleSwitchNetwork(stakingListItem)
                            : handleAutostake(stakingListItem)
                        }
                        buyLiquidity={stakingListItem.automate.buyLiquidity}
                        autostakingLoading={
                          autostaking[stakingListItem.address]
                        }
                        deprecated={stakingListItem.deprecated}
                        autorestake={
                          stakingListItem.automate.autorestake ?? undefined
                        }
                        prototypeAddress={
                          contractPrototypeAddresses[stakingListItem.id]
                            ?.prototypeAddress
                        }
                      />
                    )}
                  </li>
                )
              })}
              {hasNetPage && (
                <li
                  ref={sentryRef}
                  className={clsx(styles.loader, styles.listItem)}
                >
                  <Loader height="24" />
                </li>
              )}
            </ul>
          </StickyContainer>
        </Paper>
      </div>
    </div>
  )
}
