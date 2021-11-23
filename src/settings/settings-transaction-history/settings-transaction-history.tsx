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
import {
  BillingBillStatusEnum,
  WalletFragmentFragment,
} from '~/graphql/_generated-types'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { networksConfig } from '~/networks-config'
import * as styles from './settings-transaction-history.css'
import * as model from './settings-transaction-history.model'
import { Loader } from '~/common/loader'

export type SettingsTransactionHistoryProps = {
  className?: string
}

const STATUSES = {
  [BillingBillStatusEnum.Accepted]: 'Accepted',
  [BillingBillStatusEnum.Pending]: 'Pending',
  [BillingBillStatusEnum.Rejected]: 'Rejected',
}

const defaultLabelDisplayedRows = (from: number, to: number, count: number) => {
  return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
}

const getLabelDisplayedRowsTo = (
  count: number,
  page: number,
  rowsPerPage: number
) => {
  if (count === -1) {
    return (page + 1) * rowsPerPage
  }
  return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage)
}

const ROWS_PER_PAGE = 10

export const SettingsTransactionHistory: React.VFC<SettingsTransactionHistoryProps> =
  (props) => {
    const history = useStore(model.$history)
    const loading = useStore(model.fetchBillingHistoryFx.pending)
    const count = useStore(model.$count)

    const [page, setPages] = useState(0)

    const [currentWallet, setWallet] = useState('')

    const handleSetWallet = (wallet: string) => () => {
      setWallet(wallet)
    }

    const wallets = history
      .map((historyItem) => historyItem.wallet)
      .filter((wallet): wallet is WalletFragmentFragment => Boolean(wallet))

    const handlePrev = () => {
      setPages(page - 1)
    }

    const handleNext = () => {
      setPages(page + 1)
    }

    useEffect(() => {
      model.fetchBillingHistoryFx({
        pagination: {
          limit: ROWS_PER_PAGE,
          offset: page * ROWS_PER_PAGE,
        },
        filter: {
          wallet: [currentWallet].filter(Boolean),
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
              Your transaction history of all automated actions and
              notifications for all connected wallets will be displayed here.
            </Typography>
          )}
          <>
            {!loading && !isEmpty(history) && (
              <div className={styles.content}>
                <div className={styles.tableHead}>
                  <Dropdown
                    control={(active) => (
                      <ButtonBase>
                        All wallets
                        <Icon
                          icon={active ? 'arrowTop' : 'arrowDown'}
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
                      onClick={handleSetWallet('')}
                    >
                      All wallets
                    </ButtonBase>
                    {wallets.map((wallet) => (
                      <ButtonBase
                        className={clsx(
                          styles.selectOption,
                          currentWallet === wallet.id &&
                            styles.selectOptionActive
                        )}
                        onClick={handleSetWallet(wallet.id)}
                      >
                        {wallet.name}
                      </ButtonBase>
                    ))}
                  </Dropdown>
                  <div className={styles.pagination}>
                    <Typography
                      variant="body2"
                      as="span"
                      className={styles.paginationCount}
                    >
                      {defaultLabelDisplayedRows(
                        count === 0 ? 0 : page * ROWS_PER_PAGE + 1,
                        getLabelDisplayedRowsTo(count, page, ROWS_PER_PAGE),
                        count === -1 ? -1 : count
                      )}
                    </Typography>
                    <ButtonBase
                      className={styles.paginationButton}
                      onClick={handlePrev}
                      disabled={count < ROWS_PER_PAGE}
                    >
                      <Icon icon="arrowLeft" width="16" />
                    </ButtonBase>
                    <ButtonBase
                      className={styles.paginationButton}
                      onClick={handleNext}
                      disabled={count < ROWS_PER_PAGE}
                    >
                      <Icon icon="arrowRight" width="16" />
                    </ButtonBase>
                  </div>
                </div>
                <div className={clsx(styles.row, styles.grey)}>
                  <Typography variant="body2" as="div">
                    Wallet
                  </Typography>
                  <Typography variant="body2" as="div">
                    Address
                  </Typography>
                  <Typography variant="body2" as="div">
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
                          address: historyItem.account,
                        })}
                        target="_blank"
                      >
                        {cutAccount(historyItem.account)}
                      </Link>
                    </Typography>
                    <Typography variant="body2" as="div">
                      {bignumberUtils.format(historyItem.amount, 6)}{' '}
                      {networksConfig[historyItem.network].coin}
                    </Typography>
                    <Typography variant="body2" as="div">
                      {dateUtils.format(historyItem.createdAt)}
                    </Typography>
                    <Typography
                      variant="body2"
                      as="div"
                      className={
                        styles.statuses[
                          historyItem.bill?.status ||
                            BillingBillStatusEnum.Accepted
                        ]
                      }
                    >
                      {
                        STATUSES[
                          historyItem.bill?.status ||
                            BillingBillStatusEnum.Accepted
                        ]
                      }
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
