import { useGate, useStore } from 'effector-react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import isEmpty from 'lodash.isempty'

import { AppLayout } from '~/layouts'
import { dateUtils } from '~/common/date-utils'
import { Paper } from '~/common/paper'
import * as styles from './automation-history-list.css'
import * as model from './automation-history-list.model'
import { Typography } from '~/common/typography'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'

export type AutomationHistoryListProps = unknown

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

export const AutomationHistoryList: React.VFC<AutomationHistoryListProps> =
  () => {
    const loading = useStore(model.fetchHistoryFx.pending)
    const params = useParams<{ automationId: string }>()
    const history = useStore(model.$history)

    const [page, setPages] = useState(0)

    const count = useStore(model.$count)

    useGate(model.AutomationHistoryListGate, {
      automationId: params.automationId,
      pagination: {
        limit: ROWS_PER_PAGE,
        offset: page * ROWS_PER_PAGE,
      },
    })

    const handlePrev = () => {
      setPages(page - 1)
    }

    const handleNext = () => {
      setPages(page + 1)
    }

    return (
      <AppLayout>
        <Typography variant="h3" className={styles.title}>
          Call history
        </Typography>
        <Paper className={styles.root} radius={8}>
          <div className={styles.header}>
            <Typography variant="body2" as="div">
              Created at
            </Typography>
            <Typography variant="body2" as="div">
              Error
            </Typography>
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
          {loading && <div className={styles.label}>loading...</div>}
          {!loading && isEmpty(history) && (
            <div className={styles.label}>Empty</div>
          )}
          {!loading &&
            !isEmpty(history) &&
            history.map((historyItem) => (
              <div className={styles.row} key={historyItem.id}>
                <Typography variant="body2">
                  {dateUtils.format(historyItem.createdAt)}
                </Typography>
                <Typography variant="body2">{historyItem.error}</Typography>
              </div>
            ))}
        </Paper>
      </AppLayout>
    )
  }
