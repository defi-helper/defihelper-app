import { useGate, useStore } from 'effector-react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useMemo } from 'react'
import clsx from 'clsx'

import { Can, useAbility } from '~/users'
import { paths } from '~/paths'
import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import { StakingTabs } from '../common'
import { Paper } from '~/common/paper'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { StakingAdapters } from '~/staking/staking-adapters'
import { walletNetworkSwitcherModel } from '~/wallets/wallet-network-switcher'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import * as model from './staking-list.model'
import * as styles from './staking-list.css'
import { Dropdown } from '~/common/dropdown'

export type StakingListProps = {
  protocolId: string
}

export const StakingList: React.VFC<StakingListProps> = (props) => {
  const ability = useAbility()

  const stakingList = useStore(model.$contracts)
  const loading = useStore(model.fetchStakingListFx.pending)

  const protocolAdapter = useStore(model.$protocolAdapter)
  const openedContract = useStore(model.$openedContract)

  const [openConfirmDialog] = useDialog(ConfirmDialog)

  useGate(model.StakingListGate, props)

  const { network, blockchain } = useStore(
    walletNetworkSwitcherModel.$currentNetwork
  )

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

  const handleConnect =
    (connectParams: { walletId?: string; contractId?: string }) => () => {
      if (!connectParams.walletId || !connectParams.contractId) return

      model.connectWalletFx({
        wallet: connectParams.walletId,
        contract: connectParams.contractId,
      })
    }

  const staking = useMemo(
    () => stakingList.filter((stakingItem) => ability.can('read', stakingItem)),
    [stakingList, ability]
  )

  const handleOpenContract = (contractAddress: string) => () => {
    model.openContract(contractAddress)
  }

  return (
    <>
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Staking contracts
        </Typography>
        <StakingTabs className={styles.tabs} />
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
            <Icon icon="plus" height="24" width="24" />
          </Button>
        </Can>
      </div>
      <Paper radius={8}>
        <div className={clsx(styles.tableHeader, styles.row)}>
          <Typography variant="body2">Pool</Typography>
          <Typography variant="body2">TVL</Typography>
          <Typography variant="body2">APR</Typography>
          <Typography variant="body2">+Autostaking</Typography>
          <Typography variant="body2">Position</Typography>
          <Typography variant="body2">Pool share</Typography>
          <Typography variant="body2">Rewards</Typography>
        </div>
        <ul className={styles.root}>
          {loading && <Paper>Loading...</Paper>}
          {!loading && !staking.length && <Paper>no contracts found</Paper>}
          {!loading &&
            staking.map((stakingListItem) => {
              const opened = stakingListItem.address === openedContract

              const connectable =
                stakingListItem.blockchain === blockchain &&
                (stakingListItem.network === String(network) ||
                  (stakingListItem.network === 'main' && network === 'waves'))

              return (
                <li key={stakingListItem.id} className={styles.listItem}>
                  <div className={clsx(styles.card, styles.row)}>
                    <div className={styles.tableCol}>
                      <div className={styles.coinIcons}>
                        <Icon icon="BAG" className={styles.coinIcon} />
                        <Icon icon="BNB" className={styles.coinIcon} />
                      </div>
                      <Typography variant="body2" as="div">
                        {stakingListItem.name}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" as="div">
                        $782,243.89
                      </Typography>
                      <Typography
                        variant="body2"
                        as="div"
                        className={styles.red}
                      >
                        -12%
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" as="div">
                        56.72%
                      </Typography>
                      <Typography
                        variant="body2"
                        as="div"
                        className={styles.red}
                      >
                        -12%
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" as="div">
                        56.72%
                      </Typography>
                      <Typography
                        variant="body2"
                        as="div"
                        className={styles.lightGreen}
                      >
                        +12%
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" as="div">
                        $1,212,456.5
                      </Typography>
                      <Typography
                        variant="body2"
                        as="div"
                        className={styles.red}
                      >
                        -12%
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" as="div">
                        0.00012%
                      </Typography>
                      <Typography
                        variant="body2"
                        as="div"
                        className={styles.red}
                      >
                        -0.00002%
                      </Typography>
                    </div>
                    <div className={styles.tableCol}>
                      <div>
                        <Typography variant="body2" as="div">
                          $26,852
                        </Typography>
                        <Typography variant="body2" as="div">
                          +0.9%
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
                  {!connectable && opened && (
                    <Paper>please change network</Paper>
                  )}
                  {connectable && protocolAdapter && opened && (
                    <StakingAdapters
                      protocolAdapter={protocolAdapter}
                      contractAdapter={stakingListItem.adapter}
                      contractAddress={stakingListItem.address}
                      contractLayout={stakingListItem.layout}
                      onTurnOn={handleConnect({
                        walletId: stakingListItem.wallet?.id,
                        contractId: stakingListItem.id,
                      })}
                    />
                  )}
                </li>
              )
            })}
        </ul>
        <model.StakingListPagination />
      </Paper>
    </>
  )
}
