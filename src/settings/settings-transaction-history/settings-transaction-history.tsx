import clsx from 'clsx'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import isEmpty from 'lodash.isempty'

import { Typography } from '~/common/typography'
import { Paper } from '~/common/paper'
import { Link } from '~/common/link'
import { bignumberUtils } from '~/common/bignumber-utils'
import { dateUtils } from '~/common/date-utils'
import { cutAccount } from '~/common/cut-account'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { networksConfig } from '~/networks-config'
import { Loader } from '~/common/loader'
import * as styles from './settings-transaction-history.css'
import * as model from './settings-transaction-history.model'
import { TablePagination } from '~/common/table-pagination'
import { BillingTransferStatusEnum } from '~/api'

export type SettingsTransactionHistoryProps = {
  className?: string
}

const STATUSES = {
  [BillingTransferStatusEnum.Confirmed]: 'Confirmed',
  [BillingTransferStatusEnum.Pending]: 'Pending',
  [BillingTransferStatusEnum.Rejected]: 'Rejected',
}

const ROWS_PER_PAGE = 10

export const SettingsTransactionHistory: React.VFC<SettingsTransactionHistoryProps> =
  (props) => {
    const history = useStore(model.$history)
    const loading = useStore(model.fetchBillingHistoryFx.pending)
    const count = useStore(model.$count)

    const [page, setPages] = useState(0)

    const wallets = useStore(model.$wallets)

    const [currentWallet, setWallet] = useState<typeof wallets[number] | null>(
      null
    )

    const handleSetWallet = (wallet: typeof wallets[number] | null) => () => {
      setWallet(wallet)
    }

    useEffect(() => {
      model.fetchBillingHistoryFx({
        pagination: {
          limit: ROWS_PER_PAGE,
          offset: page * ROWS_PER_PAGE,
        },
        filter: {
          wallet: [currentWallet?.id].filter((id): id is string => Boolean(id)),
        },
      })
    }, [page, currentWallet])

    return (
      <div className={clsx(styles.root, props.className)}>
        <Typography variant="h3" className={styles.title}>
          Transaction History
        </Typography>
        <Paper radius={8}>
          {loading && (
            <div className={styles.loader}>
              <Loader height="36" />
            </div>
          )}
          {!loading && isEmpty(history) && (
            <Typography variant="body2" align="center" className={styles.empty}>
              Your transaction history will be displayed here.
            </Typography>
          )}
          <>
            {!loading && !isEmpty(history) && (
              <div className={styles.content}>
                <div className={styles.tableHead}>
                  <Dropdown
                    control={(active) => (
                      <ButtonBase>
                        {currentWallet?.name ?? 'All wallets'}
                        <Icon
                          icon={active ? 'arrowUp' : 'arrowDown'}
                          width="16"
                          className={styles.selectArrow}
                        />
                      </ButtonBase>
                    )}
                    placement="bottom-start"
                    className={styles.select}
                  >
                    <ButtonBase
                      className={clsx(
                        styles.selectOption,
                        !currentWallet && styles.selectOptionActive
                      )}
                      onClick={handleSetWallet(null)}
                    >
                      All wallets
                    </ButtonBase>
                    {wallets.map((wallet) => (
                      <ButtonBase
                        className={clsx(
                          styles.selectOption,
                          currentWallet?.id === wallet.id &&
                            styles.selectOptionActive
                        )}
                        onClick={handleSetWallet(wallet)}
                        key={wallet.id}
                      >
                        {wallet.name}
                      </ButtonBase>
                    ))}
                  </Dropdown>
                  <TablePagination
                    rowsPerPage={ROWS_PER_PAGE}
                    count={count}
                    className={styles.pagination}
                    onChange={setPages}
                    value={page}
                  />
                </div>
                <div className={clsx(styles.row, styles.grey)}>
                  <Typography variant="body2" as="div">
                    Wallet
                  </Typography>
                  <Typography variant="body2" as="div">
                    Txn Hash
                  </Typography>
                  <Typography variant="body2" as="div" align="right">
                    Amount
                  </Typography>
                  <Typography variant="body2" as="div">
                    Date
                  </Typography>
                  <Typography variant="body2" as="div">
                    Status
                  </Typography>
                </div>
                {history.map((historyItem) => (
                  <div key={historyItem.id} className={styles.row}>
                    <Typography variant="body2" as="div">
                      {historyItem.wallet?.name ?? 'untitled'}
                    </Typography>
                    <Typography variant="body2" as="div">
                      <Link
                        href={buildExplorerUrl({
                          network: historyItem.network,
                          tx: historyItem.bill?.tx
                            ? historyItem.bill?.tx
                            : historyItem.tx,
                        })}
                        target="_blank"
                      >
                        {cutAccount(
                          historyItem.bill?.tx
                            ? historyItem.bill?.tx
                            : historyItem.tx
                        )}
                      </Link>
                    </Typography>
                    <Typography variant="body2" as="div" align="right">
                      {bignumberUtils.format(historyItem.amount, 6, false)}{' '}
                      {networksConfig[historyItem.network]?.coin}
                    </Typography>
                    <Typography variant="body2" as="div">
                      {dateUtils.format(
                        historyItem.createdAt,
                        'DD MMM YYYY h:mm:ss A'
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      as="div"
                      className={clsx(styles.statuses[historyItem.status])}
                    >
                      {STATUSES[historyItem.status]}
                    </Typography>
                  </div>
                ))}
              </div>
            )}
          </>
        </Paper>
      </div>
    )
  }
