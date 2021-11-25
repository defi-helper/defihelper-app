import { useGate, useStore } from 'effector-react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useMemo, useState } from 'react'
import clsx from 'clsx'

import { Can, useAbility, authModel } from '~/auth'
import { paths } from '~/paths'
import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import { StakingTabs } from '../common'
import { Paper } from '~/common/paper'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { StakingAdapters } from '~/staking/staking-adapters'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import { Dropdown } from '~/common/dropdown'
import { bignumberUtils } from '~/common/bignumber-utils'
import { useWalletList } from '~/wallets/wallet-list'
import * as model from './staking-list.model'
import * as styles from './staking-list.css'
import { Loader } from '~/common/loader'

export type StakingListProps = {
  protocolId: string
}

export const StakingList: React.VFC<StakingListProps> = (props) => {
  const ability = useAbility()

  const [openedContract, setOpenedContract] = useState<string | null>(null)

  const stakingList = useStore(model.$contractList)
  const connectedContracts = useStore(model.$connectedContracts)
  const loading = useStore(model.fetchStakingListFx.pending)

  const protocolAdapter = useStore(model.$protocolAdapter)

  const [openConfirmDialog] = useDialog(ConfirmDialog)
  const [openWalletList] = useWalletList()
  const wallets = useStore(authModel.$userWallets)

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

  const handleConnect = (contractId: string) => async () => {
    try {
      const walletData = await openWalletList()

      const findedWallet = wallets.find(
        (wallet) =>
          wallet.address.toLowerCase() === walletData.account?.toLowerCase() &&
          String(walletData.chainId) === wallet.network
      )

      if (!findedWallet) return

      model.connectWalletFx({
        wallet: findedWallet.id,
        contract: contractId,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleDisconnect = (contractId: string) => async () => {
    try {
      const walletData = await openWalletList()

      const findedWallet = wallets.find(
        (wallet) =>
          wallet.address.toLowerCase() === walletData.account?.toLowerCase() &&
          String(walletData.chainId) === wallet.network
      )

      if (!findedWallet) return

      model.disconnectWalletFx({
        wallet: findedWallet.id,
        contract: contractId,
      })
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
            <Typography variant="body2">APR</Typography>
            <Typography variant="body2">+Autostaking</Typography>
            <Typography variant="body2">Position</Typography>
            <Typography variant="body2">Pool share</Typography>
            <Typography variant="body2">Rewards</Typography>
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
                const connected = Boolean(
                  connectedContracts[stakingListItem.id]
                )

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
                        blockchain={stakingListItem.blockchain}
                        network={stakingListItem.network}
                        onTurnOn={handleConnect(stakingListItem.id)}
                        onTurnOff={handleDisconnect(stakingListItem.id)}
                        connected={connected}
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
