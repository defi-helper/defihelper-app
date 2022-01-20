/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import { useLocalStorage, useInterval } from 'react-use'
import { useGate, useStore } from 'effector-react'
import { Link as ReactRouterLink } from 'react-router-dom'
import clsx from 'clsx'

import * as automationUpdateModel from '~/automations/automation-update/automation-update.model'
import { Can, useAbility } from '~/auth'
import { paths } from '~/paths'
import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import {
  StakingAdapterDialog,
  StakingDescriptionDialog,
  StakingTabs,
} from '../common'
import { Paper } from '~/common/paper'
import { useDialog, UserRejectionError } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { StakingAdapters } from '~/staking/staking-adapters'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import { Dropdown } from '~/common/dropdown'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Loader } from '~/common/loader'
import {
  AutomateActionTypeEnum,
  AutomateConditionTypeEnum,
  AutomateTriggerTypeEnum,
  ContractListSortInputTypeColumnEnum,
  SortOrderEnum,
} from '~/graphql/_generated-types'
import { StakingBillingFormDialog } from '~/staking/common'
import { AutomationDeployStepsDialog } from '~/automations/common/automation-deploy-steps-dialog'
import { toastsService } from '~/toasts'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { switchNetwork } from '~/wallets/common'
import { networksConfig } from '~/networks-config'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import * as walletsModel from '~/settings/settings-wallets/settings-wallets.model'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'
import * as model from './staking-list.model'
import * as styles from './staking-list.css'
import { StakingListRowSyncIndicator } from '~/staking/common/staking-list-row-sync-indicator'

export type StakingListProps = {
  protocolId: string
  protocolAdapter: string
}

const sortIcon = (
  sort: {
    column: ContractListSortInputTypeColumnEnum
    order: SortOrderEnum
  },
  column: ContractListSortInputTypeColumnEnum
) => {
  let icon: 'arrowDown' | 'arrowTop' = 'arrowTop'

  if (sort.column === column && column && sort.order === SortOrderEnum.Desc) {
    icon = 'arrowDown'
  }

  return <Icon icon={icon} width="18" />
}

