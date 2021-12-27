import { useGate, useStore } from 'effector-react'
import { useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import isEmpty from 'lodash.isempty'

import { AppLayout } from '~/layouts'
import { dateUtils } from '~/common/date-utils'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { TablePagination } from '~/common/table-pagination'
import * as styles from './automation-history-list.css'
import * as model from './automation-history-list.model'

export type AutomationHistoryListProps = unknown

const ROWS_PER_PAGE = 10

export const AutomationHistoryList: React.VFC<AutomationHistoryListProps> =
  () => {
    const loading = useStore(model.fetchHistoryFx.pending)
    const params = useParams<{ automationId: string }>()
    const history = useStore(model.$history)

    const [page, setPages] = useState(0)

    const count = useStore(model.$count)

    const gateProps = useMemo(
      () => ({
        automationId: params.automationId,
        pagination: {
          limit: ROWS_PER_PAGE,
          offset: page * ROWS_PER_PAGE,
        },
      }),
      [page, params.automationId]
    )

    useGate(model.AutomationHistoryListGate, gateProps)

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
            <TablePagination
              rowsPerPage={ROWS_PER_PAGE}
              count={count}
              className={styles.pagination}
              onChange={setPages}
              value={page}
            />
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
