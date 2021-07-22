import { makeStyles, Paper } from '@material-ui/core'
import { useGate, useStore } from 'effector-react'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { Link as ReactRouterLink } from 'react-router-dom'
import React, { useMemo } from 'react'

import { Can, useAbility } from '~/users'
import * as model from './staking-list.model'
import { paths } from '~/paths'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { dateUtils } from '~/common/date-utils'
import { cutAccount } from '~/common/cut-account'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { StakingAdapters } from '~/staking/staking-adapters'

export type StakingListProps = {
  protocolId: string
}

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },

  card: {
    padding: '10px 15px',
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center',
  },

  icons: {
    display: 'flex',

    '& > *:first-child': {
      marginRight: -3,
    },

    '& > *:last-child': {
      marginLeft: -3,
    },
  },

  tvl: {
    marginLeft: 'auto',
  },

  mr: {
    marginRight: 10,
  },
}))

export const StakingList: React.VFC<StakingListProps> = (props) => {
  const classes = useStyles()

  const ability = useAbility()

  const stakingList = useStore(model.$contracts)
  const loading = useStore(model.fetchStakingListFx.pending)

  const [openConfirmDialog] = useDialog(ConfirmDialog)

  useGate(model.StakingListGate, props)

  const handleOpenConfirmDialog = (id: string) => async () => {
    try {
      await openConfirmDialog()

      await model.deleteStakingFx(id)
    } catch (error) {
      console.error(error.message)
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

  return (
    <div>
      <Can I="create" a="Contract">
        <Button
          variant="contained"
          color="primary"
          component={ReactRouterLink}
          to={paths.staking.create(props.protocolId)}
        >
          New contract
        </Button>
      </Can>
      <ul className={classes.root}>
        {loading && <Paper>Loading...</Paper>}
        {!loading && !staking.length && <Paper>no contracts found</Paper>}
        {!loading &&
          staking.map((stakingListItem) => (
            <li key={stakingListItem.id}>
              {stakingListItem.wallet?.id && !stakingListItem.connected && (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleConnect({
                    walletId: stakingListItem.wallet?.id,
                    contractId: stakingListItem.id,
                  })}
                >
                  Connect
                </Button>
              )}
              <Paper className={classes.card}>
                <div className={`${classes.icons} ${classes.mr}`}>
                  {stakingListItem.name}
                </div>
                <div>{stakingListItem.blockchain}</div>
                <Link
                  className={`${classes.tvl} ${classes.mr}`}
                  href={buildExplorerUrl({
                    network: stakingListItem.network,
                    address: stakingListItem.address,
                  })}
                  target="_blank"
                >
                  {cutAccount(stakingListItem.address)}
                </Link>
                {stakingListItem.link && (
                  <Link
                    className={classes.mr}
                    href={stakingListItem.link}
                    target="_blank"
                  >
                    More info
                  </Link>
                )}
                <div className={classes.mr}>
                  {dateUtils.format(stakingListItem.createdAt)}
                </div>
              </Paper>
              <Can I="update" a="Contract">
                <Button
                  variant="contained"
                  component={ReactRouterLink}
                  to={paths.staking.update(
                    props.protocolId,
                    stakingListItem.id
                  )}
                >
                  Edit
                </Button>
              </Can>
              <Can I="delete" a="Contract">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleOpenConfirmDialog(stakingListItem.id)}
                >
                  Delete
                </Button>
              </Can>
              <StakingAdapters
                contractAddress={stakingListItem.address}
                contractLayout={stakingListItem.layout}
              />
            </li>
          ))}
      </ul>
      <model.StakingListPagination />
    </div>
  )
}
