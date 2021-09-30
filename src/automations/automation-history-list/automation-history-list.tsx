import { useGate, useStore } from 'effector-react'
import { useParams } from 'react-router-dom'
import isEmpty from 'lodash.isempty'

import { AppLayout } from '~/layouts'
import { dateUtils } from '~/common/date-utils'
import * as styles from './automation-history-list.css'
import * as model from './automation-history-list.model'

export type AutomationHistoryListProps = unknown

export const AutomationHistoryList: React.VFC<AutomationHistoryListProps> =
  () => {
    const loading = useStore(model.fetchHistoryFx.pending)
    const params = useParams<{ automationId: string }>()
    const history = useStore(model.$history)

    useGate(model.AutomationHistoryListGate, params.automationId)

    return (
      <AppLayout>
        <div className={styles.root}>
          {loading && 'loading'}
          {!loading && isEmpty(history) && 'empty'}
          {!loading &&
            !isEmpty(history) &&
            history.map((historyItem) => (
              <div key={historyItem.id}>
                created at: {dateUtils.format(historyItem.createdAt)}
                {historyItem.error && <>error: {historyItem.error}</>}
              </div>
            ))}
          <model.AutomationHistoryPagination />
        </div>
      </AppLayout>
    )
  }
