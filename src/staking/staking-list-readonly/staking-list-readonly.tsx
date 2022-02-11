import { useState } from 'react'
import { useGate, useStore } from 'effector-react'
import { Link as ReactRouterLink } from 'react-router-dom'
import clsx from 'clsx'

import { Can, useAbility } from '~/auth'
import { paths } from '~/paths'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import { Loader } from '~/common/loader'
import { Input } from '~/common/input'
import { useDebounce } from '~/common/hooks'
import { StakingContractCardReadonly } from '../common'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import * as model from './staking-list-readonly.model'
import * as styles from './staking-list-readonly.css'

export type StakingListReadonlyProps = {
  protocolId: string
  protocolAdapter: string
}

export const StakingListReadonly: React.VFC<StakingListReadonlyProps> = (
  props
) => {
  const ability = useAbility()
  const [search, setSearch] = useState('')

  const [openConfirmDialog] = useDialog(ConfirmDialog)

  const stakingList = useStore(model.$contractsListCopies)
  const loading = useStore(model.fetchStakingListFx.pending)

  const searchDebounced = useDebounce(search, 1000)

  useGate(model.StakingListGate, {
    ...props,
    hidden: ability.can('update', 'Contract') ? null : false,
    search: searchDebounced,
  })

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

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Сontracts
        </Typography>
        <Input
          placeholder="Search"
          className={styles.search}
          value={search}
          onChange={handleSearch}
        />
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
              TVL
            </Typography>
            <Typography variant="body2" align="right">
              Position
            </Typography>
            <Typography variant="body2" align="right">
              Unclaimed
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
                return (
                  <li
                    key={stakingListItem.id}
                    className={clsx(
                      styles.listItem,
                      stakingListItem.hidden && styles.hiddenListItem
                    )}
                  >
                    <StakingContractCardReadonly
                      className={styles.row}
                      {...stakingListItem}
                      protocolAdapter={props.protocolAdapter}
                      protocolId={props.protocolId}
                      onToggleContract={handleToggleContract(stakingListItem)}
                      onDelete={handleOpenConfirmDialog(stakingListItem.id)}
                    />
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