export const StakingList: React.VFC<StakingListProps> = (props) => {
  const ability = useAbility()

  const [currentBlock, setCurrentBlock] = useState(-1)
  const [sortBy, setSort] = useState({
    column: ContractListSortInputTypeColumnEnum.MyStaked,
    order: SortOrderEnum.Desc,
  })

  const [dontShow, setDontShow] = useLocalStorage('dontShowAutostaking', false)

  const currentWallet = walletNetworkModel.useWalletNetwork()
  const stakingList = useStore(model.$contractsListCopies)

  const freshMetrics = useStore(model.$freshMetrics)
  const wallets = useStore(walletsModel.$wallets)
  const loading = useStore(model.fetchStakingListFx.pending)

  const openedContract = useStore(model.$openedContract)

  const [openConfirmDialog] = useDialog(ConfirmDialog)
  const [openDescriptionDialog] = useDialog(StakingDescriptionDialog)
  const [openBillingForm] = useDialog(StakingBillingFormDialog)
  const [openDeployStepsDialog] = useDialog(AutomationDeployStepsDialog)
  const [openAdapter] = useDialog(StakingAdapterDialog)

  useGate(model.StakingListGate, {
    ...props,
    hidden: ability.can('update', 'Contract') ? null : false,
    sortColumn: sortBy.column,
    sortOrder: sortBy.order,
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

  const handleAutostake =
    (contract: typeof stakingList[number]) => async () => {
      try {
        model.autostakingStart(contract.id)

        await switchNetwork(contract.network)

        if (
          !contract.automate.autorestake ||
          !contract.prototypeAddress ||
          !currentWallet
        )
          return

        if (!dontShow) {
          const result = await openDescriptionDialog()

          setDontShow(result)
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

        await openBillingForm({
          balance: String(findedWallet.billing.balance.netBalance),
          network: findedWallet.network,
          onSubmit: (result) =>
            walletsModel.depositFx({
              blockchain: findedWallet.blockchain,
              amount: result.amount,
              walletAddress: findedWallet.address,
              chainId: String(currentWallet.chainId),
              provider: currentWallet.provider,
            }),
        })

        const deployAdapter = await deployModel.fetchDeployAdapterFx({
          address: contract.prototypeAddress,
          protocol: props.protocolAdapter,
          contract: contract.automate.autorestake,
          chainId: String(currentWallet.chainId),
          provider: currentWallet.provider,
          contractAddress: contract.address,
        })

        const stepsResult = await openDeployStepsDialog({
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

        await openAdapter({
          steps: stakingAutomatesAdapter.migrate,
        })

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

  const handleToggleContract = (contract: typeof stakingList[number]) => () => {
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
        autorestakeAdapter: contract.automate.autorestake ?? undefined,
      },
    })
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

  const walletNetwork = walletNetworkModel.useWalletNetwork()
  const networkProvider = walletNetwork
    ? walletNetworkModel.getNetwork(
        walletNetwork.provider,
        walletNetwork.chainId
      )
    : null

  useInterval(async () => {
    if (!networkProvider) return

    try {
      setCurrentBlock(await networkProvider.getBlockNumber())
    } catch {
      setCurrentBlock(-1)
    }
  }, 3000)

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Staking contracts
        </Typography>
        {false && <StakingTabs className={styles.tabs} />}
        {false && (
          <Paper radius={8} className={styles.select}>
            Daily
            <Icon icon="arrowTop" className={styles.selectArrow} />
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
      <div className={styles.table}>
        <Paper radius={8} className={styles.tableInner}>
          <div className={clsx(styles.tableHeader, styles.row)}>
            <Typography variant="body2">Pool</Typography>
            <Typography variant="body2" align="right">
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
                  sortIcon(sortBy, ContractListSortInputTypeColumnEnum.AprYear)}
              </ButtonBase>
            </Typography>
            <Typography variant="body2" align="right">
              <ButtonBase
                onClick={handleSort({
                  column: ContractListSortInputTypeColumnEnum.MyStaked,
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
              Pool share
            </Typography>
            <Typography variant="body2" align="right">
              Unclaimed
            </Typography>
            <Typography variant="body2" className={styles.boostTooltipTHead}>
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
              Autostaking Boost
            </Typography>
          </div>
          <ul className={styles.list}>
            {loading && (
              <li className={clsx(styles.loader, styles.listItem)}>
                <Loader height="24" />
              </li>
            )}
            {!loading && !stakingList.length && (
              <li className={clsx(styles.listItem)}>
                <div className={styles.empty}>no data</div>
              </li>
            )}
            {!loading &&
              stakingList.map((stakingListItem) => {
                const opened = stakingListItem.address === openedContract

                const metric = freshMetrics[stakingListItem.id]
                  ? freshMetrics[stakingListItem.id]
                  : stakingListItem.metric

                const apy = bignumberUtils.mul(metric.aprYear, 100)

                const apyboostDifference = bignumberUtils.minus(
                  stakingListItem.metric.myAPYBoost,
                  metric.aprYear
                )
                const validDiff =
                  !bignumberUtils.isNaN(apyboostDifference) &&
                  bignumberUtils.gt(apyboostDifference, '0.001')

                const currentNetwork = networksConfig[stakingListItem.network]

                return (
                  <li
                    key={stakingListItem.id}
                    className={clsx(
                      styles.listItem,
                      stakingListItem.hidden && styles.hiddenListItem
                    )}
                  >
                    <div
                      className={clsx(styles.card, styles.row)}
                      onClick={handleOpenContract(stakingListItem.address)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className={styles.tableCol}>
                        {currentNetwork && (
                          <div className={styles.coinIcons}>
                            <Icon
                              className={styles.coinIcon}
                              icon={currentNetwork.icon}
                            />
                          </div>
                        )}
                        <Typography variant="body2" as="div">
                          {stakingListItem.name}

                          <Can I="update" a="Protocol">
                            <br />
                            <StakingListRowSyncIndicator
                              row={stakingListItem}
                              currentBlock={currentBlock}
                              activeChain={walletNetwork?.chainId}
                            />
                          </Can>
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="body2"
                          as="div"
                          family="mono"
                          transform="uppercase"
                          align="right"
                        >
                          ${bignumberUtils.format(metric.tvl)}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="body2"
                          as="div"
                          family="mono"
                          transform="uppercase"
                          align="right"
                        >
                          {bignumberUtils.formatMax(apy, 10000)}%
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="body2"
                          as="div"
                          family="mono"
                          transform="uppercase"
                          align="right"
                        >
                          ${bignumberUtils.format(metric.myStaked)}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="body2"
                          as="div"
                          family="mono"
                          transform="uppercase"
                          align="right"
                        >
                          {bignumberUtils.format(
                            bignumberUtils.mul(
                              bignumberUtils.div(metric.myStaked, metric.tvl),
                              100
                            )
                          )}
                          %
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="body2"
                          as="div"
                          family="mono"
                          transform="uppercase"
                          align="right"
                        >
                          ${bignumberUtils.format(metric.myEarned)}
                        </Typography>
                      </div>
                      <div className={clsx(styles.tableCol)}>
                        <div className={styles.autostakingCol}>
                          <Typography
                            variant="body2"
                            as="div"
                            family="mono"
                            transform="uppercase"
                            align="right"
                          >
                            {validDiff
                              ? bignumberUtils.formatMax(
                                  bignumberUtils.mul(
                                    stakingListItem.metric.myAPYBoost,
                                    100
                                  ),
                                  10000
                                )
                              : 0}
                            %
                          </Typography>
                          {validDiff && (
                            <Typography
                              variant="body2"
                              as="div"
                              family="mono"
                              transform="uppercase"
                              align="right"
                              className={clsx({
                                [styles.positive]: bignumberUtils.gt(
                                  apyboostDifference,
                                  '0.001'
                                ),
                              })}
                            >
                              {bignumberUtils.gt(apyboostDifference, 0) && '+'}
                              {bignumberUtils.formatMax(
                                bignumberUtils.mul(apyboostDifference, 100),
                                10000
                              )}
                              %
                            </Typography>
                          )}
                        </div>
                        <ButtonBase
                          className={styles.accorionButton}
                          onClick={handleOpenContract(stakingListItem.address)}
                        >
                          <Icon
                            icon={opened ? 'arrowTop' : 'arrowDown'}
                            width="24"
                            height="24"
                          />
                        </ButtonBase>
                        <Can I="update" a="Contract">
                          <Dropdown
                            control={
                              <ButtonBase className={styles.manageButton}>
                                <Icon icon="dots" />
                              </ButtonBase>
                            }
                          >
                            <Can I="update" a="Contract">
                              <ButtonBase
                                as={ReactRouterLink}
                                to={`${paths.staking.update(
                                  props.protocolId,
                                  stakingListItem.id
                                )}?protocol-adapter=${props.protocolAdapter}`}
                              >
                                Edit
                              </ButtonBase>
                            </Can>
                            <Can I="update" a="Contract">
                              <ButtonBase
                                onClick={handleToggleContract(stakingListItem)}
                              >
                                {stakingListItem.hidden ? 'Show' : 'Hide'}
                              </ButtonBase>
                            </Can>
                            <Can I="delete" a="Contract">
                              <ButtonBase
                                onClick={handleOpenConfirmDialog(
                                  stakingListItem.id
                                )}
                              >
                                Delete
                              </ButtonBase>
                            </Can>
                          </Dropdown>
                        </Can>
                      </div>
                    </div>
                    {opened && (
                      <StakingAdapters
                        protocolAdapter={props.protocolAdapter}
                        contractAdapter={stakingListItem.adapter}
                        contractAddress={stakingListItem.address}
                        contractId={stakingListItem.id}
                        blockchain={stakingListItem.blockchain}
                        network={stakingListItem.network}
                        onTurnOn={handleAutostake(stakingListItem)}
                        autostakingLoading={stakingListItem.autostakingLoading}
                        autorestake={
                          stakingListItem.automate.autorestake ?? undefined
                        }
                        prototypeAddress={stakingListItem.prototypeAddress}
                      />
                    )}
                  </li>
                )
              })}
          </ul>
        </Paper>
        <model.StakingListPagination />
      </div>
    </div>
  )
}
