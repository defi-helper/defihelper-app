import { useLocalStorage, useInterval } from 'react-use'
import { useGate, useStore } from 'effector-react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useMemo, useState } from 'react'
import clsx from 'clsx'

import * as automationUpdateModel from '~/automations/automation-update/automation-update.model'
import { authModel, Can, useAbility } from '~/auth'
import { paths } from '~/paths'
import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import {
  StakingAdapterDialog,
  StakingDescriptionDialog,
  StakingTabs,
} from '../common'
import { Paper } from '~/common/paper'
import { useDialog } from '~/common/dialog'
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
} from '~/graphql/_generated-types'
import { StakingBillingFormDialog } from '~/staking/common'
import { AutomationDeployStepsDialog } from '~/automations/common/automation-deploy-steps-dialog'
import { toastsService } from '~/toasts'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { switchNetwork } from '~/wallets/common'
import { WalletConnect } from '~/wallets/wallet-connect'
import { networksConfig } from '~/networks-config'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import * as walletsModel from '~/settings/settings-wallets/settings-wallets.model'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'
import * as model from './staking-list.model'
import * as styles from './staking-list.css'

export type StakingListProps = {
  protocolId: string
  protocolAdapter: string
}

export const StakingList: React.VFC<StakingListProps> = (props) => {
  const ability = useAbility()

  const [openedContract, setOpenedContract] = useState<string | null>(null)
  const [dontShow, setDontShow] = useLocalStorage('dontShowAutostaking', false)

  const currentWallet = walletNetworkModel.useWalletNetwork()
  const stakingList = useStore(model.$contractList)

  const freshMetrics = useStore(model.$freshMetrics)
  const wallets = useStore(walletsModel.$wallets)
  const loading = useStore(model.fetchStakingListFx.pending)

  const user = useStore(authModel.$user)

  const [openConfirmDialog] = useDialog(ConfirmDialog)
  const [openDescriptionDialog] = useDialog(StakingDescriptionDialog)
  const [openBillingForm] = useDialog(StakingBillingFormDialog)
  const [openDeployStepsDialog] = useDialog(AutomationDeployStepsDialog)
  const [openAdapter] = useDialog(StakingAdapterDialog)

  useGate(model.StakingListGate, props)

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

  const staking = useMemo(
    () => stakingList.filter((stakingItem) => ability.can('read', stakingItem)),
    [stakingList, ability]
  )

  const handleOpenContract = (contractAddress: string) => () => {
    if (openedContract === contractAddress) {
      setOpenedContract(null)
    } else {
      setOpenedContract(contractAddress)
    }
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
            String(currentWallet.chainId) === 'W'
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
      } catch (error) {
        if (error instanceof Error) {
          toastsService.error(error.message)
        }
      } finally {
        model.autostakingEnd(contract.id)
      }
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
            <Typography variant="body2">TVL</Typography>
            <Typography variant="body2">APY</Typography>
            <Typography variant="body2">Position</Typography>
            <Typography variant="body2">Pool share</Typography>
            <Typography variant="body2">Unclaimed</Typography>
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
                  We use our math power to boost apy of your savings
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
            {!loading && !staking.length && (
              <li className={clsx(styles.listItem)}>
                <div className={styles.empty}>No contracts found</div>
              </li>
            )}
            {!loading &&
              staking.map((stakingListItem) => {
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
                    <div className={clsx(styles.card, styles.row)}>
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
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="body2"
                          as="div"
                          family="mono"
                          transform="uppercase"
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
                        >
                          ${bignumberUtils.format(metric.myEarned)}
                        </Typography>
                      </div>
                      <div
                        className={clsx(styles.tableCol, styles.autostaking)}
                      >
                        <div>
                          <Typography
                            variant="body2"
                            as="div"
                            family="mono"
                            transform="uppercase"
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
                        {!(
                          stakingListItem.automate.autorestake &&
                          stakingListItem.prototypeAddress &&
                          stakingListItem.automate.autorestake
                        ) && user ? (
                          <Dropdown
                            trigger="hover"
                            placement="top"
                            offset={[0, 8]}
                            className={styles.tooltip}
                            control={
                              <Button
                                size="small"
                                variant="outlined"
                                className={styles.turnOn}
                              >
                                Turn on
                              </Button>
                            }
                          >
                            You can&apos;t enable autostaking for this contract
                            right now
                          </Dropdown>
                        ) : (
                          <WalletConnect
                            fallback={
                              <Button
                                size="small"
                                variant="outlined"
                                className={styles.turnOn}
                              >
                                Turn on
                              </Button>
                            }
                          >
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={handleAutostake(stakingListItem)}
                              className={styles.turnOn}
                              loading={stakingListItem.autostakingLoading}
                            >
                              Turn on
                            </Button>
                          </WalletConnect>
                        )}
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
