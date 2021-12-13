import { useLocalStorage } from 'react-use'
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
  StakingAutomatesDialog,
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
  AutomateTriggerTypeEnum,
} from '~/graphql/_generated-types'
import { useWalletList } from '~/wallets/wallet-list'
import { StakingBillingFormDialog } from '~/staking/common'
import { automationApi } from '~/automations/common/automation.api'
import { AutomationDeployStepsDialog } from '~/automations/common/automation-deploy-steps-dialog'
import { toastsService } from '~/toasts'
import * as deployModel from '~/automations/automation-deploy-contract/automation-deploy-contract.model'
import * as walletsModel from '~/settings/settings-wallets/settings-wallets.model'
import * as stakingAutomatesModel from '~/staking/staking-automates/staking-automates.model'
import * as model from './staking-list.model'
import * as styles from './staking-list.css'

export type StakingListProps = {
  protocolId: string
  protocolName: string
  protocolAdapter: string
}

export const StakingList: React.VFC<StakingListProps> = (props) => {
  const ability = useAbility()

  const [openedContract, setOpenedContract] = useState<string | null>(null)
  const [dontShow, setDontShow] = useLocalStorage('dontShowAutostaking', false)

  const stakingList = useStore(model.$contractList)
  const wallets = useStore(authModel.$userWallets)
  const loading = useStore(model.fetchStakingListFx.pending)

  const protocolAdapter = useStore(model.$protocolAdapter)

  const [openConfirmDialog] = useDialog(ConfirmDialog)
  const [openDescriptionDialog] = useDialog(StakingDescriptionDialog)
  const [openWalletList] = useWalletList()
  const [openBillingForm] = useDialog(StakingBillingFormDialog)
  const [openDeployStepsDialog] = useDialog(AutomationDeployStepsDialog)
  const [openAutomates] = useDialog(StakingAutomatesDialog)

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
      if (!contract.automate.autorestake) return

      try {
        const { address } = await automationApi.getContractAddress({
          protocol: props.protocolAdapter,
          contract: contract.automate.autorestake,
          chainId: contract.network,
        })

        if (!address) throw new Error('contract address is undefined')

        if (!dontShow) {
          const result = await openDescriptionDialog()

          setDontShow(result)
        }

        const walletData = await openWalletList({
          blockchain: contract.blockchain,
        })

        const findedWallet = wallets.find((wallet) => {
          const sameAddreses =
            String(walletData.chainId) === 'W'
              ? walletData.account === wallet.address
              : walletData.account?.toLowerCase() === wallet.address

          return sameAddreses && String(walletData.chainId) === wallet.network
        })

        if (!findedWallet) throw new Error('wallet is not connected')

        await openBillingForm({
          balance: String(findedWallet.billing.balance.netBalance),
          network: findedWallet.network,
          onSubmit: (result) =>
            walletsModel.depositFx({
              amount: result.amount,
              walletAddress: findedWallet.address,
              chainId: String(walletData.chainId),
              provider: walletData.provider,
            }),
        })

        const deployAdapter = await deployModel.fetchDeployAdapterFx({
          address,
          protocol: props.protocolAdapter,
          contract: contract.automate.autorestake,
          chainId: String(walletData.chainId),
          provider: walletData.provider,
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
          chainId: String(walletData.chainId),
          provider: walletData.provider,
        })

        const createdTrigger = await automationUpdateModel.createTriggerFx({
          wallet: findedWallet.id,
          params: JSON.stringify({}),
          type: AutomateTriggerTypeEnum.EveryHour,
          name: 'Autogenerated',
          active: true,
        })

        await automationUpdateModel.createActionFx({
          trigger: createdTrigger.id,
          type: AutomateActionTypeEnum.EthereumAutomateRun,
          params: JSON.stringify({
            id: deployedContract.id,
          }),
          priority: 0,
        })

        const stakingAutomatesAdapter =
          await stakingAutomatesModel.fetchAdapter({
            protocolAdapter: props.protocolAdapter,
            contractAdapter: contract.adapter,
            contractId: contract.id,
            contractAddress: contract.address,
            provider: walletData.provider,
            chainId: String(walletData.chainId),
            action: 'migrate',
          })

        if (!stakingAutomatesAdapter) throw new Error('something went wrong')

        await openAutomates({
          steps: stakingAutomatesAdapter.migrate,
        })
      } catch (error) {
        if (error instanceof UserRejectionError) {
          console.error(error.message)
          return
        }

        if (error instanceof Error) {
          toastsService.error(error.message)
        }
      }
    }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Staking contracts
        </Typography>
        {false && <StakingTabs className={styles.tabs} />}
        <Paper radius={8} className={styles.select}>
          Daily
          <Icon icon="arrowTop" className={styles.selectArrow} />
        </Paper>
        <Can I="create" a="Contract">
          <Button
            as={ReactRouterLink}
            variant="contained"
            color="blue"
            to={`${paths.staking.create(
              props.protocolId
            )}?protocol-adapter=${protocolAdapter}`}
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
            <Typography variant="body2">Autostaking boost</Typography>
            <Typography variant="body2">Position</Typography>
            <Typography variant="body2">Pool share</Typography>
            <Typography variant="body2">Unclaimed rewards</Typography>
          </div>
          <ul className={styles.list}>
            {loading && (
              <div className={styles.loader}>
                <Loader height="24" />
              </div>
            )}
            {!loading && !staking.length && <Paper>no contracts found</Paper>}
            {!loading &&
              staking.map((stakingListItem) => {
                const opened = stakingListItem.address === openedContract

                return (
                  <li key={stakingListItem.id} className={styles.listItem}>
                    <div className={clsx(styles.card, styles.row)}>
                      <div className={styles.tableCol}>
                        {false && (
                          <div className={styles.coinIcons}>
                            <Icon icon="BAG" className={styles.coinIcon} />
                            <Icon icon="BNB" className={styles.coinIcon} />
                          </div>
                        )}

                        <Typography variant="body2" as="div">
                          {stakingListItem.name}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body2" as="div">
                          ${bignumberUtils.format(stakingListItem.metric.tvl)}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body2" as="div">
                          {bignumberUtils.format(
                            bignumberUtils.mul(
                              stakingListItem.metric.aprYear,
                              100
                            )
                          )}
                          %
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body2" as="div">
                          {bignumberUtils.formatMax(
                            stakingListItem.autostaking,
                            10000
                          )}
                          %
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body2" as="div">
                          $
                          {bignumberUtils.format(
                            stakingListItem.metric.myStaked
                          )}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body2" as="div">
                          {bignumberUtils.format(
                            bignumberUtils.mul(
                              bignumberUtils.div(
                                stakingListItem.metric.myStaked,
                                stakingListItem.metric.tvl
                              ),
                              100
                            )
                          )}
                          %
                        </Typography>
                      </div>
                      <div className={styles.tableCol}>
                        <div>
                          <Typography variant="body2" as="div">
                            $
                            {bignumberUtils.format(
                              stakingListItem.metric.myEarned
                            )}
                          </Typography>
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
                                )}?protocol-adapter=${protocolAdapter}`}
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
                    {protocolAdapter && opened && (
                      <StakingAdapters
                        poolName={stakingListItem.name}
                        protocolAdapter={protocolAdapter}
                        contractAdapter={stakingListItem.adapter}
                        contractAddress={stakingListItem.address}
                        contractLayout={stakingListItem.layout}
                        contractId={stakingListItem.id}
                        blockchain={stakingListItem.blockchain}
                        network={stakingListItem.network}
                        hasAutorestake={Boolean(
                          stakingListItem.automate.autorestake
                        )}
                        onAutostake={handleAutostake(stakingListItem)}
                      />
                    )}
                  </li>
                )
              })}
          </ul>
          <model.StakingListPagination />
        </Paper>
      </div>
    </div>
  )
}
