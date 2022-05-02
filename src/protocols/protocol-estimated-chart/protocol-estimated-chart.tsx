import { useEffect, useMemo, useState } from 'react'
import isEmpty from 'lodash.isempty'
import { useStore } from 'effector-react'

import { Chart } from '~/common/chart'
import { Typography } from '~/common/typography'
import { ProtocolChartWrap } from '../common'
import { Link } from '~/common/link'
import { config } from '~/config'
import { useTheme } from '~/common/theme'
import { Dropdown } from '~/common/dropdown'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { authModel } from '~/auth'
import { ProtocolQuery } from '~/api/_generated-types'
import * as model from './protocol-estimated-chart.model'
import * as styles from './protocol-estimated-chart.css'
import {
  useOnTokenMetricUpdatedSubscription,
  useOnWalletMetricUpdatedSubscription,
} from '~/portfolio/common'

export type ProtocolEstimatedChartProps = {
  className?: string
  metric: Exclude<ProtocolQuery['protocol'], null | undefined>['metric']
}

const ESTIMATED_FIELDS = [
  {
    valueY: 'hold',
    format: 'holdFormat',
    name: 'Just holding',
    dateX: 'date',
    color: '#F08BA9',
  },
]

export const ProtocolEstimatedChart: React.FC<ProtocolEstimatedChartProps> = (
  props
) => {
  const earningsMetric = useStore(model.$earningsMetric)
  const loading = useStore(model.fetchEarningMetricFx.pending)

  const [themeMode] = useTheme()

  const estimatedFields = useMemo(() => {
    return [
      ...ESTIMATED_FIELDS,
      {
        valueY: 'autostaking',
        format: 'autostakingFormat',
        name: 'Auto-staking',
        dateX: 'date',
        color: themeMode === 'dark' ? '#CCFF3C' : '#39C077',
      },
    ]
  }, [themeMode])

  const user = useStore(authModel.$user)

  const variables = useMemo(() => {
    if (!user) return undefined

    return {
      user: [user.id],
    }
  }, [user])

  const [metricUpdated, setMetricUpdated] = useState('')

  useOnWalletMetricUpdatedSubscription(({ data }) => {
    if (data?.onWalletMetricUpdated.id) {
      setMetricUpdated(data.onWalletMetricUpdated.id)
    }
  }, variables)
  useOnTokenMetricUpdatedSubscription(({ data }) => {
    if (data?.onTokenMetricUpdated.id) {
      setMetricUpdated(data.onTokenMetricUpdated.id)
    }
  }, variables)

  useEffect(() => {
    const balance = Number(props.metric.myStaked)
    const apy = Number(props.metric.myAPY ?? 0)

    if (!apy) return

    model.fetchEarningMetricFx({
      balance,
      apy,
    })
  }, [
    props.metric.myStaked,
    props.metric.myEarned,
    props.metric.myAPY,
    metricUpdated,
  ])

  useEffect(() => {
    return () => model.reset()
  }, [])

  return (
    <ProtocolChartWrap
      header={
        <div>
          <Typography className={styles.eastimatedTitle}>
            Estimated Earnings in 3 months{' '}
            <Dropdown
              control={
                <ButtonBase className={styles.question}>
                  <Icon icon="question" width="24" height="24" />
                </ButtonBase>
              }
              trigger="hover"
              offset={[0, 8]}
            >
              Extra income you may earn with auto-staking activated
            </Dropdown>
          </Typography>
          <Link
            href={config.MEDIUM_LINK}
            target="_blank"
            className={styles.link}
          >
            How auto-staking works
          </Link>
        </div>
      }
    >
      <Chart
        loading={loading && isEmpty(earningsMetric)}
        dataFields={estimatedFields}
        data={earningsMetric}
        // eslint-disable-next-line no-template-curly-in-string
        tooltipText="{name}: ${format}"
        id="estimated"
        names={estimatedFields.map(({ name }) => name)}
      />
    </ProtocolChartWrap>
  )
}
